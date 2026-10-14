import { definirCalculadora, ErrorEntrada } from "../../calculo";
import { redondear } from "../../formato";
import type { DefinicionCalculadora } from "../../tipos";
import type { ContextoUniversal } from "../tipos";

export interface UiHormigon {
  largo: (u: string) => string;
  ancho: (u: string) => string;
  espesor: (u: string) => string;
  espesorAyuda: string;
  margen: string;
  margenAyuda: string;
  bolsa: (u: string) => string;
  volumen: (u: string) => string;
  volumenTotal: (u: string) => string;
  volumenPies: string;
  cemento: (u: string) => string;
  bolsas: string;
  arena: (u: string) => string;
  piedra: (u: string) => string;
  agua: (u: string) => string;
  errorMedida: string;
  aviso: string;
}

// Dosificación de referencia por m³ de hormigón terminado, mezcla 1:2:3 (cemento, arena, piedra)
// de uso general. Son valores de obra redondeados: el aviso dice que cambian según la dosificación.
export const MEZCLA = { cementoKg: 350, arenaM3: 0.55, piedraM3: 0.8, aguaL: 180 } as const;
const M3_POR_FT3 = 0.0283168466;
const KG_POR_LB = 0.45359237;
const L_POR_GALON = 3.785411784;

const r2 = (n: number) => redondear(n, { decimales: 2, modo: "mitad-arriba" });
const haciaArriba = (n: number) => Math.ceil(n - 1e-9);

export function definir(ctx: ContextoUniversal, ui: UiHormigon): DefinicionCalculadora {
  const imperial = ctx.unidades === "imperial";
  const ul = imperial ? "ft" : "m";
  const ue = imperial ? "in" : "cm";
  const uv = imperial ? "yd³" : "m³";
  const ua = imperial ? "ft³" : "m³";
  const up = imperial ? "lb" : "kg";
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "hormigon",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "largo", tipo: "numero", etiqueta: ui.largo(ul), min: 0, porDefecto: imperial ? 10 : 4 },
      { id: "ancho", tipo: "numero", etiqueta: ui.ancho(ul), min: 0, porDefecto: imperial ? 10 : 3 },
      { id: "espesor", tipo: "numero", etiqueta: ui.espesor(ue), ayuda: ui.espesorAyuda, min: 0, porDefecto: imperial ? 4 : 10 },
      { id: "margen", tipo: "porcentaje", etiqueta: ui.margen, ayuda: ui.margenAyuda, min: 0, max: 30, porDefecto: 5 },
      { id: "bolsa", tipo: "numero", etiqueta: ui.bolsa(up), min: 0, porDefecto: imperial ? 94 : 50 },
    ],
    calcular(e) {
      if (e.largo <= 0) throw new ErrorEntrada(ui.errorMedida, "largo");
      if (e.ancho <= 0) throw new ErrorEntrada(ui.errorMedida, "ancho");
      if (e.espesor <= 0) throw new ErrorEntrada(ui.errorMedida, "espesor");
      if (e.bolsa <= 0) throw new ErrorEntrada(ui.errorMedida, "bolsa");
      const factor = 1 + e.margen / 100;
      if (imperial) {
        const ft3 = e.largo * e.ancho * (e.espesor / 12);
        const totalFt3 = ft3 * factor;
        const m3 = totalFt3 * M3_POR_FT3;
        const cemento = (MEZCLA.cementoKg * m3) / KG_POR_LB;
        return {
          volumen: r2(ft3 / 27),
          volumenTotal: r2(totalFt3 / 27),
          volumenPies: r2(totalFt3),
          cemento: r2(cemento),
          bolsas: haciaArriba(cemento / e.bolsa),
          arena: r2(MEZCLA.arenaM3 * totalFt3),
          piedra: r2(MEZCLA.piedraM3 * totalFt3),
          agua: r2((MEZCLA.aguaL * m3) / L_POR_GALON),
          observaciones: [ui.aviso],
        };
      }
      const m3 = e.largo * e.ancho * (e.espesor / 100);
      const total = m3 * factor;
      const cemento = MEZCLA.cementoKg * total;
      return {
        volumen: r2(m3),
        volumenTotal: r2(total),
        volumenPies: null,
        cemento: r2(cemento),
        bolsas: haciaArriba(cemento / e.bolsa),
        arena: r2(MEZCLA.arenaM3 * total),
        piedra: r2(MEZCLA.piedraM3 * total),
        agua: r2(MEZCLA.aguaL * total),
        observaciones: [ui.aviso],
      };
    },
    resultado: [
      { clave: "volumenTotal", etiqueta: ui.volumenTotal(uv), formato: "numero", destacada: true },
      { clave: "volumen", etiqueta: ui.volumen(uv), formato: "numero" },
      { clave: "volumenPies", etiqueta: ui.volumenPies, formato: "numero" },
      { clave: "cemento", etiqueta: ui.cemento(up), formato: "numero", decimales: 0 },
      { clave: "bolsas", etiqueta: ui.bolsas, formato: "numero" },
      { clave: "arena", etiqueta: ui.arena(ua), formato: "numero" },
      { clave: "piedra", etiqueta: ui.piedra(ua), formato: "numero" },
      { clave: "agua", etiqueta: ui.agua(imperial ? "gal" : "L"), formato: "numero", decimales: 0 },
    ],
  });
}
