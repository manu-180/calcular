// Verificación de los aportes de casas particulares (src/data/aportes-casas-particulares.ts + motor).
// Correr con: npx tsx scripts/check_aportes_casas.ts
//
// POR QUÉ ESTE CHECK ES DISTINTO A LOS DEMÁS: acá el riesgo principal no es que un número esté
// viejo, es que esté en la COLUMNA EQUIVOCADA. El PDF de ARCA, leído como texto plano, devuelve los
// encabezados desordenados y la primera lectura ponía $25.694,55 como "cuota ART" cuando es el
// aporte de obra social de la jornada completa. Los checks de abajo blindan las tres pruebas que
// desambiguaron las columnas el 11/8/2026:
//   1. ARITMÉTICA: en las 9 filas, total = obra social + SIPA + ART, al centavo.
//   2. SEMÁNTICA: el jubilado nunca tiene obra social, el menor de 18 nunca tiene SIPA, y la ART
//      existe siempre y es idéntica en las tres tablas para el mismo rango de horas.
//   3. MAGNITUD: la ART es la partida más grande en los rangos de jornada reducida (lo que hace
//      valiosa la página) y el aporte de obra social salta al llegar a 16 horas (piso de derechos).
// Si alguien rota la tabla del mes que viene y se le da vuelta una columna, esto sale rojo.

import {
  APORTES_FUENTES,
  CONDICIONES,
  RANGOS,
  REGLAS_APORTES,
  TABLA_APORTES,
  VIGENCIA_APORTES,
  type CondicionTrabajador,
} from "../src/data/aportes-casas-particulares";
import { calcularAportes, filaDe, rangoPorHoras } from "../src/lib/aportes-casas-particulares";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const CONDS: CondicionTrabajador[] = ["activo-mayor-18", "activo-menor-18", "jubilado"];

// ===========================================================================
// 1 · Los 9 importes, uno por uno, contra el PDF oficial de ARCA (julio 2026)
// ===========================================================================
// [total, obra social, SIPA, ART] — leídos con tools/pdf-tabla.ts --xy el 11/8/2026.
const PDF_ARCA: Record<CondicionTrabajador, Record<string, [number, number | null, number | null, number]>> = {
  "activo-mayor-18": {
    "menos-12": [10569.57, 2084.85, 729.9, 7754.82],
    "12-a-16": [16627.46, 3863.3, 1459.48, 11304.68],
    "16-o-mas": [44270.19, 25694.55, 2128.79, 16446.85],
  },
  "activo-menor-18": {
    "menos-12": [9839.67, 2084.85, null, 7754.82],
    "12-a-16": [15167.98, 3863.3, null, 11304.68],
    "16-o-mas": [42141.4, 25694.55, null, 16446.85],
  },
  jubilado: {
    "menos-12": [8484.72, null, 729.9, 7754.82],
    "12-a-16": [12764.16, null, 1459.48, 11304.68],
    "16-o-mas": [18575.64, null, 2128.79, 16446.85],
  },
};

for (const cond of CONDS) {
  for (const [rango, [total, os, sipa, art]] of Object.entries(PDF_ARCA[cond])) {
    const fila = filaDe(cond, rango as never);
    check(`${cond}/${rango}: total ${total}`, fila.total === total, fila.total);
    check(`${cond}/${rango}: obra social ${os}`, fila.obraSocial === os, fila.obraSocial);
    check(`${cond}/${rango}: SIPA ${sipa}`, fila.sipa === sipa, fila.sipa);
    check(`${cond}/${rango}: ART ${art}`, fila.art === art, fila.art);
  }
}

// ===========================================================================
// 2 · Prueba ARITMÉTICA: el total es la suma de los tres conceptos, al centavo
// ===========================================================================
for (const cond of CONDS) {
  for (const fila of TABLA_APORTES[cond]) {
    const suma = Math.round(((fila.obraSocial ?? 0) + (fila.sipa ?? 0) + fila.art) * 100) / 100;
    check(
      `${cond}/${fila.rango}: total = obra social + SIPA + ART`,
      Math.abs(suma - fila.total) < 0.005,
      { suma, total: fila.total },
    );
  }
}

