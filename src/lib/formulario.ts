export type ValorCampo = string | boolean;

export type Campos = {
  v: 1;
  c: Record<string, ValorCampo>;
  a?: string[];
};

export const VERSION_CAMPOS = 1;
export const MAX_CAMPOS_BYTES = 8 * 1024;
export const MAX_CLAVES = 200;
export const MAX_ACCIONES = 80;
export const MAX_CLAVE = 80;
export const MAX_VALOR = 500;
const MAX_HASH = Math.ceil((MAX_CAMPOS_BYTES * 4) / 3) + 8;

const RUTAS_PRIVADAS = /^\/(api|cuenta|dashboard|login|registro|recuperar|auth|_next)(\/|$)/;

export function esRutaCalculo(p: unknown): p is string {
  return (
    typeof p === "string" &&
    p.length <= 120 &&
    /^\/[a-z0-9\-/]*$/.test(p) &&
    !p.includes("//") &&
    !RUTAS_PRIVADAS.test(p)
  );
}

export function bytesDe(texto: string): number {
  return new TextEncoder().encode(texto).length;
}

export function validarCampos(x: unknown): Campos | null {
  if (!x || typeof x !== "object" || Array.isArray(x)) return null;
  const o = x as Record<string, unknown>;
  if (o.v !== VERSION_CAMPOS) return null;
  if (!o.c || typeof o.c !== "object" || Array.isArray(o.c)) return null;
  const entradas = Object.entries(o.c as Record<string, unknown>);
  if (entradas.length > MAX_CLAVES) return null;
  const c: Record<string, ValorCampo> = {};
  for (const [k, v] of entradas) {
    if (!k || k.length > MAX_CLAVE) return null;
    if (typeof v === "boolean") c[k] = v;
    else if (typeof v === "string" && v.length <= MAX_VALOR) c[k] = v;
    else return null;
  }
  const salida: Campos = { v: VERSION_CAMPOS, c };
  if (o.a !== undefined) {
    if (!Array.isArray(o.a) || o.a.length > MAX_ACCIONES) return null;
    for (const k of o.a) if (typeof k !== "string" || !k || k.length > MAX_CLAVE) return null;
    if (o.a.length) salida.a = o.a as string[];
  }
  if (bytesDe(JSON.stringify(salida)) > MAX_CAMPOS_BYTES) return null;
  return salida;
}

function aBase64Url(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function deBase64Url(texto: string): Uint8Array | null {
  if (!/^[A-Za-z0-9_-]*$/.test(texto)) return null;
  try {
    const b64 = texto.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((texto.length + 3) % 4);
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  } catch {
    return null;
  }
}

export function codificar(campos: Campos): string | null {
  const valido = validarCampos(campos);
  if (!valido) return null;
  return aBase64Url(new TextEncoder().encode(JSON.stringify(valido)));
}

export function decodificar(texto: string): Campos | null {
  if (!texto || texto.length > MAX_HASH) return null;
  const bytes = deBase64Url(texto);
  if (!bytes) return null;
  try {
    return validarCampos(JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)));
  } catch {
    return null;
  }
}

export const PREFIJO_HASH = "#v=";

export function hashDe(campos: Campos): string | null {
  const c = codificar(campos);
  return c ? PREFIJO_HASH + c : null;
}

export function camposDeHash(hash: string): Campos | null {
  return hash.startsWith(PREFIJO_HASH) ? decodificar(hash.slice(PREFIJO_HASH.length)) : null;
}

// Un clic en un segmento no es un cálculo: hace falta un número/fecha cargado, o un
// select/casilla que se movió de su valor inicial.
export function hayDatos(campos: Campos, base?: Record<string, ValorCampo> | null): boolean {
  for (const [k, v] of Object.entries(campos.c)) {
    const conBase = !!base && k in base;
    if (conBase && base![k] === v) continue;
    if (typeof v === "string" && v !== "" && !k.startsWith("s:") && !k.startsWith("t")) return true;
    if (conBase && !k.startsWith("t")) return true;
  }
  return false;
}

/* ---------- DOM ---------- */

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type Tipo = "texto" | "select" | "check" | "radio" | "toggle";
type Entrada = { clave: string; el: HTMLElement; tipo: Tipo; grupo?: HTMLInputElement[] };

const TIPOS_FUERA = new Set([
  "email",
  "password",
  "hidden",
  "file",
  "submit",
  "button",
  "reset",
  "image",
  "search",
  "tel",
]);

const SEL_TOGGLE =
  "button[aria-pressed],[role='tab'][aria-selected],[role='radio'][aria-checked],[role='switch'][aria-checked],[role='checkbox'][aria-checked]";

