import React from 'react';
import { getFormattedTime, getFormattedDuration, getFormattedDay } from '../../utils';

function FlightInfo({ duration, depDate, arrivalDate }) {
  return (
    <p className="flight__info flight-info">
      <span className="flight__info-from">
        <span className="flight-info__from-time">{getFormattedTime(depDate)}</span>
        <span className="flight-info__from-date">{getFormattedDay(depDate)}</span>
      </span>
      <span className="flight-info__duration">
        <span className="material-icons flight-info__duration-icon">
          schedule
        </span>
        {getFormattedDuration(duration)}
      </span>
      <span className="flight__info-to">
        <span className="flight-info__to-date">{getFormattedDay(arrivalDate)}</span>
        <span className="flight-info__to-time">{getFormattedTime(arrivalDate)}</span>
      </span>
    </p>

  );
}

export default FlightInfo;
