// Verificación de la PLANILLA de Ganancias para jubilados: abre el .xlsx que se entrega, evalúa
// sus fórmulas con HyperFormula y compara mes por mes contra el motor del sitio
// (src/lib/planilla-ganancias-jubilados.ts, que reusa la escala y las deducciones de
// src/data/ganancias.ts, el aporte del art. 8 de src/lib/descuento-pami.ts y la deducción
// específica de src/lib/ganancias-jubilados.ts).
//
// LO QUE MÁS IMPORTA ACÁ: el tramo de la escala se elige con COUNTIF («cuántos desde son
// estrictamente menores»), que es el `gni > t.desde` de impuestoSegunEscala. Con MATCH, una
// ganancia clavada justo en el borde de un tramo caería en el de arriba y la planilla cobraría
// el impuesto de otro tramo. Por eso hay casos armados para caer exactamente en cada borde.
//
// Correr con: npx tsx scripts/check_planilla_ganancias_jubilados.ts  (o vía scripts/check-all.ts)

import path from "node:path";
import { existsSync } from "node:fs";
import { DEDUCCIONES, ESCALA_GANANCIAS } from "../src/data/ganancias";
import { MULTIPLICADOR_ESPECIFICA } from "../src/data/ganancias-jubilados";
import { REGIMENES } from "../src/data/descuento-pami";
import { haberesMinimosProyectados } from "../src/lib/ganancias-jubilados";
import {
  aguinaldosPorSemestre,
  calcularPlanillaJubilados,
  MESES_DEL_ANIO,
  type EntradaPlanillaJubilados,
} from "../src/lib/planilla-ganancias-jubilados";
import {
  ARCHIVO_GANANCIAS_JUBILADOS,
  CELDAS_JUB as C,
  COL_ANIO as K,
  FILAS_ESCALA,
  FILAS_MINIMOS,
  FILA_MES_FIN,
  FILA_MES_INI,
  FILA_TOTALES,
  HOJAS_JUB,
} from "./gen_planilla_ganancias_jubilados";
import { abrirLibro, type LibroEvaluable } from "./evaluar_xlsx";

const ARCHIVO = path.join(process.cwd(), "private", ARCHIVO_GANANCIAS_JUBILADOS);
let fallas = 0;

function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

// UN PESO de margen, y no medio centavo como en las planillas de tabla: acá los dos lados suman
// doce meses de acumulados y redondean en cada paso, así que el ROUND de Excel (mitad para
// arriba sobre el decimal real) y el de JavaScript caen de distinto lado en un número clavado en
// el medio, y la proyección a doce meses multiplica ese centavo por hasta doce. Cualquier error
// de verdad (una referencia corrida, el tramo equivocado, un término que falta) se mide en miles.
const TOLERANCIA = 1;
const igual = (a: number, b: number) => Math.abs(a - b) <= TOLERANCIA;

const REGIMENES_CON_APORTE = REGIMENES.filter((r) => r.tramos !== null);
const HMIN = haberesMinimosProyectados().map((m) => m.haberMinimo);
const SI = "Sí";
const NO = "No";

type Caso = {
  nombre: string;
  haberes: number[];
  regimen: (typeof REGIMENES_CON_APORTE)[number];
  conyuge: boolean;
  hijos: number;
  otrosIngresos: boolean;
  bienesPersonales: boolean;
  otrasDeducciones: number;
  recibos: number[];
};

const plano = (h: number) => Array.from({ length: 12 }, () => h);
/** Doce haberes que suben todos los meses, como los mueve la movilidad: el caso real. */
const conMovilidad = (inicial: number, aumento = 0.025) =>
  Array.from({ length: 12 }, (_, i) => Math.round(inicial * (1 + aumento) ** i * 100) / 100);

function entradaDe(caso: Caso): EntradaPlanillaJubilados {
  return {
    haberes: caso.haberes,
    aguinaldos: aguinaldosPorSemestre(caso.haberes),
    haberesMinimos: HMIN,
    regimenPamiId: caso.regimen.id,
    conyuge: caso.conyuge,
    hijos: caso.hijos,
    otrosIngresos: caso.otrosIngresos,
    bienesPersonales: caso.bienesPersonales,
    otrasDeduccionesAnual: caso.otrasDeducciones,
  };
}

