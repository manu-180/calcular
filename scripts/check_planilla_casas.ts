// Verificación de la PLANILLA de Casas Particulares — abre el .xlsx que se entrega, evalúa sus
// fórmulas con HyperFormula y compara cada resultado contra los motores de las calculadoras
// gratis (calcularCasasParticulares y calcularAportes). Lo que compró el cliente y lo que ve
// gratis en calcular.ar tienen que ser el mismo número, al centavo.
//
// Correr con: npx tsx scripts/check_planilla_casas.ts  (o vía scripts/check-all.ts)

import path from "node:path";
import { existsSync } from "node:fs";
import { ESCALAS_POR_MES, escalaDe } from "../src/data/casas-particulares";
import { CONDICIONES, TABLA_APORTES } from "../src/data/aportes-casas-particulares";
import { calcularCasasParticulares, diasDeVacaciones } from "../src/lib/casas-particulares";
import { calcularAportes } from "../src/lib/aportes-casas-particulares";
import { ANUAL, ARCHIVO_CASAS, CELDAS, CONDICION_CORTA, HOJAS, MODALIDADES } from "./gen_planilla_casas";
import { abrirLibro } from "./evaluar_xlsx";

const ARCHIVO = path.join(process.cwd(), "private", ARCHIVO_CASAS);
let fallas = 0;
let casos = 0;

function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const igual = (a: number, b: number) => Math.abs(a - b) < 0.005;

