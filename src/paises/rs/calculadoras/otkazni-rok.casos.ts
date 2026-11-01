import { definirCasos } from "@/motor/calculo";
import otkazniRok from "./otkazni-rok";

const RAD = "https://pravno-informacioni-sistem.rs/eli/rep/sgrs/skupstina/zakon/2005/24/1/reg";

export default definirCasos(otkazniRok, [
  {
    nombre: "Zaposleni, zakonski minimum",
    origen: { tipo: "recalculado", url: RAD, detalle: "Čl. 178: najmanje 15 dana; 1. 11. + 15 = 16. 11." },
    fecha: "2026-10-31",
    entrada: { ko: "zaposleni", datum: "2026-11-01", dana: null },
    esperado: { dana: 15, poslednjiDan: "2026-11-16" },
  },
  {
    nombre: "Poslodavac, 30 dana",
    origen: { tipo: "recalculado", url: RAD, detalle: "Čl. 189: rok teče od narednog dana; 1. 11. + 30 = 1. 12." },
    fecha: "2026-10-31",
    entrada: { ko: "poslodavac", datum: "2026-11-01", dana: 30 },
    esperado: { dana: 30, poslednjiDan: "2026-12-01" },
  },
  {
    nombre: "Rok duži od zakonskog je greška",
    origen: { tipo: "recalculado", url: RAD, detalle: "Čl. 178: ne duži od 30 dana." },
    fecha: "2026-10-31",
    entrada: { ko: "zaposleni", datum: "2026-11-01", dana: 45 },
    esperaError: true,
  },
]);