function cargar(libro: LibroEvaluable, caso: Caso): void {
  libro.cargar(HOJAS_JUB.datos, {
    [C.regimen]: caso.regimen.etiqueta,
    [C.conyuge]: caso.conyuge ? SI : NO,
    [C.hijos]: caso.hijos,
    [C.otrosIngresos]: caso.otrosIngresos ? SI : NO,
    [C.bienesPersonales]: caso.bienesPersonales ? SI : NO,
    [C.otrasDeducciones]: caso.otrasDeducciones,
  });
  const filas: Record<string, number> = {};
  for (let i = 0; i < 12; i++) {
    filas[`${K.haber}${FILA_MES_INI + i}`] = caso.haberes[i];
    filas[`${K.recibo}${FILA_MES_INI + i}`] = caso.recibos[i];
  }
  libro.cargar(HOJAS_JUB.anio, filas);
}

/** Las otras deducciones del SiRADIG que dejan la ganancia de diciembre clavada en `objetivo`.
 *  Es la única forma exacta de pisar el borde de un tramo: en diciembre la proyección es la
 *  ganancia misma, y las otras deducciones entran enteras, así que el despeje da al centavo.
 *  Devuelve null si haría falta una deducción negativa. */
function otrasParaGanancia(haberes: number[], objetivo: number, regimenId: string): number | null {
  const sinOtras = calcularPlanillaJubilados({
    haberes,
    aguinaldos: aguinaldosPorSemestre(haberes),
    haberesMinimos: HMIN,
    regimenPamiId: regimenId,
  });
  const otras = Math.round((sinOtras.filas[11].gniProporcional - objetivo) * 100) / 100;
  return otras >= 0 ? otras : null;
}

