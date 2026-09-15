// Verificación de las multas por deberes formales de la Ley 11.683
// (src/data/multas-arca.ts + src/lib/multas-arca.ts).
// Correr con: npx tsx scripts/check_multas_arca.ts
//
// LOS CINCO CHECKS QUE IMPORTAN:
//
//   1. **El monto anterior no puede desaparecer.** Toda la tesis de la página es el contraste
//      entre lo que dice la ley hoy y lo que sigue publicando la web. Si alguien borra un
//      `anterior` para "limpiar" el data, la página pierde exactamente lo que la diferencia.
//   2. **El multiplicador se DERIVA, nunca se escribe.** Se ancla que los factores reales no son
//      todos mil: el art. 38 es 1.100, el techo del art. 39 ≈ 778, el piso del art. 40 es 2.000 y
//      el empleo no registrado ≈ 67. Si alguien "normaliza" los montos a ×1000, esto sale rojo.
//   3. **La reducción del art. 50 va al MÍNIMO legal, no a la mitad del máximo.** Es la confusión
//      más cara posible en esta página: con el techo agravado de $35.000.000, aplicar un factor en
//      vez del mínimo le diría a alguien que su mejor escenario es 17 veces peor de lo que es.
//   4. **El piso de la clausura es «exceda», no «alcance».** Una operación de exactamente $20.000
//      NO habilita la clausura. Un `>=` en vez de un `>` publica una clausura que la ley no manda.
//   5. **Los verbatim tienen que seguir siendo verbatim.** Es YMYL y cita normas: se anclan las
//      frases exactas que sostienen cada conclusión — «sin necesidad de requerimiento previo»,
//      «de pleno derecho a la mitad», «son acumulables», «exceda de pesos veinte mil» y «al mínimo
//      legal».

import {
  CLAUSURA,
  INFRACCIONES,
  MULTAS_FUENTES,
  MULTAS_TEXTOS,
  UMBRAL_GRANDES_CONTRIBUYENTES,
  VIGENCIA_MULTAS,
} from "../src/data/multas-arca";
import {
  calcularMulta,
  diasClausura,
  habilitaClausura,
  infraccionPorId,
  rangoMultiplicadores,
} from "../src/lib/multas-arca";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

// ── 1 · estructura del data ──────────────────────────────────────────────────
check("hay al menos 6 infracciones cargadas", INFRACCIONES.length >= 6, INFRACCIONES.length);

for (const inf of INFRACCIONES) {
  check(
    `${inf.id}: tiene monto fijo o rango, nunca los dos ni ninguno`,
    Boolean(inf.fijo) !== Boolean(inf.rango),
  );
  check(
    `${inf.id}: conserva el importe anterior a la reforma`,
    inf.fijo
      ? typeof inf.anterior.persona === "number" && typeof inf.anterior.sociedad === "number"
      : typeof inf.anterior.minimo === "number" && typeof inf.anterior.maximo === "number",
    inf.anterior,
  );
  check(
    `${inf.id}: el importe vigente es mayor que el anterior`,
    inf.fijo
      ? inf.fijo.persona > inf.anterior.persona! && inf.fijo.sociedad > inf.anterior.sociedad!
      : inf.rango!.minimo > inf.anterior.minimo! && inf.rango!.maximo > inf.anterior.maximo!,
  );
  check(`${inf.id}: cita el artículo de la Ley 27.799 que lo sustituyó`, /27\.799/.test(inf.sustituidoPor));
  if (inf.rango) {
    check(`${inf.id}: el mínimo no supera al máximo`, inf.rango.minimo <= inf.rango.maximo);
  }
  if (inf.fijo) {
    check(
      `${inf.id}: la multa de sociedad no es menor que la de persona humana`,
      inf.fijo.sociedad >= inf.fijo.persona,
    );
  }
}

// ── 2 · la actualización NO fue uniforme ─────────────────────────────────────
const ddjj = infraccionPorId("ddjj-omitida");
check("art. 38: $200 → $220.000", ddjj.fijo!.persona === 220_000 && ddjj.anterior.persona === 200);
check(
  "art. 38: el factor real es 1.100, no 1.000",
  Math.round(ddjj.fijo!.persona / ddjj.anterior.persona!) === 1_100,
);