const ACCION_FUERA = /copi|compart|comprar|descarg|imprim|whatsapp|pdf|suscrib|enviar/i;

export function raizPagina(): HTMLElement | null {
  return typeof document === "undefined" ? null : document.querySelector("main");
}

function formFuera(f: HTMLFormElement): boolean {
  return (
    f.hasAttribute("action") ||
    !!f.querySelector("input[type=email],input[type=password],[autocomplete~=email]")
  );
}

function enZonaExcluida(el: Element): boolean {
  if (el.closest("dialog,search,[role=search],[role=combobox],[data-sin-herramientas],[aria-hidden='true'],[inert]"))
    return true;
  const f = el.closest("form");
  return !!f && formFuera(f);
}

export function esControlElegible(el: EventTarget | null, raiz: HTMLElement | null = raizPagina()): el is Control {
  if (!raiz || !(el instanceof HTMLElement) || !raiz.contains(el)) return false;
  if (!(el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement))
    return false;
  if (el instanceof HTMLInputElement) {
    if (TIPOS_FUERA.has(el.type)) return false;
    if (el.inputMode === "email" || el.inputMode === "tel") return false;
  }
  if (el instanceof HTMLSelectElement && el.multiple) return false;
  const ac = (el.getAttribute("autocomplete") || "").trim().toLowerCase();
  if (ac && ac !== "off" && ac !== "on") return false;
  return !enZonaExcluida(el);
}

function limpio(s: string | null | undefined, n = 40): string {
  return (s || "").replace(/\s+/g, " ").trim().slice(0, n);
}

// Sólo la primera línea visible: el texto de ayuda de una etiqueta («Si entraste o saliste…»)
// o la fecha de pago bajo un segmento cambian más seguido que el nombre del campo.
function primeraLinea(el: Element | null | undefined, n = 40): string {
  if (!el) return "";
  const t = (el as HTMLElement).innerText ?? el.textContent ?? "";
  return limpio(t.split("\n").find((l) => l.trim()) ?? "", n);
}

function idEstable(el: HTMLElement): string {
  const id = el.id;
  return id && !/[«»:]/.test(id) && id.length <= 60 ? id : "";
}

function etiquetaDe(el: Control): string {
  const labels = (el as HTMLInputElement).labels;
  if (labels && labels.length) {
    const l = primeraLinea(labels[0]);
    if (l) return l;
  }
  const ref = el.getAttribute("aria-labelledby");
  if (ref) {
    const t = limpio(
      ref
        .split(/\s+/)
        .map((id) => document.getElementById(id)?.textContent || "")
        .join(" ")
    );
    if (t) return t;
  }
  return "";
}

function claveBaseControl(el: Control): string {
  const id = idEstable(el);
  if (id) return `#${id}`;
  if (el instanceof HTMLInputElement && el.type === "radio" && el.name) return `r:${el.name}`;
  if (el.name) return `n:${limpio(el.name, 60)}`;
  const aria = limpio(el.getAttribute("aria-label"));
  if (aria) return `a:${aria}`;
  const etq = etiquetaDe(el);
  if (etq) return `l:${etq}`;
  const ph = limpio(el.getAttribute("placeholder"));
  if (ph) return `p:${ph}`;
  return `i:${el.tagName.toLowerCase()}${el instanceof HTMLInputElement ? "." + el.type : ""}`;
}

function claveBaseBoton(el: HTMLElement): string {
  const id = idEstable(el);
  if (id) return `#${id}`;
  return `b:${limpio(el.getAttribute("aria-label")) || primeraLinea(el) || el.tagName.toLowerCase()}`;
}

function conSufijos<T>(items: T[], base: (x: T) => string): [string, T][] {
  const vistos = new Map<string, number>();
  return items.map((x) => {
    const b = base(x);
    const n = (vistos.get(b) ?? 0) + 1;
    vistos.set(b, n);
    return [n === 1 ? b : `${b}~${n}`, x];
  });
}

function tipoDe(el: Control): Tipo {
  if (el instanceof HTMLSelectElement) return "select";
  if (el instanceof HTMLInputElement) {
    if (el.type === "checkbox") return "check";
    if (el.type === "radio") return el.name ? "radio" : "check";
  }
  return "texto";
}

