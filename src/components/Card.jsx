import "./Card.css";

export default function Card({ as: Element = "article", children, className = "", ...props }) {
  return <Element className={`card ${className}`.trim()} {...props}>{children}</Element>;
}
