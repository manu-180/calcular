// Verificación de la PLANILLA de UOCRA (CCT 76/75) — el segundo producto pago.
//
// POR QUÉ ESTE CHECK ABRE EL ARCHIVO Y NO SOLO LA LÓGICA:
// el 8/8/2026 la primera compradora del imperio recibió un .xlsx con el básico de julio
// equivocado. El check de entonces verificaba una RÉPLICA en TypeScript de las fórmulas
// contra los datos vivos, pero nunca abría el archivo que se entregaba: la escala se
// actualizó, el check siguió verde y el entregable quedó seis semanas viejo.
// Acá se verifican las DOS cosas sobre el archivo real:
//
//   1. ESCALA: cada jornal, sueldo de sereno y SNR del .xlsx == el dato vivo de
//      src/data/convenios/uocra.ts. Si alguien carga septiembre y no regenera, esto se pone
//      rojo y el deploy no sale.
//   2. FÓRMULAS: las tasas hardcodeadas dentro de las fórmulas del Liquidador (20% de
//      asistencia, 17% de aportes, 2% solidario, 3% sobre la SNR) == las constantes vivas.
//      Es el único drift que la escala no atrapa.
//   3. NÚMEROS: una réplica en TS de esas fórmulas da EXACTAMENTE lo mismo que
//      calcularUocra() en toda la matriz. Lo que compró el cliente y lo que ve gratis en
//      calcular.ar tienen que ser el mismo número, o el moat (datos verificados) es humo.
//
// Correr con: npx tsx scripts/check_planilla_uocra.ts  (o vía scripts/check-all.ts)

import ExcelJS from "exceljs";
import path from "node:path";
import { existsSync } from "node:fs";
import {
  CATEGORIAS_UOCRA,
  MESES_UOCRA,
  UOCRA_APORTES_REMUNERATIVO,
  UOCRA_APORTES_SNR,
  UOCRA_APORTE_SOLIDARIO,
  UOCRA_ASISTENCIA_PERFECTA,
  UOCRA_HORAS_MES_PROMEDIO,
  ZONAS_UOCRA,
  type CategoriaUocraId,
  type ZonaUocraId,
} from "../src/data/convenios/uocra";
import { calcularUocra } from "../src/lib/convenios";

const ARCHIVO = path.join(process.cwd(), "private", "planilla-uocra-2026.xlsx");

let fallas = 0;

function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

function num(v: unknown): number | null {
  if (typeof v === "number") return v;
  if (v && typeof v === "object" && "result" in (v as object)) {
    const r = (v as { result?: unknown }).result;
    return typeof r === "number" ? r : null;
  }
  return null;
}

function texto(v: unknown): string {
  return v == null ? "" : String(v).trim();
}

function formulaDe(v: unknown): string {
  if (v && typeof v === "object" && "formula" in (v as object)) {
    return String((v as { formula?: unknown }).formula ?? "");
  }
  return "";
}

// Réplica en TS de las fórmulas del Liquidador (hoja 3 del .xlsx). Espejo de
// scripts/gen_planilla_uocra.ts: si cambian las fórmulas, cambia esto — y al revés.
function planillaLiquidaUocra(p: {
  jornalOMensual: number;
  esMensual: boolean;
  horasMes: number;
  snr: number;
  conAsistencia: boolean;
  conAporteSindical: boolean;
}): { bruto: number; neto: number } {
  const basico = p.esMensual ? p.jornalOMensual : p.jornalOMensual * p.horasMes; // B15
  const asistencia = p.conAsistencia ? basico * UOCRA_ASISTENCIA_PERFECTA : 0; // B16
  const totalRem = basico + asistencia; // B17
  const bruto = totalRem + p.snr; // B19
  const tasaRem = UOCRA_APORTES_REMUNERATIVO + (p.conAporteSindical ? UOCRA_APORTE_SOLIDARIO : 0);
  const aportes = totalRem * tasaRem + p.snr * UOCRA_APORTES_SNR; // -B20
  return { bruto, neto: bruto - aportes }; // B19, B21
}