function entradasControles(raiz: HTMLElement): Entrada[] {
  const todos = Array.from(raiz.querySelectorAll<Control>("input,select,textarea")).filter((el) =>
    esControlElegible(el, raiz)
  );
  const radios = new Map<string, HTMLInputElement[]>();
  const unicos: Control[] = [];
  for (const el of todos) {
    if (el instanceof HTMLInputElement && el.type === "radio" && el.name) {
      const g = radios.get(el.name);
      if (g) {
        g.push(el);
        continue;
      }
      radios.set(el.name, [el]);
    }
    unicos.push(el);
  }
  return conSufijos(unicos, claveBaseControl).map(([clave, el]) => {
    const tipo = tipoDe(el);
    return tipo === "radio"
      ? { clave, el, tipo, grupo: radios.get((el as HTMLInputElement).name) }
      : { clave, el, tipo };
  });
}

function esToggle(el: Element): boolean {
  return el.matches(SEL_TOGGLE);
}

function entradasToggles(raiz: HTMLElement): Entrada[] {
  const els = Array.from(raiz.querySelectorAll<HTMLElement>(SEL_TOGGLE)).filter(
    (el) => !enZonaExcluida(el)
  );
  return conSufijos(els, claveBaseBoton).map(([clave, el]) => ({ clave: `t${clave}`, el, tipo: "toggle" }));
}

function estadoToggle(el: HTMLElement): boolean {
  return (
    el.getAttribute("aria-pressed") === "true" ||
    el.getAttribute("aria-selected") === "true" ||
    el.getAttribute("aria-checked") === "true"
  );
}

function leer(e: Entrada): ValorCampo {
  if (e.tipo === "toggle") return estadoToggle(e.el);
  if (e.tipo === "check") return (e.el as HTMLInputElement).checked;
  if (e.tipo === "radio") return e.grupo?.find((r) => r.checked)?.value ?? "";
  return (e.el as Control).value.slice(0, MAX_VALOR);
}

function prefijo(e: Entrada): string {
  return e.tipo === "select" ? "s:" : "";
}

export function capturarBase(raiz: HTMLElement | null = raizPagina()): Record<string, ValorCampo> {
  const base: Record<string, ValorCampo> = {};
  if (!raiz) return base;
  for (const e of [...entradasToggles(raiz), ...entradasControles(raiz)]) base[prefijo(e) + e.clave] = leer(e);
  return base;
}

export function serializar(
  raiz: HTMLElement | null = raizPagina(),
  base?: Record<string, ValorCampo> | null,
  acciones?: string[]
): Campos {
  const c: Record<string, ValorCampo> = {};
  if (raiz) {
    for (const e of [...entradasToggles(raiz), ...entradasControles(raiz)]) {
      const k = prefijo(e) + e.clave;
      if (k.length > MAX_CLAVE) continue;
      if (e.tipo !== "toggle" && (e.el as Control).disabled) continue;
      const v = leer(e);
      if (base && k in base && base[k] === v && (v === "" || v === false)) continue;
      if (e.tipo === "toggle" && v === false && !(base && k in base && base[k] === true)) continue;
      c[k] = v;
    }
  }
  const campos: Campos = { v: VERSION_CAMPOS, c };
  if (acciones?.length) campos.a = acciones.slice(0, MAX_ACCIONES);
  return campos;
}

function fijarValor(el: Control, v: string) {
  const proto =
    el instanceof HTMLSelectElement
      ? HTMLSelectElement.prototype
      : el instanceof HTMLTextAreaElement
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
  if (setter) setter.call(el, v);
  else el.value = v;
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
}

function escribir(e: Entrada, v: ValorCampo): boolean {
  if (e.tipo === "toggle") {
    if (typeof v !== "boolean" || estadoToggle(e.el) === v) return false;
    if ((e.el as HTMLButtonElement).disabled) return false;
    e.el.click();
    return true;
  }
  const el = e.el as Control;
  if (el.disabled || (el as HTMLInputElement).readOnly) return false;
  if (e.tipo === "check") {
    if (typeof v !== "boolean" || (el as HTMLInputElement).checked === v) return false;
    el.click();
    return true;
  }
  if (typeof v !== "string") return false;
  if (e.tipo === "radio") {
    const r = e.grupo?.find((x) => x.value === v);
    if (!r || r.checked || r.disabled) return false;
    r.click();
    return true;
  }
  if (el.value === v) return false;
  fijarValor(el, v);
  return true;
}

const esperar = (ms = 0) => new Promise<void>((r) => setTimeout(r, ms));

function mapa(entradas: Entrada[]): Map<string, Entrada> {
  const m = new Map<string, Entrada>();
  for (const e of entradas) m.set(prefijo(e) + e.clave, e);
  return m;
}

