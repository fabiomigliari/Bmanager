import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

function NumberFormatInput({ inputRef, name, decimalScale, onChange }) {
  return (
    <NumberFormat
      getInputRef={inputRef}
      onValueChange={({ value }) => onChange({ target: { name, value } })}
      decimalScale={decimalScale}
      decimalSeparator=","
      fixedDecimalScale
      thousandSeparator="."
      isNumericString
    />
  );
}

NumberFormatInput.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  decimalScale: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

NumberFormatInput.defaultProps = {
  decimalScale: 2,
};

export default NumberFormatInput;
