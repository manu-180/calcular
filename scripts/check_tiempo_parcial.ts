// Verificación de la página de contrato a tiempo parcial (LCT art. 92 ter, texto sustituido por el
// art. 27 de la Ley 27.802). Correr con: npx tsx scripts/check_tiempo_parcial.ts
//
// LOS ANCLAS (cada uno cubre una forma distinta de que esto se rompa en silencio):
//   1. **La INVERSIÓN tiene que seguir siendo verdad, palabra por palabra.** Todo el valor de la
//      página es que el texto vigente NO tiene el tope de "dos terceras (2/3) partes" y el anterior
//      SÍ. Si alguna vez las citas se cruzan o se resumen, la página pasa a afirmar lo mismo que
//      las notas desactualizadas que vino a corregir.
//   2. **Las horas suplementarias: prohibidas antes, permitidas ahora.** Es el segundo cambio y se
//      verifica contra las dos citas.
//   3. **El piso del inciso 1 es una proporción pura**: media jornada = medio sueldo de la
//      categoría, sin divisores ni redondeos que se cuelen.
//   4. **El aporte de obra social NO se prorratea** (inciso 4): es el 3% del sueldo de jornada
//      completa, no del proporcional. Es el número que no publica nadie y el que más fácil se
//      rompe en un refactor que "unifique" los aportes.
//   5. **Los porcentajes salen de data/sueldo.ts**, no escritos a mano acá.
//   6. **El recargo del art. 201 es 50% en días comunes y 100% en los agravados**, y la lectura a
//      valor simple tiene que seguir estando disponible (las dos, porque la discusión está abierta).
//   7. **El techo del inciso 2 es la jornada LEGAL**: pasarse tiene que levantar un aviso
//      bloqueante, no un número silencioso.
//   8. **Si la jornada supera los 2/3, la página tiene que decir qué se cobraba antes**: es el
//      caso donde la reforma saca plata y el que más se busca.

import { APORTES } from "../src/data/sueldo";
import {
  ARTICULO_SUSTITUTIVO,
  CAMBIOS,
  JORNADA_LEGAL_SEMANAL,
  RECARGOS,
  SEMANAS_POR_MES,
  TIEMPO_PARCIAL_FUENTES,
  TIEMPO_PARCIAL_TEXTOS,
  TOPE_ANTERIOR,
  VIGENCIA_REFORMA,
  VIGENCIA_REFORMA_ISO,
} from "../src/data/tiempo-parcial";
import { calcularTiempoParcial } from "../src/lib/tiempo-parcial";

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

// ── 1. La inversión: el tope de 2/3 estaba antes y no está ahora ───────────────────────────────
{
  const t = TIEMPO_PARCIAL_TEXTOS;
  check(
    "el texto VIGENTE no menciona las dos terceras partes",
    !/dos tercer/i.test(t.vigenteInc1) && !/2\/3/.test(t.vigenteInc1),
    t.vigenteInc1,
  );
  check(
    "el texto VIGENTE define el tiempo parcial contra la jornada legal o convencional",
    t.vigenteInc1.includes("inferiores a la jornada legal o convencional de la actividad"),
    t.vigenteInc1,
  );
  check(
    "el texto ANTERIOR sí traía el tope de las dos terceras (2/3) partes",
    /dos terceras \(2\/3\) partes de la jornada habitual/.test(t.anteriorInc1),
    t.anteriorInc1,
  );
  check(
    "el texto ANTERIOR traía la sanción de pagar la jornada completa…",
    t.anteriorInc1.includes(
      "el empleador deberá abonar la remuneración correspondiente a un trabajador de jornada completa",
    ),
  );
  check(
    "…y esa sanción NO está en el texto vigente",
    !t.vigenteInc1.includes("jornada completa") && !t.vigenteInc2.includes("jornada completa"),
  );
  check(
    "el piso proporcional del inciso 1 sobrevivió a la reforma (es lo único que no cambió ahí)",
    t.vigenteInc1.includes("no podrá ser inferior a la proporcional") &&
      t.anteriorInc1.includes("no podrá ser inferior a la proporcional"),
  );
  check(
    "la nota de vigencia cita la sustitución por el art. 27 de la Ley 27.802",
    t.vigenteNota.includes(`art. ${ARTICULO_SUSTITUTIVO}`) && t.vigenteNota.includes("27.802"),
    t.vigenteNota,
  );
  check(
    "la fecha de la reforma es el 6/3/2026 en las dos formas en que se publica",
    VIGENCIA_REFORMA === "6 de marzo de 2026" && VIGENCIA_REFORMA_ISO === "2026-03-06",
  );
}

