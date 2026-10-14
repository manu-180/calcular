import { definirCalculadora, ErrorEntrada } from "../../calculo";
import { formatearNumero, redondear } from "../../formato";
import type { DefinicionCalculadora } from "../../tipos";
import type { ContextoUniversal } from "../tipos";

export interface UiVariacion {
  inicial: string;
  final: string;
  variacion: string;
  diferencia: string;
  vuelta: string;
  vueltaAyuda: string;
  errorInicialCero: string;
  subio: (p: string) => string;
  bajo: (p: string) => string;
  igual: string;
}

const r4 = (n: number) => redondear(n, { decimales: 4, modo: "mitad-arriba" });

export function definir(ctx: ContextoUniversal, ui: UiVariacion): DefinicionCalculadora {
  const f = (n: number) => formatearNumero(Math.abs(n), ctx.locale);
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "variacion-porcentual",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "inicial", tipo: "numero", etiqueta: ui.inicial, porDefecto: 80 },
      { id: "final", tipo: "numero", etiqueta: ui.final, porDefecto: 100 },
    ],
    calcular({ inicial, final }) {
      if (inicial === 0) throw new ErrorEntrada(ui.errorInicialCero, "inicial");
      const diferencia = r4(final - inicial);
      const variacion = r4((diferencia / Math.abs(inicial)) * 100);
      const vuelta = final === 0 ? null : r4(((inicial - final) / Math.abs(final)) * 100);
      const frase = variacion > 0 ? ui.subio(f(variacion)) : variacion < 0 ? ui.bajo(f(variacion)) : ui.igual;
      return { variacion, diferencia, vuelta, observaciones: [frase] };
    },
    resultado: [
      { clave: "variacion", etiqueta: ui.variacion, formato: "porcentaje", destacada: true },
      { clave: "diferencia", etiqueta: ui.diferencia, formato: "numero" },
      { clave: "vuelta", etiqueta: ui.vuelta, ayuda: ui.vueltaAyuda, formato: "porcentaje" },
    ],
  });
}
