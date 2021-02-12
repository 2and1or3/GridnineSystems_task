import React from 'react';

class Radio extends React.PureComponent {
  render() {
    const {
      sortKey, label, checked, onChange,
    } = this.props;
    return (
      <label className="filters__box-label radio" htmlFor={sortKey}>
        <input type="radio" name="sort" id={sortKey} checked={checked} onChange={() => onChange(sortKey)} />
        -
        {' '}
        {label}
      </label>
    );
  }
}

export default Radio;
