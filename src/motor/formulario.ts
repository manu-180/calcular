import { contextoDesdeSerializado, ErrorEntrada } from "./calculo";
import { formatearFecha, formatearMoneda, formatearNumero, formatearPorcentaje, formatearValorUnidad, parsearFecha, parsearNumero, sugerenciaMiles } from "./formato";
import { interpolar, textosMotor, type CodigoError, type TextosMotor } from "./textos";
import type {
  AvisoResuelto,
  Campo,
  ContextoSerializado,
  DefinicionCalculadora,
  OpcionDinamica,
  PropsCalculadora,
  ResultadoBase,
  ValorEntrada,
  Idioma,
  Trato,
  ValorResultado,
} from "./tipos";

export type Crudos = Readonly<Record<string, string | boolean>>;

export type ErrorCampo = { codigo: CodigoError; params?: Readonly<Record<string, string>> } | { mensaje: string };

export type ResultadoParseo =
  | { ok: true; entrada: Readonly<Record<string, ValorEntrada>> }
  | { ok: false; errores: Readonly<Record<string, ErrorCampo>> };

export interface FilaFormateada {
  clave: string;
  etiqueta: string;
  texto: string;
  destacada: boolean;
  ayuda?: string;
}

export type EstadoCalculo =
  | { tipo: "inicial" }
  | { tipo: "errores"; errores: Readonly<Record<string, ErrorCampo>> }
  | { tipo: "bloqueado"; avisos: readonly AvisoResuelto[] }
  | { tipo: "fallo"; mensaje: string }
  | { tipo: "ok"; filas: readonly FilaFormateada[]; observaciones: readonly string[]; resultado: ResultadoBase };

export function opcionesDe(campo: Campo, contexto: ContextoSerializado, dinamicas: PropsCalculadora["opcionesDinamicas"]): readonly OpcionDinamica[] {
  if (campo.tipo === "opcion") return campo.opciones;
  if (campo.tipo === "region") {
    const solo = campo.regiones;
    return contexto.regiones.filter((r) => !solo || solo.includes(r.id)).map((r) => ({ valor: r.id, etiqueta: r.nombre }));
  }
  if (campo.tipo === "opcion-dato") return dinamicas[campo.id] ?? [];
  return [];
}

// Un campo con visibleSi se muestra y se valida solo si cada campo nombrado tiene uno de sus valores.
export function campoVisible(campo: Campo, crudos: Crudos): boolean {
  if (!campo.visibleSi) return true;
  return Object.entries(campo.visibleSi).every(([otro, valores]) => valores.includes(crudos[otro] as string | boolean));
}

export const RE_HORA = /^([01]\d|2[0-3]):[0-5]\d$/;

export function valoresIniciales(campos: readonly Campo[], contexto: ContextoSerializado, dinamicas: PropsCalculadora["opcionesDinamicas"]): Crudos {
  const crudos: Record<string, string | boolean> = {};
  for (const c of campos) {
    switch (c.tipo) {
      case "si-no":
        crudos[c.id] = c.porDefecto ?? false;
        break;
      case "fecha":
        crudos[c.id] = c.porDefecto === "hoy" ? contexto.fecha : (c.porDefecto ?? "");
        break;
      case "hora":
        crudos[c.id] = c.porDefecto ?? "";
        break;
      case "opcion":
      case "region":
      case "opcion-dato": {
        const opciones = opcionesDe(c, contexto, dinamicas);
        crudos[c.id] = c.porDefecto ?? (opciones.length === 1 ? opciones[0].valor : "");
        break;
      }
      default:
        crudos[c.id] = c.porDefecto === undefined ? "" : formatearNumero(c.porDefecto, contexto.locale, c.tipo === "entero" ? 0 : undefined);
    }
  }
  return crudos;
}

function ejemploDe(campo: Campo, locale: string): string {
  return formatearNumero(campo.tipo === "porcentaje" ? 12.5 : campo.tipo === "entero" ? 12 : 1234.5, locale, campo.tipo === "entero" ? 0 : undefined);
}

function mensajeMilesAmbiguos(sugerido: string, separador: string, idioma: Idioma, trato: Trato, locale: string): string {
  const t = textosMotor(idioma, trato, locale);
  return interpolar(t.milesAmbiguos, { sugerido, signos: separador === "." ? t.separadores.punto : t.separadores.coma });
}

