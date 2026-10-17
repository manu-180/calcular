import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// Las tablas de control (基礎控除, 標準報酬月額) guardan el monto en cuotaFija y tasa 0: la fila es la del
// tramo donde cae el valor, sin cálculo marginal.
export function montoDeFila(escala: readonly FilaEscala[], valor: number): number {
  let elegida = escala[0];
  for (const f of escala) if (valor >= f.desde) elegida = f;
  return elegida.cuotaFija ?? 0;
}

export function filaDe(escala: readonly FilaEscala[], valor: number): FilaEscala {
  let elegida = escala[0];
  for (const f of escala) if (valor >= f.desde) elegida = f;
  return elegida;
}

// 給与所得控除: 収入金額×tasa＋cuotaFija de la fila (no es marginal), nunca más que el propio ingreso.
export function kyuyoShotokuKojo(ingreso: number, escala: readonly FilaEscala[]): number {
  if (ingreso <= 0) return 0;
  const f = filaDe(escala, ingreso);
  return Math.min(ingreso, Math.floor((ingreso * f.tasa) / 100 + (f.cuotaFija ?? 0)));
}

export function kyuyoShotoku(ingreso: number, escala: readonly FilaEscala[]): number {
  return Math.max(0, ingreso - kyuyoShotokuKojo(ingreso, escala));
}

export const sen = (n: number): number => Math.floor(Math.max(0, n) / 1000) * 1000;
export const cien = (n: number): number => Math.floor(Math.max(0, n) / 100) * 100;

export interface Shotokuzei {
  kazei: number;
  base: number;
  tokubetsu: number;
  total: number;
  marginal: number;
}

// 課税所得は1,000円未満切捨て, el impuesto especial (復興 y desde 2027 también 防衛) se suma sobre el
// impuesto base y el total va a 100円未満切捨て, como en el 確定申告.
export function shotokuzei(kazeiBruto: number, escala: readonly FilaEscala[], tokubetsu: number): Shotokuzei {
  const kazei = sen(kazeiBruto);
  const base = Math.floor(aplicarEscalaMarginal(escala, kazei));
  const extra = Math.floor((base * tokubetsu) / 100);
  return { kazei, base, tokubetsu: extra, total: cien(base + extra), marginal: tasaMarginal(escala, kazei) };
}

export function tasaMarginal(escala: readonly FilaEscala[], base: number): number {
  if (base <= 0) return 0;
  let tasa = escala[0].tasa;
  for (const f of escala) if (base > f.desde) tasa = f.tasa;
  return tasa;
}

export interface AjusteJumin {
  gap: number;
  rate: number;
  threshold: number;
}

export interface Juminzei {
  kazei: number;
  shotokuwari: number;
  chosei: number;
  kintowari: number;
  total: number;
}

// 調整控除 para una persona sin cónyuge ni dependientes: la única diferencia de 人的控除 es la del 基礎控除
// (5万円), que coincide con el piso de 5万円 de la regla para más de 200万円; por eso arriba de ese
// límite la base queda fija en gap.
export function juminzei(p: {
  shotoku: number;
  kojo: number;
  kisoEscala: readonly FilaEscala[];
  tasa: number;
  kintowari: number;
  shinrin: number;
  ajuste: AjusteJumin;
}): Juminzei {
  const kiso = montoDeFila(p.kisoEscala, p.shotoku);
  const kazei = sen(p.shotoku - p.kojo - kiso);
  const bruto = (kazei * p.tasa) / 100;
  let chosei = 0;
  if (kazei > 0 && p.shotoku <= 25000000) {
    const a = p.ajuste;
    const base = kazei <= a.threshold ? Math.min(a.gap, kazei) : a.gap;
    chosei = (base * a.rate) / 100;
  }
  const shotokuwari = cien(bruto - chosei);
  const kintowari = p.kintowari + p.shinrin;
  return { kazei, shotokuwari, chosei, kintowari, total: shotokuwari + kintowari };
}

export function yen(n: number): string {
  return `${Math.round(n).toLocaleString("ja-JP")}円`;
}
