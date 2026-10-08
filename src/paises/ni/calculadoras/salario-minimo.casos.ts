import { definirCasos } from "@/motor/calculo";
import salarioMinimo from "./salario-minimo";

const GACETA_43 = "https://www.lagaceta.gob.ni/la-gaceta-no-43-viernes-06-de-marzo-de-2026/" as const;

export default definirCasos(salarioMinimo, [
  {
    nombre: "Industria manufacturera, 2026",
    origen: { tipo: "oficial", url: GACETA_43, detalle: "Acuerdo Ministerial 02-2026: C$ 8,320.48 al mes. 8320.48 / 30 = 277.35; / 8 = 34.67." },
    fecha: "2026-10-07",
    entrada: { sector: "industria-manufacturera" },
    esperado: { mensual: 8320.48, diario: 277.35, hora: 34.67 },
  },
  {
    nombre: "Construcción y financiero, el más alto",
    origen: { tipo: "oficial", url: GACETA_43, detalle: "C$ 13,848.23 al mes. / 30 = 461.61; / 8 = 57.70." },
    fecha: "2026-10-07",
    entrada: { sector: "construccion-financiero" },
    esperado: { mensual: 13848.23, diario: 461.61, hora: 57.7 },
  },
  {
    nombre: "Agropecuario, el más bajo",
    origen: { tipo: "oficial", url: GACETA_43, detalle: "C$ 6,188.02 al mes (salario más alimentación)." },
    fecha: "2026-10-07",
    entrada: { sector: "agropecuario" },
    esperado: { mensual: 6188.02, diario: 206.27 },
  },
  {
    nombre: "Primer día de vigencia",
    origen: { tipo: "oficial", url: GACETA_43, detalle: "Rige desde el 1/3/2026 (artículo 4). Gobierno central y municipal: C$ 7,716.70." },
    fecha: "2026-03-01",
    entrada: { sector: "gobierno" },
    esperado: { mensual: 7716.7 },
  },
  {
    nombre: "Último día de vigencia",
    origen: { tipo: "oficial", url: GACETA_43, detalle: "Rige hasta el 28/2/2027. Pesca: C$ 9,409.09." },
    fecha: "2027-02-28",
    entrada: { sector: "pesca" },
    esperado: { mensual: 9409.09 },
  },
]);
