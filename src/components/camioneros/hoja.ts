// Vista previa del Liquidador de la planilla de Camioneros para un caso: filas reales del archivo con los
// importes del motor de la calculadora (calcularCamioneros). scripts/check_planilla_camioneros.ts aplica
// el caso al .xlsx, lo evalúa y exige que cada fila y cada importe de esta previa coincidan.

import type { FilaHoja, HojaPrevia } from "@/components/HojaCalculo";
import * as camioneros from "@/lib/prefill/camioneros";
import { calcularCamioneros } from "@/lib/convenios";
import { CATEGORIAS_CAMIONEROS, MESES_CAMIONEROS } from "@/data/convenios/camioneros";
import { APORTES_PERSONALES } from "@/data/aguinaldo";
import { ZONAS_CAMIONEROS } from "./viaticos";

export const PESTANAS_CAMIONEROS = [
  "Instrucciones",
  "Liquidador",
  "Nómina",
  "Recibo",
  "SAC (Aguinaldo)",
  "Escala 2026",
  "Fuentes",
] as const;

export type ResumenCamioneros = { bruto: number; neto: number; etiqueta: string };

const pct = (t: number) => `${Math.round(t * 100)}%`;

export function hojaCamioneros(
  archivo: string,
  d: camioneros.Datos,
): { hoja: HojaPrevia; resumen: ResumenCamioneros } | null {
  const r = calcularCamioneros({ mesId: d.mesId, categoriaId: d.categoriaId, aniosAntiguedad: d.anios });
  if (!r) return null;
  const categoria = CATEGORIAS_CAMIONEROS.find((c) => c.id === d.categoriaId)!;
  const mes = MESES_CAMIONEROS.find((m) => m.id === d.mesId)!;
  const { jubilacion, pami, obraSocial } = APORTES_PERSONALES;
  const filas: FilaHoja[] = [
    { fila: 4, etiqueta: "DATOS DEL TRABAJADOR", tono: "seccion" },
    { fila: 5, etiqueta: "Categoría", valor: categoria.nombre, tono: "input" },
    { fila: 6, etiqueta: "Mes a liquidar", valor: mes.etiqueta, tono: "input" },
    { fila: 7, etiqueta: "Años de antigüedad", valor: String(d.anios), tono: "input" },
    { fila: 8, etiqueta: "Zona de residencia", valor: ZONAS_CAMIONEROS[0].nombre, tono: "input" },
    { fila: 10, etiqueta: "VIAJES Y ADICIONALES DEL MES", tono: "seccion" },
    { fila: 11, etiqueta: "Km recorridos — horas extra", valor: "0", tono: "input", nota: "ítem 4.2.3" },
    { fila: 13, etiqueta: "Comidas", valor: "0", tono: "input", nota: "ítem 4.1.12" },
    { fila: 15, etiqueta: "Pernoctadas", valor: "0", tono: "input", nota: "ítem 4.1.14" },
    { fila: 18, etiqueta: "LIQUIDACIÓN DEL MES", tono: "seccion" },
    { fila: 19, etiqueta: "Sueldo básico", valor: r.basico },
    { fila: 22, etiqueta: `Antigüedad (${d.anios}%)`, valor: r.antiguedad },
    { fila: 23, etiqueta: "TOTAL REMUNERATIVO", valor: r.totalRemunerativo, tono: "total" },
    { fila: 24, etiqueta: `Jubilación (${pct(jubilacion)})`, valor: -r.totalRemunerativo * jubilacion },
    { fila: 25, etiqueta: `PAMI (${pct(pami)})`, valor: -r.totalRemunerativo * pami },
    { fila: 26, etiqueta: `Obra social (${pct(obraSocial)})`, valor: -r.totalRemunerativo * obraSocial },
    { fila: 27, etiqueta: "NETO DE HABERES", valor: r.neto, tono: "total" },
    { fila: 28, etiqueta: "Viáticos no remunerativos", valor: 0, nota: "km, comidas y pernoctadas" },
    { fila: 29, etiqueta: "TOTAL A COBRAR", valor: r.neto, tono: "total" },
  ];
  return {
    hoja: { archivo, pestanas: [...PESTANAS_CAMIONEROS], hoja: camioneros.HOJA, filas },
    resumen: {
      bruto: r.totalRemunerativo,
      neto: r.neto,
      etiqueta: `${categoria.nombre} · ${d.anios} ${d.anios === 1 ? "año" : "años"} · ${mes.etiqueta}`,
    },
  };
}
