// Argentina en el índice de horas: el salario mínimo, vital y móvil por hora que fija la resolución del
// Consejo (valor del trabajador jornalizado), de la misma escala que usa calcular.ar/salario-minimo.
// Vive en src/lib porque el motor no puede importar código argentino (check_fronteras).
import { DESEMPLEO_FUENTES, SMVM_SERIE, SMVM_ULTIMO } from "@/data/desempleo";
import type { MinimoHora } from "@/motor/horas/tipos";

const MESES: Record<string, string> = { "01": "enero", "02": "febrero", "03": "marzo", "04": "abril", "05": "mayo", "06": "junio", "07": "julio", "08": "agosto", "09": "septiembre", "10": "octubre", "11": "noviembre", "12": "diciembre" };

// El mes de la escala que rige en `fecha` (AAAA-MM-DD, hora de Argentina). Pasado el último mes con norma,
// no hay valor vigente: la escala no se proyecta.
export function minimoAr(fecha: string): MinimoHora | string {
  const periodo = fecha.slice(0, 7);
  if (periodo > SMVM_ULTIMO.periodo) return `la escala del SMVM llega hasta ${SMVM_ULTIMO.periodo} y hoy es ${periodo}: falta la resolución nueva`;
  const mes = [...SMVM_SERIE].filter((m) => m.periodo <= periodo).at(-1);
  if (!mes) return `la escala del SMVM empieza en ${SMVM_SERIE[0].periodo}`;
  if (!(mes.porHora > 0)) return "el SMVM del mes no trae valor por hora";
  const [anio, m] = mes.periodo.split("-");
  const fuente = mes.periodo >= "2026-09" ? DESEMPLEO_FUENTES.smvm : DESEMPLEO_FUENTES.smvmAnterior;
  return {
    iso: "AR",
    mercado: "ar",
    moneda: "ARS",
    porHora: mes.porHora,
    conversion: { tipo: "hora", monto: mes.porHora },
    nombre: `Salario Mínimo, Vital y Móvil por hora (trabajador jornalizado), ${MESES[mes.periodo.slice(5)]} de ${mes.periodo.slice(0, 4)}`,
    fuente: { organismo: "Boletín Oficial", titulo: fuente.nombre, url: fuente.url, verificadoEl: DESEMPLEO_FUENTES.consultadoEl },
    // El valor del mes vale hasta su último día; el mes siguiente ya trae el suyo.
    vigenteHasta: new Date(Date.UTC(Number(anio), Number(m), 0)).toISOString().slice(0, 10),
  };
}
