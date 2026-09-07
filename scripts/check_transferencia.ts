// Verificación de la página de transferencia del establecimiento (LCT Título XI, arts. 225 a 230;
// los arts. 225 y 228 sustituidos por los arts. 46 y 47 de la Ley 27.802).
// Correr con: npx tsx scripts/check_transferencia.ts
//
// LOS ANCLAS:
//   1. **Se sustituyeron el 225 y el 228 — NO el 227.** Es la mina de s95: `ley-mapa-reformas.ts`
//      atribuyó el art. 47 de la reforma al art. 227 porque la nota cuelga del final del 228, que
//      es largo. El art. 227 está intacto y la página lo publica como tal. Si alguien lo mueve a la
//      columna de reformados, esto falla.
//   2. **La antigüedad NO cambió.** La oración del art. 225 que la conserva tiene que ser idéntica,
//      palabra por palabra, en el texto vigente y en el anterior. Es la mitad de la respuesta y la
//      que más se contesta mal.
//   3. **La única diferencia del art. 225 es la remisión al 228.** Se verifica quitándola: los dos
//      textos tienen que quedar iguales.
//   4. **La defensa de debida diligencia sólo existe en el texto NUEVO del 228**, y la solidaridad
//      sin excepciones sólo en el anterior.
//   5. **El art. 245 no se reimplementa** (regla de s85): las dos columnas salen de
//      `calcularIndemnizacion`, y la columna correcta tiene que coincidir con lo que publica
//      /indemnizacion para el mismo ingreso y egreso.
//   6. **La diferencia entre columnas nunca puede ser negativa**: más antigüedad no paga menos.
//   7. **La lista de responsables marca como condicionado SÓLO al adquirente por deuda oculta.**

import {
  ARTICULOS_INTACTOS,
  ARTICULO_SUSTITUYENTE_225,
  ARTICULO_SUSTITUYENTE_228,
  TIPOS_OPERACION,
  TRANSFERENCIA_FUENTES,
  TRANSFERENCIA_TEXTOS,
  VIGENCIA_REFORMA,
  VIGENCIA_REFORMA_ISO,
} from "../src/data/transferencia-establecimiento";
import { calcularIndemnizacion } from "../src/lib/indemnizacion";
import { calcularTransferencia } from "../src/lib/transferencia-establecimiento";

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

const BASE = 1_400_000;
const CASO = {
  tipoId: "definitiva" as const,
  ingresoISO: "2016-02-15",
  transferenciaISO: "2023-07-01",
  egresoISO: "2026-08-20",
  mejorRemuneracion: BASE,
  motivo: "despido-sin-causa" as const,
};

// ── 1. Qué artículos cambiaron, y sobre todo cuál NO ───────────────────────────────────────────
{
  check("el art. 225 lo sustituyó el art. 46 de la Ley 27.802", ARTICULO_SUSTITUYENTE_225 === 46);
  check(
    "el art. 47 de la Ley 27.802 sustituyó el art. 228, NO el 227 (mina de s95)",
    ARTICULO_SUSTITUYENTE_228 === 47,
  );
  check(
    "el art. 227 está en la lista de intactos",
    (ARTICULOS_INTACTOS as readonly number[]).includes(227),
    ARTICULOS_INTACTOS,
  );
  check(
    "los intactos son 226, 227, 229 y 230",
    ARTICULOS_INTACTOS.length === 4 &&
      [226, 227, 229, 230].every((n) => (ARTICULOS_INTACTOS as readonly number[]).includes(n)),
    ARTICULOS_INTACTOS,
  );
  check(
    "a los artículos intactos no se les inventa una nota de sustitución",
    [
      TRANSFERENCIA_TEXTOS.art226,
      TRANSFERENCIA_TEXTOS.art227,
      TRANSFERENCIA_TEXTOS.art229,
      TRANSFERENCIA_TEXTOS.art230,
    ].every((t) => !t.includes("sustituido") && !t.includes("27.802")),
  );
  check(
    "las notas de los dos reformados citan su artículo y la fecha del B.O.",
    TRANSFERENCIA_TEXTOS.art225Nota.includes(`art. ${ARTICULO_SUSTITUYENTE_225}`) &&
      TRANSFERENCIA_TEXTOS.art228Nota.includes(`art. ${ARTICULO_SUSTITUYENTE_228}`) &&
      [TRANSFERENCIA_TEXTOS.art225Nota, TRANSFERENCIA_TEXTOS.art228Nota].every(
        (n) => n.includes("27.802") && n.includes("6/3/2026") && n.includes("sustituido"),
      ),
  );
  check("la vigencia es el 6 de marzo de 2026", VIGENCIA_REFORMA === "6 de marzo de 2026");
  check("el ISO de la vigencia coincide", VIGENCIA_REFORMA_ISO === "2026-03-06");
}

