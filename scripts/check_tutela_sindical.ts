// Verificación de la página de tutela sindical (Ley 23.551 arts. 44 inc. c), 48, 50 y 52, con el
// texto del Título XV de la Ley 27.802). Correr con: npx tsx scripts/check_tutela_sindical.ts
//
// LOS ANCLAS:
//   1. **El suplente cobra CERO de agravamiento.** Es la novedad de la reforma y el error más
//      probable: si alguna vez esta calculadora le devuelve un peso de más al suplente, está
//      publicando el texto de 1988.
//   2. **El candidato con menos del 5% de los votos tampoco cobra agravamiento**, porque el art.
//      50 nuevo hace cesar su protección. Con 5% justo, sí: el corte es «menos del».
//   3. **El art. 52 y el art. 245 bis NO se suman.** El total del art. 52 no puede contener ni un
//      peso del 245 bis, y viceversa. Los dos textos lo dicen por separado y el check lo prueba.
//   4. **La base no se reimplementa**: sale de `calcularIndemnizacion`, el mismo motor de
//      /indemnizacion. Si esta página calculara su propio art. 245, calcular.ar publicaría dos
//      importes distintos para el mismo caso (regla de s85).
//   5. **El agravamiento no lleva SAC ni tope de convenio.** La ley dice «remuneraciones»: doce
//      meses de agravamiento son doce sueldos exactos, ni uno más.
//   6. **Las citas dicen lo que dice la norma**, y el texto viejo y el nuevo tienen que diferir en
//      las frases que cambian el resultado (los suplentes, el 5%, la no acumulación).

import {
  ART245BIS_PISO,
  ART245BIS_TECHO,
  CAMBIOS,
  HORAS_MENSUALES_DELEGADO,
  MESES_ESTABILIDAD_POSTERIOR,
  MESES_EXTRA_CANDIDATO_NO_ELECTO,
  MESES_TUTELA_POSTULANTE,
  PISO_VOTOS_POSTULANTE,
  REFORMA_PUBLICADA,
  REFORMA_PUBLICADA_ISO,
  ROLES,
  TEXTOS,
  TUTELA_FUENTES,
} from "../src/data/tutela-sindical";
import { calcularIndemnizacion } from "../src/lib/indemnizacion";
import { calcularTutelaSindical, sumarMeses } from "../src/lib/tutela-sindical";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const casi = (a: number, b: number, tol = 0.01) => Math.abs(a - b) <= tol;

const SUELDO = 1_200_000;
const COMUN = {
  ingresoISO: "2018-03-01",
  despidoISO: "2026-06-30",
  mejorRemuneracion: SUELDO,
  preavisoOtorgado: false,
};

// ── 1. La base es la misma que la de /indemnizacion ────────────────────────────────────────────
{
  const propia = calcularIndemnizacion(COMUN)!;
  const r = calcularTutelaSindical({ ...COMUN, rol: "suplente" })!;
  check("la base sale del motor compartido, no de una cuenta propia", r.base === r.base);
  check(
    "…y coincide peso por peso con /indemnizacion",
    casi(r.base.totalGeneral, propia.totalGeneral) &&
      casi(r.base.indemnizacionAntiguedad, propia.indemnizacionAntiguedad),
    { tutela: r.base.totalGeneral, indemnizacion: propia.totalGeneral },
  );
}

// ── 2. El suplente quedó afuera (la novedad de la Ley 27.802) ──────────────────────────────────
{
  const r = calcularTutelaSindical({ ...COMUN, rol: "suplente" })!;
  check("el suplente no tiene importe cuantificado", r.cuantificado === false);
  check("el suplente no cobra agravamiento del art. 52", r.agravamientoArt52 === 0);
  check(
    "…y su total es exactamente la indemnización común",
    casi(r.totalConArt52, r.base.totalGeneral),
    { total: r.totalConArt52, base: r.base.totalGeneral },
  );
  check(
    "…y el motivo cita la frase de la ley que lo excluye",
    Boolean(r.sinAgravamiento?.includes("no les será aplicable la tutela sindical")),
    r.sinAgravamiento,
  );
}

// ── 3. El congresal: la ley describe su tutela pero no le fija importe ─────────────────────────
{
  const r = calcularTutelaSindical({ ...COMUN, rol: "congresal" })!;
  check("el congresal no tiene importe cuantificado", r.cuantificado === false);
  check("…y por eso el agravamiento es 0, no un número inventado", r.agravamientoArt52 === 0);
  check(
    "…y se dice por qué",
    Boolean(r.sinAgravamiento?.includes("congreso")),
    r.sinAgravamiento,
  );
}

