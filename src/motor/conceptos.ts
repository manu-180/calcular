export interface InfoConcepto {
  descripcion: string;
  ejemplos: string;
  rutaAR?: string;
}

// Un concepto une páginas equivalentes entre mercados (clúster hreflang). Agregar uno es decisión
// del motor, no de un país: si dos países lo comparten, entra acá; si es único, el país usa "propio".
export const CONCEPTOS = {
  "sueldo-neto": {
    descripcion: "Cuánto cobra en mano una persona asalariada a partir del bruto.",
    ejemplos: "sueldo neto, sueldo líquido, salario neto",
    rutaAR: "/sueldo-neto",
  },
  "bono-semestral": {
    descripcion: "Sueldo adicional obligatorio por ley que se paga una o dos veces por año.",
    ejemplos: "aguinaldo (UY, MX, PY, BO), gratificación (PE), prima de servicios (CO), décimo tercero (EC)",
    rutaAR: "/aguinaldo",
  },
  "decimo-cuarto": {
    descripcion: "Bono anual equivalente a un salario básico, separado del aguinaldo.",
    ejemplos: "décimo cuarto sueldo (EC), décimo cuarto mes (HN)",
  },
  "liquidacion-final": {
    descripcion: "Todo lo que se cobra al terminar la relación laboral, con o sin despido.",
    ejemplos: "finiquito (MX, CL), liquidación de beneficios sociales (PE), liquidación final (UY, CO)",
    rutaAR: "/indemnizacion",
  },
  "indemnizacion-despido": {
    descripcion: "Solo la indemnización por despido sin causa, separada del resto de la liquidación.",
    ejemplos: "indemnización por despido arbitrario (PE), indemnización por años de servicio (CL), cesantía (CR)",
  },
  "fondo-cesantia": {
    descripcion: "Depósito periódico del empleador en una cuenta a nombre de la persona trabajadora.",
    ejemplos: "CTS (PE), cesantías (CO), fondo de reserva (EC)",
  },
  vacaciones: {
    descripcion: "Días de vacaciones y su pago, incluida la prima vacacional si existe.",
    ejemplos: "vacaciones, vacaciones truncas, prima vacacional",
    rutaAR: "/vacaciones",
  },
  "horas-extra": {
    descripcion: "Pago de horas trabajadas por encima de la jornada legal.",
    ejemplos: "horas extra, horas extraordinarias, sobretiempo",
    rutaAR: "/horas-extras",
  },
  "salario-minimo": {
    descripcion: "Salario mínimo vigente y su equivalente por día, hora o quincena.",
    ejemplos: "salario mínimo, RMV (PE), SMMLV (CO), ingreso mínimo (CL)",
    rutaAR: "/salario-minimo",
  },
  "reparto-utilidades": {
    descripcion: "Participación legal de las personas trabajadoras en las ganancias de la empresa.",
    ejemplos: "PTU (MX), utilidades (PE, EC, VE)",
  },
  "aportes-seguridad-social": {
    descripcion: "Descuentos y contribuciones a jubilación, salud y seguridad social sobre el sueldo.",
    ejemplos: "cuotas IMSS (MX), aportes BPS (UY), AFP u ONP (PE), IPS (PY)",
  },
  "costo-empleador": {
    descripcion: "Cuánto le cuesta a la empresa un sueldo, con todas sus cargas.",
    ejemplos: "costo empresa, costo laboral, carga social",
  },
  preaviso: {
    descripcion: "Días de preaviso o su pago sustitutivo al terminar la relación laboral.",
    ejemplos: "preaviso, desahucio",
  },
  "trabajo-domestico": {
    descripcion: "Sueldo, aportes y beneficios de quien trabaja en casas particulares.",
    ejemplos: "trabajadoras del hogar, empleada doméstica, trabajo de casa particular",
    rutaAR: "/empleada-domestica",
  },
  "impuesto-renta": {
    descripcion: "Impuesto a la renta o retención mensual sobre sueldos de personas asalariadas.",
    ejemplos: "ISR (MX), renta de quinta categoría (PE), IRPF (UY), impuesto único (CL)",
    rutaAR: "/ganancias",
  },
  "retencion-honorarios": {
    descripcion: "Retención o impuesto sobre honorarios de trabajo independiente.",
    ejemplos: "renta de cuarta categoría (PE), boleta de honorarios (CL), retención en la fuente por honorarios (CO)",
  },
  "regimen-simplificado": {
    descripcion: "Régimen tributario simplificado para pequeños contribuyentes.",
    ejemplos: "RESICO (MX), Nuevo RUS (PE), Régimen Simple (CO), monotributo (UY)",
    rutaAR: "/monotributo",
  },
  iva: {
    descripcion: "Agregar o quitar el impuesto al valor agregado de un precio.",
    ejemplos: "IVA, IGV (PE), ITBIS (DO), ITBMS (PA)",
  },
  "conversor-unidad": {
    descripcion: "Conversión entre la unidad de referencia principal del país y la moneda local.",
    ejemplos: "UF a pesos (CL), UMA a pesos (MX), UIT a soles (PE), UVT a pesos (CO), BPC a pesos (UY)",
  },
  "tipo-de-cambio": {
    descripcion: "Tipo de cambio oficial del día y conversión entre moneda local y dólar.",
    ejemplos: "dólar oficial, tipo de cambio SUNAT (PE), dólar BCV (VE), FIX (MX)",
  },
  inflacion: {
    descripcion: "Actualizar un monto por inflación con el índice oficial de precios.",
    ejemplos: "IPC, INPC (MX), actualizar por inflación",
    rutaAR: "/inflacion",
  },
  "plazo-fijo": {
    descripcion: "Rendimiento de un depósito a plazo fijo o una inversión de renta fija.",
    ejemplos: "plazo fijo, depósito a plazo, CDT (CO), CETES (MX)",
    rutaAR: "/plazo-fijo",
  },
  "pension-alimentos": {
    descripcion: "Monto orientativo de una cuota de alimentos para hijas e hijos.",
    ejemplos: "pensión alimenticia, pensión de alimentos, cuota alimentaria",
    rutaAR: "/cuota-alimentaria",
  },
  jubilacion: {
    descripcion: "Estimación del haber jubilatorio o la pensión por vejez.",
    ejemplos: "jubilación, pensión por vejez, retiro",
    rutaAR: "/jubilacion",
  },
  propio: {
    descripcion: "Calculadora sin equivalente en otro mercado. No entra en ningún clúster hreflang.",
    ejemplos: "prima de antigüedad (MX), asignación familiar (PE)",
  },
} as const satisfies Record<string, InfoConcepto>;

export type Concepto = keyof typeof CONCEPTOS;

export function esConcepto(valor: string): valor is Concepto {
  return Object.prototype.hasOwnProperty.call(CONCEPTOS, valor);
}