const agravado = infraccionPorId("deber-formal-agravado");
check(
  "art. 39 agravado: el techo se multiplicó por ~778, no por 1.000",
  Math.round(agravado.rango!.maximo / agravado.anterior.maximo!) === 778,
  agravado.rango!.maximo / agravado.anterior.maximo!,
);

const noReg = infraccionPorId("empleo-no-registrado");
check(
  "empleo no registrado: el mínimo se multiplicó por ~67, no por 1.000",
  Math.round(noReg.rango!.minimo / noReg.anterior.minimo!) === 67,
);

check(
  "clausura: el piso de valor se multiplicó por 2.000",
  CLAUSURA.pisoValorOperacion / CLAUSURA.pisoAnterior === 2_000,
);

const factores = rangoMultiplicadores();
check(
  "el rango de multiplicadores abarca los extremos reales (≈67 a 2.000)",
  factores.minimo <= 70 && factores.maximo === 2_000,
  factores,
);

// ── 3 · las reducciones ──────────────────────────────────────────────────────
const conReduccion = calcularMulta({
  infraccionId: "ddjj-omitida",
  sujeto: "persona",
  aplicaReduccion: true,
});
check("art. 38: la reducción deja exactamente la mitad", conReduccion.montoReducido === 110_000);
check("art. 38: el ahorro declarado es la otra mitad", conReduccion.ahorro === 110_000);

const sinReduccion = calcularMulta({
  infraccionId: "ddjj-omitida",
  sujeto: "sociedad",
  aplicaReduccion: false,
});
check("art. 38 sociedad sin reducción: $440.000", sinReduccion.montoReducido === 440_000);
check("sin reducción no se declara ahorro", sinReduccion.ahorro === 0);

const art50 = calcularMulta({
  infraccionId: "deber-formal-agravado",
  sujeto: "persona",
  aplicaReduccion: true,
});
check(
  "art. 50: la reducción lleva al MÍNIMO legal, no a una fracción del máximo",
  art50.rangoReducido!.minimo === agravado.rango!.minimo &&
    art50.rangoReducido!.maximo === agravado.rango!.minimo,
  art50.rangoReducido,
);
check(
  "art. 50: el ahorro es todo el tramo entre mínimo y máximo",
  art50.ahorro === agravado.rango!.maximo - agravado.rango!.minimo,
);

const sinSalida = calcularMulta({
  infraccionId: "ddjj-informativa",
  sujeto: "persona",
  aplicaReduccion: true,
});
check(
  "una infracción sin reducción prevista no inventa una",
  sinSalida.reduccion === null && sinSalida.montoReducido === sinSalida.monto,
);

// ── 4 · la clausura ──────────────────────────────────────────────────────────
check("clausura: $19.999 NO habilita", habilitaClausura(19_999) === false);
check(
  "clausura: exactamente el piso NO habilita (la ley dice «exceda»)",
  habilitaClausura(CLAUSURA.pisoValorOperacion) === false,
);
check("clausura: $20.001 sí habilita", habilitaClausura(20_001) === true);
check(
  "clausura: sin reincidencia son 2 a 6 días",
  diasClausura(false).minimo === 2 && diasClausura(false).maximo === 6,
);
check(
  "clausura: con otra infracción dentro de 2 años se duplican mínimo y máximo",
  diasClausura(true).minimo === 4 && diasClausura(true).maximo === 12,
);
check("clausura: las 7 conductas del art. 40 están cargadas", CLAUSURA.conductas.length === 7);