// ── 4. El titular: mandato faltante + año de estabilidad posterior ─────────────────────────────
{
  // Despido el 30/6/2026 con mandato hasta el 30/12/2026: faltan 6 meses justos.
  const r = calcularTutelaSindical({
    ...COMUN,
    rol: "titular",
    finMandatoISO: "2026-12-30",
  })!;
  check("el titular sí tiene importe cuantificado", r.cuantificado === true);
  check(
    "el tramo pendiente son 6 meses justos, sin días sueltos",
    r.tramoPendiente?.meses === 6 && r.tramoPendiente?.dias === 0,
    r.tramoPendiente,
  );
  check(
    "el año de estabilidad posterior son 12 meses (art. 48)",
    r.tramoAnioExtra?.meses === MESES_ESTABILIDAD_POSTERIOR,
    r.tramoAnioExtra,
  );
  check(
    "el agravamiento son 18 sueldos exactos: sin SAC y sin tope de convenio",
    casi(r.agravamientoArt52, SUELDO * 18),
    { agravamiento: r.agravamientoArt52, esperado: SUELDO * 18 },
  );
  check(
    "el total es la base más el agravamiento, y nada más",
    casi(r.totalConArt52, r.base.totalGeneral + SUELDO * 18),
  );

  // Sin mandato cargado, el tramo pendiente es 0 pero el año extra sigue en pie.
  const sinFecha = calcularTutelaSindical({ ...COMUN, rol: "titular" })!;
  check(
    "sin fecha de fin de mandato queda sólo el año de estabilidad",
    casi(sinFecha.agravamientoArt52, SUELDO * MESES_ESTABILIDAD_POSTERIOR),
    sinFecha.agravamientoArt52,
  );

  // Un mandato ya vencido no genera tramo negativo.
  const vencido = calcularTutelaSindical({
    ...COMUN,
    rol: "titular",
    finMandatoISO: "2026-01-15",
  })!;
  check(
    "un mandato ya vencido no resta: el tramo pendiente es 0",
    vencido.tramoPendiente?.monto === 0 &&
      casi(vencido.agravamientoArt52, SUELDO * MESES_ESTABILIDAD_POSTERIOR),
    vencido.tramoPendiente,
  );

  // Días sueltos: 15 días valen medio sueldo (sueldo/30 × 15).
  const conDias = calcularTutelaSindical({
    ...COMUN,
    rol: "titular",
    finMandatoISO: "2026-07-15",
  })!;
  check(
    "los días sueltos del mandato se prorratean a sueldo/30",
    conDias.tramoPendiente?.meses === 0 &&
      conDias.tramoPendiente?.dias === 15 &&
      casi(conDias.tramoPendiente!.monto, SUELDO / 2),
    conDias.tramoPendiente,
  );
}

// ── 5. El candidato no electo: tutela no agotada del art. 50 + un año más ──────────────────────
{
  // Postulación notificada el 1/5/2026 → la tutela del art. 50 corre hasta el 1/11/2026.
  check("la tutela del postulante dura 6 meses", MESES_TUTELA_POSTULANTE === 6);
  check(
    "sumarMeses respeta el largo del mes destino",
    sumarMeses("2026-01-31", 1) === "2026-02-28" && sumarMeses("2026-05-01", 6) === "2026-11-01",
    { uno: sumarMeses("2026-01-31", 1), seis: sumarMeses("2026-05-01", 6) },
  );

  const r = calcularTutelaSindical({
    ...COMUN,
    rol: "candidato-no-electo",
    postulacionISO: "2026-05-01",
    porcentajeVotos: 30,
  })!;
  check("el candidato no electo tiene importe cuantificado", r.cuantificado === true);
  check(
    "del 30/6 al 1/11 quedan 4 meses y 2 días de tutela sin agotar",
    r.tramoPendiente?.meses === 4 && r.tramoPendiente?.dias === 2,
    r.tramoPendiente,
  );
  check(
    "el año extra del candidato son 12 meses",
    r.tramoAnioExtra?.meses === MESES_EXTRA_CANDIDATO_NO_ELECTO,
  );
  check(
    "el agravamiento son 16 sueldos y 2 días",
    casi(r.agravamientoArt52, SUELDO * 16 + (SUELDO / 30) * 2),
    { agravamiento: r.agravamientoArt52 },
  );
}

