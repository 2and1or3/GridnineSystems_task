import React from 'react';
import { connect } from 'react-redux';

import Filters from '@/components/Filters/Filters';
import TicketsContainer from '@/components/TicketsContainer/TicketsContainer';

import getFlights from '@/reducer/data/selectors';
import {
  getSortKey, getTransfers, getPrice, getAirlines,
} from '@/reducer/application/selectors';
import { SortTypes } from '@/constants';
import { ActionCreator } from '@/reducer/application/application';
import { getSegmentsLengths, getBanList } from '@/utils';

const getFilteredFlights = (
  flights,
  currentSortKey,
  transfers,
  currentPrice,
  airlines,
  updateBanList,
) => {
  const checkedTransfers = transfers.filter((transfer) => transfer.checked);
  const checkedAirlines = Object.keys(airlines).filter((key) => airlines[key].checked);

  let airlinesBanList = Object.keys(airlines);
  let transfersBanList = transfers.map((transfer) => transfer.id);

  const filteredStages = {
    forTransferBanList: null,
    forAirlineBanList: null,
  };

  let filteredFlights = flights.filter((obj) => (
    (currentPrice.min <= +obj.flight.price.total.amount || !currentPrice.min)
      && (+obj.flight.price.total.amount <= currentPrice.max || !currentPrice.max)
  ));

  filteredStages.forAirlineBanList = filteredFlights.filter((obj) => {
    const [legForward, legBackward] = obj.flight.legs;
    const transfersForwardQuantity = legForward.segments.length - 1;
    const transfersBackwardQuantity = legBackward.segments.length - 1;

    const atLeastOne = (quantity) => quantity === transfersForwardQuantity
    || quantity === transfersBackwardQuantity;

    const onlyZero = (quantity) => quantity === transfersForwardQuantity
    && quantity === transfersBackwardQuantity;

    const isAllow = checkedTransfers
      .some((transfer) => (transfer.quantity
        ? atLeastOne(transfer.quantity)
        : onlyZero(transfer.quantity)));

    const isCheckedFiltersEmpty = checkedTransfers.length;

    return isAllow || !isCheckedFiltersEmpty;
  });

  airlinesBanList = getBanList(
    airlinesBanList, filteredStages.forAirlineBanList.map((obj) => obj.flight.carrier.uid),
  );

  filteredStages.forTransferBanList = filteredFlights.filter((obj) => {
    const airlineId = obj.flight.carrier.uid;

    const isAllow = checkedAirlines.some((checkedAirlineId) => checkedAirlineId === airlineId);

    const isCheckedFiltersEmpty = checkedAirlines.length;

    return isAllow || !isCheckedFiltersEmpty;
  });

  transfersBanList = getBanList(transfersBanList, getSegmentsLengths(filteredStages.forTransferBanList).map((num) => `transfer-${num}`));

  updateBanList({
    transfersBanList,
    airlinesBanList,
  });

  filteredFlights = filteredStages.forAirlineBanList.filter((obj) => {
    const airlineId = obj.flight.carrier.uid;

    const isAllow = checkedAirlines.some((checkedAirlineId) => checkedAirlineId === airlineId);

    const isCheckedFiltersEmpty = checkedAirlines.length;

    return isAllow || !isCheckedFiltersEmpty;
  });

  filteredFlights = filteredFlights.slice().sort(SortTypes[currentSortKey].sortFn);

  return filteredFlights;
};

function App({
  flights, currentSortKey, transfers, currentPrice, airlines, updateBanList,
}) {
  const filteredFlights = getFilteredFlights(
    flights, currentSortKey, transfers, currentPrice, airlines, updateBanList,
  );

  return (
    <div className="flights-page">
      <Filters />
      <TicketsContainer tickets={filteredFlights} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  flights: getFlights(state),
  currentSortKey: getSortKey(state),
  transfers: getTransfers(state),
  currentPrice: getPrice(state),
  airlines: getAirlines(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateBanList: (banObj) => dispatch(ActionCreator.updateBanList(banObj)),
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
