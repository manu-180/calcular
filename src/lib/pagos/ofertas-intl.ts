import type { Concepto } from "@/motor/conceptos";
import type { Campo, Trato } from "@/motor/tipos";

// Qué se vende dentro del resultado de cada calculadora de calcularya.com, por concepto y no por
// calculadora: una calculadora nueva de un concepto que ya tiene oferta la recibe sola. Este archivo
// es puro (sin registro ni servidor) porque lo usa también el navegador para armar el texto de la
// oferta con los números de la persona.
//
// Dos clases de producto:
// - la planilla de sueldo y liquidación de cada país (catalogo-intl.ts), que se ofrece en las
//   calculadoras que tienen una hoja en ella (lo decide el mapa que escribe el generador);
// - los informes de esta lista: una página imprimible que vuelve a correr la misma calculadora con
//   los datos de la compra, así el número del informe es por construcción el de la web.
// Un concepto sin una oferta que de verdad le sirva a quien lo usa no tiene familia: salario
// mínimo, IVA, tipo de cambio, conversores y calculadoras propias quedan sin oferta a propósito.

export type Textos = Readonly<Record<Trato, string>>;

export const T = (tu: string, usted: string, vos: string): Textos => ({ tu, usted, vos });

export type ClaveFamilia =
  | "liquidacion"
  | "pagos-laborales"
  | "impuesto"
  | "contratacion"
  | "ajuste-inflacion"
  | "regimen"
  | "deposito"
  | "alimentos"
  | "jubilacion";

export type TipoEscenario = "moneda" | "horas" | "plazo";

export interface Punto {
  titulo: Textos;
  texto: Textos;
}

export interface FamiliaInforme {
  clave: ClaveFamilia;
  slug: `informe-${string}`;
  conceptos: readonly Concepto[];
  precioCentavos: number;
  nombre: string;
  tituloCorto: string;
  paraQuien: Textos;
  descripcion: readonly Textos[];
  gancho: Textos;
  incluye: readonly Punto[];
  pasos: { titulo: Textos; items: readonly Textos[] } | null;
  nota: { titulo: Textos; uso: Textos; pedido: string; cierre: string } | null;
  escenarios: { tipo: TipoEscenario; titulo: Textos; explica: Textos } | null;
}

const PASOS_LIQUIDACION = {
  titulo: T("Antes de firmar", "Antes de firmar", "Antes de firmar"),
  items: [
    T(
      "Compara cada rubro de este informe con el documento que te dan a firmar. Si falta uno, pregunta por qué antes de firmar.",
      "Compare cada rubro de este informe con el documento que le dan a firmar. Si falta uno, pregunte por qué antes de firmar.",
      "Compará cada rubro de este informe con el documento que te dan a firmar. Si falta uno, preguntá por qué antes de firmar.",
    ),
    T(
      "Revisa que el sueldo y las fechas que usa la empresa sean los mismos que cargaste aquí. Una fecha de ingreso distinta cambia casi todos los montos.",
      "Revise que el sueldo y las fechas que usa la empresa sean los mismos que cargó aquí. Una fecha de ingreso distinta cambia casi todos los montos.",
      "Revisá que el sueldo y las fechas que usa la empresa sean los mismos que cargaste acá. Una fecha de ingreso distinta cambia casi todos los montos.",
    ),
    T(
      "Pide una copia de todo lo que firmes y guarda los recibos de sueldo de los últimos meses.",
      "Pida una copia de todo lo que firme y guarde los recibos de sueldo de los últimos meses.",
      "Pedí una copia de todo lo que firmes y guardá los recibos de sueldo de los últimos meses.",
    ),
    T(
      "Si la diferencia es grande o hubo un despido, lleva este informe a la autoridad laboral de tu país o a un abogado laboralista: les ahorra la primera hora de cuentas.",
      "Si la diferencia es grande o hubo un despido, lleve este informe a la autoridad laboral de su país o a un abogado laboralista: les ahorra la primera hora de cuentas.",
      "Si la diferencia es grande o hubo un despido, llevá este informe a la autoridad laboral de tu país o a un abogado laboralista: les ahorra la primera hora de cuentas.",
    ),
  ],
} as const;

const PASOS_PAGO = {
  titulo: T("Para revisar tu pago", "Para revisar su pago", "Para revisar tu pago"),
  items: [
    T(
      "Busca este concepto en tu recibo de sueldo y compáralo con el monto de este informe.",
      "Busque este concepto en su recibo de sueldo y compárelo con el monto de este informe.",
      "Buscá este concepto en tu recibo de sueldo y comparalo con el monto de este informe.",
    ),
    T(
      "Si no coincide, primero confirma que los datos que cargaste sean los mismos que usa la empresa.",
      "Si no coincide, primero confirme que los datos que cargó sean los mismos que usa la empresa.",
      "Si no coincide, primero confirmá que los datos que cargaste sean los mismos que usa la empresa.",
    ),
    T(
      "Si aun así no coincide, usa la nota de abajo para pedir la diferencia por escrito y guarda una copia.",
      "Si aun así no coincide, use la nota de abajo para pedir la diferencia por escrito y guarde una copia.",
      "Si aun así no coincide, usá la nota de abajo para pedir la diferencia por escrito y guardá una copia.",
    ),
  ],
} as const;