async function main() {
  check("el archivo entregable existe", existsSync(ARCHIVO), ARCHIVO);
  if (!existsSync(ARCHIVO)) process.exit(1);
  const libro = await abrirLibro(ARCHIVO);

  // ── 1. Las hojas y los datos del archivo son los del repo ──────────────────
  check(
    "tiene las hojas prometidas",
    [...Object.values(HOJAS_JUB), "Fuentes"].every((h) => libro.hojas.includes(h)),
    libro.hojas,
  );

  let malEscala = 0;
  ESCALA_GANANCIAS.forEach((t, i) => {
    const r = FILAS_ESCALA.tramoIni + i;
    if (libro.crudo(HOJAS_JUB.escala, `A${r}`) !== t.desde) malEscala++;
    if (libro.crudo(HOJAS_JUB.escala, `C${r}`) !== t.fijo) malEscala++;
    if (libro.crudo(HOJAS_JUB.escala, `D${r}`) !== t.alicuota) malEscala++;
    if (libro.crudo(HOJAS_JUB.escala, `E${r}`) !== t.excedenteSobre) malEscala++;
  });
  check(`la escala del archivo == ESCALA_GANANCIAS (${ESCALA_GANANCIAS.length} tramos)`, malEscala === 0, malEscala);

  check("el no imponible del archivo == DEDUCCIONES.mni", libro.crudo(HOJAS_JUB.escala, `B${FILAS_ESCALA.mni}`) === DEDUCCIONES.mni);
  check("el monto del cónyuge == DEDUCCIONES.conyuge", libro.crudo(HOJAS_JUB.escala, `B${FILAS_ESCALA.conyuge}`) === DEDUCCIONES.conyuge);
  check("el monto por hijo == DEDUCCIONES.hijo", libro.crudo(HOJAS_JUB.escala, `B${FILAS_ESCALA.hijo}`) === DEDUCCIONES.hijo);
  check(
    "la deducción especial == DEDUCCIONES.deduccionEspecialDependencia",
    libro.crudo(HOJAS_JUB.escala, `B${FILAS_ESCALA.especial}`) === DEDUCCIONES.deduccionEspecialDependencia,
  );
  check(
    "el multiplicador de la específica == MULTIPLICADOR_ESPECIFICA",
    libro.crudo(HOJAS_JUB.escala, `B${FILAS_ESCALA.multiplicador}`) === MULTIPLICADOR_ESPECIFICA,
  );

  let malRegimen = 0;
  REGIMENES_CON_APORTE.forEach((reg, i) => {
    const r = FILAS_ESCALA.regimenIni + i;
    if (libro.crudo(HOJAS_JUB.escala, `A${r}`) !== reg.etiqueta) malRegimen++;
    if (libro.crudo(HOJAS_JUB.escala, `B${r}`) !== reg.tramos!.hastaMinimo) malRegimen++;
    if (libro.crudo(HOJAS_JUB.escala, `C${r}`) !== reg.tramos!.excedente) malRegimen++;
  });
  check("las alícuotas de obra social del archivo == REGIMENES", malRegimen === 0, malRegimen);

  let malMinimos = 0;
  HMIN.forEach((h, i) => {
    if (libro.crudo(HOJAS_JUB.minimos, `B${FILA_MES_INI + i}`) !== h) malMinimos++;
    if (libro.crudo(HOJAS_JUB.minimos, `A${FILA_MES_INI + i}`) !== MESES_DEL_ANIO[i]) malMinimos++;
  });
  check("los doce haberes mínimos del archivo == la serie de ANSES", malMinimos === 0, malMinimos);
  check(
    "la deducción específica del año == 8 por la suma de los haberes mínimos",
    igual(
      libro.numero(HOJAS_JUB.minimos, `B${FILAS_MINIMOS.total}`),
      Math.round(MULTIPLICADOR_ESPECIFICA * HMIN.reduce((s, h) => s + h, 0) * 100) / 100,
    ),
    libro.numero(HOJAS_JUB.minimos, `B${FILAS_MINIMOS.total}`),
  );
  check(
    "los doce meses están rotulados en «Mi año» en el mismo orden",
    MESES_DEL_ANIO.every((m, i) => libro.crudo(HOJAS_JUB.anio, `A${FILA_MES_INI + i}`) === m),
  );

  // ── 2. La matriz: cada mes del archivo contra el motor ─────────────────────
  const casos: Caso[] = [];
  const base = {
    conyuge: false,
    hijos: 0,
    otrosIngresos: false,
    bienesPersonales: false,
    otrasDeducciones: 0,
    recibos: Array.from({ length: 12 }, () => 0),
  };
  for (const regimen of REGIMENES_CON_APORTE) {
    for (const [nombre, haberes] of [
      ["todo en cero", plano(0)],
      ["un haber bajo que no paga", plano(800_000)],
      ["el haber máximo del régimen general", plano(2_932_174.85)],
      ["justo arriba del umbral", plano(3_200_000)],
      ["un haber alto", plano(5_000_000)],
      ["un haber muy alto (último tramo)", plano(12_000_000)],
      ["doce haberes que suben por movilidad", conMovilidad(3_000_000)],
      ["doce haberes que suben desde un haber bajo", conMovilidad(900_000)],
    ] as [string, number[]][]) {
      casos.push({ nombre: `${regimen.id}: ${nombre}`, haberes, regimen, ...base });
      casos.push({
        nombre: `${regimen.id}: ${nombre} + cónyuge y 2 hijos`,
        haberes,
        regimen,
        ...base,
        conyuge: true,
        hijos: 2,
      });
      casos.push({
        nombre: `${regimen.id}: ${nombre} sin específica (otros ingresos)`,
        haberes,
        regimen,
        ...base,
        otrosIngresos: true,
      });
      casos.push({
        nombre: `${regimen.id}: ${nombre} sin específica (bienes personales) + SiRADIG`,
        haberes,
        regimen,
        ...base,
        bienesPersonales: true,
        otrasDeducciones: 3_000_000,
      });
    }
  }

  // Los bordes de la escala: la ganancia de diciembre clavada en el «desde» de cada tramo, y un
  // peso de cada lado. Es donde se ve si el tramo se elige con el mismo criterio que
  // impuestoSegunEscala (`gni > desde`, o sea el de abajo cuando está justo en el borde).
  let bordesArmados = 0;
  for (const t of ESCALA_GANANCIAS.slice(1)) {
    const haberes = plano(Math.round(((t.desde + 60_000_000) / 13) * 100) / 100);
    for (const delta of [-1, 0, 1]) {
      const otras = otrasParaGanancia(haberes, t.desde + delta, "dependencia");
      if (otras === null) continue;
      bordesArmados++;
      casos.push({
        nombre: `borde del tramo del ${t.alicuota * 100}% (${delta >= 0 ? "+" : ""}${delta})`,
        haberes,
        regimen: REGIMENES_CON_APORTE[0],
        ...base,
        otrasDeducciones: otras,
      });
    }
  }
  check(
    `se armaron los 3 bordes de los ${ESCALA_GANANCIAS.length - 1} tramos con «desde»`,
    bordesArmados === (ESCALA_GANANCIAS.length - 1) * 3,
    bordesArmados,
  );

  let filasComparadas = 0;
  const malas: string[] = [];
  for (const caso of casos) {
    cargar(libro, caso);
    const esperado = calcularPlanillaJubilados(entradaDe(caso));
    for (let i = 0; i < 12; i++) {
      const r = FILA_MES_INI + i;
      const f = esperado.filas[i];
      const pares: [string, number, number][] = [
        ["aguinaldo", libro.numero(HOJAS_JUB.anio, `${K.aguinaldo}${r}`), f.aguinaldo],
        ["haber mínimo", libro.numero(HOJAS_JUB.anio, `${K.haberMinimo}${r}`), f.haberMinimo],
        ["aporte obra social", libro.numero(HOJAS_JUB.anio, `${K.aporte}${r}`), f.aporteObraSocial],
        ["bruto acumulado", libro.numero(HOJAS_JUB.anio, `${K.brutoAcum}${r}`), f.brutoAcumulado],
        ["aportes acumulados", libro.numero(HOJAS_JUB.anio, `${K.aportesAcum}${r}`), f.aportesAcumulados],
        ["deducción acumulada", libro.numero(HOJAS_JUB.anio, `${K.deduccionAcum}${r}`), f.deduccionAcumulada],
        ["ganancia del período", libro.numero(HOJAS_JUB.anio, `${K.ganancia}${r}`), f.gniProporcional],
        ["proyección anual", libro.numero(HOJAS_JUB.anio, `${K.proyeccion}${r}`), f.gniExtrapolada],
        ["impuesto proyectado", libro.numero(HOJAS_JUB.anio, `${K.impuesto}${r}`), f.impuestoAnualProyectado],
        ["retención acumulada", libro.numero(HOJAS_JUB.anio, `${K.retencionAcum}${r}`), f.retencionAcumulada],
        ["retención del mes", libro.numero(HOJAS_JUB.anio, `${K.retencionMes}${r}`), f.retencionMes],
      ];
      for (const [que, enArchivo, enMotor] of pares) {
        filasComparadas++;
        if (!igual(enArchivo, enMotor)) {
          malas.push(`${caso.nombre} · ${MESES_DEL_ANIO[i]} · ${que}: archivo ${enArchivo} vs motor ${enMotor}`);
        }
      }
    }

    // Los renglones de «Mis datos» que la persona lee primero.
    const resumen: [string, number, number][] = [
      ["impuesto del año", libro.numero(HOJAS_JUB.datos, C.impuestoAnual), esperado.impuestoAnual],
      ["haberes brutos del año", libro.numero(HOJAS_JUB.datos, C.brutoAnual), esperado.brutoAnual],
      ["aporte de obra social del año", libro.numero(HOJAS_JUB.datos, C.aportesAnual), esperado.aportesAnual],
      ["ganancia sujeta a impuesto", libro.numero(HOJAS_JUB.datos, C.gniAnual), esperado.gniAnual],
      ["cargas de familia", libro.numero(HOJAS_JUB.datos, C.cargasFamilia), esperado.cargasFamilia],
      ["deducción específica del año", libro.numero(HOJAS_JUB.datos, C.especificaAnual), esperado.especificaAnual],
      ["camino alterno del art. 30", libro.numero(HOJAS_JUB.datos, C.alternativaAnual), esperado.alternativaAnual],
      [
        "retención del año según la planilla",
        libro.numero(HOJAS_JUB.datos, C.segunPlanilla),
        Math.round(esperado.filas.reduce((s, f) => s + f.retencionMes, 0) * 100) / 100,
      ],
    ];
    for (const [que, enArchivo, enMotor] of resumen) {
      filasComparadas++;
      if (!igual(enArchivo, enMotor)) malas.push(`${caso.nombre} · resumen · ${que}: archivo ${enArchivo} vs motor ${enMotor}`);
    }

    const rige = libro.valor(HOJAS_JUB.datos, C.cualRige);
    const diceEspecifica = String(rige).includes("específica");
    if (diceEspecifica !== esperado.aplicaEspecifica) {
      malas.push(`${caso.nombre} · qué deducción rige: archivo «${String(rige)}» vs motor ${esperado.aplicaEspecifica}`);
    }
  }
  check(
    `las ${filasComparadas.toLocaleString("es-AR")} comparaciones de ${casos.length} casos dan igual que el motor`,
    malas.length === 0,
    malas.slice(0, 12),
  );

  // ── 2b. Ninguna celda del libro queda en error ─────────────────────────────
  // Una referencia a una hoja que se renombró, un rango corrido o un INDEX fuera de tabla dan
  // #REF! o #VALUE! en el Excel del comprador, y los checks de arriba sólo miran las celdas que
  // nombran. Esta pasada recorre el libro entero con el último caso cargado.
  const conError: string[] = [];
  for (const hoja of libro.hojas) {
    const id = libro.hf.getSheetId(hoja)!;
    const { height, width } = libro.hf.getSheetDimensions(id);
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const v = libro.hf.getCellValue({ sheet: id, row, col });
        if (v !== null && typeof v === "object" && "value" in v) {
          conError.push(`${hoja}!r${row + 1}c${col + 1}: ${String((v as { value: unknown }).value)}`);
        }
      }
    }
  }
  check("ninguna celda del libro queda en error (#REF!, #VALUE!, #DIV/0!)", conError.length === 0, conError.slice(0, 10));

  // ── 3. El control contra los recibos ───────────────────────────────────────
  const conRecibos: Caso = {
    nombre: "control contra recibos",
    haberes: conMovilidad(4_000_000),
    regimen: REGIMENES_CON_APORTE[0],
    ...base,
    recibos: Array.from({ length: 12 }, () => 100_000),
  };
  cargar(libro, conRecibos);
  const esperadoRecibos = calcularPlanillaJubilados(entradaDe(conRecibos));
  const planillaAnual = Math.round(esperadoRecibos.filas.reduce((s, f) => s + f.retencionMes, 0) * 100) / 100;
  check(
    "la suma de los recibos del año es la que se cargó",
    igual(libro.numero(HOJAS_JUB.anio, `${K.recibo}${FILA_TOTALES}`), 1_200_000),
    libro.numero(HOJAS_JUB.anio, `${K.recibo}${FILA_TOTALES}`),
  );
  check(
    "la diferencia del año es recibos menos lo que corresponde",
    igual(libro.numero(HOJAS_JUB.datos, C.diferencia), Math.round((1_200_000 - planillaAnual) * 100) / 100),
    { archivo: libro.numero(HOJAS_JUB.datos, C.diferencia), motor: 1_200_000 - planillaAnual },
  );
  check(
    "la diferencia de un mes es su recibo menos su retención",
    igual(
      libro.numero(HOJAS_JUB.anio, `${K.diferencia}${FILA_MES_INI + 2}`),
      Math.round((100_000 - esperadoRecibos.filas[2].retencionMes) * 100) / 100,
    ),
  );
  check(
    "con los recibos en cero, el texto pide cargarlos",
    (() => {
      cargar(libro, { ...conRecibos, recibos: Array.from({ length: 12 }, () => 0) });
      return String(libro.valor(HOJAS_JUB.datos, C.queSignifica)).includes("Cargá");
    })(),
    libro.valor(HOJAS_JUB.datos, C.queSignifica),
  );

  // ── 4. El bono no entra en ninguna cuenta ─────────────────────────────────
  cargar(libro, conRecibos);
  const impuestoSinBono = libro.numero(HOJAS_JUB.datos, C.impuestoAnual);
  const aporteSinBono = libro.numero(HOJAS_JUB.datos, C.aportesAnual);
  libro.cargar(
    HOJAS_JUB.anio,
    Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`${K.bono}${FILA_MES_INI + i}`, 500_000])),
  );
  check(
    "el bono no cambia el impuesto ni el aporte: es no remunerativo",
    igual(libro.numero(HOJAS_JUB.datos, C.impuestoAnual), impuestoSinBono) &&
      igual(libro.numero(HOJAS_JUB.datos, C.aportesAnual), aporteSinBono),
  );

  // ── 5. El aguinaldo: nace como la mitad del mejor haber del semestre, y se puede pisar ────
  const libro2 = await abrirLibro(ARCHIVO);
  const subiendo = conMovilidad(3_500_000);
  cargar(libro2, { ...conRecibos, nombre: "aguinaldo", haberes: subiendo });
  check(
    "el aguinaldo de junio es la mitad del mejor haber del primer semestre",
    igual(libro2.numero(HOJAS_JUB.anio, `${K.aguinaldo}${FILA_MES_INI + 5}`), Math.round((Math.max(...subiendo.slice(0, 6)) / 2) * 100) / 100),
  );
  check(
    "el aguinaldo de diciembre es la mitad del mejor haber del segundo semestre",
    igual(libro2.numero(HOJAS_JUB.anio, `${K.aguinaldo}${FILA_MES_FIN}`), Math.round((Math.max(...subiendo.slice(6)) / 2) * 100) / 100),
  );
  const aguinaldoPropio = 1_111_111.11;
  libro2.cargar(HOJAS_JUB.anio, { [`${K.aguinaldo}${FILA_MES_INI + 5}`]: aguinaldoPropio });
  const propios = aguinaldosPorSemestre(subiendo);
  propios[5] = aguinaldoPropio;
  const esperadoPropio = calcularPlanillaJubilados({ ...entradaDe({ ...conRecibos, haberes: subiendo }), aguinaldos: propios });
  check(
    "si se pisa el aguinaldo con el del recibo, la planilla lo usa",
    igual(libro2.numero(HOJAS_JUB.datos, C.impuestoAnual), esperadoPropio.impuestoAnual),
    { archivo: libro2.numero(HOJAS_JUB.datos, C.impuestoAnual), motor: esperadoPropio.impuestoAnual },
  );

  // ── 6. Los desplegables son los del repo ──────────────────────────────────
  const vRegimen = libro.validacion(HOJAS_JUB.datos, C.regimen);
  check(
    "el desplegable de régimen ofrece las dos etiquetas de REGIMENES",
    REGIMENES_CON_APORTE.every((r) => String(vRegimen?.formulae?.[0] ?? "").includes(r.etiqueta)),
    vRegimen?.formulae,
  );
  for (const ref of [C.conyuge, C.otrosIngresos, C.bienesPersonales]) {
    const v = libro.validacion(HOJAS_JUB.datos, ref);
    check(`${ref} es un desplegable de Sí y No`, String(v?.formulae?.[0] ?? "") === `"${SI},${NO}"`, v?.formulae);
  }

  console.log("");
  if (fallas > 0) {
    console.error(`\n❌ check_planilla_ganancias_jubilados: ${fallas} falla(s)`);
    process.exit(1);
  }
  console.log(`✅ check_planilla_ganancias_jubilados: ${casos.length} casos y ${filasComparadas.toLocaleString("es-AR")} comparaciones OK`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
