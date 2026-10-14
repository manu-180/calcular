import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora } from "../../tipos";
import { montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiCostoDeUnAuto {
  precio: string;
  precioAyuda: string;
  depreciacion: string;
  depreciacionAyuda: string;
  cuota: string;
  cuotaAyuda: string;
  seguro: string;
  distanciaKm: string;
  distanciaMi: string;
  consumoL100: string;
  consumoMpg: string;
  precioLitro: string;
  precioGalon: string;
  mantenimiento: string;
  mantenimientoAyuda: string;
  estacionamiento: string;
  otros: string;
  otrosAyuda: string;
  costoMensual: string;
  costoAnual: string;
  porKm: string;
  porMilla: string;
  combustible: string;
  depreciacionMensual: string;
  gastoBolsillo: string;
  errorConsumo: string;
  observacionCuota: string;
}

export interface GastosAuto {
  precio: number;
  depreciacion: number;
  seguro: number;
  distancia: number;
  consumo: number;
  precioCombustible: number;
  mantenimiento: number;
  estacionamiento: number;
  otros: number;
}

// Métrico: consumo en litros cada 100 km. Imperial (EE. UU.): millas por galón. Es lo que cada
// persona ve en el tablero de su auto, por eso el campo cambia de sentido y no solo de unidad.
export function combustibleMensual(g: Pick<GastosAuto, "distancia" | "consumo" | "precioCombustible">, imperial: boolean): number {
  if (g.distancia === 0) return 0;
  return imperial ? (g.distancia / g.consumo) * g.precioCombustible : ((g.distancia * g.consumo) / 100) * g.precioCombustible;
}

export function costoMensual(g: GastosAuto, imperial: boolean): number {
  return (g.precio * g.depreciacion) / 100 / 12 + g.seguro + combustibleMensual(g, imperial) + g.mantenimiento + g.estacionamiento + g.otros;
}

export function definir(ctx: ContextoUniversal, ui: UiCostoDeUnAuto): DefinicionCalculadora {
  const imperial = ctx.unidades === "imperial";
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "costo-de-un-auto",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "precio", tipo: "moneda", etiqueta: ui.precio, ayuda: ui.precioAyuda, min: 0, porDefecto: montoEjemplo(ctx, 25000) },
      { id: "depreciacion", tipo: "porcentaje", etiqueta: ui.depreciacion, ayuda: ui.depreciacionAyuda, min: 0, max: 100, porDefecto: 15 },
      { id: "cuota", tipo: "moneda", etiqueta: ui.cuota, ayuda: ui.cuotaAyuda, min: 0, requerido: false },
      { id: "seguro", tipo: "moneda", etiqueta: ui.seguro, min: 0, porDefecto: montoEjemplo(ctx, 100) },
      { id: "distancia", tipo: "numero", etiqueta: imperial ? ui.distanciaMi : ui.distanciaKm, min: 0, porDefecto: 1000 },
      { id: "consumo", tipo: "numero", etiqueta: imperial ? ui.consumoMpg : ui.consumoL100, min: 0, porDefecto: imperial ? 28 : 8 },
      {
        id: "precioCombustible",
        tipo: "moneda",
        etiqueta: imperial ? ui.precioGalon : ui.precioLitro,
        min: 0,
        porDefecto: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
      },
      { id: "mantenimiento", tipo: "moneda", etiqueta: ui.mantenimiento, ayuda: ui.mantenimientoAyuda, min: 0, porDefecto: montoEjemplo(ctx, 60) },
      { id: "estacionamiento", tipo: "moneda", etiqueta: ui.estacionamiento, min: 0, requerido: false },
      { id: "otros", tipo: "moneda", etiqueta: ui.otros, ayuda: ui.otrosAyuda, min: 0, requerido: false },
    ],
    calcular(entrada, _valores, { redondear }) {
      if (entrada.distancia > 0 && entrada.consumo <= 0) throw new ErrorEntrada(ui.errorConsumo, "consumo");
      const g: GastosAuto = { ...entrada, estacionamiento: entrada.estacionamiento ?? 0, otros: entrada.otros ?? 0 };
      const mensual = redondear(costoMensual(g, imperial));
      const operativo = mensual - (g.precio * g.depreciacion) / 100 / 12;
      const cuota = entrada.cuota ?? 0;
      return {
        costoMensual: mensual,
        costoAnual: redondear(costoMensual(g, imperial) * 12),
        porDistancia: g.distancia > 0 ? redondear(costoMensual(g, imperial) / g.distancia) : null,
        combustible: redondear(combustibleMensual(g, imperial)),
        depreciacionMensual: redondear((g.precio * g.depreciacion) / 100 / 12),
        gastoBolsillo: cuota > 0 ? redondear(operativo + cuota) : null,
        observaciones: cuota > 0 ? [ui.observacionCuota] : [],
      };
    },
    resultado: [
      { clave: "costoMensual", etiqueta: ui.costoMensual, formato: "moneda", destacada: true },
      { clave: "costoAnual", etiqueta: ui.costoAnual, formato: "moneda" },
      { clave: "porDistancia", etiqueta: imperial ? ui.porMilla : ui.porKm, formato: "moneda" },
      { clave: "combustible", etiqueta: ui.combustible, formato: "moneda" },
      { clave: "depreciacionMensual", etiqueta: ui.depreciacionMensual, formato: "moneda" },
      { clave: "gastoBolsillo", etiqueta: ui.gastoBolsillo, formato: "moneda" },
    ],
  });
}
