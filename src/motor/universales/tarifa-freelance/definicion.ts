import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora } from "../../tipos";
import { montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiTarifaFreelance {
  ingreso: string;
  ingresoAyuda: string;
  gastos: string;
  gastosAyuda: string;
  impuestos: string;
  impuestosAyuda: string;
  diasLibres: string;
  diasLibresAyuda: string;
  diasSemana: string;
  horasSemana: string;
  horasSemanaAyuda: string;
  tarifaHora: string;
  tarifaDia: string;
  facturacionMensual: string;
  facturacionAnual: string;
  horasAnio: string;
  errorIngreso: string;
  errorImpuestos: string;
  errorDias: string;
  errorHoras: string;
  observacionFacturables: string;
}

export interface EntradaTarifa {
  ingreso: number;
  gastos: number;
  impuestos: number;
  diasLibres: number;
  diasSemana: number;
  horasSemana: number;
}

// Los impuestos se aplican sobre lo facturado menos los gastos del negocio, que en casi todos los
// sistemas son deducibles: facturado = ingreso neto ÷ (1 − impuestos) + gastos.
export function tarifa(e: EntradaTarifa): { facturado: number; dias: number; horas: number; hora: number; dia: number } {
  const facturado = e.ingreso / (1 - e.impuestos / 100) + e.gastos;
  const dias = 52 * e.diasSemana - e.diasLibres;
  const horasDia = e.horasSemana / e.diasSemana;
  const horas = dias * horasDia;
  const hora = facturado / horas;
  return { facturado, dias, horas, hora, dia: hora * horasDia };
}

export function definir(ctx: ContextoUniversal, ui: UiTarifaFreelance): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "tarifa-freelance",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "ingreso", tipo: "moneda", etiqueta: ui.ingreso, ayuda: ui.ingresoAyuda, min: 0, porDefecto: montoEjemplo(ctx, 40000) },
      { id: "gastos", tipo: "moneda", etiqueta: ui.gastos, ayuda: ui.gastosAyuda, min: 0, porDefecto: montoEjemplo(ctx, 5000) },
      { id: "impuestos", tipo: "porcentaje", etiqueta: ui.impuestos, ayuda: ui.impuestosAyuda, min: 0, max: 90, porDefecto: 25 },
      { id: "diasLibres", tipo: "entero", etiqueta: ui.diasLibres, ayuda: ui.diasLibresAyuda, min: 0, max: 300, porDefecto: 30 },
      { id: "diasSemana", tipo: "entero", etiqueta: ui.diasSemana, min: 1, max: 7, porDefecto: 5 },
      { id: "horasSemana", tipo: "numero", etiqueta: ui.horasSemana, ayuda: ui.horasSemanaAyuda, min: 0, max: 100, porDefecto: 25 },
    ],
    calcular(entrada, _valores, { redondear }) {
      if (entrada.ingreso <= 0) throw new ErrorEntrada(ui.errorIngreso, "ingreso");
      if (entrada.impuestos >= 100) throw new ErrorEntrada(ui.errorImpuestos, "impuestos");
      if (entrada.horasSemana <= 0) throw new ErrorEntrada(ui.errorHoras, "horasSemana");
      if (52 * entrada.diasSemana - entrada.diasLibres <= 0) throw new ErrorEntrada(ui.errorDias, "diasLibres");
      const r = tarifa(entrada);
      return {
        tarifaHora: redondear(r.hora),
        tarifaDia: redondear(r.dia),
        facturacionMensual: redondear(r.facturado / 12),
        facturacionAnual: redondear(r.facturado),
        horasAnio: Math.round(r.horas * 10) / 10,
        observaciones: [ui.observacionFacturables],
      };
    },
    resultado: [
      { clave: "tarifaHora", etiqueta: ui.tarifaHora, formato: "moneda", destacada: true },
      { clave: "tarifaDia", etiqueta: ui.tarifaDia, formato: "moneda", destacada: true },
      { clave: "facturacionMensual", etiqueta: ui.facturacionMensual, formato: "moneda" },
      { clave: "facturacionAnual", etiqueta: ui.facturacionAnual, formato: "moneda" },
      { clave: "horasAnio", etiqueta: ui.horasAnio, formato: "numero", decimales: 0 },
    ],
  });
}
