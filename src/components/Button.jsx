import "./Button.css";

export default function Button({
  children,
  href,
  variant = "primary",
  size,
  className = "",
  ...props
}) {
  const sizeClass = size ? `button--${size}` : "";
  const classes = `button button--${variant} ${sizeClass} ${className}`.trim();

  if (href) {
    return <a className={classes} href={href} {...props}>{children}</a>;
  }

  return <button className={classes} type="button" {...props}>{children}</button>;
}
