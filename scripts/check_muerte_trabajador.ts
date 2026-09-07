// Verificación del art. 248 LCT (muerte del trabajador), texto de la Ley 27.802.
//
// Las tres formas de equivocarse caro en esta página, y por eso están todas testeadas:
//   1. pagar el 100% del art. 245 en vez de la MITAD (el 248 remite al 247, y el 247 dice
//      "la mitad de la prevista en el artículo 245"). Duplicar el número es el peor error;
//   2. repartir por parentesco en vez de en partes iguales (el texto dice "considerando cada
//      titular del crédito como uno (1)");
//   3. hacer concurrir a los hijos MAYORES sin CUD con el cónyuge — el artículo los llama sólo
//      "en caso de ausencia" de los supuestos anteriores. Ese error le saca plata a alguien.
//
// Además se ancla la base contra el motor del art. 245 que ya usa /indemnizacion: si alguien
// toca uno de los dos, este check avisa antes de que el sitio publique dos números distintos
// para el mismo caso.
//
// Correr con: npx tsx scripts/check_muerte_trabajador.ts  (o vía scripts/check-all.ts)

import {
  ARTICULO_SUSTITUTIVO,
  DIAS_LIBERACION_EMPLEADOR,
  MUERTE_FUENTES,
  MUERTE_TEXTOS,
  PROPORCION_ART_247,
  VIGENCIA_REFORMA_ISO,
} from "../src/data/muerte-trabajador";
import { calcularIndemnizacion } from "../src/lib/indemnizacion";
import { calcularMuerteTrabajador, repartirBeneficiarios } from "../src/lib/muerte-trabajador";

let fallas = 0;

function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const aprox = (a: number, b: number, tol = 0.01) => Math.abs(a - b) < tol;

const SIN_FAMILIA = {
  conyugeOConviviente: false,
  hijosMenores: 0,
  hijosMayoresConCUD: 0,
  hijosMayores: 0,
  padresACargo: 0,
};

// ── 1. El monto: la MITAD del art. 245, no el 245 entero ─────────────────────────────
{
  const ingreso = "2016-03-01";
  const muerte = "2026-08-16";
  const sueldo = 1_200_000;

  const m = calcularMuerteTrabajador({
    ingresoISO: ingreso,
    fallecimientoISO: muerte,
    mejorRemuneracion: sueldo,
    familia: { ...SIN_FAMILIA, conyugeOConviviente: true },
  })!;
  const despido = calcularIndemnizacion({
    ingresoISO: ingreso,
    despidoISO: muerte,
    mejorRemuneracion: sueldo,
    preavisoOtorgado: false,
  })!;

  check("PROPORCION_ART_247 es la mitad", PROPORCION_ART_247 === 0.5);
  check(
    "el art. 245 de referencia coincide con el motor de /indemnizacion (sin drift)",
    aprox(m.indemnizacionArt245, despido.indemnizacionAntiguedad),
    { muerte: m.indemnizacionArt245, despido: despido.indemnizacionAntiguedad },
  );
  check(
    "la indemnización del 248 es exactamente el 50% del 245",
    aprox(m.indemnizacionArt248, m.indemnizacionArt245 / 2),
    m.indemnizacionArt248,
  );
  check(
    "10 años y 5 meses → 11 años computables × sueldo ÷ 2",
    m.aniosComputables === 11 && aprox(m.indemnizacionArt248, (sueldo * 11) / 2),
    { anios: m.aniosComputables, monto: m.indemnizacionArt248 },
  );
  // La muerte no es un despido: no hay preaviso ni integración. Se verifica por diferencia:
  // el total del despido incluye rubros que acá no pueden aparecer.
  check(
    "el total por muerte NO incluye preaviso ni integración",
    m.totalGeneral < despido.totalGeneral && despido.preaviso !== null,
    { muerte: m.totalGeneral, despido: despido.totalGeneral },
  );
  check(
    "la liquidación final (SAC + vacaciones) es la misma que en un despido",
    aprox(m.totalLiquidacionFinal, despido.totalLiquidacionFinal),
    { muerte: m.totalLiquidacionFinal, despido: despido.totalLiquidacionFinal },
  );
  check(
    "total general = indemnización del 248 + liquidación final",
    aprox(m.totalGeneral, m.indemnizacionArt248 + m.totalLiquidacionFinal),
  );
}