// Varias pasadas porque los campos condicionales aparecen recién cuando React re-renderiza
// después de marcar otro (checkbox «no trabajé el semestre completo» → fechas), y porque un
// select puede resetear a otro al cambiar (el segundo pase lo vuelve a fijar).
// El rastreo lee esta marca: un checkbox.click() genera input/change con isTrusted=true en Chrome,
// y sin ella cada link compartido contaría como alguien usando la calculadora.
export const MARCA_RESTAURANDO = "caRestaurando";

export async function restaurar(raiz: HTMLElement | null, campos: Campos): Promise<number> {
  if (!raiz) return 0;
  const valido = validarCampos(campos);
  if (!valido) return 0;
  document.documentElement.dataset[MARCA_RESTAURANDO] = "1";
  try {
    return await aplicar(raiz, valido);
  } finally {
    delete document.documentElement.dataset[MARCA_RESTAURANDO];
  }
}

async function aplicar(raiz: HTMLElement, valido: NonNullable<ReturnType<typeof validarCampos>>): Promise<number> {

  for (const clave of valido.a ?? []) {
    const btn = mapaBotonesAccion(raiz).get(clave);
    if (btn && !(btn as HTMLButtonElement).disabled) {
      btn.click();
      await esperar(0);
    }
  }
  if (valido.a?.length) await esperar(16);

  const pendientes = Object.entries(valido.c);
  for (let pasada = 0; pasada < 6; pasada++) {
    let cambios = 0;
    for (const deseado of [true, false]) {
      const toggles = mapa(entradasToggles(raiz));
      let hubo = 0;
      for (const [k, v] of pendientes) {
        const e = toggles.get(k);
        if (e && v === deseado && escribir(e, v)) hubo++;
      }
      if (hubo) {
        cambios += hubo;
        await esperar(0);
      }
    }
    const controles = mapa(entradasControles(raiz));
    for (const [k, v] of pendientes) {
      const e = controles.get(k);
      if (e && escribir(e, v)) cambios++;
    }
    await esperar(16);
    if (!cambios) break;
  }

  const final = mapa([...entradasToggles(raiz), ...entradasControles(raiz)]);
  let aplicados = 0;
  for (const [k, v] of pendientes) {
    const e = final.get(k);
    if (e ? leer(e) === v : v === false) aplicados++;
  }
  return aplicados;
}

export function estaHidratado(raiz: HTMLElement | null = raizPagina()): boolean {
  const el = raiz?.querySelector("input,select,textarea,button");
  return !!el && Object.keys(el).some((k) => k.startsWith("__reactProps"));
}

export function hayControles(raiz: HTMLElement | null = raizPagina()): boolean {
  if (!raiz) return false;
  for (const el of raiz.querySelectorAll("input,select,textarea")) if (esControlElegible(el, raiz)) return true;
  return false;
}

/* ---------- raíz de la calculadora ---------- */

function ancestroComun(els: Element[]): Element | null {
  if (!els.length) return null;
  let a: Element | null = els[0];
  for (const el of els.slice(1)) {
    while (a && !a.contains(el)) a = a.parentElement;
  }
  return a;
}

const CONTENEDORES = new Set(["MAIN", "ARTICLE", "SECTION", "BODY"]);

export function raizCalculadora(raiz: HTMLElement | null = raizPagina()): HTMLElement | null {
  if (!raiz) return null;
  const ctrls = Array.from(raiz.querySelectorAll("input,select,textarea")).filter((el) =>
    esControlElegible(el, raiz)
  );
  let nodo = ancestroComun(ctrls) as HTMLElement | null;
  if (!nodo || nodo === raiz) return nodo;
  while (nodo.parentElement && nodo.parentElement !== raiz) {
    const p: HTMLElement = nodo.parentElement;
    if (CONTENEDORES.has(p.tagName)) break;
    if (Array.from(p.children).some((h) => h.tagName === "H1" || h.tagName === "HEADER")) break;
    nodo = p;
  }
  return nodo;
}

/* ---------- acciones (botones sin estado semántico) ---------- */

function esBotonAccion(el: HTMLElement, calc: HTMLElement): boolean {
  if (!(el instanceof HTMLButtonElement) || !calc.contains(el)) return false;
  if (el.type === "submit" && el.form) return false;
  if (esToggle(el) || enZonaExcluida(el)) return false;
  if (el.closest("a,[aria-live]")) return false;
  if (el.hasAttribute("aria-haspopup") || el.hasAttribute("aria-expanded") || el.hasAttribute("aria-controls"))
    return false;
  return !ACCION_FUERA.test(`${el.getAttribute("aria-label") || ""} ${el.textContent || ""}`);
}

function mapaBotonesAccion(raiz: HTMLElement): Map<string, HTMLElement> {
  const calc = raizCalculadora(raiz) ?? raiz;
  const btns = Array.from(calc.querySelectorAll<HTMLElement>("button")).filter((b) => esBotonAccion(b, calc));
  return new Map(conSufijos(btns, claveBaseBoton));
}

