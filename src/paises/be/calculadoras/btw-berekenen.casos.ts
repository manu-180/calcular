import { definirCasos } from "@/motor/calculo";
import calculadora from "./btw-berekenen";

const BRON = "https://financien.belgium.be/nl/ondernemingen/btw/btw-plicht/tarieven-en-berekening/btw-tarieven" as const;

export default definirCasos(calculadora, [
  {
    nombre: "21 % erbij op € 100",
    origen: { tipo: "recalculado", url: BRON, detalle: "100 × 21 % = 21; inclusief 121." },
    fecha: "2026-10-14",
    entrada: { bedrag: 100, richting: "erbij", tarief: "standaard" },
    esperado: { btw: 21, exclusief: 100, inclusief: 121, tarief: 21 },
  },
  {
    nombre: "6 % eruit halen uit € 53",
    origen: { tipo: "recalculado", detalle: "53 / 1,06 = 50; btw 3." },
    fecha: "2026-10-14",
    entrada: { bedrag: 53, richting: "eraf", tarief: "verlaagd" },
    esperado: { btw: 3, exclusief: 50, inclusief: 53, tarief: 6 },
  },
  {
    nombre: "12 % erbij op € 85,50",
    origen: { tipo: "recalculado", detalle: "85,50 × 12 % = 10,26; inclusief 95,76." },
    fecha: "2026-10-14",
    entrada: { bedrag: 85.5, richting: "erbij", tarief: "tussen" },
    esperado: { btw: 10.26, inclusief: 95.76, tarief: 12 },
  },
  {
    nombre: "21 % eruit halen uit € 250",
    origen: { tipo: "recalculado", detalle: "250 / 1,21 = 206,6115 → 206,61; btw 250 − 206,61 = 43,39." },
    fecha: "2026-10-14",
    entrada: { bedrag: 250, richting: "eraf", tarief: "standaard" },
    esperado: { btw: 43.39, exclusief: 206.61 },
  },
  {
    nombre: "Nultarief",
    origen: { tipo: "recalculado", detalle: "0 % btw: exclusief en inclusief zijn gelijk." },
    fecha: "2026-10-14",
    entrada: { bedrag: 500, richting: "erbij", tarief: "nul" },
    esperado: { btw: 0, inclusief: 500 },
  },
]);
