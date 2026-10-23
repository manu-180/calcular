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
  calculadora: string;
  // Ruta de la calculadora de sueldo neto del país, relativa al sitio que la sirve (/mx/sueldo-neto o
  // /sueldo-neto en calcular.ar). El sitio se indica aparte para armar el link absoluto.
  ruta: string;
  sitio: "intl" | "ar";
  // Ordenados por bruto ascendente, mismos brutos para todos los países (BRUTOS_GRILLA).
  puntos: readonly PuntoNeto[];
  // La fecha más vieja de los datos oficiales que usa la calculadora (sello de la página).
  datosVerificadosEl: string;
}

export interface FuentePpa {
  organismo: string;
  indicador: string;
  url: string;
  consultadoEl: string;
}

export interface GrillaMundo {
  version: 1;
  generadoEl: string;
  fuentePpa: FuentePpa;
  paises: readonly PaisMundo[];
}

// Lo que viaja en un link compartido o en la imagen OG. Nunca montos: solo porcentajes, días y
// países, para que compartir no exponga cuánto gana nadie.
export interface CargaCompartida {
  mercado: string;
  // Parte del bruto que se va en impuesto a la renta y aportes de la persona, en milésimas (0-1000).
  tasa: number;
  // Día del año (1-366) en que, repartiendo la carga desde el 1 de enero, se termina de trabajar para el Estado.
  dia: number;
  // País donde ese mismo sueldo (en poder de compra) deja más en mano.
  mejor: string;
  // Cuánto más en mano deja el mejor país, en porcentaje entero sobre el propio (0-999).
  ventaja: number;
}
