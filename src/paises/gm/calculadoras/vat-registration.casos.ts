import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-registration";

const FOLLETO = "https://www.gra.gm/download-file/8d0cfa28-d217-11ed-9b31-029254d29bb1";

export default definirCasos(calculadora, [
  {
    nombre: "D2 million of sales",
    origen: { tipo: "oficial", url: FOLLETO, detalle: "Taxable supplies of D2,000,000 and over in a tax year: compulsory registration." },
    fecha: "2026-10-27",
    entrada: { ventas: 2000000 },
    esperado: { situacion: "You must register for VAT", faltaObligatorio: null },
  },
  {
    nombre: "D1.5 million of sales",
    origen: { tipo: "oficial", url: FOLLETO, detalle: "D1,000,000 and above: voluntary registration. 500,000 short of the compulsory threshold." },
    fecha: "2026-10-27",
    entrada: { ventas: 1500000 },
    esperado: { situacion: "You may register voluntarily", faltaObligatorio: 500000 },
  },
  {
    nombre: "D400,000 of sales",
    origen: { tipo: "oficial", url: FOLLETO, detalle: "Below the thresholds a business cannot register or charge VAT." },
    fecha: "2026-10-27",
    entrada: { ventas: 400000 },
    esperado: { situacion: "You cannot register for VAT", faltaVoluntario: 600000 },
  },
]);
