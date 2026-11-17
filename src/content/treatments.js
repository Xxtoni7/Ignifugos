import woodImage from "../assets/tratamiento-madera.webp";
import textilesImage from "../assets/tratamiento-textil.webp";
import steelImage from "../assets/tratamiento-metal.webp";
import {
  SERVICE_METAL,
  SERVICE_TEXTILES,
  SERVICE_WOOD,
} from "./services.js";

export const treatmentsIntroduction =
  "Evaluamos cada espacio y te cotizamos según la superficie y la necesidad.";

export const treatments = [
  {
    id: "maderas",
    title: "Maderas",
    description: "Tratamiento ignífugo para superficies y elementos de madera.",
    actionLabel: "Consultar por maderas",
    service: SERVICE_WOOD,
    image: woodImage,
    imageAlt: "Aplicación de tratamiento sobre una superficie de madera",
    imagePosition: "50% 32%",
  },
  {
    id: "textiles",
    title: "Textiles y alfombras",
    description: "Tratamiento para telas, alfombras y superficies textiles según cada necesidad.",
    actionLabel: "Consultar por textiles",
    service: SERVICE_TEXTILES,
    image: textilesImage,
    imageAlt: "Aplicación de tratamiento sobre asientos tapizados",
    imagePosition: "50% 50%",
  },
  {
    id: "estructuras-metalicas",
    title: "Estructuras metálicas",
    description: "Tratamiento con pintura intumescente para estructuras metálicas, como vigas y estructuras de acero.",
    actionLabel: "Consultar por estructuras",
    service: SERVICE_METAL,
    image: steelImage,
    imageAlt: "Aplicación de tratamiento sobre una estructura metálica",
    imagePosition: "50% 48%",
  },
];
