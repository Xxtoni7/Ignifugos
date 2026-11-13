import woodImage from "../assets/tratamiento-madera.png";
import textilesImage from "../assets/tratamiento-textil.png";
import steelImage from "../assets/tratamiento-metal.png";

export const treatmentsIntroduction =
  "Evaluamos cada espacio y te cotizamos según la superficie y la necesidad.";

export const treatments = [
  {
    id: "maderas",
    title: "Maderas",
    description: "Tratamiento ignífugo para superficies y elementos de madera.",
    actionLabel: "Consultar por maderas",
    service: "Tratamiento ignífugo de maderas",
    image: woodImage,
    imageAlt: "Aplicación de tratamiento sobre una superficie de madera",
    imagePosition: "50% 32%",
  },
  {
    id: "textiles",
    title: "Textiles y alfombras",
    description: "Tratamiento para telas, alfombras y superficies textiles según cada necesidad.",
    actionLabel: "Consultar por textiles",
    service: "Tratamiento ignífugo de textiles",
    image: textilesImage,
    imageAlt: "Aplicación de tratamiento sobre asientos tapizados",
    imagePosition: "50% 50%",
  },
  {
    id: "estructuras-metalicas",
    title: "Estructuras metálicas",
    description: "Tratamiento con pintura intumescente para estructuras metálicas, como vigas y estructuras de acero.",
    actionLabel: "Consultar por estructuras",
    service: "Protección de estructuras metálicas",
    image: steelImage,
    imageAlt: "Aplicación de tratamiento sobre una estructura metálica",
    imagePosition: "50% 48%",
    requiresTechnicalValidation: true,
  },
];
