import type { ClaveFamilia } from "../ofertas-intl";
import { avisoEs } from "./aviso-es";
import { T, type DiccionarioVenta, type TextosFamilia } from "./tipos";

const PARA_TU_ARCHIVO = { titulo: T("Para tu archivo", "Para su archivo", "Para tu archivo"), texto: "Con la fecha de los valores que usó." };
const CON_OTROS_MONTOS = { titulo: "Con otros montos", explica: "El mismo cálculo con montos un poco más bajos y más altos." };
const CON_OTRAS_TASAS = { titulo: "Con otras tasas", explica: "La misma cuenta con tasas un poco más bajas y más altas." };

const familias: Record<ClaveFamilia, TextosFamilia> = {
  liquidacion: {
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
        titulo: "Cada rubro con su cuenta",
        texto: T(
          "Para comparar línea por línea con lo que te ofrece la empresa.",
          "Para comparar línea por línea con lo que le ofrece la empresa.",
          "Para comparar línea por línea con lo que te ofrece la empresa.",
        ),
      },
      { titulo: "Fuentes oficiales a la vista", texto: "Cada valor con el organismo que lo publica y la fecha en que lo verificamos." },
      {
        titulo: "Nota de reclamo lista",
        texto: T("Completada con tu monto, para pedir el pago por escrito.", "Completada con su monto, para pedir el pago por escrito.", "Completada con tu monto, para pedir el pago por escrito."),
      },
    ],
    pasos: {
      titulo: "Antes de firmar",
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
    },
    nota: {
      titulo: "Nota para pedir el pago",
      uso: T(
        "Complétala, fírmala y entrégala con una copia para ti. Que te firmen la copia con la fecha en que la recibieron.",
        "Complétela, fírmela y entréguela con una copia para usted. Que le firmen la copia con la fecha en que la recibieron.",
        "Completala, firmala y entregala con una copia para vos. Que te firmen la copia con la fecha en que la recibieron.",
      ),
      pedido: "Por medio de la presente solicito el pago de mi liquidación por la terminación de la relación laboral, que según el cálculo detallado en el informe adjunto asciende a",
      cierre: "Adjunto el detalle de cada rubro, calculado con los valores oficiales vigentes a la fecha indicada. Quedo a la espera de que me informen la fecha de pago.",
    },
  },
  "pagos-laborales": {
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
    gancho: T("Ten este cálculo por escrito para comparar con tu recibo", "Tenga este cálculo por escrito para comparar con su recibo", "Tené este cálculo por escrito para comparar con tu recibo"),
    incluye: [
      { titulo: "El cálculo paso a paso", texto: T("Con tus datos y cada valor oficial que usa.", "Con sus datos y cada valor oficial que usa.", "Con tus datos y cada valor oficial que usa.") },
      {
        titulo: T("Qué mirar en tu recibo", "Qué mirar en su recibo", "Qué mirar en tu recibo"),
        texto: T("Para saber en un minuto si te pagaron bien.", "Para saber en un minuto si le pagaron bien.", "Para saber en un minuto si te pagaron bien."),
      },
      { titulo: "Nota para pedir la diferencia", texto: T("Completada con tu monto, lista para entregar.", "Completada con su monto, lista para entregar.", "Completada con tu monto, lista para entregar.") },
    ],
    pasos: {
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
    },
    nota: {
      titulo: "Nota para pedir el pago",
      uso: T("Complétala, fírmala y entrégala con una copia para ti.", "Complétela, fírmela y entréguela con una copia para usted.", "Completala, firmala y entregala con una copia para vos."),
      pedido: "Por medio de la presente solicito el pago del concepto que se detalla en el informe adjunto, que según el cálculo con los valores oficiales vigentes asciende a",
      cierre: "Si el monto pagado fue distinto, solicito que me informen por escrito cómo se calculó.",
    },
    escenarios: {
      titulo: T("Si cambian tus horas", "Si cambian sus horas", "Si cambian tus horas"),
      explica: "El mismo cálculo con otras cantidades de horas, para revisar cada mes sin volver a calcular.",
    },
  },
  impuesto: {
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
      { titulo: "El cálculo con la tabla oficial", texto: "Paso a paso, con la fuente de cada valor." },
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
    escenarios: {
      titulo: T("Si cambia tu ingreso", "Si cambia su ingreso", "Si cambia tu ingreso"),
      explica: T(
        "El mismo cálculo con tu ingreso un poco más bajo y más alto, con los mismos valores oficiales.",
        "El mismo cálculo con su ingreso un poco más bajo y más alto, con los mismos valores oficiales.",
        "El mismo cálculo con tu ingreso un poco más bajo y más alto, con los mismos valores oficiales.",
      ),
    },
  },
  contratacion: {
    nombre: "Presupuesto de contratación",
    tituloCorto: "presupuesto de contratación",
    paraQuien: "Para saber cuánto cuesta de verdad contratar a alguien, con cada carga, antes de cerrar el sueldo",
    descripcion: [
      "Un presupuesto en PDF con el costo de la contratación desglosado: sueldo, aportes, contribuciones y provisiones, cada valor con su fuente oficial.",
      T(
        "Incluye una tabla con el costo para otros sueldos, para elegir la oferta sabiendo cuánto suma cada peso, y sirve para presentar a tu socio o a tu contador.",
        "Incluye una tabla con el costo para otros sueldos, para elegir la oferta sabiendo cuánto suma cada peso, y sirve para presentar a su socio o a su contador.",
        "Incluye una tabla con el costo para otros sueldos, para elegir la oferta sabiendo cuánto suma cada peso, y sirve para presentar a tu socio o a tu contador.",
      ),
    ],
    gancho: T("Lleva este costo a un presupuesto para decidir la contratación", "Lleve este costo a un presupuesto para decidir la contratación", "Llevá este costo a un presupuesto para decidir la contratación"),
    incluye: [
      { titulo: "Cada carga por separado", texto: "Con la norma y la fuente oficial de cada una." },
      { titulo: "El costo con otros sueldos", texto: "Para negociar sabiendo cuánto suma cada peso." },
      { titulo: "Listo para presentar", texto: T("A tu socio, a tu contador o para tu archivo.", "A su socio, a su contador o para su archivo.", "A tu socio, a tu contador o para tu archivo.") },
    ],
    pasos: {
      titulo: "Antes de contratar",
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
    escenarios: { titulo: "El costo con otros sueldos", explica: "El mismo cálculo con sueldos más bajos y más altos, con los mismos valores oficiales." },
  },
  "ajuste-inflacion": {
    nombre: "Carta de ajuste por inflación",
    tituloCorto: "carta de ajuste por inflación",
    paraQuien: "Para pedir o comunicar el ajuste de un alquiler, una cuota, un honorario o un sueldo con el índice oficial",
    descripcion: [
      T(
        "Una carta lista para entregar, completada con tu monto actualizado, y el respaldo del cálculo: el índice oficial de cada fecha, el organismo que lo publica y el enlace a la fuente.",
        "Una carta lista para entregar, completada con su monto actualizado, y el respaldo del cálculo: el índice oficial de cada fecha, el organismo que lo publica y el enlace a la fuente.",
        "Una carta lista para entregar, completada con tu monto actualizado, y el respaldo del cálculo: el índice oficial de cada fecha, el organismo que lo publica y el enlace a la fuente.",
      ),
      "Con el respaldo a la vista, la otra parte puede comprobar el número en un minuto y la conversación pasa a ser sobre el índice, no sobre la cuenta.",
    ],
    gancho: T(
      "Convierte este ajuste en una carta lista para enviar, con el índice oficial de respaldo",
      "Convierta este ajuste en una carta lista para enviar, con el índice oficial de respaldo",
      "Convertí este ajuste en una carta lista para enviar, con el índice oficial de respaldo",
    ),
    incluye: [
      { titulo: "La carta completada", texto: T("Con tu monto actualizado, para imprimir o mandar.", "Con su monto actualizado, para imprimir o mandar.", "Con tu monto actualizado, para imprimir o mandar.") },
      { titulo: "El índice oficial de respaldo", texto: "Con el organismo, la fecha y el enlace a la fuente." },
      { titulo: "La cuenta a la vista", texto: "Para que la otra parte la compruebe sola." },
    ],
    nota: {
      titulo: "Carta de ajuste",
      uso: T(
        "Complétala con los datos del acuerdo y entrégala junto con el detalle del cálculo.",
        "Complétela con los datos del acuerdo y entréguela junto con el detalle del cálculo.",
        "Completala con los datos del acuerdo y entregala junto con el detalle del cálculo.",
      ),
      pedido: "Por medio de la presente comunico la actualización del monto acordado según la variación del índice oficial de precios, tal como se detalla en el cálculo adjunto. El monto actualizado es de",
      cierre: "El cálculo usa el índice que publica el organismo oficial indicado en el detalle, que se puede consultar en la fuente citada.",
    },
  },
  regimen: {
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
      { titulo: T("Tu cálculo con la tabla oficial", "Su cálculo con la tabla oficial", "Tu cálculo con la tabla oficial"), texto: "Paso a paso y con la fuente de cada valor." },
      { titulo: T("Lo que pagarías con otros ingresos", "Lo que pagaría con otros ingresos", "Lo que pagarías con otros ingresos"), texto: "Para ver venir un cambio de categoría." },
      PARA_TU_ARCHIVO,
    ],
    escenarios: {
      titulo: T("Si cambian tus ingresos", "Si cambian sus ingresos", "Si cambian tus ingresos"),
      explica: "El mismo cálculo con ingresos más bajos y más altos, con los mismos valores oficiales.",
    },
  },
  deposito: {
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
    gancho: T("Compara tu depósito a varios plazos en un solo informe", "Compare su depósito a varios plazos en un solo informe", "Compará tu depósito a varios plazos en un solo informe"),
    incluye: [
      { titulo: T("Tu depósito a varios plazos", "Su depósito a varios plazos", "Tu depósito a varios plazos"), texto: "En una tabla, para elegir de un vistazo." },
      { titulo: "La cuenta paso a paso", texto: "Con la fuente de cada valor que usa." },
      PARA_TU_ARCHIVO,
    ],
    escenarios: { titulo: T("Tu depósito a otros plazos", "Su depósito a otros plazos", "Tu depósito a otros plazos"), explica: "El mismo cálculo con otros plazos." },
  },
  alimentos: {
    nombre: "Informe de pensión de alimentos",
    tituloCorto: "informe de pensión de alimentos",
    paraQuien: "Para llegar a la mediación o a la conversación sobre la pensión de alimentos con un número fundado",
    descripcion: [
      "Un informe en PDF con el cálculo orientativo de la pensión, paso a paso, con los valores oficiales y su fuente, y una tabla con el monto para otros ingresos.",
    ],
    gancho: T("Llega a la mediación con este cálculo por escrito", "Llegue a la mediación con este cálculo por escrito", "Llegá a la mediación con este cálculo por escrito"),
    incluye: [
      { titulo: "El cálculo fundado", texto: "Paso a paso, con la fuente de cada valor." },
      { titulo: "El monto con otros ingresos", texto: "Para negociar con escenarios a la vista." },
      { titulo: T("Para tu abogado o mediador", "Para su abogado o mediador", "Para tu abogado o mediador"), texto: "Les ahorra la primera hora de cuentas." },
    ],
    escenarios: { titulo: "Con otros ingresos", explica: "El mismo cálculo con ingresos más bajos y más altos." },
  },
  jubilacion: {
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
    gancho: T("Ten tu proyección de jubilación por escrito", "Tenga su proyección de jubilación por escrito", "Tené tu proyección de jubilación por escrito"),
    incluye: [
      { titulo: "La estimación paso a paso", texto: "Con la fuente de cada valor." },
      { titulo: "Con otros sueldos", texto: T("Para ver qué cambia si aportas más.", "Para ver qué cambia si aporta más.", "Para ver qué cambia si aportás más.") },
      PARA_TU_ARCHIVO,
    ],
    escenarios: { titulo: "Con otros sueldos", explica: "El mismo cálculo con sueldos más bajos y más altos." },
  },
  "plan-prestamo": {
    nombre: "Plan de préstamo",
    tituloCorto: "plan de préstamo",
    paraQuien: T(
      "Para saber cuánto te cuesta de verdad un préstamo y comparar ofertas antes de firmar",
      "Para saber cuánto le cuesta de verdad un préstamo y comparar ofertas antes de firmar",
      "Para saber cuánto te cuesta de verdad un préstamo y comparar ofertas antes de firmar",
    ),
    descripcion: [
      T(
        "Un informe en PDF con tu préstamo completo: la cuota, el total que vas a devolver y cuánto de eso son intereses.",
        "Un informe en PDF con su préstamo completo: la cuota, el total que va a devolver y cuánto de eso son intereses.",
        "Un informe en PDF con tu préstamo completo: la cuota, el total que vas a devolver y cuánto de eso son intereses.",
      ),
      T(
        "Si calculaste la cuota, trae todas las cuotas una por una. Y suma la misma cuenta con otras tasas, para comparar las ofertas de los bancos con números.",
        "Si calculó la cuota, trae todas las cuotas una por una. Y suma la misma cuenta con otras tasas, para comparar las ofertas de los bancos con números.",
        "Si calculaste la cuota, trae todas las cuotas una por una. Y suma la misma cuenta con otras tasas, para comparar las ofertas de los bancos con números.",
      ),
    ],
    gancho: T(
      "Compara ofertas de préstamo con tus números, antes de firmar",
      "Compare ofertas de préstamo con sus números, antes de firmar",
      "Compará ofertas de préstamo con tus números, antes de firmar",
    ),
    incluye: [
      { titulo: T("Tu préstamo con otras tasas", "Su préstamo con otras tasas", "Tu préstamo con otras tasas"), texto: "Para ver cuánto cambia con un punto más o menos." },
      {
        titulo: "El costo total a la vista",
        texto: T("Lo que pagas de intereses, sin letra chica.", "Lo que paga de intereses, sin letra chica.", "Lo que pagás de intereses, sin letra chica."),
      },
      { titulo: "Lista para antes de firmar", texto: "Las preguntas que conviene hacerle al banco." },
    ],
    pasos: {
      titulo: "Antes de firmar el préstamo",
      items: [
        T(
          "Pide la tasa efectiva anual con todos los costos, no solo la nominal: es la que sirve para comparar.",
          "Pida la tasa efectiva anual con todos los costos, no solo la nominal: es la que sirve para comparar.",
          "Pedí la tasa efectiva anual con todos los costos, no solo la nominal: es la que sirve para comparar.",
        ),
        T(
          "Pregunta si hay comisiones de apertura, seguros obligatorios o un cargo por pagar antes de tiempo.",
          "Pregunte si hay comisiones de apertura, seguros obligatorios o un cargo por pagar antes de tiempo.",
          "Preguntá si hay comisiones de apertura, seguros obligatorios o un cargo por pagar antes de tiempo.",
        ),
        T(
          "Compara al menos tres ofertas con la tabla de otras tasas de este informe.",
          "Compare al menos tres ofertas con la tabla de otras tasas de este informe.",
          "Compará al menos tres ofertas con la tabla de otras tasas de este informe.",
        ),
        T(
          "Elige una cuota que puedas pagar aunque tengas un mes malo. Como guía, que no pase de un tercio de tu ingreso.",
          "Elija una cuota que pueda pagar aunque tenga un mes malo. Como guía, que no pase de un tercio de su ingreso.",
          "Elegí una cuota que puedas pagar aunque tengas un mes malo. Como guía, que no pase de un tercio de tu ingreso.",
        ),
      ],
    },
    escenarios: CON_OTRAS_TASAS,
  },
  "plan-hipoteca": {
    nombre: "Plan de hipoteca",
    tituloCorto: "plan de hipoteca",
    paraQuien: "Para decidir una hipoteca con todos los números a la vista: cuota, intereses y qué pasa si cambia la tasa",
    descripcion: [
      T(
        "Un informe en PDF con tu hipoteca completa: la cuota, el total que vas a pagar y cuánto se va en intereses a lo largo de los años.",
        "Un informe en PDF con su hipoteca completa: la cuota, el total que va a pagar y cuánto se va en intereses a lo largo de los años.",
        "Un informe en PDF con tu hipoteca completa: la cuota, el total que vas a pagar y cuánto se va en intereses a lo largo de los años.",
      ),
      T(
        "Trae todas las tablas de tu cálculo completas (la página gratis muestra solo las primeras filas) y la misma cuenta con otras tasas. Si comparaste alquilar con comprar, deja la comparación por escrito para decidir en familia.",
        "Trae todas las tablas de su cálculo completas (la página gratis muestra solo las primeras filas) y la misma cuenta con otras tasas. Si comparó alquilar con comprar, deja la comparación por escrito para decidir en familia.",
        "Trae todas las tablas de tu cálculo completas (la página gratis muestra solo las primeras filas) y la misma cuenta con otras tasas. Si comparaste alquilar con comprar, deja la comparación por escrito para decidir en familia.",
      ),
    ],
    gancho: T(
      "Lleva tu hipoteca al banco con la tabla completa y otras tasas",
      "Lleve su hipoteca al banco con la tabla completa y otras tasas",
      "Llevá tu hipoteca al banco con la tabla completa y otras tasas",
    ),
    incluye: [
      { titulo: "La tabla completa", texto: "Todas las filas, no solo las primeras." },
      { titulo: T("Tu hipoteca con otras tasas", "Su hipoteca con otras tasas", "Tu hipoteca con otras tasas"), texto: "Para ver cuánto cambia la cuota con un punto más o menos." },
      { titulo: "Preguntas para el banco", texto: "Lo que conviene confirmar antes de firmar." },
    ],
    pasos: {
      titulo: "Antes de firmar la hipoteca",
      items: [
        T(
          "Pide la oferta por escrito con la tasa, el plazo y el costo total, incluidos seguros y gastos.",
          "Pida la oferta por escrito con la tasa, el plazo y el costo total, incluidos seguros y gastos.",
          "Pedí la oferta por escrito con la tasa, el plazo y el costo total, incluidos seguros y gastos.",
        ),
        T(
          "Pregunta si la tasa es fija o variable y qué pasa con la cuota si sube.",
          "Pregunte si la tasa es fija o variable y qué pasa con la cuota si sube.",
          "Preguntá si la tasa es fija o variable y qué pasa con la cuota si sube.",
        ),
        T(
          "Confirma cuánto cuesta pagar antes de tiempo y si puedes hacer pagos extra sin multa.",
          "Confirme cuánto cuesta pagar antes de tiempo y si puede hacer pagos extra sin multa.",
          "Confirmá cuánto cuesta pagar antes de tiempo y si podés hacer pagos extra sin multa.",
        ),
        T(
          "Suma a la cuota los gastos de la casa (impuestos, seguro, mantenimiento) antes de decidir cuánto puedes pagar.",
          "Sume a la cuota los gastos de la casa (impuestos, seguro, mantenimiento) antes de decidir cuánto puede pagar.",
          "Sumá a la cuota los gastos de la casa (impuestos, seguro, mantenimiento) antes de decidir cuánto podés pagar.",
        ),
      ],
    },
    escenarios: CON_OTRAS_TASAS,
  },
  "plan-inversion": {
    nombre: "Plan de ahorro e inversión",
    tituloCorto: "plan de ahorro",
    paraQuien: T(
      "Para ver cuánto crece tu ahorro con el tiempo y qué cambia si aportas más o consigues otra tasa",
      "Para ver cuánto crece su ahorro con el tiempo y qué cambia si aporta más o consigue otra tasa",
      "Para ver cuánto crece tu ahorro con el tiempo y qué cambia si aportás más o conseguís otra tasa",
    ),
    descripcion: [
      T(
        "Un informe en PDF con la proyección de tu ahorro: cuánto pones, cuánto ganas en intereses y con cuánto llegas al final.",
        "Un informe en PDF con la proyección de su ahorro: cuánto pone, cuánto gana en intereses y con cuánto llega al final.",
        "Un informe en PDF con la proyección de tu ahorro: cuánto ponés, cuánto ganás en intereses y con cuánto llegás al final.",
      ),
      T(
        "Trae todas las tablas de tu cálculo completas y la misma cuenta con otras tasas, para elegir dónde ahorrar con números.",
        "Trae todas las tablas de su cálculo completas y la misma cuenta con otras tasas, para elegir dónde ahorrar con números.",
        "Trae todas las tablas de tu cálculo completas y la misma cuenta con otras tasas, para elegir dónde ahorrar con números.",
      ),
    ],
    gancho: T("Ten tu plan de ahorro por escrito, año por año", "Tenga su plan de ahorro por escrito, año por año", "Tené tu plan de ahorro por escrito, año por año"),
    incluye: [
      { titulo: "La proyección completa", texto: "Todas las filas de la tabla, no solo las primeras." },
      { titulo: "Con otras tasas", texto: "Para comparar opciones antes de elegir." },
      { titulo: "Un plan para cumplirlo", texto: "Los pasos para que el ahorro no se quede en la intención." },
    ],
    pasos: {
      titulo: "Para que el plan se cumpla",
      items: [
        T(
          "Programa el aporte el mismo día que cobras: lo que no ves, no lo gastas.",
          "Programe el aporte el mismo día que cobra: lo que no ve, no lo gasta.",
          "Programá el aporte el mismo día que cobrás: lo que no ves, no lo gastás.",
        ),
        T(
          "Compara la tasa con la inflación: si la tasa es menor, tu dinero pierde valor aunque el número suba.",
          "Compare la tasa con la inflación: si la tasa es menor, su dinero pierde valor aunque el número suba.",
          "Compará la tasa con la inflación: si la tasa es menor, tu dinero pierde valor aunque el número suba.",
        ),
        T(
          "Vuelve a abrir este informe una vez por año y actualiza tus datos.",
          "Vuelva a abrir este informe una vez por año y actualice sus datos.",
          "Volvé a abrir este informe una vez por año y actualizá tus datos.",
        ),
      ],
    },
    escenarios: CON_OTRAS_TASAS,
  },
  "plan-deudas": {
    nombre: "Plan para pagar la tarjeta",
    tituloCorto: "plan para pagar la tarjeta",
    paraQuien: T(
      "Para saber cuándo terminas de pagar la tarjeta, cuánto te cuesta en intereses y cómo terminar antes",
      "Para saber cuándo termina de pagar la tarjeta, cuánto le cuesta en intereses y cómo terminar antes",
      "Para saber cuándo terminás de pagar la tarjeta, cuánto te cuesta en intereses y cómo terminar antes",
    ),
    descripcion: [
      T(
        "Un informe en PDF con tu deuda mes a mes: cuánto pagas, cuánto se va en intereses y cuánto baja el saldo.",
        "Un informe en PDF con su deuda mes a mes: cuánto paga, cuánto se va en intereses y cuánto baja el saldo.",
        "Un informe en PDF con tu deuda mes a mes: cuánto pagás, cuánto se va en intereses y cuánto baja el saldo.",
      ),
      T(
        "Trae la tabla completa hasta el último pago y la misma cuenta con otros pagos, para ver cuánto ahorras si pagas un poco más cada mes.",
        "Trae la tabla completa hasta el último pago y la misma cuenta con otros pagos, para ver cuánto ahorra si paga un poco más cada mes.",
        "Trae la tabla completa hasta el último pago y la misma cuenta con otros pagos, para ver cuánto ahorrás si pagás un poco más cada mes.",
      ),
    ],
    gancho: T(
      "Mira mes a mes cuándo terminas de pagar la tarjeta",
      "Vea mes a mes cuándo termina de pagar la tarjeta",
      "Mirá mes a mes cuándo terminás de pagar la tarjeta",
    ),
    incluye: [
      { titulo: "Mes a mes hasta el último pago", texto: "Con lo que se va en intereses cada mes." },
      {
        titulo: "Con otros pagos",
        texto: T("Para ver cuánto antes terminas si pagas un poco más.", "Para ver cuánto antes termina si paga un poco más.", "Para ver cuánto antes terminás si pagás un poco más."),
      },
      { titulo: "Un plan de salida", texto: T("Los pasos para no volver a endeudarte.", "Los pasos para no volver a endeudarse.", "Los pasos para no volver a endeudarte.") },
    ],
    pasos: {
      titulo: "Para salir de la deuda",
      items: [
        T(
          "Deja de usar la tarjeta mientras la pagas: cada compra nueva alarga la tabla.",
          "Deje de usar la tarjeta mientras la paga: cada compra nueva alarga la tabla.",
          "Dejá de usar la tarjeta mientras la pagás: cada compra nueva alarga la tabla.",
        ),
        T(
          "Paga siempre más que el mínimo. Aunque sea poco, la tabla con otros pagos muestra cuánto te ahorra.",
          "Pague siempre más que el mínimo. Aunque sea poco, la tabla con otros pagos muestra cuánto le ahorra.",
          "Pagá siempre más que el mínimo. Aunque sea poco, la tabla con otros pagos muestra cuánto te ahorra.",
        ),
        T(
          "Si tienes varias deudas, paga primero la de tasa más alta y el mínimo en las demás.",
          "Si tiene varias deudas, pague primero la de tasa más alta y el mínimo en las demás.",
          "Si tenés varias deudas, pagá primero la de tasa más alta y el mínimo en las demás.",
        ),
        T(
          "Pregunta en tu banco por una refinanciación con tasa más baja y compárala con este informe.",
          "Pregunte en su banco por una refinanciación con tasa más baja y compárela con este informe.",
          "Preguntá en tu banco por una refinanciación con tasa más baja y comparala con este informe.",
        ),
      ],
    },
    escenarios: { titulo: "Con otros pagos mensuales", explica: "La misma deuda pagando un poco menos y un poco más cada mes." },
  },
  "plan-presupuesto": {
    nombre: "Plan de presupuesto",
    tituloCorto: "plan de presupuesto",
    paraQuien: T(
      "Para ordenar tu mes con un plan claro: cuánto va a gastos fijos, a gustos y a ahorro",
      "Para ordenar su mes con un plan claro: cuánto va a gastos fijos, a gustos y a ahorro",
      "Para ordenar tu mes con un plan claro: cuánto va a gastos fijos, a gustos y a ahorro",
    ),
    descripcion: [
      T(
        "Un informe en PDF con tu cálculo convertido en plan: cuánto destinar a cada cosa, en tu moneda y con tus números.",
        "Un informe en PDF con su cálculo convertido en plan: cuánto destinar a cada cosa, en su moneda y con sus números.",
        "Un informe en PDF con tu cálculo convertido en plan: cuánto destinar a cada cosa, en tu moneda y con tus números.",
      ),
      T(
        "Incluye el mismo plan con otros montos, para saber de antemano qué cambia si un mes entra más o entra menos, y los pasos para cumplirlo.",
        "Incluye el mismo plan con otros montos, para saber de antemano qué cambia si un mes entra más o entra menos, y los pasos para cumplirlo.",
        "Incluye el mismo plan con otros montos, para saber de antemano qué cambia si un mes entra más o entra menos, y los pasos para cumplirlo.",
      ),
    ],
    gancho: T("Convierte este cálculo en un plan para tu mes", "Convierta este cálculo en un plan para su mes", "Convertí este cálculo en un plan para tu mes"),
    incluye: [
      { titulo: T("Tu plan con tus números", "Su plan con sus números", "Tu plan con tus números"), texto: "Cuánto va a cada cosa, listo para seguir." },
      { titulo: "Con otros montos", texto: "Para ajustar el plan si el mes cambia." },
      { titulo: "Pasos para cumplirlo", texto: "Lo que hace que un presupuesto dure más allá del primer mes." },
    ],
    pasos: {
      titulo: "Para que el presupuesto funcione",
      items: [
        T(
          "Separa el ahorro el día que cobras, antes de gastar. Lo que queda es lo que puedes gastar.",
          "Separe el ahorro el día que cobra, antes de gastar. Lo que queda es lo que puede gastar.",
          "Separá el ahorro el día que cobrás, antes de gastar. Lo que queda es lo que podés gastar.",
        ),
        T(
          "Anota tus gastos durante un mes, aunque sea en el teléfono, y compáralos con este plan.",
          "Anote sus gastos durante un mes, aunque sea en el teléfono, y compárelos con este plan.",
          "Anotá tus gastos durante un mes, aunque sea en el teléfono, y comparalos con este plan.",
        ),
        T(
          "Arma primero un fondo para imprevistos: evita que una sorpresa termine en la tarjeta.",
          "Arme primero un fondo para imprevistos: evita que una sorpresa termine en la tarjeta.",
          "Armá primero un fondo para imprevistos: evita que una sorpresa termine en la tarjeta.",
        ),
      ],
    },
    escenarios: CON_OTROS_MONTOS,
  },
  "plan-negocio": {
    nombre: "Informe de números del negocio",
    tituloCorto: "informe de negocio",
    paraQuien: "Para decidir precios, márgenes o una inversión con números claros, listos para mostrar a un socio",
    descripcion: [
      T(
        "Un informe en PDF con tu cálculo explicado paso a paso: qué datos usa, cómo se calcula y qué resultado da.",
        "Un informe en PDF con su cálculo explicado paso a paso: qué datos usa, cómo se calcula y qué resultado da.",
        "Un informe en PDF con tu cálculo explicado paso a paso: qué datos usa, cómo se calcula y qué resultado da.",
      ),
      T(
        "Suma una tabla con la misma cuenta para otros montos, para ver cómo cambia el resultado si sube un costo o bajas el precio.",
        "Suma una tabla con la misma cuenta para otros montos, para ver cómo cambia el resultado si sube un costo o baja el precio.",
        "Suma una tabla con la misma cuenta para otros montos, para ver cómo cambia el resultado si sube un costo o bajás el precio.",
      ),
    ],
    gancho: T(
      "Lleva estos números a un informe para decidir o para mostrar",
      "Lleve estos números a un informe para decidir o para mostrar",
      "Llevá estos números a un informe para decidir o para mostrar",
    ),
    incluye: [
      { titulo: "La cuenta explicada", texto: "Para entenderla y defenderla frente a un socio o un banco." },
      { titulo: "Con otros montos", texto: "Para ver antes el efecto de un cambio de precio o de costo." },
      { titulo: "Preguntas para decidir", texto: "Lo que conviene revisar antes de mover un precio." },
    ],
    pasos: {
      titulo: "Antes de decidir",
      items: [
        T(
          "Revisa que los costos incluyan todo: envío, comisiones, impuestos y tu propio tiempo.",
          "Revise que los costos incluyan todo: envío, comisiones, impuestos y su propio tiempo.",
          "Revisá que los costos incluyan todo: envío, comisiones, impuestos y tu propio tiempo.",
        ),
        T(
          "Compara tu precio con el de dos o tres competidores antes de cambiarlo.",
          "Compare su precio con el de dos o tres competidores antes de cambiarlo.",
          "Compará tu precio con el de dos o tres competidores antes de cambiarlo.",
        ),
        T(
          "Mira el peor caso de la tabla: si el negocio aguanta ahí, la decisión es más segura.",
          "Mire el peor caso de la tabla: si el negocio aguanta ahí, la decisión es más segura.",
          "Mirá el peor caso de la tabla: si el negocio aguanta ahí, la decisión es más segura.",
        ),
      ],
    },
    escenarios: CON_OTROS_MONTOS,
  },
  "kit-freelance": {
    nombre: "Kit de tarifa freelance",
    tituloCorto: "kit de tarifa freelance",
    paraQuien: T(
      "Para cobrar lo que corresponde por tu trabajo y presentar tu tarifa con seguridad",
      "Para cobrar lo que corresponde por su trabajo y presentar su tarifa con seguridad",
      "Para cobrar lo que corresponde por tu trabajo y presentar tu tarifa con seguridad",
    ),
    descripcion: [
      T(
        "Un informe en PDF con tu tarifa por hora explicada: qué ingreso buscas, cuántas horas facturas de verdad y qué gastos cubre.",
        "Un informe en PDF con su tarifa por hora explicada: qué ingreso busca, cuántas horas factura de verdad y qué gastos cubre.",
        "Un informe en PDF con tu tarifa por hora explicada: qué ingreso buscás, cuántas horas facturás de verdad y qué gastos cubre.",
      ),
      T(
        "Trae la tarifa para otras metas de ingreso y una carta lista para enviar a un cliente con tu tarifa por hora.",
        "Trae la tarifa para otras metas de ingreso y una carta lista para enviar a un cliente con su tarifa por hora.",
        "Trae la tarifa para otras metas de ingreso y una carta lista para enviar a un cliente con tu tarifa por hora.",
      ),
    ],
    gancho: T(
      "Presenta tu tarifa con números, no con una disculpa",
      "Presente su tarifa con números, no con una disculpa",
      "Presentá tu tarifa con números, no con una disculpa",
    ),
    incluye: [
      {
        titulo: T("Tu tarifa explicada", "Su tarifa explicada", "Tu tarifa explicada"),
        texto: T("Para responder cuando te pregunten por qué cobras eso.", "Para responder cuando le pregunten por qué cobra eso.", "Para responder cuando te pregunten por qué cobrás eso."),
      },
      { titulo: "Con otras metas de ingreso", texto: T("La tarifa que necesitas para cada una.", "La tarifa que necesita para cada una.", "La tarifa que necesitás para cada una.") },
      {
        titulo: "Carta de tarifa lista",
        texto: T("Completada con tu número, para mandar a tus clientes.", "Completada con su número, para mandar a sus clientes.", "Completada con tu número, para mandar a tus clientes."),
      },
    ],
    pasos: {
      titulo: "Para cobrar lo que corresponde",
      items: [
        T(
          "Cuenta solo las horas que facturas: reuniones, presupuestos y cobranzas también son trabajo.",
          "Cuente solo las horas que factura: reuniones, presupuestos y cobranzas también son trabajo.",
          "Contá solo las horas que facturás: reuniones, presupuestos y cobranzas también son trabajo.",
        ),
        T(
          "Cuando puedas, presenta un precio por proyecto: el cliente compra un resultado, no horas.",
          "Cuando pueda, presente un precio por proyecto: el cliente compra un resultado, no horas.",
          "Cuando puedas, presentá un precio por proyecto: el cliente compra un resultado, no horas.",
        ),
        T(
          "Revisa tu tarifa una vez por año, o antes si suben tus costos.",
          "Revise su tarifa una vez por año, o antes si suben sus costos.",
          "Revisá tu tarifa una vez por año, o antes si suben tus costos.",
        ),
      ],
    },
    nota: {
      titulo: "Carta de tarifa",
      uso: T(
        "Complétala con los datos del cliente y envíala junto con tu propuesta.",
        "Complétela con los datos del cliente y envíela junto con su propuesta.",
        "Completala con los datos del cliente y enviala junto con tu propuesta.",
      ),
      pedido: "Le comparto mi tarifa para los servicios profesionales que conversamos. Mi valor por hora de trabajo es de",
      cierre: "La tarifa cubre el tiempo de trabajo y los costos propios de la actividad. Quedo a disposición para armar una propuesta por proyecto.",
    },
    escenarios: { titulo: "Con otras metas de ingreso", explica: "La misma cuenta con metas de ingreso más bajas y más altas." },
  },
  "plan-sueldo": {
    nombre: "Informe de sueldo",
    tituloCorto: "informe de sueldo",
    paraQuien: "Para negociar un sueldo, una oferta o un aumento sabiendo cuánto es por hora, por mes y por año",
    descripcion: [
      T(
        "Un informe en PDF con tu cálculo de sueldo explicado, con tus números y cada dato que usa.",
        "Un informe en PDF con su cálculo de sueldo explicado, con sus números y cada dato que usa.",
        "Un informe en PDF con tu cálculo de sueldo explicado, con tus números y cada dato que usa.",
      ),
      "Suma una tabla con otros montos, para comparar ofertas o pedir un aumento con números claros.",
    ],
    gancho: T("Negocia tu sueldo con los números por escrito", "Negocie su sueldo con los números por escrito", "Negociá tu sueldo con los números por escrito"),
    incluye: [
      {
        titulo: T("Tu cálculo completo", "Su cálculo completo", "Tu cálculo completo"),
        texto: T("Con cada dato que usaste.", "Con cada dato que usó.", "Con cada dato que usaste."),
      },
      { titulo: "Con otros montos", texto: "Para comparar dos ofertas en un minuto." },
      { titulo: "Ideas para negociar", texto: "Qué decir y qué pedir además del número." },
    ],
    pasos: {
      titulo: "Para negociar",
      items: [
        T(
          "Habla en montos anuales o por hora cuando compares ofertas: los montos mensuales esconden diferencias.",
          "Hable en montos anuales o por hora cuando compare ofertas: los montos mensuales esconden diferencias.",
          "Hablá en montos anuales o por hora cuando compares ofertas: los montos mensuales esconden diferencias.",
        ),
        T(
          "Pide también lo que no es sueldo: días libres, trabajo remoto, capacitación o un bono.",
          "Pida también lo que no es sueldo: días libres, trabajo remoto, capacitación o un bono.",
          "Pedí también lo que no es sueldo: días libres, trabajo remoto, capacitación o un bono.",
        ),
        T(
          "Lleva un número concreto y la razón: tu experiencia, el mercado o lo que cambió en tu puesto.",
          "Lleve un número concreto y la razón: su experiencia, el mercado o lo que cambió en su puesto.",
          "Llevá un número concreto y la razón: tu experiencia, el mercado o lo que cambió en tu puesto.",
        ),
      ],
    },
    escenarios: CON_OTROS_MONTOS,
  },
  "kit-calculos": {
    nombre: "Cálculo explicado paso a paso",
    tituloCorto: "cálculo explicado",
    paraQuien: "Para tener la cuenta resuelta y explicada, lista para imprimir, estudiar o mostrar",
    descripcion: [
      T(
        "Un informe en PDF con tu cálculo, cómo se resuelve y el resultado, con tus números.",
        "Un informe en PDF con su cálculo, cómo se resuelve y el resultado, con sus números.",
        "Un informe en PDF con tu cálculo, cómo se resuelve y el resultado, con tus números.",
      ),
      "Sirve para estudiar, para dejar constancia de una cuenta o para mostrársela a otra persona sin tener que explicarla.",
    ],
    gancho: T("Llévate la cuenta explicada paso a paso", "Llévese la cuenta explicada paso a paso", "Llevate la cuenta explicada paso a paso"),
    incluye: [
      { titulo: "La cuenta resuelta", texto: T("Con tus datos y el resultado.", "Con sus datos y el resultado.", "Con tus datos y el resultado.") },
      { titulo: "Cómo se calcula", texto: "Para entender de dónde sale cada número." },
      { titulo: "Lista para imprimir", texto: "O para guardar en PDF y compartir." },
    ],
    pasos: {
      titulo: "Para comprobarlo",
      items: [
        T(
          "Haz la cuenta al revés: parte del resultado y vuelve al dato inicial.",
          "Haga la cuenta al revés: parta del resultado y vuelva al dato inicial.",
          "Hacé la cuenta al revés: partí del resultado y volvé al dato inicial.",
        ),
        T("Redondea solo al final: redondear en cada paso cambia el resultado.", "Redondee solo al final: redondear en cada paso cambia el resultado.", "Redondeá solo al final: redondear en cada paso cambia el resultado."),
      ],
    },
    escenarios: CON_OTROS_MONTOS,
  },
  "kit-gastos-grupo": {
    nombre: "Resumen de gastos del grupo",
    tituloCorto: "resumen de gastos",
    paraQuien: "Para que todos sepan cuánto le toca a cada uno, sin discusiones ni cuentas en una servilleta",
    descripcion: [
      "Un resumen en PDF con la cuenta del grupo: el total, cuánto pone cada persona y, si corresponde, quién le debe a quién.",
      "Se comparte por mensaje o se imprime, así nadie tiene que rehacer la cuenta.",
    ],
    gancho: T(
      "Comparte la cuenta con el grupo, clara y sin discusiones",
      "Comparta la cuenta con el grupo, clara y sin discusiones",
      "Compartí la cuenta con el grupo, clara y sin discusiones",
    ),
    incluye: [
      { titulo: "Cuánto paga cada uno", texto: "Con el total y el detalle a la vista." },
      { titulo: "Listo para compartir", texto: "En PDF, para mandarlo al grupo." },
      { titulo: "Con otros totales", texto: "Por si se suma algo a la cuenta." },
    ],
    pasos: {
      titulo: "Para cerrar la cuenta",
      items: [
        T(
          "Manda el resumen al grupo antes de que alguien pague: evita malentendidos.",
          "Mande el resumen al grupo antes de que alguien pague: evita malentendidos.",
          "Mandá el resumen al grupo antes de que alguien pague: evita malentendidos.",
        ),
        "Acuerden un medio de pago y una fecha para saldar.",
      ],
    },
    escenarios: { titulo: "Con otros totales", explica: "La misma cuenta si el total es un poco menor o mayor." },
  },
  "kit-estudio": {
    nombre: "Informe de promedio",
    tituloCorto: "informe de promedio",
    paraQuien: T(
      "Para tener tu promedio claro y por escrito, con el peso de cada nota",
      "Para tener su promedio claro y por escrito, con el peso de cada nota",
      "Para tener tu promedio claro y por escrito, con el peso de cada nota",
    ),
    descripcion: [
      T(
        "Un informe en PDF con tu promedio: cada nota, su peso y cómo se llega al resultado.",
        "Un informe en PDF con su promedio: cada nota, su peso y cómo se llega al resultado.",
        "Un informe en PDF con tu promedio: cada nota, su peso y cómo se llega al resultado.",
      ),
      "Sirve para revisar una calificación, planificar el próximo examen o presentar el cálculo a quien corresponda.",
    ],
    gancho: T("Ten tu promedio explicado por escrito", "Tenga su promedio explicado por escrito", "Tené tu promedio explicado por escrito"),
    incluye: [
      { titulo: "Cada nota con su peso", texto: "Para ver cuál pesa más en el resultado." },
      { titulo: "La cuenta paso a paso", texto: "Para revisarla o mostrarla." },
      { titulo: "Ideas para el próximo examen", texto: "Cómo usar el promedio para organizarse." },
    ],
    pasos: {
      titulo: "Para el próximo examen",
      items: [
        T(
          "Fíjate qué nota pesa más y dedícale más tiempo a esa materia o a ese examen.",
          "Fíjese qué nota pesa más y dedíquele más tiempo a esa materia o a ese examen.",
          "Fijate qué nota pesa más y dedicale más tiempo a esa materia o a ese examen.",
        ),
        T(
          "Si una nota parece mal calculada, lleva este informe a tu docente.",
          "Si una nota parece mal calculada, lleve este informe a su docente.",
          "Si una nota parece mal calculada, llevá este informe a tu docente.",
        ),
      ],
    },
  },
  "kit-fechas": {
    nombre: "Informe de fechas y plazos",
    tituloCorto: "informe de fechas",
    paraQuien: "Para tener una fecha o un plazo calculado por escrito, listo para presentar o para no olvidarlo",
    descripcion: [
      T(
        "Un informe en PDF con tu cálculo de fechas: las fechas que usaste, el resultado y cómo se cuenta.",
        "Un informe en PDF con su cálculo de fechas: las fechas que usó, el resultado y cómo se cuenta.",
        "Un informe en PDF con tu cálculo de fechas: las fechas que usaste, el resultado y cómo se cuenta.",
      ),
      "Sirve para un trámite, un contrato, un vencimiento o simplemente para guardar el dato.",
    ],
    gancho: T("Deja esta fecha por escrito, lista para presentar", "Deje esta fecha por escrito, lista para presentar", "Dejá esta fecha por escrito, lista para presentar"),
    incluye: [
      { titulo: "El cálculo explicado", texto: "Con las fechas y cómo se cuentan los días." },
      { titulo: "Listo para presentar", texto: "En un trámite o junto a un contrato." },
      { titulo: T("Para tu archivo", "Para su archivo", "Para tu archivo"), texto: "Con la fecha en que se hizo." },
    ],
    pasos: {
      titulo: "Antes de usar una fecha en un trámite",
      items: [
        T(
          "Confirma si el plazo se cuenta en días corridos o hábiles: cambia el resultado.",
          "Confirme si el plazo se cuenta en días corridos o hábiles: cambia el resultado.",
          "Confirmá si el plazo se cuenta en días corridos o hábiles: cambia el resultado.",
        ),
        T("Revisa si el último día cae en feriado o fin de semana.", "Revise si el último día cae en feriado o fin de semana.", "Revisá si el último día cae en feriado o fin de semana."),
        T(
          "Anota el vencimiento en tu calendario con un aviso unos días antes.",
          "Anote el vencimiento en su calendario con un aviso unos días antes.",
          "Anotá el vencimiento en tu calendario con un aviso unos días antes.",
        ),
      ],
    },
  },
  "plan-salud": {
    nombre: "Informe de IMC y calorías",
    tituloCorto: "informe de IMC y calorías",
    paraQuien: T(
      "Para tener tus números de peso y energía por escrito y llevarlos a tu consulta",
      "Para tener sus números de peso y energía por escrito y llevarlos a su consulta",
      "Para tener tus números de peso y energía por escrito y llevarlos a tu consulta",
    ),
    descripcion: [
      T(
        "Un informe en PDF con tu resultado explicado: qué mide, cómo se calcula y en qué rango está, con tus datos.",
        "Un informe en PDF con su resultado explicado: qué mide, cómo se calcula y en qué rango está, con sus datos.",
        "Un informe en PDF con tu resultado explicado: qué mide, cómo se calcula y en qué rango está, con tus datos.",
      ),
      "Es información general para conversar con un profesional de la salud. No es un diagnóstico ni reemplaza una consulta.",
    ],
    gancho: T(
      "Lleva tus números a la consulta, explicados y por escrito",
      "Lleve sus números a la consulta, explicados y por escrito",
      "Llevá tus números a la consulta, explicados y por escrito",
    ),
    incluye: [
      { titulo: T("Tu resultado explicado", "Su resultado explicado", "Tu resultado explicado"), texto: "Qué mide y cómo se calcula." },
      { titulo: "Preguntas para la consulta", texto: "Para aprovechar mejor la visita." },
      {
        titulo: "Para seguir el progreso",
        texto: T("Guarda cada informe y compara con el tiempo.", "Guarde cada informe y compare con el tiempo.", "Guardá cada informe y compará con el tiempo."),
      },
    ],
    pasos: {
      titulo: "Para hablar con un profesional",
      items: [
        T(
          "Lleva este informe y pregunta qué rango es saludable para ti, según tu edad y tu historia.",
          "Lleve este informe y pregunte qué rango es saludable para usted, según su edad y su historia.",
          "Llevá este informe y preguntá qué rango es saludable para vos, según tu edad y tu historia.",
        ),
        T(
          "Cuenta cómo comes, cuánto te mueves y cómo duermes: los números solos no dicen todo.",
          "Cuente cómo come, cuánto se mueve y cómo duerme: los números solos no dicen todo.",
          "Contá cómo comés, cuánto te movés y cómo dormís: los números solos no dicen todo.",
        ),
        T(
          "No hagas cambios grandes de dieta o de ejercicio sin consultarlo antes.",
          "No haga cambios grandes de dieta o de ejercicio sin consultarlo antes.",
          "No hagas cambios grandes de dieta o de ejercicio sin consultarlo antes.",
        ),
      ],
    },
    aviso: "Información general. No reemplaza la consulta con un profesional de la salud.",
  },
  "plan-embarazo": {
    nombre: "Informe de fertilidad y embarazo",
    tituloCorto: "informe de fertilidad y embarazo",
    paraQuien: T(
      "Para tener tus fechas estimadas por escrito y llevarlas a tu control",
      "Para tener sus fechas estimadas por escrito y llevarlas a su control",
      "Para tener tus fechas estimadas por escrito y llevarlas a tu control",
    ),
    descripcion: [
      T(
        "Un informe en PDF con tus fechas estimadas y cómo se calcula cada una, con los datos que cargaste.",
        "Un informe en PDF con sus fechas estimadas y cómo se calcula cada una, con los datos que cargó.",
        "Un informe en PDF con tus fechas estimadas y cómo se calcula cada una, con los datos que cargaste.",
      ),
      "Las fechas son estimaciones: cada cuerpo y cada embarazo es distinto. Sirven para organizarse y para conversar con un profesional de la salud, no reemplazan un control.",
    ],
    gancho: T(
      "Ten tus fechas por escrito para tu próximo control",
      "Tenga sus fechas por escrito para su próximo control",
      "Tené tus fechas por escrito para tu próximo control",
    ),
    incluye: [
      { titulo: T("Tus fechas estimadas", "Sus fechas estimadas", "Tus fechas estimadas"), texto: "Con cómo se calcula cada una." },
      { titulo: "Preguntas para el control", texto: "Para aprovechar la consulta." },
      { titulo: T("Para tu archivo", "Para su archivo", "Para tu archivo"), texto: T("Con los datos que usaste.", "Con los datos que usó.", "Con los datos que usaste.") },
    ],
    pasos: {
      titulo: T("Para tu próximo control", "Para su próximo control", "Para tu próximo control"),
      items: [
        T(
          "Lleva este informe y la fecha de tu última menstruación a la consulta.",
          "Lleve este informe y la fecha de su última menstruación a la consulta.",
          "Llevá este informe y la fecha de tu última menstruación a la consulta.",
        ),
        T(
          "Pregunta qué estudios corresponden según la semana y cuándo es el próximo control.",
          "Pregunte qué estudios corresponden según la semana y cuándo es el próximo control.",
          "Preguntá qué estudios corresponden según la semana y cuándo es el próximo control.",
        ),
        T(
          "Ante cualquier síntoma que preocupe, consulta sin esperar a la fecha del informe.",
          "Ante cualquier síntoma que preocupe, consulte sin esperar a la fecha del informe.",
          "Ante cualquier síntoma que preocupe, consultá sin esperar a la fecha del informe.",
        ),
      ],
    },
    aviso: "Información general. Las fechas son estimaciones y no reemplazan el control con un profesional de la salud.",
  },
  "plan-entrenamiento": {
    nombre: "Informe de ritmo de carrera",
    tituloCorto: "informe de ritmo",
    paraQuien: T(
      "Para salir a correr sabiendo tu ritmo objetivo y cómo repartir el esfuerzo",
      "Para salir a correr sabiendo su ritmo objetivo y cómo repartir el esfuerzo",
      "Para salir a correr sabiendo tu ritmo objetivo y cómo repartir el esfuerzo",
    ),
    descripcion: [
      T(
        "Un informe en PDF con tu ritmo, tu tiempo y tu velocidad explicados, con los datos que cargaste.",
        "Un informe en PDF con su ritmo, su tiempo y su velocidad explicados, con los datos que cargó.",
        "Un informe en PDF con tu ritmo, tu tiempo y tu velocidad explicados, con los datos que cargaste.",
      ),
      "Trae todas las tablas del cálculo completas y consejos para usar el ritmo en los entrenamientos.",
    ],
    gancho: T("Ten tu ritmo por escrito para el día de la carrera", "Tenga su ritmo por escrito para el día de la carrera", "Tené tu ritmo por escrito para el día de la carrera"),
    incluye: [
      { titulo: T("Tu ritmo explicado", "Su ritmo explicado", "Tu ritmo explicado"), texto: "Con tiempo y velocidad." },
      { titulo: "Para imprimir y llevar", texto: "En el bolsillo o pegado en la heladera." },
      { titulo: "Consejos para entrenar", texto: "Cómo usar el ritmo sin lastimarse." },
    ],
    pasos: {
      titulo: "Para usar el ritmo",
      items: [
        T(
          "Sal los primeros minutos un poco más lento que el objetivo: el final lo agradece.",
          "Salga los primeros minutos un poco más lento que el objetivo: el final lo agradece.",
          "Salí los primeros minutos un poco más lento que el objetivo: el final lo agradece.",
        ),
        T(
          "Entrena la mayor parte de la semana a un ritmo cómodo, en el que puedas hablar.",
          "Entrene la mayor parte de la semana a un ritmo cómodo, en el que pueda hablar.",
          "Entrená la mayor parte de la semana a un ritmo cómodo, en el que puedas hablar.",
        ),
        T("Si sientes dolor, para y consulta: el ritmo puede esperar.", "Si siente dolor, pare y consulte: el ritmo puede esperar.", "Si sentís dolor, pará y consultá: el ritmo puede esperar."),
      ],
    },
    aviso: "Información general. No reemplaza el consejo de un profesional de la salud o del deporte.",
  },
  "kit-viaje": {
    nombre: "Presupuesto de combustible",
    tituloCorto: "presupuesto de combustible",
    paraQuien: T(
      "Para saber cuánto vas a gastar en combustible y dividirlo entre quienes viajan",
      "Para saber cuánto va a gastar en combustible y dividirlo entre quienes viajan",
      "Para saber cuánto vas a gastar en combustible y dividirlo entre quienes viajan",
    ),
    descripcion: [
      T(
        "Un informe en PDF con el costo del combustible de tu viaje, con tus números: distancia, consumo y precio.",
        "Un informe en PDF con el costo del combustible de su viaje, con sus números: distancia, consumo y precio.",
        "Un informe en PDF con el costo del combustible de tu viaje, con tus números: distancia, consumo y precio.",
      ),
      "Suma una tabla con otros precios del combustible, por si cambia antes de salir, y una lista para presupuestar el resto del viaje.",
    ],
    gancho: T("Ten el costo del viaje por escrito antes de salir", "Tenga el costo del viaje por escrito antes de salir", "Tené el costo del viaje por escrito antes de salir"),
    incluye: [
      { titulo: "El costo del viaje", texto: "Con distancia, consumo y precio." },
      { titulo: "Con otros precios", texto: "Por si el combustible sube antes de salir." },
      { titulo: "Lista para el resto del viaje", texto: "Peajes, estacionamiento y comidas." },
    ],
    pasos: {
      titulo: "Para presupuestar el viaje",
      items: [
        T("Suma peajes, estacionamiento y comidas al costo del combustible.", "Sume peajes, estacionamiento y comidas al costo del combustible.", "Sumá peajes, estacionamiento y comidas al costo del combustible."),
        T(
          "Si viajan varias personas, divide el total y avísalo antes de salir.",
          "Si viajan varias personas, divida el total y avíselo antes de salir.",
          "Si viajan varias personas, dividí el total y avisalo antes de salir.",
        ),
        T(
          "Revisa la presión de los neumáticos: con presión baja el auto gasta más.",
          "Revise la presión de los neumáticos: con presión baja el auto gasta más.",
          "Revisá la presión de los neumáticos: con presión baja el auto gasta más.",
        ),
      ],
    },
    escenarios: { titulo: "Con otros precios", explica: "El mismo viaje con el combustible un poco más barato y más caro." },
  },
  "kit-hogar": {
    nombre: "Informe de consumo eléctrico",
    tituloCorto: "informe de consumo eléctrico",
    paraQuien: T(
      "Para saber cuánto te cuesta cada aparato y dónde se puede ahorrar en la cuenta de luz",
      "Para saber cuánto le cuesta cada aparato y dónde se puede ahorrar en la cuenta de luz",
      "Para saber cuánto te cuesta cada aparato y dónde se puede ahorrar en la cuenta de luz",
    ),
    descripcion: [
      T(
        "Un informe en PDF con el costo de tu aparato, con tus números de uso y el precio de la energía.",
        "Un informe en PDF con el costo de su aparato, con sus números de uso y el precio de la energía.",
        "Un informe en PDF con el costo de tu aparato, con tus números de uso y el precio de la energía.",
      ),
      "Suma una tabla con otros precios de la energía y una lista de ideas para bajar la cuenta.",
    ],
    gancho: T(
      "Descubre cuánto te cuesta este aparato y cómo bajarlo",
      "Descubra cuánto le cuesta este aparato y cómo bajarlo",
      "Descubrí cuánto te cuesta este aparato y cómo bajarlo",
    ),
    incluye: [
      { titulo: T("El costo con tus datos de uso", "El costo con sus datos de uso", "El costo con tus datos de uso"), texto: "Explicado paso a paso." },
      { titulo: "Con otros precios", texto: "Por si sube la tarifa." },
      { titulo: "Ideas para ahorrar", texto: "Las que más se notan en la cuenta." },
    ],
    pasos: {
      titulo: "Para bajar la cuenta",
      items: [
        T(
          "Desenchufa lo que queda en espera: los aparatos apagados también consumen.",
          "Desenchufe lo que queda en espera: los aparatos apagados también consumen.",
          "Desenchufá lo que queda en espera: los aparatos apagados también consumen.",
        ),
        T(
          "Usa los aparatos que más gastan en el horario más barato, si tu tarifa lo tiene.",
          "Use los aparatos que más gastan en el horario más barato, si su tarifa lo tiene.",
          "Usá los aparatos que más gastan en el horario más barato, si tu tarifa lo tiene.",
        ),
        T(
          "Compara este informe con tu factura para ver qué parte del total es este aparato.",
          "Compare este informe con su factura para ver qué parte del total es este aparato.",
          "Compará este informe con tu factura para ver qué parte del total es este aparato.",
        ),
      ],
    },
    escenarios: { titulo: "Con otros precios", explica: "El mismo consumo con la energía un poco más barata y más cara." },
  },
  "kit-obra": {
    nombre: "Lista de materiales para la obra",
    tituloCorto: "lista de materiales",
    paraQuien: "Para ir a comprar materiales con la cantidad justa, sin que falte ni sobre",
    descripcion: [
      T(
        "Un informe en PDF con tu cálculo de materiales: medidas, cantidades y cómo se calcula, listo para llevar a la tienda.",
        "Un informe en PDF con su cálculo de materiales: medidas, cantidades y cómo se calcula, listo para llevar a la tienda.",
        "Un informe en PDF con tu cálculo de materiales: medidas, cantidades y cómo se calcula, listo para llevar a la tienda.",
      ),
      "Trae una lista para comprar bien: el margen por desperdicio, qué preguntar y qué revisar antes de empezar.",
    ],
    gancho: T("Llega a la tienda con la lista de materiales en la mano", "Llegue a la tienda con la lista de materiales en la mano", "Llegá a la tienda con la lista de materiales en la mano"),
    incluye: [
      { titulo: "Medidas y cantidades", texto: T("Todo lo que calculaste, en una hoja.", "Todo lo que calculó, en una hoja.", "Todo lo que calculaste, en una hoja.") },
      { titulo: "Para mostrar en la tienda", texto: T("Así te cotizan lo justo.", "Así le cotizan lo justo.", "Así te cotizan lo justo.") },
      { titulo: "Lista para comprar bien", texto: "Margen por desperdicio y qué revisar." },
    ],
    pasos: {
      titulo: "Antes de comprar",
      items: [
        T(
          "Suma entre un 5 % y un 10 % por cortes y roturas, o más si la forma es irregular.",
          "Sume entre un 5 % y un 10 % por cortes y roturas, o más si la forma es irregular.",
          "Sumá entre un 5 % y un 10 % por cortes y roturas, o más si la forma es irregular.",
        ),
        T(
          "Compra todo del mismo lote: el color y el tono pueden cambiar de un lote a otro.",
          "Compre todo del mismo lote: el color y el tono pueden cambiar de un lote a otro.",
          "Comprá todo del mismo lote: el color y el tono pueden cambiar de un lote a otro.",
        ),
        T(
          "Pide que te confirmen el rendimiento del producto que elijas: cambia entre marcas.",
          "Pida que le confirmen el rendimiento del producto que elija: cambia entre marcas.",
          "Pedí que te confirmen el rendimiento del producto que elijas: cambia entre marcas.",
        ),
        T(
          "Guarda la factura y los sobrantes sin abrir: muchas tiendas los aceptan de vuelta.",
          "Guarde la factura y los sobrantes sin abrir: muchas tiendas los aceptan de vuelta.",
          "Guardá la factura y los sobrantes sin abrir: muchas tiendas los aceptan de vuelta.",
        ),
      ],
    },
  },
  "kit-facturacion": {
    nombre: "Informe de IVA",
    tituloCorto: "informe de IVA",
    paraQuien: T(
      "Para facturar o revisar un precio con el impuesto bien separado, listo para tu archivo o tu contador",
      "Para facturar o revisar un precio con el impuesto bien separado, listo para su archivo o su contador",
      "Para facturar o revisar un precio con el impuesto bien separado, listo para tu archivo o tu contador",
    ),
    descripcion: [
      T(
        "Un informe en PDF con tu cálculo: precio sin impuesto, impuesto y total, con la tasa que se aplica y su fuente.",
        "Un informe en PDF con su cálculo: precio sin impuesto, impuesto y total, con la tasa que se aplica y su fuente.",
        "Un informe en PDF con tu cálculo: precio sin impuesto, impuesto y total, con la tasa que se aplica y su fuente.",
      ),
      "Suma una tabla con otros montos, útil para armar una lista de precios con y sin impuesto.",
    ],
    gancho: T("Ten el precio con y sin impuesto por escrito", "Tenga el precio con y sin impuesto por escrito", "Tené el precio con y sin impuesto por escrito"),
    incluye: [
      { titulo: "El impuesto separado", texto: "Base, impuesto y total, con la tasa vigente." },
      { titulo: "Con otros montos", texto: "Para armar una lista de precios de una vez." },
      { titulo: T("Para tu contador", "Para su contador", "Para tu contador"), texto: "Con la fuente de la tasa y la fecha." },
    ],
    pasos: {
      titulo: "Antes de facturar",
      items: [
        T(
          "Confirma si tu producto o servicio lleva la tasa general o una reducida.",
          "Confirme si su producto o servicio lleva la tasa general o una reducida.",
          "Confirmá si tu producto o servicio lleva la tasa general o una reducida.",
        ),
        T(
          "Revisa que la factura muestre la base y el impuesto por separado, si corresponde.",
          "Revise que la factura muestre la base y el impuesto por separado, si corresponde.",
          "Revisá que la factura muestre la base y el impuesto por separado, si corresponde.",
        ),
        T("Guarda este informe con la factura para tus registros.", "Guarde este informe con la factura para sus registros.", "Guardá este informe con la factura para tus registros."),
      ],
    },
    escenarios: CON_OTROS_MONTOS,
  },
};

