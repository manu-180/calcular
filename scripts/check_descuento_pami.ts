// Verificación del descuento de obra social sobre el haber jubilatorio
// (src/data/descuento-pami.ts + src/lib/descuento-pami.ts).
// Correr con: npx tsx scripts/check_descuento_pami.ts
//
// LOS CUATRO CHECKS QUE IMPORTAN:
//
//   1. **La escala es progresiva, no un salto.** La forma más fácil de que esta página le mienta a
//      un jubilado es aplicar el 6% sobre todo el haber al superar el mínimo. Se ancla que la
//      alícuota efectiva del inciso a) queda SIEMPRE dentro de [3%, 6%), que crece de forma
//      monótona y que en el haber mínimo exacto vale 3% clavado.
//   2. **El punto de corte es el haber mínimo VIVO, no un número escrito.** Si alguien copia un
//      monto a mano en el data, el aporte deja de moverse con la resolución mensual de ANSES y la
//      página envejece en silencio. Se ancla contra PRESTACIONES_VIGENTES.
//   3. **Las PNC no tienen alícuota, y eso no puede degradarse a cero silencioso.** El régimen
//      tiene `tramos: null` a propósito: la página afirma que ninguna norma fija un porcentaje.
//      Si alguien le pone 0 como número, la afirmación pasa a ser «aportan 0%», que es otra cosa.
//   4. **Los textos verbatim tienen que seguir siendo verbatim.** Es YMYL y cita normas: se anclan
//      las frases exactas que sostienen cada conclusión de la página — sobre todo «incluido el
//      haber complementario» (el aguinaldo aporta) y «sobre lo que excede dicho monto» (el 6% es
//      sólo del excedente).

import {
  ALICUOTA_EXCEDENTE,
  ALICUOTA_HASTA_MINIMO,
  HABER_MINIMO_VIGENTE,
  MESES_VIGENCIA_OPCION,
  OPCIONES_POR_ANIO,
  PAMI_FUENTES,
  PAMI_TEXTOS,
  REGIMENES,
} from "../src/data/descuento-pami";
import { BONO_VIGENTE, PRESTACIONES_VIGENTES } from "../src/data/prestaciones";
import {
  aporteSobre,
  calcularDescuentoPami,
  escalaEfectiva,
  RANGO_EFECTIVO,
  regimenPorId,
} from "../src/lib/descuento-pami";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const casi = (a: number, b: number, tol = 0.02) => Math.abs(a - b) <= tol;

