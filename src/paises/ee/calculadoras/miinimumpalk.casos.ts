import { definirCasos } from "@/motor/calculo";
import miinimumpalk from "./miinimumpalk";

const MAARUS = "https://www.riigiteataja.ee/akt/124032026005";

export default definirCasos(miinimumpalk, [
  {
    nombre: "Täistööaeg 2026",
    origen: { tipo: "recalculado", url: MAARUS, detalle: "Määrus nr 36: 946 eurot; neto 865,31; 946 + 312,18 + 7,57 = 1265,75." },
    fecha: "2026-10-15",
    entrada: { tunnid: 40, sammas: "2" },
    esperado: { kuu: 946, neto: 865.31, tund: 5.67, tooandjaKulu: 1265.75, aastas: 11352 },
  },
  {
    nombre: "Pool kohta",
    origen: { tipo: "recalculado", url: MAARUS, detalle: "946 × 20 / 40 = 473." },
    fecha: "2026-10-15",
    entrada: { tunnid: 20, sammas: "2" },
    esperado: { kuu: 473 },
  },
  { nombre: "Liiga palju tunde", origen: { tipo: "recalculado", url: MAARUS, detalle: "Üle 40 tunni pole täistööaeg." }, fecha: "2026-10-15", entrada: { tunnid: 45, sammas: "2" }, esperaError: true },
]);
