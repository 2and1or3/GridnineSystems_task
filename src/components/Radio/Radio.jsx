import React from 'react';

function Radio({ htmlFor, label }) {
  return (
    <label className="filters__box-label radio" htmlFor={htmlFor}>
      <input type="radio" name="sort" id={htmlFor} />
      -
      {' '}
      {label}
    </label>
  );
}

export default Radio;