// ── 2. Horas suplementarias: de prohibidas a permitidas ────────────────────────────────────────
{
  const t = TIEMPO_PARCIAL_TEXTOS;
  check(
    "el texto ANTERIOR las prohibía",
    t.anteriorInc2.includes("no podrán realizar horas suplementarias o extraordinarias"),
    t.anteriorInc2,
  );
  check(
    "el texto VIGENTE las permite, y de forma voluntaria",
    t.vigenteInc2.includes("podrán realizar voluntariamente horas suplementarias") &&
      !t.vigenteInc2.includes("no podrán realizar horas suplementarias"),
    t.vigenteInc2,
  );
  check(
    "el techo del inciso 2 sigue siendo la jornada legal",
    t.vigenteInc2.includes("No podrán realizar horas extraordinarias en exceso de la jornada legal"),
  );
  check(
    "la excepción del art. 89 está citada con su texto (auxilios por peligro grave o inminente)",
    t.vigenteInc2.includes("artículo 89") && /peligro grave o inminente/.test(t.art89),
  );
  check(
    "el art. 201 citado trae los dos recargos, 50% y 100%",
    t.art201.includes("cincuenta por ciento (50%)") && t.art201.includes("ciento por ciento (100%)"),
  );
  check(
    "los recargos del repo coinciden con el artículo (0,5 y 1)",
    RECARGOS.comun === 0.5 && RECARGOS.agravado === 1,
  );
  check(
    "la jornada legal es la de la ley 11.544, a la que remite el art. 196",
    JORNADA_LEGAL_SEMANAL === 48 && TIEMPO_PARCIAL_TEXTOS.art196.includes("ley 11.544"),
  );
}

// ── 3. El piso del inciso 1 es una proporción pura ─────────────────────────────────────────────
{
  const r = calcularTiempoParcial({
    sueldoJornadaCompleta: 1_200_000,
    jornadaActividad: 48,
    horasPactadas: 24,
    suplementariasComunes: 0,
    suplementariasAgravadas: 0,
  });
  check("media jornada = medio sueldo de la categoría", casi(r.sueldoProporcional, 600_000), r);
  check("la proporción se informa como 0,5", casi(r.proporcion, 0.5));
  check("24 sobre 48 sigue siendo tiempo parcial", r.esTiempoParcial);

  const tresCuartos = calcularTiempoParcial({
    sueldoJornadaCompleta: 1_200_000,
    jornadaActividad: 48,
    horasPactadas: 36,
    suplementariasComunes: 0,
    suplementariasAgravadas: 0,
  });
  check(
    "36 sobre 48 (tres cuartos) también es tiempo parcial con el texto vigente",
    tresCuartos.esTiempoParcial && casi(tresCuartos.sueldoProporcional, 900_000),
    tresCuartos,
  );
  check(
    "…pero superaba el tope viejo de 2/3 (32 horas)",
    tresCuartos.anterior.superabaDosTercios && casi(tresCuartos.anterior.topeSemanalViejo, 32),
  );
  check(
    "…y con el texto anterior le correspondía el sueldo de jornada completa",
    casi(tresCuartos.anterior.sueldoQueCorrespondia, 1_200_000) &&
      casi(tresCuartos.anterior.diferencia, 300_000),
    tresCuartos.anterior,
  );
  check(
    "ese caso levanta un aviso bloqueante (es donde la reforma saca plata)",
    tresCuartos.avisos.some((a) => a.tono === "bloqueante" && /dos tercios/.test(a.texto)),
    tresCuartos.avisos,
  );
  check(
    "el tope viejo del repo es exactamente 2/3",
    casi(TOPE_ANTERIOR, 2 / 3, 1e-9),
  );

  const completa = calcularTiempoParcial({
    sueldoJornadaCompleta: 1_200_000,
    jornadaActividad: 48,
    horasPactadas: 48,
    suplementariasComunes: 0,
    suplementariasAgravadas: 0,
  });
  check(
    "48 sobre 48 ya NO es tiempo parcial y la página lo dice",
    !completa.esTiempoParcial &&
      completa.avisos.some((a) => a.tono === "bloqueante" && /no hay contrato a tiempo parcial/.test(a.texto)),
    completa.avisos,
  );
}

