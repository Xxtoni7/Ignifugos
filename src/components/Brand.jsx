import logo from "../assets/logo.jpeg";
import { SITE_BRAND_NAME } from "../config/site.js";
import "./Brand.css";

function BrandContents({ variant }) {
  const [firstName, lastName] = SITE_BRAND_NAME.split(" ");

  return (
    <>
      <span className={variant === "header" ? "header-brand__mark" : "brand__mark"} aria-hidden="true">
        <img
          className={variant === "header" ? "header-brand__image" : "brand__image"}
          src={logo}
          alt=""
          width="1563"
          height="1563"
        />
      </span>
      <span className={variant === "header" ? "header-brand__text" : "brand__text"}>
        {variant === "header" ? "IGNÍFUGOS" : firstName} <span>{lastName}</span>
      </span>
    </>
  );
}

export default function Brand({
  variant = "header",
  homeReady = true,
  href = "/#inicio",
  onNavigate,
  ariaLabel = "Ignífugos CABA, inicio",
}) {
  const className = variant === "header" ? "header-brand" : `brand brand--${variant}`;
  const contents = <BrandContents variant={variant} />;

  if (variant === "header" && !homeReady) return <span className={className}>{contents}</span>;

  return <a className={className} href={href} aria-label={ariaLabel} onClick={onNavigate}>{contents}</a>;
}