export const FAMILIAS: readonly FamiliaInforme[] = [
  {
    clave: "liquidacion",
    slug: "informe-liquidacion",
    conceptos: ["liquidacion-final", "indemnizacion-despido", "preaviso"],
    precioCentavos: 900,
    nombre: "Informe de liquidación",
    tituloCorto: "informe de liquidación",
    paraQuien: T(
      "Para revisar tu liquidación antes de firmar o para reclamarla, con tus números y la ley de tu país",
      "Para revisar su liquidación antes de firmar o para reclamarla, con sus números y la ley de su país",
      "Para revisar tu liquidación antes de firmar o para reclamarla, con tus números y la ley de tu país",
    ),
    descripcion: [
      T(
        "Un informe en PDF con tu liquidación desglosada rubro por rubro: cuánto te toca de cada cosa, cómo se calcula y con qué valores oficiales, cada uno con su fuente.",
        "Un informe en PDF con su liquidación desglosada rubro por rubro: cuánto le toca de cada cosa, cómo se calcula y con qué valores oficiales, cada uno con su fuente.",
        "Un informe en PDF con tu liquidación desglosada rubro por rubro: cuánto te toca de cada cosa, cómo se calcula y con qué valores oficiales, cada uno con su fuente.",
      ),
      T(
        "Trae la lista de lo que conviene revisar antes de firmar y una nota lista para pedir el pago por escrito, ya completada con tu monto.",
        "Trae la lista de lo que conviene revisar antes de firmar y una nota lista para pedir el pago por escrito, ya completada con su monto.",
        "Trae la lista de lo que conviene revisar antes de firmar y una nota lista para pedir el pago por escrito, ya completada con tu monto.",
      ),
    ],
    gancho: T(
      "Llévate tu liquidación por escrito, lista para revisar antes de firmar",
      "Llévese su liquidación por escrito, lista para revisar antes de firmar",
      "Llevate tu liquidación por escrito, lista para revisar antes de firmar",
    ),
    incluye: [
      {
        titulo: T("Cada rubro con su cuenta", "Cada rubro con su cuenta", "Cada rubro con su cuenta"),
        texto: T(
          "Para comparar línea por línea con lo que te ofrece la empresa.",
          "Para comparar línea por línea con lo que le ofrece la empresa.",
          "Para comparar línea por línea con lo que te ofrece la empresa.",
        ),
      },
      {
        titulo: T("Fuentes oficiales a la vista", "Fuentes oficiales a la vista", "Fuentes oficiales a la vista"),
        texto: T(
          "Cada valor con el organismo que lo publica y la fecha en que lo verificamos.",
          "Cada valor con el organismo que lo publica y la fecha en que lo verificamos.",
          "Cada valor con el organismo que lo publica y la fecha en que lo verificamos.",
        ),
      },
      {
        titulo: T("Nota de reclamo lista", "Nota de reclamo lista", "Nota de reclamo lista"),
        texto: T(
          "Completada con tu monto, para pedir el pago por escrito.",
          "Completada con su monto, para pedir el pago por escrito.",
          "Completada con tu monto, para pedir el pago por escrito.",
        ),
      },
    ],
    pasos: PASOS_LIQUIDACION,
    nota: {
      titulo: T("Nota para pedir el pago", "Nota para pedir el pago", "Nota para pedir el pago"),
      uso: T(
        "Complétala, fírmala y entrégala con una copia para ti. Que te firmen la copia con la fecha en que la recibieron.",
        "Complétela, fírmela y entréguela con una copia para usted. Que le firmen la copia con la fecha en que la recibieron.",
        "Completala, firmala y entregala con una copia para vos. Que te firmen la copia con la fecha en que la recibieron.",
      ),
      pedido: "Por medio de la presente solicito el pago de mi liquidación por la terminación de la relación laboral, que según el cálculo detallado en el informe adjunto asciende a",
      cierre: "Adjunto el detalle de cada rubro, calculado con los valores oficiales vigentes a la fecha indicada. Quedo a la espera de que me informen la fecha de pago.",
    },
    escenarios: null,
  },
  {
    clave: "pagos-laborales",
    slug: "informe-pagos-laborales",
    conceptos: ["bono-semestral", "decimo-cuarto", "vacaciones", "horas-extra", "reparto-utilidades", "fondo-cesantia"],
    precioCentavos: 500,
    nombre: "Informe de pagos laborales",
    tituloCorto: "informe de pagos laborales",
    paraQuien: T(
      "Para confirmar que te pagaron bien el aguinaldo, las vacaciones, las horas extra o las utilidades, y pedir la diferencia si no",
      "Para confirmar que le pagaron bien el aguinaldo, las vacaciones, las horas extra o las utilidades, y pedir la diferencia si no",
      "Para confirmar que te pagaron bien el aguinaldo, las vacaciones, las horas extra o las utilidades, y pedir la diferencia si no",
    ),
    descripcion: [
      T(
        "Un informe en PDF con el cálculo que hiciste, paso a paso y con tus números: qué base se usa, cómo se cuenta y con qué valores oficiales, cada uno con su fuente.",
        "Un informe en PDF con el cálculo que hizo, paso a paso y con sus números: qué base se usa, cómo se cuenta y con qué valores oficiales, cada uno con su fuente.",
        "Un informe en PDF con el cálculo que hiciste, paso a paso y con tus números: qué base se usa, cómo se cuenta y con qué valores oficiales, cada uno con su fuente.",
      ),
      T(
        "Sirve para cualquier pago laboral de la lista. Trae cómo revisarlo en tu recibo y una nota lista para pedir la diferencia por escrito.",
        "Sirve para cualquier pago laboral de la lista. Trae cómo revisarlo en su recibo y una nota lista para pedir la diferencia por escrito.",
        "Sirve para cualquier pago laboral de la lista. Trae cómo revisarlo en tu recibo y una nota lista para pedir la diferencia por escrito.",
      ),
    ],
    gancho: T(
      "Ten este cálculo por escrito para comparar con tu recibo",
      "Tenga este cálculo por escrito para comparar con su recibo",
      "Tené este cálculo por escrito para comparar con tu recibo",
    ),
    incluye: [
      {
        titulo: T("El cálculo paso a paso", "El cálculo paso a paso", "El cálculo paso a paso"),
        texto: T("Con tus datos y cada valor oficial que usa.", "Con sus datos y cada valor oficial que usa.", "Con tus datos y cada valor oficial que usa."),
      },
      {
        titulo: T("Qué mirar en tu recibo", "Qué mirar en su recibo", "Qué mirar en tu recibo"),
        texto: T("Para saber en un minuto si te pagaron bien.", "Para saber en un minuto si le pagaron bien.", "Para saber en un minuto si te pagaron bien."),
      },
      {
        titulo: T("Nota para pedir la diferencia", "Nota para pedir la diferencia", "Nota para pedir la diferencia"),
        texto: T("Completada con tu monto, lista para entregar.", "Completada con su monto, lista para entregar.", "Completada con tu monto, lista para entregar."),
      },
    ],
    pasos: PASOS_PAGO,
    nota: {
      titulo: T("Nota para pedir el pago", "Nota para pedir el pago", "Nota para pedir el pago"),
      uso: T(
        "Complétala, fírmala y entrégala con una copia para ti.",
        "Complétela, fírmela y entréguela con una copia para usted.",
        "Completala, firmala y entregala con una copia para vos.",
      ),
      pedido: "Por medio de la presente solicito el pago del concepto que se detalla en el informe adjunto, que según el cálculo con los valores oficiales vigentes asciende a",
      cierre: "Si el monto pagado fue distinto, solicito que me informen por escrito cómo se calculó.",
    },
    escenarios: {
      tipo: "horas",
      titulo: T("Si cambian tus horas", "Si cambian sus horas", "Si cambian tus horas"),
      explica: T(
        "El mismo cálculo con otras cantidades de horas, para revisar cada mes sin volver a calcular.",
        "El mismo cálculo con otras cantidades de horas, para revisar cada mes sin volver a calcular.",
        "El mismo cálculo con otras cantidades de horas, para revisar cada mes sin volver a calcular.",
      ),
    },
  },
  {
    clave: "impuesto",
    slug: "informe-impuesto",
    conceptos: ["impuesto-renta", "retencion-honorarios"],
    precioCentavos: 700,
    nombre: "Informe de impuesto sobre el ingreso",
    tituloCorto: "informe de impuesto",
    paraQuien: T(
      "Para entender cuánto impuesto te retienen, revisar tu recibo y ver qué pasa si cambia tu ingreso",
      "Para entender cuánto impuesto le retienen, revisar su recibo y ver qué pasa si cambia su ingreso",
      "Para entender cuánto impuesto te retienen, revisar tu recibo y ver qué pasa si cambia tu ingreso",
    ),
    descripcion: [
      T(
        "Un informe en PDF con tu impuesto calculado paso a paso, con la tabla oficial que se aplica y la fuente de cada valor.",
        "Un informe en PDF con su impuesto calculado paso a paso, con la tabla oficial que se aplica y la fuente de cada valor.",
        "Un informe en PDF con tu impuesto calculado paso a paso, con la tabla oficial que se aplica y la fuente de cada valor.",
      ),
      T(
        "Suma una tabla con tu impuesto para otros ingresos, para saber de antemano cuánto te queda si te aumentan o si cambias de trabajo.",
        "Suma una tabla con su impuesto para otros ingresos, para saber de antemano cuánto le queda si le aumentan o si cambia de trabajo.",
        "Suma una tabla con tu impuesto para otros ingresos, para saber de antemano cuánto te queda si te aumentan o si cambiás de trabajo.",
      ),
    ],
    gancho: T(
      "Ten tu impuesto explicado por escrito, y qué pasa si cambia tu ingreso",
      "Tenga su impuesto explicado por escrito, y qué pasa si cambia su ingreso",
      "Tené tu impuesto explicado por escrito, y qué pasa si cambia tu ingreso",
    ),
    incluye: [
      {
        titulo: T("El cálculo con la tabla oficial", "El cálculo con la tabla oficial", "El cálculo con la tabla oficial"),
        texto: T("Paso a paso, con la fuente de cada valor.", "Paso a paso, con la fuente de cada valor.", "Paso a paso, con la fuente de cada valor."),
      },
      {
        titulo: T("Tu impuesto con otros ingresos", "Su impuesto con otros ingresos", "Tu impuesto con otros ingresos"),
        texto: T("Para negociar un aumento sabiendo cuánto te queda.", "Para negociar un aumento sabiendo cuánto le queda.", "Para negociar un aumento sabiendo cuánto te queda."),
      },
      {
        titulo: T("Qué revisar en tu recibo", "Qué revisar en su recibo", "Qué revisar en tu recibo"),
        texto: T("Para hablar con tu empleador o tu contador con números.", "Para hablar con su empleador o su contador con números.", "Para hablar con tu empleador o tu contador con números."),
      },
    ],
    pasos: {
      titulo: T("Para revisar tu retención", "Para revisar su retención", "Para revisar tu retención"),
      items: [
        T(
          "Busca la retención del impuesto en tu recibo y compárala con la de este informe.",
          "Busque la retención del impuesto en su recibo y compárela con la de este informe.",
          "Buscá la retención del impuesto en tu recibo y comparala con la de este informe.",
        ),
        T(
          "Si no coincide, confirma con tu empleador qué ingresos y deducciones está considerando.",
          "Si no coincide, confirme con su empleador qué ingresos y deducciones está considerando.",
          "Si no coincide, confirmá con tu empleador qué ingresos y deducciones está considerando.",
        ),
        T(
          "Guarda este informe para la declaración anual, si en tu país la tienes que presentar.",
          "Guarde este informe para la declaración anual, si en su país la tiene que presentar.",
          "Guardá este informe para la declaración anual, si en tu país la tenés que presentar.",
        ),
      ],
    },
    nota: null,
    escenarios: {
      tipo: "moneda",
      titulo: T("Si cambia tu ingreso", "Si cambia su ingreso", "Si cambia tu ingreso"),
      explica: T(
        "El mismo cálculo con tu ingreso un poco más bajo y más alto, con los mismos valores oficiales.",
        "El mismo cálculo con su ingreso un poco más bajo y más alto, con los mismos valores oficiales.",
        "El mismo cálculo con tu ingreso un poco más bajo y más alto, con los mismos valores oficiales.",
      ),
    },
  },
  {
    clave: "contratacion",
    slug: "informe-contratacion",
    conceptos: ["costo-empleador", "aportes-seguridad-social", "trabajo-domestico"],
    precioCentavos: 900,
    nombre: "Presupuesto de contratación",
    tituloCorto: "presupuesto de contratación",
    paraQuien: T(
      "Para saber cuánto cuesta de verdad contratar a alguien, con cada carga, antes de cerrar el sueldo",
      "Para saber cuánto cuesta de verdad contratar a alguien, con cada carga, antes de cerrar el sueldo",
      "Para saber cuánto cuesta de verdad contratar a alguien, con cada carga, antes de cerrar el sueldo",
    ),
    descripcion: [
      T(
        "Un presupuesto en PDF con el costo de la contratación desglosado: sueldo, aportes, contribuciones y provisiones, cada valor con su fuente oficial.",
        "Un presupuesto en PDF con el costo de la contratación desglosado: sueldo, aportes, contribuciones y provisiones, cada valor con su fuente oficial.",
        "Un presupuesto en PDF con el costo de la contratación desglosado: sueldo, aportes, contribuciones y provisiones, cada valor con su fuente oficial.",
      ),
      T(
        "Incluye una tabla con el costo para otros sueldos, para elegir la oferta sabiendo cuánto suma cada peso, y sirve para presentar a tu socio o a tu contador.",
        "Incluye una tabla con el costo para otros sueldos, para elegir la oferta sabiendo cuánto suma cada peso, y sirve para presentar a su socio o a su contador.",
        "Incluye una tabla con el costo para otros sueldos, para elegir la oferta sabiendo cuánto suma cada peso, y sirve para presentar a tu socio o a tu contador.",
      ),
    ],
    gancho: T(
      "Lleva este costo a un presupuesto para decidir la contratación",
      "Lleve este costo a un presupuesto para decidir la contratación",
      "Llevá este costo a un presupuesto para decidir la contratación",
    ),
    incluye: [
      {
        titulo: T("Cada carga por separado", "Cada carga por separado", "Cada carga por separado"),
        texto: T("Con la norma y la fuente oficial de cada una.", "Con la norma y la fuente oficial de cada una.", "Con la norma y la fuente oficial de cada una."),
      },
      {
        titulo: T("El costo con otros sueldos", "El costo con otros sueldos", "El costo con otros sueldos"),
        texto: T("Para negociar sabiendo cuánto suma cada peso.", "Para negociar sabiendo cuánto suma cada peso.", "Para negociar sabiendo cuánto suma cada peso."),
      },
      {
        titulo: T("Listo para presentar", "Listo para presentar", "Listo para presentar"),
        texto: T("A tu socio, a tu contador o para tu archivo.", "A su socio, a su contador o para su archivo.", "A tu socio, a tu contador o para tu archivo."),
      },
    ],
    pasos: {
      titulo: T("Antes de contratar", "Antes de contratar", "Antes de contratar"),
      items: [
        T(
          "Confirma con tu contador si tu actividad tiene un convenio o un salario mínimo propio por encima del general.",
          "Confirme con su contador si su actividad tiene un convenio o un salario mínimo propio por encima del general.",
          "Confirmá con tu contador si tu actividad tiene un convenio o un salario mínimo propio por encima del general.",
        ),
        T(
          "Reserva cada mes las provisiones del presupuesto: son pagos que llegan juntos a fin de año o al terminar el contrato.",
          "Reserve cada mes las provisiones del presupuesto: son pagos que llegan juntos a fin de año o al terminar el contrato.",
          "Reservá cada mes las provisiones del presupuesto: son pagos que llegan juntos a fin de año o al terminar el contrato.",
        ),
        T(
          "Registra a la persona desde el primer día: el costo de este presupuesto ya incluye los aportes de ley.",
          "Registre a la persona desde el primer día: el costo de este presupuesto ya incluye los aportes de ley.",
          "Registrá a la persona desde el primer día: el costo de este presupuesto ya incluye los aportes de ley.",
        ),
      ],
    },
    nota: null,
    escenarios: {
      tipo: "moneda",
      titulo: T("El costo con otros sueldos", "El costo con otros sueldos", "El costo con otros sueldos"),
      explica: T(
        "El mismo cálculo con sueldos más bajos y más altos, con los mismos valores oficiales.",
        "El mismo cálculo con sueldos más bajos y más altos, con los mismos valores oficiales.",
        "El mismo cálculo con sueldos más bajos y más altos, con los mismos valores oficiales.",
      ),
    },
  },
  {
    clave: "ajuste-inflacion",
    slug: "informe-ajuste-inflacion",
    conceptos: ["inflacion"],
    precioCentavos: 700,
    nombre: "Carta de ajuste por inflación",
    tituloCorto: "carta de ajuste por inflación",
    paraQuien: T(
      "Para pedir o comunicar el ajuste de un alquiler, una cuota, un honorario o un sueldo con el índice oficial",
      "Para pedir o comunicar el ajuste de un alquiler, una cuota, un honorario o un sueldo con el índice oficial",
      "Para pedir o comunicar el ajuste de un alquiler, una cuota, un honorario o un sueldo con el índice oficial",
    ),
    descripcion: [
      T(
        "Una carta lista para entregar, completada con tu monto actualizado, y el respaldo del cálculo: el índice oficial de cada fecha, el organismo que lo publica y el enlace a la fuente.",
        "Una carta lista para entregar, completada con su monto actualizado, y el respaldo del cálculo: el índice oficial de cada fecha, el organismo que lo publica y el enlace a la fuente.",
        "Una carta lista para entregar, completada con tu monto actualizado, y el respaldo del cálculo: el índice oficial de cada fecha, el organismo que lo publica y el enlace a la fuente.",
      ),
      T(
        "Con el respaldo a la vista, la otra parte puede comprobar el número en un minuto y la conversación pasa a ser sobre el índice, no sobre la cuenta.",
        "Con el respaldo a la vista, la otra parte puede comprobar el número en un minuto y la conversación pasa a ser sobre el índice, no sobre la cuenta.",
        "Con el respaldo a la vista, la otra parte puede comprobar el número en un minuto y la conversación pasa a ser sobre el índice, no sobre la cuenta.",
      ),
    ],
    gancho: T(
      "Convierte este ajuste en una carta lista para enviar, con el índice oficial de respaldo",
      "Convierta este ajuste en una carta lista para enviar, con el índice oficial de respaldo",
      "Convertí este ajuste en una carta lista para enviar, con el índice oficial de respaldo",
    ),
    incluye: [
      {
        titulo: T("La carta completada", "La carta completada", "La carta completada"),
        texto: T("Con tu monto actualizado, para imprimir o mandar.", "Con su monto actualizado, para imprimir o mandar.", "Con tu monto actualizado, para imprimir o mandar."),
      },
      {
        titulo: T("El índice oficial de respaldo", "El índice oficial de respaldo", "El índice oficial de respaldo"),
        texto: T("Con el organismo, la fecha y el enlace a la fuente.", "Con el organismo, la fecha y el enlace a la fuente.", "Con el organismo, la fecha y el enlace a la fuente."),
      },
      {
        titulo: T("La cuenta a la vista", "La cuenta a la vista", "La cuenta a la vista"),
        texto: T("Para que la otra parte la compruebe sola.", "Para que la otra parte la compruebe sola.", "Para que la otra parte la compruebe sola."),
      },
    ],
    pasos: null,
    nota: {
      titulo: T("Carta de ajuste", "Carta de ajuste", "Carta de ajuste"),
      uso: T(
        "Complétala con los datos del acuerdo y entrégala junto con el detalle del cálculo.",
        "Complétela con los datos del acuerdo y entréguela junto con el detalle del cálculo.",
        "Completala con los datos del acuerdo y entregala junto con el detalle del cálculo.",
      ),
      pedido: "Por medio de la presente comunico la actualización del monto acordado según la variación del índice oficial de precios, tal como se detalla en el cálculo adjunto. El monto actualizado es de",
      cierre: "El cálculo usa el índice que publica el organismo oficial indicado en el detalle, que se puede consultar en la fuente citada.",
    },
    escenarios: null,
  },
  {
    clave: "regimen",
    slug: "informe-regimen-simplificado",
    conceptos: ["regimen-simplificado"],
    precioCentavos: 700,
    nombre: "Informe de régimen simplificado",
    tituloCorto: "informe de régimen simplificado",
    paraQuien: T(
      "Para saber cuánto pagas en tu régimen simplificado y qué pasa si tus ingresos suben o bajan",
      "Para saber cuánto paga en su régimen simplificado y qué pasa si sus ingresos suben o bajan",
      "Para saber cuánto pagás en tu régimen simplificado y qué pasa si tus ingresos suben o bajan",
    ),
    descripcion: [
      T(
        "Un informe en PDF con tu cuota o tu impuesto del régimen simplificado, calculado paso a paso con la tabla oficial y la fuente de cada valor.",
        "Un informe en PDF con su cuota o su impuesto del régimen simplificado, calculado paso a paso con la tabla oficial y la fuente de cada valor.",
        "Un informe en PDF con tu cuota o tu impuesto del régimen simplificado, calculado paso a paso con la tabla oficial y la fuente de cada valor.",
      ),
      T(
        "Suma una tabla con lo que pagarías con otros ingresos, para anticipar un cambio de categoría antes de que llegue.",
        "Suma una tabla con lo que pagaría con otros ingresos, para anticipar un cambio de categoría antes de que llegue.",
        "Suma una tabla con lo que pagarías con otros ingresos, para anticipar un cambio de categoría antes de que llegue.",
      ),
    ],
    gancho: T(
      "Ten tu régimen por escrito y mira qué pasa si tus ingresos cambian",
      "Tenga su régimen por escrito y vea qué pasa si sus ingresos cambian",
      "Tené tu régimen por escrito y mirá qué pasa si tus ingresos cambian",
    ),
    incluye: [
      {
        titulo: T("Tu cálculo con la tabla oficial", "Su cálculo con la tabla oficial", "Tu cálculo con la tabla oficial"),
        texto: T("Paso a paso y con la fuente de cada valor.", "Paso a paso y con la fuente de cada valor.", "Paso a paso y con la fuente de cada valor."),
      },
      {
        titulo: T("Lo que pagarías con otros ingresos", "Lo que pagaría con otros ingresos", "Lo que pagarías con otros ingresos"),
        texto: T("Para ver venir un cambio de categoría.", "Para ver venir un cambio de categoría.", "Para ver venir un cambio de categoría."),
      },
      {
        titulo: T("Para tu archivo", "Para su archivo", "Para tu archivo"),
        texto: T("Con la fecha de los valores que usó.", "Con la fecha de los valores que usó.", "Con la fecha de los valores que usó."),
      },
    ],
    pasos: null,
    nota: null,
    escenarios: {
      tipo: "moneda",
      titulo: T("Si cambian tus ingresos", "Si cambian sus ingresos", "Si cambian tus ingresos"),
      explica: T(
        "El mismo cálculo con ingresos más bajos y más altos, con los mismos valores oficiales.",
        "El mismo cálculo con ingresos más bajos y más altos, con los mismos valores oficiales.",
        "El mismo cálculo con ingresos más bajos y más altos, con los mismos valores oficiales.",
      ),
    },
  },
  {
    clave: "deposito",
    slug: "informe-deposito",
    conceptos: ["plazo-fijo"],
    precioCentavos: 500,
    nombre: "Comparador de depósito a plazo",
    tituloCorto: "comparador de depósito",
    paraQuien: T(
      "Para comparar tu depósito a distintos plazos antes de elegir dónde y por cuánto tiempo invertir",
      "Para comparar su depósito a distintos plazos antes de elegir dónde y por cuánto tiempo invertir",
      "Para comparar tu depósito a distintos plazos antes de elegir dónde y por cuánto tiempo invertir",
    ),
    descripcion: [
      T(
        "Un informe en PDF con el rendimiento de tu depósito y una tabla con el mismo depósito a otros plazos, todo con el mismo cálculo de la calculadora.",
        "Un informe en PDF con el rendimiento de su depósito y una tabla con el mismo depósito a otros plazos, todo con el mismo cálculo de la calculadora.",
        "Un informe en PDF con el rendimiento de tu depósito y una tabla con el mismo depósito a otros plazos, todo con el mismo cálculo de la calculadora.",
      ),
    ],
    gancho: T(
      "Compara tu depósito a varios plazos en un solo informe",
      "Compare su depósito a varios plazos en un solo informe",
      "Compará tu depósito a varios plazos en un solo informe",
    ),
    incluye: [
      {
        titulo: T("Tu depósito a varios plazos", "Su depósito a varios plazos", "Tu depósito a varios plazos"),
        texto: T("En una tabla, para elegir de un vistazo.", "En una tabla, para elegir de un vistazo.", "En una tabla, para elegir de un vistazo."),
      },
      {
        titulo: T("La cuenta paso a paso", "La cuenta paso a paso", "La cuenta paso a paso"),
        texto: T("Con la fuente de cada valor que usa.", "Con la fuente de cada valor que usa.", "Con la fuente de cada valor que usa."),
      },
      {
        titulo: T("Para tu archivo", "Para su archivo", "Para tu archivo"),
        texto: T("Con la fecha de los valores que usó.", "Con la fecha de los valores que usó.", "Con la fecha de los valores que usó."),
      },
    ],
    pasos: null,
    nota: null,
    escenarios: {
      tipo: "plazo",
      titulo: T("Tu depósito a otros plazos", "Su depósito a otros plazos", "Tu depósito a otros plazos"),
      explica: T("El mismo cálculo con otros plazos.", "El mismo cálculo con otros plazos.", "El mismo cálculo con otros plazos."),
    },
  },
  {
    clave: "alimentos",
    slug: "informe-alimentos",
    conceptos: ["pension-alimentos"],
    precioCentavos: 900,
    nombre: "Informe de pensión de alimentos",
    tituloCorto: "informe de pensión de alimentos",
    paraQuien: T(
      "Para llegar a la mediación o a la conversación sobre la pensión de alimentos con un número fundado",
      "Para llegar a la mediación o a la conversación sobre la pensión de alimentos con un número fundado",
      "Para llegar a la mediación o a la conversación sobre la pensión de alimentos con un número fundado",
    ),
    descripcion: [
      T(
        "Un informe en PDF con el cálculo orientativo de la pensión, paso a paso, con los valores oficiales y su fuente, y una tabla con el monto para otros ingresos.",
        "Un informe en PDF con el cálculo orientativo de la pensión, paso a paso, con los valores oficiales y su fuente, y una tabla con el monto para otros ingresos.",
        "Un informe en PDF con el cálculo orientativo de la pensión, paso a paso, con los valores oficiales y su fuente, y una tabla con el monto para otros ingresos.",
      ),
    ],
    gancho: T(
      "Llega a la mediación con este cálculo por escrito",
      "Llegue a la mediación con este cálculo por escrito",
      "Llegá a la mediación con este cálculo por escrito",
    ),
    incluye: [
      {
        titulo: T("El cálculo fundado", "El cálculo fundado", "El cálculo fundado"),
        texto: T("Paso a paso, con la fuente de cada valor.", "Paso a paso, con la fuente de cada valor.", "Paso a paso, con la fuente de cada valor."),
      },
      {
        titulo: T("El monto con otros ingresos", "El monto con otros ingresos", "El monto con otros ingresos"),
        texto: T("Para negociar con escenarios a la vista.", "Para negociar con escenarios a la vista.", "Para negociar con escenarios a la vista."),
      },
      {
        titulo: T("Para tu abogado o mediador", "Para su abogado o mediador", "Para tu abogado o mediador"),
        texto: T("Les ahorra la primera hora de cuentas.", "Les ahorra la primera hora de cuentas.", "Les ahorra la primera hora de cuentas."),
      },
    ],
    pasos: null,
    nota: null,
    escenarios: {
      tipo: "moneda",
      titulo: T("Con otros ingresos", "Con otros ingresos", "Con otros ingresos"),
      explica: T(
        "El mismo cálculo con ingresos más bajos y más altos.",
        "El mismo cálculo con ingresos más bajos y más altos.",
        "El mismo cálculo con ingresos más bajos y más altos.",
      ),
    },
  },
  {
    clave: "jubilacion",
    slug: "informe-jubilacion",
    conceptos: ["jubilacion"],
    precioCentavos: 700,
    nombre: "Proyección de jubilación",
    tituloCorto: "proyección de jubilación",
    paraQuien: T(
      "Para planificar tu retiro con una proyección por escrito y ver qué cambia si aportas más",
      "Para planificar su retiro con una proyección por escrito y ver qué cambia si aporta más",
      "Para planificar tu retiro con una proyección por escrito y ver qué cambia si aportás más",
    ),
    descripcion: [
      T(
        "Un informe en PDF con la estimación de tu jubilación paso a paso, con los valores oficiales y su fuente, y una tabla con la proyección para otros sueldos.",
        "Un informe en PDF con la estimación de su jubilación paso a paso, con los valores oficiales y su fuente, y una tabla con la proyección para otros sueldos.",
        "Un informe en PDF con la estimación de tu jubilación paso a paso, con los valores oficiales y su fuente, y una tabla con la proyección para otros sueldos.",
      ),
    ],
    gancho: T(
      "Ten tu proyección de jubilación por escrito",
      "Tenga su proyección de jubilación por escrito",
      "Tené tu proyección de jubilación por escrito",
    ),
    incluye: [
      {
        titulo: T("La estimación paso a paso", "La estimación paso a paso", "La estimación paso a paso"),
        texto: T("Con la fuente de cada valor.", "Con la fuente de cada valor.", "Con la fuente de cada valor."),
      },
      {
        titulo: T("Con otros sueldos", "Con otros sueldos", "Con otros sueldos"),
        texto: T("Para ver qué cambia si aportas más.", "Para ver qué cambia si aporta más.", "Para ver qué cambia si aportás más."),
      },
      {
        titulo: T("Para tu archivo", "Para su archivo", "Para tu archivo"),
        texto: T("Con la fecha de los valores que usó.", "Con la fecha de los valores que usó.", "Con la fecha de los valores que usó."),
      },
    ],
    pasos: null,
    nota: null,
    escenarios: {
      tipo: "moneda",
      titulo: T("Con otros sueldos", "Con otros sueldos", "Con otros sueldos"),
      explica: T("El mismo cálculo con sueldos más bajos y más altos.", "El mismo cálculo con sueldos más bajos y más altos.", "El mismo cálculo con sueldos más bajos y más altos."),
    },
  },
];

