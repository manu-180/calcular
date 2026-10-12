import { ejecutar, type Crudos, type EstadoCalculo, type FilaFormateada } from "@/motor/formulario";
import { formatearMoneda, formatearNumero } from "@/motor/formato";
import type { TextosMotor } from "@/motor/textos";
import type { Campo, DefinicionCalculadora, PropsCalculadora } from "@/motor/tipos";
import { crudoDeNumero } from "@/lib/prefill/intl-cliente";
import { campoEscenario, valoresEscenario, type TipoEscenario } from "./ofertas-intl";
import { parsearEntrada } from "@/motor/formulario";

// Los números del informe salen de ejecutar(): la misma función, con la misma definición y los mismos
// valores oficiales que usa la calculadora web. Así el informe y la web no pueden dar distinto; lo
// vigila scripts/check_ofertas_intl.ts, que además prueba el viaje entrada → texto → entrada.

export interface Escenarios {
  campo: string;
  columnas: string[];
  filas: { valor: string; resultados: string[]; actual: boolean }[];
}

export function filaClave(filas: readonly FilaFormateada[]): FilaFormateada | null {
  const destacadas = filas.filter((f) => f.destacada);
  return destacadas.at(-1) ?? filas.at(-1) ?? null;
}

function textoValor(campo: Campo, v: number, props: PropsCalculadora): string {
  const c = props.contexto;
  if (campo.tipo === "moneda") {
    const moneda = campo.moneda ?? c.moneda;
    return formatearMoneda(v, c.locale, moneda, undefined, c.simbolos?.[moneda]);
  }
  return formatearNumero(v, c.locale);
}

export function calcularEscenarios(
  def: DefinicionCalculadora,
  tipo: TipoEscenario,
  crudos: Crudos,
  props: PropsCalculadora,
  textos: TextosMotor,
): Escenarios | null {
  const campo = campoEscenario(tipo, def.campos);
  if (!campo) return null;
  const p = parsearEntrada(def.campos, crudos, props.contexto, props.opcionesDinamicas);
  if (!p.ok) return null;
  const actual = p.entrada[campo.id];
  if (typeof actual !== "number" || actual <= 0) return null;
  let columnas: { clave: string; etiqueta: string }[] | null = null;
  const filas: Escenarios["filas"] = [];
  for (const v of valoresEscenario(tipo, campo, actual)) {
    const e = ejecutar(def, { ...crudos, [campo.id]: crudoDeNumero(v, props.contexto.locale) }, props, textos);
    if (e.tipo !== "ok") continue;
    if (!columnas) {
      const dest = e.filas.filter((f) => f.destacada);
      columnas = (dest.length ? dest : e.filas.slice(-1)).slice(-2).map((f) => ({ clave: f.clave, etiqueta: f.etiqueta }));
    }
    filas.push({
      valor: textoValor(campo, v, props),
      resultados: columnas.map((c) => e.filas.find((f) => f.clave === c.clave)?.texto ?? "-"),
      actual: Math.abs(v - actual) < 1e-9,
    });
  }
  if (!columnas || filas.length < 2) return null;
  return { campo: campo.etiqueta, columnas: columnas.map((c) => c.etiqueta), filas };
}

export function estadoDelInforme(def: DefinicionCalculadora, crudos: Crudos, props: PropsCalculadora, textos: TextosMotor): EstadoCalculo {
  return ejecutar(def, crudos, props, textos);
}
