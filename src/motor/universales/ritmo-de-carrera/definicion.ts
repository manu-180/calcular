import { definirCalculadora, ErrorEntrada } from "../../calculo";
import { redondear } from "../../formato";
import type { DefinicionCalculadora } from "../../tipos";
import type { ContextoUniversal } from "../tipos";

export interface UiRitmo {
  calcular: string;
  calcRitmo: string;
  calcTiempo: string;
  calcDistancia: string;
  distancia: string;
  distanciaAyuda: string;
  otra: string;
  cincoK: string;
  diezK: string;
  media: string;
  maraton: string;
  distanciaOtra: (unidad: string) => string;
  horas: string;
  minutos: string;
  segundos: string;
  ritmoMin: (unidad: string) => string;
  ritmoSeg: string;
  ritmo: (unidad: string) => string;
  tiempo: string;
  distanciaRes: (unidad: string) => string;
  velocidad: (unidad: string) => string;
  errorDistancia: string;
  errorTiempo: string;
  errorRitmo: string;
}

export const KM_POR_MILLA = 1.609344;
export const DISTANCIAS_KM = { "5k": 5, "10k": 10, media: 21.0975, maraton: 42.195 } as const;

const r2 = (n: number) => redondear(n, { decimales: 2, modo: "mitad-arriba" });
const dos = (n: number) => String(n).padStart(2, "0");

export function reloj(segundos: number): string {
  const s = Math.round(segundos);
  return `${Math.floor(s / 3600)}:${dos(Math.floor((s % 3600) / 60))}:${dos(s % 60)}`;
}

export function ritmoTexto(segundos: number): string {
  const s = Math.round(segundos);
  return `${Math.floor(s / 60)}:${dos(s % 60)}`;
}

export function definir(ctx: ContextoUniversal, ui: UiRitmo): DefinicionCalculadora {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "mi" : "km";
  const uv = imperial ? "mph" : "km/h";
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "ritmo-de-carrera",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      {
        id: "calcular",
        tipo: "opcion",
        etiqueta: ui.calcular,
        opciones: [
          { valor: "ritmo", etiqueta: ui.calcRitmo },
          { valor: "tiempo", etiqueta: ui.calcTiempo },
          { valor: "distancia", etiqueta: ui.calcDistancia },
        ],
        porDefecto: "ritmo",
      },
      {
        id: "distancia",
        tipo: "opcion",
        etiqueta: ui.distancia,
        ayuda: ui.distanciaAyuda,
        opciones: [
          { valor: "5k", etiqueta: ui.cincoK },
          { valor: "10k", etiqueta: ui.diezK },
          { valor: "media", etiqueta: ui.media },
          { valor: "maraton", etiqueta: ui.maraton },
          { valor: "otra", etiqueta: ui.otra },
        ],
        porDefecto: "10k",
      },
      { id: "distanciaOtra", tipo: "numero", etiqueta: ui.distanciaOtra(u), min: 0, requerido: false },
      { id: "horas", tipo: "entero", etiqueta: ui.horas, min: 0, requerido: false, porDefecto: 0 },
      { id: "minutos", tipo: "entero", etiqueta: ui.minutos, min: 0, max: 59, requerido: false, porDefecto: 55 },
      { id: "segundos", tipo: "entero", etiqueta: ui.segundos, min: 0, max: 59, requerido: false, porDefecto: 0 },
      { id: "ritmoMin", tipo: "entero", etiqueta: ui.ritmoMin(u), min: 0, requerido: false, porDefecto: imperial ? 9 : 5 },
      { id: "ritmoSeg", tipo: "entero", etiqueta: ui.ritmoSeg, min: 0, max: 59, requerido: false, porDefecto: 30 },
    ],
    calcular(e) {
      const fija = e.distancia === "otra" ? null : DISTANCIAS_KM[e.distancia];
      const distanciaElegida = fija === null ? (e.distanciaOtra ?? 0) : imperial ? fija / KM_POR_MILLA : fija;
      const tiempoDado = (e.horas ?? 0) * 3600 + (e.minutos ?? 0) * 60 + (e.segundos ?? 0);
      const ritmoDado = (e.ritmoMin ?? 0) * 60 + (e.ritmoSeg ?? 0);
      let distancia: number;
      let segundos: number;
      let ritmo: number;
      if (e.calcular === "distancia") {
        if (tiempoDado <= 0) throw new ErrorEntrada(ui.errorTiempo, "minutos");
        if (ritmoDado <= 0) throw new ErrorEntrada(ui.errorRitmo, "ritmoMin");
        segundos = tiempoDado;
        ritmo = ritmoDado;
        distancia = segundos / ritmo;
      } else {
        if (distanciaElegida <= 0) throw new ErrorEntrada(ui.errorDistancia, "distanciaOtra");
        distancia = distanciaElegida;
        if (e.calcular === "tiempo") {
          if (ritmoDado <= 0) throw new ErrorEntrada(ui.errorRitmo, "ritmoMin");
          ritmo = ritmoDado;
          segundos = ritmo * distancia;
        } else {
          if (tiempoDado <= 0) throw new ErrorEntrada(ui.errorTiempo, "minutos");
          segundos = tiempoDado;
          ritmo = segundos / distancia;
        }
      }
      return {
        ritmo: ritmoTexto(ritmo),
        tiempo: reloj(segundos),
        distanciaRes: r2(distancia),
        velocidad: r2(distancia / (segundos / 3600)),
        ritmoSegundos: Math.round(ritmo),
        segundosTotales: Math.round(segundos),
      };
    },
    resultado: [
      { clave: "ritmo", etiqueta: ui.ritmo(u), formato: "texto", destacada: true },
      { clave: "tiempo", etiqueta: ui.tiempo, formato: "texto" },
      { clave: "distanciaRes", etiqueta: ui.distanciaRes(u), formato: "numero", decimales: 2 },
      { clave: "velocidad", etiqueta: ui.velocidad(uv), formato: "numero", decimales: 2 },
    ],
  });
}
