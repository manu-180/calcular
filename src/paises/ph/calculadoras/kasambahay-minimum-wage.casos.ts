import { definirCasos } from "@/motor/calculo";
import calculadora from "./kasambahay-minimum-wage";

export default definirCasos(calculadora, [
  {
    nombre: "NCR domestic worker",
    origen: { tipo: "oficial", url: "https://nwpc.dole.gov.ph/", detalle: "WO No. NCR-DW-06: ₱7,800.00 a month from 7 February 2026." },
    fecha: "2026-10-26",
    entrada: { region: "ncr", sueldo: 7000 },
    esperado: { alto: 7800, bajo: 7800, anual: 93600, diferencia: -800 },
  },
]);
