import { definirCalculadora, ErrorEntrada } from "../../calculo";
import { redondear } from "../../formato";
import type { Campo, DefinicionCalculadora } from "../../tipos";
import { montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiCombustible {
  distancia: (unidad: string) => string;
  idaYVuelta: string;
  tipoConsumo: string;
  l100: string;
  kml: string;
  consumo: string;
  consumoMpg: string;
  consumoAyuda: string;
  precio: (unidad: string) => string;
  personas: string;
  costo: string;
  porPersona: string;
  combustible: (unidad: string) => string;
  distanciaTotal: (unidad: string) => string;
  costoPorDistancia: (unidad: string) => string;
  errorConsumo: string;
  errorPersonas: string;
}

const r2 = (n: number) => redondear(n, { decimales: 2, modo: "mitad-arriba" });

export function definir(ctx: ContextoUniversal, ui: UiCombustible): DefinicionCalculadora {
  const imperial = ctx.unidades === "imperial";
  const ud = imperial ? "mi" : "km";
  const uv = imperial ? "gal" : "L";
  const campos: Campo[] = [
    { id: "distancia", tipo: "numero", etiqueta: ui.distancia(ud), min: 0, porDefecto: imperial ? 200 : 300 },
    { id: "idaYVuelta", tipo: "si-no", etiqueta: ui.idaYVuelta, porDefecto: false },
    ...(imperial
      ? ([{ id: "consumo", tipo: "numero", etiqueta: ui.consumoMpg, ayuda: ui.consumoAyuda, min: 0, porDefecto: 30 }] as const)
      : ([
          {
            id: "tipoConsumo",
            tipo: "opcion",
            etiqueta: ui.tipoConsumo,
            opciones: [
              { valor: "l100", etiqueta: ui.l100 },
              { valor: "kml", etiqueta: ui.kml },
            ],
            porDefecto: "l100",
          },
          { id: "consumo", tipo: "numero", etiqueta: ui.consumo, ayuda: ui.consumoAyuda, min: 0, porDefecto: 8 },
        ] as const)),
    { id: "precio", tipo: "moneda", etiqueta: ui.precio(imperial ? "gal" : "L"), min: 0, porDefecto: montoEjemplo(ctx, imperial ? 3.5 : 1.2) },
    { id: "personas", tipo: "entero", etiqueta: ui.personas, min: 1, porDefecto: 1 },
  ];
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "combustible",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos,
    calcular(entrada, _valores, { redondear: redondearMonto }) {
      const e = entrada as Readonly<Record<string, number | string | boolean | null>>;
      const consumo = Number(e.consumo ?? 0);
      const personas = Number(e.personas ?? 1);
      if (consumo <= 0) throw new ErrorEntrada(ui.errorConsumo, "consumo");
      if (personas < 1 || !Number.isInteger(personas)) throw new ErrorEntrada(ui.errorPersonas, "personas");
      const distanciaTotal = Number(e.distancia ?? 0) * (e.idaYVuelta === true ? 2 : 1);
      const volumen = imperial || e.tipoConsumo === "kml" ? distanciaTotal / consumo : (distanciaTotal * consumo) / 100;
      const costo = redondearMonto(volumen * Number(e.precio ?? 0));
      return {
        costo,
        porPersona: redondearMonto(costo / personas),
        combustible: r2(volumen),
        distanciaTotal: r2(distanciaTotal),
        costoPorDistancia: distanciaTotal > 0 ? redondearMonto(costo / distanciaTotal) : null,
      };
    },
    resultado: [
      { clave: "costo", etiqueta: ui.costo, formato: "moneda", destacada: true },
      { clave: "porPersona", etiqueta: ui.porPersona, formato: "moneda" },
      { clave: "combustible", etiqueta: ui.combustible(uv), formato: "numero", decimales: 2 },
      { clave: "distanciaTotal", etiqueta: ui.distanciaTotal(ud), formato: "numero" },
      { clave: "costoPorDistancia", etiqueta: ui.costoPorDistancia(ud), formato: "moneda" },
    ],
  });
}
