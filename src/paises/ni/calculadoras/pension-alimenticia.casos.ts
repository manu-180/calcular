import { definirCasos } from "@/motor/calculo";
import pensionAlimenticia from "./pension-alimenticia";

export default definirCasos(pensionAlimenticia, [
  {
    nombre: "Un hijo, ingreso neto de C$10,000",
    origen: { tipo: "recalculado", detalle: "Código de Familia art. 324 a: 25 % de los ingresos netos. 10000 × 25 % = 2500." },
    fecha: "2026-10-12",
    entrada: { hijos: 1, trabajo: "estable", ingreso: 10000, sector: "comercio-servicios-basicos", otros: false, mesesAtraso: 0 },
    esperado: { porcentaje: 25, mensual: 2500, porHijo: 2500, recargo: 0 },
  },
  {
    nombre: "Tres hijos y otra persona que reclama",
    origen: { tipo: "recalculado", detalle: "Art. 324 c, e y f: 50 % para los hijos más 10 % para otros, máximo 60 %. 20000 × 60 % = 12000. Hijos: 20000 × 50 % / 3 = 3333.33." },
    fecha: "2026-10-12",
    entrada: { hijos: 3, trabajo: "estable", ingreso: 20000, sector: "comercio-servicios-basicos", otros: true, mesesAtraso: 0 },
    esperado: { porcentaje: 60, mensual: 12000, porHijo: 3333.33 },
  },
  {
    nombre: "Sin trabajo estable, dos hijos, sector comercio",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 324: mínimo 25 % del salario mínimo del sector por beneficiario. Acuerdo Ministerial 02-2026: comercio y servicios C$11,350.08. 25 % = 2837.52 × 2 = 5675.04.",
    },
    fecha: "2026-10-12",
    entrada: { hijos: 2, trabajo: "sin-estable", ingreso: null, sector: "comercio-servicios-basicos", otros: false, mesesAtraso: 0 },
    esperado: { porcentaje: null, porHijo: 2837.52, mensual: 5675.04 },
  },
  {
    nombre: "Cuota atrasada tres meses",
    origen: { tipo: "recalculado", detalle: "Art. 325: 2 % adicional por cada mes de atraso. 2500 × 2 % × 3 = 150." },
    fecha: "2026-10-12",
    entrada: { hijos: 1, trabajo: "estable", ingreso: 10000, sector: "comercio-servicios-basicos", otros: false, mesesAtraso: 3 },
    esperado: { mensual: 2500, recargo: 150 },
  },
  {
    nombre: "Trabajo estable sin ingreso",
    origen: { tipo: "recalculado", detalle: "Con trabajo estable hace falta el ingreso neto para aplicar el porcentaje." },
    fecha: "2026-10-12",
    entrada: { hijos: 1, trabajo: "estable", ingreso: null, sector: "comercio-servicios-basicos", otros: false, mesesAtraso: 0 },
    esperaError: true,
  },
]);
