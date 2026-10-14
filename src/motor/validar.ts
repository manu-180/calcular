import { esConcepto } from "./conceptos";
import { esIdDelMercado, paisDelMercado, RE_SLUG, validarFuente, validarUrl } from "./datos";
import { hayLlavesSueltas, marcadoresDe, mercadoVisible, rellenarContenido, resolverValores } from "./registro";
import { diasEntre, esFechaISO, sumarDias, valorSerie, vigente } from "./vigencia";
import type { ContenidoCalculadora, DefinicionCalculadora, FechaISO, PaisDefinido, Requisito, Unidad } from "./tipos";

function unidadesDe(pais: PaisDefinido): Record<string, Unidad> {
  const u: Record<string, Unidad> = {};
  for (const d of pais.datos) u[d.id] = d.unidad;
  for (const s of pais.series) u[s.id] = s.unidad;
  return u;
}

export const SLUGS_RESERVADOS = [
  "fuentes",
  "novedades",
  "calculadoras",
  "sitemap.xml",
  "robots.txt",
  "privacidad",
  "terminos",
  "contacto",
  "sobre",
  "api",
  "intl",
  "og",
] as const;

const REQUISITOS: readonly Requisito[] = ["numero", "mapa", "escala", "numero-por-region", "mapa-por-region", "escala-por-region", "serie"];
const RE_ID_CAMPO = /^[a-z][a-zA-Z0-9]*$/;
const DIAS_PREAVISO = 30;

export interface Informe {
  errores: string[];
  avisos: string[];
}

export interface OpcionesValidacion {
  hoy: FechaISO;
  hoyMasAdelantado?: FechaISO;
  estricto?: boolean;
}

function textosDeContenido(c: ContenidoCalculadora): string[] {
  return [c.h1, c.title, c.description, ...c.intro, ...c.comoSeCalcula, ...(c.ejemplo ?? []), ...c.faq.flatMap((f) => [f.pregunta, f.respuesta]), ...c.glosario.flatMap((g) => [g.termino, g.definicion])];
}