const POR_CONCEPTO = new Map<string, FamiliaInforme>();
for (const f of FAMILIAS) {
  for (const c of f.conceptos) {
    if (POR_CONCEPTO.has(c)) throw new Error(`ofertas intl: el concepto ${c} está en dos familias`);
    POR_CONCEPTO.set(c, f);
  }
}

export function familiaDeConcepto(concepto: string): FamiliaInforme | null {
  return POR_CONCEPTO.get(concepto) ?? null;
}

export function familiaPorSlug(slug: string): FamiliaInforme | null {
  return FAMILIAS.find((f) => f.slug === slug) ?? null;
}

export function familiaPorClave(clave: string): FamiliaInforme | null {
  return FAMILIAS.find((f) => f.clave === clave) ?? null;
}

// ─── Lo que viaja al navegador ────────────────────────────────────────────────────────────────

export type TipoProducto = "planilla" | "informe";

export interface OfertaPublica {
  producto: string;
  slug: string;
  tipo: TipoProducto;
  familia: ClaveFamilia | "planilla";
  precioCentavos: number;
  tituloCorto: string;
  hoja?: string;
}

export interface OfertasCalculadora {
  calc: string;
  nombre: string;
  ofertas: readonly OfertaPublica[];
}

export interface OfertasMercado {
  activa: boolean;
  porCalculadora: Readonly<Record<string, OfertasCalculadora>>;
}

