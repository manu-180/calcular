// Motor de las multas por deberes formales de la Ley 11.683 (src/data/multas-arca.ts).
//
// INVARIANTE QUE NO SE PUEDE ROMPER: acá no se escribe ningún monto. Todo sale del data, y el
// multiplicador de la reforma se DERIVA dividiendo el monto vigente por el anterior. Si alguien
// escribe «×1000» a mano, la página empieza a mentir en los cuatro artículos donde el factor no
// es mil (art. 38 = 1.100, techo del art. 39 ≈ 778, piso del art. 40 = 2.000, empleo no
// registrado ≈ 67).

import {
  CLAUSURA,
  INFRACCIONES,
  type Infraccion,
  type Reduccion,
} from "@/data/multas-arca";

export function infraccionPorId(id: string): Infraccion {
  return INFRACCIONES.find((i) => i.id === id) ?? INFRACCIONES[0];
}

export type Sujeto = "persona" | "sociedad";

export type Resultado = {
  infraccion: Infraccion;
  /** Monto único cuando la multa es fija; `null` cuando es graduable. */
  monto: number | null;
  /** Rango cuando la multa es graduable; `null` cuando es fija. */
  rango: { minimo: number; maximo: number } | null;
  /** Lo mismo, después de aplicar la reducción elegida. */
  montoReducido: number | null;
  rangoReducido: { minimo: number; maximo: number } | null;
  reduccion: Reduccion | null;
  /** Cuánto se ahorra respecto del peor escenario sin reducción. */
  ahorro: number;
  /** El importe equivalente antes de la Ley 27.799, para el contraste. */
  anterior: number | null;
  /** Veces que se multiplicó el importe de referencia. Redondeado a 1 decimal. */
  multiplicador: number | null;
};

function referencia(inf: Infraccion, sujeto: Sujeto): { hoy: number; antes: number } | null {
  if (inf.fijo) {
    const hoy = sujeto === "sociedad" ? inf.fijo.sociedad : inf.fijo.persona;
    const antes = sujeto === "sociedad" ? inf.anterior.sociedad : inf.anterior.persona;
    return antes ? { hoy, antes } : null;
  }
  if (inf.rango && inf.anterior.minimo) {
    return { hoy: inf.rango.minimo, antes: inf.anterior.minimo };
  }
  return null;
}

export function calcularMulta({
  infraccionId,
  sujeto,
  aplicaReduccion,
}: {
  infraccionId: string;
  sujeto: Sujeto;
  aplicaReduccion: boolean;
}): Resultado {
  const infraccion = infraccionPorId(infraccionId);
  const reduccion = aplicaReduccion ? (infraccion.reducciones[0] ?? null) : null;

  const monto = infraccion.fijo
    ? sujeto === "sociedad"
      ? infraccion.fijo.sociedad
      : infraccion.fijo.persona
    : null;
  const rango = infraccion.rango ? { ...infraccion.rango } : null;

  let montoReducido = monto;
  let rangoReducido = rango ? { ...rango } : null;

  if (reduccion) {
    if (reduccion.alMinimo) {
      // Art. 50: la sanción se reduce al mínimo legal, no a una fracción del máximo.
      if (rangoReducido) rangoReducido = { minimo: rangoReducido.minimo, maximo: rangoReducido.minimo };
    } else {
      if (montoReducido !== null) montoReducido = Math.round(montoReducido * reduccion.factor);
      if (rangoReducido) {
        rangoReducido = {
          minimo: Math.round(rangoReducido.minimo * reduccion.factor),
          maximo: Math.round(rangoReducido.maximo * reduccion.factor),
        };
      }
    }
  }

  const peor = monto ?? rango?.maximo ?? 0;
  const peorReducido = montoReducido ?? rangoReducido?.maximo ?? 0;

  const ref = referencia(infraccion, sujeto);

  return {
    infraccion,
    monto,
    rango,
    montoReducido,
    rangoReducido,
    reduccion,
    ahorro: Math.max(0, peor - peorReducido),
    anterior: ref?.antes ?? null,
    multiplicador: ref ? Math.round((ref.hoy / ref.antes) * 10) / 10 : null,
  };
}

/** ¿El valor de la operación habilita la clausura del art. 40? El acápite pide que lo EXCEDA. */
export function habilitaClausura(valorOperacion: number): boolean {
  return valorOperacion > CLAUSURA.pisoValorOperacion;
}

/** Art. 40, último párrafo: otra infracción del mismo artículo dentro de 2 años duplica el rango. */
export function diasClausura(reincidente: boolean): { minimo: number; maximo: number } {
  const factor = reincidente ? 2 : 1;
  return { minimo: CLAUSURA.diasMinimo * factor, maximo: CLAUSURA.diasMaximo * factor };
}

/** El rango de multiplicadores de la reforma, derivado de todas las infracciones del data. */
export function rangoMultiplicadores(): { minimo: number; maximo: number } {
  const factores: number[] = [];
  for (const inf of INFRACCIONES) {
    for (const sujeto of ["persona", "sociedad"] as const) {
      const ref = referencia(inf, sujeto);
      if (ref) factores.push(ref.hoy / ref.antes);
    }
    if (inf.rango && inf.anterior.maximo) factores.push(inf.rango.maximo / inf.anterior.maximo);
  }
  factores.push(CLAUSURA.pisoValorOperacion / CLAUSURA.pisoAnterior);
  return {
    minimo: Math.round(Math.min(...factores)),
    maximo: Math.round(Math.max(...factores)),
  };
}
