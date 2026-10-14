import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora, TablaResultado } from "../../tipos";
import { formatearCifra, montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiInteresCompuesto {
  capital: string;
  aporte: string;
  aporteAyuda: string;
  tasa: string;
  anios: string;
  capitalizacion: string;
  anual: string;
  semestral: string;
  trimestral: string;
  mensual: string;
  diaria: string;
  saldo: string;
  aportado: string;
  intereses: string;
  tabla: string;
  colAnio: string;
  colAportado: string;
  colIntereses: string;
  colSaldo: string;
  errorSinDinero: string;
  observacionIntereses: (porcentaje: string) => string;
}

export const VECES_POR_ANIO = { anual: 1, semestral: 2, trimestral: 4, mensual: 12, diaria: 365 } as const;
export type Capitalizacion = keyof typeof VECES_POR_ANIO;

export interface AnioCompuesto {
  anio: number;
  aportado: number;
  intereses: number;
  saldo: number;
}

// Los aportes son mensuales y la capitalización puede no serlo: se usa la tasa mensual equivalente
// (1 + tasa ÷ m) ^ (m ÷ 12) − 1, que da exacto el saldo del capital inicial en cualquier frecuencia.
export function proyectar(capital: number, aporte: number, tasa: number, anios: number, capitalizacion: Capitalizacion): AnioCompuesto[] {
  const m = VECES_POR_ANIO[capitalizacion];
  const i = Math.pow(1 + tasa / 100 / m, m / 12) - 1;
  let saldo = capital;
  const salida: AnioCompuesto[] = [];
  for (let anio = 1; anio <= anios; anio++) {
    const inicio = saldo;
    for (let mes = 0; mes < 12; mes++) saldo = saldo * (1 + i) + aporte;
    salida.push({ anio, aportado: aporte * 12, intereses: saldo - inicio - aporte * 12, saldo });
  }
  return salida;
}

export function definir(ctx: ContextoUniversal, ui: UiInteresCompuesto): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "interes-compuesto",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "capital", tipo: "moneda", etiqueta: ui.capital, min: 0, porDefecto: montoEjemplo(ctx, 1000) },
      { id: "aporte", tipo: "moneda", etiqueta: ui.aporte, ayuda: ui.aporteAyuda, min: 0, porDefecto: montoEjemplo(ctx, 100), requerido: false },
      { id: "tasa", tipo: "porcentaje", etiqueta: ui.tasa, min: 0, max: 100, porDefecto: 7 },
      { id: "anios", tipo: "entero", etiqueta: ui.anios, min: 1, max: 100, porDefecto: 10 },
      {
        id: "capitalizacion",
        tipo: "opcion",
        etiqueta: ui.capitalizacion,
        opciones: [
          { valor: "anual", etiqueta: ui.anual },
          { valor: "semestral", etiqueta: ui.semestral },
          { valor: "trimestral", etiqueta: ui.trimestral },
          { valor: "mensual", etiqueta: ui.mensual },
          { valor: "diaria", etiqueta: ui.diaria },
        ],
        porDefecto: "mensual",
      },
    ],
    calcular(entrada, _valores, { redondear }) {
      const aporte = entrada.aporte ?? 0;
      if (entrada.capital <= 0 && aporte <= 0) throw new ErrorEntrada(ui.errorSinDinero, "capital");
      const anios = proyectar(entrada.capital, aporte, entrada.tasa, entrada.anios, entrada.capitalizacion);
      const saldo = redondear(anios[anios.length - 1].saldo);
      const aportado = redondear(entrada.capital + aporte * 12 * entrada.anios);
      const intereses = redondear(saldo - aportado);
      const tabla: TablaResultado = {
        tipo: "tabla",
        columnas: [
          { clave: "anio", etiqueta: ui.colAnio, formato: "numero" },
          { clave: "aportado", etiqueta: ui.colAportado, formato: "moneda" },
          { clave: "intereses", etiqueta: ui.colIntereses, formato: "moneda" },
          { clave: "saldo", etiqueta: ui.colSaldo, formato: "moneda" },
        ],
        filas: anios.map((a) => [a.anio, redondear(a.aportado), redondear(a.intereses), redondear(a.saldo)]),
      };
      const parteIntereses = saldo > 0 ? Math.round((intereses / saldo) * 100) : 0;
      return {
        saldo,
        aportado,
        intereses,
        evolucion: tabla,
        observaciones: intereses > 0 ? [ui.observacionIntereses(formatearCifra(ctx, parteIntereses, 0))] : [],
      };
    },
    resultado: [
      { clave: "saldo", etiqueta: ui.saldo, formato: "moneda", destacada: true },
      { clave: "aportado", etiqueta: ui.aportado, formato: "moneda" },
      { clave: "intereses", etiqueta: ui.intereses, formato: "moneda" },
    ],
    tablas: [{ clave: "evolucion", titulo: ui.tabla, filasVisibles: 12 }],
  });
}
