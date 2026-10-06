// Verificación de la ART del personal de casas particulares (Ley 26.844 art. 74 + Dec. 467/2014).
// Correr con: npx tsx scripts/check_art_casas_particulares.ts
//
// LO QUE ESTE CHECK EXISTE PARA IMPEDIR:
//
//   1. **Que la base de cálculo se tome del sueldo real.** Es el error que la página existe para
//      corregir: el inc. d) manda usar «la remuneración mensual mínima» de la categoría, no el
//      promedio de los salarios del art. 12. Si alguien cablea el sueldo declarado como ingreso
//      base, el resultado cambia y la página pasa a decir lo contrario de la norma.
//   2. **Que se pierda el piso.** Con una base tan baja la fórmula siempre queda por debajo del
//      piso de la SRT. Una cuenta que informe la fórmula sin comparar contra el piso le anuncia a
//      una trabajadora una fracción de lo que le corresponde. El check recorre TODAS las
//      categorías, modalidades, edades y porcentajes y exige que el piso mande en todas.
//   3. **Que la base se desincronice de la escala oficial.** La base tiene que ser, al peso, el
//      mínimo mensual que publica la resolución de la CNTCP para esa categoría y modalidad. Si
//      alguien la copia a mano, este check lo ve.
//   4. **Que la cuota se desincronice de la tabla de ARCA.** El importe sale de la tabla mensual
//      oficial, por rango de horas y condición: nunca de una constante propia.
//   5. **Que se le ofrezca a un casero la modalidad «con retiro».** La categoría sólo existe sin
//      retiro (el anexo oficial tiene un guion en esa columna): pedir esa combinación tiene que
//      devolver null, no un NaN aguas abajo.
//   6. **Que las citas del reglamento se parafraseen.**

