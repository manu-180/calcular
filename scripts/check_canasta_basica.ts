// Verificación del motor de canasta básica / líneas de pobreza (src/lib/canasta-basica.ts).
// Correr con: npx tsx scripts/check_canasta_basica.ts
//
// Es un dato sensible: un umbral de pobreza mal publicado desinforma sobre plata real. Por eso
// el check ancla contra los TRES hogares de ejemplo que el propio INDEC publica en el informe
// mensual, con los valores del informe de junio de 2026 (Buenos Aires, 14 de julio de 2026,
// Informes técnicos Vol. 10 n° 166). Si el motor no reproduce esos números, no se publica.
//
// Los valores esperados NO se derivan de nuestra serie: están transcritos del PDF oficial, así el
// check cruza dos fuentes distintas (API de datos.gob.ar vs. informe de prensa del INDEC).

import { CANASTA_BASICA, CANASTA_BASICA_ULTIMO } from "../src/data/canasta-basica";
import {
  TABLA_ADULTO_EQUIVALENTE,
  adultoEquivalente,
} from "../src/data/adulto-equivalente";
import { calcularCanastaBasica } from "../src/lib/canasta-basica";
import {
  CANASTA_MES_DESDE,
  MESES_CANASTA,
  actualizacionCanastaHastaHoy,
  hogaresDelMes,
  mesCanastaPorSlug,
  slugDeMesCanasta,
} from "../src/lib/canasta-basica-meses";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const aprox = (a: number, b: number, tol = 1) => Math.abs(a - b) < tol;

const U = CANASTA_BASICA_ULTIMO;

// ===========================================================================
// 1 · Los valores publicados por el INDEC para junio 2026 (informe del 14/7/2026)
// ===========================================================================
{
  const jun = CANASTA_BASICA.find((m) => m.periodo === "2026-06");
  check("la serie tiene junio 2026", jun !== undefined);
  // Resumen ejecutivo del informe: CBA $223.253 · CBT $495.622 (adulto equivalente).
  check("CBA del adulto equivalente de junio 2026 = $223.253", !!jun && aprox(jun.cba, 223_253), jun?.cba);
  check("CBT del adulto equivalente de junio 2026 = $495.622", !!jun && aprox(jun.cbt, 495_622), jun?.cbt);
}

// ===========================================================================
// 2 · Los tres hogares de ejemplo del informe oficial (junio 2026)
// ===========================================================================
const jun = CANASTA_BASICA.find((m) => m.periodo === "2026-06")!;

const HOGARES_OFICIALES = [
  {
    nombre: "Hogar de 3: mujer de 35, hijo varón de 18, madre de 61",
    integrantes: [
      { edad: 35, sexo: "mujer" as const },
      { edad: 18, sexo: "varon" as const },
      { edad: 61, sexo: "mujer" as const },
    ],
    ae: 2.46,
    li: 549_203,
    lp: 1_219_231,
  },
  {
    nombre: "Hogar de 4 (familia tipo): varón 35, mujer 31, hijo 6, hija 8",
    integrantes: [
      { edad: 35, sexo: "varon" as const },
      { edad: 31, sexo: "mujer" as const },
      { edad: 6, sexo: "varon" as const },
      { edad: 8, sexo: "mujer" as const },
    ],
    ae: 3.09,
    li: 689_853,
    lp: 1_531_473,
  },
  {
    nombre: "Hogar de 5: varón y mujer de 30, hijos de 1, 3 y 5",
    integrantes: [
      { edad: 30, sexo: "varon" as const },
      { edad: 30, sexo: "mujer" as const },
      { edad: 1, sexo: "mujer" as const },
      { edad: 3, sexo: "varon" as const },
      { edad: 5, sexo: "mujer" as const },
    ],
    ae: 3.25,
    li: 725_573,
    lp: 1_610_772,
  },
];

for (const h of HOGARES_OFICIALES) {
  const r = calcularCanastaBasica({ integrantes: h.integrantes, ingresoHogar: null, mes: jun });
  check(`${h.nombre}: ${h.ae} adultos equivalentes`, r !== null && r.adultosEquivalentes === h.ae, r?.adultosEquivalentes);
  check(
    `${h.nombre}: línea de indigencia = $${h.li.toLocaleString("es-AR")}`,
    r !== null && aprox(r.lineaIndigencia, h.li),
    r?.lineaIndigencia,
  );
  check(
    `${h.nombre}: línea de pobreza = $${h.lp.toLocaleString("es-AR")}`,
    r !== null && aprox(r.lineaPobreza, h.lp),
    r?.lineaPobreza,
  );
}

