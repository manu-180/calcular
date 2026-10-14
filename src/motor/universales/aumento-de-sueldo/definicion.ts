import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora } from "../../tipos";
import { formatearNumero, montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiAumentoDeSueldo {
  sueldo: string;
  sueldoAyuda: string;
  aumentoPorcentaje: string;
  aumentoMonto: string;
  aumentoMontoAyuda: string;
  inflacion: string;
  inflacionAyuda: string;
  sueldosAnio: string;
  sueldosAnioAyuda: string;
  nuevo: string;
  diferenciaMensual: string;
  diferenciaAnual: string;
  porcentaje: string;
  real: string;
  realAyuda: string;
  errorSueldo: string;
  errorSinAumento: string;
  observacionGana: (puntos: string) => string;
  observacionPierde: (puntos: string) => string;
  observacionIgual: string;
}

const r6 = (n: number) => Math.round(n * 1e6) / 1e6;

// Aumento real = (1 + aumento) ÷ (1 + inflación) − 1. Restar los porcentajes da una aproximación que
// se aleja mucho cuando la inflación es alta.
export function aumentoReal(aumento: number, inflacion: number): number {
  return ((1 + aumento / 100) / (1 + inflacion / 100) - 1) * 100;
}

export function definir(ctx: ContextoUniversal, ui: UiAumentoDeSueldo): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "aumento-de-sueldo",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "sueldo", tipo: "moneda", etiqueta: ui.sueldo, ayuda: ui.sueldoAyuda, min: 0, porDefecto: montoEjemplo(ctx, 1500) },
      { id: "aumentoPorcentaje", tipo: "porcentaje", etiqueta: ui.aumentoPorcentaje, min: -100, max: 1000, porDefecto: 10, requerido: false },
      { id: "aumentoMonto", tipo: "moneda", etiqueta: ui.aumentoMonto, ayuda: ui.aumentoMontoAyuda, requerido: false },
      { id: "inflacion", tipo: "porcentaje", etiqueta: ui.inflacion, ayuda: ui.inflacionAyuda, min: -50, max: 10000, requerido: false },
      { id: "sueldosAnio", tipo: "entero", etiqueta: ui.sueldosAnio, ayuda: ui.sueldosAnioAyuda, min: 12, max: 16, porDefecto: 12 },
    ],
    calcular(entrada, _valores, { redondear }) {
      if (entrada.sueldo <= 0) throw new ErrorEntrada(ui.errorSueldo, "sueldo");
      if (entrada.aumentoMonto === null && entrada.aumentoPorcentaje === null) throw new ErrorEntrada(ui.errorSinAumento, "aumentoPorcentaje");
      const diferencia = redondear(entrada.aumentoMonto ?? (entrada.sueldo * (entrada.aumentoPorcentaje ?? 0)) / 100);
      const porcentaje = r6((diferencia / entrada.sueldo) * 100);
      const real = entrada.inflacion === null ? null : r6(aumentoReal(porcentaje, entrada.inflacion));
      const observaciones: string[] = [];
      if (real !== null) {
        const puntos = formatearNumero(ctx, Math.abs(real), 2);
        if (real > 0.005) observaciones.push(ui.observacionGana(puntos));
        else if (real < -0.005) observaciones.push(ui.observacionPierde(puntos));
        else observaciones.push(ui.observacionIgual);
      }
      return {
        nuevo: redondear(entrada.sueldo + diferencia),
        diferenciaMensual: diferencia,
        diferenciaAnual: redondear(diferencia * entrada.sueldosAnio),
        porcentaje,
        real,
        observaciones,
      };
    },
    resultado: [
      { clave: "nuevo", etiqueta: ui.nuevo, formato: "moneda", destacada: true },
      { clave: "diferenciaMensual", etiqueta: ui.diferenciaMensual, formato: "moneda" },
      { clave: "diferenciaAnual", etiqueta: ui.diferenciaAnual, formato: "moneda" },
      { clave: "porcentaje", etiqueta: ui.porcentaje, formato: "porcentaje", decimales: 2 },
      { clave: "real", etiqueta: ui.real, ayuda: ui.realAyuda, formato: "porcentaje", decimales: 2, destacada: true },
    ],
  });
}
