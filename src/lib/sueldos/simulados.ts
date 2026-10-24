import "server-only";
import { EXPERIENCIAS, OCUPACIONES } from "@/motor/sueldos/catalogo";
import { dosCifras, mesDe } from "@/motor/sueldos/reglas";
import type { AgregadosPais, OcupacionPublica } from "@/motor/sueldos/tipos";
import { paisAportable } from "./paises";

// Solo para `next dev` con SUELDOS_SIMULADOS=1 (lectura.ts lo bloquea fuera de desarrollo): agregados
// inventados con la escala del país, para ver la página y el módulo llenos sin base. Algunas ocupaciones
// pasan de K y otras no, así se ven los dos estados.
export function simulados(mercado: string): AgregadosPais | null {
  const pais = paisAportable(mercado);
  if (!pais) return null;
  const mes = mesDe(new Date());
  const ocupaciones: AgregadosPais["ocupaciones"] = {};
  OCUPACIONES.forEach((o, i) => {
    const total = (i * 7) % 23;
    if (!total) return;
    const base = (1400 + ((i * 397) % 2600)) * pais.ppa;
    const cifras = total >= 10 ? { n: total, p25: dosCifras(base * 0.78), p50: dosCifras(base), p75: dosCifras(base * 1.32) } : null;
    const porExperiencia: OcupacionPublica["porExperiencia"] = {};
    EXPERIENCIAS.forEach((e, j) => {
      const t = Math.max(0, Math.round(total * [0.2, 0.45, 0.25, 0.1][j]) + (j === 1 && total >= 18 ? 4 : 0));
      if (!t) return;
      const f = [0.72, 0.95, 1.18, 1.45][j];
      porExperiencia[e] = { total: t, cifras: t >= 10 ? { n: t, p25: dosCifras(base * f * 0.82), p50: dosCifras(base * f), p75: dosCifras(base * f * 1.25) } : null };
    });
    ocupaciones[o] = { total, cifras, porExperiencia };
  });
  return { mercado, moneda: pais.moneda, desde: mes, hasta: mes, ocupaciones };
}
