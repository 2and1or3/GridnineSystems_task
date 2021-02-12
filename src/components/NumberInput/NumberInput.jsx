import React from 'react';

class NumberInput extends React.PureComponent {
  render() {
    const {
      id, label, holder, value, onInput,
    } = this.props;

    return (
      <label className="filters__box-label price-box" htmlFor={id}>
        {label}
        <input
          type="number"
          placeholder={holder}
          name={id}
          id={id}
          value={value}
          onInput={(evt) => onInput(evt.target.value)}
        />
      </label>
    );
  }
}

export default NumberInput;