function validarDefinicion(pais: PaisDefinido, def: DefinicionCalculadora, e: string[]) {
  const cod = pais.mercado.codigo;
  const donde = `calculadora ${def.id}`;
  if (!esIdDelMercado(def.id, cod)) e.push(`${donde}: id tiene que ser "${cod}.<kebab-case>"`);
  if (def.mercado !== cod) e.push(`${donde}: mercado "${def.mercado}" no es "${cod}"`);
  if (!RE_SLUG.test(def.slug)) e.push(`${donde}: slug "${def.slug}" tiene que ser kebab-case sin tildes`);
  if ((SLUGS_RESERVADOS as readonly string[]).includes(def.slug)) e.push(`${donde}: el slug "${def.slug}" está reservado`);
  if (!esConcepto(def.concepto)) e.push(`${donde}: concepto "${def.concepto}" no está en src/motor/conceptos.ts (usá "propio" si no tiene equivalente)`);
  if (!["borrador", "interno", "publicado"].includes(def.estado)) e.push(`${donde}: estado inválido`);
  if (typeof def.calcular !== "function") e.push(`${donde}: falta calcular()`);

  for (const [id, req] of Object.entries(def.requiere)) {
    if (!REQUISITOS.includes(req)) {
      e.push(`${donde}: requiere["${id}"] = "${req}" no es un requisito válido`);
      continue;
    }
    if (!id.startsWith(`${cod}.`) && !id.startsWith(`${paisDelMercado(cod)}.`)) e.push(`${donde}: requiere "${id}", que es de otro mercado`);
    if (req === "serie") {
      if (!pais.series.some((s) => s.id === id)) e.push(`${donde}: requiere la serie "${id}", que no está en series.json`);
      continue;
    }
    const dato = pais.datos.find((d) => d.id === id);
    if (!dato) {
      e.push(`${donde}: requiere "${id}", que no está en datos.json`);
      continue;
    }
    const base = req.replace("-por-region", "");
    if (dato.tipo !== base) e.push(`${donde}: requiere "${id}" como ${req} pero el dato es de tipo ${dato.tipo}`);
    if (req.endsWith("-por-region") !== Boolean(dato.regiones)) {
      e.push(`${donde}: "${id}" ${dato.regiones ? "tiene regiones: pedilo como " + base + "-por-region" : "no tiene regiones: pedilo como " + base}`);
    }
  }

  const ids = def.campos.map((c) => c.id);
  if (ids.length === 0) e.push(`${donde}: sin campos`);
  ids.forEach((id, i) => {
    if (!RE_ID_CAMPO.test(id)) e.push(`${donde}: campo "${id}" tiene que ser camelCase`);
    if (ids.indexOf(id) !== i) e.push(`${donde}: campo "${id}" repetido`);
  });
  for (const c of def.campos) {
    if (!c.etiqueta?.trim()) e.push(`${donde}: campo ${c.id} sin etiqueta`);
    if (c.tipo === "opcion") {
      const vals = c.opciones.map((o) => o.valor);
      if (vals.length < 2) e.push(`${donde}: campo ${c.id} necesita al menos dos opciones`);
      if (new Set(vals).size !== vals.length) e.push(`${donde}: campo ${c.id} con opciones repetidas`);
      if (c.opciones.some((o) => !o.etiqueta?.trim())) e.push(`${donde}: campo ${c.id} con opciones sin etiqueta`);
      if (c.porDefecto !== undefined && !vals.includes(c.porDefecto)) e.push(`${donde}: campo ${c.id} porDefecto fuera de las opciones`);
    }
    if (c.tipo === "region") {
      const regs = (pais.mercado.regiones ?? []).map((r) => r.id);
      if (regs.length === 0) e.push(`${donde}: campo ${c.id} es de tipo region pero el mercado no declara regiones`);
      if (c.regiones !== undefined) {
        if (c.regiones.length === 0) e.push(`${donde}: campo ${c.id} con regiones vacías`);
        for (const r of c.regiones) if (!regs.includes(r)) e.push(`${donde}: campo ${c.id} lista la región "${r}", que no está en mercado.regiones`);
      }
      const validas = c.regiones ?? regs;
      if (c.porDefecto !== undefined && !validas.includes(c.porDefecto)) e.push(`${donde}: campo ${c.id} porDefecto no es una de sus regiones`);
    }
    if (c.tipo === "opcion-dato" && def.requiere[c.dato] !== "mapa") e.push(`${donde}: campo ${c.id} toma opciones de "${c.dato}", que tiene que estar en requiere como "mapa"`);
    if (c.tipo === "moneda" || c.tipo === "numero" || c.tipo === "entero" || c.tipo === "porcentaje") {
      if (c.min !== undefined && c.max !== undefined && c.min > c.max) e.push(`${donde}: campo ${c.id} con min mayor que max`);
      if (c.porDefecto !== undefined && ((c.min !== undefined && c.porDefecto < c.min) || (c.max !== undefined && c.porDefecto > c.max))) e.push(`${donde}: campo ${c.id} porDefecto fuera de rango`);
      if (c.moneda !== undefined && !pais.mercado.monedas.includes(c.moneda)) e.push(`${donde}: campo ${c.id} en ${c.moneda}, que no es moneda del mercado`);
    }
    if (c.tipo === "fecha" && c.porDefecto !== undefined && c.porDefecto !== "hoy" && !esFechaISO(c.porDefecto)) e.push(`${donde}: campo ${c.id} porDefecto no es fecha`);
  }

  if (def.resultado.length === 0) e.push(`${donde}: sin filas de resultado`);
  const claves = def.resultado.map((f) => f.clave);
  claves.forEach((k, i) => claves.indexOf(k) !== i && e.push(`${donde}: fila "${k}" repetida`));
  for (const f of def.resultado) {
    if (!f.etiqueta?.trim()) e.push(`${donde}: fila ${f.clave} sin etiqueta`);
    if ("moneda" in f && f.moneda !== undefined && !pais.mercado.monedas.includes(f.moneda)) e.push(`${donde}: fila ${f.clave} en ${f.moneda}, que no es moneda del mercado`);
  }
  if (def.redondeo && (!Number.isInteger(def.redondeo.decimales) || def.redondeo.decimales < 0)) e.push(`${donde}: redondeo inválido`);
}

