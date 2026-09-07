// Motor de la caducidad de instancia del art. 46 de la Ley 18.345. Funciones puras, sin fetch.
//
// ⚠️ ENCUADRE — esto NO declara caducada una instancia. La caducidad la declara el juez, y hay
// actos que interrumpen el plazo y situaciones que lo suspenden y que ningún formulario puede
// conocer. Lo que se calcula es la fecha en la que se cumple el plazo del artículo contando desde
// el acto de impulso que declara el usuario.
//
// LA AMBIGÜEDAD QUE SE MUESTRA EN VEZ DE RESOLVERSE: el art. 93 de la Ley 27.802 aplica el Título
// «a todos los procesos en trámite a partir del día siguiente al de la publicación», pero no dice
// desde cuándo se cuenta el plazo cuando el último acto de impulso es ANTERIOR a esa fecha. Las
// dos lecturas razonables —contar desde el último acto, o contar desde la entrada en vigencia—
// dan resultados muy distintos justamente en los expedientes más viejos, que son los que más
// riesgo corren. Se calculan las dos y se dice que la ley no elige.
//
// LOS PLAZOS SON EN MESES, no en días: el artículo dice «seis (6) meses», «tres (3) meses» y «un
// (1) mes». Sumar meses tiene una trampa conocida —el 31 de agosto más seis meses no existe— y se
// resuelve como es estándar: se ancla al último día del mes de destino.
//
// TODA LA ARITMÉTICA DE FECHAS ES EN UTC, por la misma razón que en lib/licencias.ts.

import { APLICACION_ISO, INSTANCIAS, type TipoInstancia } from "@/data/caducidad-instancia";
import { aISO, parseFechaISO } from "@/lib/licencias";

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoCaducidad = {
  instancia: TipoInstancia;
  /** Fecha en que se cumple el plazo contando desde el último acto de impulso. */
  desdeElActo: string;
  /**
   * Fecha contando desde el 7/3/2026, la de aplicación del art. 93. Sólo se informa cuando el
   * último acto es anterior a esa fecha: si es posterior, las dos cuentas coinciden.
   */
  desdeLaVigencia: string | null;
  /** True si el acto de impulso declarado es anterior a la aplicación de la reforma. */
  actoAnteriorALaReforma: boolean;
  /** Días que faltan hasta la fecha más temprana de las calculadas. Negativo si ya pasó. */
  diasHastaLaMasTemprana: number | null;
  avisos: Aviso[];
};

const MS_DIA = 86_400_000;

/** Suma meses calendario anclando al último día del mes cuando el día no existe en el destino. */
export function sumarMeses(fecha: Date, meses: number): Date {
  const a = fecha.getUTCFullYear();
  const m = fecha.getUTCMonth();
  const d = fecha.getUTCDate();
  const destino = new Date(Date.UTC(a, m + meses, 1));
  const ultimoDiaDelMes = new Date(
    Date.UTC(destino.getUTCFullYear(), destino.getUTCMonth() + 1, 0),
  ).getUTCDate();
  return new Date(
    Date.UTC(destino.getUTCFullYear(), destino.getUTCMonth(), Math.min(d, ultimoDiaDelMes)),
  );
}

export function calcularCaducidad(params: {
  instanciaId: string;
  /** Fecha del último acto que instó el curso del proceso. */
  ultimoImpulsoISO: string;
  /** Fecha de referencia para el «cuánto falta». Opcional: si no viene, no se calcula. */
  hoyISO?: string;
}): ResultadoCaducidad | null {
  const instancia = INSTANCIAS.find((i) => i.id === params.instanciaId);
  if (!instancia) return null;

  const acto = parseFechaISO(params.ultimoImpulsoISO);
  if (!acto) return null;

  const aplicacion = parseFechaISO(APLICACION_ISO)!;
  const actoAnteriorALaReforma = acto < aplicacion;

  const desdeElActo = sumarMeses(acto, instancia.meses);
  const desdeLaVigencia = actoAnteriorALaReforma
    ? sumarMeses(aplicacion, instancia.meses)
    : null;

  const masTemprana = desdeElActo;
  const hoy = params.hoyISO ? parseFechaISO(params.hoyISO) : null;
  const diasHastaLaMasTemprana = hoy
    ? Math.round((masTemprana.getTime() - hoy.getTime()) / MS_DIA)
    : null;

  const avisos: Aviso[] = [];

  avisos.push({
    tono: "bloqueante",
    texto:
      "Hasta el 5 de marzo de 2026 el artículo 46 se llamaba «Impulso de oficio» y decía que el procedimiento «será impulsado de oficio por los jueces». Un expediente parado no se caía. Desde el 6 de marzo de 2026 se impulsa por las partes y caduca solo, y el propio artículo aclara que es «sin necesidad de intimación previa».",
  });

  if (actoAnteriorALaReforma) {
    avisos.push({
      tono: "atencion",
      texto:
        "El último acto de impulso que declaraste es anterior a la aplicación de la reforma. El art. 93 de la Ley 27.802 dice que el Título se aplica «a todos los procesos en trámite» desde el 7 de marzo de 2026, pero no dice desde cuándo se cuenta el plazo en esos casos. Por eso arriba hay dos fechas: la de contar desde tu acto y la de contar desde la entrada en vigencia. Ninguna de las dos está escrita en la ley como la correcta.",
    });
  }

  avisos.push({
    tono: "atencion",
    texto:
      "La instancia «se abre con la promoción de la demanda aunque no hubiere sido notificada la resolución que dispone su traslado y termina con el dictado de la sentencia». O sea que el plazo puede estar corriendo antes de que la demanda esté notificada.",
  });

  if (instancia.id === "incidente-caducidad") {
    avisos.push({
      tono: "bloqueante",
      texto:
        "Es el plazo más corto del artículo: un solo mes. El inciso 3) lo separa del resto justamente porque el incidente que discute la caducidad tiene su propia caducidad.",
    });
  }

  avisos.push({
    tono: "atencion",
    texto:
      "Esta fecha es el vencimiento del plazo contado desde el acto que vos declaraste. No contempla actos interruptivos posteriores, suspensiones, ferias ni las particularidades del expediente — y la caducidad la declara el juez, no un calendario. Sirve para saber si hay que mirar el expediente, no para dar por perdida una instancia.",
  });

  return {
    instancia,
    desdeElActo: aISO(desdeElActo),
    desdeLaVigencia: desdeLaVigencia ? aISO(desdeLaVigencia) : null,
    actoAnteriorALaReforma,
    diasHastaLaMasTemprana,
    avisos,
  };
}
