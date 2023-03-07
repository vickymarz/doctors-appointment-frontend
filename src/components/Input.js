import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type,
  name,
  onChange,
  placeholder,
  value,
  className,
  innerRef,
}) => (
  <>
    <input
      type={type}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      className={className}
      ref={innerRef}
    />
  </>
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  innerRef: PropTypes.oneOfType([PropTypes.object]),
};

Input.defaultProps = {
  placeholder: null,
  value: '',
  name: '',
  className: '',
  innerRef: null,
  onChange: null,
};

export default Input;
