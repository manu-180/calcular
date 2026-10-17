import { definirCalculadora, ErrorEntrada } from "../../calculo";
import { redondear } from "../../formato";
import type { DefinicionCalculadora } from "../../tipos";
import { montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiConsumoElectrico {
  potencia: string;
  potenciaAyuda: string;
  cantidad: string;
  horas: string;
  dias: string;
  precio: string;
  precioAyuda: string;
  kwhDia: string;
  kwhMes: string;
  kwhAnio: string;
  costoDia: string;
  costoMes: string;
  costoAnio: string;
  errorHoras: string;
}

const r2 = (n: number) => redondear(n, { decimales: 2, modo: "mitad-arriba" });

export function definir(ctx: ContextoUniversal, ui: UiConsumoElectrico): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "consumo-electrico",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "potencia", tipo: "numero", etiqueta: ui.potencia, ayuda: ui.potenciaAyuda, min: 0, porDefecto: 1000 },
      { id: "cantidad", tipo: "entero", etiqueta: ui.cantidad, min: 1, porDefecto: 1 },
      { id: "horas", tipo: "numero", etiqueta: ui.horas, min: 0, max: 24, porDefecto: 4 },
      { id: "dias", tipo: "entero", etiqueta: ui.dias, min: 0, max: 31, porDefecto: 30 },
      { id: "precio", tipo: "moneda", etiqueta: ui.precio, ayuda: ui.precioAyuda, min: 0, porDefecto: montoEjemplo(ctx, 0.15) },
    ],
    calcular(e, _valores, { redondear: redondearMonto }) {
      if (e.horas < 0 || e.horas > 24) throw new ErrorEntrada(ui.errorHoras, "horas");
      const kwhDia = (e.potencia * e.cantidad * e.horas) / 1000;
      const kwhMes = kwhDia * e.dias;
      const kwhAnio = kwhMes * 12;
      return {
        kwhDia: r2(kwhDia),
        kwhMes: r2(kwhMes),
        kwhAnio: r2(kwhAnio),
        costoDia: redondearMonto(kwhDia * e.precio),
        costoMes: redondearMonto(kwhMes * e.precio),
        costoAnio: redondearMonto(kwhAnio * e.precio),
      };
    },
    resultado: [
      { clave: "costoMes", etiqueta: ui.costoMes, formato: "moneda", destacada: true },
      { clave: "kwhMes", etiqueta: ui.kwhMes, formato: "numero" },
      { clave: "costoDia", etiqueta: ui.costoDia, formato: "moneda" },
      { clave: "kwhDia", etiqueta: ui.kwhDia, formato: "numero" },
      { clave: "costoAnio", etiqueta: ui.costoAnio, formato: "moneda" },
      { clave: "kwhAnio", etiqueta: ui.kwhAnio, formato: "numero" },
    ],
  });
}
