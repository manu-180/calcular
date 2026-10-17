import { ErrorEntrada } from "./calculo";
import type { Campo, CampoOpcion, DefinicionCalculadora, Requisitos, ResultadoBase, TablaResultado, ValorResultado } from "./tipos";

// Textos de una calculadora del país en el idioma de una edición (ca-fr traduce ca.vacation-pay).
// La fórmula es la del país: la edición solo pisa etiquetas, ayudas, opciones, filas, títulos de
// tablas y los mensajes que devuelve calcular() (errores propios, observaciones, columnas). Lo usan el
// servidor (registro) y el navegador (cargadores), así que este módulo no importa nada del registro.

// porDefecto: el valor inicial en la edición cuando su público es otro (Quebec en ca-fr elige la
// región qc o el plan RRQ). No es texto, pero sin esto la edición abre con el valor del país base.
export interface TextoCampo {
  etiqueta: string;
  ayuda?: string;
  opciones?: Readonly<Record<string, string>>;
  porDefecto?: string | number | boolean;
}

export interface TextoFila {
  etiqueta: string;
  ayuda?: string;
}

export interface TextosEdicion {
  // id en la edición: "<edición>.<mismo id local que en el país>" (ca-fr.vacation-pay).
  calculadora: string;
  // id en el país (ca.vacation-pay); lo pone definirTextos.
  base: string;
  slug: string;
  campos: Readonly<Record<string, TextoCampo>>;
  filas: Readonly<Record<string, TextoFila>>;
  tablas?: Readonly<Record<string, string>>;
  // Texto exacto que devuelve o lanza calcular() en el idioma del país -> texto en la edición.
  mensajes?: Readonly<Record<string, string>>;
  // Para mensajes armados con números (`Enter at most ${max}`): devuelve la traducción o undefined.
  traducir?: (texto: string) => string | undefined;
}

type ValoresDeOpcion<K> = K extends { opciones: readonly { valor: infer V }[] } ? (V extends string ? V : string) : string;
type TextoDeCampo<K> = K extends { tipo: "opcion" } ? TextoCampo & { opciones: Readonly<Record<ValoresDeOpcion<K>, string>> } : TextoCampo;
type TextosDeCampos<C extends readonly Campo[]> = { readonly [K in C[number] as K["id"]]: TextoDeCampo<K> };
type ClavesDeFila<R> = { [K in keyof R]-?: Exclude<R[K], undefined> extends number | string | null ? K : never }[keyof R] & string;

export interface DeclaracionTextos<C extends readonly Campo[], R extends ResultadoBase> {
  calculadora: string;
  slug: string;
  campos: TextosDeCampos<C>;
  filas: { readonly [K in ClavesDeFila<R>]?: TextoFila };
  tablas?: Readonly<Record<string, string>>;
  mensajes?: Readonly<Record<string, string>>;
  traducir?: (texto: string) => string | undefined;
}

// Los campos se tipan con los de la definición del país: falta uno o sobra uno y no compila. Las
// filas, opciones que no son literales y ayudas se revisan en definirEdicion (faltantesDeTextos).
export function definirTextos<C extends readonly Campo[], Q extends Requisitos, R extends ResultadoBase>(
  base: DefinicionCalculadora<C, Q, R>,
  textos: DeclaracionTextos<C, R>,
): TextosEdicion {
  return { ...(textos as unknown as Omit<TextosEdicion, "base">), base: base.id };
}

function traductor(t: TextosEdicion): (texto: string) => string {
  return (texto) => t.mensajes?.[texto] ?? t.traducir?.(texto) ?? texto;
}

function traducirValor(v: ValorResultado, tr: (s: string) => string): ValorResultado {
  if (typeof v === "string") return tr(v);
  if (Array.isArray(v)) return (v as readonly string[]).map((x) => (typeof x === "string" ? tr(x) : x));
  if (v && typeof v === "object" && (v as TablaResultado).tipo === "tabla") {
    const tabla = v as TablaResultado;
    return {
      tipo: "tabla",
      columnas: tabla.columnas.map((c) => ({ ...c, etiqueta: tr(c.etiqueta) })),
      filas: tabla.filas.map((f) => f.map((celda) => (typeof celda === "string" ? tr(celda) : celda))),
    };
  }
  return v;
}

