import { definirCasos } from "@/motor/calculo";
import despido from "./despido";

const MENSUAL = { modalidad: "mensual", aniosCompletos: 0, jornalesSueltos: 0 } as const;
const JORNALERO = { modalidad: "jornalero", ingreso: null, egreso: "2026-10-07", incidencias: false } as const;

export default definirCasos(despido, [
  {
    nombre: "Mensual con 3 años y 7 meses, con incidencias",
    origen: {
      tipo: "recalculado",
      url: "https://www.gub.uy/ministerio-trabajo-seguridad-social/politicas-y-gestion/derecho-reglamentacion-laboral/derecho-laboral-uruguayo/despido-regimen-comun/metodo-calculo",
      detalle:
        "Ley 10.489, art. 4: un mes por año o fracción, 4 años. Base del MTSS: 50.000 + 50.000 / 12 (4.166,67) + 50.000 / 30 × 20 / 12 (2.777,78) = 56.944,45. Por 4: 227.777,80.",
    },
    fecha: "2026-10-07",
    entrada: { ...MENSUAL, remuneracion: 50000, ingreso: "2023-03-01", egreso: "2026-10-07", incidencias: true },
    esperado: { aniosComputados: 4, meses: 4, baseMensual: 56944.45, indemnizacion: 227777.8 },
  },
  {
    nombre: "Mensual con 11 años: tope de 6 sueldos",
    origen: {
      tipo: "recalculado",
      detalle: "12 años computados, tope 6. Licencia de 22 días (11 años). Base 50.000 + 4.166,67 + 3.055,56 = 57.222,23. Por 6: 343.333,38.",
    },
    fecha: "2026-10-07",
    entrada: { ...MENSUAL, remuneracion: 50000, ingreso: "2015-01-10", egreso: "2026-10-07", incidencias: true },
    esperado: { meses: 6, baseMensual: 57222.23, indemnizacion: 343333.38 },
  },
  {
    nombre: "Despido el día del aniversario",
    origen: { tipo: "recalculado", detalle: "Del 7/10/2024 al 7/10/2026 son 2 años justos, sin fracción. Sin incidencias: 2 × 50.000." },
    fecha: "2026-10-07",
    entrada: { ...MENSUAL, remuneracion: 50000, ingreso: "2024-10-07", egreso: "2026-10-07", incidencias: false },
    esperado: { aniosComputados: 2, indemnizacion: 100000 },
  },
  {
    nombre: "Menos de un año",
    origen: { tipo: "recalculado", detalle: "La fracción cuenta como un año: 1 sueldo." },
    fecha: "2026-10-07",
    entrada: { ...MENSUAL, remuneracion: 50000, ingreso: "2026-08-01", egreso: "2026-10-07", incidencias: false },
    esperado: { meses: 1, indemnizacion: 50000 },
  },
  {
    nombre: "Jornalero con 3 años completos y una fracción",
    origen: {
      tipo: "recalculado",
      detalle: "Ley 10.570, art. 1: 25 jornales por año con 240 jornadas (75) más 2 por cada 25 trabajados en la fracción (150 × 2 / 25 = 12). 87 × 2.000 = 174.000.",
    },
    fecha: "2026-10-07",
    entrada: { ...JORNALERO, remuneracion: 2000, aniosCompletos: 3, jornalesSueltos: 150 },
    esperado: { jornales: 87, indemnizacion: 174000 },
  },
  {
    nombre: "Jornalero en el tope de 150 jornales",
    origen: { tipo: "recalculado", detalle: "7 años × 25 = 175, tope 150. 150 × 2.000 = 300.000." },
    fecha: "2026-10-07",
    entrada: { ...JORNALERO, remuneracion: 2000, aniosCompletos: 7, jornalesSueltos: 0 },
    esperado: { jornales: 150, indemnizacion: 300000 },
  },
  {
    nombre: "Jornalero con menos de 100 jornales",
    origen: { tipo: "recalculado", detalle: "80 jornales: no nace el derecho (MTSS, despido de jornaleros)." },
    fecha: "2026-10-07",
    entrada: { ...JORNALERO, remuneracion: 2000, aniosCompletos: 0, jornalesSueltos: 80 },
    esperado: { indemnizacion: 0 },
  },
  {
    nombre: "Mensual sin fecha de ingreso",
    origen: { tipo: "recalculado", detalle: "Sin la fecha de ingreso no se pueden contar los años." },
    fecha: "2026-10-07",
    entrada: { ...MENSUAL, remuneracion: 50000, ingreso: null, egreso: "2026-10-07", incidencias: true },
    esperaError: true,
  },
]);
