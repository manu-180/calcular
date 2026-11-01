import type { PaginaMenu } from "@/components/shell/tipos";

export type Resultado = { pagina: PaginaMenu; puntaje: number };

export type MotorBusqueda = {
  buscar(consulta: string, limite?: number): Resultado[];
  masUsadas(): PaginaMenu[];
  paginasDe(hrefs: string[]): PaginaMenu[];
};

// Palabras que no alcanzan para decidir un resultado: si están, suman; si faltan, no descartan.
// "cuando" queda afuera a propósito: distingue "cuándo se paga el aguinaldo" de la calculadora.
const OPCIONALES = [
  "a", "al", "con", "de", "del", "el", "en", "es", "la", "las", "lo", "los", "mi", "me", "mis",
  "o", "para", "por", "que", "se", "si", "su", "te", "tu", "un", "una", "y", "como", "cuanto",
  "cuanta", "cual", "calculadora", "calcular", "calculo", "simulador", "hoy",
];

export function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    // La «đ» del croata no se descompone con NFD: se escribe «dj», como en los slugs.
    .replace(/đ/g, "dj")
    // La ı del turco no se descompone en NFD: sin esto quedaría como separador («yıllık», «y ll k»).
    .replace(/ı/g, "i")
    // Uzbeko latino: oʻ, gʻ y la tutuq belgisi (ʼ) se buscan sin el signo, y quien escribe «o'» o «g'»
    // con el apóstrofo del teclado encuentra lo mismo («oʻrtacha», «o'rtacha» y «ortacha»).
    .replace(/[ʻʼ]/g, "")
    .replace(/([og])[‘’'`](?=[a-z])/g, "$1")
    // El cirílico (ucraniano, ruso), el griego, el hebreo, el árabe, el bengalí y el tailandés cuentan
    // como letra: sin esto «кредит», «δάνειο» o «משכנתא» quedaban vacíos. La sigma final se busca como la otra: quien escribe «μισθ» o «μισθος» encuentra
    // «Μισθός».
    .replace(/ς/g, "σ")
    .replace(/[^a-z0-9Ѐ-ӿͰ-Ͽ֐-׿؀-ۿঀ-৿฀-๿]+/g, " ")
    .trim();
}

export function normalizarRuta(path: string): string {
  const sinQuery = path.split(/[?#]/)[0] || "/";
  const limpia = sinQuery.replace(/\/+$/, "");
  return limpia === "" ? "/" : limpia;
}

function palabras(texto: string): string[] {
  return normalizar(texto).split(" ").filter(Boolean);
}

type Entrada = { pagina: PaginaMenu; pesos: Map<string, number>; titulo: string; prioridad: number };

const PESO_TIPO: Record<PaginaMenu["tipo"], number> = {
  calculadora: 1,
  planilla: 0.94,
  guia: 0.9,
  archivo: 0.82,
  info: 0.7,
};

// Distancia de edición con transposición (OSA): "agiunaldo" está a 1 de "aguinaldo".
function distancia(a: string, b: string, tope: number): number {
  if (Math.abs(a.length - b.length) > tope) return tope + 1;
  let prev2: number[] = [];
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let minFila = i;
    for (let j = 1; j <= b.length; j++) {
      const costo = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + costo);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, prev2[j - 2] + 1);
      cur[j] = v;
      if (v < minFila) minFila = v;
    }
    if (minFila > tope) return tope + 1;
    prev2 = prev;
    prev = cur;
  }
  return prev[b.length];
}

function parecido(t: string, w: string): number {
  if (w === t) return 1;
  if (t.length >= 2 && w.startsWith(t)) return 0.86;
  if (t.length >= 4 && w.includes(t)) return 0.6;
  const tope = t.length >= 8 ? 2 : t.length >= 4 ? 1 : 0;
  if (tope === 0) return 0;
  const d = distancia(t, w, tope);
  if (d <= tope) return 0.72 - d * 0.1;
  if (w.length > t.length && distancia(t, w.slice(0, t.length), tope) <= tope) return 0.5;
  return 0;
}

function puntajeToken(t: string, e: Entrada): number {
  let mejor = 0;
  for (const [w, peso] of e.pesos) {
    const s = parecido(t, w);
    if (s > 0 && s * peso > mejor) mejor = s * peso;
  }
  return mejor;
}

export function crearMotor(paginas: readonly PaginaMenu[], masUsadasHrefs: readonly string[], opcionalesExtra: readonly string[] = []): MotorBusqueda {
  const opcionales = new Set([...OPCIONALES, ...opcionalesExtra.flatMap(palabras)]);
  const porHref = new Map(paginas.map((p) => [p.href, p]));
  const deRuta = (href: string) => porHref.get(normalizarRuta(href));

  const crearEntrada = (p: PaginaMenu): Entrada => {
    const pesos = new Map<string, number>();
    const sumar = (texto: string | undefined, peso: number) => {
      if (!texto) return;
      for (const w of palabras(texto)) if ((pesos.get(w) ?? 0) < peso) pesos.set(w, peso);
    };
    sumar(p.descripcion, 1);
    sumar(p.grupo, 1.1);
    sumar(p.href.replace(/\//g, " "), 1.6);
    for (const c of p.claves ?? []) sumar(c, 2.4);
    sumar(p.corto, 2.8);
    sumar(p.titulo, 3);
    const usada = masUsadasHrefs.indexOf(p.href);
    const prioridad = PESO_TIPO[p.tipo] * (p.menu === false ? 0.96 : 1) + (usada >= 0 ? (masUsadasHrefs.length - usada) * 0.03 : 0);
    return { pagina: p, pesos, titulo: normalizar(p.titulo), prioridad };
  };

  const indice = paginas.filter((p) => p.href !== "/").map(crearEntrada);

  function buscar(consulta: string, limite = 8): Resultado[] {
    const q = normalizar(consulta);
    if (!q) return [];
    const tokens = [...new Set(q.split(" "))];
    const requeridos = tokens.filter((t) => !opcionales.has(t) && !/^20\d\d$/.test(t));
    const obligatorios = requeridos.length ? requeridos : tokens;
    const extras = tokens.filter((t) => !obligatorios.includes(t));

    const res: Resultado[] = [];
    for (const e of indice) {
      let total = 0;
      let falta = false;
      for (const t of obligatorios) {
        const s = puntajeToken(t, e);
        if (s === 0) {
          falta = true;
          break;
        }
        total += s;
      }
      if (falta) continue;
      for (const t of extras) total += puntajeToken(t, e) * 0.3;
      if (e.titulo === q) total += 3;
      else if (q.length >= 4 && e.titulo.startsWith(q)) total += 1.2;
      else if (q.length >= 4 && e.titulo.includes(q)) total += 1;
      res.push({ pagina: e.pagina, puntaje: total * e.prioridad });
    }
    res.sort((a, b) => b.puntaje - a.puntaje);
    const piso = (res[0]?.puntaje ?? 0) * 0.35;
    return res.filter((r) => r.puntaje >= piso).slice(0, limite);
  }

  return {
    buscar,
    masUsadas: () => masUsadasHrefs.map(deRuta).filter((p): p is PaginaMenu => !!p),
    paginasDe: (hrefs) => hrefs.map(deRuta).filter((p): p is PaginaMenu => !!p && p.tipo === "calculadora"),
  };
}
