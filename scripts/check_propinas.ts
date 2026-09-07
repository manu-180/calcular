// Verificación de la página de propinas (LCT arts. 104, 104 bis, 103 bis y 113 derogado,
// texto de la Ley 27.802). Correr con: npx tsx scripts/check_propinas.ts
//
// LOS ANCLAS (cada uno cubre una forma distinta de que esto se rompa en silencio):
//   1. **La cita del art. 104 tiene que seguir diciendo lo contrario de lo que decía la ley
//      anterior.** Todo el valor de la página es esa inversión: si alguna vez el texto guardado
//      pierde el «en ningún caso» o el «aun cuando … sean habituales», la página estaría
//      afirmando algo que su fuente ya no dice.
//   2. **El art. 113 tiene que seguir derogado por el art. 207 de la 27.802.** Si volviera a
//      tener texto, la respuesta de la página cambia entera.
//   3. **La columna «vigente» nunca puede incluir las propinas y la «anterior» siempre tiene que
//      incluirlas.** Es la única diferencia entre las dos, y si un refactor la invierte el número
//      grande de la página queda al revés sin que nada explote.
//   4. **La indemnización del art. 245 es el rubro que multiplica**: la diferencia tiene que ser
//      exactamente las propinas por los años computables. Ahí está la plata.
//   5. **La fracción mayor a 3 meses suma un año, la de 3 meses exactos no** (art. 245).
//   6. **Los aportes son el 17% que ya vive en data/sueldo.ts**, no un número escrito a mano acá.
//   7. **Los beneficios sociales del art. 103 bis son SIETE incisos, de la a) a la g)**: la lista
//      la sustituyó la misma reforma y es lo que la página publica como no remunerativo.

import {
  ARTICULO_DEROGADO,
  ARTICULO_DEROGATORIO,
  BENEFICIOS_SOCIALES,
  PROPINAS_FUENTES,
  PROPINAS_TEXTOS,
  VIGENCIA_REFORMA,
  VIGENCIA_REFORMA_ISO,
} from "../src/data/propinas";
import { TOTAL_APORTES } from "../src/data/sueldo";
import { DIVISOR_VACACIONES } from "../src/data/vacaciones";
import { aniosComputables, calcularPropinas, diasDeVacaciones } from "../src/lib/propinas";

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

// ── 1. Las citas textuales dicen lo que dice la norma ──────────────────────────────────────────
{
  const t = PROPINAS_TEXTOS;
  check(
    "el art. 104 excluye a las propinas «en ningún caso»",
    t.art104.includes("En ningún caso las propinas podrán ser consideradas como remuneración"),
    t.art104,
  );
  check(
    "…y aclara que vale aun cuando sean habituales (es lo que invierte la regla vieja)",
    /aun cuando por los usos y costumbres de determinadas actividades sean habituales/.test(
      t.art104,
    ),
  );
  check(
    "la nota del art. 104 cita la sustitución por el art. 32 de la Ley 27.802",
    t.art104Nota.includes("art. 32") && t.art104Nota.includes("27.802"),
  );
  check(
    "el art. 104 bis quita ultraactividad, continuidad tácita y costumbre a los componentes nuevos",
    ["continuidad tácita", "ultraactividad", "costumbre"].every((f) => t.art104bis.includes(f)),
  );
  check(
    "el art. 105 remite a los beneficios sociales del art. 103 bis",
    t.art105.includes("103 bis") && t.art105.includes("integran la remuneración"),
  );
}

// ── 2. El art. 113 sigue derogado, y por el artículo que decimos ──────────────────────────────
{
  check("el artículo derogado de la LCT es el 113", ARTICULO_DEROGADO === 113);
  check("lo derogó el art. 207 de la Ley 27.802", ARTICULO_DEROGATORIO === 207);
  check(
    "la nota guardada es la de derogación, no la de sustitución",
    PROPINAS_TEXTOS.art113Nota.includes("derogado") &&
      PROPINAS_TEXTOS.art113Nota.includes(`art. ${ARTICULO_DEROGATORIO}`),
    PROPINAS_TEXTOS.art113Nota,
  );
  check(
    "la vigencia es el 6/3/2026 y no es retroactiva",
    VIGENCIA_REFORMA_ISO === "2026-03-06" && VIGENCIA_REFORMA.includes("marzo de 2026"),
  );
}

// ── 3. Las dos columnas se diferencian SÓLO por las propinas ──────────────────────────────────
{
  const r = calcularPropinas({
    remuneracionMensual: 1_000_000,
    propinasMensuales: 500_000,
    anios: 10,
    meses: 0,
  });
  check("la columna vigente NO incluye las propinas en la base", r.vigente.base === 1_000_000);
  check("la columna anterior SÍ las incluye", r.anterior.base === 1_500_000);
  check(
    "el medio aguinaldo es el 50% de la base en las dos columnas",
    casi(r.vigente.sacSemestral, 500_000) && casi(r.anterior.sacSemestral, 750_000),
  );
  check(
    "el día de vacaciones es la base dividida 25 (art. 155 inc. a)",
    casi(r.vigente.diaVacaciones, 1_000_000 / DIVISOR_VACACIONES),
  );
  check(
    "los aportes son el 17% de data/sueldo.ts, no un número escrito acá",
    casi(r.vigente.aportesMensuales, 1_000_000 * TOTAL_APORTES),
  );
  check(
    "la diferencia de aportes mensuales es el 17% de las propinas",
    casi(r.difAportesMensuales, 500_000 * TOTAL_APORTES),
  );
  check("el peso de las propinas sobre el ingreso total es correcto", casi(r.pesoPropinas, 1 / 3, 1e-6));
}