// ── 2. Fracción mayor de 3 meses, mínimo de un mes y período de prueba ────────────────
{
  const casos: [string, string, number, string][] = [
    ["2023-01-01", "2026-04-01", 3, "3 meses justos NO suman año"],
    ["2023-01-01", "2026-04-02", 4, "3 meses y un día SÍ suman año"],
    ["2025-06-01", "2026-01-15", 1, "menos de un año → 1 año (mínimo del artículo)"],
  ];
  for (const [ingreso, muerte, aniosEsperados, nombre] of casos) {
    const r = calcularMuerteTrabajador({
      ingresoISO: ingreso,
      fallecimientoISO: muerte,
      mejorRemuneracion: 1_000_000,
      familia: { ...SIN_FAMILIA, conyugeOConviviente: true },
    })!;
    check(nombre, r.aniosComputables === aniosEsperados, r.aniosComputables);
  }

  const prueba = calcularMuerteTrabajador({
    ingresoISO: "2026-05-01",
    fallecimientoISO: "2026-08-16",
    mejorRemuneracion: 1_000_000,
    familia: { ...SIN_FAMILIA, conyugeOConviviente: true },
  })!;
  check("en período de prueba no hay indemnización por antigüedad", prueba.enPeriodoPrueba && prueba.indemnizacionArt248 === 0);
  check("...pero la liquidación final se paga igual", prueba.totalLiquidacionFinal > 0);
}

// ── 3. Tope del convenio con el piso del 67% ─────────────────────────────────────────
{
  const sueldo = 2_000_000;
  const r = calcularMuerteTrabajador({
    ingresoISO: "2020-01-01",
    fallecimientoISO: "2026-08-16",
    mejorRemuneracion: sueldo,
    familia: { ...SIN_FAMILIA, conyugeOConviviente: true },
    topeCCT: 500_000, // tope muy por debajo del 67% → gana el piso
  })!;
  check("el tope del CCT nunca baja del 67% de la remuneración real", r.topeAplicado && aprox(r.baseAplicada, sueldo * 0.67), r.baseAplicada);
  check("con tope, el 248 sigue siendo la mitad del 245", aprox(r.indemnizacionArt248, r.indemnizacionArt245 / 2));
}

// ── 4. Quién cobra: el orden del art. 248 vigente ─────────────────────────────────────
{
  const r1 = repartirBeneficiarios({ ...SIN_FAMILIA, conyugeOConviviente: true, hijosMenores: 2 });
  check("cónyuge + 2 hijos menores = 3 titulares (partes iguales)", r1.titulares === 3 && r1.grupo === "primer-grupo");

  const r2 = repartirBeneficiarios({
    ...SIN_FAMILIA,
    conyugeOConviviente: true,
    hijosMenores: 1,
    hijosMayores: 3,
  });
  check("los hijos MAYORES sin CUD NO concurren con el cónyuge", r2.titulares === 2, r2);
  check("...y se informan como desplazados (transparencia)", r2.desplazados.some((d) => d.cantidad === 3));

  const r3 = repartirBeneficiarios({ ...SIN_FAMILIA, hijosMayores: 3, padresACargo: 2 });
  check("sin primer grupo, entran los hijos mayores", r3.titulares === 3 && r3.grupo === "hijos-mayores");

  const r4 = repartirBeneficiarios({ ...SIN_FAMILIA, padresACargo: 2 });
  check("sin hijos, entran los padres a cargo", r4.titulares === 2 && r4.grupo === "padres-a-cargo");

  const r5 = repartirBeneficiarios({ ...SIN_FAMILIA, hijosMayoresConCUD: 1, hijosMayores: 4 });
  check("un hijo mayor CON CUD desplaza a los mayores sin CUD", r5.titulares === 1 && r5.grupo === "primer-grupo");

  const r6 = repartirBeneficiarios(SIN_FAMILIA);
  check("sin nadie cargado → sin beneficiarios", r6.titulares === 0 && r6.grupo === "sin-beneficiarios");

  // El reparto tiene que agotar el monto: partes iguales, sin migajas perdidas.
  const m = calcularMuerteTrabajador({
    ingresoISO: "2019-01-01",
    fallecimientoISO: "2026-08-16",
    mejorRemuneracion: 1_000_000,
    familia: { ...SIN_FAMILIA, conyugeOConviviente: true, hijosMenores: 2 },
  })!;
  check(
    "cada titular cobra la misma parte y las partes suman el total",
    m.porBeneficiario !== null && aprox(m.porBeneficiario * m.beneficiarios.titulares, m.indemnizacionArt248),
    { porBeneficiario: m.porBeneficiario, titulares: m.beneficiarios.titulares },
  );
  const sinFamilia = calcularMuerteTrabajador({
    ingresoISO: "2019-01-01",
    fallecimientoISO: "2026-08-16",
    mejorRemuneracion: 1_000_000,
    familia: SIN_FAMILIA,
  })!;
  check("sin beneficiarios cargados, el reparto es null (no se divide por cero)", sinFamilia.porBeneficiario === null);
}

