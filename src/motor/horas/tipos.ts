// Contrato del índice «¿Cuántas horas de trabajo cuesta?». El motor no importa el registro ni src/lib
// (check_fronteras): src/lib/horas/indice.ts resuelve los datos y se los pasa ya armados.

export interface PrecioGuardado {
  monto: number;
  // ISO 4217 tal como lo cobra la tienda (puede ser USD en un país con moneda propia).
  moneda: string;
  url: string;
  consultadoEl: string;
}

// src/lib/horas/precios.json. Lo escribe solo scripts/horas/actualizar_precios.ts.
export interface ArchivoPrecios {
  version: 1;
  actualizadoEl: string;
  // ISO2 del país → id de producto → precio.
  precios: Readonly<Record<string, Readonly<Record<string, PrecioGuardado>>>>;
  // ISO2 → id de producto → por qué no hay precio (sin tienda, bloqueo, plan inexistente).
  sinDato: Readonly<Record<string, Readonly<Record<string, string>>>>;
}

export interface FuenteHoras {
  organismo: string;
  titulo: string;
  url: string;
  // Fecha en que se leyó el dato en la fuente.
  verificadoEl: string;
}

// Cómo se llegó al salario por hora, para mostrarlo tal cual: «hora» (la ley fija un valor por hora),
// «mes» (mensual × 12 ÷ 52 ÷ horas semanales), «semana», «dia» (diario ÷ horas del día, o × días
// pagados ÷ horas semanales).
export interface ConversionHora {
  tipo: "hora" | "mes" | "anio" | "semana" | "dia" | "divisor";
  // El monto de la ley en su período, en moneda local.
  monto: number;
  horasSemana?: number;
  horasDia?: number;
  diasPagados?: number;
  pagas?: number;
  divisor?: number;
}

export interface MinimoHora {
  iso: string;
  mercado: string;
  moneda: string;
  porHora: number;
  conversion: ConversionHora;
  // El dato del salario mínimo: nombre oficial (en el idioma del país) y su fuente.
  nombre: string;
  fuente: FuenteHoras;
  // La jornada usada, si hizo falta (no hace falta con un valor por hora de la ley).
  jornada?: FuenteHoras;
  // Hasta cuándo vale lo usado (el primer vencimiento entre salario y jornada).
  vigenteHasta?: string;
}

export interface CambioUsado {
  // Unidades de moneda local por unidad de la moneda del precio.
  valor: number;
  fecha: string;
  fuente: FuenteHoras;
}

export interface CeldaHoras {
  producto: string;
  precio: PrecioGuardado;
  // Precio en moneda local (igual al de la tienda si cobra en la moneda del país).
  precioLocal: number;
  cambio?: CambioUsado;
  horas: number;
}

export interface FilaHoras {
  iso: string;
  mercado: string;
  minimo: MinimoHora;
  celdas: Readonly<Record<string, CeldaHoras>>;
}

export interface ExclusionHoras {
  iso: string;
  mercado: string;
  // Sin producto: todo el país queda afuera. Con producto: solo esa celda.
  producto?: string;
  motivo: string;
}

export interface IndiceHoras {
  version: 1;
  generadoEl: string;
  preciosActualizadosEl: string;
  filas: readonly FilaHoras[];
}

export interface InformeHoras {
  indice: IndiceHoras;
  excluidos: readonly ExclusionHoras[];
}
