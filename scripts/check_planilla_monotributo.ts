// Verificación de la PLANILLA de Monotributo — abre el .xlsx que se entrega, evalúa sus fórmulas
// y compara categoría, parámetro que manda, margen y cuota contra el motor del sitio
// (categoriaPorParametros + cuotaMensual). Incluye los bordes que más duelen: facturar
// exactamente el tope de una categoría, un peso más, y superar el tope de K.
//
// Correr con: npx tsx scripts/check_planilla_monotributo.ts  (o vía scripts/check-all.ts)

import path from "node:path";
import { existsSync } from "node:fs";
import { CATEGORIAS } from "../src/data/monotributo";
import { categoriaPorParametros, cuotaMensual, type Actividad } from "../src/lib/monotributo";
import { ACTIVIDADES, ARCHIVO_MONOTRIBUTO, CELDAS_MONO as C, HOJAS_MONO, mesesEvaluados } from "./gen_planilla_monotributo";
import { abrirLibro } from "./evaluar_xlsx";

const ARCHIVO = path.join(process.cwd(), "private", ARCHIVO_MONOTRIBUTO);
let fallas = 0;

function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const igual = (a: number, b: number) => Math.abs(a - b) < 0.005;
const MANDA_TXT = { ingresos: "La facturación", superficie: "La superficie", energia: "La energía", alquileres: "Los alquileres" } as const;