// ===========================================================================
// 3 · Clasificación por ingreso: los tres estados y sus bordes exactos
// ===========================================================================
{
  const base = HOGARES_OFICIALES[1]; // familia tipo
  const conIngreso = (ingreso: number) =>
    calcularCanastaBasica({ integrantes: base.integrantes, ingresoHogar: ingreso, mes: jun });

  check("ingreso 0: hogar indigente", conIngreso(0)?.situacion === "indigente");
  check("$1 debajo de la línea de indigencia: indigente", conIngreso(base.li - 1)?.situacion === "indigente");
  check("justo en la línea de indigencia: pobre, ya no indigente", conIngreso(base.li + 1)?.situacion === "pobre");
  check("$1 debajo de la línea de pobreza: pobre", conIngreso(base.lp - 1)?.situacion === "pobre");
  check("justo por encima de la línea de pobreza: no pobre", conIngreso(base.lp + 1)?.situacion === "no-pobre");

  const r = conIngreso(3_062_946); // exactamente 2× la línea de pobreza
  check("veces la línea de pobreza: 2× da 2", r !== null && aprox(r.vecesLineaPobreza ?? 0, 2, 0.01), r?.vecesLineaPobreza);
  check("brecha: el doble de la línea deja una brecha igual a la línea", r !== null && aprox(r.brechaPobreza ?? 0, base.lp, 2), r?.brechaPobreza);

  const sinIngreso = calcularCanastaBasica({ integrantes: base.integrantes, ingresoHogar: null, mes: jun });
  check(
    "sin ingreso informado: las líneas se calculan igual, la situación queda en null",
    sinIngreso !== null && sinIngreso.situacion === null && sinIngreso.brechaPobreza === null && sinIngreso.lineaPobreza > 0,
  );
}

// ===========================================================================
// 4 · Bordes: nada de números inventados
// ===========================================================================
{
  check("hogar vacío → null", calcularCanastaBasica({ integrantes: [], ingresoHogar: 100 }) === null);
  check(
    "edad negativa → null (no se extrapola)",
    calcularCanastaBasica({ integrantes: [{ edad: -1, sexo: "varon" }], ingresoHogar: null }) === null,
  );
  check(
    "edad no finita → null",
    calcularCanastaBasica({ integrantes: [{ edad: NaN, sexo: "mujer" }], ingresoHogar: null }) === null,
  );
  check(
    "ingreso negativo → null",
    calcularCanastaBasica({ integrantes: [{ edad: 30, sexo: "varon" }], ingresoHogar: -1 }) === null,
  );
  check(
    "una persona muy mayor entra en el último tramo (abierto), no se cae",
    calcularCanastaBasica({ integrantes: [{ edad: 103, sexo: "mujer" }], ingresoHogar: null })
      ?.adultosEquivalentes === 0.63,
  );
}

// ===========================================================================
// 5 · La tabla de adulto equivalente: cobertura sin huecos ni solapes
// ===========================================================================
{
  for (let i = 1; i < TABLA_ADULTO_EQUIVALENTE.length; i++) {
    const prev = TABLA_ADULTO_EQUIVALENTE[i - 1];
    const cur = TABLA_ADULTO_EQUIVALENTE[i];
    check(
      `tramo ${cur.etiqueta} arranca justo donde termina ${prev.etiqueta}`,
      cur.desde === prev.hasta + 1,
      { prev: prev.hasta, cur: cur.desde },
    );
  }
  const sinTramo: number[] = [];
  for (let edad = 0; edad <= 120; edad++) {
    if (adultoEquivalente(edad, "mujer") === null || adultoEquivalente(edad, "varon") === null) {
      sinTramo.push(edad);
    }
  }
  check("toda edad de 0 a 120 tiene coeficiente para ambos sexos", sinTramo.length === 0, sinTramo);
  check(
    "el varón adulto de 30 a 45 es la unidad de referencia (1,00)",
    adultoEquivalente(35, "varon") === 1,
  );
  check(
    "hasta los 9 años el coeficiente no depende del sexo (así lo publica el INDEC)",
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].every((e) => adultoEquivalente(e, "mujer") === adultoEquivalente(e, "varon")),
  );
}

// ===========================================================================
// 6 · La serie completa: coherencia interna
// ===========================================================================
{
  check("la serie arranca en abril de 2016", CANASTA_BASICA[0].periodo === "2016-04");
  check("hay más de 100 períodos", CANASTA_BASICA.length > 100, CANASTA_BASICA.length);
  check(
    "la CBT es siempre mayor que la CBA (el coeficiente de Engel amplía la canasta)",
    CANASTA_BASICA.every((m) => m.cbt > m.cba),
    CANASTA_BASICA.filter((m) => m.cbt <= m.cba).map((m) => m.periodo),
  );
  check(
    "no hay períodos duplicados ni desordenados",
    CANASTA_BASICA.every((m, i) => i === 0 || m.periodo > CANASTA_BASICA[i - 1].periodo),
  );
  check(
    "el último período de la serie es el que declara la fuente",
    U.periodo === CANASTA_BASICA[CANASTA_BASICA.length - 1].periodo,
  );
}

