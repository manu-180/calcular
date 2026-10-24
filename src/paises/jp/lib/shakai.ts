import type { FilaEscala } from "@/motor/tipos";
import { montoDeFila } from "./impuestos";

export interface TasasShakai {
  kenpo: number;
  kaigo: number;
  shien: number;
  nenkin: number;
  koyo: number;
}

export interface ShakaiMensual {
  hyojun: number;
  hyojunNenkin: number;
  kenpo: number;
  kaigo: number;
  shien: number;
  nenkin: number;
  koyo: number;
  total: number;
}

// Cuota del trabajador por mes (折半): 標準報酬月額 × tasa ÷ 2. 雇用保険 va sobre el sueldo real, no
// sobre el 標準報酬. Sin redondeo acá: el redondeo de 50銭 lo hace cada empresa al descontar.
export function shakaiMensual(
  sueldo: number,
  grados: readonly FilaEscala[],
  limites: Readonly<Record<string, number>>,
  t: TasasShakai,
  conKaigo: boolean,
): ShakaiMensual {
  const hyojun = montoDeFila(grados, sueldo);
  const hyojunNenkin = Math.min(limites.max, Math.max(limites.min, hyojun));
  const kenpo = (hyojun * t.kenpo) / 200;
  const kaigo = conKaigo ? (hyojun * t.kaigo) / 200 : 0;
  const shien = (hyojun * t.shien) / 200;
  const nenkin = (hyojunNenkin * t.nenkin) / 200;
  const koyo = (sueldo * t.koyo) / 100;
  return { hyojun, hyojunNenkin, kenpo, kaigo, shien, nenkin, koyo, total: kenpo + kaigo + shien + nenkin + koyo };
}
