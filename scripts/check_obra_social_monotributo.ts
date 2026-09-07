// Verificación del acceso progresivo a la obra social del monotributo (Decreto 1/2010, Anexo).
// Correr con: npx tsx scripts/check_obra_social_monotributo.ts
//
// LO QUE ESTE CHECK EXISTE PARA IMPEDIR:
//
//   1. **Que la página anuncie una carencia única.** El error de todas las notas es dar un solo
//      número («tenés 3 meses de carencia»). El Anexo tiene TRES escalones y el que más importa
//      —discapacidad e Integración— es el de 6 meses, que casi nadie publica. Si algún día alguien
//      colapsa los escalones a uno, esto sale rojo.
//   2. **Que se invierta la asimetría del reloj.** Cambiar de obra social NO reinicia la carencia
//      (art. 74 inc. c); reingresar al régimen SÍ (art. 73). Publicarlo al revés le hace perder
//      seis meses de cobertura a alguien, o se los promete cuando no los tiene.
//   3. **Que el reparto se copie del trabajador dependiente.** El monotributista va 90/10 (art. 39
//      inc. b: «un diez por ciento (10%) se destinará al Fondo Solidario de Redistribución»); el
//      empleado va 85/15 desde el Decreto 600/2024. Son dos números distintos en el mismo sitio.
//   4. **Que el borde del escalón se cuente mal.** El día en que se cumplen los 3 meses el escalón
//      YA está abierto; el día anterior, no. Un `<` en vez de `<=` niega un día de internación.
//   5. **Que se pierda el art. 72.** Quien adhirió antes de la Ley 26.565 no tiene carencia: si el
//      motor se la aplica igual, la página le miente a los monotributistas más antiguos.

