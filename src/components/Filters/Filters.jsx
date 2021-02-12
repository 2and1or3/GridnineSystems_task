import React from 'react';
import { connect } from 'react-redux';

import Radio from '@/components/Radio/Radio';
import Checkbox from '@/components/Checkbox/Checkbox';

import {
  getSortKey, getTransfers, getPrice, getAirlines, getBanList,
} from '@/reducer/application/selectors';

import { SortTypes } from '@/constants';
import { ActionCreator } from '@/reducer/application/application';
import NumberInput from '@/components/NumberInput/NumberInput';

const getSortsTemplate = (currentSortKey, onChangeSort) => Object
  .keys(SortTypes)
  .map((key) => (
    <Radio
      key={SortTypes[key].key}
      sortKey={SortTypes[key].key}
      label={SortTypes[key].label}
      checked={SortTypes[key].key === SortTypes[currentSortKey].key}
      onChange={onChangeSort}
    />
  ));

const getTransfersTemplate = (transfers, onChangeTransfer, transfersBanList) => transfers
  .map((transfer) => (
    <Checkbox
      key={transfer.id}
      id={transfer.id}
      label={transfer.label}
      checked={transfer.checked}
      onChange={onChangeTransfer}
      disabled={transfersBanList.some((banId) => banId === transfer.id)}
    />
  ));

const getAirlinesTemplate = (airlines, onChangeAirline, airlinesBanList) => Object.keys(airlines)
  .map((key) => (
    <Checkbox
      key={airlines[key].id}
      id={airlines[key].id}
      label={`${airlines[key].label} от ${airlines[key].minPrice} р.`}
      checked={airlines[key].checked}
      onChange={onChangeAirline}
      disabled={airlinesBanList.some((banId) => banId === airlines[key].id)}
    />
  ));

function Filters({
  currentSortKey,
  transfers,
  onChangeSort,
  onChangeTransfer,
  currentPrice,
  onMinPriceInput,
  onMaxPriceInput,
  airlines,
  onChangeAirline,
  banList,
}) {
  const sortsTemplate = getSortsTemplate(currentSortKey, onChangeSort);
  const transfersTemplate = getTransfersTemplate(transfers, onChangeTransfer, banList.transferIds);
  const airlinesTemplate = getAirlinesTemplate(airlines, onChangeAirline, banList.airlineIds);

  return (
    <form className="flights-page__filters filters">
      <fieldset className="filters__box">
        <legend className="filters__box-title">Сортировать</legend>
        {sortsTemplate}
      </fieldset>

      <fieldset className="filters__box">
        <legend className="filters__box-title">Фильтровать</legend>
        {transfersTemplate}
      </fieldset>

      <fieldset className="filters__box">
        <legend className="filters__box-title">Цена</legend>
        <NumberInput id="min-price" label="От" holder="0" value={currentPrice.min} onInput={onMinPriceInput} />
        <NumberInput id="max-price" label="До" holder="100000" value={currentPrice.max} onInput={onMaxPriceInput} />
      </fieldset>

      <fieldset className="filters__box">
        <legend className="filters__box-title">Авиакомпании</legend>
        {airlinesTemplate}
      </fieldset>
    </form>
  );
}

const mapStateToProps = (state) => ({
  transfers: getTransfers(state),
  airlines: getAirlines(state),
  currentSortKey: getSortKey(state),
  currentPrice: getPrice(state),
  banList: getBanList(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeSort: (key) => dispatch(ActionCreator.changeSort(key)),
  onChangeTransfer: (id) => dispatch(ActionCreator.checkTransfer(id)),
  onMinPriceInput: (price) => dispatch(ActionCreator.setMinPrice(price)),
  onMaxPriceInput: (price) => dispatch(ActionCreator.setMaxPrice(price)),
  onChangeAirline: (id) => dispatch(ActionCreator.checkAirline(id)),
});

const connectedFilters = connect(mapStateToProps, mapDispatchToProps)(Filters);

export default connectedFilters;