// ── 2. La antigüedad no cambió, y la única diferencia del 225 es la remisión ───────────────────
{
  check(
    "la oración de la antigüedad está IGUAL en el texto vigente y en el anterior del art. 225",
    TRANSFERENCIA_TEXTOS.art225Vigente.includes(TRANSFERENCIA_TEXTOS.antiguedadQueSeConserva) &&
      TRANSFERENCIA_TEXTOS.art225Anterior.includes(TRANSFERENCIA_TEXTOS.antiguedadQueSeConserva),
  );
  check(
    "sacándole la remisión al art. 228, los dos textos del art. 225 son idénticos",
    TRANSFERENCIA_TEXTOS.art225Vigente.replace(
      `, ${TRANSFERENCIA_TEXTOS.remisionNueva}`,
      "",
    ) === TRANSFERENCIA_TEXTOS.art225Anterior,
    {
      vigenteSinRemision: TRANSFERENCIA_TEXTOS.art225Vigente.replace(
        `, ${TRANSFERENCIA_TEXTOS.remisionNueva}`,
        "",
      ).slice(-90),
      anterior: TRANSFERENCIA_TEXTOS.art225Anterior.slice(-90),
    },
  );
  check(
    "la remisión al art. 228 no está en el texto anterior",
    !TRANSFERENCIA_TEXTOS.art225Anterior.includes(TRANSFERENCIA_TEXTOS.remisionNueva),
  );
}

// ── 3. Lo que cambió de verdad: la solidaridad del art. 228 ────────────────────────────────────
{
  check(
    "la defensa de debida diligencia está en el texto vigente del art. 228",
    TRANSFERENCIA_TEXTOS.art228Vigente.includes(TRANSFERENCIA_TEXTOS.defensaDeDebidaDiligencia),
  );
  check(
    "y NO está en el anterior (que no conoce la debida diligencia)",
    !TRANSFERENCIA_TEXTOS.art228Anterior.includes("debida diligencia") &&
      !TRANSFERENCIA_TEXTOS.art228Anterior.includes("oculta o viciada"),
  );
  check(
    "la solidaridad sin excepciones está en el anterior",
    TRANSFERENCIA_TEXTOS.art228Anterior.includes(TRANSFERENCIA_TEXTOS.solidaridadAnterior),
  );
  check(
    "el texto vigente agrega el recaudo de lo que «debió o pudo haber conocido»",
    TRANSFERENCIA_TEXTOS.art228Vigente.includes("que debió o pudo haber conocido a ese momento") &&
      !TRANSFERENCIA_TEXTOS.art228Anterior.includes("debió o pudo haber conocido"),
  );
  check(
    "los dos textos siguen alcanzando a la transmisión permanente y a la transitoria",
    [TRANSFERENCIA_TEXTOS.art228Vigente, TRANSFERENCIA_TEXTOS.art228Anterior].every(
      (t) => t.includes("en forma permanente o en forma transitoria"),
    ),
  );
  check(
    "y los dos siguen alcanzando la transferencia de un contrato de locación de obra",
    [TRANSFERENCIA_TEXTOS.art228Vigente, TRANSFERENCIA_TEXTOS.art228Anterior].every((t) =>
      t.includes("locación de obra"),
    ),
  );
  check(
    "el art. 226 conserva el criterio del art. 242",
    TRANSFERENCIA_TEXTOS.art226.includes("criterio del artículo 242"),
  );
  check(
    "el art. 229 conserva la aceptación expresa y por escrito",
    TRANSFERENCIA_TEXTOS.art229.includes("aceptación expresa y por escrito del trabajador"),
  );
  check(
    "el art. 227 conserva la obligación de quien recupera el establecimiento",
    TRANSFERENCIA_TEXTOS.art227.includes("cuando recupere el establecimiento cedido precariamente"),
  );
}