// ===========================================================================
// 3 · Prueba SEMÁNTICA: qué concepto puede faltar en cada tabla, y cuál nunca
// ===========================================================================
check(
  "el jubilado nunca tiene aporte de obra social (la cobertura la da el PAMI)",
  TABLA_APORTES.jubilado.every((f) => f.obraSocial === null),
);
check(
  "el jubilado siempre tiene contribución al SIPA",
  TABLA_APORTES.jubilado.every((f) => f.sipa !== null && f.sipa > 0),
);
check(
  "el menor de 18 nunca tiene contribución al SIPA (el sistema no la admite)",
  TABLA_APORTES["activo-menor-18"].every((f) => f.sipa === null),
);
check(
  "el menor de 18 siempre tiene aporte de obra social",
  TABLA_APORTES["activo-menor-18"].every((f) => f.obraSocial !== null && f.obraSocial > 0),
);
check(
  "el activo mayor de 18 tiene los tres conceptos en los tres rangos",
  TABLA_APORTES["activo-mayor-18"].every((f) => f.obraSocial !== null && f.sipa !== null && f.art > 0),
);
check(
  "la ART existe en las 9 filas (es obligatoria por el art. 14.1 inc. e de la Ley 26.844)",
  CONDS.every((c) => TABLA_APORTES[c].every((f) => f.art > 0)),
);
for (const rango of RANGOS) {
  const arts = CONDS.map((c) => filaDe(c, rango.id).art);
  check(
    `la ART de ${rango.id} es idéntica en las tres tablas (depende de las horas, no de la persona)`,
    new Set(arts).size === 1,
    arts,
  );
}
for (const rango of RANGOS) {
  const os = [filaDe("activo-mayor-18", rango.id).obraSocial, filaDe("activo-menor-18", rango.id).obraSocial];
  check(`el aporte de obra social de ${rango.id} coincide entre activo y menor de 18`, os[0] === os[1], os);
  const sipa = [filaDe("activo-mayor-18", rango.id).sipa, filaDe("jubilado", rango.id).sipa];
  check(`la contribución al SIPA de ${rango.id} coincide entre activo y jubilado`, sipa[0] === sipa[1], sipa);
}

// ===========================================================================
// 4 · Prueba de MAGNITUD: el orden de los rangos y los dos hechos que dan valor
// ===========================================================================
for (const cond of CONDS) {
  const [a, b, c] = TABLA_APORTES[cond];
  check(`${cond}: los totales crecen con las horas`, a.total < b.total && b.total < c.total, [a.total, b.total, c.total]);
  check(`${cond}: la ART crece con las horas`, a.art < b.art && b.art < c.art, [a.art, b.art, c.art]);
}
check(
  "en jornada reducida la ART es la partida más grande (el hallazgo de la página)",
  ["menos-12", "12-a-16"].every((r) => {
    const f = filaDe("activo-mayor-18", r as never);
    return f.art > (f.obraSocial ?? 0) && f.art > (f.sipa ?? 0);
  }),
);
check(
  "con 16 horas o más el aporte de obra social salta y pasa a ser la partida mayor (piso de derechos)",
  (() => {
    const media = filaDe("activo-mayor-18", "12-a-16");
    const completa = filaDe("activo-mayor-18", "16-o-mas");
    return completa.obraSocial! > media.obraSocial! * 5 && completa.obraSocial! > completa.art;
  })(),
);

// ===========================================================================
// 5 · El motor: rangos, totales, múltiples trabajadores y las diferencias
// ===========================================================================
check("11,9 horas cae en el rango de menos de 12", rangoPorHoras(11.9) === "menos-12");
check("12 horas justas cae en el rango de 12 a 16", rangoPorHoras(12) === "12-a-16");
check("15,9 horas sigue en el rango de 12 a 16", rangoPorHoras(15.9) === "12-a-16");
check("16 horas justas cae en el rango de 16 o más", rangoPorHoras(16) === "16-o-mas");
check("48 horas cae en el rango de 16 o más", rangoPorHoras(48) === "16-o-mas");

// Los importes esperados de acá abajo se LEEN de la tabla, no se transcriben: el ancla contra el
// PDF de ARCA ya la puso la sección 1, y repetirlos a mano hacía que cada rotación mensual rompiera
// estos 4 checks por duplicación, no por un bug del motor (pasó el 5/9/2026 con la tabla 08-26).
const MENOS12 = filaDe("activo-mayor-18", "menos-12");
const DIECISEIS = filaDe("activo-mayor-18", "16-o-mas");
const JUB_16MAS = filaDe("jubilado", "16-o-mas");

const seisHoras = calcularAportes({ horasSemanales: 6, condicion: "activo-mayor-18", cantidadTrabajadores: 1 });
check("6 h: el total es el de la fila de menos de 12", seisHoras.totalMensual === MENOS12.total, seisHoras.totalMensual);
check(
  "6 h: falta exactamente la diferencia de obra social hasta el piso de 16 h",
  seisHoras.faltaParaObraSocial === Math.round((DIECISEIS.obraSocial! - MENOS12.obraSocial!) * 100) / 100,
  seisHoras.faltaParaObraSocial,
);
check(
  "6 h: falta exactamente la diferencia de SIPA hasta el piso de 16 h",
  seisHoras.faltaParaJubilacion === Math.round((DIECISEIS.sipa! - MENOS12.sipa!) * 100) / 100,
  seisHoras.faltaParaJubilacion,
);
check("6 h: avisa que el aporte no alcanza el piso", seisHoras.avisos.some((a) => a.tono === "atencion"));
check(
  "6 h: la ART es más del 70% del total",
  seisHoras.proporcionArt > 70,
  seisHoras.proporcionArt,
);

