import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputFileGroup = ({
  name,
  value,
  label,
  error,
  info,
  type,
  onChange

}) => {
  return (
      <div className="form-group">
        <input
          className={classnames('form-control form-control-lg', { 'is-invalid' : error })}
          name={name}
          onChange={onChange}
          value={value}
        />
        {info && <small className="form-text text-muted">{ info }</small>}
        {error && <div className="invalid-feedback">{ error }</div>}
      </div>
  );
};
InputFileGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired

}

InputFileGroup.defaultProps = {
  type: 'file',

}

export default InputFileGroup;
