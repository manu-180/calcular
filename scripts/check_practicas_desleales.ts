// Verificación de la página de prácticas desleales sindicales (Ley 23.551 arts. 20 bis, 20 ter,
// 53 bis, 54 y 55 · Anexo II de la Ley 25.212 art. 5º).
// Correr con: npx tsx scripts/check_practicas_desleales.ts
//
// LOS ANCLAS:
//   1. **La escala es la del Anexo II, no una inventada**: 25-150% (leve), 30-200% (grave, por
//      trabajador) y 50-2.000% (muy grave, por trabajador) del SMVM. Si alguno de esos seis
//      números se corre, la página publica una multa que no existe.
//   2. **El SMVM no se duplica**: sale de `smvmVigente()`, el mismo dato que usa /desempleo. Si
//      esta página tuviera su propia copia, calcular.ar publicaría dos SMVM distintos.
//   3. **«Por cada trabajador afectado» sólo en grave y muy grave.** En la leve, el número de
//      trabajadores no puede mover el importe: la ley no lo dice ahí.
//   4. **El quíntuplo es del MÁXIMO, no del mínimo** (art. 55): la reincidencia nunca puede subir
//      el piso de la multa.
//   5. **El tope del 20% de las cuotas puede quedar por debajo del mínimo de la escala, y la ley
//      no resuelve ese choque**: el resultado tiene que marcarlo en vez de elegir por su cuenta.
//   6. **Las citas dicen lo que dice la norma**, y el art. 53 bis tiene que tener los ocho incisos.

import {
  CAMBIOS,
  CONDUCTAS_MUY_GRAVES,
  DIAS_TRAMO_MORA,
  ESCALONES,
  MULTIPLICADOR_REINCIDENCIA,
  PD_FUENTES,
  PRACTICAS_SINDICALES,
  RECARGO_MORA,
  REDUCCION_POR_REPARAR,
  REFORMA_PUBLICADA,
  REFORMA_PUBLICADA_ISO,
  TEXTOS,
  TOPE_CUOTAS,
} from "../src/data/practicas-desleales";
import { SMVM_ULTIMO } from "../src/data/desempleo";
import { smvmVigente } from "../src/lib/desempleo";
import { calcularMultaPractica } from "../src/lib/practicas-desleales";

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

const SIN_NADA = {
  trabajadores: 1,
  reincidencia: false,
  diasDeMora: 0,
  reparadaEnPlazo: false,
};

// ── 1. La escala del Anexo II, art. 5º ─────────────────────────────────────────────────────────
{
  const leve = ESCALONES.find((e) => e.id === "leve")!;
  const grave = ESCALONES.find((e) => e.id === "grave")!;
  const muy = ESCALONES.find((e) => e.id === "muy-grave")!;
  check("la leve va del 25% al 150% del SMVM", leve.min === 0.25 && leve.max === 1.5);
  check("la grave va del 30% al 200% del SMVM", grave.min === 0.3 && grave.max === 2);
  check("la muy grave va del 50% al 2.000% del SMVM", muy.min === 0.5 && muy.max === 20);
  check(
    "sólo la grave y la muy grave se cuentan por trabajador afectado",
    leve.porTrabajador === false && grave.porTrabajador === true && muy.porTrabajador === true,
  );
  check(
    "la cita del art. 5º trae los seis porcentajes",
    ["veinticinco por ciento (25%)", "ciento cincuenta por ciento (150%)", "treinta por ciento (30%)", "doscientos por ciento (200%)", "cincuenta por ciento (50%)", "dos mil por ciento (2.000%)"].every(
      (t) => TEXTOS.art5Anexo2.includes(t),
    ),
  );
  check(
    "…y dice que la primera leve admite apercibimiento",
    TEXTOS.art5Anexo2.includes("Apercibimiento, para la primera infracción leve"),
  );
}