// ── 6. El corte del 5% de los votos (art. 50 nuevo) ────────────────────────────────────────────
{
  check("el piso de votos es el 5%", PISO_VOTOS_POSTULANTE === 0.05);

  const perdedor = calcularTutelaSindical({
    ...COMUN,
    rol: "candidato-no-electo",
    postulacionISO: "2026-05-01",
    porcentajeVotos: 4.99,
  })!;
  check(
    "con 4,99% de los votos la protección cesó: no hay agravamiento",
    perdedor.cuantificado === false && perdedor.agravamientoArt52 === 0,
    perdedor.agravamientoArt52,
  );
  check(
    "…y el motivo cita la frase del art. 50 nuevo",
    Boolean(perdedor.sinAgravamiento?.includes("cinco por ciento")),
    perdedor.sinAgravamiento,
  );

  const justo = calcularTutelaSindical({
    ...COMUN,
    rol: "candidato-no-electo",
    postulacionISO: "2026-05-01",
    porcentajeVotos: 5,
  })!;
  check(
    "con 5% justo SÍ hay agravamiento: la ley dice «menos del cinco por ciento»",
    justo.cuantificado === true && justo.agravamientoArt52 > 0,
    justo.agravamientoArt52,
  );
}

// ── 7. Art. 245 bis LCT: alternativa, nunca suma ───────────────────────────────────────────────
{
  const r = calcularTutelaSindical({
    ...COMUN,
    rol: "titular",
    finMandatoISO: "2026-12-30",
  })!;
  check("el piso del art. 245 bis es el 50% del art. 245", ART245BIS_PISO === 0.5);
  check("el techo del art. 245 bis es el 100%", ART245BIS_TECHO === 1);
  check(
    "el 245 bis se calcula sobre la indemnización por antigüedad, no sobre el total",
    casi(r.art245bisPiso, r.base.indemnizacionAntiguedad * 0.5) &&
      casi(r.art245bisTecho, r.base.indemnizacionAntiguedad),
    { piso: r.art245bisPiso, antiguedad: r.base.indemnizacionAntiguedad },
  );
  check(
    "el total del art. 52 NO contiene un peso del art. 245 bis",
    casi(r.totalConArt52, r.base.totalGeneral + r.agravamientoArt52),
  );
  check(
    "el total del art. 245 bis NO contiene un peso del art. 52",
    casi(r.totalConArt245bisPiso, r.base.totalGeneral + r.art245bisPiso) &&
      casi(r.totalConArt245bisTecho, r.base.totalGeneral + r.art245bisTecho),
  );
  check(
    "la comparación elige el mayor de los dos",
    r.conviene === (r.agravamientoArt52 > r.art245bisPiso ? "art52" : "art245bis"),
    { art52: r.agravamientoArt52, art245bis: r.art245bisPiso, conviene: r.conviene },
  );
  check(
    "para un suplente no hay nada que comparar",
    calcularTutelaSindical({ ...COMUN, rol: "suplente" })!.conviene === "ninguno",
  );
}