// ── 4. El motor: los dos escenarios de antigüedad ──────────────────────────────────────────────
{
  const r = calcularTransferencia(CASO);
  if (!r) {
    fallas++;
    console.error("FAIL el caso testigo no devolvió resultado");
  } else {
    check(
      "la antigüedad total va desde el ingreso con el transmitente (10 años y 6 meses)",
      r.antiguedadTotal.anios === 10 && r.antiguedadTotal.meses === 6,
      r.antiguedadTotal,
    );
    check(
      "la antigüedad desde la transferencia es la corta (3 años y 1 mes)",
      r.antiguedadDesdeLaTransferencia.anios === 3 &&
        r.antiguedadDesdeLaTransferencia.meses === 1,
      r.antiguedadDesdeLaTransferencia,
    );
    check(
      "el art. 245 computa 11 años con la antigüedad completa y 3 desde la transferencia",
      r.conAntiguedad.aniosComputables === 11 && r.sinAntiguedad.aniosComputables === 3,
      { con: r.conAntiguedad.aniosComputables, sin: r.sinAntiguedad.aniosComputables },
    );
    check(
      "la diferencia es positiva y es la del total general",
      r.diferencia > 0 &&
        casi(r.diferencia, r.conAntiguedad.totalGeneral - r.sinAntiguedad.totalGeneral),
      r.diferencia,
    );
    check(
      "acá el preaviso también cambia: 2 meses con la antigüedad completa, 1 sin ella",
      r.cambiaElPreaviso &&
        r.conAntiguedad.preaviso?.meses === 2 &&
        r.sinAntiguedad.preaviso?.meses === 1,
      { con: r.conAntiguedad.preaviso?.meses, sin: r.sinAntiguedad.preaviso?.meses },
    );
    check(
      "el aviso principal cita la oración del art. 225 que conserva la antigüedad",
      r.avisos.some(
        (a) => a.tono === "ok" && a.texto.includes("conservará la antigüedad adquirida"),
      ),
    );
    check(
      "hay un aviso bloqueante que explica que lo que desaparece es un deudor, no el crédito",
      r.avisos.some(
        (a) =>
          a.tono === "bloqueante" &&
          a.texto.includes("debida diligencia") &&
          a.texto.includes("no se extingue"),
      ),
      r.avisos.map((a) => a.tono),
    );
    check(
      "exactamente un responsable está marcado como condicionado: el adquirente por deuda oculta",
      r.responsables.filter((x) => x.condicionado).length === 1 &&
        r.responsables.find((x) => x.condicionado)!.base.includes("debida diligencia"),
      r.responsables.map((x) => [x.quien, x.condicionado]),
    );
  }
}

// ── 5. El art. 245 no se reimplementa ──────────────────────────────────────────────────────────
{
  const r = calcularTransferencia(CASO)!;
  const directo = calcularIndemnizacion({
    ingresoISO: CASO.ingresoISO,
    despidoISO: CASO.egresoISO,
    mejorRemuneracion: BASE,
    preavisoOtorgado: false,
  })!;
  check(
    "la columna correcta es, peso por peso, la de /indemnizacion",
    casi(r.conAntiguedad.totalGeneral, directo.totalGeneral),
    { transferencia: r.conAntiguedad.totalGeneral, indemnizacion: directo.totalGeneral },
  );
}