async function main() {
  check("el archivo entregable existe", existsSync(ARCHIVO), ARCHIVO);
  if (!existsSync(ARCHIVO)) process.exit(1);
  const libro = await abrirLibro(ARCHIVO);
  const H = HOJAS_MONO.control;

  check("tiene las hojas prometidas", [...Object.values(HOJAS_MONO), "Fuentes"].every((h) => libro.hojas.includes(h)), libro.hojas);

  // 1. TABLA: cada importe de la hoja de categorías == src/data/monotributo.ts.
  let malTabla = 0;
  CATEGORIAS.forEach((c, i) => {
    const r = 3 + i;
    const esperado = [c.cat, c.ingresosBrutosMax, c.superficieM2, c.energiaKw, c.alquileresMax, c.precioUnitarioMax, c.impuestoServicios, c.impuestoVenta, c.sipa, c.obraSocial, c.totalServicios, c.totalVenta];
    esperado.forEach((v, j) => {
      if (libro.crudo(HOJAS_MONO.categorias, `${String.fromCharCode(65 + j)}${r}`) !== v) malTabla++;
    });
  });
  check("tabla de categorías del archivo == src/data/monotributo.ts", malTabla === 0);

  // 2. Los meses precargados son los de la próxima recategorización según el sitio.
  const meses = mesesEvaluados();
  check(
    "los 12 meses precargados == los que evalúa la próxima recategorización",
    meses.every((m, i) => libro.crudo(H, `A${C.primeraFilaMes + i}`) === m),
  );

  // 3. MATRIZ contra el motor.
  const topes = CATEGORIAS.map((c) => c.ingresosBrutosMax);
  const facturaciones = [0, 1, ...topes, ...topes.map((t) => t + 1), topes[3] * 0.5];
  const fisicos: [number, number, number][] = [
    [0, 0, 0],
    [CATEGORIAS[4].superficieM2, 0, 0],
    [CATEGORIAS[4].superficieM2 + 1, 0, 0],
    [0, CATEGORIAS[6].energiaKw + 1, 0],
    [0, 0, CATEGORIAS[2].alquileresMax + 1],
    [CATEGORIAS[10].superficieM2 + 1, 0, 0],
  ];
  let casos = 0;
  let mal = 0;
  for (const actividad of ["servicios", "venta"] as Actividad[]) {
    for (const dep of [false, true]) {
      for (const actual of ["A", "E", "K"]) {
        for (const ingresos of facturaciones) {
          for (const [sup, kw, alq] of fisicos) {
            casos++;
            // La facturación se reparte en los 12 meses con centavos, como la cargaría alguien.
            const porMes = Math.floor((ingresos / 12) * 100) / 100;
            const carga: Record<string, number | string> = {
              [C.actividad]: ACTIVIDADES[actividad],
              [C.dependencia]: dep ? "Sí" : "No",
              [C.categoriaActual]: actual,
              [C.superficie]: sup,
              [C.energia]: kw,
              [C.alquileres]: alq,
            };
            for (let i = 0; i < 12; i++) carga[`B${C.primeraFilaMes + i}`] = i === 11 ? Math.round((ingresos - porMes * 11) * 100) / 100 : porMes;
            libro.cargar(H, carga);

            const suma = libro.numero(H, C.facturacion12);
            const r = categoriaPorParametros({ ingresos: suma, superficieM2: sup, energiaKw: kw, alquileres: alq });
            const pares: [string, unknown, unknown][] = [["facturación 12 meses", suma, ingresos]];
            if (r.tipo === "excedido") {
              pares.push(["categoría", libro.valor(H, C.categoria), "Excluido del régimen"]);
              pares.push(["parámetro que excluye", libro.valor(H, C.manda), MANDA_TXT[r.parametro]]);
              pares.push(["cuota", libro.numero(H, C.cuota), 0]);
            } else {
              const cuota = cuotaMensual(r.categoria, actividad, dep).total;
              const cuotaActual = cuotaMensual(CATEGORIAS.find((c) => c.cat === actual)!, actividad, dep).total;
              const iNueva = CATEGORIAS.indexOf(r.categoria);
              const iActual = CATEGORIAS.findIndex((c) => c.cat === actual);
              pares.push(
                ["categoría", libro.valor(H, C.categoria), r.categoria.cat],
                ["categoría por facturación", libro.valor(H, C.catIngresos), r.porIngresos.cat],
                ["parámetro que manda", libro.valor(H, C.manda), MANDA_TXT[r.manda]],
                ["margen", libro.numero(H, C.margen), Math.round((r.categoria.ingresosBrutosMax - suma) * 100) / 100],
                ["cuota", libro.numero(H, C.cuota), Math.round(cuota * 100) / 100],
                ["cuota actual", libro.numero(H, C.cuotaActual), Math.round(cuotaActual * 100) / 100],
                ["movimiento", libro.valor(H, C.movimiento), iNueva > iActual ? "Subís de categoría" : iNueva < iActual ? "Bajás de categoría" : "Te mantenés en la misma"],
              );
            }
            for (const [campo, archivo, motor] of pares) {
              const ok = typeof motor === "number" ? igual(archivo as number, motor) : archivo === motor;
              if (!ok) {
                mal++;
                if (mal <= 6) console.error(`     ${actividad} dep=${dep} actual=${actual} ingresos=${ingresos} fis=${sup}/${kw}/${alq} · ${campo}: archivo ${JSON.stringify(archivo)} ≠ motor ${JSON.stringify(motor)}`);
              }
            }
          }
        }
      }
    }
  }
  check(`«Mi monotributo» == categoriaPorParametros() + cuotaMensual() en ${casos} casos`, mal === 0);

  // 4. Precio unitario: solo en venta, y solo por encima del máximo de ARCA.
  const maxPrecio = CATEGORIAS[0].precioUnitarioMax;
  const precio = (act: Actividad, p: number) => {
    libro.cargar(H, { [C.actividad]: ACTIVIDADES[act], [C.precioUnitario]: p });
    return String(libro.valor(H, C.precioControl));
  };
  check("precio unitario en el máximo: dentro", precio("venta", maxPrecio) === "Dentro del máximo");
  check("precio unitario un peso arriba en venta: avisa exclusión", precio("venta", maxPrecio + 1).startsWith("Supera"));
  check("precio unitario no aplica a servicios", precio("servicios", maxPrecio * 10) === "Dentro del máximo");

  console.log(`\n${fallas === 0 ? "✅" : "❌"} planilla Monotributo: ${fallas} fallas`);
  process.exit(fallas === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
