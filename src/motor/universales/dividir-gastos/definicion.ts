import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { Campo, DefinicionCalculadora, TablaResultado } from "../../tipos";
import { montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiDividirGastos {
  persona: (n: number) => string;
  personaAyuda: string;
  total: string;
  personas: string;
  cuota: string;
  transferencias: string;
  tabla: string;
  colDe: string;
  colPara: string;
  colMonto: string;
  errorPocas: string;
  aMano: string;
}

export const MAX_PERSONAS = 8;

interface Saldo {
  quien: number;
  saldo: number;
}

export function definir(ctx: ContextoUniversal, ui: UiDividirGastos): DefinicionCalculadora {
  const ejemplos = [montoEjemplo(ctx, 90), montoEjemplo(ctx, 30), 0];
  const campos: Campo[] = Array.from({ length: MAX_PERSONAS }, (_, i) => ({
    id: `p${i + 1}`,
    tipo: "moneda" as const,
    etiqueta: ui.persona(i + 1),
    ...(i === 0 ? { ayuda: ui.personaAyuda } : {}),
    min: 0,
    requerido: false,
    ...(i < ejemplos.length ? { porDefecto: ejemplos[i] } : {}),
  }));
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "dividir-gastos",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos,
    calcular(entrada, _valores, { redondear }) {
      const pagos = entrada as Readonly<Record<string, number | null>>;
      const participantes: Saldo[] = [];
      for (let i = 1; i <= MAX_PERSONAS; i++) {
        const pago = pagos[`p${i}`];
        if (pago !== null && pago !== undefined) participantes.push({ quien: i, saldo: pago });
      }
      if (participantes.length < 2) throw new ErrorEntrada(ui.errorPocas, "p2");
      const total = redondear(participantes.reduce((s, p) => s + p.saldo, 0));
      const cuotaExacta = total / participantes.length;
      for (const p of participantes) p.saldo -= cuotaExacta;

      const filas: (readonly [string, string, number])[] = [];
      for (;;) {
        const deudor = participantes.reduce((a, b) => (b.saldo < a.saldo ? b : a));
        const acreedor = participantes.reduce((a, b) => (b.saldo > a.saldo ? b : a));
        const monto = Math.min(-deudor.saldo, acreedor.saldo);
        if (monto < 1e-9) break;
        const redondo = redondear(monto);
        if (redondo > 0) filas.push([ui.persona(deudor.quien), ui.persona(acreedor.quien), redondo]);
        if (-deudor.saldo <= acreedor.saldo) {
          acreedor.saldo -= monto;
          deudor.saldo = 0;
        } else {
          deudor.saldo += monto;
          acreedor.saldo = 0;
        }
      }
      const tabla: TablaResultado = {
        tipo: "tabla",
        columnas: [
          { clave: "de", etiqueta: ui.colDe, formato: "texto" },
          { clave: "para", etiqueta: ui.colPara, formato: "texto" },
          { clave: "monto", etiqueta: ui.colMonto, formato: "moneda" },
        ],
        filas,
      };
      return {
        total,
        personas: participantes.length,
        cuota: redondear(cuotaExacta),
        transferencias: filas.length,
        detalle: tabla,
        observaciones: filas.length ? [] : [ui.aMano],
      };
    },
    resultado: [
      { clave: "cuota", etiqueta: ui.cuota, formato: "moneda", destacada: true },
      { clave: "total", etiqueta: ui.total, formato: "moneda" },
      { clave: "personas", etiqueta: ui.personas, formato: "numero" },
      { clave: "transferencias", etiqueta: ui.transferencias, formato: "numero" },
    ],
    tablas: [{ clave: "detalle", titulo: ui.tabla, filasVisibles: 12 }],
  });
}