// ── 4. La indemnización del art. 245 es donde está la plata ────────────────────────────────────
{
  for (const anios of [1, 5, 10, 23]) {
    const r = calcularPropinas({
      remuneracionMensual: 900_000,
      propinasMensuales: 300_000,
      anios,
      meses: 0,
    });
    check(
      `con ${anios} año(s), la diferencia de indemnización es propinas × años`,
      casi(r.difIndemnizacion, 300_000 * anios),
      { calculado: r.difIndemnizacion, esperado: 300_000 * anios },
    );
  }
  const r = calcularPropinas({
    remuneracionMensual: 900_000,
    propinasMensuales: 300_000,
    anios: 5,
    meses: 0,
  });
  check(
    "la diferencia total del despido suma antigüedad + SAC anual + vacaciones",
    casi(r.difTotalDespido, r.difIndemnizacion + r.difSacAnual + r.difVacaciones),
  );
  check("la diferencia de SAC anual es una propina entera por año", casi(r.difSacAnual, 300_000));
}

// ── 5. La fracción del art. 245 ────────────────────────────────────────────────────────────────
{
  check("3 años y 4 meses computan 4 años (fracción mayor de 3 meses)", aniosComputables(3, 4) === 4);
  check("3 años y 3 meses computan 3 (la fracción tiene que ser MAYOR de 3)", aniosComputables(3, 3) === 3);
  check("3 años justos computan 3", aniosComputables(3, 0) === 3);
  check("una antigüedad negativa no rompe ni da negativo", aniosComputables(-2, -5) === 0);
}

// ── 6. La escala de vacaciones del art. 150 ────────────────────────────────────────────────────
{
  check("hasta 5 años → 14 días", diasDeVacaciones(5) === 14);
  check("más de 5 y hasta 10 → 21 días", diasDeVacaciones(5.5) === 21 && diasDeVacaciones(10) === 21);
  check("más de 10 y hasta 20 → 28 días", diasDeVacaciones(11) === 28 && diasDeVacaciones(20) === 28);
  check("más de 20 → 35 días", diasDeVacaciones(21) === 35);
}

// ── 7. Degradación elegante y avisos ───────────────────────────────────────────────────────────
{
  const cero = calcularPropinas({
    remuneracionMensual: 800_000,
    propinasMensuales: 0,
    anios: 3,
    meses: 0,
  });
  check("sin propinas, las dos columnas dan igual", cero.difTotalDespido === 0);
  check(
    "…y la página lo dice en vez de mostrar un cero mudo",
    cero.avisos.some((a) => /no cambia nada/i.test(a.texto)),
  );

  const negativo = calcularPropinas({
    remuneracionMensual: -100,
    propinasMensuales: -50,
    anios: 2,
    meses: 0,
  });
  check("montos negativos se tratan como cero", negativo.vigente.base === 0 && negativo.anterior.base === 0);

  const pesado = calcularPropinas({
    remuneracionMensual: 500_000,
    propinasMensuales: 500_000,
    anios: 8,
    meses: 0,
  });
  check(
    "cuando las propinas pesan mucho, el aviso es bloqueante",
    pesado.avisos.some((a) => a.tono === "bloqueante"),
  );
  check(
    "siempre se avisa que la reforma no es retroactiva",
    pesado.avisos.some((a) => /no es retroactiv/i.test(a.texto)),
  );
  check(
    "siempre se avisa que el tope del art. 245 puede achicar la diferencia",
    pesado.avisos.some((a) => /245/.test(a.texto) && /tope/i.test(a.texto)),
  );
  check(
    "siempre se aclara que el adicional del convenio SÍ es salario",
    pesado.avisos.some((a) => /tercero/i.test(a.texto) && /convenio/i.test(a.texto)),
  );
}

// ── 8. Los beneficios sociales del art. 103 bis ────────────────────────────────────────────────
{
  check("son siete incisos", BENEFICIOS_SOCIALES.length === 7);
  check(
    "van de la a) a la g), sin repetidos",
    BENEFICIOS_SOCIALES.map((b) => b.inciso).join("") === "abcdefg",
  );
  check(
    "el inciso d) es guardería para hijos de hasta 6 años",
    /guarder/i.test(BENEFICIOS_SOCIALES[3].texto) && /6 años/.test(BENEFICIOS_SOCIALES[3].texto),
  );
  check(
    "ningún inciso quedó vacío",
    BENEFICIOS_SOCIALES.every((b) => b.texto.trim().length > 30),
  );
}

// ── 9. Higiene de fuentes ──────────────────────────────────────────────────────────────────────
{
  check(
    "todas las fuentes son oficiales (infoleg / boletinoficial / argentina.gob.ar)",
    PROPINAS_FUENTES.lista.every((f) =>
      /^https:\/\/(www\.)?(servicios\.infoleg|infoleg|boletinoficial|argentina)\.gob\.ar\//.test(
        f.url,
      ),
    ),
    PROPINAS_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citado el texto ACTUALIZADO de la LCT, no el original",
    PROPINAS_FUENTES.lista.some((f) => f.url.includes("25552") && f.url.endsWith("texact.htm")),
  );
  check(
    "está citada la Ley 27.802",
    PROPINAS_FUENTES.lista.some((f) => f.nombre.includes("27.802") || f.detalle.includes("27.802")),
  );
  check(
    "la fecha de consulta es una fecha ISO",
    /^\d{4}-\d{2}-\d{2}$/.test(PROPINAS_FUENTES.consultadoEl),
  );
}

if (fallas > 0) {
  console.error(`\n${fallas} check(s) fallaron.`);
  process.exit(1);
}
console.log("\nTodos los checks de propinas OK (LCT arts. 104, 104 bis y 103 bis · Ley 27.802).");