// «Calculadora de finiquito 2026 en Chile» → «finiquito». Para la frase «tu cálculo de …».
export function nombreDeCalculo(h1: string, pais: string): string {
  const sinPais = (s: string) => {
    for (const p of [` en ${pais}`, ` de ${pais}`]) if (s.toLowerCase().endsWith(p.toLowerCase())) return s.slice(0, -p.length);
    return s;
  };
  const sinAnio = (s: string) => s.replace(/\s+(19|20)\d{2}(?=\s|$)/g, "");
  let n = h1.split(":")[0].replace(/\{\{[^}]*\}\}/g, "").replace(/\s{2,}/g, " ").trim();
  n = n.replace(/^calculadora\s+((de\s+la|del|de|para)\s+)?/i, "").replace(/^personas\s+/i, "");
  n = sinAnio(sinPais(sinAnio(sinPais(n)))).trim();
  return /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]/.test(n) ? n.charAt(0).toLowerCase() + n.slice(1) : n;
}

// ─── Copy de la planilla dentro del resultado ─────────────────────────────────────────────────

export const COPY_PLANILLA = {
  ceja: "Planilla de Excel",
  gancho: T(
    "Lleva este cálculo a Excel, con tus datos ya cargados",
    "Lleve este cálculo a Excel, con sus datos ya cargados",
    "Llevá este cálculo a Excel, con tus datos ya cargados",
  ),
  incluye: [
    {
      titulo: T("Tus datos ya cargados", "Sus datos ya cargados", "Tus datos ya cargados"),
      texto: T(
        "Cambias una celda amarilla y se recalcula todo.",
        "Cambia una celda amarilla y se recalcula todo.",
        "Cambiás una celda amarilla y se recalcula todo.",
      ),
    },
    {
      titulo: T("Sueldo, aguinaldo y liquidación", "Sueldo, aguinaldo y liquidación", "Sueldo, aguinaldo y liquidación"),
      texto: T("En un solo archivo que te sirve todo el año.", "En un solo archivo que le sirve todo el año.", "En un solo archivo que te sirve todo el año."),
    },
    {
      titulo: T("Al día con cada cambio oficial", "Al día con cada cambio oficial", "Al día con cada cambio oficial"),
      texto: T(
        "El mismo enlace te da la versión nueva, sin pagar de nuevo.",
        "El mismo enlace le da la versión nueva, sin pagar de nuevo.",
        "El mismo enlace te da la versión nueva, sin pagar de nuevo.",
      ),
    },
  ] as readonly Punto[],
} as const;

