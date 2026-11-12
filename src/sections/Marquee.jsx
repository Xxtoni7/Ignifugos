import "./Marquee.css";

const items = [
  "Maderas",
  "Textiles",
  "Estructuras metálicas",
  "Certificado firmado",
  "Capacitaciones",
  "Seguridad e higiene",
];

const sequences = Array.from({ length: 4 }, (_, index) => index);

function setPlaybackRate(event, rate) {
  const track = event.currentTarget.querySelector(".service-marquee__track");
  const animation = track?.getAnimations().find((item) => item.playState === "running");

  animation?.updatePlaybackRate(rate);
}

export default function Marquee() {
  return (
    <section
      className="service-marquee-transition"
      aria-label="Tratamientos y servicios"
      onMouseEnter={(event) => setPlaybackRate(event, 0.5)}
      onMouseLeave={(event) => setPlaybackRate(event, 1)}
    >
      <div className="service-marquee">
        <div className="service-marquee__track" aria-hidden="true">
          {sequences.map((sequence) => (
            <div className="service-marquee__sequence" key={sequence}>
              {items.map((item) => (
                <span className="service-marquee__item" key={`${sequence}-${item}`}>
                  {item}
                  <span className="service-marquee__separator" aria-hidden="true" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <span className="service-marquee__accessible-copy">
        {items.join(", ")}
      </span>
    </section>
  );
}
