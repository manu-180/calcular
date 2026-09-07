// Verificación de la página de caducidad de instancia en el juicio laboral.
// Art. 46 de la Ley 18.345, sustituido por el art. 82 de la Ley 27.802 (Título III, arts. 78-94).
// Correr con: npx tsx scripts/check_caducidad_instancia.ts
//
// LOS ANCLAS:
//   1. **Los tres plazos del art. 46: 6, 3 y 1 mes**, cada uno con su inciso. Invertirlos es
//      decirle a alguien que tiene medio año cuando tiene un mes.
//   2. **El plazo del incidente de caducidad es el más corto de todos.**
//   3. **La suma es en MESES calendario, con el ancla de fin de mes**: 31/8 + 6 meses no puede
//      devolver el 31/2. Es el caso testigo que rompe una implementación por días.
//   4. **El texto anterior decía lo CONTRARIO**, y eso se verifica sobre la cita: «impulsado de
//      oficio por los jueces» en el de antes, «impulsado por las partes» en el vigente. Si alguien
//      edita la cita vieja para que se parezca a la nueva, se pierde el hallazgo entero.
//   5. **El artículo vigente dice «sin necesidad de intimación previa»** — la frase que cambia la
//      práctica.
//   6. **La doble cuenta aparece SÓLO cuando el acto es anterior al 7/3/2026**, y nunca después.
//   7. **La segunda fecha se calcula desde el 7/3/2026**, no desde la publicación (6/3): el art. 93
//      dice «a partir del día siguiente al de la publicación».
//   8. **Los diecisiete artículos del Título III están documentados** y ninguno queda sin detalle.
//   9. **La página nunca declara caducada una instancia**: hay un aviso que dice que la declara el
//      juez.
//  10. **Las fuentes son sólo oficiales**, con fecha de consulta.

import {
  APLICACION,
  APLICACION_ISO,
  CAMBIOS_TITULO_III,
  FUENTES,
  INSTANCIAS,
  PUBLICACION_ISO,
  TEXTOS,
} from "../src/data/caducidad-instancia";
import { calcularCaducidad, sumarMeses } from "../src/lib/caducidad-instancia";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const iso = (d: Date) => d.toISOString().slice(0, 10);

// ── 1 y 2. Los tres plazos ────────────────────────────────────────────────────────────────────
{
  const porId = (id: string) => INSTANCIAS.find((i) => i.id === id)!;
  check("primera o única instancia: 6 meses", porId("primera").meses === 6);
  check("primera instancia es el inciso 1", porId("primera").inciso === "1");
  check("segunda instancia: 3 meses", porId("segunda").meses === 3);
  check("sumarísimo: 3 meses", porId("sumarisimo").meses === 3);
  check("ejecutivo y ejecuciones especiales: 3 meses", porId("ejecutivo").meses === 3);
  check("incidentes: 3 meses", porId("incidente").meses === 3);
  check("incidente de caducidad: 1 mes", porId("incidente-caducidad").meses === 1);
  check("el incidente de caducidad es el inciso 3", porId("incidente-caducidad").inciso === "3");
  check(
    "el incidente de caducidad tiene el plazo más corto de todos",
    INSTANCIAS.every((i) => i.id === "incidente-caducidad" || i.meses > 1),
  );
  check(
    "todos los plazos del inciso 2 son de tres meses",
    INSTANCIAS.filter((i) => i.inciso === "2").every((i) => i.meses === 3),
  );
  check("no hay ids repetidos", new Set(INSTANCIAS.map((i) => i.id)).size === INSTANCIAS.length);
  check(
    "cada instancia trae una explicación",
    INSTANCIAS.every((i) => i.detalle.trim().length > 20),
  );
}

// ── 3. Meses calendario, con el ancla de fin de mes ──────────────────────────────────────────
{
  check(
    "10/3/2026 + 6 meses = 10/9/2026",
    iso(sumarMeses(new Date(Date.UTC(2026, 2, 10)), 6)) === "2026-09-10",
  );
  check(
    "31/8/2026 + 6 meses ancla al 28/2/2027 (el 31 no existe)",
    iso(sumarMeses(new Date(Date.UTC(2026, 7, 31)), 6)) === "2027-02-28",
    iso(sumarMeses(new Date(Date.UTC(2026, 7, 31)), 6)),
  );
  check(
    "31/8/2027 + 6 meses cae en 29/2/2028 (año bisiesto)",
    iso(sumarMeses(new Date(Date.UTC(2027, 7, 31)), 6)) === "2028-02-29",
    iso(sumarMeses(new Date(Date.UTC(2027, 7, 31)), 6)),
  );
  check(
    "31/1/2026 + 1 mes ancla al 28/2/2026",
    iso(sumarMeses(new Date(Date.UTC(2026, 0, 31)), 1)) === "2026-02-28",
  );
  check(
    "30/11/2026 + 3 meses = 28/2/2027",
    iso(sumarMeses(new Date(Date.UTC(2026, 10, 30)), 3)) === "2027-02-28",
  );
  check(
    "el resultado del motor coincide con la suma de meses",
    calcularCaducidad({ instanciaId: "primera", ultimoImpulsoISO: "2026-03-10" })!.desdeElActo ===
      "2026-09-10",
  );
}

