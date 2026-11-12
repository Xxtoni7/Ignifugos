import "./FormField.css";

export default function FormField({ id, label, error, ...props }) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={id}>{label}</label>
      <input
        className="form-field__control"
        id={id}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={errorId}
        {...props}
      />
      {error && <span className="form-field__error" id={errorId}>{error}</span>}
    </div>
  );
}