function validarContenido(pais: PaisDefinido, def: DefinicionCalculadora, c: ContenidoCalculadora, e: string[]) {
  const donde = `contenido de ${def.id}`;
  if (c.calculadora !== def.id) e.push(`${donde}: contenido.calculadora es "${c.calculadora}"`);
  for (const k of ["h1", "title", "description"] as const) if (!c[k]?.trim()) e.push(`${donde}: ${k} vacío`);
  if (c.intro.length === 0) e.push(`${donde}: intro vacía`);
  if (c.comoSeCalcula.length === 0) e.push(`${donde}: comoSeCalcula vacío`);
  if (def.estado !== "borrador" && c.faq.length < 3) e.push(`${donde}: al menos 3 preguntas frecuentes`);
  for (const t of textosDeContenido(c)) {
    if (!t?.trim()) e.push(`${donde}: hay un texto vacío`);
    if (hayLlavesSueltas(t)) e.push(`${donde}: llaves {{ }} mal escritas en "${t.slice(0, 60)}"`);
    for (const m of marcadoresDe(t)) {
      const req = def.requiere[m.id];
      if (!req) {
        e.push(`${donde}: el marcador ${m.texto} usa "${m.id}", que no está en requiere`);
        continue;
      }
      const porRegion = req.endsWith("-por-region");
      if (porRegion && !m.desde && m.region === undefined) e.push(`${donde}: ${m.texto} necesita @region porque el dato es por región`);
      if (m.region !== undefined) {
        const dato = pais.datos.find((d) => d.id === m.id);
        if (!porRegion || !dato?.regiones?.includes(m.region)) e.push(`${donde}: ${m.texto} usa una región que el dato no tiene`);
      }
      const base = req.replace("-por-region", "");
      if (base === "escala" && !m.desde && (m.campo === undefined || !/^-?\d+$/.test(m.clave ?? ""))) {
        e.push(`${donde}: ${m.texto} es una escala: mostrá una fila con [n].tasa, [n].desde, [n].hasta o [n].cuotaFija (n desde 0, -1 la última)`);
      }
      if (base !== "escala" && m.campo !== undefined) e.push(`${donde}: ${m.texto} usa .${m.campo}, que solo vale para filas de una escala`);
      if (base === "mapa" && m.clave === undefined && !m.desde) e.push(`${donde}: ${m.texto} necesita [clave] porque el dato es un mapa`);
    }
  }
}