const jornadaCompleta = calcularAportes({ horasSemanales: 30, condicion: "activo-mayor-18", cantidadTrabajadores: 1 });
check("30 h: no falta nada para obra social", jornadaCompleta.faltaParaObraSocial === 0);
check("30 h: no falta nada para jubilación", jornadaCompleta.faltaParaJubilacion === 0);
check("30 h: el aviso es de tono ok", jornadaCompleta.avisos.some((a) => a.tono === "ok"));

const dos = calcularAportes({ horasSemanales: 6, condicion: "activo-mayor-18", cantidadTrabajadores: 2 });
check("2 trabajadores: el total se duplica", dos.totalMensual === Math.round(MENOS12.total * 2 * 100) / 100, dos.totalMensual);
check("2 trabajadores: el importe por trabajador no cambia", dos.totalPorTrabajador === MENOS12.total);

const cantidadCero = calcularAportes({ horasSemanales: 20, condicion: "jubilado", cantidadTrabajadores: 0 });
check("cantidad 0 se trata como 1 (no devuelve cero)", cantidadCero.totalMensual === JUB_16MAS.total, cantidadCero.totalMensual);

const menor = calcularAportes({ horasSemanales: 20, condicion: "activo-menor-18", cantidadTrabajadores: 1 });
check("menor de 18: no calcula diferencia jubilatoria (no hay SIPA que completar)", menor.faltaParaJubilacion === 0);
check("menor de 18: avisa que el período no computa antigüedad", menor.avisos.some((a) => a.texto.includes("antigüedad")));

const jubilado = calcularAportes({ horasSemanales: 8, condicion: "jubilado", cantidadTrabajadores: 1 });
check("jubilado: no calcula diferencia de obra social (tiene PAMI)", jubilado.faltaParaObraSocial === 0);
check("jubilado: sí calcula la diferencia jubilatoria", jubilado.faltaParaJubilacion > 0);

const excedida = calcularAportes({ horasSemanales: 60, condicion: "activo-mayor-18", cantidadTrabajadores: 1 });
check("60 h: avisa que se pasó de la jornada máxima del régimen", excedida.avisos.some((a) => a.tono === "bloqueante"));

// ===========================================================================
// 6 · Vigencia, reglas textuales y fuentes
// ===========================================================================
check("la vigencia declara el mes de devengamiento", VIGENCIA_APORTES.mesVigente.includes("2026"));
check("la vigencia declara el mes de pago", VIGENCIA_APORTES.mesDeVencimiento.includes("2026"));
check(
  "el nombre del PDF sigue la convención MM-AA que permite buscar el mes siguiente",
  /-\d{2}-\d{2}\.pdf$/.test(VIGENCIA_APORTES.archivoPdf),
  VIGENCIA_APORTES.archivoPdf,
);
check(
  "la regla de oportunidad distingue mes vencido (aportes) de mes en curso (ART)",
  REGLAS_APORTES.cuandoSePaga.includes("mes vencido") && REGLAS_APORTES.cuandoSePaga.includes("mes en curso"),
);
check(
  "el piso de obra social cita la categoría de 16 o más horas",
  REGLAS_APORTES.pisoObraSocial.includes("16 o más horas"),
);
check(
  "el piso jubilatorio dice que el trabajador puede pagar la diferencia",
  REGLAS_APORTES.pisoJubilacion.includes("podrá pagar la diferencia"),
);
check("están las tres condiciones de trabajador", CONDICIONES.length === 3);
check("están los tres rangos de horas", RANGOS.length === 3);
check(
  "está citado el PDF de ARCA con los importes",
  APORTES_FUENTES.lista.some((f) => f.url.includes("Casas-particulares-aportes-y-contribuciones")),
);
check(
  "está citada la página de obra social de ARCA (la del piso de derechos)",
  APORTES_FUENTES.lista.some((f) => f.url.includes("obra-social.asp")),
);
check(
  "está citada la página de jubilación de ARCA",
  APORTES_FUENTES.lista.some((f) => f.url.includes("jubilacion.asp")),
);
check(
  "está citada la Ley 26.844 con su texto actualizado",
  APORTES_FUENTES.lista.some((f) => f.nombre.includes("26.844") && f.url.endsWith("texact.htm")),
);
check("todas las fuentes son oficiales (arca.gob.ar o infoleg.gob.ar)",
  APORTES_FUENTES.lista.every((f) => /(^https:\/\/www\.arca\.gob\.ar|^https:\/\/servicios\.infoleg\.gob\.ar)/.test(f.url)),
  APORTES_FUENTES.lista.map((f) => f.url),
);
check("la fecha de consulta es una fecha ISO", /^\d{4}-\d{2}-\d{2}$/.test(APORTES_FUENTES.consultadoEl));

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log(`Todos los checks de aportes de casas particulares OK (tabla de ${VIGENCIA_APORTES.mesVigente}).`);
}
