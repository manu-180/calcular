// Verificación del beneficio por contratar a una persona con discapacidad.
// Correr con: npx tsx scripts/check_contratacion_discapacidad.ts
//
// LOS CUATRO CHECKS QUE IMPORTAN:
//
//   1. **Los números que la página afirma contra lo que "se sabe".** El 50% y los 3 años son la
//      única razón por la que esta página existe: si alguien los "corrige" al 100% o a 1 año
//      (el texto viejo del art. 87, que sigue circulando por toda la web), la página pasa a decir
//      lo que dice todo el mundo y encima mal.
//   2. **Las alícuotas son las de la LEY 27.541, no las del texto ordenado del Decreto 814/2001.**
//      Ese decreto sigue exhibiendo 19,50% porque la ley no lo sustituyó. Un 19,50% acá sería la
//      mina «no falla, miente» consumada, así que el check la prohíbe explícitamente.
//   3. **El ahorro nunca puede superar la contribución alcanzada.** Es el modo en que este cálculo
//      se rompería en la cara de un empleador: sumando al beneficio la obra social, la ART o el
//      seguro de vida, que el art. 87 no nombra. Se verifica que el ahorro sea exactamente la mitad
//      de la contribución del art. 19 y que la obra social viaje SIEMPRE por separado.
//   4. **Los textos verbatim siguen siendo verbatim.** Son citas de normas: si alguien los redondea
//      o los "mejora", la página deja de poder probar lo que afirma.

import {
  ALICUOTAS_ART19,
  DEDUCCION_GANANCIAS,
  DETRACCION_MENSUAL,
  DETRACCION_SAC,
  DISCAPACIDAD_FUENTES,
  DISCAPACIDAD_TEXTOS,
  EXENCION_ANIOS,
  EXENCION_PORCENTAJE,
  FUERA_DEL_BENEFICIO,
  OBRA_SOCIAL_EMPLEADOR,
  REQUISITOS,
} from "../src/data/contratacion-discapacidad";
import { alicuotaDe, baseImponible, calcular } from "../src/lib/contratacion-discapacidad";

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
// 1 · Los números que la página afirma contra el texto viejo
// ===========================================================================
check(
  "la exención es del 50% (art. 87 Ley 24.013, texto art. 17 Ley 27.793)",
  EXENCION_PORCENTAJE === 0.5,
  EXENCION_PORCENTAJE,
);
check("el plazo son TRES años, no uno", EXENCION_ANIOS === 3, EXENCION_ANIOS);
check(
  "la deducción de Ganancias del art. 23 de la Ley 22.431 es del 70%",
  DEDUCCION_GANANCIAS === 0.7,
  DEDUCCION_GANANCIAS,
);

// ===========================================================================
// 2 · Las alícuotas salen de la Ley 27.541, no del texto ordenado del decreto
// ===========================================================================
check(
  "las alícuotas del art. 19 son 20,40% y 18%",
  ALICUOTAS_ART19.map((a) => a.alicuota).join("|") === "0.204|0.18",
  ALICUOTAS_ART19.map((a) => a.alicuota),
);
check(
  "NINGUNA alícuota es 19,50% (ése es el texto ordenado del Dec. 814/2001, ya desplazado)",
  // El `as number` es necesario, no decorativo: el tipo literal del array hace que TS considere
  // imposible la comparación y falle el build. La comparación en runtime es justamente el check.
  ALICUOTAS_ART19.every((a) => (a.alicuota as number) !== 0.195),
);
check(
  "la detracción del art. 22 es el importe fijo de $7.003,68",
  DETRACCION_MENSUAL === 7003.68,
  DETRACCION_MENSUAL,
);
check("la detracción del SAC es la mitad de la mensual", DETRACCION_SAC === 0.5, DETRACCION_SAC);
check(
  "la contribución de obra social del empleador es el 6% (art. 16 inc. a Ley 23.660)",
  OBRA_SOCIAL_EMPLEADOR === 0.06,
  OBRA_SOCIAL_EMPLEADOR,
);

// ===========================================================================
// 3 · El motor: el ahorro es exactamente la mitad de la contribución alcanzada
// ===========================================================================
const BRUTOS = [0, 7003.68, 500_000, 1_200_000, 5_000_000];

for (const bruto of BRUTOS) {
  for (const { id, alicuota } of ALICUOTAS_ART19) {
    const r = calcular({ bruto, tipo: id });
    check(
      `base = bruto − detracción, con piso en cero (bruto ${bruto}, alícuota ${id})`,
      casi(r.baseMensual, Math.max(0, bruto - DETRACCION_MENSUAL)),
      r.baseMensual,
    );
    check(
      `contribución = base × alícuota (bruto ${bruto}, alícuota ${id})`,
      casi(r.contribucionMensual, r.baseMensual * alicuota),
      { calc: r.contribucionMensual, esperado: r.baseMensual * alicuota },
    );
    check(
      `el ahorro es la MITAD de la contribución, nunca más (bruto ${bruto}, alícuota ${id})`,
      casi(r.ahorroMensual, r.contribucionMensual / 2) &&
        r.ahorroMensual <= r.contribucionMensual,
      { ahorro: r.ahorroMensual, contribucion: r.contribucionMensual },
    );
    check(
      `lo que se paga + lo que se ahorra = la contribución entera (bruto ${bruto}, alícuota ${id})`,
      casi(r.contribucionConBeneficio + r.ahorroMensual, r.contribucionMensual),
      r,
    );
    check(
      `la obra social NO entra en el ahorro (bruto ${bruto}, alícuota ${id})`,
      casi(r.obraSocialMensual, bruto * OBRA_SOCIAL_EMPLEADOR),
      r.obraSocialMensual,
    );
    check(
      `el ahorro total son ${EXENCION_ANIOS} años del anual (bruto ${bruto}, alícuota ${id})`,
      casi(r.ahorroTotal, r.ahorroAnual * EXENCION_ANIOS, 0.05),
      { total: r.ahorroTotal, anual: r.ahorroAnual },
    );
  }
}

