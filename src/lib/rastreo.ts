import { expDeLaVista } from "@/lib/experimentos";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";
import type { Sitio } from "@/lib/medicion/mercados";
import { origenIntl } from "@/motor/sitio";

export const TIPOS_EVENTO = [
  "vista_oferta",
  "cta_compra",
  "dialogo_compra",
  "checkout",
  "compartir",
  "copiar_resultado",
  "guardar_calculo",
  "imprimir",
  "suscripcion",
  "busqueda",
  "registro",
  "login",
  "descarga",
  "error",
  "llegada",
  "puente_visto",
  "puente_clic",
  "afiliado_clic",
] as const;

// Los tipos de boca en boca entran a la base con las migraciones 20261023130000 y 20261023170000. Antes de
// aplicarlas el CHECK de ca_eventos los rechaza, y /api/e los saca del lote para no perder los demás eventos.
export const TIPOS_BOCA_A_BOCA: ReadonlySet<string> = new Set(["llegada", "puente_visto", "puente_clic", "afiliado_clic"]);

export type TipoEvento = (typeof TIPOS_EVENTO)[number];

export type DatosEvento = {
  producto?: string;
  valor?: number;
  props?: Record<string, string | number | boolean | null>;
};

export function esTipoEvento(x: unknown): x is TipoEvento {
  return (TIPOS_EVENTO as readonly unknown[]).includes(x);
}

type Item = Record<string, unknown>;

const DESTINO = "/api/e";
const PRIVADA = /^\/(dashboard|cuenta|login|registro|recuperar|auth)(\/|$)/;
const INACTIVO = 30_000;
const SESION = 1_800_000;
const ORIGEN_INTL = origenIntl();
const HOST_INTL = ORIGEN_INTL ? new URL(ORIGEN_INTL).hostname : null;

export type ContextoVista = { sitio: Sitio; mercado: string };
const CONTEXTO_AR: ContextoVista = { sitio: "ar", mercado: "ar" };

let estado = 0;
let vid = "";
let sid = "";
let vista = "";
let ruta = "";
let tocada = 0;
let cola: Item[] = [];
let fuente: Item = {};
let timer: ReturnType<typeof setTimeout> | undefined;
let io: IntersectionObserver | undefined;
let ofertas = new Set<string>();

let activo = 0;
let marca = 0;
let ultima = 0;
let visible = true;
let n = 0;
let scroll = 0;
let uso = false;
let errores = 0;
let campo: EventTarget | null = null;
let midiendo = false;
let ultimoCierre = "";
let contexto: ContextoVista = CONTEXTO_AR;
let abierta = 0;
let resultadoMs: number | null = null;
let base = "";
let pendiente = false;
let mo: MutationObserver | undefined;
let revisar: ReturnType<typeof setTimeout> | undefined;
let campoUlt = "";
let rabia = 0;
let rabiaEl = "";
let clics: { t: number; x: number; y: number }[] = [];
let vistaInicial = "";

const local = () => localStorage;
const sesionAlmacen = () => sessionStorage;

function leer(s: () => Storage, k: string): string {
  try {
    return s().getItem(k) || "";
  } catch {
    return "";
  }
}

function escribir(s: () => Storage, k: string, v: string) {
  try {
    s().setItem(k, v);
  } catch {}
}

export function hostExterno(referrer: string, host: string): string {
  try {
    const h = new URL(referrer).hostname.toLowerCase().replace(/^www\./, "");
    return h && h !== host.replace(/^www\./, "") ? h : "";
  } catch {
    return "";
  }
}

