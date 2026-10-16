// Corre todos los src/paises/<m>/calculadoras/*.casos.ts contra la función real y los datos reales
// a la fecha de cada caso. Falla si una calculadora que no es borrador no tiene casos, si ninguno de
// sus casos usa los datos del repo (todos pisan valores), si un caso no da dentro de la tolerancia,
// o si una fila de resultado pide una clave que calcular() no devuelve.
// Uso: npx tsx scripts/check_paises_casos.ts [mercado]
import path from "node:path";
import { crearContexto, ErrorEntrada, type CasosCalculadora } from "../src/motor/calculo";
import { formatearFilas } from "../src/motor/formulario";
import { esUniversal, resolverValores } from "../src/motor/registro";
import type { ContextoSerializado, DefinicionCalculadora, PaisDefinido, ResultadoBase, ValorResuelto } from "../src/motor/tipos";
import { esFechaISO } from "../src/motor/vigencia";
import { archivosBajo, cargarPaises, DIR_PAISES, importar, rel } from "./paises_comun";

const TOLERANCIA = 0.005;

// Calculadoras cuyo resultado sale de un sueldo y que con sueldo 0 tienen que pedirlo en vez de
// calcular un piso legal o un auxilio sin base (en Colombia daba neto 109.023 y liquidación 284.043).
const SUELDO_CERO: Readonly<Record<string, string>> = {
  "co.liquidacion": "salario",
  "co.salario-neto": "salario",
  "co.prima-de-servicios": "salario",
  "co.cesantias": "salario",
  "co.empleada-domestica": "salario",
  "co.costo-de-un-empleado": "salario",
  "co.salario-integral": "salario",
  "co.incapacidad": "salario",
  "co.aportes-seguridad-social": "salario",
  "co.auxilio-de-transporte": "salario",
  "co.seguridad-social-independientes": "ingreso",
  "co.pension-de-vejez": "ibl",
  "co.retencion-en-la-fuente": "salario",
  "co.retencion-honorarios": "honorarios",
  "ec.sueldo-neto": "sueldo",
  "ec.costo-empleador": "sueldo",
  "ec.aportes-iess": "sueldo",
  "ec.cesantia-iess": "sueldo",
  "gt.costo-patronal": "salario",
  "gt.trabajadoras-de-casa-particular": "salario",
  "pe.trabajadora-del-hogar": "sueldo",
  "pe.costo-laboral": "sueldo",
  "pe.essalud": "remuneracion",
  "pe.trabajo-nocturno": "sueldo",
  "py.costo-empleador": "salario",
  "py.bonificacion-familiar": "salario",
  "cr.riesgos-del-trabajo": "salario",
  "mx.subsidio-al-empleo": "sueldo",
  "cl.seguro-de-cesantia": "promedio",
};