import {
  ART_CASAS_FUENTES,
  ART_CASAS_TEXTOS,
  ART_CASAS_VIGENCIA,
  REGLAS_ART_CASAS,
} from "../src/data/art-casas-particulares";
import { ESCALA_VIGENTE } from "../src/data/casas-particulares";
import { CONDICIONES, RANGOS, TABLA_APORTES } from "../src/data/aportes-casas-particulares";
import {
  CORTES_ART_CASAS,
  EDAD_MINIMA_BARRIDO,
  EDAD_PISO_SIEMPRE,
  calcularArtCasas,
  type Modalidad,
} from "../src/lib/art-casas-particulares";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FALLA ${nombre}`, detalle ?? "");
  }
}

const BASE = {
  horasSemanales: 20,
  condicion: "activo-mayor-18" as const,
  edad: 40,
  incapacidad: 30,
  enElTrabajo: true,
};

// --- 1. La base sale de la escala oficial, no de una constante ---------------------------------
for (const cat of ESCALA_VIGENTE) {
  const modalidades: Modalidad[] =
    cat.mesConRetiro === null ? ["sin-retiro"] : ["con-retiro", "sin-retiro"];
  for (const modalidad of modalidades) {
    const r = calcularArtCasas({ ...BASE, categoriaId: cat.id, modalidad });
    const esperado = modalidad === "sin-retiro" ? cat.mesSinRetiro : cat.mesConRetiro;
    if (!r || r.baseLegal !== esperado) {
      check(`la base de ${cat.id} ${modalidad} es el mínimo de la escala`, false, {
        obtenido: r?.baseLegal,
        esperado,
      });
    }
  }
}
check("la base es siempre el mínimo mensual de la escala de la CNTCP", true);

// --- 2. El casero no admite «con retiro» -------------------------------------------------------
check(
  "pedir un casero con retiro devuelve null, no un NaN",
  calcularArtCasas({ ...BASE, categoriaId: "caseros", modalidad: "con-retiro" }) === null,
);
check(
  "el casero sin retiro sí calcula",
  calcularArtCasas({ ...BASE, categoriaId: "caseros", modalidad: "sin-retiro" }) !== null,
);
check(
  "una categoría inexistente devuelve null",
  calcularArtCasas({ ...BASE, categoriaId: "no-existe", modalidad: "sin-retiro" }) === null,
);

// --- 3. El piso manda en TODO el espacio de casos ----------------------------------------------
let casos = 0;
let sinPiso = 0;
for (const cat of ESCALA_VIGENTE) {
  const modalidades: Modalidad[] =
    cat.mesConRetiro === null ? ["sin-retiro"] : ["con-retiro", "sin-retiro"];
  for (const modalidad of modalidades) {
    for (const edad of [18, 25, 40, 55, 65]) {
      for (const incapacidad of [1, 10, 30, 50, 66, 100]) {
        const r = calcularArtCasas({ ...BASE, categoriaId: cat.id, modalidad, edad, incapacidad });
        if (!r?.art) continue;
        casos++;
        if (!r.art.mandaElPiso) sinPiso++;
      }
    }
  }
}
check("se recorrieron todos los casos del régimen", casos >= 150, casos);
console.log(`     (muestra de 5 edades: ${sinPiso} de ${casos} casos con la fórmula ganando)`);
const excepciones: string[] = [];
let celdasBarrido = 0;
let celdasSinPiso = 0;
for (const cat of ESCALA_VIGENTE) {
  const modalidades: Modalidad[] =
    cat.mesConRetiro === null ? ["sin-retiro"] : ["con-retiro", "sin-retiro"];
  for (const modalidad of modalidades) {
    for (let edad = 16; edad <= 70; edad++) {
      for (const incapacidad of [1, 30, 66, 100]) {
        const r = calcularArtCasas({ ...BASE, categoriaId: cat.id, modalidad, edad, incapacidad });
        if (!r?.art) continue;
        celdasBarrido++;
        if (!r.art.mandaElPiso) {
          celdasSinPiso++;
          excepciones.push(`${cat.id}/${modalidad}/${edad}`);
        }
      }
    }
  }
}
const unicas = [...new Set(excepciones)];
// La «enorme mayoría» se mide sobre el barrido completo de 16 a 70, no sobre la muestra de 5 edades
// de arriba: esa muestra incluye los 18, justo donde vive el cruce, y una sola edad pesa el 20% —
// con la escala de octubre de 2026 dio 24 de 270 (8,9%) y el ancla del 5% se puso roja por un dato
// correcto. Sobre el barrido completo, aun con el corte en los 25 que permite el check de abajo, el
// techo teórico es 9 de 55 edades (16%); el 10% deja margen para las subas de escala del semestre y
// salta si la base se desacopla del mínimo.
check(
  "el piso manda en la enorme mayoría del régimen (la base está fijada en el mínimo)",
  celdasSinPiso / celdasBarrido < 0.1,
  { celdasBarrido, celdasSinPiso },
);

// QUÉ SE AFIRMA ACÁ, Y POR QUÉ NO SON NÚMEROS FIJOS (reescrito el 15/9/2026, s115).
// Hasta hoy estos checks anclaban «la fórmula sólo gana por debajo de los 19 años» y «son
// exactamente 7 combinaciones»: números verdaderos el 7/9 con la escala de julio, y falsos el 15/9
// con la escala de la Res. CNTCP 6/2026. Al subir la escala salarial sin que suba el piso de la
// Res. SRT 39/2026, la fórmula pasa a ganar hasta más tarde — y la suite se puso roja por un cambio
// de dato perfectamente correcto. **Un ancla que muere en cada rotación de dato no protege nada:
// entrena a apagarla.** Lo que se afirma ahora es la PROPIEDAD, que no depende de la escala:
//   · el piso manda en la enorme mayoría del régimen;
//   · si la fórmula gana a una edad, gana en todas las menores (hay una edad de corte, no parches);
//   · la edad de corte crece con el mínimo de la categoría — a base más alta, piso más tarde;
//   · el cruce no depende del porcentaje de incapacidad.
// El número concreto se IMPRIME, para que quede en el log de cada corrida sin ser una condición.
const edadMaximaSinPiso = unicas.length
  ? Math.max(...unicas.map((u) => Number(u.split("/")[2])))
  : 0;
console.log(
  `     (barrido: ${unicas.length} combinación(es) donde gana la fórmula; edad máxima ${edadMaximaSinPiso})`,
);

const corteDe = (id: string, modalidad: Modalidad) => {
  for (let edad = 16; edad <= 70; edad++) {
    const r = calcularArtCasas({ ...BASE, categoriaId: id, modalidad, edad, incapacidad: 100 });
    if (r?.art?.mandaElPiso) return edad;
  }
  return 99;
};

check(
  "la fórmula sólo puede ganar en edades jóvenes: nunca pasa de los 25 años",
  edadMaximaSinPiso < 25,
  unicas,
);
check(
  "hay una EDAD DE CORTE por categoría: si el piso manda a una edad, manda en todas las mayores",
  ESCALA_VIGENTE.every((cat) => {
    const modalidades: Modalidad[] =
      cat.mesConRetiro === null ? ["sin-retiro"] : ["con-retiro", "sin-retiro"];
    return modalidades.every((modalidad) => {
      const corte = corteDe(cat.id, modalidad);
      for (let edad = corte; edad <= 70; edad++) {
        const r = calcularArtCasas({ ...BASE, categoriaId: cat.id, modalidad, edad, incapacidad: 100 });
        if (!r?.art?.mandaElPiso) return false;
      }
      return true;
    });
  }),
);
check(
  "la edad de corte crece con el mínimo de la categoría (base más alta, piso más tarde)",
  (() => {
    const porMinimo = [...ESCALA_VIGENTE]
      .filter((c) => c.mesConRetiro !== null)
      .sort((a, b) => a.mesSinRetiro - b.mesSinRetiro)
      .map((c) => ({ id: c.id, corte: corteDe(c.id, "sin-retiro") }));
    return porMinimo.every((c, i) => i === 0 || c.corte >= porMinimo[i - 1].corte);
  })(),
);
// Hasta el 6/10/2026 acá se afirmaba que tareas generales sin retiro tenía corte 16 (el piso
// siempre). Con la escala de octubre su mínimo ($548.429,23) pasó el punto de cruce de los 16 años
// (piso ÷ 53 × 16/65) y la fórmula le gana a esa edad: dato correcto, ancla muerta. Lo que no
// cambia con la escala es el orden: la base más baja es la que antes cruza.
check(
  "la base más baja de la escala es la que antes cruza al piso",
  (() => {
    const base = (c: (typeof ESCALA_VIGENTE)[number], m: Modalidad) =>
      m === "sin-retiro" ? c.mesSinRetiro : (c.mesConRetiro as number);
    const pares = ESCALA_VIGENTE.flatMap((c) =>
      (c.mesConRetiro === null ? ["sin-retiro"] : ["con-retiro", "sin-retiro"]).map((m) => ({
        base: base(c, m as Modalidad),
        corte: corteDe(c.id, m as Modalidad),
      })),
    );
    const masBaja = pares.reduce((a, b) => (b.base < a.base ? b : a));
    return masBaja.corte === Math.min(...pares.map((p) => p.corte));
  })(),
);
check(
  "las edades de corte publicadas son las del barrido",
  CORTES_ART_CASAS.every((c) => c.edad === corteDe(c.categoria.id, c.modalidad)) &&
    EDAD_PISO_SIEMPRE === (unicas.length ? edadMaximaSinPiso + 1 : EDAD_MINIMA_BARRIDO),
  { EDAD_PISO_SIEMPRE, edadMaximaSinPiso },
);
check(
  "la regla publicada cita la edad del barrido, no una escrita a mano",
  REGLAS_ART_CASAS.find((r) => r.id === "manda-el-piso")!.texto.includes(
    `desde los ${EDAD_PISO_SIEMPRE} años`,
  ),
);
check(
  "la categoría mejor paga es la que más tarde cruza",
  corteDe("supervisor", "sin-retiro") === Math.max(
    ...ESCALA_VIGENTE.filter((c) => c.mesConRetiro !== null).map((c) => corteDe(c.id, "sin-retiro")),
  ),
);

// Y el corolario que cae del barrido: cuál de los dos gana NO depende del porcentaje, porque los
// dos lados de la comparación se multiplican por él. Si alguien rompiera esa proporcionalidad,
// aparecerían excepciones a distintos porcentajes para la misma categoría y edad.
for (const edad of [18, 19, 40]) {
  const mandan = [1, 10, 30, 50, 66, 100].map(
    (incapacidad) =>
      calcularArtCasas({
        ...BASE,
        categoriaId: "supervisor",
        modalidad: "sin-retiro",
        edad,
        incapacidad,
      })!.art!.mandaElPiso,
  );
  check(
    `a los ${edad} años, quién manda no depende del porcentaje de incapacidad`,
    new Set(mandan).size === 1,
    mandan,
  );
}

// --- 4. La cuota sale de la tabla de ARCA ------------------------------------------------------
for (const cond of CONDICIONES) {
  for (const rango of RANGOS) {
    const horas = rango.hasta === null ? rango.desde + 4 : (rango.desde + rango.hasta) / 2;
    const r = calcularArtCasas({
      ...BASE,
      categoriaId: "tareas-generales",
      modalidad: "con-retiro",
      condicion: cond.id,
      horasSemanales: horas,
    })!;
    const fila = TABLA_APORTES[cond.id].find((f) => f.rango === rango.id)!;
    if (r.rango !== rango.id || r.cuotaMensual !== fila.art) {
      check(`la cuota de ${cond.id}/${rango.id} sale de la tabla de ARCA`, false, {
        rango: r.rango,
        cuota: r.cuotaMensual,
        esperada: fila.art,
      });
    }
  }
}
check("la cuota de ART siempre sale de la tabla oficial de ARCA", true);
check(
  "la cuota nunca es cero: la ART es obligatoria en las nueve filas",
  Object.values(TABLA_APORTES).every((filas) => filas.every((f) => f.art > 0)),
);

// --- 5. La brecha con el sueldo real -----------------------------------------------------------
const conSueldo = calcularArtCasas({
  ...BASE,
  categoriaId: "tareas-generales",
  modalidad: "con-retiro",
  sueldoDeclarado: 900_000,
})!;
check(
  "la brecha es sueldo declarado menos base legal",
  Math.round(conSueldo.brecha) === Math.round(900_000 - conSueldo.baseLegal),
  conSueldo.brecha,
);
// Se compara la FÓRMULA, no el total: como el piso casi siempre gana, un total idéntico no prueba
// nada. Si alguien cableara el sueldo declarado como ingreso base, el total seguiría dando igual
// (lo taparía el piso) y la mutación pasaría desapercibida. La fórmula sí se mueve.
const sinSueldo = calcularArtCasas({
  ...BASE,
  categoriaId: "tareas-generales",
  modalidad: "con-retiro",
})!;
check(
  "declarar un sueldo NO cambia la FÓRMULA: la base sigue siendo el mínimo de la categoría",
  conSueldo.art!.formula === sinSueldo.art!.formula,
  [conSueldo.art!.formula, sinSueldo.art!.formula],
);
check(
  "ni cambia el total",
  conSueldo.art!.total === sinSueldo.art!.total,
);
check(
  "la fórmula se corresponde con la base legal, no con el sueldo declarado",
  Math.abs(
    conSueldo.art!.formula -
      53 * conSueldo.baseLegal * (BASE.incapacidad / 100) * conSueldo.art!.coeficienteEdad,
  ) < 1,
  conSueldo.art!.formula,
);
check(
  "un sueldo por debajo del mínimo no genera brecha negativa",
  calcularArtCasas({
    ...BASE,
    categoriaId: "tareas-generales",
    modalidad: "con-retiro",
    sueldoDeclarado: 1000,
  })!.brecha === 0,
);
check(
  "se avisa siempre que la base no es el sueldo",
  conSueldo.avisos.some((a) => a.texto.includes("no es el sueldo que cobra")),
);

// --- 6. El 20% del art. 3 sigue el lugar del hecho ---------------------------------------------
const enCasa = calcularArtCasas({ ...BASE, categoriaId: "tareas-generales", modalidad: "con-retiro" })!;
const inItinere = calcularArtCasas({
  ...BASE,
  categoriaId: "tareas-generales",
  modalidad: "con-retiro",
  enElTrabajo: false,
})!;
check("en el lugar de trabajo corre el 20% adicional", enCasa.art!.adicional20 > 0);
check("in itinere NO corre el 20% adicional", inItinere.art!.adicional20 === 0);
check(
  "y se avisa por qué",
  inItinere.avisos.some((a) => a.texto.includes("in itinere")),
);

// --- 7. La muerte no multiplica por el porcentaje ----------------------------------------------
const muerte1 = calcularArtCasas({
  ...BASE,
  categoriaId: "tareas-generales",
  modalidad: "con-retiro",
  incapacidad: 1,
  muerte: true,
})!;
const muerte100 = calcularArtCasas({
  ...BASE,
  categoriaId: "tareas-generales",
  modalidad: "con-retiro",
  incapacidad: 100,
  muerte: true,
})!;
check(
  "en la muerte el porcentaje de incapacidad es irrelevante",
  muerte1.art!.total === muerte100.art!.total,
  [muerte1.art!.total, muerte100.art!.total],
);

// --- 8. Las citas del reglamento siguen siendo citas -------------------------------------------
const CITAS: [string, string][] = [
  ["ley74", "en el modo y condiciones que se establezcan por vía reglamentaria"],
  ["noRechazo", "no podrá rechazar la afiliación de ningún empleador"],
  ["asignacionDeOficio", "a partir de la fecha en que se notifique a la Aseguradora"],
  ["asignacionDeOficio", "registro de contratos extinguidos por falta de pago"],
  ["pagoAnticipado", "carácter de pago anticipado"],
  ["baseDeCalculo", "la remuneración mensual mínima fijada por el MINISTERIO DE TRABAJO"],
  ["baseDeCalculo", "para la categoría correspondiente"],
  ["ventanilla", "válidas y fehacientes"],
];
for (const [clave, frase] of CITAS) {
  const texto = (ART_CASAS_TEXTOS as Record<string, string>)[clave];
  check(`la cita «${clave}» conserva «${frase.slice(0, 40)}…»`, Boolean(texto?.includes(frase)));
}

// --- 9. El contenido publicado ----------------------------------------------------------------
check("hay al menos 7 reglas publicadas", REGLAS_ART_CASAS.length >= 7, REGLAS_ART_CASAS.length);
check(
  "está publicado el hallazgo de la base mínima",
  REGLAS_ART_CASAS.some((r) => r.id === "base-minima" && r.norma.includes("inc. d")),
);
check(
  "está publicada la asignación de oficio",
  REGLAS_ART_CASAS.some((r) => r.id === "asignacion-oficio" && r.norma.includes("inc. b")),
);
check(
  "ninguna regla se publica sin norma",
  REGLAS_ART_CASAS.every((r) => r.norma.trim().length > 0),
);
check(
  "la fecha de consulta de las fuentes coincide con la de vigencia",
  ART_CASAS_FUENTES.consultadoEl === ART_CASAS_VIGENCIA.consultadoEl,
);
check(
  "todas las fuentes son oficiales y por https",
  ART_CASAS_FUENTES.lista.every(
    (f) =>
      f.url.startsWith("https://") &&
      (f.url.includes("infoleg.gob.ar") || f.url.includes("arca.gob.ar")),
  ),
);

if (fallas > 0) {
  console.error(`\n❌ ${fallas} falla(s) en los checks de la ART de casas particulares.`);
  process.exit(1);
}
console.log(
  `\n✅ Todos los checks de la ART de casas particulares OK (Ley 26.844 art. 74 · Dec. 467/2014, ${casos} casos barridos, el piso manda en ${casos - sinPiso}).`,
);