// ===========================================================================
// 7 · Las páginas por mes (/canasta-basica/[mes])
// ===========================================================================
// La mina que fija esta sección: el set de URLs publicadas **sólo puede crecer**. Un corte por
// ventana móvil dejaría en 404 páginas ya indexadas — el mismo daño que sufrió el sitio entero el
// 2/8 cuando el dominio quedó suelto, pero silencioso y permanente.
{
  check("el corte de publicación es un período FIJO, no una ventana móvil", CANASTA_MES_DESDE === "2024-01");
  check(
    "todos los meses publicados son >= el corte",
    MESES_CANASTA.every((m) => m.periodo >= CANASTA_MES_DESDE),
  );
  check(
    "los meses publicados salen de la serie, en orden y sin huecos",
    MESES_CANASTA.every((m, i) => i === 0 || m.periodo > MESES_CANASTA[i - 1].periodo) &&
      MESES_CANASTA.length === CANASTA_BASICA.filter((m) => m.periodo >= CANASTA_MES_DESDE).length,
  );
  check("hay al menos 30 meses con página propia", MESES_CANASTA.length >= 30, MESES_CANASTA.length);
  check(
    "el último mes de la serie tiene página",
    MESES_CANASTA[MESES_CANASTA.length - 1].periodo === U.periodo,
  );

  const slugs = MESES_CANASTA.map(slugDeMesCanasta);
  check("los slugs son únicos", new Set(slugs).size === slugs.length);
  check(
    "los slugs tienen la forma mes-año en minúsculas",
    slugs.every((s) => /^[a-záéíóú]+-\d{4}$/.test(s)),
    slugs.filter((s) => !/^[a-záéíóú]+-\d{4}$/.test(s)),
  );
  check(
    "cada slug resuelve de vuelta a su propio mes (ida y vuelta)",
    MESES_CANASTA.every((m) => mesCanastaPorSlug(slugDeMesCanasta(m))?.periodo === m.periodo),
  );
  check("un slug inexistente no resuelve (la página va a 404)", mesCanastaPorSlug("marzo-1999") === undefined);

  // Los tres hogares tienen que dar lo mismo que la calculadora para CUALQUIER mes, no solo el último.
  const alMes = hogaresDelMes(U);
  check(
    "los hogares del último mes reproducen las líneas ya verificadas arriba",
    alMes[1].r.adultosEquivalentes === 3.09 &&
      alMes[1].r.lineaPobreza === Math.round(U.cbt * 3.09 * 100) / 100,
    alMes[1].r,
  );
  check(
    "los hogares se resuelven en todos los meses publicados (ningún null, ninguna línea <= 0)",
    MESES_CANASTA.every((m) => hogaresDelMes(m).every((h) => h.r.lineaPobreza > 0 && h.r.lineaIndigencia > 0)),
  );
  check(
    "los adultos equivalentes NO dependen del mes (sólo del hogar)",
    MESES_CANASTA.every((m) =>
      hogaresDelMes(m).every((h, i) => h.r.adultosEquivalentes === alMes[i].r.adultosEquivalentes),
    ),
  );

  // El coeficiente de actualización es el diferenciador de la página: si miente, la página miente.
  const primero = MESES_CANASTA[0];
  const act = actualizacionCanastaHastaHoy(primero);
  check("el coeficiente de actualización llega al último mes de la serie", act.hasta.periodo === U.periodo);
  check(
    "el coeficiente reconstruye la CBT de llegada desde la de partida",
    Math.abs(primero.cbt * act.coeficiente - U.cbt) < 0.01,
    { partida: primero.cbt, coeficiente: act.coeficiente, llegada: U.cbt },
  );
  check("el % de actualización es coherente con el coeficiente", Math.abs(act.pct - (act.coeficiente - 1) * 100) < 1e-9);
  check(
    "el mes más nuevo no se actualiza contra sí mismo (coeficiente = 1)",
    actualizacionCanastaHastaHoy(U).coeficiente === 1,
  );
  check(
    "el coeficiente crece a medida que el mes es más viejo (la serie es monótona)",
    MESES_CANASTA.every(
      (m, i) =>
        i === 0 ||
        actualizacionCanastaHastaHoy(m).coeficiente <=
          actualizacionCanastaHastaHoy(MESES_CANASTA[i - 1]).coeficiente,
    ),
  );
}

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log(`Todos los checks de canasta básica OK (último: ${U.periodo})`);
}