export function parsearEntrada(
  campos: readonly Campo[],
  crudos: Crudos,
  contexto: ContextoSerializado,
  dinamicas: PropsCalculadora["opcionesDinamicas"],
): ResultadoParseo {
  const entrada: Record<string, ValorEntrada> = {};
  const errores: Record<string, ErrorCampo> = {};
  for (const c of campos) {
    const crudo = crudos[c.id];
    const requerido = c.requerido !== false;
    if (!campoVisible(c, crudos)) {
      entrada[c.id] = null;
      continue;
    }
    if (c.tipo === "si-no") {
      entrada[c.id] = crudo === true;
      continue;
    }
    const texto = typeof crudo === "string" ? crudo.trim() : "";
    if (texto === "") {
      if (requerido) errores[c.id] = { codigo: "requerido" };
      else entrada[c.id] = null;
      continue;
    }
    switch (c.tipo) {
      case "fecha": {
        const f = parsearFecha(texto);
        if (!f) errores[c.id] = { codigo: "fecha-invalida" };
        else if (c.min && f < c.min) errores[c.id] = { codigo: "menor-que-min", params: { min: formatearFecha(c.min, contexto.locale) } };
        else if (c.max && f > c.max) errores[c.id] = { codigo: "mayor-que-max", params: { max: formatearFecha(c.max, contexto.locale) } };
        else entrada[c.id] = f;
        break;
      }
      case "hora": {
        if (!RE_HORA.test(texto)) errores[c.id] = { codigo: "hora-invalida" };
        else if (c.min && texto < c.min) errores[c.id] = { codigo: "menor-que-min", params: { min: c.min } };
        else if (c.max && texto > c.max) errores[c.id] = { codigo: "mayor-que-max", params: { max: c.max } };
        else entrada[c.id] = texto;
        break;
      }
      case "opcion":
      case "region":
      case "opcion-dato": {
        const validas = opcionesDe(c, contexto, dinamicas).map((o) => o.valor);
        if (!validas.includes(texto)) errores[c.id] = { codigo: c.tipo === "region" ? "region-invalida" : "opcion-invalida" };
        else entrada[c.id] = texto;
        break;
      }
      default: {
        const milesAmbiguos = c.tipo === "moneda" || c.tipo === "entero";
        const n = parsearNumero(texto, contexto.locale, { milesAmbiguos });
        const sugerencia = n === null && milesAmbiguos ? sugerenciaMiles(texto, contexto.locale) : null;
        if (sugerencia) errores[c.id] = { mensaje: mensajeMilesAmbiguos(sugerencia.sugerido, sugerencia.separador, contexto.idioma, contexto.trato, contexto.locale) };
        else if (n === null) errores[c.id] = { codigo: "numero-invalido", params: { ejemplo: ejemploDe(c, contexto.locale) } };
        else if (c.tipo === "entero" && !Number.isInteger(n)) errores[c.id] = { codigo: "entero-invalido" };
        else if (c.min !== undefined && n < c.min) errores[c.id] = { codigo: "menor-que-min", params: { min: formatearNumero(c.min, contexto.locale) } };
        else if (c.max !== undefined && n > c.max) errores[c.id] = { codigo: "mayor-que-max", params: { max: formatearNumero(c.max, contexto.locale) } };
        else entrada[c.id] = n;
      }
    }
  }
  return Object.keys(errores).length ? { ok: false, errores } : { ok: true, entrada };
}

function textoFila(valor: ValorResultado, fila: DefinicionCalculadora["resultado"][number], contexto: ContextoSerializado): string | null {
  if (valor === null || valor === undefined) return null;
  if (fila.formato === "texto") return typeof valor === "string" ? valor : null;
  if (fila.formato === "fecha") return typeof valor === "string" ? formatearFecha(valor as `${number}-${number}-${number}`, contexto.locale) : null;
  if (typeof valor !== "number" || !Number.isFinite(valor)) return null;
  if (fila.ocultarSiCero && valor === 0) return null;
  switch (fila.formato) {
    case "moneda":
      return formatearMoneda(valor, contexto.locale, fila.moneda ?? contexto.moneda, fila.decimales, contexto.simbolos?.[fila.moneda ?? contexto.moneda]);
    case "porcentaje":
      return formatearPorcentaje(valor, contexto.locale, fila.decimales ?? 2);
    case "numero":
      return formatearNumero(valor, contexto.locale, fila.decimales);
    default:
      return formatearValorUnidad(valor, fila.formato, contexto.locale);
  }
}

export function formatearFilas(definicion: DefinicionCalculadora, resultado: ResultadoBase, contexto: ContextoSerializado): FilaFormateada[] {
  const filas: FilaFormateada[] = [];
  for (const fila of definicion.resultado) {
    const texto = textoFila(resultado[fila.clave], fila, contexto);
    if (texto === null) continue;
    filas.push({ clave: fila.clave, etiqueta: fila.etiqueta, texto, destacada: fila.destacada === true, ...(fila.ayuda ? { ayuda: fila.ayuda } : {}) });
  }
  return filas;
}

export function ejecutar(definicion: DefinicionCalculadora, crudos: Crudos, props: PropsCalculadora, textos: TextosMotor): EstadoCalculo {
  const bloqueos = props.avisos.filter((a) => a.nivel === "bloquea");
  if (bloqueos.length) return { tipo: "bloqueado", avisos: bloqueos };
  const parseo = parsearEntrada(definicion.campos, crudos, props.contexto, props.opcionesDinamicas);
  if (!parseo.ok) return { tipo: "errores", errores: parseo.errores };
  try {
    const resultado = definicion.calcular(
      parseo.entrada as Parameters<DefinicionCalculadora["calcular"]>[0],
      props.valores as Parameters<DefinicionCalculadora["calcular"]>[1],
      contextoDesdeSerializado(props.contexto),
    );
    const obs = resultado.observaciones;
    return {
      tipo: "ok",
      filas: formatearFilas(definicion, resultado, props.contexto),
      observaciones: Array.isArray(obs) ? obs.filter((x): x is string => typeof x === "string") : [],
      resultado,
    };
  } catch (err) {
    if (err instanceof ErrorEntrada) {
      if (err.campo) return { tipo: "errores", errores: { [err.campo]: err.codigo ? { codigo: err.codigo } : { mensaje: err.message } } };
      return { tipo: "fallo", mensaje: err.codigo ? textos.errores[err.codigo] : err.message };
    }
    console.error(`[${definicion.id}] el cálculo falló`, err);
    return { tipo: "fallo", mensaje: textos.errores["calculo-fallido"] };
  }
}

export function mensajeDeError(error: ErrorCampo, textos: TextosMotor): string {
  return "mensaje" in error ? error.mensaje : interpolar(textos.errores[error.codigo], error.params);
}