// El aguinaldo suma: el año NO puede ser 12 ahorros mensuales pelados cuando hay base de SAC.
{
  const r = calcular({ bruto: 1_200_000, tipo: "b" });
  check(
    "el año incluye el aguinaldo: es más que 12 meses",
    r.ahorroAnual > r.ahorroMensual * 12,
    { anual: r.ahorroAnual, doceMeses: r.ahorroMensual * 12 },
  );
  // Con media detracción sobre media remuneración, el SAC del año equivale a un ahorro mensual
  // completo: es el ancla aritmética del art. 22 in fine.
  check(
    "el SAC anual equivale a un ahorro mensual (media remuneración con media detracción, ×2)",
    casi(r.ahorroAnual, r.ahorroMensual * 13, 0.05),
    { anual: r.ahorroAnual, treceMeses: r.ahorroMensual * 13 },
  );
}

// Un bruto por debajo de la detracción no puede dar contribución ni ahorro negativos.
{
  const r = calcular({ bruto: 5_000, tipo: "a" });
  check("bruto menor que la detracción → base 0, ahorro 0", r.baseMensual === 0 && r.ahorroMensual === 0, r);
}

check("baseImponible nunca es negativa", baseImponible(1) === 0, baseImponible(1));
check("alicuotaDe cae al 18% ante un id desconocido", alicuotaDe("z" as never) === 0.18);

// ===========================================================================
// 4 · Los textos verbatim y las fuentes
// ===========================================================================
check(
  "el art. 87 vigente dice «cincuenta por ciento» y «tres (3) años»",
  DISCAPACIDAD_TEXTOS.art87Vigente.includes("cincuenta por ciento (50%)") &&
    DISCAPACIDAD_TEXTOS.art87Vigente.includes("tres (3) años"),
);
check(
  "el art. 87 vigente nombra los CUATRO destinos alcanzados",
  ["INSSJP", "Asignaciones y Subsidios Familiares", "Fondo Nacional de Empleo", "jubilaciones"].every(
    (t) => DISCAPACIDAD_TEXTOS.art87Vigente.includes(t),
  ),
);
check(
  "el texto ANTERIOR sigue guardado y dice «un año» (es la prueba de qué cambió)",
  DISCAPACIDAD_TEXTOS.art87Anterior.includes("un año") &&
    !DISCAPACIDAD_TEXTOS.art87Anterior.includes("cincuenta por ciento"),
);
check(
  "el art. 19 citado enumera las cuatro leyes de destino",
  ["19.032", "24.013", "24.241", "24.714"].every((l) =>
    DISCAPACIDAD_TEXTOS.art19Destino.includes(l),
  ),
);
check(
  "la cita del art. 22 trae el importe textual",
  DISCAPACIDAD_TEXTOS.art22Detraccion.includes("siete mil tres con sesenta y ocho centavos"),
);
check(
  "la cita del art. 23 de la Ley 22.431 trae el 70% textual",
  DISCAPACIDAD_TEXTOS.art23Ganancias.includes("SETENTA POR CIENTO (70%)"),
);
check(
  "queda registrado que la reglamentación del art. 17 es «Sin reglamentar»",
  DISCAPACIDAD_TEXTOS.sinReglamentar.includes("Sin reglamentar"),
);
check(
  "queda registrada la suspensión del Decreto 681/2025 y la sentencia que la invalidó",
  DISCAPACIDAD_TEXTOS.suspension.includes("suspendida en su ejecución") &&
    DISCAPACIDAD_TEXTOS.sentencia.includes("declaró la invalidez del artículo 2° del Decreto N° 681/25"),
);
check(
  "el requisito del contrato por tiempo indeterminado está escrito",
  REQUISITOS.some((r) => r.includes("TIEMPO INDETERMINADO")),
);
check(
  "la lista de lo NO alcanzado incluye obra social, ART y seguro de vida",
  ["obra social", "ART", "seguro colectivo de vida"].every((t) =>
    FUERA_DEL_BENEFICIO.some((f) =>
      `${f.que} ${f.detalle}`.toLowerCase().includes(t.toLowerCase()),
    ),
  ),
);
check(
  "hay al menos 6 fuentes oficiales con URL de InfoLEG y fecha de consulta",
  DISCAPACIDAD_FUENTES.lista.length >= 6 &&
    DISCAPACIDAD_FUENTES.lista.every((f) => f.url.startsWith("https://servicios.infoleg.gob.ar/")) &&
    /^\d{4}-\d{2}-\d{2}$/.test(DISCAPACIDAD_FUENTES.consultadoEl),
);

console.log(fallas === 0 ? "\n✅ contratación discapacidad OK" : `\n❌ ${fallas} falla(s)`);
process.exit(fallas === 0 ? 0 : 1);
