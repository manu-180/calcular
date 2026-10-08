import { definirCasos } from "@/motor/calculo";
import indemnizacion from "./indemnizacion";

export default definirCasos(indemnizacion, [
  {
    nombre: "Cinco años justos con $600",
    origen: {
      tipo: "recalculado",
      url: "https://www.jurisprudencia.gob.sv/DocumentosBoveda/D/2/1970-1979/1972/07/886E0.PDF",
      detalle: "Art. 58: 30 días por año. Del 1/3/2021 al 28/2/2026 son 5 años. 600 / 30 = 20 por día; 150 días × 20 = 3.000.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 600, inicio: "2021-03-01", fin: "2026-02-28", region: "comercio-servicios" },
    esperado: { tiempo: "5 años y 0 días", diasIndemnizacion: 150, indemnizacion: 3000 },
  },
  {
    nombre: "Seis años y fracción: la fracción se paga proporcional",
    origen: {
      tipo: "recalculado",
      detalle: "Del 1/1/2020 al 30/9/2026: 6 años y 273 días. 180 + 30 × 273 / 365 = 202,4384 días × 30 = 6.073,15.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 900, inicio: "2020-01-01", fin: "2026-09-30", region: "comercio-servicios" },
    esperado: { tiempo: "6 años y 273 días", diasIndemnizacion: 202.44, indemnizacion: 6073.15 },
  },
  {
    nombre: "Salario alto en comercio: tope de 4 mínimos diarios",
    origen: {
      tipo: "recalculado",
      detalle: "Tope 4 × 13,44 = 53,76 por día. 3.000 / 30 = 100 pasa el tope. 10 años: 300 días × 53,76 = 16.128.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 3000, inicio: "2016-10-01", fin: "2026-09-30", region: "comercio-servicios" },
    esperado: { diarioUsado: 53.76, diasIndemnizacion: 300, indemnizacion: 16128 },
  },
  {
    nombre: "Tope del sector agropecuario",
    origen: { tipo: "recalculado", detalle: "Tope 4 × 8,96 = 35,84. 1.200 / 30 = 40 pasa el tope. 2 años: 60 días × 35,84 = 2.150,40." },
    fecha: "2026-10-07",
    entrada: { salario: 1200, inicio: "2024-10-01", fin: "2026-09-30", region: "agropecuario" },
    esperado: { diarioUsado: 35.84, indemnizacion: 2150.4 },
  },
  {
    nombre: "Dos meses de trabajo: mínimo de 15 días",
    origen: { tipo: "recalculado", detalle: "61 días dan 30 × 61 / 365 = 5,01 días, menos que el mínimo. 15 días × (450 / 30 = 15) = 225." },
    fecha: "2026-10-07",
    entrada: { salario: 450, inicio: "2026-08-01", fin: "2026-09-30", region: "comercio-servicios" },
    esperado: { diasIndemnizacion: 15, indemnizacion: 225 },
  },
  {
    nombre: "Último día anterior al inicio",
    origen: { tipo: "recalculado", detalle: "Entrada imposible: tiene que dar error." },
    fecha: "2026-10-07",
    entrada: { salario: 600, inicio: "2026-05-01", fin: "2026-04-30", region: "comercio-servicios" },
    esperaError: true,
  },
]);