export function normalizarRuta(p: string): string {
  const s = p.split(/[?#]/)[0].replace(/\/+$/, "");
  return (s || "/").slice(0, 120);
}

// Estricta, para todo lo que llega del cliente: `//evil.com` o `/\evil.com` en un href son URLs de
// otro sitio, así que las barras repetidas se colapsan y la barra invertida no pasa.
export function limpiarRuta(x: unknown): string | null {
  if (typeof x !== "string" || x.length > 300 || !x.startsWith("/")) return null;
  const p = normalizarRuta(x.split(/[?#]/)[0].replace(/\/{2,}/g, "/"));
  return /^\/[A-Za-z0-9\-._~%/]*$/.test(p) ? p : null;
}

function enviar() {
  clearTimeout(timer);
  timer = undefined;
  if (estado !== 1) return;
  while (cola.length) {
    const lote: Item = { vid, sid, i: cola.splice(0, 10) };
    if (contexto.sitio === "intl") lote.s = "intl";
    const cuerpo = JSON.stringify(lote);
    if (!navigator.sendBeacon?.(DESTINO, new Blob([cuerpo], { type: "text/plain" }))) {
      fetch(DESTINO, { method: "POST", body: cuerpo, keepalive: true, headers: { "Content-Type": "text/plain" } }).catch(() => {});
    }
  }
}

export function rastrear(tipo: TipoEvento, datos: DatosEvento = {}): void {
  if (!CUENTAS_ACTIVAS || estado === 2 || typeof window === "undefined" || cola.length > 50) return;
  const it: Item = { t: "e", k: tipo, p: normalizarRuta(location.pathname) };
  if (vista) it.v = vista;
  if (contexto.sitio === "intl") it.m = contexto.mercado;
  if (datos.producto) it.pr = datos.producto;
  if (datos.valor != null) it.va = datos.valor;
  if (datos.props && Object.keys(datos.props).length) it.pp = datos.props;
  cola.push(it);
  // El checkout navega a MercadoPago en el mismo tick: no hay debounce que llegue a correr.
  if (tipo === "checkout") enviar();
  else timer ??= setTimeout(enviar, 4000);
}

export function idVisitante(): string {
  return estado === 1 ? vid : "";
}

function sumar(t: number) {
  if (visible) activo += Math.max(0, Math.min(t, ultima + INACTIVO) - marca);
  marca = t;
}

function tocarSesion(ahora: number) {
  tocada = ahora;
  escribir(sesionAlmacen, "ca_sid", `${sid}.${ahora}`);
}

function actividad() {
  const t = performance.now();
  sumar(t);
  ultima = t;
  const ahora = Date.now();
  if (ahora - tocada > 60_000) tocarSesion(ahora);
}

function medirScroll() {
  midiendo = false;
  const h = document.documentElement.scrollHeight;
  const s = h ? Math.min(100, Math.round(((scrollY + innerHeight) / h) * 100)) : 100;
  if (s > scroll) scroll = s;
}

function cierre(): Item {
  sumar(performance.now());
  const c: Item = { t: "x", id: vista, a: Math.round(activo), n, s: scroll, u: uso };
  if (resultadoMs !== null) c.r = resultadoMs;
  if (campoUlt) c.c = campoUlt;
  if (rabia) {
    c.g = rabia;
    c.ge = rabiaEl;
  }
  return c;
}

function cerrar() {
  if (!vista) return;
  medirScroll();
  const c = cierre();
  const k = JSON.stringify(c);
  if (k !== ultimoCierre) cola.push(c);
  ultimoCierre = k;
  enviar();
}

function alCambiarVisibilidad() {
  sumar(performance.now());
  visible = !document.hidden;
  if (visible) ultima = marca;
  else cerrar();
}

function selector(el: Element | null): string {
  const partes: string[] = [];
  for (let e = el; e && e !== document.body && partes.length < 3; e = e.parentElement) {
    let s = e.tagName.toLowerCase();
    const id = e.id && !/[:«»]/.test(e.id) ? e.id : "";
    const clase = typeof e.className === "string" ? e.className.trim().split(/\s+/)[0] : "";
    if (id) s += `#${id}`;
    else if (clase) s += `.${clase}`;
    partes.unshift(s);
    if (id) break;
  }
  return partes.join(">").slice(-80);
}

// El texto del label es lo que el informe necesita para decir «se traban en "Sueldo bruto"».
function claveCampo(t: HTMLInputElement): string {
  const l = (t.labels?.[0]?.textContent || t.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim();
  if (l) return l.slice(0, 40);
  if (/^[A-Za-z][\w-]{0,39}$/.test(t.name || "")) return t.name;
  return t.id && !/[:«»]/.test(t.id) ? t.id.slice(0, 40) : t.tagName.toLowerCase();
}

// Las calculadoras muestran el resultado en una región aria-live dentro de <main> (las de calcular.ar y
// PielCalculadora del motor). Si esa región cambia de número después de que la persona tocó un campo,
// llegó a un resultado. Comparar contra la huella de antes de editar hace que un resultado precargado
// con valores de ejemplo no cuente como propio.
function huella(): string {
  let s = "";
  document.querySelectorAll<HTMLElement>("main [aria-live]").forEach((el) => {
    if (!el.closest("dialog") && el.dataset.estado !== "error") s += el.textContent ?? "";
  });
  return /\d/.test(s) ? s.slice(0, 2000) : "";
}

function verResultado() {
  revisar = undefined;
  if (!pendiente || resultadoMs !== null) return;
  const h = huella();
  if (h && h !== base) {
    resultadoMs = Math.round(performance.now() - abierta);
    pendiente = false;
    mo?.disconnect();
  }
}

function alMutar() {
  revisar ??= setTimeout(verResultado, 250);
}

// Corre en la fase de captura de window, antes que React: el DOM todavía muestra el resultado anterior.
function esperarResultado() {
  if (resultadoMs !== null) return;
  if (!pendiente) {
    base = huella();
    pendiente = true;
  }
  if (!mo && typeof MutationObserver !== "undefined") mo = new MutationObserver(alMutar);
  const main = document.querySelector("main");
  if (main) mo?.observe(main, { childList: true, subtree: true, characterData: true });
  alMutar();
}

// Tres toques en menos de 800 ms en el mismo lugar = algo que la persona espera que responda y no
// responde. Los campos y los botones de sumar/restar se tocan seguido a propósito: no cuentan.
function alPulsar(e: PointerEvent) {
  const el = e.target as Element | null;
  if (!e.isTrusted || !el?.closest || el.closest("input,select,textarea,label,[data-repetible]")) return;
  const t = performance.now();
  clics = clics.filter((c) => t - c.t < 800 && Math.abs(c.x - e.clientX) < 30 && Math.abs(c.y - e.clientY) < 30);
  clics.push({ t, x: e.clientX, y: e.clientY });
  if (clics.length < 3) return;
  rabia++;
  if (!rabiaEl) rabiaEl = selector(el);
  clics = [];
}

// Sólo la página de entrada: es la carga real (las navegaciones internas no tienen LCP propio) y la
// que decide si la persona se queda. INP y CLS se reportan al esconder la página; si para entonces
// navegó a otra, mezclan las dos y se tiran.
function medirVitals(id: string) {
  import("web-vitals/attribution")
    .then(({ onLCP, onINP, onCLS, onTTFB }) => {
      const mandar = (it: Item) => {
        if (estado !== 1) return;
        cola.push({ t: "w", id, ...it });
        if (document.hidden) enviar();
        else timer ??= setTimeout(enviar, 4000);
      };
      onLCP((m) => mandar({ lcp: m.value, le: m.attribution.target ?? "" }));
      onTTFB((m) => mandar({ ttfb: m.value }));
      onINP((m) => vista === id && mandar({ inp: m.value, ie: m.attribution.interactionTarget }));
      onCLS((m) => vista === id && mandar({ cls: Math.round(m.value * 1000) }));
    })
    .catch(() => {});
}

function alEditar(e: Event) {
  // Restaurar un link compartido dispara input/change sintéticos: eso no es alguien usando la calculadora.
  if (!e.isTrusted || document.documentElement.dataset.caRestaurando) return;
  const t = e.target as HTMLInputElement;
  if (!/^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName || "") || !t.closest("main") || t.closest("dialog")) return;
  if (/^(email|search|hidden|password)$/.test(t.type)) return;
  uso = true;
  campoUlt = claveCampo(t);
  esperarResultado();
  if (t !== campo) n++;
  campo = t;
  actividad();
}

function alClick(e: Event) {
  const el = (e.target as Element).closest?.<HTMLElement>("[data-evento]");
  const d = el?.dataset;
  if (!d || !esTipoEvento(d.evento)) return;
  const props: Record<string, string> = {};
  if (d.ubicacion) props.ubicacion = d.ubicacion;
  if (d.canal) props.canal = d.canal;
  rastrear(d.evento, { producto: d.producto, props });
}

// Un form de compra que se manda sin JS propio (el de calcularya) lleva `<input name="vid" data-ca-vid>`:
// se completa acá, antes de que el navegador arme los datos del envío, para atribuir la venta a la visita.
function alEnviar(e: Event) {
  const form = e.target as HTMLFormElement | null;
  const oculto = form?.querySelector?.<HTMLInputElement>("input[data-ca-vid]");
  if (oculto && vid) oculto.value = vid;
}

function alError(e: Event) {
  const r = (e as PromiseRejectionEvent).reason;
  const m = String((e as ErrorEvent).message || r?.message || r || "");
  if (errores >= 3 || !m || m === "Script error." || m.startsWith("ResizeObserver")) return;
  errores++;
  rastrear("error", { props: { m: m.replace(/(https?:\/\/[^\s?#]*)[?#]\S*/g, "$1").slice(0, 200) } });
}

// Una oferta más alta que la pantalla (en mobile llega a ~1.900 px contra 812) nunca muestra el 50 %
// de sí misma: cuenta como vista cuando ocupa media pantalla o deja ver la mitad de su alto.
function seVe(e: IntersectionObserverEntry): boolean {
  if (!e.isIntersecting) return false;
  const alto = e.rootBounds?.height ?? window.innerHeight;
  return e.intersectionRatio >= 0.5 || e.intersectionRect.height >= alto * 0.5;
}

function alVerOfertas(entradas: IntersectionObserverEntry[]) {
  for (const e of entradas) {
    const el = e.target as HTMLElement & { _t?: ReturnType<typeof setTimeout> };
    if (!seVe(e)) {
      clearTimeout(el._t);
      el._t = undefined;
      continue;
    }
    if (el._t) continue;
    const v = vista;
    el._t = setTimeout(() => {
      el._t = undefined;
      const p = el.dataset.oferta;
      if (p && v === vista && visible && !ofertas.has(p)) {
        ofertas.add(p);
        rastrear("vista_oferta", { producto: p });
      }
    }, 1000);
  }
}

function observarOfertas() {
  if (!io) {
    if (typeof IntersectionObserver === "undefined") return;
    io = new IntersectionObserver(alVerOfertas, { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5] });
  }
  document.querySelectorAll("[data-oferta]").forEach((el) => io!.observe(el));
}

export function iniciar(): void {
  if (estado) return;
  const forzado = location.search.includes("rastreo=1");
  if (
    !CUENTAS_ACTIVAS ||
    navigator.webdriver ||
    !globalThis.crypto?.randomUUID ||
    (location.hostname !== "calcular.ar" && location.hostname !== HOST_INTL && !forzado) ||
    leer(local, "ca_no_medir") === "1"
  ) {
    estado = 2;
    cola = [];
    return;
  }
  estado = 1;
  vid = leer(local, "ca_vid");
  if (vid.length !== 36) {
    vid = crypto.randomUUID();
    escribir(local, "ca_vid", vid);
  }
  try {
    fuente = JSON.parse(leer(sesionAlmacen, "ca_src") || "{}");
  } catch {}
  const pasivo = { passive: true, capture: true };
  for (const t of ["pointerdown", "pointermove", "keydown", "touchstart", "wheel"]) addEventListener(t, actividad, pasivo);
  addEventListener(
    "scroll",
    () => {
      actividad();
      if (!midiendo) {
        midiendo = true;
        requestAnimationFrame(medirScroll);
      }
    },
    pasivo,
  );
  addEventListener("input", alEditar, pasivo);
  addEventListener("change", alEditar, pasivo);
  addEventListener("click", alClick, pasivo);
  addEventListener("pointerdown", alPulsar as EventListener, pasivo);
  addEventListener("submit", alEnviar, { capture: true });
  addEventListener("error", alError);
  addEventListener("unhandledrejection", alError);
  document.addEventListener("visibilitychange", alCambiarVisibilidad);
  addEventListener("pageshow", alCambiarVisibilidad);
  addEventListener("pagehide", cerrar);
}

export function abrirVista(pathname: string, ctx: ContextoVista = CONTEXTO_AR): void {
  const p = normalizarRuta(pathname);
  if (estado !== 1 || p === ruta) return;
  if (PRIVADA.test(p)) {
    cerrar();
    vista = "";
    ruta = p;
    // Quien abre el panel es el dueño: ese navegador deja de medirse para no inflar sus propios números.
    if (p.startsWith("/dashboard")) {
      escribir(local, "ca_no_medir", "1");
      estado = 2;
      cola = [];
    }
    return;
  }
  const primera = !ruta;
  if (vista) cola.push(cierre());

  const ahora = Date.now();
  const [id, t] = leer(sesionAlmacen, "ca_sid").split(".");
  const nueva = id.length !== 36 || !(ahora - Number(t) <= SESION);
  sid = nueva ? crypto.randomUUID() : id;
  tocarSesion(ahora);

  // La fuente se pega a la sesión: sin esto, toda vista después de la de entrada saldría
  // «directa» y el panel no podría atribuir usos ni ventas al canal que trajo a la persona.
  const q = new URLSearchParams(location.search);
  const propia: Item = {};
  const r = primera ? hostExterno(document.referrer, location.hostname) : "";
  if (r) propia.r = r;
  for (const [k, c] of [["us", "utm_source"], ["um", "utm_medium"], ["uc", "utm_campaign"]]) {
    const v = q.get(c);
    if (v) propia[k] = v.slice(0, 60);
  }
  if (Object.keys(propia).length) fuente = propia;
  else if (nueva) fuente = {};
  escribir(sesionAlmacen, "ca_src", JSON.stringify(fuente));

  ruta = p;
  contexto = ctx;
  vista = crypto.randomUUID();
  const ya = performance.now();
  activo = n = scroll = errores = rabia = 0;
  marca = ultima = abierta = ya;
  resultadoMs = null;
  pendiente = false;
  base = campoUlt = rabiaEl = "";
  clics = [];
  mo?.disconnect();
  clearTimeout(revisar);
  revisar = undefined;
  uso = false;
  campo = null;
  visible = !document.hidden;
  ofertas = new Set();
  for (const it of cola) if (it.t === "e" && !it.v) it.v = vista;
  const v: Item = ctx.sitio === "intl" ? { t: "v", id: vista, p, ...fuente, m: ctx.mercado } : { t: "v", id: vista, p, ...fuente };
  const exp = expDeLaVista(p);
  if (exp) v.x = exp;
  cola.push(v);
  if (primera) {
    vistaInicial = vista;
    medirVitals(vistaInicial);
  }
  clearTimeout(timer);
  timer = setTimeout(enviar, 50);

  requestAnimationFrame(medirScroll);
  io?.disconnect();
  observarOfertas();
  setTimeout(observarOfertas, 2500);
}
