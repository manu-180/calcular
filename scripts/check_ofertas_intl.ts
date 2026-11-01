// Ofertas dentro del resultado de calcularya.com (src/lib/pagos/ofertas-intl.ts y ofertas-servidor.ts):
// - catálogo: cada informe con id, precio (USD 3 a 9) y familia válidos; ningún id hostil resuelve;
// - cobertura: todo concepto tiene familia salvo los de SIN_FAMILIA (hoy ninguno); toda calculadora
//   publicada tiene un informe a la venta y el de la familia de su concepto; las que la familia promete con tabla la declaran; y la
//   tabla concepto → oferta → países sale impresa;
// - informe: con las entradas de los .casos.ts (y los valores por defecto) el viaje
//   entrada → validación del servidor → texto del formulario → entrada da lo mismo, y los números del
//   informe (ejecutar) son exactamente los de calcular() con los mismos datos oficiales;
// - prefill hostil: __proto__, tipos cambiados, otra calculadora, otro país, texto gigante: null;
// - planilla con datos: el mapa convierte igual que el generador y la planilla de hoy (armada en
//   memoria, como en el prebuild) cargada con los números de la persona, recalculada con
//   HyperFormula, da lo mismo que calcular();
// - textos: los 7 idiomas con las mismas piezas por familia, sin rayas, sin emojis, sin marcas de
//   plantilla sin llenar y, en español, en el trato del país.
//
// Uso: npx tsx scripts/check_ofertas_intl.ts [mercado]

import "./sin-server-only";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import ExcelJS from "exceljs";
import { tmpdir } from "node:os";
import path from "node:path";
import { crearContexto, ErrorEntrada, type CasosCalculadora } from "../src/motor/calculo";
import { CONCEPTOS, type Concepto } from "../src/motor/conceptos";
import { esMercadoDePrueba } from "../src/motor/datos";
import { parsearEntrada, valoresIniciales } from "../src/motor/formulario";
import { resolverValores } from "../src/motor/registro";
import { textosMotor } from "../src/motor/textos";
import { type CodigoMercado, type DefinicionCalculadora, type Idioma, type Mercado, type Trato, type ValorEntrada } from "../src/motor/tipos";
import { hoyEn } from "../src/motor/vigencia";
import { registro } from "../src/paises";
import { PRODUCTOS_INTL, productoIntl, productoIntlDe, leerReferenciaIntl, type ProductoIntl } from "../src/lib/pagos/catalogo-intl";
import { FAMILIAS, SIN_FAMILIA, campoEscenario, familiaDeConcepto, nombreDeCalculo, precioUSD } from "../src/lib/pagos/ofertas-intl";
import { DICCIONARIOS, FAMILIAS_POR_LOCALE, IDIOMAS_VENTA, resolverTrato, tieneVenta, type DiccionarioVenta, type IdiomaVenta } from "../src/lib/pagos/textos";
import { zhHans } from "../src/lib/pagos/textos/zh-hans";
import { direccionDe } from "../src/motor/i18n/direccion";
import { idiomaDeLocale } from "../src/motor/i18n/resolver";
import { problemasDeTexto } from "./reglas_idioma";
import { bloqueDe, calculadorasDeProducto, mapaDePlanillaIntl, ofertasDeMercado, planillaConDatos, validarDatosDeProducto } from "../src/lib/pagos/ofertas-servidor";
import { calcularEscenarios, estadoDelInforme, filaClave } from "../src/lib/pagos/informe-intl";
import { valorDeCelda } from "../src/lib/pagos/mapa-planilla-intl";
import { asuntoEntregaIntl, entregaIntlHtml } from "../src/lib/pagos/email-intl";
import { crudosDeEntrada } from "../src/lib/prefill/intl-cliente";
import { DATOS_INTL_MAX, parsearDatosIntl } from "../src/lib/prefill/intl";
import { textosPlanillas } from "../src/app/(intl)/intl/[mercado]/planillas/_textos";
import { textosInforme, textosVer } from "../src/app/(intl)/intl/[mercado]/informes/_textos";
import { abrirLibro } from "./evaluar_xlsx";
import { archivosBajo, DIR_PAISES, importar } from "./paises_comun";
import { PLANILLAS_INTL, construirPlanilla } from "./planillas-intl";

let fallas = 0;
const fallo = (msg: string) => {
  fallas++;
  console.error(`FAIL ${msg}`);
};
const check = (nombre: string, cond: boolean) => {
  if (cond) console.log(`OK   ${nombre}`);
  else fallo(nombre);
};

const filtro = process.argv[2];

// Un índice de casos por mercado, armado una vez: buscar archivo por archivo en cada calculadora eran
// decenas de miles de import() (cacheados, pero no gratis) y la mayor parte de los minutos del check.
const casosPorMercado = new Map<string, Promise<ReadonlyMap<string, CasosCalculadora>>>();

