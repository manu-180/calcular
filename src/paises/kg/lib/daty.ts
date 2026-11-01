import type { FechaISO } from "@/motor/tipos";

// Даты считаем в UTC, чтобы часовой пояс не сдвигал день.
export function prochitat(f: string): Date {
  const [g, m, d] = f.split("-").map(Number);
  return new Date(Date.UTC(g, m - 1, d));
}

export function zapisat(d: Date): FechaISO {
  return d.toISOString().slice(0, 10) as FechaISO;
}

export function plusDney(d: Date, n: number): Date {
  return new Date(d.getTime() + n * 86400000);
}

// Трудовой кодекс, статья 12: срок в месяцах истекает в соответствующее число последнего месяца;
// если такого числа нет, в последний день месяца.
export function plusMesyatsev(d: Date, n: number): Date {
  const g = d.getUTCFullYear();
  const m = d.getUTCMonth() + n;
  const posledniy = new Date(Date.UTC(g, m + 1, 0)).getUTCDate();
  return new Date(Date.UTC(g, m, Math.min(d.getUTCDate(), posledniy)));
}

export function vykhodnoy(d: Date): boolean {
  const den = d.getUTCDay();
  return den === 0 || den === 6;
}

// Рабочие дни при пятидневной неделе, без праздников.
export function plusRabochikhDney(d: Date, n: number): Date {
  let r = d;
  let ostalos = n;
  while (ostalos > 0) {
    r = plusDney(r, 1);
    if (!vykhodnoy(r)) ostalos--;
  }
  return r;
}

// Статья 12, часть 3: срок, который кончается в нерабочий день, переносится на следующий рабочий.
export function naRabochiy(d: Date): Date {
  let r = d;
  while (vykhodnoy(r)) r = plusDney(r, 1);
  return r;
}

// Русское число: 1 день, 2 дня, 5 дней.
export function sklonenie(n: number, formy: readonly [string, string, string]): string {
  const d = n % 100;
  const e = n % 10;
  const f = d >= 11 && d <= 14 ? formy[2] : e === 1 ? formy[0] : e >= 2 && e <= 4 ? formy[1] : formy[2];
  return `${n} ${f}`;
}
