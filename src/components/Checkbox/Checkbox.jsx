import React from 'react';

class Checkbox extends React.PureComponent {
  render() {
    const {
      id, label, checked, onChange, disabled,
    } = this.props;

    return (
      <label className="filters__box-label checkbox" htmlFor={id}>
        <input type="checkbox" name={id} id={id} checked={checked} onChange={() => onChange(id)} disabled={disabled} />
        -
        {' '}
        {label}
      </label>
    );
  }
}

export default Checkbox;