async function casosDe(mercado: string, def: DefinicionCalculadora): Promise<CasosCalculadora | null> {
  let indice = casosPorMercado.get(mercado);
  if (!indice) {
    indice = Promise.all(archivosBajo(path.join(DIR_PAISES, mercado, "calculadoras"), /\.casos\.ts$/).map((a) => importar<CasosCalculadora>(a))).then(
      (mods) => new Map(mods.filter((m) => m?.calculadora?.id).map((m) => [m.calculadora.id, m])),
    );
    casosPorMercado.set(mercado, indice);
  }
  return (await indice).get(def.id) ?? null;
}

const igual = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

// ─── 1. Catálogo ──────────────────────────────────────────────────────────────────────────────

function checkCatalogo() {
  const informes = PRODUCTOS_INTL.filter((p) => p.tipo === "informe");
  check(`catálogo: ${informes.length} informes generados desde el registro`, informes.length > 0);
  for (const p of informes) {
    if (p.id.length > 60) fallo(`${p.id}: id de más de 60 caracteres`);
    if (p.precioCentavos < 300 || p.precioCentavos > 900) fallo(`${p.id}: precio fuera de USD 3 a 9`);
    if (p.archivo !== "" || !p.familia) fallo(`${p.id}: un informe no tiene archivo y sí familia`);
    if (!calculadorasDeProducto(p).length) fallo(`${p.id}: no tiene calculadoras`);
  }
  const ids = PRODUCTOS_INTL.map((p) => p.id);
  check("catálogo: ids únicos", new Set(ids).size === ids.length);
  for (const f of FAMILIAS) {
    for (const c of f.conceptos) if (!(c in CONCEPTOS)) fallo(`familia ${f.clave}: concepto desconocido ${c}`);
    if (f.precioCentavos < 300 || f.precioCentavos > 900 || f.precioCentavos % 100) fallo(`familia ${f.clave}: precio fuera de USD 3 a 9 enteros`);
    for (const c of f.conTabla ?? []) if (!f.conceptos.includes(c)) fallo(`familia ${f.clave}: promete tabla en ${c}, que no es suyo`);
  }
  const slugs = FAMILIAS.map((f) => f.slug);
  check("familias: slugs únicos", new Set(slugs).size === slugs.length);
  const sinFamilia = (Object.keys(CONCEPTOS) as Concepto[]).filter((c) => !SIN_FAMILIA.includes(c) && !familiaDeConcepto(c));
  check(`cobertura: todo concepto tiene familia salvo ${SIN_FAMILIA.join(", ")}${sinFamilia.length ? ` (faltan: ${sinFamilia.join(", ")})` : ""}`, !sinFamilia.length);
  for (const c of SIN_FAMILIA) if (familiaDeConcepto(c)) fallo(`${c} figura sin familia y tiene una`);
  const hostiles = ["__proto__", "constructor", "mx/__proto__", "mx/constructor", "toString", "mx/informe-liquidacion/../x", "MX/INFORME-LIQUIDACION", " mx/informe-liquidacion"];
  check("productoIntl no resuelve ids hostiles", hostiles.every((h) => productoIntl(h) === null));
  check("productoIntlDe no resuelve slugs hostiles", ["__proto__", "constructor", "hasOwnProperty"].every((s) => productoIntlDe("mx", s) === null));
  check("leerReferenciaIntl ignora referencias armadas", leerReferenciaIntl("__proto__/x:00000000-0000-4000-8000-000000000000") === null && leerReferenciaIntl("mx/informe-liquidacion:no-uuid") === null);
}

// ─── 2. Cobertura ─────────────────────────────────────────────────────────────────────────────

