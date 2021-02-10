import React from 'react';

function Checkbox({ htmlFor, label }) {
  return (
    <label className="filters__box-label checkbox" htmlFor={htmlFor}>
      <input type="checkbox" name={htmlFor} id={htmlFor} />
      -
      {' '}
      {label}
    </label>
  );
}

export default Checkbox;