// ===========================================================================
// 1 · Las constantes salen del texto de la ley
// ===========================================================================
check("la alícuota del primer tramo es 3%", ALICUOTA_HASTA_MINIMO === 0.03, ALICUOTA_HASTA_MINIMO);
check("la alícuota del excedente es 6%", ALICUOTA_EXCEDENTE === 0.06, ALICUOTA_EXCEDENTE);
check(
  "el inc. a) dice «tres por ciento (3%) hasta el importe del haber mínimo»",
  PAMI_TEXTOS.ley19032Art8IncA.includes("tres por ciento (3%) hasta el importe del haber mínimo"),
);
check(
  "el inc. a) dice «seis por ciento (6%) sobre lo que excede dicho monto» — el 6% es sólo del excedente",
  PAMI_TEXTOS.ley19032Art8IncA.includes("seis por ciento (6%) sobre lo que excede dicho monto"),
);
check(
  "los dos incisos dicen «incluido el haber complementario» — el aguinaldo aporta",
  PAMI_TEXTOS.ley19032Art8IncA.includes("incluido el haber complementario") &&
    PAMI_TEXTOS.ley19032Art8IncB.includes("incluido el haber complementario"),
);
check(
  "el inc. b) no tiene escalón: 6% y ninguna mención al haber mínimo",
  PAMI_TEXTOS.ley19032Art8IncB.includes("seis por ciento (6%)") &&
    !PAMI_TEXTOS.ley19032Art8IncB.includes("haber mínimo"),
);
check(
  "el art. 9 dice que ANSeS deduce y transfiere «en forma directa y automática»",
  PAMI_TEXTOS.ley19032Art9.includes("deducidos por la Administración Nacional de la Seguridad Social") &&
    PAMI_TEXTOS.ley19032Art9.includes("en forma directa y automática"),
);
check(
  "el art. 20 de la 23.660 manda deducir del haber, incluidas las no contributivas",
  PAMI_TEXTOS.ley23660Art20.includes("serán deducidos de los haberes jubilatorios") &&
    PAMI_TEXTOS.ley23660Art20.includes("prestaciones no contributivas"),
);
check(
  "el art. 16 inc. c) REMITE el monto a otras normas (por eso el número no está en la 23.660)",
  PAMI_TEXTOS.ley23660Art16IncC.includes("determinados por leyes, decretos"),
);
check(
  "el art. 13 del Dec. 292/95 dice que la cápita sale de los recursos del INSSJP",
  PAMI_TEXTOS.decreto292Art13.includes("una cápita por cada beneficiario") &&
    PAMI_TEXTOS.decreto292Art13.includes("INSTITUTO NACIONAL DE SERVICIOS SOCIALES"),
);
check(
  `el art. 12 del Dec. 292/95 dice «una vez por año» y «primer día del ${MESES_VIGENCIA_OPCION}er mes posterior»`,
  PAMI_TEXTOS.decreto292Art12.includes("una vez por año") &&
    PAMI_TEXTOS.decreto292Art12.includes("primer día del tercer mes posterior") &&
    MESES_VIGENCIA_OPCION === 3 &&
    OPCIONES_POR_ANIO === 1,
);
check(
  "el art. 19 del Dec. 292/95 pone la cobertura de las PNC a cargo del Estado, salvo la Ley 23.848",
  PAMI_TEXTOS.decreto292Art19.includes("SECRETARIA DE DESARROLLO SOCIAL") &&
    PAMI_TEXTOS.decreto292Art19.includes("Ley Nº 23.848"),
);

// ===========================================================================
// 2 · El punto de corte es el haber mínimo VIVO
// ===========================================================================
check(
  "el punto de corte es el haber mínimo de PRESTACIONES_VIGENTES (no un número copiado)",
  HABER_MINIMO_VIGENTE === PRESTACIONES_VIGENTES.haberMinimo,
  { HABER_MINIMO_VIGENTE, vigente: PRESTACIONES_VIGENTES.haberMinimo },
);
check(
  "la fuente del haber mínimo apunta a la resolución vigente de ANSES",
  PAMI_FUENTES.lista.some((f) => f.url === PRESTACIONES_VIGENTES.resolucionUrl),
);

// ===========================================================================
// 3 · La escala es progresiva y no puede salirse del rango
// ===========================================================================
const M = HABER_MINIMO_VIGENTE;

check(
  "con el haber mínimo exacto, el aporte del inc. a) es el 3% clavado",
  casi(aporteSobre(M, "dependencia").total, M * 0.03),
  aporteSobre(M, "dependencia"),
);
check(
  "por debajo del mínimo no aparece nunca el tramo del 6%",
  aporteSobre(M * 0.5, "dependencia").tramoAlto === 0,
);
check(
  "con el doble del mínimo el aporte es 3%·M + 6%·M (no 6% de todo)",
  casi(aporteSobre(M * 2, "dependencia").total, M * 0.03 + M * 0.06),
  { calculado: aporteSobre(M * 2, "dependencia").total, seisDeTodo: M * 2 * 0.06 },
);

