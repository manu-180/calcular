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
  // Conceptos de las calculadoras universales (src/motor/universales): no dependen de una ley del
  // país, así que existen en todos los mercados con el mismo concepto.
  prestamo: { descripcion: "Cuota y costo total de un préstamo de cuota fija.", ejemplos: "préstamo personal, crédito, loan" },
  "tasa-efectiva": { descripcion: "Conversión entre tasa nominal y tasa efectiva anual.", ejemplos: "TNA a TEA, APR a APY" },
  hipoteca: { descripcion: "Cuota, intereses y tabla de un crédito hipotecario.", ejemplos: "hipoteca, crédito hipotecario, mortgage" },
  "interes-compuesto": { descripcion: "Crecimiento de un ahorro o inversión con interés compuesto y aportes.", ejemplos: "interés compuesto, compound interest" },
  "interes-simple": { descripcion: "Interés simple de un capital por un plazo.", ejemplos: "interés simple, simple interest" },
  "meta-de-ahorro": { descripcion: "Cuánto ahorrar por mes para llegar a una meta.", ejemplos: "meta de ahorro, savings goal" },
  "ahorro-retiro": { descripcion: "Cuánto ahorrar para el retiro con aportes propios.", ejemplos: "ahorro para la jubilación, retirement savings" },
  "tarjeta-de-credito": { descripcion: "Cuánto se tarda y cuánto se paga al saldar una tarjeta de crédito.", ejemplos: "pagar la tarjeta, credit card payoff" },
  presupuesto: { descripcion: "Reparto del ingreso mensual en necesidades, gustos y ahorro.", ejemplos: "presupuesto 50/30/20, budget" },
  "fondo-de-emergencia": { descripcion: "De cuánto tiene que ser un fondo de emergencia.", ejemplos: "fondo de emergencia, emergency fund" },
  "alquilar-o-comprar": { descripcion: "Comparación entre alquilar y comprar una vivienda.", ejemplos: "alquilar o comprar, rent vs buy" },
  "costo-de-un-auto": { descripcion: "Costo mensual real de tener un auto.", ejemplos: "costo de tener auto, car cost" },
  "rendimiento-inversion": { descripcion: "Rendimiento total y anualizado de una inversión (ROI).", ejemplos: "ROI, rentabilidad" },
  "margen-de-ganancia": { descripcion: "Margen, markup y precio de venta de un producto.", ejemplos: "margen de ganancia, markup, profit margin" },
  "punto-de-equilibrio": { descripcion: "Cuántas unidades vender para cubrir los costos.", ejemplos: "punto de equilibrio, break-even" },
  "tarifa-freelance": { descripcion: "Cuánto cobrar por hora trabajando por cuenta propia.", ejemplos: "tarifa freelance, freelance rate" },
  "conversor-sueldo": { descripcion: "Pasar un sueldo entre hora, día, semana, mes y año.", ejemplos: "sueldo por hora, hourly to salary" },
  "aumento-de-sueldo": { descripcion: "Nuevo sueldo y diferencia después de un aumento.", ejemplos: "aumento de sueldo, pay raise" },
  "horas-trabajadas": { descripcion: "Horas trabajadas en una jornada o semana y su pago.", ejemplos: "horas trabajadas, time card" },
  porcentaje: { descripcion: "Cuentas de porcentaje: el X % de un número y qué porcentaje es.", ejemplos: "porcentaje, percentage" },
  "variacion-porcentual": { descripcion: "Aumento o baja porcentual entre dos valores.", ejemplos: "variación porcentual, percentage change" },
  "regla-de-tres": { descripcion: "Regla de tres simple directa e inversa.", ejemplos: "regla de tres, rule of three" },
  descuento: { descripcion: "Precio final con descuento y cuánto se ahorra.", ejemplos: "descuento, discount" },
  propina: { descripcion: "Propina y total por persona.", ejemplos: "propina, tip" },
  "dividir-gastos": { descripcion: "Repartir gastos compartidos y quién le debe a quién.", ejemplos: "dividir gastos, split the bill" },
  promedio: { descripcion: "Promedio simple y ponderado, por ejemplo de notas.", ejemplos: "promedio, weighted average" },
  edad: { descripcion: "Edad exacta en años, meses y días.", ejemplos: "calcular edad, age calculator" },
  "dias-entre-fechas": { descripcion: "Días, semanas y meses entre dos fechas.", ejemplos: "días entre fechas, days between dates" },
  "sumar-dias": { descripcion: "Fecha que resulta de sumar o restar días.", ejemplos: "sumar días a una fecha, add days" },
  imc: { descripcion: "Índice de masa corporal.", ejemplos: "IMC, BMI" },
  calorias: { descripcion: "Calorías diarias según edad, peso, altura y actividad.", ejemplos: "calorías diarias, calorie calculator" },
  "fecha-de-parto": { descripcion: "Fecha probable de parto y semana de embarazo.", ejemplos: "fecha probable de parto, due date" },
  ovulacion: { descripcion: "Días fértiles y fecha de ovulación estimada.", ejemplos: "días fértiles, ovulation" },
  "ritmo-de-carrera": { descripcion: "Ritmo, tiempo y velocidad de una carrera.", ejemplos: "ritmo de carrera, running pace" },
  combustible: { descripcion: "Costo de combustible de un viaje.", ejemplos: "costo de nafta, gas cost, fuel cost" },
  "consumo-electrico": { descripcion: "Costo de la electricidad de un aparato.", ejemplos: "consumo eléctrico, electricity cost" },
  pintura: { descripcion: "Litros o galones de pintura para una superficie.", ejemplos: "cuánta pintura necesito, paint calculator" },
  "metros-cuadrados": { descripcion: "Superficie de un ambiente o terreno.", ejemplos: "metros cuadrados, square footage" },
  ceramicos: { descripcion: "Cantidad de cerámicos o baldosas para un piso.", ejemplos: "cerámicos, baldosas, tile calculator" },
  hormigon: { descripcion: "Volumen de hormigón y materiales para una losa o contrapiso.", ejemplos: "hormigón, concreto, concrete calculator" },
  propio: {
    descripcion: "Calculadora sin equivalente en otro mercado. No entra en ningún clúster hreflang.",
    ejemplos: "prima de antigüedad (MX), asignación familiar (PE)",
  },
} as const satisfies Record<string, InfoConcepto>;

export type Concepto = keyof typeof CONCEPTOS;

export function esConcepto(valor: string): valor is Concepto {
  return Object.prototype.hasOwnProperty.call(CONCEPTOS, valor);
}