export const CEJA_INFORME = "Informe en PDF";

// La bajada lleva el número que la persona acaba de ver: es lo que la hace sentir que el producto
// es suyo y no un genérico.
export function bajadaOferta(o: { tipo: TipoProducto; trato: Trato; etiqueta: string; cifra: string; hoja?: string; nombreCalculo: string }): string {
  const cifra = `${o.etiqueta}: ${o.cifra}.`;
  if (o.tipo === "planilla") {
    const hoja = o.hoja ? ` en la hoja «${o.hoja}»` : "";
    return {
      tu: `${cifra} La planilla lo trae${hoja} con tus números y las fórmulas a la vista, para que cambies lo que quieras.`,
      usted: `${cifra} La planilla lo trae${hoja} con sus números y las fórmulas a la vista, para que cambie lo que quiera.`,
      vos: `${cifra} La planilla lo trae${hoja} con tus números y las fórmulas a la vista, para que cambies lo que quieras.`,
    }[o.trato];
  }
  return {
    tu: `${cifra} El informe lo desglosa paso a paso con tus números y la fuente oficial de cada valor, listo para imprimir o guardar en PDF.`,
    usted: `${cifra} El informe lo desglosa paso a paso con sus números y la fuente oficial de cada valor, listo para imprimir o guardar en PDF.`,
    vos: `${cifra} El informe lo desglosa paso a paso con tus números y la fuente oficial de cada valor, listo para imprimir o guardar en PDF.`,
  }[o.trato];
}

