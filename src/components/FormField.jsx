import { cloneElement, isValidElement } from "react";
import "./FormField.css";

export default function FormField({
  id,
  label,
  error,
  required = false,
  optional = false,
  children,
}) {
  const labelId = `${id}-label`;
  const errorId = error ? `${id}-error` : undefined;
  const control = isValidElement(children)
    ? cloneElement(children, {
        id,
        required,
        "aria-invalid": error ? "true" : undefined,
        "aria-describedby": errorId,
        "aria-labelledby": labelId,
      })
    : children;

  return (
    <div className="form-field">
      <label className="form-field__label" id={labelId} htmlFor={id}>
        {label}
        {required && <span className="form-field__required" aria-hidden="true">*</span>}
        {optional && <span className="form-field__optional">(opcional)</span>}
      </label>
      {control}
      {error && <span className="form-field__error" id={errorId} role="alert">{error}</span>}
    </div>
  );
}