async function main() {
  check("el archivo entregable existe", existsSync(ARCHIVO), ARCHIVO);
  if (!existsSync(ARCHIVO)) process.exit(1);
  const libro = await abrirLibro(ARCHIVO);
  const L = HOJAS.liquidador;

  check(
    "tiene todas las hojas prometidas en la landing",
    [...Object.values(HOJAS), "Fuentes"].every((h) => libro.hojas.includes(h)),
    libro.hojas,
  );

  // 1. ESCALA: cada importe de la hoja == el dato vivo, mes por mes.
  let malEscala = 0;
  const categorias = escalaDe(ESCALAS_POR_MES[0].id);
  ESCALAS_POR_MES.forEach((mes, j) => {
    const col = String.fromCharCode(69 + j); // E, F, …
    const escala = escalaDe(mes.id);
    let fila = 3;
    for (const cat of categorias) {
      const vivo = escala.find((c) => c.id === cat.id)!;
      for (const mod of ["con-retiro", "sin-retiro"] as const) {
        const hora = mod === "con-retiro" ? vivo.horaConRetiro : vivo.horaSinRetiro;
        const mesv = mod === "con-retiro" ? vivo.mesConRetiro : vivo.mesSinRetiro;
        for (const esperado of [hora, mesv]) {
          const crudo = libro.crudo(HOJAS.escala, `${col}${fila}`);
          if (esperado === null ? crudo !== null : crudo !== esperado) {
            malEscala++;
            if (malEscala <= 3) console.error(`     escala ${mes.id} fila ${fila}: archivo ${crudo} ≠ dato ${esperado}`);
          }
          fila++;
        }
      }
    }
  });
  check(`escala del archivo == src/data/casas-particulares.ts (${ESCALAS_POR_MES.length} meses)`, malEscala === 0);

  let malAportes = 0;
  let fila = 3;
  for (const cond of CONDICIONES) {
    for (const f of TABLA_APORTES[cond.id]) {
      const esperado = [f.total, f.obraSocial, f.sipa, f.art];
      ["D", "E", "F", "G"].forEach((col, i) => {
        const crudo = libro.crudo(HOJAS.aportes, `${col}${fila}`);
        if (esperado[i] === null ? crudo !== null : crudo !== esperado[i]) malAportes++;
      });
      fila++;
    }
  }
  check("tabla de aportes del archivo == src/data/aportes-casas-particulares.ts", malAportes === 0);

  // 2. NÚMEROS: las fórmulas del archivo dan lo mismo que la calculadora, en toda la matriz.
  const horasProbadas = [0, 8, 11.5, 12, 15.5, 16, 20, 30, 47.5, 48];
  const extrasProbados: [number, number][] = [[0, 0], [3, 2.5]];
  let malLiq = 0;
  for (const mes of ESCALAS_POR_MES) {
    for (const cat of categorias) {
      for (const mod of ["con-retiro", "sin-retiro"] as const) {
        for (const horas of horasProbadas) {
          for (const zona of [false, true]) {
            for (const [ex1, ex2] of extrasProbados) {
              casos++;
              libro.cargar(L, {
                [CELDAS.mes]: mes.etiqueta,
                [CELDAS.categoria]: cat.nombre,
                [CELDAS.modalidad]: MODALIDADES[mod],
                [CELDAS.horasSemanales]: horas,
                [CELDAS.zona]: zona ? "Sí" : "No",
                [CELDAS.extrasComunes]: ex1,
                [CELDAS.extrasFinde]: ex2,
              });
              const r = calcularCasasParticulares({
                mesId: mes.id,
                categoriaId: cat.id,
                modalidad: mod,
                horasSemanales: horas,
                zonaDesfavorable: zona,
                horasExtrasComunes: ex1,
                horasExtrasFinDeSemana: ex2,
              });
              const pares: [string, number, number][] = r
                ? [
                    ["valorHora", libro.numero(L, CELDAS.valorHora), r.valorHora],
                    ["minimoMensual", libro.numero(L, CELDAS.minimoMensual), r.minimoMensual],
                    ["horasMensuales", libro.numero(L, CELDAS.horasMensuales), r.horasMensuales],
                    ["basico", libro.numero(L, CELDAS.basico), r.basico],
                    ["extrasComunes", libro.numero(L, CELDAS.montoExtrasComunes), r.extrasComunes],
                    ["extrasFinDeSemana", libro.numero(L, CELDAS.montoExtrasFinde), r.extrasFinDeSemana],
                    ["total", libro.numero(L, CELDAS.total), r.total],
                    ["aguinaldo", libro.numero(L, CELDAS.aguinaldo), r.aguinaldoEstimado],
                  ]
                : [["total (combinación inexistente → 0)", libro.numero(L, CELDAS.total), 0]];
              const chequeo = String(libro.valor(L, CELDAS.chequeo));
              if (r === null && chequeo === "OK") pares.push(["chequeo avisa la combinación inexistente", 1, 0]);
              for (const [campo, archivo, motor] of pares) {
                if (!igual(archivo, motor)) {
                  malLiq++;
                  if (malLiq <= 5)
                    console.error(`     ${mes.id} ${cat.id} ${mod} ${horas}h zona=${zona} extras=${ex1}/${ex2} · ${campo}: archivo ${archivo} ≠ motor ${motor}`);
                }
              }
            }
          }
        }
      }
    }
  }
  check(`Liquidador == calcularCasasParticulares() en ${casos} casos`, malLiq === 0);

  // 3. APORTES: el bloque de ARCA del Liquidador == calcularAportes().
  let malApo = 0;
  let casosApo = 0;
  for (const cond of CONDICIONES) {
    for (const horas of [0, 5, 11.9, 12, 15.9, 16, 40, 48]) {
      casosApo++;
      libro.cargar(L, { [CELDAS.condicion]: CONDICION_CORTA[cond.id], [CELDAS.horasSemanales]: horas });
      const a = calcularAportes({ horasSemanales: horas, condicion: cond.id, cantidadTrabajadores: 1 });
      const pares: [string, number, number][] = [
        ["total ARCA", libro.numero(L, CELDAS.arcaTotal), a.totalPorTrabajador],
        ["ART", libro.numero(L, CELDAS.arcaArt), a.fila.art],
        ["falta obra social", libro.numero(L, CELDAS.faltaObraSocial), a.faltaParaObraSocial],
        ["falta jubilación", libro.numero(L, CELDAS.faltaJubilacion), a.faltaParaJubilacion],
        ["costo total", libro.numero(L, CELDAS.costoTotal), Math.round((libro.numero(L, CELDAS.total) + a.totalPorTrabajador) * 100) / 100],
      ];
      for (const [campo, archivo, motor] of pares) {
        if (!igual(archivo, motor)) {
          malApo++;
          console.error(`     ${cond.id} ${horas}h · ${campo}: archivo ${archivo} ≠ motor ${motor}`);
        }
      }
    }
  }
  check(`bloque ARCA == calcularAportes() en ${casosApo} casos`, malApo === 0);

  // 4. PAGOS DEL AÑO: aguinaldo = 50% del mejor mes del semestre; vacaciones por antigüedad.
  const A = HOJAS.anual;
  const sueldos = [410000, 415000, 420000, 470000, 430000, 440000, 450000, 455000, 520000, 460000, 465000, 470000];
  const carga: Record<string, number> = {};
  sueldos.forEach((v, i) => (carga[`B${ANUAL.primeraFila + i}`] = v));
  libro.cargar(A, carga);
  check("aguinaldo de junio = 50% del mejor sueldo ene-jun", igual(libro.numero(A, ANUAL.aguinaldoJunio), 235000));
  check("aguinaldo de diciembre = 50% del mejor sueldo jul-dic", igual(libro.numero(A, ANUAL.aguinaldoDiciembre), 260000));
  check("total anual de sueldos", igual(libro.numero(A, ANUAL.totalSueldos), sueldos.reduce((a, b) => a + b, 0)));
  let malVac = 0;
  for (const anios of [0, 1, 5, 5.5, 10, 10.5, 20, 21, 35]) {
    libro.cargar(A, { [ANUAL.antiguedad]: anios });
    if (libro.numero(A, ANUAL.diasVacaciones) !== diasDeVacaciones(anios)) malVac++;
  }
  check("días de vacaciones == diasDeVacaciones() (art. 29)", malVac === 0);

  // 5. RECIBO: toma los importes del Liquidador (no quedó apuntando a una celda corrida).
  libro.cargar(L, { [CELDAS.horasSemanales]: 20, [CELDAS.extrasComunes]: 2, [CELDAS.categoria]: categorias[4].nombre, [CELDAS.modalidad]: "Con retiro" });
  const totalLiq = libro.numero(L, CELDAS.total);
  const totalRecibo = libro.numero(HOJAS.recibo, "B15");
  check("el recibo muestra el total del Liquidador", totalLiq > 0 && igual(totalLiq, totalRecibo), { totalLiq, totalRecibo });

  // 6. Los valores por defecto del Liquidador son opciones válidas de sus propios desplegables.
  const validaciones = [CELDAS.mes, CELDAS.categoria, CELDAS.modalidad, CELDAS.condicion].map((ref) => {
    const v = libro.validacion(L, ref);
    const opciones = String(v?.formulae?.[0] ?? "").replace(/^"|"$/g, "").split(",");
    return { ref, opciones, valor: String(libro.crudo(L, ref)) };
  });
  check(
    "cada valor por defecto está en su desplegable",
    validaciones.every((v) => v.opciones.includes(v.valor)),
    validaciones.filter((v) => !v.opciones.includes(v.valor)),
  );

  console.log(`\n${fallas === 0 ? "✅" : "❌"} planilla Casas Particulares: ${fallas} fallas`);
  process.exit(fallas === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
