// Contrato de «Tu sueldo en el mundo». Todo monto de la grilla es ANUAL y está en dólares
// internacionales (paridad de poder adquisitivo): así un bruto de un país se compara con el de otro
// sin depender del tipo de cambio del día.

export interface PuntoNeto {
  bruto: number;
  neto: number;
}

export interface PaisMundo {
  // Edición del registro (mx, ca, ca-fr...) o "ar" para calcular.ar. Una sola edición por país en la
  // grilla: la principal (código ISO sin sufijo).
  mercado: string;
  // ISO 3166-1 alfa-2 en mayúsculas. El nombre visible sale de Intl.DisplayNames en el idioma de quien mira.
  iso: string;
  moneda: string;
  // Unidades de moneda local por dólar internacional (Banco Mundial, PA.NUS.PRVT.PP).
  ppa: number;
  anioPpa: number;
  // Sueldos que paga la ley en el año (aguinaldo, 13.º, 14.º): «por mes» en la página es el sueldo del
  // recibo y el bruto anual es ese sueldo por las pagas.
  pagas: number;
  calculadora: string;
  // Ruta de la calculadora de sueldo neto del país, relativa al sitio que la sirve (/mx/sueldo-neto o
  // /sueldo-neto en calcular.ar). El sitio se indica aparte para armar el link absoluto.
  ruta: string;
  sitio: "intl" | "ar";
  // Ordenados por bruto ascendente. Están todos los BRUTOS_GRILLA y, donde la interpolación lineal se
  // apartaba de la calculadora (un escalón de la ley), puntos propios del país entre dos de ellos.
  puntos: readonly PuntoNeto[];
  // La fecha más vieja de los datos oficiales que usa la calculadora (sello de la página).
  datosVerificadosEl: string;
}

export interface FuentePpa {
  organismo: string;
  indicador: string;
  url: string;
  consultadoEl: string;
  // Último año con dato en la tabla del Banco Mundial. Una PPA que el sitio lleva al día por su cuenta
  // (Argentina) no lo mueve.
  anio: number;
}

export interface GrillaMundo {
  version: 1;
  generadoEl: string;
  fuentePpa: FuentePpa;
  paises: readonly PaisMundo[];
}

// Lo que viaja en un link compartido o en la imagen OG. Nunca montos: un porcentaje redondeado y
// países, calculados sobre una franja de sueldo y no sobre el sueldo (calculo.ts, cargaDesde), para
// que de la carga no se pueda deducir cuánto gana nadie. El día de libertad no viaja: sale de la tasa.
export interface CargaCompartida {
  // País de la grilla (edición principal).
  mercado: string;
  // Impuesto a la renta y aportes de la persona, en puntos porcentuales enteros múltiplos de PASO_TASA
  // (0-100). Cero solo si la calculadora no descuenta nada en toda la franja.
  tasa: number;
  // ISO del país donde ese sueldo (en poder de compra) deja más en mano; el propio si ninguno deja más.
  mejor: string;
  // Cuánto más en mano deja el mejor país, en porcentaje múltiplo de PASO_VENTAJA (0 si es el propio).
  ventaja: number;
}