// ── 2. El SMVM sale del dato compartido con /desempleo ─────────────────────────────────────────
{
  const r = calcularMultaPractica({ ...SIN_NADA, escalon: "leve" });
  const vig = smvmVigente();
  check(
    "el SMVM de la multa es el mismo que usa /desempleo",
    r.smvmMensual === vig.mes.mensual && r.smvmPeriodo === vig.mes.periodo,
    { multa: r.smvmMensual, desempleo: vig.mes.mensual },
  );
  check(
    "…y ese SMVM es un mes real de la serie oficial",
    r.smvmMensual > 0 && r.smvmMensual <= SMVM_ULTIMO.mensual,
    { usado: r.smvmMensual, ultimo: SMVM_ULTIMO.mensual },
  );
  check(
    "se puede fijar el SMVM del mes de la constatación",
    calcularMultaPractica({ ...SIN_NADA, escalon: "leve", smvmMensual: 300_000 }).smvmMensual ===
      300_000,
  );
}

// ── 3. La cuenta base, escalón por escalón ─────────────────────────────────────────────────────
{
  const SMVM = 400_000;
  const leve = calcularMultaPractica({ ...SIN_NADA, escalon: "leve", smvmMensual: SMVM });
  check(
    "leve: del 25% al 150% de un SMVM",
    casi(leve.minimo, SMVM * 0.25) && casi(leve.maximo, SMVM * 1.5),
    { min: leve.minimo, max: leve.maximo },
  );

  // 10 trabajadores no mueven la leve (la ley no la calcula por trabajador).
  const leve10 = calcularMultaPractica({
    ...SIN_NADA,
    escalon: "leve",
    trabajadores: 10,
    smvmMensual: SMVM,
  });
  check(
    "leve: los trabajadores afectados NO multiplican",
    casi(leve10.maximo, leve.maximo) && leve10.trabajadoresComputados === 1,
    leve10.trabajadoresComputados,
  );

  const grave10 = calcularMultaPractica({
    ...SIN_NADA,
    escalon: "grave",
    trabajadores: 10,
    smvmMensual: SMVM,
  });
  check(
    "grave: 10 trabajadores multiplican por 10",
    casi(grave10.minimo, SMVM * 0.3 * 10) && casi(grave10.maximo, SMVM * 2 * 10),
    { min: grave10.minimo, max: grave10.maximo },
  );

  const muy = calcularMultaPractica({
    ...SIN_NADA,
    escalon: "muy-grave",
    trabajadores: 25,
    smvmMensual: SMVM,
  });
  check(
    "muy grave: 25 trabajadores, del 50% al 2.000% cada uno",
    casi(muy.minimo, SMVM * 0.5 * 25) && casi(muy.maximo, SMVM * 20 * 25),
    { min: muy.minimo, max: muy.maximo },
  );

  check(
    "cero trabajadores se computa como uno, no como cero",
    calcularMultaPractica({ ...SIN_NADA, escalon: "grave", trabajadores: 0, smvmMensual: SMVM })
      .trabajadoresComputados === 1,
  );
}

// ── 4. El quíntuplo del art. 55 es del máximo, nunca del mínimo ────────────────────────────────
{
  const SMVM = 400_000;
  check("el multiplicador es 5", MULTIPLICADOR_REINCIDENCIA === 5);
  const base = calcularMultaPractica({ ...SIN_NADA, escalon: "grave", smvmMensual: SMVM });
  const rein = calcularMultaPractica({
    ...SIN_NADA,
    escalon: "grave",
    reincidencia: true,
    smvmMensual: SMVM,
  });
  check(
    "la reincidencia quintuplica el máximo",
    casi(rein.maximoConReincidencia, base.maximo * 5),
    { conReincidencia: rein.maximoConReincidencia, base: base.maximo },
  );
  check("…y deja el mínimo intacto", casi(rein.minimo, base.minimo));
  check(
    "el art. 55 dice «quíntuplo del máximo»",
    TEXTOS.art55Nuevo.includes("hasta el quíntuplo del máximo previsto en la ley 25.212"),
  );
}