export const TEXTOS_OFERTA = {
  pagoUnico: "pago único",
  comprarInforme: T("Quiero mi informe", "Quiero mi informe", "Quiero mi informe"),
  comprarPlanilla: T("Quiero mi planilla", "Quiero mi planilla", "Quiero mi planilla"),
  confianza: T(
    "Pagas con PayPal o con tarjeta. Si no te sirve, te devolvemos el dinero dentro de los 7 días.",
    "Paga con PayPal o con tarjeta. Si no le sirve, le devolvemos el dinero dentro de los 7 días.",
    "Pagás con PayPal o con tarjeta. Si no te sirve, te devolvemos el dinero dentro de los 7 días.",
  ),
  verDetalle: T("Ver qué trae", "Ver qué trae", "Ver qué trae"),
  tambien: T("También te puede servir:", "También le puede servir:", "También te puede servir:"),
  pronto: "Pronto a la venta",
  avisoTitulo: T("Avísame cuando esté disponible", "Avíseme cuando esté disponible", "Avisame cuando esté disponible"),
  avisoAyuda: T(
    "Te escribimos una sola vez, cuando se pueda comprar.",
    "Le escribimos una sola vez, cuando se pueda comprar.",
    "Te escribimos una sola vez, cuando se pueda comprar.",
  ),
  avisoBoton: "Avisarme",
  avisoListo: T(
    "Listo. Te avisamos a ese correo apenas esté a la venta.",
    "Listo. Le avisamos a ese correo apenas esté a la venta.",
    "Listo. Te avisamos a ese correo apenas esté a la venta.",
  ),
  avisoError: T(
    "No pudimos guardar el correo. Revisa que esté bien escrito y prueba de nuevo.",
    "No pudimos guardar el correo. Revise que esté bien escrito y pruebe de nuevo.",
    "No pudimos guardar el correo. Revisá que esté bien escrito y probá de nuevo.",
  ),
  etiquetaCorreo: T("Tu correo", "Su correo", "Tu correo"),
} as const;