// ── 4. El aporte de obra social no se prorratea (inciso 4) ─────────────────────────────────────
{
  const r = calcularTiempoParcial({
    sueldoJornadaCompleta: 1_200_000,
    jornadaActividad: 48,
    horasPactadas: 24,
    suplementariasComunes: 0,
    suplementariasAgravadas: 0,
  });
  check(
    "obra social = 3% del sueldo de jornada COMPLETA, no del proporcional",
    casi(r.aportes.obraSocial, 1_200_000 * APORTES.obraSocial),
    r.aportes,
  );
  check(
    "…y eso es exactamente el doble de lo que sería prorrateado a media jornada",
    casi(r.aportes.obraSocial, r.aportes.obraSocialSiFueraProporcional * 2),
    r.aportes,
  );
  check(
    "jubilación y PAMI sí van sobre lo que se cobra (inciso 3)",
    casi(r.aportes.jubilacion, r.brutoConRecargo * APORTES.jubilacion) &&
      casi(r.aportes.pami, r.brutoConRecargo * APORTES.pami),
  );
  check(
    "por eso el descuento total pesa MÁS del 17% del bruto en media jornada",
    r.pesoAportes > 0.17,
    r.pesoAportes,
  );
  check(
    "el neto es el bruto menos los tres aportes, sin sorpresas",
    casi(r.neto, r.brutoConRecargo - r.aportes.total),
  );
  check(
    "los porcentajes salen de data/sueldo.ts (11% + 3% + 3%)",
    APORTES.jubilacion === 0.11 && APORTES.pami === 0.03 && APORTES.obraSocial === 0.03,
    APORTES,
  );
  check(
    "la página avisa que el aporte de obra social no se prorratea",
    r.avisos.some((a) => /no se prorratea/.test(a.texto)),
  );
}

// ── 5. Horas suplementarias: los dos números, y el techo ───────────────────────────────────────
{
  const r = calcularTiempoParcial({
    sueldoJornadaCompleta: 1_200_000,
    jornadaActividad: 48,
    horasPactadas: 24,
    suplementariasComunes: 10,
    suplementariasAgravadas: 4,
  });
  const horasMes = 48 * SEMANAS_POR_MES;
  const valorHora = 1_200_000 / horasMes;
  check("el valor hora sale de la jornada completa y 52/12 semanas", casi(r.valorHora, valorHora));
  check(
    "10 horas comunes al 50% y 4 agravadas al 100%",
    casi(r.suplementariasConRecargo, 10 * valorHora * 1.5 + 4 * valorHora * 2),
    r.suplementariasConRecargo,
  );
  check(
    "la lectura a valor simple sigue disponible (la discusión está abierta)",
    casi(r.suplementariasSimples, 14 * valorHora) &&
      r.suplementariasSimples < r.suplementariasConRecargo,
  );
  check(
    "el bruto con recargo es el proporcional más las suplementarias",
    casi(r.brutoConRecargo, r.sueldoProporcional + r.suplementariasConRecargo),
  );
  check(
    "la página aclara que el recargo de estas horas todavía no está resuelto",
    r.avisos.some((a) => /no hay reglamentación ni jurisprudencia/.test(a.texto)),
  );
  check(
    "y recuerda que antes de la reforma estas horas estaban prohibidas",
    r.avisos.some((a) => /estaban directamente prohibidas/.test(a.texto)),
  );

  const margenEsperado = 48 * SEMANAS_POR_MES - 24 * SEMANAS_POR_MES;
  check(
    "el margen de suplementarias llega hasta la jornada legal",
    casi(r.margenSuplementarias, margenEsperado),
    r.margenSuplementarias,
  );

  const pasado = calcularTiempoParcial({
    sueldoJornadaCompleta: 1_200_000,
    jornadaActividad: 48,
    horasPactadas: 40,
    suplementariasComunes: 60,
    suplementariasAgravadas: 0,
  });
  check(
    "pasarse de la jornada legal levanta un aviso bloqueante (inciso 2)",
    pasado.avisos.some(
      (a) => a.tono === "bloqueante" && /en exceso de la jornada legal/.test(a.texto),
    ),
    pasado.avisos,
  );
}