async function main() {
  const filtro = process.argv[2];
  const paises = new Map<string, PaisDefinido>();
  for (const c of await cargarPaises()) if (c.pais) paises.set(c.carpeta, c.pais);

  const fallas: string[] = [];
  const conCasos = new Set<string>();
  const conDatosReales = new Set<string>();
  const conCero = new Set(Object.keys(SUELDO_CERO));
  const casosPorId = new Map<string, CasosCalculadora>();
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
    casosPorId.set(def.id, modulo);

    const campoCero = SUELDO_CERO[def.id];
    const base = modulo.casos.find((c) => !c.esperaError);
    if (campoCero && base) {
      total++;
      const id = `${donde} con ${campoCero} = 0`;
      const resueltos = resolverValores(pais, def, base.fecha);
      const valores: Record<string, ValorResuelto> = resueltos.ok ? { ...resueltos.valores, ...((base.valores ?? {}) as Record<string, ValorResuelto>) } : {};
      try {
        def.calcular({ ...(base.entrada as object), [campoCero]: 0 } as never, valores as never, crearContexto(pais.mercado, base.fecha, def));
        fallas.push(`${id}: calculó en vez de pedir el dato`);
      } catch (err) {
        if (!(err instanceof ErrorEntrada) || err.campo !== campoCero) fallas.push(`${id}: tenía que tirar ErrorEntrada sobre "${campoCero}" y tiró ${(err as Error).message}`);
      }
    }
    conCero.delete(def.id);

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
    // Las universales tienen sus casos en src/motor/universales/<id>/casos.ts (check_universales).
    for (const { definicion: d, traduccion } of pais.calculadoras.filter((c) => !esUniversal(c))) {
      if (d.estado === "borrador") continue;
      if (traduccion) {
        let casosBase = casosPorId.get(traduccion.id);
        if (!casosBase) {
          try {
            casosBase = await importar<CasosCalculadora>(path.join(DIR_PAISES, traduccion.mercado, "calculadoras", `${traduccion.archivo}.casos.ts`));
          } catch {
            casosBase = undefined;
          }
        }
        total += revisarTraduccion(pais, d, casosBase, fallas);
        continue;
      }
      if (!conCasos.has(d.id)) fallas.push(`${d.id} (${d.estado}) no tiene src/paises/${carpeta}/calculadoras/${d.slug}.casos.ts`);
      else if (!conDatosReales.has(d.id)) fallas.push(`${d.id}: al menos un caso tiene que usar los datos del repo (sin "valores")`);
    }
  }

  if (!filtro) for (const id of conCero) fallas.push(`${id}: está en SUELDO_CERO pero no tiene archivo de casos con un caso de cálculo`);
  for (const f of fallas) console.error(`❌ ${f}`);
  console.log(fallas.length ? `${fallas.length} FALLAS en ${total} casos` : `TODO OK: ${total} casos en ${archivos.length} archivos`);
  process.exit(fallas.length ? 1 : 0);
}

// Una traducción de una edición corre los casos de la calculadora del país: los números tienen que
// dar igual (misma fórmula) y todo texto que devuelva o tire calcular() tiene que salir traducido
// (si sale igual que en el país, a la edición le falta un mensaje en textos.mensajes).
function revisarTraduccion(pais: PaisDefinido, def: DefinicionCalculadora, modulo: CasosCalculadora | undefined, fallas: string[]): number {
  if (!modulo) {
    fallas.push(`${def.id}: la calculadora del país no tiene casos para probar la traducción`);
    return 0;
  }
  const base = modulo.calculadora;
  const textos = (v: unknown): string[] => (typeof v === "string" ? [v] : Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
  const conLetras = (t: string) => /\p{L}{3}/u.test(t) && !/^\d{4}-\d{2}-\d{2}$/.test(t);
  let n = 0;
  for (const caso of modulo.casos) {
    n++;
    const id = `${def.id} con el caso «${caso.nombre}» de ${base.id}`;
    const r = resolverValores(pais, def, caso.fecha);
    const valores = { ...(r.ok ? r.valores : {}), ...((caso.valores ?? {}) as Record<string, ValorResuelto>) };
    if (Object.keys(def.requiere).some((k) => !(k in valores))) continue;
    const correr = (d: DefinicionCalculadora) => {
      try {
        return { ok: true as const, r: d.calcular(caso.entrada as never, valores as never, crearContexto(pais.mercado, caso.fecha, d)) };
      } catch (err) {
        return { ok: false as const, mensaje: err instanceof ErrorEntrada && err.codigo === null ? err.message : null };
      }
    };
    const a = correr(base);
    const b = correr(def);
    if (a.ok !== b.ok) {
      fallas.push(`${id}: el país ${a.ok ? "calcula" : "tira error"} y la edición no`);
      continue;
    }
    if (!a.ok || !b.ok) {
      if (!a.ok && !b.ok && a.mensaje && a.mensaje === b.mensaje && conLetras(a.mensaje)) fallas.push(`${id}: mensaje de error sin traducir: «${a.mensaje}»`);
      continue;
    }
    for (const [k, v] of Object.entries(a.r)) {
      const w = b.r[k];
      if (typeof v === "number" && v !== w) fallas.push(`${id}: ${k} da ${String(w)} y en el país ${v}`);
      const iguales = textos(w).filter((t) => textos(v).includes(t) && conLetras(t));
      for (const t of iguales) fallas.push(`${id}: ${k} sin traducir: «${t}»`);
    }
  }
  return n;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