export function aplicarTextos(base: DefinicionCalculadora, t: TextosEdicion): DefinicionCalculadora {
  const tr = traductor(t);
  const campos = base.campos.map((c): Campo => {
    const x = t.campos[c.id];
    if (!x) return c;
    const conTexto = { ...c, etiqueta: x.etiqueta, ...(x.ayuda ? { ayuda: x.ayuda } : {}), ...(x.porDefecto !== undefined ? { porDefecto: x.porDefecto } : {}) };
    if (c.tipo !== "opcion") return conTexto as Campo;
    return { ...(conTexto as CampoOpcion), opciones: c.opciones.map((o) => ({ ...o, etiqueta: x.opciones?.[o.valor] ?? o.etiqueta })) };
  });
  const resultado = base.resultado.map((f) => {
    const x = t.filas[f.clave];
    return x ? { ...f, etiqueta: x.etiqueta, ...(x.ayuda ? { ayuda: x.ayuda } : {}) } : f;
  });
  return {
    ...base,
    id: t.calculadora,
    mercado: t.calculadora.split(".")[0],
    slug: t.slug,
    campos,
    resultado,
    ...(base.tablas ? { tablas: base.tablas.map((tb) => ({ ...tb, titulo: t.tablas?.[tb.clave] ?? tb.titulo })) } : {}),
    calcular(entrada, valores, contexto) {
      let r: ResultadoBase;
      try {
        r = base.calcular(entrada, valores, contexto);
      } catch (err) {
        if (err instanceof ErrorEntrada && err.codigo === null) throw new ErrorEntrada(tr(err.message), err.campo);
        throw err;
      }
      const salida: Record<string, ValorResultado> = {};
      for (const [k, v] of Object.entries(r)) salida[k] = traducirValor(v, tr);
      return salida;
    },
  };
}

// Lo que la edición todavía no tradujo: campos, opciones, ayudas, filas y títulos de tablas. Los
// mensajes de calcular() no se pueden listar sin correrla: los revisa check_paises_casos con los
// casos del país.
export function faltantesDeTextos(base: DefinicionCalculadora, t: TextosEdicion): string[] {
  const f: string[] = [];
  for (const c of base.campos) {
    const x = t.campos[c.id];
    if (!x?.etiqueta?.trim()) {
      f.push(`campo ${c.id}`);
      continue;
    }
    if (c.ayuda && !x.ayuda?.trim()) f.push(`ayuda del campo ${c.id}`);
    if (c.tipo === "opcion") for (const o of c.opciones) if (!x.opciones?.[o.valor]?.trim()) f.push(`opción ${o.valor} del campo ${c.id}`);
  }
  for (const fila of base.resultado) {
    const x = t.filas[fila.clave];
    if (!x?.etiqueta?.trim()) f.push(`fila ${fila.clave}`);
    else if (fila.ayuda && !x.ayuda?.trim()) f.push(`ayuda de la fila ${fila.clave}`);
  }
  for (const tb of base.tablas ?? []) if (!t.tablas?.[tb.clave]?.trim()) f.push(`tabla ${tb.clave}`);
  for (const id of Object.keys(t.campos)) if (!base.campos.some((c) => c.id === id)) f.push(`sobra el campo ${id}`);
  for (const clave of Object.keys(t.filas)) if (!base.resultado.some((r) => r.clave === clave)) f.push(`sobra la fila ${clave}`);
  return f;
}

// Lo usan los cargadores generados de una edición publicada (cargadores/<edición>.ts) y el cargador
// de desarrollo: baja en paralelo la definición del país y los textos de la edición.
export async function traducida(definicion: Promise<{ default: unknown }>, textos: Promise<{ default: unknown }>): Promise<{ default: DefinicionCalculadora }> {
  const [d, t] = await Promise.all([definicion, textos]);
  return { default: aplicarTextos(d.default as DefinicionCalculadora, t.default as TextosEdicion) };
}
