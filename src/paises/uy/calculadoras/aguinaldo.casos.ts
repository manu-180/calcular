import { definirCasos } from "@/motor/calculo";
import aguinaldo from "./aguinaldo";

export default definirCasos(aguinaldo, [
  {
    nombre: "Semestre completo con sueldo fijo",
    origen: {
      tipo: "recalculado",
      url: "https://www.gub.uy/ministerio-trabajo-seguridad-social/politicas-y-gestion/derecho-reglamentacion-laboral/derecho-laboral-uruguayo/despido-regimen-comun/metodo-calculo",
      detalle: "Método del MTSS: el aguinaldo de un mensual es el sueldo dividido 12 por cada mes. 50.000 × 6 / 12 = 25.000 (Ley 12.840, artículo 2).",
    },
    fecha: "2026-12-10",
    entrada: { cuota: "diciembre", sueldo: 50000, meses: 6, variables: 0 },
    esperado: { totalPeriodo: 300000, aguinaldo: 25000 },
  },
  {
    nombre: "Ingreso a mitad del semestre, con horas extra",
    origen: { tipo: "recalculado", detalle: "40.000 × 4,5 meses + 12.000 de horas extra = 192.000. Dividido 12: 16.000." },
    fecha: "2026-06-15",
    entrada: { cuota: "junio", sueldo: 40000, meses: 4.5, variables: 12000 },
    esperado: { totalPeriodo: 192000, aguinaldo: 16000 },
  },
  {
    nombre: "Egreso con decimales",
    origen: { tipo: "recalculado", detalle: "33.333 × 2 + 0 = 66.666. Dividido 12: 5.555,50." },
    fecha: "2026-08-01",
    entrada: { cuota: "egreso", sueldo: 33333, meses: 2, variables: 0 },
    esperado: { aguinaldo: 5555.5 },
  },
  {
    nombre: "Más de 6 meses en una cuota",
    origen: { tipo: "recalculado", detalle: "Cada cuota cubre un semestre (Decreto-Ley 14.525): 7 meses no es válido." },
    fecha: "2026-12-10",
    entrada: { cuota: "diciembre", sueldo: 50000, meses: 7, variables: 0 },
    esperaError: true,
  },
]);
