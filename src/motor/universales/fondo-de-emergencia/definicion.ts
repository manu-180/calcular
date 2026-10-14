import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora } from "../../tipos";
import { montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiFondoDeEmergencia {
  gastos: string;
  gastosAyuda: string;
  meses: string;
  mesesAyuda: string;
  actual: string;
  aporte: string;
  meta: string;
  falta: string;
  mesesParaLlegar: string;
  cobertura: string;
  errorGastos: string;
  yaCubierto: string;
  sinAporte: string;
  observacionDonde: string;
}

export function definir(ctx: ContextoUniversal, ui: UiFondoDeEmergencia): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "fondo-de-emergencia",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "gastos", tipo: "moneda", etiqueta: ui.gastos, ayuda: ui.gastosAyuda, min: 0, porDefecto: montoEjemplo(ctx, 1500) },
      { id: "meses", tipo: "entero", etiqueta: ui.meses, ayuda: ui.mesesAyuda, min: 3, max: 12, porDefecto: 6 },
      { id: "actual", tipo: "moneda", etiqueta: ui.actual, min: 0, requerido: false },
      { id: "aporte", tipo: "moneda", etiqueta: ui.aporte, min: 0, porDefecto: montoEjemplo(ctx, 200), requerido: false },
    ],
    calcular(entrada, _valores, { redondear }) {
      if (entrada.gastos <= 0) throw new ErrorEntrada(ui.errorGastos, "gastos");
      const actual = entrada.actual ?? 0;
      const aporte = entrada.aporte ?? 0;
      const meta = redondear(entrada.gastos * entrada.meses);
      const falta = redondear(Math.max(meta - actual, 0));
      const observaciones: string[] = [];
      if (falta === 0) observaciones.push(ui.yaCubierto);
      else if (aporte <= 0) observaciones.push(ui.sinAporte);
      observaciones.push(ui.observacionDonde);
      return {
        meta,
        falta,
        mesesParaLlegar: falta > 0 && aporte > 0 ? Math.ceil(falta / aporte - 1e-9) : null,
        cobertura: Math.floor((actual / entrada.gastos) * 10) / 10,
        observaciones,
      };
    },
    resultado: [
      { clave: "meta", etiqueta: ui.meta, formato: "moneda", destacada: true },
      { clave: "falta", etiqueta: ui.falta, formato: "moneda" },
      { clave: "mesesParaLlegar", etiqueta: ui.mesesParaLlegar, formato: "numero", decimales: 0 },
      { clave: "cobertura", etiqueta: ui.cobertura, formato: "numero", decimales: 1 },
    ],
  });
}