// ── 4 y 5. Las dos citas dicen cosas opuestas ────────────────────────────────────────────────
{
  check(
    "el texto anterior se titula «Impulso de oficio» y manda impulsar de oficio",
    TEXTOS.antes.includes("Impulso de oficio") &&
      TEXTOS.antes.includes("impulsado de oficio por los jueces"),
  );
  check(
    "el texto vigente se titula «Impulso del proceso» y manda impulsar a las partes",
    TEXTOS.ahora.includes("Impulso del proceso") &&
      TEXTOS.ahora.includes("impulsado por las partes"),
  );
  check(
    "el texto anterior NO menciona caducidad",
    !TEXTOS.antes.toLowerCase().includes("caducidad"),
  );
  check(
    "el texto vigente dice «sin necesidad de intimación previa»",
    TEXTOS.ahora.includes("sin necesidad de intimación previa"),
  );
  check(
    "el texto vigente trae los tres plazos escritos en letras",
    TEXTOS.ahora.includes("seis (6) meses") &&
      TEXTOS.ahora.includes("tres (3) meses") &&
      TEXTOS.ahora.includes("un (1) mes"),
  );
  check(
    "el texto vigente define cuándo se abre y termina la instancia",
    TEXTOS.ahora.includes("se abre con la promoción de la demanda") &&
      TEXTOS.ahora.includes("termina con el dictado de la sentencia"),
  );
  check(
    "el art. 93 citado aplica a todos los procesos en trámite",
    TEXTOS.aplicacion.includes("todos los procesos en trámite") &&
      TEXTOS.aplicacion.includes("día siguiente al de la publicación"),
  );
  check(
    "el art. 94 citado condiciona a que la competencia esté pendiente",
    TEXTOS.aplicacionCompetencia.includes("competencia estuviere pendiente de resolución"),
  );
  check(
    "el art. 89 citado trae la causal de mal desempeño",
    TEXTOS.precedentes.includes("mal desempeño en sus funciones"),
  );
  check(
    "el art. 20 citado cierra el fuero laboral para el Estado nacional",
    TEXTOS.competenciaEstadoNacional.includes(
      "En ningún caso la Justicia Nacional del Trabajo podrá expedirse",
    ),
  );
}

// ── 6 y 7. La doble cuenta y su punto de partida ─────────────────────────────────────────────
{
  const viejo = calcularCaducidad({ instanciaId: "primera", ultimoImpulsoISO: "2025-10-01" })!;
  check("un acto anterior a la reforma se marca como tal", viejo.actoAnteriorALaReforma);
  check("y trae la segunda fecha", viejo.desdeLaVigencia !== null);
  check(
    "la segunda fecha se cuenta desde el 7/3/2026, no desde el 6/3",
    viejo.desdeLaVigencia === "2026-09-07",
    viejo.desdeLaVigencia,
  );
  check(
    "la fecha desde el acto es anterior a la de la vigencia",
    viejo.desdeElActo < viejo.desdeLaVigencia!,
    [viejo.desdeElActo, viejo.desdeLaVigencia],
  );
  check(
    "y avisa que la ley no fija el punto de partida",
    viejo.avisos.some((a) => a.texto.includes("no dice desde cuándo se cuenta")),
  );

  const nuevo = calcularCaducidad({ instanciaId: "primera", ultimoImpulsoISO: "2026-06-01" })!;
  check("un acto posterior a la reforma no se marca", !nuevo.actoAnteriorALaReforma);
  check("y NO trae segunda fecha", nuevo.desdeLaVigencia === null);

  const justoElDia = calcularCaducidad({
    instanciaId: "primera",
    ultimoImpulsoISO: APLICACION_ISO,
  })!;
  check(
    "el 7/3/2026 exacto ya cuenta como posterior: una sola fecha",
    !justoElDia.actoAnteriorALaReforma && justoElDia.desdeLaVigencia === null,
  );
  const vispera = calcularCaducidad({
    instanciaId: "primera",
    ultimoImpulsoISO: PUBLICACION_ISO,
  })!;
  check("el 6/3/2026 todavía es anterior", vispera.actoAnteriorALaReforma);
  check(
    "la aplicación es el día siguiente a la publicación",
    APLICACION_ISO === "2026-03-07" && PUBLICACION_ISO === "2026-03-06",
  );
  check("la etiqueta de aplicación coincide", APLICACION === "7 de marzo de 2026");
}

