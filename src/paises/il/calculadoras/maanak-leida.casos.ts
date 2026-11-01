import { definirCasos } from "@/motor/calculo";
import calculadora from "./maanak-leida";

const URL = "https://www.btl.gov.il/benefits/maternity/maanakleda/Pages/ShiurMaanakLeda.aspx";

export default definirCasos(calculadora, [
  {
    nombre: "Primer hijo",
    origen: { tipo: "oficial", url: URL, detalle: "Por el primer hijo, 2.103 desde el 01.01.2026." },
    fecha: "2026-10-26",
    entrada: { tinokot: 1, sidur: 1 },
    esperado: { maanak: 2103 },
  },
  {
    nombre: "Segundo hijo",
    origen: { tipo: "oficial", url: URL, detalle: "Por el segundo hijo, 946." },
    fecha: "2026-10-26",
    entrada: { tinokot: 1, sidur: 2 },
    esperado: { maanak: 946 },
  },
  {
    nombre: "Quinto hijo",
    origen: { tipo: "oficial", url: URL, detalle: "Del tercero en adelante, 631." },
    fecha: "2026-10-26",
    entrada: { tinokot: 1, sidur: 5 },
    esperado: { maanak: 631 },
  },
  {
    nombre: "Mellizos",
    origen: { tipo: "oficial", url: URL, detalle: "Mellizos, 10.514 sin importar el orden." },
    fecha: "2026-10-26",
    entrada: { tinokot: 2, sidur: 4 },
    esperado: { maanak: 10514 },
  },
  {
    nombre: "Cuatrillizos",
    origen: { tipo: "recalculado", detalle: "Trillizos 15.771 más 5.257 por el cuarto = 21.028." },
    fecha: "2026-10-26",
    entrada: { tinokot: 4, sidur: 4 },
    esperado: { maanak: 21028 },
  },
]);
