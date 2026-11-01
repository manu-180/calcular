import { definirCasos } from "@/motor/calculo";
import varainsiirtovero from "./varainsiirtovero-laskuri";

const ASUNTO = "https://www.vero.fi/en/individuals/property/transfer-tax/buyer-of-a-flat/";
const VSV = "https://www.vero.fi/en/individuals/property/transfer-tax/";

export default definirCasos(varainsiirtovero, [
  {
    nombre: "Verohallinnon esimerkki: asunto 60 000 euroa ja yhtiölaina 20 000 euroa",
    origen: { tipo: "oficial", url: ASUNTO, detalle: "Velaton hinta 80 000 euroa on veron peruste; 1,5 % = 1 200 euroa." },
    fecha: "2026-10-24",
    entrada: { kohde: "asunto-osake", kauppahinta: 60000, yhtiolaina: 20000 },
    esperado: { peruste: 80000, vero: 1200 },
  },
  {
    nombre: "Omakotitalo 250 000 euroa",
    origen: { tipo: "recalculado", url: VSV, detalle: "Kiinteistö 3 %: 250 000 × 3 % = 7 500." },
    fecha: "2026-10-24",
    entrada: { kohde: "kiinteisto", kauppahinta: 250000, yhtiolaina: null },
    esperado: { vero: 7500, prosentti: 3 },
  },
  {
    nombre: "Listaamattoman yhtiön osakkeet 40 000 euroa",
    origen: { tipo: "recalculado", url: VSV, detalle: "Muut arvopaperit 1,5 %: 600 euroa." },
    fecha: "2026-10-24",
    entrada: { kohde: "arvopaperi", kauppahinta: 40000, yhtiolaina: null },
    esperado: { vero: 600 },
  },
]);