// ── 6. Los tres tipos de operación y las entradas inválidas ────────────────────────────────────
{
  check("son tres tipos de operación", TIPOS_OPERACION.length === 3, TIPOS_OPERACION.length);
  check(
    "los tres conservan la antigüedad",
    TIPOS_OPERACION.every((t) => t.conservaAntiguedad),
  );
  for (const t of TIPOS_OPERACION) {
    const r = calcularTransferencia({ ...CASO, tipoId: t.id })!;
    check(
      `la diferencia nunca es negativa (${t.id})`,
      r.diferencia >= 0,
      r.diferencia,
    );
    if (t.id === "transitoria") {
      check(
        "en el arrendamiento aparece el propietario que recupera el establecimiento (art. 227)",
        r.responsables.some((x) => x.base.includes("Art. 227")),
        r.responsables.map((x) => x.quien),
      );
    }
    if (t.id === "cesion-personal") {
      check(
        "en la cesión de personal aparece la solidaridad del art. 229 y el aviso de la conformidad",
        r.responsables.some((x) => x.base.includes("Art. 229")) &&
          r.avisos.some((a) => a.texto.includes("aceptación expresa y por escrito")),
      );
    }
  }
  check(
    "una transferencia anterior al ingreso no devuelve resultado",
    calcularTransferencia({ ...CASO, transferenciaISO: "2015-01-01" }) === null,
  );
  check(
    "un egreso anterior a la transferencia no devuelve resultado",
    calcularTransferencia({ ...CASO, egresoISO: "2020-01-01" }) === null,
  );
  check("sin sueldo no devuelve resultado", calcularTransferencia({ ...CASO, mejorRemuneracion: 0 }) === null);
  const viejo = calcularTransferencia({ ...CASO, egresoISO: "2025-11-10" })!;
  check(
    "un egreso anterior a la reforma avisa que rige el art. 228 viejo, sin excepciones",
    viejo.avisos.some((a) => a.texto.includes("sin excepción alguna")),
    viejo.avisos.map((a) => a.texto.slice(0, 40)),
  );
  const art226 = calcularTransferencia({ ...CASO, motivo: "art-226" })!;
  check(
    "el art. 226 avisa que la causa hay que probarla (criterio del art. 242)",
    art226.avisos.some((a) => a.texto.includes("artículo 242")),
  );
}

// ── 7. Fuentes ─────────────────────────────────────────────────────────────────────────────────
{
  check(
    "está citado el texto actualizado de la LCT en InfoLEG (id 25552)",
    TRANSFERENCIA_FUENTES.lista.some((f) => f.url.includes("25552/texact.htm")),
  );
  check(
    "está citada la captura de la que salen los textos anteriores",
    TRANSFERENCIA_FUENTES.lista.some(
      (f) => f.url.includes("web.archive.org") && f.url.includes("25552/texact.htm"),
    ),
  );
  check(
    "está citado el texto oficial de la Ley 27.802 (id 423680)",
    TRANSFERENCIA_FUENTES.lista.some((f) => f.url.includes("423680")),
  );
  check(
    "ninguna fuente es un blog o una nota de prensa",
    TRANSFERENCIA_FUENTES.lista.every(
      (f) =>
        f.url.includes("infoleg.gob.ar") ||
        f.url.includes("boletinoficial.gob.ar") ||
        f.url.includes("web.archive.org"),
    ),
    TRANSFERENCIA_FUENTES.lista.map((f) => f.url),
  );
  check(
    "la fecha de consulta está declarada",
    /^\d{4}-\d{2}-\d{2}$/.test(TRANSFERENCIA_FUENTES.consultadoEl),
    TRANSFERENCIA_FUENTES.consultadoEl,
  );
}

console.log(
  fallas === 0
    ? "\nTodos los checks de transferencia del establecimiento OK (LCT arts. 225 y 228 sustituidos por los arts. 46 y 47 de la Ley 27.802 · arts. 226, 227, 229 y 230 intactos)"
    : `\n${fallas} check(s) fallaron`,
);
process.exit(fallas === 0 ? 0 : 1);