// ── 5. El tope del 20% de las cuotas sindicales ────────────────────────────────────────────────
{
  const SMVM = 400_000;
  check("el tope es el 20% de las cuotas del mes", TOPE_CUOTAS === 0.2);

  const sinTope = calcularMultaPractica({ ...SIN_NADA, escalon: "grave", smvmMensual: SMVM });
  check("sin recaudación cargada no hay tope", sinTope.topeCuotas === null);
  check("…y el techo efectivo es el máximo de la escala", casi(sinTope.techoEfectivo, sinTope.maximo));

  // Cuotas de $ 2.000.000 → tope de $ 400.000, por debajo del máximo de $ 800.000.
  const conTope = calcularMultaPractica({
    ...SIN_NADA,
    escalon: "grave",
    cuotasDelMes: 2_000_000,
    smvmMensual: SMVM,
  });
  check("el tope es exactamente el 20% de lo recaudado", casi(conTope.topeCuotas!, 400_000));
  check("el techo efectivo se recorta al tope", casi(conTope.techoEfectivo, 400_000), conTope.techoEfectivo);
  check(
    "…pero el tope no queda por debajo del mínimo en este caso",
    conTope.topeChocaConElMinimo === false,
    { tope: conTope.topeCuotas, minimo: conTope.minimo },
  );

  // Cuotas chicas: el tope cae por debajo del mínimo de la escala. La ley no resuelve el choque.
  const choque = calcularMultaPractica({
    ...SIN_NADA,
    escalon: "muy-grave",
    trabajadores: 50,
    cuotasDelMes: 100_000,
    smvmMensual: SMVM,
  });
  check(
    "cuando el tope queda por debajo del mínimo, el resultado lo marca",
    choque.topeChocaConElMinimo === true && choque.topeCuotas! < choque.minimo,
    { tope: choque.topeCuotas, minimo: choque.minimo },
  );
  check(
    "el art. 55 fija ese tope sobre las cuotas del mes de la infracción",
    TEXTOS.art55Nuevo.includes(
      "veinte por ciento (20%) de los ingresos provenientes de las cuotas sindicales que deban pagar los afiliados en el mes en que se cometió la infracción",
    ),
  );
}

// ── 6. Mora y reducción por reparar ────────────────────────────────────────────────────────────
{
  const SMVM = 400_000;
  check("el recargo es del 10% cada 5 días", RECARGO_MORA === 0.1 && DIAS_TRAMO_MORA === 5);
  check("la reducción por reparar es de hasta el 50%", REDUCCION_POR_REPARAR === 0.5);

  const sinMora = calcularMultaPractica({ ...SIN_NADA, escalon: "leve", smvmMensual: SMVM });
  const mora4 = calcularMultaPractica({
    ...SIN_NADA,
    escalon: "leve",
    diasDeMora: 4,
    smvmMensual: SMVM,
  });
  check("4 días de mora todavía no completan un tramo", mora4.tramosDeMora === 0);
  check("…y por eso el importe no se mueve", casi(mora4.maximoFinal, sinMora.maximoFinal));

  const mora12 = calcularMultaPractica({
    ...SIN_NADA,
    escalon: "leve",
    diasDeMora: 12,
    smvmMensual: SMVM,
  });
  check("12 días son dos tramos de 5", mora12.tramosDeMora === 2 && casi(mora12.recargoMora, 0.2));
  check(
    "…y suman un 20% sobre el importe originario",
    casi(mora12.maximoFinal, sinMora.maximoFinal * 1.2) &&
      casi(mora12.minimoFinal, sinMora.minimoFinal * 1.2),
    { conMora: mora12.maximoFinal, sinMora: sinMora.maximoFinal },
  );

  const reparada = calcularMultaPractica({
    ...SIN_NADA,
    escalon: "leve",
    reparadaEnPlazo: true,
    smvmMensual: SMVM,
  });
  check(
    "reparar en plazo baja el importe a la mitad",
    casi(reparada.maximoFinal, sinMora.maximoFinal / 2) &&
      casi(reparada.minimoFinal, sinMora.minimoFinal / 2),
  );
  check(
    "el art. 55 trae las dos reglas: el 10% cada 5 días y el 50%",
    TEXTOS.art55Nuevo.includes("diez por ciento (10%) por cada cinco (5) días de mora") &&
      TEXTOS.art55Nuevo.includes("podrá reducirse hasta el cincuenta por ciento (50%)"),
  );
}

