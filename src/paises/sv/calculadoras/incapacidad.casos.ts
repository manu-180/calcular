import { definirCasos } from "@/motor/calculo";
import incapacidad from "./incapacidad";

export default definirCasos(incapacidad, [
  {
    nombre: "Diez días por enfermedad común con ISSS",
    origen: {
      tipo: "recalculado",
      url: "https://www.isss.gob.sv/preguntas-frecuentes/",
      detalle: "ISSS: 75 % desde el cuarto día. 600 / 30 × 75 % = 15 por día; 7 días pagados = 105. AFP 7,25 % = 7,61. Neto 97,39.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 600, dias: 10, causa: "comun", cotizaIsss: true, antiguedad: "un-anio" },
    esperado: { quienPaga: "El ISSS", diasPagados: 7, diario: 15, subsidio: 105, afp: 7.61, neto: 97.39 },
  },
  {
    nombre: "Accidente de trabajo con salario sobre el techo",
    origen: { tipo: "recalculado", detalle: "Desde el segundo día: 9 de 10 días. Base 1.000: 1.000 / 30 × 75 % = 25. 225; AFP 16,31; neto 208,69." },
    fecha: "2026-10-12",
    entrada: { salario: 2000, dias: 10, causa: "profesional", cotizaIsss: true, antiguedad: "un-anio" },
    esperado: { diasPagados: 9, diario: 25, subsidio: 225, afp: 16.31, neto: 208.69 },
  },
  {
    nombre: "Sin ISSS, ocho meses con el patrono y 50 días de incapacidad",
    origen: {
      tipo: "recalculado",
      url: "https://www.jurisprudencia.gob.sv/DocumentosBoveda/D/2/1970-1979/1972/07/886E0.PDF",
      detalle: "Art. 307, segunda categoría: 40 días al 75 %. 450 / 30 × 75 % = 11,25; × 40 = 450.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 450, dias: 50, causa: "comun", cotizaIsss: false, antiguedad: "cinco-meses" },
    esperado: { quienPaga: "Su patrono", diasPagados: 40, diario: 11.25, subsidio: 450, neto: 450 },
  },
  {
    nombre: "Tres días por enfermedad común: el ISSS no paga",
    origen: { tipo: "recalculado", detalle: "El ISSS paga desde el cuarto día: 0 días." },
    fecha: "2026-10-12",
    entrada: { salario: 600, dias: 3, causa: "comun", cotizaIsss: true, antiguedad: "un-anio" },
    esperado: { diasPagados: 0, subsidio: 0, neto: 0 },
  },
]);
