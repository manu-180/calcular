import type { BrazoPuente, ResumenBoca } from "@/lib/panel/tipos";

// Por debajo de esto, cualquier diferencia entre los brazos es ruido: ni se intenta un veredicto.
export const MIN_EXPOSICIONES = 30;

export type Intervalo = [number, number];

// Intervalo de Wilson al 95 %: no se va de [0, 1] con muestras chicas, a diferencia del de Wald.
export function wilson(x: number, n: number, z = 1.96): Intervalo {
  if (n <= 0) return [0, 1];
  const p = x / n;
  const d = 1 + (z * z) / n;
  const c = p + (z * z) / (2 * n);
  const m = z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n));
  return [Math.max(0, (c - m) / d), Math.min(1, (c + m) / d)];
}

// Diferencia de dos proporciones (a − b) con el método de Newcombe, que arma el intervalo con los de
// Wilson de cada brazo: se porta bien con tasas cerca de 0 o de 1, que es lo que hay acá.
export function diferencia(xa: number, na: number, xb: number, nb: number): { d: number; ic: Intervalo } {
  const pa = na ? xa / na : 0;
  const pb = nb ? xb / nb : 0;
  const [la, ua] = wilson(xa, na);
  const [lb, ub] = wilson(xb, nb);
  const d = pa - pb;
  return { d, ic: [d - Math.sqrt((pa - la) ** 2 + (ub - pb) ** 2), d + Math.sqrt((ua - pa) ** 2 + (pb - lb) ** 2)] };
}

// Cuántas visitas nuevas trae, en promedio, cada persona que compartió. null = nadie compartió.
export function coeficiente(r: Pick<ResumenBoca, "personas" | "nuevas">): number | null {
  return r.personas > 0 ? r.nuevas / r.personas : null;
}

export type Comparacion = { con: number; sin: number; d: number; ic: Intervalo; clara: boolean };

export type AnalisisPuente = {
  con: BrazoPuente;
  sin: BrazoPuente;
  hayDatos: boolean;
  suficiente: boolean;
  clic: { tasa: number; ic: Intervalo };
  siguieron: Comparacion;
  compartieron: Comparacion;
  veredicto: { tono: "dato" | "logro" | "alerta"; titulo: string; detalle: string };
};

const vacio = (v: "con" | "sin"): BrazoPuente => ({ v, exposiciones: 0, personas: 0, clics: 0, compartieron: 0, siguieron: 0 });

function comparar(con: BrazoPuente, sin: BrazoPuente, campo: "siguieron" | "compartieron"): Comparacion {
  const { d, ic } = diferencia(con[campo], con.exposiciones, sin[campo], sin.exposiciones);
  return {
    con: con.exposiciones ? con[campo] / con.exposiciones : 0,
    sin: sin.exposiciones ? sin[campo] / sin.exposiciones : 0,
    d,
    ic,
    clara: ic[0] > 0 || ic[1] < 0,
  };
}

const puntos = (x: number) => `${Math.abs(x * 100).toLocaleString("es-AR", { maximumFractionDigits: 1 })}`;

// Sin significancia no hay ganador: el veredicto sólo dice algo cuando el intervalo de la diferencia
// no cruza el cero, y aun así lo dice en condicional.
export function analizarPuente(brazos: BrazoPuente[]): AnalisisPuente {
  const con = brazos.find((b) => b.v === "con") ?? vacio("con");
  const sin = brazos.find((b) => b.v === "sin") ?? vacio("sin");
  const hayDatos = con.exposiciones + sin.exposiciones > 0;
  const suficiente = con.exposiciones >= MIN_EXPOSICIONES && sin.exposiciones >= MIN_EXPOSICIONES;
  const siguieron = comparar(con, sin, "siguieron");
  const compartieron = comparar(con, sin, "compartieron");
  const clic = { tasa: con.exposiciones ? con.clics / con.exposiciones : 0, ic: wilson(con.clics, con.exposiciones) };

  let veredicto: AnalisisPuente["veredicto"];
  if (!suficiente) {
    const faltan = Math.max(0, MIN_EXPOSICIONES - con.exposiciones) + Math.max(0, MIN_EXPOSICIONES - sin.exposiciones);
    veredicto = {
      tono: "dato",
      titulo: "Faltan datos para comparar",
      detalle: hayDatos
        ? `Hacen falta al menos ${MIN_EXPOSICIONES} exposiciones en cada brazo; faltan ${faltan}. Hasta entonces cualquier diferencia es azar.`
        : "Todavía nadie vio el resultado de sueldo neto con la prueba andando.",
    };
  } else if (siguieron.clara && siguieron.d < 0) {
    veredicto = {
      tono: "alerta",
      titulo: "La línea parece bajar el uso",
      detalle: `Con la línea, ${puntos(siguieron.d)} de cada 100 menos siguieron usando calculadoras. Conviene mirarla antes de dejarla para todos.`,
    };
  } else if (compartieron.clara && compartieron.d < 0) {
    veredicto = {
      tono: "alerta",
      titulo: "La línea parece restarle al botón de compartir",
      detalle: `Con la línea comparten ${puntos(compartieron.d)} de cada 100 menos. El uso de las calculadoras no cambia de forma clara.`,
    };
  } else if (siguieron.clara && siguieron.d > 0) {
    veredicto = {
      tono: "logro",
      titulo: "La línea no molesta: parece sumar",
      detalle: `Con la línea, ${puntos(siguieron.d)} de cada 100 más siguieron usando calculadoras, y ${puntos(clic.tasa)} de cada 100 la tocan.`,
    };
  } else {
    veredicto = {
      tono: "dato",
      titulo: "Sin diferencia clara todavía",
      detalle: "Con y sin la línea la gente sigue usando las calculadoras parecido. Todavía no se puede decir que ayude ni que moleste: hay que dejarla correr.",
    };
  }
  return { con, sin, hayDatos, suficiente, clic, siguieron, compartieron, veredicto };
}