export function validarPais(pais: PaisDefinido, opciones: OpcionesValidacion): Informe {
  const { hoy } = opciones;
  const hoyMax = opciones.hoyMasAdelantado ?? hoy;
  const estricto = opciones.estricto ?? true;
  const e: string[] = [...pais.errores];
  const a: string[] = [];
  const m = pais.mercado;
  const cod = m.codigo;
  const enMas = sumarDias(hoy, DIAS_PREAVISO);

  for (const d of pais.datos) {
    if (d.proximaRevision && d.proximaRevision < hoy) a.push(`${d.id}: la próxima revisión (${d.proximaRevision}) ya pasó`);
    const regiones = d.regiones ?? [undefined];
    for (const r of regiones) {
      const hoyV = vigente(d, hoy, r);
      if (hoyV && !vigente(d, enMas, r)) a.push(`${d.id}${r ? `@${r}` : ""}: no hay tramo verificado para el ${enMas} (vence en menos de ${DIAS_PREAVISO} días)`);
    }
  }
  for (const s of pais.series) {
    const ultimo = s.puntos[s.puntos.length - 1]?.[0];
    if (ultimo && !valorSerie(s, hoy) && ultimo <= hoy) a.push(`${s.id}: el último valor es del ${ultimo} (${diasEntre(ultimo, hoy)} días, máximo ${s.maxAntiguedadDias})`);
  }

  const idsCalc = pais.calculadoras.map((c) => c.definicion.id);
  const slugs = pais.calculadoras.map((c) => c.definicion.slug);
  idsCalc.forEach((x, i) => idsCalc.indexOf(x) !== i && e.push(`calculadora ${x} registrada dos veces`));
  slugs.forEach((x, i) => slugs.indexOf(x) !== i && e.push(`slug "${x}" repetido en ${cod}`));
  const conceptos = pais.calculadoras.map((c) => c.definicion.concepto).filter((c) => c !== "propio");
  conceptos.forEach((x, i) => conceptos.indexOf(x) !== i && e.push(`concepto "${x}" usado por dos calculadoras de ${cod} (el clúster hreflang necesita una sola)`));

  let publicablesHoy = 0;
  for (const entrada of pais.calculadoras) {
    const def = entrada.definicion;
    const antes = e.length;
    validarDefinicion(pais, def, e);
    validarContenido(pais, def, entrada.contenido, e);
    if (typeof entrada.cliente !== "function") e.push(`calculadora ${def.id}: falta cliente: () => import("./${def.slug}.cliente")`);
    if (e.length > antes || def.estado === "borrador") continue;
    const r = resolverValores(pais, def, hoy);
    if (r.ok) {
      const sinResolver: string[] = [];
      rellenarContenido(entrada.contenido, { valores: r.valores, usados: r.usados, unidades: unidadesDe(pais), locale: m.locale, alFallar: (x) => sinResolver.push(x) });
      for (const x of new Set(sinResolver)) e.push(`contenido de ${def.id}: el marcador ${x} no se resuelve hoy (${hoy}): índice de fila fuera de la escala, clave o región que no está, o campo vacío`);
      publicablesHoy++;
      const r30 = resolverValores(pais, def, enMas);
      if (!r30.ok) a.push(`calculadora ${def.id}: deja de ser publicable antes del ${enMas}: ${r30.motivos.join("; ")}`);
    } else {
      const msj = `calculadora ${def.id} está en estado ${def.estado} pero hoy (${hoy}) no se puede publicar: ${r.motivos.join("; ")}. Si el dato no está verificado, poné la calculadora en "borrador"`;
      (estricto ? e : a).push(msj);
    }
  }
  // Depende del día (un tramo que venció), no de la estructura: con estricto=false (PAISES_TOLERANTE)
  // baja a aviso para que un país vencido no frene los datos de Argentina ni los de otro país.
  if (m.codigo !== "global" && m.estado === "publicado" && mercadoVisible({ ...pais, errores: [] }, "produccion") && publicablesHoy === 0) {
    (estricto ? e : a).push(`mercado ${cod} está publicado pero no tiene ninguna calculadora publicable hoy`);
  }

  for (const av of pais.avisos) {
    if (av.aplicaA === "*") continue;
    for (const x of av.aplicaA) if (!idsCalc.includes(x) && !esConcepto(x)) e.push(`aviso ${av.id}: aplicaA "${x}" no es una calculadora de ${cod} ni un concepto`);
  }

  const idsNov = pais.novedades.map((n) => n.id);
  for (const n of pais.novedades) {
    if (!esIdDelMercado(n.id, cod)) e.push(`novedad ${n.id}: id tiene que ser "${cod}.<kebab-case>"`);
    if (idsNov.indexOf(n.id) !== idsNov.lastIndexOf(n.id)) e.push(`novedad ${n.id} repetida`);
    if (!esFechaISO(n.fecha) || n.fecha > hoyMax) e.push(`novedad ${n.id}: fecha inválida o futura`);
    if (n.vigenteDesde !== undefined && !esFechaISO(n.vigenteDesde)) e.push(`novedad ${n.id}: vigenteDesde inválida`);
    if (!n.titulo?.trim() || !n.texto?.trim()) e.push(`novedad ${n.id}: título o texto vacío`);
    e.push(...validarFuente(n.fuente, `novedad ${n.id}.fuente`, cod, hoyMax));
    for (const c of n.calculadoras) if (!idsCalc.includes(c)) e.push(`novedad ${n.id}: calculadora "${c}" no existe`);
  }

  const idsDet = pais.detectores.map((d) => d.id);
  for (const d of pais.detectores) {
    if (!esIdDelMercado(d.id, cod)) e.push(`detector ${d.id}: id tiene que ser "${cod}.<kebab-case>"`);
    if (idsDet.indexOf(d.id) !== idsDet.lastIndexOf(d.id)) e.push(`detector ${d.id} repetido`);
    e.push(...validarUrl(d.url, `detector ${d.id}.url`, cod));
    if (typeof d.traer !== "function") e.push(`detector ${d.id}: falta traer()`);
    if (d.carril === "serie") {
      if (!pais.series.some((s) => s.id === d.serie)) e.push(`detector ${d.id}: la serie "${d.serie}" no está en series.json`);
      const b = d.banda;
      if (!b || !(b.min < b.max) || !(b.saltoRelativoMax > 0)) e.push(`detector ${d.id}: banda inválida (min < max, saltoRelativoMax > 0)`);
    } else if (d.carril === "norma") {
      if (d.datos.length === 0) e.push(`detector ${d.id}: datos vacío`);
      for (const x of d.datos) if (!pais.datos.some((z) => z.id === x)) e.push(`detector ${d.id}: el dato "${x}" no está en datos.json`);
    } else e.push(`detector ${(d as { id: string }).id}: carril tiene que ser "serie" o "norma"`);
  }
  return { errores: e, avisos: a };
}