const escala = escalaEfectiva("dependencia");
check(
  "la alícuota efectiva crece de forma monótona con el haber",
  escala.every((f, i) => i === 0 || f.alicuotaEfectiva > escala[i - 1].alicuotaEfectiva),
  escala.map((f) => f.alicuotaEfectiva),
);
check(
  `la alícuota efectiva queda siempre en [${RANGO_EFECTIVO.piso}%, ${RANGO_EFECTIVO.techo}%)`,
  escala.every(
    (f) => f.alicuotaEfectiva >= RANGO_EFECTIVO.piso && f.alicuotaEfectiva < RANGO_EFECTIVO.techo,
  ),
  escala.map((f) => f.alicuotaEfectiva),
);
check(
  "ni con un haber altísimo la efectiva llega al 6%",
  aporteSobre(M * 1000, "dependencia").total / (M * 1000) < 0.06,
);
check(
  "el inc. b) sí es 6% liso desde el primer peso",
  casi(aporteSobre(M * 0.5, "autonomos").total, M * 0.5 * 0.06) &&
    casi(aporteSobre(M * 3, "autonomos").total, M * 3 * 0.06),
);
check(
  "a igual haber, el autónomo aporta más que el dependiente",
  aporteSobre(M * 2, "autonomos").total > aporteSobre(M * 2, "dependencia").total,
);

// ===========================================================================
// 4 · Las PNC no tienen alícuota (y eso no es «cero por ciento»)
// ===========================================================================
const pnc = regimenPorId("pnc");
check("el régimen de PNC tiene tramos = null, no un 0 numérico", pnc.tramos === null, pnc.tramos);
{
  const r = calcularDescuentoPami({ haber: M * 2, regimenId: "pnc" });
  check(
    "la PNC no descuenta nada y el aviso explica que ninguna norma fija alícuota",
    r.aporte === 0 &&
      r.avisos.some((a) => a.texto.includes("no se inventa")) &&
      r.avisos.some((a) => a.texto.includes("Decreto 292/95")),
    r.avisos.map((a) => a.texto),
  );
}

// ===========================================================================
// 5 · Lo que NO entra en la base, y lo que sí
// ===========================================================================
{
  const conBono = calcularDescuentoPami({ haber: M * 2, bono: BONO_VIGENTE.monto });
  const sinBono = calcularDescuentoPami({ haber: M * 2 });
  check(
    "el bono no cambia el aporte (es no remunerativo) pero sí el neto",
    conBono.aporte === sinBono.aporte && casi(conBono.neto - sinBono.neto, BONO_VIGENTE.monto),
    { conBono: conBono.aporte, sinBono: sinBono.aporte, deltaNeto: conBono.neto - sinBono.neto },
  );

  const conAgui = calcularDescuentoPami({ haber: M * 2, conAguinaldo: true });
  check(
    "el aguinaldo aporta aparte, sobre medio haber y con la misma escala",
    casi(conAgui.aporteAguinaldo, aporteSobre(M, "dependencia").total),
    { aguinaldo: conAgui.aporteAguinaldo },
  );
  check(
    "el aguinaldo no se mezcla con el aporte del mes",
    conAgui.aporte === sinBono.aporte,
  );
}

// ===========================================================================
// 6 · El resultado no puede mentirle a nadie sobre su bolsillo
// ===========================================================================
{
  const r = calcularDescuentoPami({ haber: M * 3 });
  check("el neto es el haber menos el aporte", casi(r.neto, r.haber - r.aporte), r);
  check("el aporte nunca supera al haber", r.aporte < r.haber);
  check(
    "sin haber cargado se asume el mínimo y se avisa",
    calcularDescuentoPami().haber === M &&
      calcularDescuentoPami().avisos.some((a) => a.texto.includes("haber mínimo garantizado")),
  );
  check(
    "un haber negativo o cero no produce un aporte negativo",
    calcularDescuentoPami({ haber: -5000 }).aporte >= 0 &&
      aporteSobre(-1, "dependencia").total === 0,
  );
  check(
    "todo régimen que aporta avisa que cambiar de obra social no baja el descuento",
    REGIMENES.filter((x) => x.tramos !== null).every((x) =>
      calcularDescuentoPami({ haber: M * 2, regimenId: x.id }).avisos.some((a) =>
        a.texto.includes("cápita"),
      ),
    ),
  );
}

console.log(fallas === 0 ? "\n✅ descuento-pami OK" : `\n❌ ${fallas} falla(s)`);
process.exit(fallas === 0 ? 0 : 1);
