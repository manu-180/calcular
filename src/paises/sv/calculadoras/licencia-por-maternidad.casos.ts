import { definirCasos } from "@/motor/calculo";
import maternidad from "./licencia-por-maternidad";

export default definirCasos(maternidad, [
  {
    nombre: "Salario de $600 con ISSS, cuatro semanas antes del parto",
    origen: {
      tipo: "recalculado",
      url: "https://www.isss.gob.sv/preguntas-frecuentes/",
      detalle: "112 días desde el 17/11/2026 (28 días antes del 15/12): hasta el 8/3/2027. ISSS 100 %: 20 × 112 = 2.240. El 75 % del patrono (1.680) ya está cubierto. AFP 7,25 % = 162,40. Total 2.077,60.",
    },
    fecha: "2026-10-12",
    entrada: { parto: "2026-12-15", semanasAntes: 4, salario: 600, cotizaIsss: true },
    esperado: { inicio: "2026-11-17", fin: "2027-03-08", regreso: "2027-03-09", isss: 2240, patrono: 0, afp: 162.4, total: 2077.6 },
  },
  {
    nombre: "Salario de $2,000: el patrono completa sobre el techo",
    origen: {
      tipo: "recalculado",
      url: "https://www.jurisprudencia.gob.sv/DocumentosBoveda/D/2/1970-1979/1972/07/886E0.PDF",
      detalle: "ISSS sobre 1.000: 33,3333 × 112 = 3.733,33. Art. 309: 75 % de 66,6667 × 112 = 5.600; el patrono paga 5.600 − 3.733,33 = 1.866,67. AFP 270,67. Total 5.329,33.",
    },
    fecha: "2026-10-12",
    entrada: { parto: "2027-02-10", semanasAntes: 0, salario: 2000, cotizaIsss: true },
    esperado: { inicio: "2027-02-10", fin: "2027-06-01", isss: 3733.33, patrono: 1866.67, afp: 270.67, total: 5329.33 },
  },
  {
    nombre: "Sin ISSS: el patrono paga el 75 %",
    origen: { tipo: "recalculado", detalle: "450 / 30 = 15 por día; 75 % × 15 × 112 = 1.260." },
    fecha: "2026-10-12",
    entrada: { parto: "2026-12-15", semanasAntes: 4, salario: 450, cotizaIsss: false },
    esperado: { isss: 0, patrono: 1260, afp: 0, total: 1260 },
  },
  {
    nombre: "Siete semanas antes del parto no se puede",
    origen: { tipo: "recalculado", detalle: "16 semanas menos las 10 obligatorias después del parto: 6 como máximo antes." },
    fecha: "2026-10-12",
    entrada: { parto: "2026-12-15", semanasAntes: 7, salario: 600, cotizaIsss: true },
    esperaError: true,
  },
]);