function checkCobertura(): Map<string, { oferta: string; paises: Set<string> }[]> {
  const tabla = new Map<string, Map<string, Set<string>>>();
  const sinEscenario: string[] = [];
  for (const pais of registro.paises) {
    const m = pais.mercado.codigo;
    if (m === "global" || esMercadoDePrueba(m) || (filtro && m !== filtro)) continue;
    const ofertas = ofertasDeMercado(m);
    if (!ofertas.textos) fallo(`${m}: el JSON de ofertas no trae los textos de la tarjeta`);
    for (const de of Object.values(ofertas.porCalculadora)) for (const o of de.ofertas) if (!ofertas.copy?.[o.familia]) fallo(`${m}: el JSON de ofertas no trae el copy de ${o.familia}`);
    for (const c of pais.calculadoras) {
      const def = c.definicion;
      if (def.estado === "borrador") continue;
      const de = ofertas.porCalculadora[def.id];
      const f = familiaDeConcepto(def.concepto);
      if (f && !de?.ofertas.some((o) => o.tipo === "informe" && o.familia === f.clave)) fallo(`${def.id}: el concepto ${def.concepto} tiene la familia ${f.clave} y la calculadora no la ofrece`);
      if (!de?.ofertas.some((o) => o.tipo === "informe")) fallo(`${def.id}: publicada sin oferta de venta (concepto ${def.concepto})`);
      if (de && de.calc !== def.slug) fallo(`${def.id}: la oferta apunta a ${de.calc}`);
      if (de && (!de.nombre || /\{\{/.test(de.nombre))) fallo(`${def.id}: nombre del cálculo raro «${de.nombre}»`);
      if (f && (f.conTabla ?? []).includes(def.concepto) && !def.tablas?.length) fallo(`${def.id}: la familia ${f.clave} promete la tabla completa y la calculadora no declara tablas`);
      if (f?.escenarios && !campoEscenario(f.escenarios, def.campos)) sinEscenario.push(def.id);
      const porConcepto = tabla.get(def.concepto) ?? new Map<string, Set<string>>();
      tabla.set(def.concepto, porConcepto);
      for (const o of de?.ofertas ?? []) {
        const k = `${o.tipo === "planilla" ? "planilla" : o.familia} (${o.tipo}, USD ${o.precioCentavos / 100})`;
        (porConcepto.get(k) ?? porConcepto.set(k, new Set()).get(k)!).add(m);
      }
      if (!de) (porConcepto.get("sin oferta") ?? porConcepto.set("sin oferta", new Set()).get("sin oferta")!).add(m);
    }
  }
  // Normal en los pagos que no dependen de horas ni de plazos (aguinaldo, vacaciones): se informa, no falla.
  if (sinEscenario.length) console.log(`AVISO ${sinEscenario.length} calculadoras de familias con escenarios no tienen el campo que se varía: su informe sale sin esa tabla`);
  console.log("\nconcepto → oferta → países");
  const salida = new Map<string, { oferta: string; paises: Set<string> }[]>();
  for (const [concepto, ofertas] of [...tabla].sort()) {
    salida.set(concepto, [...ofertas].map(([oferta, paises]) => ({ oferta, paises })));
    for (const [oferta, paises] of ofertas) console.log(`  ${concepto.padEnd(26)} ${oferta.padEnd(42)} ${paises.size} ${[...paises].sort().join(" ")}`);
  }
  console.log("");
  return salida;
}

// ─── 3. Informe: viaje de la entrada y números ────────────────────────────────────────────────

async function checkInformes() {
  for (const p of PRODUCTOS_INTL.filter((x) => x.tipo === "informe" && (!filtro || x.mercado === filtro))) {
    const familia = FAMILIAS.find((f) => f.clave === p.familia)!;
    const pais = registro.pais(p.mercado as CodigoMercado)!;
    const hoy = hoyEn(pais.mercado);
    for (const slug of calculadorasDeProducto(p)) {
      const pagina = registro.pagina(pais.mercado.codigo, slug, hoy, "interno");
      const def = registro.calculadora(pais.mercado.codigo, slug)!.definicion;
      if (!pagina) {
        console.log(`--   ${p.id} ${slug}: no publicable hoy, no se prueba`);
        continue;
      }
      const props = pagina.props;
      const motor = textosMotor(pais.mercado.idioma, pais.mercado.trato);
      const base = valoresIniciales(def.campos, props.contexto, props.opcionesDinamicas);
      const entradas: Record<string, unknown>[] = [];
      const porDefecto = parsearEntrada(def.campos, base, props.contexto, props.opcionesDinamicas);
      if (porDefecto.ok) entradas.push({ ...porDefecto.entrada });
      for (const caso of (await casosDe(pais.mercado.codigo, def))?.casos ?? []) if (!caso.esperaError) entradas.push({ ...(caso.entrada as Record<string, unknown>) });
      let probadas = 0;
      for (const e of entradas) {
        const datos = validarDatosDeProducto(p, { calc: slug, entrada: e }, hoy);
        if (!datos) continue;
        probadas++;
        const crudos = crudosDeEntrada(def.campos, datos.entrada, pais.mercado.locale, base);
        const vuelta = parsearEntrada(def.campos, crudos, props.contexto, props.opcionesDinamicas);
        if (!vuelta.ok || !igual(vuelta.entrada, datos.entrada)) {
          fallo(`${p.id} ${slug}: la entrada no sobrevive el viaje al formulario ${JSON.stringify(datos.entrada)} → ${JSON.stringify(vuelta.ok ? vuelta.entrada : vuelta.errores)}`);
          continue;
        }
        const estado = estadoDelInforme(def, crudos, props, motor);
        let directo: Record<string, unknown>;
        try {
          directo = def.calcular(datos.entrada as never, props.valores as never, crearContexto(pais.mercado, hoy, def)) as Record<string, unknown>;
        } catch (err) {
          if (err instanceof ErrorEntrada) continue;
          throw err;
        }
        if (estado.tipo !== "ok") {
          fallo(`${p.id} ${slug}: el informe no calcula (${estado.tipo}) con ${JSON.stringify(datos.entrada)}`);
          continue;
        }
        for (const f of def.resultado) {
          if (!igual(estado.resultado[f.clave], directo[f.clave])) fallo(`${p.id} ${slug}: ${f.clave} informe ${JSON.stringify(estado.resultado[f.clave])} calculadora ${JSON.stringify(directo[f.clave])}`);
        }
        if (familia.escenarios) {
          const esc = calcularEscenarios(def, familia.escenarios, crudos, props, motor);
          const clave = filaClave(estado.filas);
          const actual = esc?.filas.find((x) => x.actual);
          if (esc && actual && clave && esc.columnas.includes(clave.etiqueta) && actual.resultados[esc.columnas.indexOf(clave.etiqueta)] !== clave.texto) {
            fallo(`${p.id} ${slug}: el escenario actual (${actual.resultados.join(" / ")}) no da el resultado (${clave.texto})`);
          }
        }
      }
      if (!probadas) fallo(`${p.id} ${slug}: ninguna entrada de prueba pasa la validación del prefill`);
      else console.log(`OK   ${p.id} ${slug}: ${probadas} entradas, informe = calculadora`);
    }
  }
}

// ─── 4. Prefill hostil ────────────────────────────────────────────────────────────────────────

function checkHostil() {
  const p = productoIntlDe("mx", "informe-liquidacion");
  if (!p) return fallo("falta mx/informe-liquidacion para las pruebas hostiles");
  const def = registro.calculadora("mx", "finiquito")!.definicion;
  const pais = registro.pais("mx")!;
  const hoy = hoyEn(pais.mercado);
  const pagina = registro.pagina("mx", "finiquito", hoy, "interno")!;
  const crudos = valoresIniciales(def.campos, pagina.props.contexto, pagina.props.opcionesDinamicas);
  const pd = parsearEntrada(def.campos, { ...crudos, sueldo: "15000", ingreso: "2021-03-01" }, pagina.props.contexto, pagina.props.opcionesDinamicas);
  const validos = (e: unknown) => validarDatosDeProducto(p, e, hoy);
  const base = pd.ok ? validos({ calc: "finiquito", entrada: pd.entrada }) : null;
  check("prefill: una entrada válida de mx/finiquito pasa", base !== null);
  const entrada = base?.entrada ?? {};
  const casos: [string, unknown][] = [
    ["null", null],
    ["array", [1, 2]],
    ["sin calc", { entrada }],
    ["calc de otra familia", { calc: "isr", entrada }],
    ["calc inexistente", { calc: "__proto__", entrada }],
    ["entrada con __proto__", JSON.parse(`{"calc":"finiquito","entrada":{"__proto__":{"sueldo":1}}}`)],
    ["número como texto", { calc: "finiquito", entrada: { ...entrada, sueldo: "15000" } }],
    ["número infinito", { calc: "finiquito", entrada: { ...entrada, sueldo: 1e400 } }],
    ["número gigante", { calc: "finiquito", entrada: { ...entrada, sueldo: 1e20 } }],
    ["opción inventada", { calc: "finiquito", entrada: { ...entrada, motivo: "constructor" } }],
    ["fecha imposible", { calc: "finiquito", entrada: { ...entrada, salida: "2026-02-31" } }],
  ];
  for (const [nombre, raw] of casos) check(`prefill hostil: ${nombre} → null`, validos(raw) === null);
  check("prefill: texto de más de 2048 no se parsea", parsearDatosIntl("x".repeat(DATOS_INTL_MAX + 1)) === undefined);
  check("prefill: JSON roto no se parsea", parsearDatosIntl("{") === undefined);
  const otroPais = productoIntlDe("co", "informe-liquidacion");
  if (otroPais && base) check("prefill: los datos de un país no valen en otro", validarDatosDeProducto(otroPais, { calc: "finiquito", entrada }, hoy) === null);
  if (base) check("prefill: los campos de más se descartan", !("extra" in (validos({ calc: "finiquito", entrada: { ...entrada, extra: 1 } })?.entrada ?? { extra: 1 })));
}

// ─── 5. Planilla con los datos de la persona ─────────────────────────────────────────────────

async function checkPlanillas() {
  const tmp = mkdtempSync(path.join(tmpdir(), "ofertas-intl-"));
  try {
    for (const planilla of PLANILLAS_INTL) {
      const m = planilla.mercado;
      if (filtro && m !== filtro) continue;
      const prod = PRODUCTOS_INTL.find((x) => x.mercado === m && x.tipo === "planilla") as ProductoIntl | undefined;
      const construida = construirPlanilla(planilla);
      if (!prod || !construida) continue;
      const mapa = mapaDePlanillaIntl(prod);
      if (!mapa) {
        fallo(`${m}: falta el mapa de la planilla (correr scripts/paises/gen_planillas_intl.ts)`);
        continue;
      }
      if (mapa.archivo !== prod.archivo) fallo(`${m}: el mapa es de ${mapa.archivo} y la planilla a la venta es ${prod.archivo}`);
      const pais = construida.libro.pais;
      // La planilla que se carga con los datos es la de hoy, armada en memoria igual que la arma el
      // prebuild (gen_planilla_todas, también en CI antes de check-all), no la copia de
      // private/intl del repo: esa queda con la UF o el tipo de cambio del día en que alguien la
      // regeneró y, en cuanto la serie suma un punto, da otro tope que la calculadora de hoy (cl: tope
      // imponible e indemnización en UF). Que el archivo del repo y su mapa estén al día lo cuidan
      // check_planillas_intl y el chequeo de mapa.archivo de arriba.
      const deHoy = Buffer.from(await construida.libro.wb.xlsx.writeBuffer());
      for (const b of construida.libro.bloques) {
        const bm = bloqueDe(prod, b.calculadora);
        if (!bm) {
          fallo(`${m}/${b.calculadora}: la hoja ${b.hoja} no está en el mapa`);
          continue;
        }
        const def = pais.calculadoras.find((c) => c.definicion.slug === b.calculadora)!.definicion;
        const sinCelda = def.campos.filter((c) => !bm.celdas[c.id]).map((c) => c.id);
        if (sinCelda.length) console.log(`AVISO ${m}/${b.calculadora}: sin celda en el mapa para ${sinCelda.join(", ")} (queda el valor de ejemplo)`);
        const casos = ((await casosDe(m, def))?.casos ?? []).filter((c) => !c.esperaError).slice(0, 3);
        let probadas = 0;
        for (const caso of casos) {
          const datos = validarDatosDeProducto(prod, { calc: b.calculadora, entrada: caso.entrada }, construida.hoy);
          if (!datos) continue;
          for (const [campo, celda] of Object.entries(bm.celdas)) {
            const v = datos.entrada[campo];
            const esperado = b.entradas[campo].convertir(v as ValorEntrada);
            if (!igual(valorDeCelda(celda, v), esperado)) fallo(`${m}/${b.calculadora}: el mapa convierte ${campo}=${JSON.stringify(v)} en ${JSON.stringify(valorDeCelda(celda, v))} y la hoja en ${JSON.stringify(esperado)}`);
          }
          const bytes = await planillaConDatos(prod, datos, deHoy);
          const ruta = path.join(tmp, `${m}-${b.calculadora}-${probadas}.xlsx`);
          writeFileSync(ruta, bytes);
          const libro = await abrirLibro(ruta);
          // exceljs lee una celda con formato de fecha como Date y evaluar_xlsx la pasa a milisegundos
          // (Excel lee el número de serie que quedó escrito): se recargan como número de serie.
          const escrito = new ExcelJS.Workbook();
          await escrito.xlsx.load(bytes as unknown as ArrayBuffer);
          const ws = escrito.getWorksheet(b.hoja)!;
          const recarga: Record<string, string | number | null> = {};
          for (const otro of construida.libro.bloques.filter((x) => x.hoja === b.hoja)) {
            for (const e of Object.values(otro.entradas)) {
              const v = ws.getCell(e.ref).value;
              recarga[e.ref] = v instanceof Date ? Math.round(v.getTime() / 86_400_000 + 25569) : typeof v === "number" || typeof v === "string" ? v : null;
            }
          }
          libro.cargar(b.hoja, recarga);
          // Lo que la hoja usa como «hoy» se fija al día del motor, igual que en check_planillas_intl.
          if (b.hoy) libro.cargar(b.hoja, { [b.hoy.ref]: b.hoy.convertir(construida.hoy) });
          const r = resolverValores(pais, def, construida.hoy);
          if (!r.ok) continue;
          let esperado: Record<string, unknown>;
          try {
            esperado = def.calcular(datos.entrada as never, r.valores as never, crearContexto(pais.mercado, construida.hoy, def)) as Record<string, unknown>;
          } catch (err) {
            if (err instanceof ErrorEntrada) continue;
            throw err;
          }
          const unidad = 10 ** -(def.redondeo ?? pais.mercado.redondeo).decimales;
          for (const [clave, ref] of Object.entries(b.resultados)) {
            const esp = esperado[clave];
            if (typeof esp !== "number") continue;
            const obtenido = libro.numero(b.hoja, ref);
            if (Math.abs(obtenido - esp) > unidad + 1e-9) fallo(`${m}/${b.calculadora} «${caso.nombre}»: ${clave} planilla con datos ${obtenido}, calculadora ${esp}`);
          }
          probadas++;
        }
        if (casos.length && !probadas) fallo(`${m}/${b.calculadora}: ningún caso entra en la planilla con datos`);
        else console.log(`OK   ${m}/${b.calculadora} (${b.hoja}): ${probadas} planillas con datos = calculadora`);
      }
    }
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

// ─── 6. Textos ────────────────────────────────────────────────────────────────────────────────

const RAYA = /[–—]/;
const EMOJI = /\p{Extended_Pictographic}/u;
const PLANTILLA = /\{\w+\}|\{\{/;
const VOSEO = /(?<![\p{L}])(tenés|podés|pagás|cambiás|querés|elegí|revisá|comparalo|pedí|guardá|llevate|tené|llegá|mirá|convertí|completala|firmala|entregala|aportás|imprimís|guardás|escribinos|respondé|probá|acá|abrilo|confirmá|buscá|usá|registrá|reservá|corregilo|volvé|esperá|compará|preguntá|descargala|terminás|pagás|ahorrás|cobrás|facturás|necesitás|buscás|sumá|dejá|armá|anotá|separá|mandá|compartí|hacé|partí|fijate|dedicale|contá|comés|movés|dormís|salí|entrená|sentís|pará|consultá|dividí|avisalo|desenchufá|comprá|presentá|hablá|negociá|programá|actualizá|bajás|ponés|ganás|llegás|conseguís|aportás|dejá|redondeá|descubrí|enviala)(?![\p{L}])/iu;
// Sólo formas que no pueden ser de usted (las de tercera persona, «usa», «abre», «guarda», son
// iguales al imperativo de tú y aparecen en textos de usted).
const TUTEO = /(?<![\p{L}])(tú|tu|tus|te|ti|puedes|tienes|pagas|quieres|llévate|ábrelo|escríbenos|corrígelo|cambias|aportas|imprimes|guardas|pagarías|terminas|ahorras|cobras|facturas|necesitas|buscas|calculaste|cargaste|usaste|comes|mueves|duermes|sientes|pones|ganas|llegas|consigues)(?![\p{L}])/iu;
const VOSEO_EN_VOS_NO = /(?<![\p{L}])(puedes|tienes|pagas|quieres|ábrelo|escríbenos|corrígelo|imprimes|guardas|cambias|aportas|terminas|ahorras|cobras|facturas|necesitas|buscas|comes|mueves|duermes|sientes|pones|ganas|llegas|consigues)(?![\p{L}])/iu;

// carta: la nota es una carta formal que firma la persona (en coreano va en 합니다체, no en el 해요체 del sitio).
function revisarTexto(origen: string, idioma: Idioma, trato: Trato, s: string, locale?: string, carta = false) {
  if (!s.trim()) fallo(`${origen}: texto vacío`);
  if (RAYA.test(s)) fallo(`${origen}: raya en «${s}»`);
  if (EMOJI.test(s)) fallo(`${origen}: emoji en «${s}»`);
  if (idioma === "ja" || idioma === "ko" || idioma === "zh" || idioma === "sr" || idioma === "hr" || idioma === "bs" || idioma === "hy" || idioma === "sl" || idioma === "ar" || idioma === "id" || idioma === "tr" || idioma === "bn" || idioma === "th" || idioma === "uk" || idioma === "uz" || idioma === "ru" || idioma === "ro" || idioma === "cs" || idioma === "sk" || idioma === "el" || idioma === "ka" || idioma === "hu" || idioma === "he" || idioma === "bg" || idioma === "mn" || idioma === "sq" || idioma === "et" || idioma === "is" || idioma === "lv") for (const p of problemasDeTexto(s, idioma, trato, locale)) if (!(carta && p.startsWith("합니다체"))) fallo(`${origen}: ${p} en «${s.slice(0, 60)}»`);
  if (idioma !== "es") return;
  if (trato !== "vos" && VOSEO.test(s)) fallo(`${origen} (${trato}): voseo «${VOSEO.exec(s)![0]}» en «${s}»`);
  if (trato === "usted" && TUTEO.test(s)) fallo(`${origen} (usted): tuteo «${TUTEO.exec(s)![0]}» en «${s}»`);
  if (trato === "vos" && VOSEO_EN_VOS_NO.test(s)) fallo(`${origen} (vos): forma de tú «${VOSEO_EN_VOS_NO.exec(s)![0]}» en «${s}»`);
}

function textosDe(valor: unknown, salida: string[] = []): string[] {
  if (typeof valor === "string") salida.push(valor);
  else if (Array.isArray(valor)) for (const v of valor) textosDe(v, salida);
  else if (valor && typeof valor === "object") for (const v of Object.values(valor)) textosDe(v, salida);
  return salida;
}

const TRATOS: Record<IdiomaVenta, readonly Trato[]> = { es: ["tu", "usted", "vos"], pt: ["tu"], en: ["tu"], fr: ["tu", "usted"], de: ["tu", "usted"], it: ["tu"], nl: ["tu"], ja: ["usted"], ko: ["usted"], zh: ["usted"], pl: ["tu"], sv: ["tu"], da: ["tu"], nb: ["tu"], fi: ["tu"], ar: ["usted"], id: ["usted"], tr: ["usted"], bn: ["usted"], th: ["usted"], uk: ["usted"], uz: ["usted"], ru: ["usted"], ro: ["usted"], cs: ["usted"], el: ["usted"], hu: ["tu"], he: ["usted"], sr: ["usted"], bg: ["usted"], sk: ["usted"], ka: ["usted"], hr: ["usted"], bs: ["usted"], mn: ["usted"], hy: ["usted"], sq: ["usted"], sl: ["usted"], et: ["tu"], is: ["tu"], lv: ["usted"] };

// Cada diccionario que se revisa, con el locale de su escritura (el chino simplificado es aparte).
const REVISADOS: readonly { nombre: string; idioma: IdiomaVenta; locale?: string; d: DiccionarioVenta }[] = [
  ...IDIOMAS_VENTA.map((idioma) => ({ nombre: idioma as string, idioma, d: DICCIONARIOS[idioma] })),
  { nombre: "zh-CN", idioma: "zh", locale: "zh-CN", d: zhHans },
];

// Las piezas de cada familia tienen que ser las mismas en todos los idiomas: un paso, un punto o
// una nota que falta en un idioma es una promesa que en ese país no se cumple.
function forma(f: (typeof DICCIONARIOS)["es"]["familias"][keyof (typeof DICCIONARIOS)["es"]["familias"]]) {
  return JSON.stringify({ d: f.descripcion.length, i: f.incluye.length, p: f.pasos?.items.length ?? 0, n: !!f.nota, e: !!f.escenarios, a: !!f.aviso });
}

function checkTextos() {
  let revisados = 0;
  for (const f of FAMILIAS) {
    const base = forma(DICCIONARIOS.es.familias[f.clave]);
    for (const { nombre, d } of REVISADOS) {
      const tf = d.familias[f.clave];
      if (forma(tf) !== base) fallo(`familia ${f.clave} (${nombre}): piezas distintas del español ${forma(tf)} vs ${base}`);
      if (!!f.escenarios !== !!tf.escenarios) fallo(`familia ${f.clave} (${nombre}): la estructura ${f.escenarios ? "tiene" : "no tiene"} escenarios y el texto no coincide`);
    }
    for (const [locale, familias] of Object.entries(FAMILIAS_POR_LOCALE)) {
      const tf = familias[f.clave];
      if (!tf) continue;
      if (forma(tf) !== base) fallo(`familia ${f.clave} (${locale}): piezas distintas del español ${forma(tf)} vs ${base}`);
      const idiomaLocale = idiomaDeLocale(locale);
      if (!idiomaLocale || !tieneVenta(idiomaLocale)) {
        fallo(`familia ${f.clave} (${locale}): el locale no es de un idioma con diccionario de venta`);
        continue;
      }
      for (const trato of TRATOS[idiomaLocale]) for (const s of textosDe(resolverTrato(tf, trato))) (revisarTexto(`${locale} familia ${f.clave}`, idiomaLocale, trato, s), revisados++);
    }
  }
  for (const { nombre: idioma, idioma: id, locale, d } of REVISADOS) {
    for (const trato of TRATOS[id]) {
      const rev = (origen: string, t: string) => revisarTexto(origen, id, trato, t, locale);
      const carta = new Set(Object.values(resolverTrato(d.familias, trato)).flatMap((f) => (f.nota ? [f.nota.pedido, f.nota.cierre] : [])));
      const { planillas: _p, correo: _c, catalogo: _k, tarjeta, ...resto } = resolverTrato(d, trato);
      for (const [clave, f] of Object.entries(resto.familias)) for (const t of textosDe(f)) (revisarTexto(`${idioma} familia ${clave}`, id, trato, t, locale, carta.has(t)), revisados++);
      for (const t of textosDe([resto.general, resto.aviso, resto.planilla, resto.informe])) {
        rev(`${idioma} ofertas`, t);
        if (PLANTILLA.test(t)) fallo(`${idioma} ofertas: marca de plantilla en «${t}»`);
        revisados++;
      }
      for (const t of textosDe(tarjeta)) (rev(`${idioma} tarjeta`, t), revisados++);
      if (!/\{monto\}/.test(tarjeta.equivale) || !/\{hoja\}/.test(tarjeta.bajadaPlanillaHoja)) fallo(`${idioma} tarjeta: falta {monto} o {hoja}`);
      for (const t of textosDe([_p, _c, _k])) (rev(`${idioma} planillas, mail y catálogo`, t), revisados++);
    }
  }
  for (const pais of registro.paises) {
    const m = pais.mercado as Mercado;
    if (m.codigo === "global" || esMercadoDePrueba(m.codigo)) continue;
    if (!tieneVenta(m.idioma)) {
      fallo(`${m.codigo}: el idioma ${m.idioma} no tiene diccionario de venta (src/lib/pagos/textos); sin él el país no ofrece nada`);
      continue;
    }
    const tx = textosPlanillas(m);
    const prods = PRODUCTOS_INTL.filter((p) => p.mercado === m.codigo);
    const textos = textosDe([
      Object.entries(tx).map(([, v]) => (typeof v === "function" ? prods.map((p) => (v as (p: ProductoIntl, x: boolean) => unknown)(p, true)) : v)),
      prods.map((p) => [p.titulo, p.paraQuien, p.descripcion, precioUSD(p.precioCentavos, m.locale)]),
    ]).filter((s) => !/^\s*$/.test(s));
    for (const s of textos) {
      revisarTexto(`textos ${m.codigo}`, m.idioma, m.trato, s, m.locale);
      if (PLANTILLA.test(s)) fallo(`textos ${m.codigo}: marca de plantilla en «${s}»`);
      revisados++;
    }
    for (const p of prods) {
      const html = entregaIntlHtml({ producto: p, idioma: m.idioma, trato: m.trato, locale: m.locale, urlDescarga: "https://x", urlLanding: "https://x", origen: "https://x", contacto: "a@b.c" }).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
      const asunto = asuntoEntregaIntl(p, m.idioma, m.trato, m.locale);
      revisarTexto(`mail ${p.id}`, m.idioma, m.trato, html, m.locale);
      if (PLANTILLA.test(html) || PLANTILLA.test(asunto)) fallo(`mail ${p.id}: marca de plantilla sin llenar`);
      revisados++;
    }
    for (const c of pais.calculadoras) {
      const n = nombreDeCalculo(c.contenido.h1);
      if (!n || /\{\{/.test(n)) fallo(`${c.definicion.id}: nombre del cálculo «${n}» a partir de «${c.contenido.h1}»`);
    }
  }
  // Ningún país en otro idioma vende todavía: el mail se prueba en los 7 con productos reales.
  const muestra = [PRODUCTOS_INTL.find((p) => p.tipo === "informe"), PRODUCTOS_INTL.find((p) => p.tipo === "planilla")].filter((p): p is ProductoIntl => !!p);
  for (const idioma of IDIOMAS_VENTA) {
    for (const trato of TRATOS[idioma]) {
      for (const p of muestra) {
        const html = entregaIntlHtml({ producto: p, idioma, trato, urlDescarga: "https://x", urlLanding: "https://x", origen: "https://x", contacto: "a@b.c" });
        if (!html.includes(`<html lang="${idioma}"${direccionDe(idioma) === "rtl" ? ' dir="rtl"' : ""}>`)) fallo(`mail ${idioma}: sin lang o sin dir`);
        // El producto de muestra es de un mercado en español: su título («... México 2026») no es texto
        // del diccionario del idioma y en bn daría una cifra latina falsa. Se revisa sin él. Las etiquetas
        // y la sangría del HTML dejan espacios repetidos que no se ven: se colapsan (la regla de doble
        // espacio del tailandés mira el texto, no el marcado).
        const texto = html.replace(/<[^>]+>/g, " ").split(p.titulo).join(" ").replace(/\s+/g, " ");
        revisarTexto(`mail ${idioma} ${p.tipo}`, idioma, trato, texto);
        if (PLANTILLA.test(texto) || PLANTILLA.test(asuntoEntregaIntl(p, idioma, trato))) fallo(`mail ${idioma} ${p.tipo}: marca de plantilla sin llenar`);
        revisados++;
      }
    }
  }
  check(`textos: ${revisados} revisados`, revisados > 0);
}

async function main() {
  const tiempos: string[] = [];
  const medir = async (nombre: string, f: () => unknown) => {
    const t = Date.now();
    await f();
    tiempos.push(`${nombre} ${((Date.now() - t) / 1000).toFixed(1)} s`);
  };
  await medir("catálogo", checkCatalogo);
  await medir("cobertura", checkCobertura);
  await medir("informes", checkInformes);
  await medir("hostil", checkHostil);
  await medir("planillas", checkPlanillas);
  await medir("textos", checkTextos);
  console.log(`
tiempos: ${tiempos.join(" · ")}`);
  console.log(fallas ? `\n${fallas} FALLAS` : "\nTODO OK check_ofertas_intl");
  process.exit(fallas ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