// ── Entradas inválidas ───────────────────────────────────────────────────────────────────────
{
  check(
    "una instancia inexistente devuelve null",
    calcularCaducidad({ instanciaId: "no-existe", ultimoImpulsoISO: "2026-03-10" }) === null,
  );
  check(
    "una fecha inválida devuelve null",
    calcularCaducidad({ instanciaId: "primera", ultimoImpulsoISO: "2026-02-30" }) === null,
  );
  const conHoy = calcularCaducidad({
    instanciaId: "primera",
    ultimoImpulsoISO: "2026-03-10",
    hoyISO: "2026-08-28",
  })!;
  check("el «cuánto falta» se calcula contra la fecha dada", conHoy.diasHastaLaMasTemprana === 13, conHoy.diasHastaLaMasTemprana);
  check(
    "sin fecha de referencia no se calcula el «cuánto falta»",
    calcularCaducidad({ instanciaId: "primera", ultimoImpulsoISO: "2026-03-10" })!
      .diasHastaLaMasTemprana === null,
  );
}

// ── 8 y 9. El Título III documentado y el límite de la página ────────────────────────────────
{
  check("hay 14 entradas del Título III (17 artículos, agrupando 90-92 y 93-94)", CAMBIOS_TITULO_III.length === 14, CAMBIOS_TITULO_III.length);
  check(
    "cada entrada trae artículo, qué toca, título y detalle",
    CAMBIOS_TITULO_III.every(
      (c) => c.art && c.toca && c.titulo.length > 8 && c.detalle.length > 60,
    ),
  );
  check(
    "no hay artículos repetidos",
    new Set(CAMBIOS_TITULO_III.map((c) => c.art)).size === CAMBIOS_TITULO_III.length,
  );
  check(
    "el art. 82 (la caducidad) está documentado y apunta al art. 46",
    CAMBIOS_TITULO_III.some((c) => c.art === "82" && c.toca === "art. 46"),
  );
  check(
    "el art. 79 (competencia con el Estado nacional) está documentado",
    CAMBIOS_TITULO_III.some((c) => c.art === "79" && c.detalle.includes("Contencioso Administrativo Federal")),
  );
  check(
    "el traspaso a la CABA está documentado",
    CAMBIOS_TITULO_III.some((c) => c.detalle.includes("Ciudad Autónoma de Buenos Aires")),
  );

  const r = calcularCaducidad({ instanciaId: "primera", ultimoImpulsoISO: "2026-03-10" })!;
  check(
    "hay un aviso que aclara que la caducidad la declara el juez",
    r.avisos.some((a) => a.texto.includes("la caducidad la declara el juez")),
  );
  check(
    "hay un aviso bloqueante con el contraste de régimen",
    r.avisos.some((a) => a.tono === "bloqueante" && a.texto.includes("Impulso de oficio")),
  );
  check(
    "avisa que la instancia se abre antes de notificar la demanda",
    r.avisos.some((a) => a.texto.includes("aunque no hubiere sido notificada")),
  );
}

// ── 10. Fuentes ──────────────────────────────────────────────────────────────────────────────
{
  check("hay fecha de consulta", /^\d{4}-\d{2}-\d{2}$/.test(FUENTES.consultadoEl));
  check("hay al menos tres fuentes", FUENTES.lista.length >= 3);
  check(
    "todas las fuentes son oficiales",
    FUENTES.lista.every(
      (f) =>
        f.url.includes("infoleg.gob.ar") ||
        f.url.includes("boletinoficial.gob.ar") ||
        (f.url.includes("web.archive.org") && f.url.includes("infoleg.gob.ar")),
    ),
    FUENTES.lista.map((f) => f.url),
  );
}

console.log(
  fallas === 0
    ? "\nTodos los checks de caducidad de instancia OK (Ley 18.345 art. 46 · Ley 27.802 Título III, arts. 78 a 94)"
    : `\n${fallas} check(s) fallaron`,
);
process.exit(fallas === 0 ? 0 : 1);