// ── 5. Entradas inválidas ────────────────────────────────────────────────────────────
{
  const invalidos = [
    { ingresoISO: "2026-08-16", fallecimientoISO: "2020-01-01", mejorRemuneracion: 1, familia: SIN_FAMILIA },
    { ingresoISO: "2020-01-01", fallecimientoISO: "2026-08-16", mejorRemuneracion: 0, familia: SIN_FAMILIA },
    { ingresoISO: "", fallecimientoISO: "2026-08-16", mejorRemuneracion: 100, familia: SIN_FAMILIA },
  ];
  check("entradas inválidas → null", invalidos.every((p) => calcularMuerteTrabajador(p) === null));
}

// ── 6. Los textos citados son los del artículo vigente ───────────────────────────────
{
  check(
    "la cita del 247 dice 'la mitad de la prevista en el artículo 245'",
    MUERTE_TEXTOS.art247.includes("la mitad de la prevista en el artículo 245"),
  );
  check(
    "la cita del 248 dice que cada titular cuenta como uno",
    MUERTE_TEXTOS.art248Reparto.includes("considerando cada titular del crédito como uno (1)"),
  );
  check(
    "la cita del 248 mantiene la independencia del Sistema de Riesgos del Trabajo",
    MUERTE_TEXTOS.art248Independencia.includes("independiente") &&
      MUERTE_TEXTOS.art248Independencia.includes("Sistema de Riesgos del Trabajo"),
  );
  check(
    `la nota de vigencia apunta al art. ${ARTICULO_SUSTITUTIVO} de la Ley 27.802`,
    MUERTE_TEXTOS.art248Nota.includes(`art. ${ARTICULO_SUSTITUTIVO} de la Ley Nº 27.802`) &&
      MUERTE_TEXTOS.art248Nota.includes("6/3/2026"),
  );
  check(
    "el plazo de liberación del empleador es de 30 días y coincide con la cita",
    DIAS_LIBERACION_EMPLEADOR === 30 && MUERTE_TEXTOS.art248Liberacion.includes("treinta (30) días"),
  );
  check("la vigencia ISO es el 6/3/2026", VIGENCIA_REFORMA_ISO === "2026-03-06");
  check(
    "todas las fuentes son oficiales (infoleg / boletinoficial)",
    MUERTE_FUENTES.lista.every((f) => /infoleg\.gob\.ar|boletinoficial\.gob\.ar/.test(f.url)),
    MUERTE_FUENTES.lista.map((f) => f.url),
  );
}

console.log(
  fallas === 0
    ? "\n✅ Todos los checks del art. 248 (muerte del trabajador) OK."
    : `\n❌ check_muerte_trabajador: ${fallas} falla(s)`,
);
process.exit(fallas === 0 ? 0 : 1);
