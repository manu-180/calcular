import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora } from "../../tipos";
import { formatearNumero, montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiPresupuesto {
  ingreso: string;
  ingresoAyuda: string;
  pctNecesidades: string;
  pctNecesidadesAyuda: string;
  pctGustos: string;
  pctGustosAyuda: string;
  pctAhorro: string;
  pctAhorroAyuda: string;
  necesidades: string;
  gustos: string;
  ahorro: string;
  ahorroAnual: string;
  errorIngreso: string;
  errorSuma: (suma: string) => string;
  observacionAhorroBajo: string;
}

export function definir(ctx: ContextoUniversal, ui: UiPresupuesto): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "presupuesto",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "ingreso", tipo: "moneda", etiqueta: ui.ingreso, ayuda: ui.ingresoAyuda, min: 0, porDefecto: montoEjemplo(ctx, 2000) },
      { id: "necesidades", tipo: "porcentaje", etiqueta: ui.pctNecesidades, ayuda: ui.pctNecesidadesAyuda, min: 0, max: 100, porDefecto: 50 },
      { id: "gustos", tipo: "porcentaje", etiqueta: ui.pctGustos, ayuda: ui.pctGustosAyuda, min: 0, max: 100, porDefecto: 30 },
      { id: "ahorro", tipo: "porcentaje", etiqueta: ui.pctAhorro, ayuda: ui.pctAhorroAyuda, min: 0, max: 100, porDefecto: 20 },
    ],
    calcular(entrada, _valores, { redondear }) {
      if (entrada.ingreso <= 0) throw new ErrorEntrada(ui.errorIngreso, "ingreso");
      const suma = entrada.necesidades + entrada.gustos + entrada.ahorro;
      if (Math.abs(suma - 100) > 1e-9) throw new ErrorEntrada(ui.errorSuma(formatearNumero(ctx, suma, suma % 1 === 0 ? 0 : 2)), "ahorro");
      const necesidades = redondear((entrada.ingreso * entrada.necesidades) / 100);
      const gustos = redondear((entrada.ingreso * entrada.gustos) / 100);
      const ahorro = redondear(entrada.ingreso - necesidades - gustos);
      return {
        necesidades,
        gustos,
        ahorro,
        ahorroAnual: redondear(ahorro * 12),
        observaciones: entrada.ahorro < 10 ? [ui.observacionAhorroBajo] : [],
      };
    },
    resultado: [
      { clave: "necesidades", etiqueta: ui.necesidades, formato: "moneda", destacada: true },
      { clave: "gustos", etiqueta: ui.gustos, formato: "moneda", destacada: true },
      { clave: "ahorro", etiqueta: ui.ahorro, formato: "moneda", destacada: true },
      { clave: "ahorroAnual", etiqueta: ui.ahorroAnual, formato: "moneda" },
    ],
  });
}
