import { definirCasos } from "@/motor/calculo";
import calculadora from "./btw-berekenen";

export default definirCasos(calculadora, [
  {
    nombre: "21% erbij op € 100",
    origen: { tipo: "recalculado", detalle: "100 × 21% = 21; inclusief 121.", url: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/tarieven_en_vrijstellingen/" },
    fecha: "2026-10-14",
    entrada: { bedrag: 100, richting: "erbij", tarief: "hoog" },
    esperado: { btw: 21, exclusief: 100, inclusief: 121, tarief: 21 },
  },
  {
    nombre: "9% eruit halen uit € 109",
    origen: { tipo: "recalculado", detalle: "109 / 1,09 = 100; btw 9." },
    fecha: "2026-10-14",
    entrada: { bedrag: 109, richting: "eraf", tarief: "laag" },
    esperado: { btw: 9, exclusief: 100, inclusief: 109, tarief: 9 },
  },
  {
    nombre: "21% eruit halen uit € 250",
    origen: { tipo: "recalculado", detalle: "250 / 1,21 = 206,6115 → 206,61; btw 250 − 206,61 = 43,39." },
    fecha: "2026-10-14",
    entrada: { bedrag: 250, richting: "eraf", tarief: "hoog" },
    esperado: { btw: 43.39, exclusief: 206.61 },
  },
  {
    nombre: "0% bij export",
    origen: { tipo: "recalculado", detalle: "0% btw: exclusief en inclusief zijn gelijk." },
    fecha: "2026-10-14",
    entrada: { bedrag: 500, richting: "erbij", tarief: "nul" },
    esperado: { btw: 0, inclusief: 500 },
  },
]);