export const es: DiccionarioVenta = {
  familias,
  general: { si: "Sí", no: "No" },
  tarjeta: {
    cejaInforme: "Informe en PDF",
    cejaPlanilla: "Planilla de Excel",
    pagoUnico: "pago único",
    comprarInforme: "Quiero mi informe",
    comprarPlanilla: "Quiero mi planilla",
    confianza: T(
      "Pagas con PayPal o con tarjeta. Si no te sirve, te devolvemos el dinero dentro de los 7 días.",
      "Paga con PayPal o con tarjeta. Si no le sirve, le devolvemos el dinero dentro de los 7 días.",
      "Pagás con PayPal o con tarjeta. Si no te sirve, te devolvemos el dinero dentro de los 7 días.",
    ),
    verDetalle: "Ver qué trae",
    tambien: T("También te puede servir:", "También le puede servir:", "También te puede servir:"),
    tablasOficiales: "Tablas oficiales",
    bajadaInforme: T(
      "El informe lo desglosa paso a paso con tus números y la fuente de cada valor, listo para imprimir o guardar en PDF.",
      "El informe lo desglosa paso a paso con sus números y la fuente de cada valor, listo para imprimir o guardar en PDF.",
      "El informe lo desglosa paso a paso con tus números y la fuente de cada valor, listo para imprimir o guardar en PDF.",
    ),
    bajadaPlanilla: T(
      "La planilla lo trae con tus números y las fórmulas a la vista, para que cambies lo que quieras.",
      "La planilla lo trae con sus números y las fórmulas a la vista, para que cambie lo que quiera.",
      "La planilla lo trae con tus números y las fórmulas a la vista, para que cambies lo que quieras.",
    ),
    bajadaPlanillaHoja: T(
      "La planilla lo trae en la hoja «{hoja}» con tus números y las fórmulas a la vista, para que cambies lo que quieras.",
      "La planilla lo trae en la hoja «{hoja}» con sus números y las fórmulas a la vista, para que cambie lo que quiera.",
      "La planilla lo trae en la hoja «{hoja}» con tus números y las fórmulas a la vista, para que cambies lo que quieras.",
    ),
    equivale: "Equivale a unos {monto} al cambio de hoy.",
    cobroDolares: "Se cobra en dólares.",
  },
  aviso: avisoEs,
  planilla: {
    gancho: T("Lleva este cálculo a Excel, con tus datos ya cargados", "Lleve este cálculo a Excel, con sus datos ya cargados", "Llevá este cálculo a Excel, con tus datos ya cargados"),
    incluye: [
      {
        titulo: T("Tus datos ya cargados", "Sus datos ya cargados", "Tus datos ya cargados"),
        texto: T("Cambias una celda amarilla y se recalcula todo.", "Cambia una celda amarilla y se recalcula todo.", "Cambiás una celda amarilla y se recalcula todo."),
      },
      { titulo: "Sueldo, aguinaldo y liquidación", texto: T("En un solo archivo que te sirve todo el año.", "En un solo archivo que le sirve todo el año.", "En un solo archivo que te sirve todo el año.") },
      {
        titulo: "Al día con cada cambio oficial",
        texto: T("El mismo enlace te da la versión nueva, sin pagar de nuevo.", "El mismo enlace le da la versión nueva, sin pagar de nuevo.", "El mismo enlace te da la versión nueva, sin pagar de nuevo."),
      },
    ],
  },
  informe: {
    tusDatos: T("Tus datos", "Sus datos", "Tus datos"),
    resultado: "Resultado",
    corregir: "Corregir mis datos",
    actualizar: "Actualizar el informe",
    imprimir: "Imprimir o guardar en PDF",
    imprimirAyuda: T(
      "En la ventana de impresión elige «Guardar como PDF» para tener el archivo.",
      "En la ventana de impresión elija «Guardar como PDF» para tener el archivo.",
      "En la ventana de impresión elegí «Guardar como PDF» para tener el archivo.",
    ),
    sinResultado: T(
      "Completa tus datos en «Corregir mis datos» para armar el informe.",
      "Complete sus datos en «Corregir mis datos» para armar el informe.",
      "Completá tus datos en «Corregir mis datos» para armar el informe.",
    ),
    lugar: "Lugar y fecha",
    destinatario: "Para",
    firma: "Firma",
    nombre: "Nombre",
    documento: "Documento de identidad",
    etiquetaEnMinuscula: true,
    comoSeCalcula: "Cómo se calcula",
    fuentes: "Fuentes oficiales",
    verificado: "verificado el",
    emitido: "Emitido el",
    valores: "Valores oficiales vigentes al",
    numero: "Informe",
    elegir: T("Elige el cálculo del informe:", "Elija el cálculo del informe:", "Elegí el cálculo del informe:"),
    legal: T(
      "Este informe es una estimación hecha con las normas y los valores oficiales indicados, a la fecha indicada. No reemplaza el asesoramiento de un profesional ni lo que resuelva la autoridad competente. Si un dato tuyo es distinto, el resultado cambia: corrígelo y vuelve a imprimir.",
      "Este informe es una estimación hecha con las normas y los valores oficiales indicados, a la fecha indicada. No reemplaza el asesoramiento de un profesional ni lo que resuelva la autoridad competente. Si un dato suyo es distinto, el resultado cambia: corríjalo y vuelva a imprimir.",
      "Este informe es una estimación hecha con las normas y los valores oficiales indicados, a la fecha indicada. No reemplaza el asesoramiento de un profesional ni lo que resuelva la autoridad competente. Si un dato tuyo es distinto, el resultado cambia: corregilo y volvé a imprimir.",
    ),
    legalSinFuentes: T(
      "Este informe es una estimación hecha con los datos que cargaste, a la fecha indicada. No reemplaza el asesoramiento de un profesional. Si un dato cambia, el resultado también: corrígelo y vuelve a imprimir.",
      "Este informe es una estimación hecha con los datos que cargó, a la fecha indicada. No reemplaza el asesoramiento de un profesional. Si un dato cambia, el resultado también: corríjalo y vuelva a imprimir.",
      "Este informe es una estimación hecha con los datos que cargaste, a la fecha indicada. No reemplaza el asesoramiento de un profesional. Si un dato cambia, el resultado también: corregilo y volvé a imprimir.",
    ),
    errorTitulo: "No pudimos abrir este informe",
    error: T(
      "No logramos confirmar el pago de este enlace. Si el dinero salió de tu cuenta, escríbenos y lo resolvemos. Si la compra no llegó a completarse, puedes hacerla de nuevo.",
      "No logramos confirmar el pago de este enlace. Si el dinero salió de su cuenta, escríbanos y lo resolvemos. Si la compra no llegó a completarse, puede hacerla de nuevo.",
      "No logramos confirmar el pago de este enlace. Si el dinero salió de tu cuenta, escribinos y lo resolvemos. Si la compra no llegó a completarse, podés hacerla de nuevo.",
    ),
    verificar: T(
      "No pudimos verificar el pago ahora. Prueba en unos minutos: no hace falta pagar de nuevo.",
      "No pudimos verificar el pago ahora. Pruebe en unos minutos: no hace falta pagar de nuevo.",
      "No pudimos verificar el pago ahora. Probá en unos minutos: no hace falta pagar de nuevo.",
    ),
    cupo: T(
      "Demasiados intentos seguidos. Espera unos minutos y vuelve a abrir el enlace.",
      "Demasiados intentos seguidos. Espere unos minutos y vuelva a abrir el enlace.",
      "Demasiados intentos seguidos. Esperá unos minutos y volvé a abrir el enlace.",
    ),
  },
  catalogo: {
    tituloProducto: "{nombre} {pais}",
    disparadorInforme: "Cada vez que cambia un valor oficial que usa el cálculo",
    planillaDescripcion: T(
      "Una planilla de Excel lista para usar: cargas tus datos en las celdas amarillas y las cuentas salen solas, con fórmulas que siguen {normas}.",
      "Una planilla de Excel lista para usar: carga sus datos en las celdas amarillas y las cuentas salen solas, con fórmulas que siguen {normas}.",
      "Una planilla de Excel lista para usar: cargás tus datos en las celdas amarillas y las cuentas salen solas, con fórmulas que siguen {normas}.",
    ),
    planillaIncluye: "Incluye {incluye}. Cada hoja muestra el paso a paso, y la hoja de tablas oficiales trae cada valor con su fuente y la fecha en que lo verificamos.",
  },
  planillas: {
    migaPlanillas: "Planillas e informes",
    catalogoTitulo: "Planillas e informes para {pais}",
    catalogoBajada: T(
      "Planillas de Excel e informes en PDF con tus números y los datos oficiales del país. Pagas una vez, sin suscripción.",
      "Planillas de Excel e informes en PDF con sus números y los datos oficiales del país. Paga una vez, sin suscripción.",
      "Planillas de Excel e informes en PDF con tus números y los datos oficiales del país. Pagás una vez, sin suscripción.",
    ),
    seccionPlanillas: "Planillas de Excel",
    seccionInformes: "Informes en PDF",
    catalogoVacio: T(
      "Pronto vas a encontrar aquí planillas para {pais}. Mientras tanto, las calculadoras son gratis.",
      "Pronto va a encontrar aquí planillas para {pais}. Mientras tanto, las calculadoras son gratis.",
      "Pronto vas a encontrar acá planillas para {pais}. Mientras tanto, las calculadoras son gratis.",
    ),
    verCalculadoras: "Ver las calculadoras",
    comprar: "Comprar por {precio}",
    pronto: "Pronto a la venta",
    incluye: "Qué incluye",
    incluyeInforme: [
      T(
        "El informe con tus números, en una página que imprimes o guardas en PDF.",
        "El informe con sus números, en una página que imprime o guarda en PDF.",
        "El informe con tus números, en una página que imprimís o guardás en PDF.",
      ),
      T(
        "Un enlace que no vence: puedes corregir tus datos y volver a imprimirlo cuando quieras.",
        "Un enlace que no vence: puede corregir sus datos y volver a imprimirlo cuando quiera.",
        "Un enlace que no vence: podés corregir tus datos y volver a imprimirlo cuando quieras.",
      ),
      T("Si no te sirve, te devolvemos el dinero dentro de los 7 días.", "Si no le sirve, le devolvemos el dinero dentro de los 7 días.", "Si no te sirve, te devolvemos el dinero dentro de los 7 días."),
    ],
    incluyePlanilla: [
      "El archivo .xlsx, que abre en Excel y en Google Sheets.",
      "Las actualizaciones: {disparador}, la actualizamos y el mismo enlace descarga la versión nueva.",
      T("Si no te sirve, te devolvemos el dinero dentro de los 7 días.", "Si no le sirve, le devolvemos el dinero dentro de los 7 días.", "Si no te sirve, te devolvemos el dinero dentro de los 7 días."),
    ],
    pagoUnico: T(
      "Pago único con PayPal. Puedes pagar con tu cuenta o con tarjeta.",
      "Pago único con PayPal. Puede pagar con su cuenta o con tarjeta.",
      "Pago único con PayPal. Podés pagar con tu cuenta o con tarjeta.",
    ),
    comprarPlanilla: "Comprar la {titulo}",
    comprarBajadaInforme: T(
      "Te mandamos el enlace del informe a este correo apenas se confirma el pago.",
      "Le mandamos el enlace del informe a este correo apenas se confirma el pago.",
      "Te mandamos el enlace del informe a este correo apenas se confirma el pago.",
    ),
    comprarBajadaPlanilla: T(
      "Te mandamos la planilla a este correo apenas se confirma el pago.",
      "Le mandamos la planilla a este correo apenas se confirma el pago.",
      "Te mandamos la planilla a este correo apenas se confirma el pago.",
    ),
    etiquetaEmail: T("Tu correo", "Su correo", "Tu correo"),
    seguirPago: "Seguir al pago",
    privacidad: T(
      "Usamos el correo solo para mandarte tu compra y sus actualizaciones.",
      "Usamos el correo solo para mandarle su compra y sus actualizaciones.",
      "Usamos el correo solo para mandarte tu compra y sus actualizaciones.",
    ),
    datosTitulo: T("Con los números de tu cálculo", "Con los números de su cálculo", "Con los números de tu cálculo"),
    datosUsar: T(
      "Usar estos números en lo que compro. Se guardan solo para armar tu compra.",
      "Usar estos números en lo que compro. Se guardan solo para armar su compra.",
      "Usar estos números en lo que compro. Se guardan solo para armar tu compra.",
    ),
    errores: {
      email: T("Revisa el correo: parece que falta algo.", "Revise el correo: parece que falta algo.", "Revisá el correo: parece que falta algo."),
      error: T(
        "No pudimos iniciar el pago. No se te cobró nada. Prueba de nuevo en unos minutos.",
        "No pudimos iniciar el pago. No se le cobró nada. Pruebe de nuevo en unos minutos.",
        "No pudimos iniciar el pago. No se te cobró nada. Probá de nuevo en unos minutos.",
      ),
      cancelado: T("Cancelaste el pago. No se te cobró nada.", "Canceló el pago. No se le cobró nada.", "Cancelaste el pago. No se te cobró nada."),
      fallido: T(
        "PayPal no aprobó el pago. Puedes probar con otra tarjeta.",
        "PayPal no aprobó el pago. Puede probar con otra tarjeta.",
        "PayPal no aprobó el pago. Podés probar con otra tarjeta.",
      ),
      pronto: "Todavía no está a la venta.",
    },
    graciasTitulo: T("Gracias por tu compra", "Gracias por su compra", "Gracias por tu compra"),
    graciasListoInforme: T(
      "Tu pago está confirmado. Ya puedes abrir tu {titulo}. También te mandamos el enlace por correo, y no vence.",
      "Su pago está confirmado. Ya puede abrir su {titulo}. También le mandamos el enlace por correo, y no vence.",
      "Tu pago está confirmado. Ya podés abrir tu {titulo}. También te mandamos el enlace por correo, y no vence.",
    ),
    graciasListoPlanilla: T(
      "Tu pago está confirmado. Ya puedes descargar la {titulo}. También te la mandamos por correo, con un enlace que no vence.",
      "Su pago está confirmado. Ya puede descargar la {titulo}. También se la mandamos por correo, con un enlace que no vence.",
      "Tu pago está confirmado. Ya podés descargar la {titulo}. También te la mandamos por correo, con un enlace que no vence.",
    ),
    graciasPendiente: T(
      "Estamos esperando la confirmación de PayPal. Cuando llegue, te mandamos tu compra por correo.",
      "Estamos esperando la confirmación de PayPal. Cuando llegue, le mandamos su compra por correo.",
      "Estamos esperando la confirmación de PayPal. Cuando llegue, te mandamos tu compra por correo.",
    ),
    muestraIntro: "Es la hoja «{hoja}» con los datos de ejemplo con los que se abre. Las cuentas son las de hoy, con los valores oficiales vigentes.",
    muestraLeyenda: [T("lo completas tú", "lo completa usted", "lo completás vos"), "lo calcula la planilla"],
    comprobar: T(
      "Compruébalo antes de pagar: la calculadora gratis da los mismos números. Prueba este mismo caso y compara.",
      "Compruébelo antes de pagar: la calculadora gratis da los mismos números. Pruebe este mismo caso y compare.",
      "Comprobalo antes de pagar: la calculadora gratis da los mismos números. Probá este mismo caso y compará.",
    ),
    comprobarEnlace: "Ir a la calculadora gratis",
    faqTitulo: "Preguntas frecuentes",
    faq: {
      sheets: {
        pregunta: "¿Funciona en Google Sheets y en Excel?",
        respuesta: T(
          "Sí. Es un archivo .xlsx: se abre en Excel y en Google Sheets (lo subes a tu Drive y lo abres ahí). Las cuentas son fórmulas comunes, sin macros.",
          "Sí. Es un archivo .xlsx: se abre en Excel y en Google Sheets (lo sube a su Drive y lo abre ahí). Las cuentas son fórmulas comunes, sin macros.",
          "Sí. Es un archivo .xlsx: se abre en Excel y en Google Sheets (lo subís a tu Drive y lo abrís ahí). Las cuentas son fórmulas comunes, sin macros.",
        ),
      },
      recibo: {
        pregunta: "¿Cómo la recibo?",
        respuesta: T(
          "Apenas se confirma el pago te la mandamos por correo, con un enlace de descarga que no vence. También puedes bajarla desde la página que se abre al terminar de pagar.",
          "Apenas se confirma el pago se la mandamos por correo, con un enlace de descarga que no vence. También puede bajarla desde la página que se abre al terminar de pagar.",
          "Apenas se confirma el pago te la mandamos por correo, con un enlace de descarga que no vence. También podés bajarla desde la página que se abre al terminar de pagar.",
        ),
      },
      dolares: {
        pregunta: "¿Se cobra en dólares?",
        respuesta: T(
          "Sí. El precio está en dólares (USD) y el pago es con PayPal, con tu cuenta o con tarjeta.",
          "Sí. El precio está en dólares (USD) y el pago es con PayPal, con su cuenta o con tarjeta.",
          "Sí. El precio está en dólares (USD) y el pago es con PayPal, con tu cuenta o con tarjeta.",
        ),
        conReferencia: T(
          "Arriba te mostramos un equivalente en tu moneda al cambio de hoy, solo como referencia: el monto final depende del cambio que use tu banco o tu tarjeta.",
          "Arriba le mostramos un equivalente en su moneda al cambio de hoy, solo como referencia: el monto final depende del cambio que use su banco o su tarjeta.",
          "Arriba te mostramos un equivalente en tu moneda al cambio de hoy, solo como referencia: el monto final depende del cambio que use tu banco o tu tarjeta.",
        ),
        sinReferencia: T(
          "Si tu tarjeta es de otra moneda, tu banco hace la conversión.",
          "Si su tarjeta es de otra moneda, su banco hace la conversión.",
          "Si tu tarjeta es de otra moneda, tu banco hace la conversión.",
        ),
      },
      devolucion: {
        pregunta: "¿Hay devolución?",
        respuesta: T(
          "Sí. Si la planilla no te sirve, responde el correo de la entrega dentro de los 7 días y te devolvemos el dinero.",
          "Sí. Si la planilla no le sirve, responda el correo de la entrega dentro de los 7 días y le devolvemos el dinero.",
          "Sí. Si la planilla no te sirve, respondé el correo de la entrega dentro de los 7 días y te devolvemos el dinero.",
        ),
      },
      actualiza: { pregunta: "¿Se actualiza cuando cambian los valores oficiales?", respuesta: "Sí. {disparador}, la actualizamos y el mismo enlace descarga la versión nueva." },
    },
    descargar: "Descargar la planilla (.xlsx)",
    abrirInforme: "Abrir mi informe",
    fuentes: "Fuentes oficiales que usa",
    calculadoras: "Sirve para estas calculadoras",
    muestra: "Así se ve",
  },
  correo: {
    asuntoInforme: T("Tu compra en CalcularYa: {titulo}", "Su compra en CalcularYa: {titulo}", "Tu compra en CalcularYa: {titulo}"),
    asuntoPlanilla: "{titulo}: descarga y actualizaciones",
    mismosNumeros: "Los números son los mismos de la {enlace}, con el dato oficial.",
    enlaceCalculadora: "calculadora gratis de CalcularYa",
    comprobante: T("Este es el comprobante de tu compra en {marca}.", "Este es el comprobante de su compra en {marca}.", "Este es el comprobante de tu compra en {marca}."),
    informe: {
      encabezado: T("Ya puedes abrir tu informe", "Ya puede abrir su informe", "Ya podés abrir tu informe"),
      intro: T("Gracias por tu compra: {titulo}. Ábrelo desde aquí:", "Gracias por su compra: {titulo}. Ábralo desde aquí:", "Gracias por tu compra: {titulo}. Abrilo desde acá:"),
      boton: "Abrir mi informe",
      abre: T(
        "Se abre en tu navegador. Desde ahí lo imprimes o lo guardas en PDF.",
        "Se abre en su navegador. Desde ahí lo imprime o lo guarda en PDF.",
        "Se abre en tu navegador. Desde ahí lo imprimís o lo guardás en PDF.",
      ),
      guarda: T("Guarda este correo", "Guarde este correo", "Guardá este correo"),
      vence: T(
        "El enlace es tuyo y no vence. El informe usa los valores oficiales vigentes el día de tu compra, y puedes corregir tus datos y volver a imprimirlo cuando quieras.",
        "El enlace es suyo y no vence. El informe usa los valores oficiales vigentes el día de su compra, y puede corregir sus datos y volver a imprimirlo cuando quiera.",
        "El enlace es tuyo y no vence. El informe usa los valores oficiales vigentes el día de tu compra, y podés corregir tus datos y volver a imprimirlo cuando quieras.",
      ),
      devolucion: T(
        "Si el informe no te sirve, responde este correo dentro de los 7 días y te devolvemos el dinero.",
        "Si el informe no le sirve, responda este correo dentro de los 7 días y le devolvemos el dinero.",
        "Si el informe no te sirve, respondé este correo dentro de los 7 días y te devolvemos el dinero.",
      ),
      ayuda: T(
        "¿Algún problema? Responde este correo o escríbenos a {contacto}.",
        "¿Algún problema? Responda este correo o escríbanos a {contacto}.",
        "¿Algún problema? Respondé este correo o escribinos a {contacto}.",
      ),
    },
    planilla: {
      encabezado: T("Tu planilla está lista", "Su planilla está lista", "Tu planilla está lista"),
      intro: T("Gracias por comprar la {titulo}. Descárgala desde aquí:", "Gracias por comprar la {titulo}. Descárguela desde aquí:", "Gracias por comprar la {titulo}. Descargala desde acá:"),
      boton: "Descargar la planilla (.xlsx)",
      abre: "Abre en Excel y en Google Sheets.",
      guarda: T("Guarda este correo", "Guarde este correo", "Guardá este correo"),
      vence: T(
        "El enlace es tuyo y no vence. {disparador}, actualizamos la planilla y el mismo enlace te da la versión al día. No tienes que pagar de nuevo.",
        "El enlace es suyo y no vence. {disparador}, actualizamos la planilla y el mismo enlace le da la versión al día. No tiene que pagar de nuevo.",
        "El enlace es tuyo y no vence. {disparador}, actualizamos la planilla y el mismo enlace te da la versión al día. No tenés que pagar de nuevo.",
      ),
      devolucion: T(
        "Si la planilla no te sirve, responde este correo dentro de los 7 días y te devolvemos el dinero.",
        "Si la planilla no le sirve, responda este correo dentro de los 7 días y le devolvemos el dinero.",
        "Si la planilla no te sirve, respondé este correo dentro de los 7 días y te devolvemos el dinero.",
      ),
      ayuda: T(
        "¿Algún problema? Responde este correo o escríbenos a {contacto}.",
        "¿Algún problema? Responda este correo o escríbanos a {contacto}.",
        "¿Algún problema? Respondé este correo o escribinos a {contacto}.",
      ),
    },
  },
};