// ── 7. El art. 53 bis y el art. 20 ter ─────────────────────────────────────────────────────────
{
  check("el art. 53 bis tiene ocho incisos", PRACTICAS_SINDICALES.length === 8);
  check(
    "los incisos van de la a) a la h)",
    PRACTICAS_SINDICALES.map((p) => p.inciso).join("") === "abcdefgh",
    PRACTICAS_SINDICALES.map((p) => p.inciso),
  );
  check(
    "sólo el inciso a) es muy grave POR LEY (por el reenvío al art. 20 ter)",
    PRACTICAS_SINDICALES.filter((p) => p.muyGravePorLey).length === 1 &&
      PRACTICAS_SINDICALES.find((p) => p.muyGravePorLey)!.inciso === "a",
  );
  check(
    "cada inciso del array está en la cita literal del artículo",
    PRACTICAS_SINDICALES.every((p) => TEXTOS.art53bis.includes(p.texto.replace(/\.$/, ""))),
    PRACTICAS_SINDICALES.filter((p) => !TEXTOS.art53bis.includes(p.texto.replace(/\.$/, ""))).map(
      (p) => p.inciso,
    ),
  );
  check("el art. 20 ter tiene tres conductas", CONDUCTAS_MUY_GRAVES.length === 3);
  check(
    "el art. 20 ter las califica él mismo como muy graves",
    TEXTOS.art20ter.startsWith("Serán consideradas infracciones muy graves"),
  );
  check(
    "…y el bloqueo y la toma están entre ellas",
    TEXTOS.art20ter.includes("organizar el bloqueo o tomar un establecimiento"),
  );
  check(
    "el art. 20 bis dice que la asamblea no devenga salarios",
    TEXTOS.art20bis.includes("El trabajador no devengará salarios durante el tiempo de la misma"),
  );
}

// ── 8. Lo que cambió: art. 54 y la revocación de la personería ─────────────────────────────────
{
  check(
    "el art. 54 vigente legitima a «todo damnificado»",
    TEXTOS.art54Nuevo.startsWith("Todo damnificado"),
  );
  check(
    "…y el de 1988 sólo nombraba a la asociación sindical o al damnificado",
    TEXTOS.art54Viejo.includes("La asociación sindical de trabajadores o el damnificado") &&
      !TEXTOS.art54Viejo.startsWith("Todo damnificado"),
  );
  check(
    "el art. 55 vigente remite al Anexo II de la Ley 25.212",
    TEXTOS.art55Nuevo.includes("Anexo II de la ley 25.212") &&
      !TEXTOS.art55Nuevo.includes("18.694"),
  );
  check(
    "…y habilita revocar la personería o la inscripción gremial",
    TEXTOS.art55Nuevo.includes("podrá revocarle la personería y/o la inscripción gremial"),
  );
  check("la tabla de cambios tiene al menos 5 filas", CAMBIOS.length >= 5);
  check(
    "cada cambio dice qué decía antes, qué dice ahora y qué cambia",
    CAMBIOS.every((c) => c.antes.length > 15 && c.ahora.length > 20 && c.plata.length > 20),
  );
}

// ── 9. Fuentes y fechas ────────────────────────────────────────────────────────────────────────
{
  check(
    "la reforma se publicó el 6 de marzo de 2026",
    REFORMA_PUBLICADA === "6 de marzo de 2026" && REFORMA_PUBLICADA_ISO === "2026-03-06",
  );
  check(
    "todas las fuentes son oficiales",
    PD_FUENTES.lista.every((f) =>
      /^https:\/\/(www\.)?(servicios\.infoleg|infoleg|boletinoficial|argentina)\.gob\.ar\//.test(
        f.url,
      ),
    ),
    PD_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citado el texto actualizado de la Ley 23.551",
    PD_FUENTES.lista.some((f) => f.url.includes("20993") && f.url.endsWith("texact.htm")),
  );
  check(
    "está citado el texto actualizado de la Ley 25.212 (Anexo II)",
    PD_FUENTES.lista.some((f) => f.url.includes("61876") && f.url.endsWith("texact.htm")),
  );
  check("hay fecha de consulta visible", PD_FUENTES.consultadoEl.includes("2026"));
}

if (fallas > 0) {
  console.error(`\n${fallas} check(s) fallaron.`);
  process.exit(1);
}
console.log(
  "\nTodos los checks de prácticas desleales OK (Ley 23.551 arts. 20 bis/ter, 53 bis, 54 y 55 · Ley 25.212 Anexo II art. 5º).",
);