type Accion = { clave: string; grupo: Element | null; estructural?: boolean };

export type Registro = {
  registrar: (btn: HTMLElement, raiz?: HTMLElement | null) => void;
  lista: () => string[];
  limpiar: () => void;
};

// Los botones de un segmento (con retiro / sin retiro) no tienen estado en el DOM: se
// reproduce el clic. Si el clic no agregó ni sacó controles, sólo importa el último de su
// grupo; si los agregó (sumar un hijo, una persona) se reproducen todos, en orden.
export function crearRegistro(): Registro {
  let acciones: Accion[] = [];
  const contar = (raiz: HTMLElement) => raiz.querySelectorAll("input,select,textarea,button").length;
  return {
    registrar(btn, raiz = raizPagina()) {
      if (!raiz) return;
      const calc = raizCalculadora(raiz);
      if (!calc || !esBotonAccion(btn, calc) || acciones.length >= MAX_ACCIONES) return;
      const clave = [...mapaBotonesAccion(raiz)].find(([, b]) => b === btn)?.[0];
      if (!clave || clave.length > MAX_CLAVE) return;
      const accion: Accion = { clave, grupo: btn.parentElement };
      acciones.push(accion);
      const antes = contar(raiz);
      setTimeout(() => {
        accion.estructural = contar(raiz) !== antes;
        if (accion.estructural) return;
        acciones = acciones.filter(
          (x) => x === accion || x.estructural !== false || x.grupo !== accion.grupo
        );
      }, 0);
    },
    lista: () => acciones.map((a) => a.clave),
    limpiar() {
      acciones = [];
    },
  };
}

/* ---------- textos derivados ---------- */

export function tituloPagina(raiz: HTMLElement | null = raizPagina()): string {
  // El <title> arranca por el nombre de la herramienta («Calculadora de Aguinaldo 2026: …»);
  // el h1 a veces es una pregunta larga. Se usa el h1 sólo si no hay título.
  const doc = typeof document !== "undefined" ? document.title.split(" · ")[0] : "";
  const base = (doc || limpio(raiz?.querySelector("h1")?.textContent, 120)).split(":")[0];
  const sin = limpio(base.replace(/^calculadora\s+(de|del|para)\s+(la\s+|el\s+|los\s+|las\s+)?/i, ""), 56);
  if (/^[\u10D0-\u10FF]/.test(sin)) return sin; // el georgiano no tiene mayúsculas (ADR 0002, D26)
  return sin ? sin.charAt(0).toUpperCase() + sin.slice(1) : "Mi cálculo";
}

function numeroAr(v: string): number | null {
  if (!/^\d{1,3}(\.\d{3})+(,\d+)?$|^\d+(,\d+)?$/.test(v)) return null;
  const n = Number(v.replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

const PISTA_PLATA = /\$|sueldo|salario|monto|importe|haber|ingreso|precio|alquiler|factur|remuner|cuota|capital|valor/i;

export function datoClave(raiz: HTMLElement | null = raizPagina()): string {
  if (!raiz) return "";
  for (const e of entradasControles(raiz)) {
    if (e.tipo !== "texto") continue;
    const el = e.el as HTMLInputElement;
    const v = limpio(el.value, 24);
    if (!v || !/\d/.test(v)) continue;
    if (el.type === "date") {
      const [a, m, d] = v.split("-");
      return d ? `${d}/${m}/${a}` : v;
    }
    const contexto = `${etiquetaDe(el)} ${el.getAttribute("aria-label") || ""} ${el.parentElement?.textContent || ""}`;
    const n = numeroAr(v);
    const lindo = n === null ? v : n.toLocaleString("es-AR", { maximumFractionDigits: 2 });
    return PISTA_PLATA.test(contexto) && !lindo.startsWith("$") ? `$ ${lindo}` : lindo;
  }
  return "";
}

export function tituloSugerido(raiz: HTMLElement | null = raizPagina()): string {
  const t = tituloPagina(raiz);
  const d = datoClave(raiz);
  return (d ? `${t} · ${d}` : t).slice(0, 80);
}

export function resumenDe(raiz: HTMLElement | null = raizPagina()): string {
  const calc = raizCalculadora(raiz);
  if (!calc) return "";
  for (const r of calc.querySelectorAll<HTMLElement>("[aria-live]")) {
    if (r.tagName === "BUTTON") continue;
    const t = limpio(r.innerText || r.textContent, 200);
    if (t.length > 8) return t;
  }
  return "";
}
