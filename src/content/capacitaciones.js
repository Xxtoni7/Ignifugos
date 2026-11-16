import {
  SERVICE_BRIGADES,
  SERVICE_EXTINGUISHERS,
  SERVICE_RCP,
  SERVICE_SAFETY_HYGIENE,
} from "./services.js";

export const motivosCapacitaciones = Object.freeze({
  rcp: SERVICE_RCP,
  extintores: SERVICE_EXTINGUISHERS,
  brigadas: SERVICE_BRIGADES,
  seguridadHigiene: SERVICE_SAFETY_HYGIENE,
});

export const capacitaciones = [
  {
    id: "extintores",
    title: "Uso de extintores",
    description: "Formación para conocer y utilizar los equipos ante una emergencia.",
    service: motivosCapacitaciones.extintores,
    icon: "FireExtinguisher",
  },
  {
    id: "brigadas",
    title: "Brigadas de emergencias",
    description: "Formación para equipos de respuesta interna.",
    service: motivosCapacitaciones.brigadas,
    icon: "Siren",
  },
  {
    id: "seguridad-higiene",
    title: "Seguridad e higiene",
    description: "Asesoramiento según la necesidad de tu espacio.",
    service: motivosCapacitaciones.seguridadHigiene,
    icon: "HardHat",
  },
];

export const equipoRcp = [
  "Muñecos con luz indicadora",
  "Chaleco de Heimlich",
  "Simulación de heridas",
  "Simulador DEA",
  "DEA real",
];