import {
  ESCALONES,
  MESES_PARA_CAMBIAR,
  MONO_OS_FUENTES,
  MONO_OS_TEXTOS,
  REGLAS,
  REPARTO_MONOTRIBUTO,
} from "../src/data/obra-social-monotributo";
import { CATEGORIAS } from "../src/data/monotributo";
import { REPARTO_VIGENTE } from "../src/data/obra-social-aportes";
import { calcularMonoOS, diasEntre } from "../src/lib/obra-social-monotributo";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FALLA ${nombre}`, detalle ?? "");
  }
}

// --- 1. Los tres escalones, con sus plazos exactos --------------------------------------------
check("hay exactamente tres escalones", ESCALONES.length === 3, ESCALONES.length);
check(
  "los plazos son 0, 3 y 6 meses, en ese orden",
  ESCALONES.map((e) => e.meses).join(",") === "0,3,6",
  ESCALONES.map((e) => e.meses),
);
check(
  "el escalón de los 3 meses es el de INTERNACIÓN",
  ESCALONES[1].prestaciones.some((p) => p.toLowerCase().includes("internación al 100%")),
);
check(
  "el escalón de los 6 meses nombra el SURGE y la Integración (discapacidad)",
  ESCALONES[2].prestaciones.some((p) => p.includes("SURGE")) &&
    ESCALONES[2].prestaciones.some((p) => p.includes("Integración")) &&
    ESCALONES[2].prestaciones.some((p) => p.includes("discapacidad")),
);
check(
  "el escalón inicial NO promete internación",
  !ESCALONES[0].prestaciones.some((p) => p.toLowerCase().includes("internación")),
);
check(
  "los topes propios del ambulatorio están escritos (30 visitas, 25 sesiones, 40%)",
  ESCALONES[0].prestaciones.some((p) => p.includes("30 visitas")) &&
    ESCALONES[0].prestaciones.some((p) => p.includes("25 sesiones")) &&
    ESCALONES[0].prestaciones.some((p) => p.includes("40%")),
);

// --- 2. El motor: bordes del escalón ------------------------------------------------------------
const base = { categoria: "A", anteriorA26565: false };

const vispera = calcularMonoOS({ ...base, adhesionISO: "2026-01-15", hoyISO: "2026-04-14" })!;
const justo = calcularMonoOS({ ...base, adhesionISO: "2026-01-15", hoyISO: "2026-04-15" })!;
check("la víspera de los 3 meses la internación está CERRADA", !vispera.escalones[1].abierto);
check("el día exacto de los 3 meses la internación está ABIERTA", justo.escalones[1].abierto);
check(
  "el ambulatorio está abierto desde el día uno",
  calcularMonoOS({ ...base, adhesionISO: "2026-09-06", hoyISO: "2026-09-06" })!.escalones[0].abierto,
);
check(
  "a los 3 meses el escalón de alto costo sigue cerrado",
  !justo.escalones[2].abierto && justo.proximo?.escalon.id === "seis-meses",
);
const seis = calcularMonoOS({ ...base, adhesionISO: "2026-01-15", hoyISO: "2026-07-15" })!;
check("a los 6 meses están los tres escalones y no queda próximo", seis.proximo === null);
check(
  "el veredicto de un alta reciente avisa que NO hay internación",
  calcularMonoOS({ ...base, adhesionISO: "2026-09-01", hoyISO: "2026-09-06" })!.veredicto.includes(
    "internación",
  ),
);

// El 31 de un mes largo + 3 meses no puede caer en un día que no existe.
const finDeMes = calcularMonoOS({ ...base, adhesionISO: "2025-11-30", hoyISO: "2026-03-01" })!;
check(
  "sumar meses desde un fin de mes da una fecha real",
  finDeMes.escalones[1].desdeISO === "2026-02-28",
  finDeMes.escalones[1].desdeISO,
);

// --- 3. Art. 72: los anteriores a la Ley 26.565 no tienen carencia ------------------------------
const viejo = calcularMonoOS({
  categoria: "A",
  anteriorA26565: true,
  adhesionISO: "2005-03-10",
  hoyISO: "2026-09-06",
})!;
check("el monotributista anterior a la Ley 26.565 tiene los tres escalones abiertos", viejo.proximo === null);
check("y su veredicto lo dice por el art. 72", viejo.veredicto.includes("art. 72"));

// --- 4. La opción de cambio (art. 74 inc. c) ----------------------------------------------------
check("la permanencia mínima son 12 meses", MESES_PARA_CAMBIAR === 12);
const antesDelAnio = calcularMonoOS({ ...base, adhesionISO: "2026-01-15", hoyISO: "2026-12-15" })!;
const alAnio = calcularMonoOS({ ...base, adhesionISO: "2026-01-15", hoyISO: "2027-01-15" })!;
check("antes de los 12 meses no se puede cambiar de obra social", !antesDelAnio.puedeCambiar);
check("cumplidos los 12 meses sí se puede", alAnio.puedeCambiar);

// --- 5. El reparto: 90/10, y distinto del 85/15 del dependiente ---------------------------------
check("el reparto del monotributo es 90/10", REPARTO_MONOTRIBUTO.entidad === 0.9 && REPARTO_MONOTRIBUTO.fondo === 0.1);
// Los dos repartos son literales, así que TypeScript resuelve la comparación en compilación y
// `!==` sería un error de tipos. Se ensanchan a number a propósito: el guard existe para el día en
// que alguien copie el 85/15 del dependiente sobre el 90/10 del monotributista, no para hoy.
const repartoMono: number = REPARTO_MONOTRIBUTO.entidad;
const repartoDependiente: number = REPARTO_VIGENTE.entidad;
check(
  "y NO es el mismo que el del trabajador en relación de dependencia",
  repartoMono !== repartoDependiente,
  { monotributo: REPARTO_MONOTRIBUTO, dependiente: REPARTO_VIGENTE },
);
for (const cat of ["A", "F", "K"]) {
  const r = calcularMonoOS({ ...base, categoria: cat, adhesionISO: "2020-01-01", hoyISO: "2026-09-06" })!;
  const esperado = CATEGORIAS.find((c) => c.cat === cat)!.obraSocial;
  check(
    `categoría ${cat}: el aporte sale de la escala vigente y se parte sin perder centavos`,
    r.aporteTitular === esperado && Math.abs(r.aEntidad + r.aFondo - esperado) < 0.01,
    { esperado, r: { aporteTitular: r.aporteTitular, aEntidad: r.aEntidad, aFondo: r.aFondo } },
  );
}

// El componente de obra social dejó de ser plano: desde la D sube en cada categoría (Ley 27.743).
const escala = CATEGORIAS.map((c) => c.obraSocial);
check(
  "el aporte de obra social NO es plano: sube desde la categoría D",
  new Set(escala).size > 1 && escala[escala.length - 1] > escala[0],
  escala,
);

// --- 6. Entradas inválidas ---------------------------------------------------------------------
check(
  "una adhesión posterior a la fecha consultada no devuelve resultado",
  calcularMonoOS({ ...base, adhesionISO: "2026-10-01", hoyISO: "2026-09-06" }) === null,
);
check(
  "una categoría inexistente no devuelve resultado",
  calcularMonoOS({ ...base, categoria: "Z", adhesionISO: "2026-01-01", hoyISO: "2026-09-06" }) === null,
);
check("diasEntre cuenta días reales cruzando un año bisiesto", diasEntre("2028-02-27", "2028-03-01") === 3);

// --- 7. Las citas textuales y las fuentes ------------------------------------------------------
check(
  "la cita del art. 42 trae la delegación Y el coseguro",
  MONO_OS_TEXTOS.art42.includes("número determinado de meses") &&
    MONO_OS_TEXTOS.art42.includes("cobro del pertinente coseguro"),
);
check(
  "la cita del art. 69 bis trae la facultad de elegir categorías",
  MONO_OS_TEXTOS.art69bis.includes("distinguir las categorías cuyo ingreso permitan"),
);
check(
  "la cita del art. 76 trae los comprobantes como condición del servicio",
  MONO_OS_TEXTOS.art76.includes("comprobantes de pago") &&
    MONO_OS_TEXTOS.art76.includes("condición para la prestación"),
);
check(
  "la regla del cambio dice que NO se vuelve a cumplir la carencia",
  REGLAS.find((r) => r.id === "cambio")!.texto.includes("no se vuelve a cumplir"),
);
check(
  "la regla del reingreso dice que SÍ se reinicia",
  /vuelve a aplicarse|de nuevo/.test(REGLAS.find((r) => r.id === "reingreso")!.texto),
);
check(
  "las fuentes son InfoLEG y son el decreto reglamentario Y la ley",
  MONO_OS_FUENTES.lista.length === 2 &&
    MONO_OS_FUENTES.lista.every((f) => f.url.includes("infoleg.gob.ar")) &&
    MONO_OS_FUENTES.lista.some((f) => f.url.includes("162518")) &&
    MONO_OS_FUENTES.lista.some((f) => f.url.includes("51609")),
);

if (fallas > 0) {
  console.error(`\n❌ ${fallas} check(s) fallaron`);
  process.exit(1);
}
console.log(
  "\n✅ Todos los checks de la obra social del monotributo OK (Decreto 1/2010 Anexo · Ley 24.977 arts. 39, 40 y 42)",
);