// ── 6. Jornada convencional menor que la legal ─────────────────────────────────────────────────
{
  const r = calcularTiempoParcial({
    sueldoJornadaCompleta: 1_000_000,
    jornadaActividad: 40,
    horasPactadas: 20,
    suplementariasComunes: 5,
    suplementariasAgravadas: 0,
  });
  check(
    "con jornada convencional de 40 h, media jornada sigue siendo la mitad del sueldo",
    casi(r.sueldoProporcional, 500_000),
  );
  check(
    "el margen de suplementarias se mide contra la jornada LEGAL (48), no contra la del convenio",
    casi(r.margenSuplementarias, (48 - 20) * SEMANAS_POR_MES),
    r.margenSuplementarias,
  );
  check(
    "y avisa que entre la jornada del convenio y la legal pueden mandar las reglas del convenio",
    r.avisos.some((a) => /mandan las del convenio/.test(a.texto)),
  );
}

// ── 7. La tabla de cambios y las fuentes ───────────────────────────────────────────────────────
{
  check("la tabla de cambios tiene los cinco incisos del artículo", CAMBIOS.length === 5, CAMBIOS.length);
  check(
    "cada cambio dice qué decía antes y qué dice ahora",
    CAMBIOS.every((c) => c.tema.length > 3 && c.antes.length > 20 && c.ahora.length > 20),
  );
  check(
    "el cambio del tope y el de su sanción están marcados como peores para el trabajador",
    CAMBIOS.filter((c) => c.peor).length >= 3,
  );
  check(
    "todas las fuentes son oficiales (infoleg / boletín oficial / argentina.gob.ar)",
    TIEMPO_PARCIAL_FUENTES.lista.every((f) =>
      /^https:\/\/(www\.)?(servicios\.infoleg|infoleg|boletinoficial|argentina)\.gob\.ar\//.test(
        f.url,
      ),
    ),
    TIEMPO_PARCIAL_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citado el texto ACTUALIZADO de la LCT, no el original",
    TIEMPO_PARCIAL_FUENTES.lista.some(
      (f) => f.url.includes("25552") && f.url.endsWith("texact.htm"),
    ),
  );
  check(
    "está citada la Ley 26.474 como fuente del texto anterior (la prueba de la inversión)",
    TIEMPO_PARCIAL_FUENTES.lista.some(
      (f) => f.nombre.includes("26.474") && f.url.includes("149688"),
    ),
  );
  check(
    "está citada la Ley 27.802",
    TIEMPO_PARCIAL_FUENTES.lista.some(
      (f) => f.nombre.includes("27.802") || f.detalle.includes("27.802"),
    ),
  );
  check(
    "la fecha de consulta es una fecha ISO",
    /^\d{4}-\d{2}-\d{2}$/.test(TIEMPO_PARCIAL_FUENTES.consultadoEl),
  );
}

if (fallas > 0) {
  console.error(`\n${fallas} check(s) fallaron.`);
  process.exit(1);
}
console.log("\nTodos los checks de tiempo parcial OK (LCT art. 92 ter · Ley 27.802 art. 27).");
