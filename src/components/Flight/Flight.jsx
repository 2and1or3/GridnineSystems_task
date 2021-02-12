import React from 'react';

import FlightInfo from '@/components/FlightInfo/FlightInfo';

function Flight({ leg }) {
  const { segments, duration } = leg;

  const depCity = segments[0].departureCity?.caption;
  const { uid: depAirportCode, caption: depAirport } = segments[0].departureAirport;
  const depDate = segments[0].departureDate;

  if (!depCity) {
    // eslint-disable-next-line no-alert
    alert(`Город отправления для рейса ${leg.segments[0].flightNumber} отсутствует`);
  }

  const arrivalCity = segments[segments.length - 1].arrivalCity?.caption;
  const {
    uid: arrivalAirportCode,
    caption: arrivalAirport,
  } = segments[segments.length - 1].arrivalAirport;

  const { arrivalDate } = segments[segments.length - 1];

  if (!arrivalCity) {
    // eslint-disable-next-line no-alert
    alert(`Город прибытия для рейса ${leg.segments[segments.length - 1].flightNumber} отсутствует`);
  }

  const transferQuantity = segments.length - 1;

  const airline = segments[0].airline.caption;

  return (
    <div className="ticket__flight flight">
      <p className="flight__destination">
        <span className="flight__destination-from">
          {depCity}
          ,
          {' '}
          {depAirport}
          <span className="flight__destination-airport">
            (
            {depAirportCode}
            )
          </span>
        </span>
        <span className="flight__destination-arrow" />
        <span className="flight__destination-to">
          {arrivalCity}
          ,
          {' '}
          {arrivalAirport}
          <span className="flight__destination-airport">
            (
            {arrivalAirportCode}
            )
          </span>
        </span>
      </p>
      <FlightInfo duration={duration} depDate={depDate} arrivalDate={arrivalDate} />
      <p className="flight__transfer">
        {transferQuantity ? (
          <span className="flight__transfer-count">
            {transferQuantity}
            {' '}
            пересадка
          </span>
        ) : ''}
      </p>
      <span className="flight__company">
        Рейс выполняет:
        {' '}
        {airline}
      </span>
    </div>
  );
}

export default Flight;