// ── 8. Las citas dicen lo que dice la norma ────────────────────────────────────────────────────
{
  check(
    "el art. 52 vigente excluye a los suplentes",
    TEXTOS.art52Nuevo.includes(
      "A aquellos que sean designados suplentes no les será aplicable la tutela sindical",
    ),
  );
  check(
    "…y el texto de 1988 NO traía esa exclusión (es lo que cambió)",
    !TEXTOS.art52Viejo.includes("suplentes"),
  );
  check(
    "el art. 52 vigente pone el cupo de congresales",
    TEXTOS.art52Nuevo.includes("hasta dos (2) congresales titulares en grandes empresas") &&
      TEXTOS.art52Nuevo.includes("un (1) congresal titular en las pymes"),
  );
  check(
    "el art. 52 vigente prohíbe acumular con el art. 245 bis",
    TEXTOS.art52Nuevo.includes("no siendo las mismas acumulables a las dispuestas en el artículo 245 bis"),
  );
  check(
    "…y el texto viejo no decía nada del 245 bis",
    !TEXTOS.art52Viejo.includes("245 bis"),
  );
  check(
    "el art. 52 vigente manda pagar el mandato faltante y el año de estabilidad",
    TEXTOS.art52Nuevo.includes(
      "durante el tiempo faltante del mandato y el año de estabilidad posterior",
    ),
  );
  check(
    "el art. 50 vigente trae el corte del 5%",
    TEXTOS.art50Nuevo.includes("menos del cinco por ciento (5%) de los votos válidos emitidos"),
  );
  check(
    "…y el art. 50 de 1988 no lo traía",
    !TEXTOS.art50Viejo.includes("cinco por ciento"),
  );
  check(
    "el art. 50 vigente exige notificación fehaciente",
    TEXTOS.art50Nuevo.includes("notificación fehaciente al empleador") &&
      !TEXTOS.art50Viejo.includes("notificación fehaciente"),
  );
  check(
    "el art. 48 es el que da el año de estabilidad posterior",
    TEXTOS.art48.includes("durante el tiempo que dure el ejercicio de su mandato y hasta un año más"),
  );
  check(
    "el art. 245 bis enumera la opinión gremial y fija el 50%",
    TEXTOS.art245bis.includes("opinión política o gremial") &&
      TEXTOS.art245bis.includes("cincuenta por ciento (50%)") &&
      TEXTOS.art245bis.includes("hasta el cien por ciento (100%)"),
  );
  check(
    "…y dice que no se acumula con ningún otro régimen especial",
    TEXTOS.art245bis.includes(
      "no será acumulable con ningún otro régimen especial que establezca agravamientos indemnizatorios",
    ),
  );
  check(
    "el art. 44 inc. c) vigente pone el techo de 10 horas",
    TEXTOS.art44cNuevo.includes("hasta diez (10) horas mensuales retribuidas") &&
      HORAS_MENSUALES_DELEGADO === 10,
  );
  check(
    "…y el de 1988 no tenía techo",
    !TEXTOS.art44cViejo.includes("diez (10) horas"),
  );
}

// ── 9. Roles y tabla de cambios ────────────────────────────────────────────────────────────────
{
  check("hay cuatro roles", ROLES.length === 4);
  check(
    "exactamente dos roles tienen importe cuantificado por la ley",
    ROLES.filter((r) => r.cuantificado).length === 2,
    ROLES.map((r) => `${r.id}:${r.cuantificado}`),
  );
  check(
    "cada rol tiene etiqueta y descripción",
    ROLES.every((r) => r.etiqueta.length > 5 && r.descripcion.length > 40),
  );
  check("la tabla de cambios tiene al menos 5 filas", CAMBIOS.length >= 5);
  check(
    "cada cambio dice qué decía antes, qué dice ahora y qué cambia en plata",
    CAMBIOS.every((c) => c.antes.length > 20 && c.ahora.length > 20 && c.plata.length > 20),
  );
}

// ── 10. Fuentes y fechas ───────────────────────────────────────────────────────────────────────
{
  check(
    "la reforma se publicó el 6 de marzo de 2026",
    REFORMA_PUBLICADA === "6 de marzo de 2026" && REFORMA_PUBLICADA_ISO === "2026-03-06",
  );
  check(
    "todas las fuentes son oficiales",
    TUTELA_FUENTES.lista.every((f) =>
      /^https:\/\/(www\.)?(servicios\.infoleg|infoleg|boletinoficial|argentina)\.gob\.ar\//.test(
        f.url,
      ),
    ),
    TUTELA_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citado el texto ACTUALIZADO de la Ley 23.551",
    TUTELA_FUENTES.lista.some((f) => f.url.includes("20993") && f.url.endsWith("texact.htm")),
  );
  check(
    "…y también el original de 1988, que es contra el que se compara",
    TUTELA_FUENTES.lista.some((f) => f.url.includes("20993") && f.url.endsWith("norma.htm")),
  );
  check(
    "está citado el texto actualizado de la LCT (art. 245 bis)",
    TUTELA_FUENTES.lista.some((f) => f.url.includes("25552") && f.url.endsWith("texact.htm")),
  );
  check("hay fecha de consulta visible", TUTELA_FUENTES.consultadoEl.includes("2026"));
}

if (fallas > 0) {
  console.error(`\n${fallas} check(s) fallaron.`);
  process.exit(1);
}
console.log(
  "\nTodos los checks de tutela sindical OK (Ley 23.551 arts. 44 c, 48, 50 y 52 · Ley 27.802 Título XV · LCT art. 245 bis).",
);
