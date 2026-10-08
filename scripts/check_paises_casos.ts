// Corre todos los src/paises/<m>/calculadoras/*.casos.ts contra la función real y los datos reales
// a la fecha de cada caso. Falla si una calculadora que no es borrador no tiene casos, si ninguno de
// sus casos usa los datos del repo (todos pisan valores), si un caso no da dentro de la tolerancia,
// o si una fila de resultado pide una clave que calcular() no devuelve.
// Uso: npx tsx scripts/check_paises_casos.ts [mercado]
import path from "node:path";
import { crearContexto, ErrorEntrada, type CasosCalculadora } from "../src/motor/calculo";
import { formatearFilas } from "../src/motor/formulario";
import { resolverValores } from "../src/motor/registro";
import type { ContextoSerializado, PaisDefinido, ResultadoBase, ValorResuelto } from "../src/motor/tipos";
import { esFechaISO } from "../src/motor/vigencia";
import { archivosBajo, cargarPaises, DIR_PAISES, importar, rel } from "./paises_comun";

const TOLERANCIA = 0.005;

async function main() {
  const filtro = process.argv[2];
  const paises = new Map<string, PaisDefinido>();
  for (const c of await cargarPaises()) if (c.pais) paises.set(c.carpeta, c.pais);

  const fallas: string[] = [];
  const conCasos = new Set<string>();
  const conDatosReales = new Set<string>();
  let total = 0;

  const archivos = archivosBajo(DIR_PAISES, /\.casos\.ts$/).filter((f) => !filtro || rel(f).startsWith(`src/paises/${filtro}/`));
  for (const archivo of archivos) {
    const donde = rel(archivo);
    const carpeta = path.relative(DIR_PAISES, archivo).split(path.sep)[0];
    let modulo: CasosCalculadora;
    try {
      modulo = await importar<CasosCalculadora>(archivo);
    } catch (err) {
      fallas.push(`${donde}: no carga (${(err as Error).message})`);
      continue;
    }
    const def = modulo?.calculadora;
    if (!def || !Array.isArray(modulo.casos)) {
      fallas.push(`${donde}: tiene que exportar por defecto definirCasos(calculadora, [...])`);
      continue;
    }
    const pais = paises.get(carpeta);
    if (!pais) {
      fallas.push(`${donde}: el país ${carpeta} no carga (ver check_paises)`);
      continue;
    }
    if (def.mercado !== pais.mercado.codigo) fallas.push(`${donde}: la calculadora es de ${def.mercado}`);
    if (!pais.calculadoras.some((c) => c.definicion === def)) fallas.push(`${donde}: ${def.id} no está en las calculadoras de src/paises/${carpeta}/index.ts`);
    if (modulo.casos.length === 0) fallas.push(`${donde}: sin casos`);
    conCasos.add(def.id);

    modulo.casos.forEach((caso, i) => {
      total++;
      const id = `${donde} caso ${i + 1} «${caso.nombre}»`;
      if (!caso.nombre?.trim()) fallas.push(`${id}: sin nombre`);
      if (!esFechaISO(caso.fecha)) return void fallas.push(`${id}: fecha inválida`);
      const o = caso.origen;
      if (!o || !o.detalle?.trim()) fallas.push(`${id}: origen.detalle vacío (de dónde sale el número esperado)`);
      if (o?.tipo === "oficial" && !String(o.url).startsWith("https://")) fallas.push(`${id}: un caso oficial necesita la url https del ejemplo`);
      if (!caso.esperaError && (!caso.esperado || Object.keys(caso.esperado).length === 0)) fallas.push(`${id}: sin esperado`);

      const resueltos = resolverValores(pais, def, caso.fecha);
      const pisados = (caso.valores ?? {}) as Record<string, ValorResuelto>;
      const valores: Record<string, ValorResuelto> = resueltos.ok ? { ...resueltos.valores, ...pisados } : { ...pisados };
      const faltan = Object.keys(def.requiere).filter((k) => !(k in valores));
      if (faltan.length) {
        return void fallas.push(`${id}: sin valor verificado al ${caso.fecha} para ${faltan.join(", ")}${resueltos.ok ? "" : ` (${resueltos.motivos.join("; ")})`}`);
      }
      if (!caso.valores) conDatosReales.add(def.id);

      const contexto = crearContexto(pais.mercado, caso.fecha, def);
      let r: ResultadoBase;
      try {
        r = def.calcular(caso.entrada as never, valores as never, contexto);
      } catch (err) {
        if (caso.esperaError && err instanceof ErrorEntrada) return;
        return void fallas.push(`${id}: ${caso.esperaError ? "esperaba ErrorEntrada y salió" : "tiró"} ${(err as Error).name}: ${(err as Error).message}`);
      }
      if (caso.esperaError) return void fallas.push(`${id}: esperaba ErrorEntrada y calculó`);

      for (const fila of def.resultado) if (!(fila.clave in r)) fallas.push(`${id}: la fila "${fila.clave}" no está en lo que devuelve calcular()`);
      const tol = caso.tolerancia ?? TOLERANCIA;
      for (const [k, esperado] of Object.entries(caso.esperado ?? {})) {
        const real = r[k];
        if (typeof esperado === "number") {
          if (typeof real !== "number" || !Number.isFinite(real) || Math.abs(real - esperado) > tol) fallas.push(`${id}: ${k} dio ${String(real)}, esperado ${esperado} (tolerancia ${tol})`);
        } else if (JSON.stringify(real) !== JSON.stringify(esperado)) {
          fallas.push(`${id}: ${k} dio ${JSON.stringify(real)}, esperado ${JSON.stringify(esperado)}`);
        }
      }
      const ctxSer: ContextoSerializado = {
        fecha: caso.fecha,
        mercado: pais.mercado.codigo,
        locale: pais.mercado.locale,
        idioma: pais.mercado.idioma,
        trato: pais.mercado.trato,
        moneda: pais.mercado.monedas[0],
        redondeo: def.redondeo ?? pais.mercado.redondeo,
        regiones: pais.mercado.regiones ?? [],
        ...(pais.mercado.simbolos ? { simbolos: pais.mercado.simbolos } : {}),
      };
      try {
        formatearFilas(def, r, ctxSer);
      } catch (err) {
        fallas.push(`${id}: el resultado no se puede mostrar (${(err as Error).message})`);
      }
    });
  }

  for (const [carpeta, pais] of paises) {
    if (filtro && carpeta !== filtro) continue;
    for (const { definicion: d } of pais.calculadoras) {
      if (d.estado === "borrador") continue;
      if (!conCasos.has(d.id)) fallas.push(`${d.id} (${d.estado}) no tiene src/paises/${carpeta}/calculadoras/${d.slug}.casos.ts`);
      else if (!conDatosReales.has(d.id)) fallas.push(`${d.id}: al menos un caso tiene que usar los datos del repo (sin "valores")`);
    }
  }

  for (const f of fallas) console.error(`❌ ${f}`);
  console.log(fallas.length ? `${fallas.length} FALLAS en ${total} casos` : `TODO OK: ${total} casos en ${archivos.length} archivos`);
  process.exit(fallas.length ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