// ── 5 · verbatim ─────────────────────────────────────────────────────────────
const verbatim: [string, string][] = [
  ["art38Primero · «sin necesidad de requerimiento previo»", "sin necesidad de requerimiento previo"],
  ["art38Primero · el monto de persona humana", "pesos doscientos veinte mil ($220.000)"],
  ["art38Primero · el monto de sociedad", "pesos cuatrocientos cuarenta mil ($440.000)"],
];
for (const [nombre, frase] of verbatim) {
  check(nombre, MULTAS_TEXTOS.art38Primero.includes(frase));
}
check(
  "art38Reduccion · «de pleno derecho a la mitad»",
  MULTAS_TEXTOS.art38Reduccion.includes("se reducirán de pleno derecho a la mitad"),
);
check(
  "art38Reduccion · la segunda ventana (desde el vencimiento general)",
  MULTAS_TEXTOS.art38Reduccion.includes("desde el vencimiento general de la obligación"),
);
check(
  "art38Reduccion · no cuenta como antecedente",
  MULTAS_TEXTOS.art38Reduccion.includes("no se considerará como un antecedente en su contra"),
);
check(
  "art39Primero · los dos importes del rango",
  MULTAS_TEXTOS.art39Primero.includes("pesos ciento cincuenta mil ($150.000)") &&
    MULTAS_TEXTOS.art39Primero.includes("pesos dos millones quinientos mil ($2.500.000)"),
);
check(
  "art39Acumulable · «son acumulables con las establecidas en el artículo 38»",
  MULTAS_TEXTOS.art39Acumulable.includes("acumulables con las establecidas en el artículo 38"),
);
check(
  "art40Acapite · «exceda de pesos veinte mil ($20.000)»",
  MULTAS_TEXTOS.art40Acapite.includes("exceda de pesos veinte mil ($20.000)"),
);
check(
  "art40Acapite · la clausura es de dos a seis días",
  MULTAS_TEXTOS.art40Acapite.includes("clausura de dos (2) a seis (6) días"),
);
check(
  "art40NoRegistrado · el rango vigente",
  MULTAS_TEXTOS.art40NoRegistrado.includes("pesos doscientos mil ($200.000)") &&
    MULTAS_TEXTOS.art40NoRegistrado.includes("pesos siete millones quinientos mil ($7.500.000)"),
);
check(
  "art40Reincidencia · «se duplicarán» dentro de DOS (2) años",
  MULTAS_TEXTOS.art40Reincidencia.includes("se duplicarán") &&
    MULTAS_TEXTOS.art40Reincidencia.includes("DOS (2) años"),
);
check(
  "art50 · «se reducirán, por única vez, al mínimo legal»",
  MULTAS_TEXTOS.art50.includes("se reducirán, por única vez, al mínimo legal"),
);
check(
  "art49Primero · «quedará exento de responsabilidad infraccional»",
  MULTAS_TEXTOS.art49Primero.includes("quedará exento de responsabilidad infraccional"),
);
check(
  "art49Primero · NO nombra artículos (el límite honesto que publica la página)",
  !/art[ií]culos? 4[568]/i.test(MULTAS_TEXTOS.art49Primero),
);

// ── 6 · vigencia y fuentes ───────────────────────────────────────────────────
check("la reforma citada es la Ley 27.799", VIGENCIA_MULTAS.reforma === "Ley 27.799");
check("la fecha de B.O. de la reforma está escrita", /2 de enero de 2026/.test(VIGENCIA_MULTAS.reformaBO));
check("hay al menos 5 fuentes con URL", MULTAS_FUENTES.lista.length >= 5);
check(
  "todas las fuentes apuntan a infoleg.gob.ar",
  MULTAS_FUENTES.lista.every((f) => f.url.includes("infoleg.gob.ar")),
);
check(
  "la fecha de consulta es visible y coincide con la vigencia",
  MULTAS_FUENTES.consultadoEl === VIGENCIA_MULTAS.consultadoEl,
);
check(
  "el umbral de grandes contribuyentes subió mil veces",
  UMBRAL_GRANDES_CONTRIBUYENTES.ingresosBrutosAnuales /
    UMBRAL_GRANDES_CONTRIBUYENTES.anterior ===
    1_000,
);

console.log(fallas === 0 ? "\n✅ multas-arca OK" : `\n❌ ${fallas} falla(s)`);
process.exit(fallas === 0 ? 0 : 1);