export function precioUSD(centavos: number): string {
  const entero = centavos % 100 === 0;
  return `USD ${entero ? centavos / 100 : (centavos / 100).toFixed(2)}`;
}

// ─── Escenarios: qué campo se varía ───────────────────────────────────────────────────────────

const RE_HORAS = /hora/i;
const RE_PLAZO = /plazo|d[ií]as/i;

export function campoEscenario(tipo: TipoEscenario, campos: readonly Campo[]): Campo | null {
  const numericos = campos.filter((c) => c.tipo === "moneda" || c.tipo === "numero" || c.tipo === "entero");
  if (tipo === "moneda") return numericos.find((c) => c.tipo === "moneda" && c.requerido !== false) ?? null;
  const re = tipo === "horas" ? RE_HORAS : RE_PLAZO;
  return numericos.find((c) => c.tipo !== "moneda" && (re.test(c.id) || re.test(c.etiqueta))) ?? null;
}

const FACTORES_MONEDA = [0.75, 0.9, 1, 1.1, 1.25, 1.5];
const PLAZOS = [30, 60, 90, 180, 270, 365];

export function valoresEscenario(tipo: TipoEscenario, campo: Campo, actual: number): number[] {
  if (campo.tipo !== "moneda" && campo.tipo !== "numero" && campo.tipo !== "entero") return [];
  const dentro = (v: number) => (campo.min === undefined || v >= campo.min) && (campo.max === undefined || v <= campo.max);
  let lista: number[];
  if (tipo === "moneda") lista = FACTORES_MONEDA.map((f) => Math.round(actual * f * 100) / 100);
  else if (tipo === "plazo") lista = [...new Set([...PLAZOS, actual])].sort((a, b) => a - b);
  else {
    const base = Math.max(1, actual);
    lista = [...new Set([0.5, 1, 1.5, 2, 3].map((f) => Math.round(base * f)))];
  }
  if (campo.tipo === "entero") lista = lista.map((v) => Math.round(v));
  return [...new Set(lista)].filter((v) => v > 0 && dentro(v));
}
