import { definirCasos } from "@/motor/calculo";
import brutoNetodan from "./bruto-netodan";

const SHEMA = "https://site-api.pensions.ge/api/v1/static-page/get?slug=pension-schema";

export default definirCasos(brutoNetodan, [
  {
    nombre: "784 ლარი ხელზე, სქემით",
    origen: { tipo: "oficial", url: SHEMA, detalle: "ფონდის მაგალითი უკუღმა: 784 / (0,98 × 0,8) = 1000." },
    fecha: "2026-11-01",
    entrada: { neto: 784, monatsile: true },
    esperado: { bruto: 1000, pensia: 20, gadasakhadi: 196 },
  },
  {
    nombre: "800 ლარი ხელზე, სქემის გარეშე",
    origen: { tipo: "oficial", url: SHEMA, detalle: "800 / 0,8 = 1000." },
    fecha: "2026-11-01",
    entrada: { neto: 800, monatsile: false },
    esperado: { bruto: 1000, pensia: 0, gadasakhadi: 200 },
  },
]);