async function main(): Promise<void> {
  if (!existsSync(ARCHIVO)) {
    console.error(`FAIL falta el entregable: ${ARCHIVO}`);
    console.error("     regeneralo con: npx -y tsx scripts/gen_planilla_uocra.ts");
    console.error("\n1 FALLAS");
    process.exit(1);
  }

  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(ARCHIVO);

  const escala = wb.worksheets.find((w) => /^Escala/.test(w.name));
  const liq = wb.worksheets.find((w) => /^Liquidador/.test(w.name));
  const fuentes = wb.worksheets.find((w) => /^Fuentes/.test(w.name));
  const instr = wb.worksheets.find((w) => /^Instrucciones/.test(w.name));

  check("el .xlsx tiene hoja Instrucciones", !!instr);
  check(`el .xlsx tiene hoja de escala (encontré "${escala?.name ?? "—"}")`, !!escala);
  check("el .xlsx tiene hoja Liquidador", !!liq);
  check("el .xlsx tiene hoja Fuentes", !!fuentes);
  if (!escala || !liq) {
    console.error(`\n${fallas} FALLAS`);
    process.exit(1);
  }

  // ── Índice de la hoja Escala ────────────────────────────────────────────────
  // Layout: A=Clave, B=Categoría, C=Zona, D..=un mes por columna. Fila 2 = encabezados.
  const FILA_HEADER = 2;
  const COL_MES_INI = 4; // D

  const mesesArchivo: string[] = [];
  for (let c = COL_MES_INI; c <= escala.columnCount; c++) {
    const t = texto(escala.getRow(FILA_HEADER).getCell(c).value);
    if (t) mesesArchivo.push(t);
  }

  const mesesEsperados = MESES_UOCRA.map((m) => m.etiqueta);
  const faltantes = mesesEsperados.filter((m) => !mesesArchivo.includes(m));
  const sobrantes = mesesArchivo.filter((m) => !mesesEsperados.includes(m));

  check(
    `el archivo cubre los ${mesesEsperados.length} meses publicados en calcular.ar`,
    faltantes.length === 0,
    faltantes.length
      ? { faltanEnElArchivo: faltantes, pista: "regenerá: npx -y tsx scripts/gen_planilla_uocra.ts" }
      : undefined,
  );
  check("el archivo no trae meses que el sitio ya no publica", sobrantes.length === 0, sobrantes.length ? { sobran: sobrantes } : undefined);

  // Mapa clave → fila (las claves son "J|Categoría|Zona" y "S|Categoría|Zona").
  const filaPorClave = new Map<string, number>();
  escala.eachRow((row, i) => {
    if (i <= FILA_HEADER) return;
    const clave = texto(row.getCell(1).value);
    if (clave) filaPorClave.set(clave, i);
  });

  // ── 1. Escala: jornal / sueldo del sereno == dato vivo ──────────────────────
  let comparados = 0;
  const drift: Array<Record<string, unknown>> = [];

  for (const cat of CATEGORIAS_UOCRA) {
    for (const zona of ZONAS_UOCRA) {
      const claveJ = `J|${cat.nombre}|${zona.nombre}`;
      const claveS = `S|${cat.nombre}|${zona.nombre}`;
      const filaJ = filaPorClave.get(claveJ);
      const filaS = filaPorClave.get(claveS);
      if (filaJ === undefined) drift.push({ clave: claveJ, problema: "no está en el archivo" });
      if (filaS === undefined) drift.push({ clave: claveS, problema: "no está en el archivo" });

      for (const mes of MESES_UOCRA) {
        const col = mesesArchivo.indexOf(mes.etiqueta);
        if (col === -1) continue; // ya reportado como mes faltante
        const celda = COL_MES_INI + col;

        if (filaJ !== undefined) {
          const enArchivo = num(escala.getRow(filaJ).getCell(celda).value);
          const enSitio = cat.mensual
            ? mes.serenoMensual[zona.id]
            : mes.jornales[cat.id as Exclude<CategoriaUocraId, "sereno">][zona.id];
          comparados++;
          if (enArchivo === null || Math.abs(enArchivo - enSitio) > 0.5) {
            if (drift.length < 6)
              drift.push({
                fila: claveJ,
                mes: mes.etiqueta,
                enElArchivoQueSeVende: enArchivo,
                enCalcularAr: enSitio,
              });
          }
        }

        if (filaS !== undefined) {
          const enArchivo = num(escala.getRow(filaS).getCell(celda).value);
          const enSitio = mes.snr[cat.id][zona.id];
          comparados++;
          if (enArchivo === null || Math.abs(enArchivo - enSitio) > 0.5) {
            if (drift.length < 6)
              drift.push({
                fila: claveS,
                mes: mes.etiqueta,
                enElArchivoQueSeVende: enArchivo,
                enCalcularAr: enSitio,
              });
          }
        }
      }
    }
  }

  // `comparados > 0` no es decorativo: si las claves del archivo no matchean con las que
  // arma este check, el loop no compara NADA y el verde sería vacuo — que es peor que un rojo.
  check(
    `los ${comparados} valores del .xlsx coinciden con la escala viva de calcular.ar`,
    comparados > 0 && drift.length === 0,
    drift.length
      ? { primeros: drift, pista: "el entregable quedó viejo: npx -y tsx scripts/gen_planilla_uocra.ts" }
      : comparados === 0
        ? { problema: "no se comparó ni un valor — las claves del archivo no coinciden con las del sitio" }
        : undefined,
  );

  // ── 2. Las tasas dentro de las fórmulas == las constantes vivas ─────────────
  // Único drift que la escala no atrapa: cambia UOCRA_APORTES_REMUNERATIVO en el sitio y la
  // planilla sigue descontando la tasa vieja sin que nada se ponga rojo.
  const fAsistencia = formulaDe(liq.getCell("B16").value);
  const fAportes = formulaDe(liq.getCell("B20").value);
  const fSnr = formulaDe(liq.getCell("B18").value);

  check(
    `la fórmula de asistencia perfecta usa ${UOCRA_ASISTENCIA_PERFECTA} (B16)`,
    fAsistencia.includes(String(UOCRA_ASISTENCIA_PERFECTA)),
    { formulaEnElArchivo: fAsistencia },
  );
  check(
    `la fórmula de aportes usa ${UOCRA_APORTES_REMUNERATIVO} / ${UOCRA_APORTE_SOLIDARIO} / ${UOCRA_APORTES_SNR} (B20)`,
    fAportes.includes(String(UOCRA_APORTES_REMUNERATIVO)) &&
      fAportes.includes(String(UOCRA_APORTE_SOLIDARIO)) &&
      fAportes.includes(String(UOCRA_APORTES_SNR)),
    { formulaEnElArchivo: fAportes },
  );
  check("la SNR del Liquidador sale de la hoja Escala, no de un número pegado (B18)", /D9|Escala/.test(fSnr), {
    formulaEnElArchivo: fSnr,
  });

  // ── 3. La planilla da los MISMOS números que la calculadora gratis ──────────
  const HORAS = [UOCRA_HORAS_MES_PROMEDIO, 160];
  let casos = 0;
  let maxDiffBruto = 0;
  let maxDiffNeto = 0;
  let primerFallo: unknown = null;

  for (const mes of MESES_UOCRA) {
    for (const cat of CATEGORIAS_UOCRA) {
      for (const zona of ZONAS_UOCRA) {
        const jornalOMensual = cat.mensual
          ? mes.serenoMensual[zona.id]
          : mes.jornales[cat.id as Exclude<CategoriaUocraId, "sereno">][zona.id];
        for (const horasMes of HORAS) {
          for (const conAsistencia of [false, true]) {
            for (const conAporteSindical of [false, true]) {
              casos++;
              const web = calcularUocra({
                mesId: mes.id,
                categoriaId: cat.id,
                zonaId: zona.id as ZonaUocraId,
                horasMes,
                conAsistencia,
                conAporteSindical,
              });
              if (!web) {
                if (!primerFallo) primerFallo = { motivo: "web null", mes: mes.id, cat: cat.id, zona: zona.id };
                fallas++;
                continue;
              }
              const pla = planillaLiquidaUocra({
                jornalOMensual,
                esMensual: cat.mensual,
                horasMes,
                snr: mes.snr[cat.id][zona.id],
                conAsistencia,
                conAporteSindical,
              });
              const dB = Math.abs(web.bruto - pla.bruto);
              const dN = Math.abs(web.neto - pla.neto);
              maxDiffBruto = Math.max(maxDiffBruto, dB);
              maxDiffNeto = Math.max(maxDiffNeto, dN);
              if (dB >= 0.5 || dN >= 0.5) {
                if (!primerFallo)
                  primerFallo = {
                    mes: mes.id,
                    cat: cat.id,
                    zona: zona.id,
                    horasMes,
                    conAsistencia,
                    conAporteSindical,
                    webBruto: web.bruto,
                    plaBruto: pla.bruto,
                    webNeto: web.neto,
                    plaNeto: pla.neto,
                  };
                fallas++;
              }
            }
          }
        }
      }
    }
  }

  check(
    `planilla == calcular.ar en los ${casos} casos (bruto y neto, ±$0,50)`,
    primerFallo === null,
    primerFallo,
  );
  check(`diferencia máxima de bruto < $0,01 (fue $${maxDiffBruto.toExponential(2)})`, maxDiffBruto < 0.01);
  check(`diferencia máxima de neto < $0,01 (fue $${maxDiffNeto.toExponential(2)})`, maxDiffNeto < 0.01);

  // ── 4. Caso testigo con números escritos a mano ─────────────────────────────
  // Oficial, Zona A, agosto 2026, jornada completa, con asistencia, sin aporte solidario.
  // Agosto es el mes trampa: absorbió TODA la SNR al básico (snr = 0). Si alguien
  // "arregla" el cero pensando que es un faltante, este caso se pone rojo.
  {
    const jornal = 6_348; // agosto 2026, oficial, zona A
    const basico = jornal * UOCRA_HORAS_MES_PROMEDIO;
    const brutoEsperado = basico * (1 + UOCRA_ASISTENCIA_PERFECTA);
    const netoEsperado = brutoEsperado - brutoEsperado * UOCRA_APORTES_REMUNERATIVO;
    const web = calcularUocra({
      mesId: "agosto-2026",
      categoriaId: "oficial",
      zonaId: "a",
      horasMes: UOCRA_HORAS_MES_PROMEDIO,
      conAsistencia: true,
      conAporteSindical: false,
    })!;
    check(
      "testigo: Oficial Zona A agosto-2026 c/asistencia → bruto y neto a mano coinciden",
      Math.abs(web.bruto - brutoEsperado) < 0.5 && Math.abs(web.neto - netoEsperado) < 0.5,
      { webBruto: web.bruto, esperadoBruto: brutoEsperado, webNeto: web.neto, esperadoNeto: netoEsperado },
    );
    check("testigo: agosto-2026 no tiene SNR (se absorbió al jornal)", web.snr === 0, { snr: web.snr });
  }

  console.log(fallas === 0 ? "\nTODO OK" : `\n${fallas} FALLAS`);
  process.exit(fallas === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error("FAIL error leyendo el entregable", e);
  console.error("\n1 FALLAS");
  process.exit(1);
});
