"""Contenido de us-es, parte 1. Traduce el contenido de us sin agregar afirmaciones."""

CONTENIDO = {
    "federal-income-tax": {
        "h1": "Calculadora de impuestos federales",
        "title": "Calculadora de impuestos federales 2026: tramos y reembolso",
        "description": "Calcule su impuesto federal sobre el ingreso de 2026 con los tramos del IRS, la deducción estándar de {{us.standard-deduction[single]}} y la nueva deducción para mayores.",
        "intro": [
            "Indique su estado civil para la declaración y su ingreso bruto ajustado para ver su impuesto federal de 2026, su tramo más alto y su tasa efectiva.",
            "Si agrega lo que le retuvieron de sus cheques, también verá un estimado de su reembolso o de lo que todavía debe.",
        ],
        "como": [
            "Su deducción es la deducción estándar de su estado civil o sus deducciones detalladas, la que sea mayor. Cada casilla por 65 años o ceguera suma {{us.additional-standard-deduction[married]}} para casados y {{us.additional-standard-deduction[unmarried]}} para solteros y cabezas de familia.",
            "Cada persona de 65 años o más recibe además la deducción para mayores de {{us.senior-deduction}}. Se reduce en {{us.senior-deduction-phaseout-rate}} de sus ingresos sobre {{us.senior-deduction-threshold[other]}} ({{us.senior-deduction-threshold[mfj]}} en una declaración conjunta).",
            "El ingreso tributable es su AGI menos esas deducciones. Cada tasa del tramo se aplica solo a la parte del ingreso que cae dentro de ese tramo: 10%, 12%, 22%, 24%, 32%, 35% y 37%.",
            "La tasa efectiva divide el impuesto entre su AGI. El reembolso compara el impuesto con lo que ya le retuvieron.",
        ],
        "ejemplo": ["Una persona soltera con $75,000 de AGI toma la deducción estándar de {{us.standard-deduction[single]}} y tiene $58,900 de ingreso tributable. El impuesto es $7,670: 10% sobre los primeros $12,400, 12% hasta $50,400 y 22% sobre los $8,500 restantes. La tasa efectiva es de alrededor de 10.2%."],
        "faq": [
            ("¿Cuál es la deducción estándar de 2026?", "{{us.standard-deduction[single]}} para solteros y casados que declaran por separado, {{us.standard-deduction[mfj]}} para matrimonios con declaración conjunta y {{us.standard-deduction[hoh]}} para cabezas de familia."),
            ("¿Si paso a un tramo más alto, todo mi ingreso paga esa tasa?", "No. Solo los dólares por encima del inicio de un tramo pagan la tasa de ese tramo. Un aumento nunca reduce su pago neto por culpa de los tramos federales."),
            ("¿Quién puede tomar la deducción para mayores?", "Las personas de 65 años o más al final del año con un número de Seguro Social válido. Es de {{us.senior-deduction}} por persona, se aplica tanto si detalla deducciones como si no, y los casados deben presentar una declaración conjunta para tomarla."),
            ("¿Por qué mi reembolso real es distinto?", "Los créditos, como el crédito tributario por hijos, otros ingresos y los impuestos estatales cambian el resultado final. Esta calculadora muestra el impuesto federal antes de créditos: úsela como punto de partida para su declaración."),
        ],
        "glosario": [
            ("Ingreso bruto ajustado (AGI)", "Su ingreso total menos ajustes como los aportes al 401(k) tradicional y a la HSA."),
            ("Ingreso tributable", "El AGI menos la deducción estándar o detallada y otras deducciones, como la deducción para mayores."),
            ("Tasa marginal", "La tasa que se aplica a su último dólar de ingreso tributable."),
        ],
    },
    "take-home-pay": {
        "h1": "Calculadora de cheque de pago neto",
        "title": "Calculadora de cheque de pago neto 2026: sueldo después de impuestos",
        "description": "Vea su cheque de pago después del impuesto federal, el Seguro Social y Medicare de 2026, con 401(k) y beneficios de salud antes de impuestos. Semanal, quincenal o mensual.",
        "intro": [
            "Indique su salario y cada cuánto le pagan para ver lo que llega a su cuenta después de los impuestos federales.",
            "El resultado usa los tramos de 2026, la deducción estándar de su estado civil y la base salarial actual del Seguro Social de {{us.social-security-wage-base}}.",
        ],
        "como": [
            "Primero se descuentan las primas de salud antes de impuestos. Reducen tanto el impuesto sobre el ingreso como el FICA.",
            "Después se descuenta su aporte al 401(k) tradicional, hasta el límite anual de {{us.401k-limit}}. Reduce el impuesto sobre el ingreso pero no el FICA.",
            "El impuesto federal se calcula sobre el salario anual que queda después de esos descuentos y de la deducción estándar de {{us.standard-deduction[single]}} para solteros o {{us.standard-deduction[mfj]}} para matrimonios con declaración conjunta.",
            "El Seguro Social toma {{us.social-security-rate}} de los salarios hasta {{us.social-security-wage-base}}. Medicare toma {{us.medicare-rate}} de todo el salario, más {{us.additional-medicare-rate}} sobre {{us.additional-medicare-threshold[single]}} para solteros ({{us.additional-medicare-threshold[mfj]}} en una declaración conjunta).",
            "Cada monto anual se divide entre la cantidad de cheques.",
        ],
        "ejemplo": ["Una persona soltera que gana $60,000 al año, cobra cada dos semanas y ahorra 5% en un 401(k) recibe unos $1,836.54 por cheque. Cada cheque lleva $179.23 de impuesto federal, $143.08 de Seguro Social y $33.46 de Medicare."],
        "faq": [
            ("¿Por qué mi cheque real es un poco distinto?", "Los empleadores retienen con el método de porcentaje del IRS de la Publicación 15-T y su Formulario W-4, que reparte el impuesto en todo el año. Esta calculadora muestra su impuesto federal anual dividido entre sus cheques, así que los dos números quedan cerca."),
            ("¿Incluye los impuestos estatales?", "No. Los impuestos estatales y locales sobre el ingreso dependen de dónde vive y trabaja. Nueve estados no cobran impuesto sobre los salarios y otros cobran varios puntos más."),
            ("¿Cuándo deja de cobrarse el Seguro Social?", "Cuando sus salarios del año pasan de {{us.social-security-wage-base}}, ya no se descuenta Seguro Social. El impuesto de Medicare no tiene tope."),
            ("¿Un Roth 401(k) baja mis impuestos?", "No. Los aportes Roth se descuentan después de impuestos. En el campo del 401(k) ponga solo aportes tradicionales (antes de impuestos)."),
        ],
        "glosario": [
            ("FICA", "Los impuestos del Seguro Social y Medicare que se descuentan de cada cheque."),
            ("Pago bruto", "Su pago antes de cualquier impuesto o descuento."),
            ("Descuento antes de impuestos", "Dinero que se toma de su pago antes de calcular los impuestos, como los aportes al 401(k) tradicional."),
        ],
    },
    "fica-tax": {
        "h1": "Calculadora del impuesto FICA",
        "title": "Calculadora FICA 2026: Seguro Social y Medicare",
        "description": "Calcule el impuesto del Seguro Social y de Medicare sobre sus salarios de 2026, el impuesto adicional de Medicare y lo que paga su empleador. Base salarial de {{us.social-security-wage-base}}.",
        "intro": [
            "El FICA es el impuesto de nómina que financia el Seguro Social y Medicare. Usted paga la mitad y su empleador paga la otra mitad.",
            "Indique sus salarios del año para ver cada parte y el costo total sobre su pago.",
        ],
        "como": [
            "Seguro Social: {{us.social-security-rate}} de los salarios hasta {{us.social-security-wage-base}} para usted y lo mismo para su empleador.",
            "Medicare: {{us.medicare-rate}} de todo el salario para usted y lo mismo para su empleador.",
            "Además, usted paga el impuesto adicional de Medicare de {{us.additional-medicare-rate}} sobre los salarios por encima de {{us.additional-medicare-threshold[single]}} si es soltero, {{us.additional-medicare-threshold[mfj]}} en una declaración conjunta o {{us.additional-medicare-threshold[mfs]}} si declara por separado. El empleador no lo iguala.",
        ],
        "ejemplo": ["Sobre $75,000 de salario usted paga $4,650 de Seguro Social y $1,087.50 de Medicare, en total $5,737.50. Su empleador paga otra vez el mismo monto."],
        "faq": [
            ("¿Cuál es la tasa del FICA en 2026?", "7.65% para usted y 7.65% para su empleador: {{us.social-security-rate}} para el Seguro Social y {{us.medicare-rate}} para Medicare."),
            ("¿Los aportes al 401(k) bajan el FICA?", "No. Los aportes al 401(k) tradicional bajan el impuesto sobre el ingreso pero igual pagan FICA. Las primas de salud pagadas por un plan cafetería sí bajan el FICA."),
            ("Tuve dos empleos y pagué demasiado Seguro Social. ¿Lo puedo recuperar?", "Sí. Si dos o más empleadores juntos retuvieron Seguro Social sobre más de {{us.social-security-wage-base}}, el exceso se reclama como crédito en su declaración federal."),
        ],
        "glosario": [
            ("Base salarial", "El máximo de salarios que paga impuesto del Seguro Social en un año. Medicare no tiene límite."),
            ("Impuesto adicional de Medicare", "Un impuesto extra del empleado sobre salarios altos que financia Medicare."),
        ],
    },
    "self-employment-tax": {
        "h1": "Calculadora del impuesto sobre el trabajo por cuenta propia",
        "title": "Impuesto sobre el trabajo por cuenta propia 2026 (Anexo SE)",
        "description": "Calcule su impuesto de 2026 sobre el trabajo por cuenta propia para el Seguro Social y Medicare, la deducción de la mitad y lo que debe apartar cada trimestre. Para trabajadores 1099.",
        "intro": [
            "Si trabaja como independiente, maneja para una app o tiene un negocio propio, usted paga las dos mitades del Seguro Social y de Medicare. Ese es el impuesto sobre el trabajo por cuenta propia.",
            "Indique su ganancia neta para ver el impuesto, la deducción que recibe por la mitad y un monto trimestral para apartar.",
        ],
        "como": [
            "Solo se grava el {{us.se-earnings-factor}} de su ganancia neta. Si ese monto es menor que {{us.se-minimum}}, no debe nada.",
            "El Seguro Social toma dos veces {{us.social-security-rate}} sobre el ingreso neto hasta {{us.social-security-wage-base}}, menos los salarios W-2 que ya ganó este año.",
            "Medicare toma dos veces {{us.medicare-rate}} sobre todo el ingreso neto. Por encima de {{us.additional-medicare-threshold[single]}} ({{us.additional-medicare-threshold[mfj]}} en una declaración conjunta) se aplica también el impuesto adicional de Medicare de {{us.additional-medicare-rate}}.",
            "La mitad del impuesto se deduce de su ingreso para el impuesto sobre el ingreso.",
        ],
        "ejemplo": ["Con $50,000 de ganancia se gravan $46,175. El impuesto es de $7,064.78 y usted deduce $3,532.39 al calcular su impuesto sobre el ingreso."],
        "faq": [
            ("¿Cuál es la tasa del impuesto sobre el trabajo por cuenta propia?", "15.3% del ingreso neto: 12.4% para el Seguro Social hasta la base salarial y 2.9% para Medicare sin límite."),
            ("¿Por qué solo se grava una parte de mi ganancia?", "Al FICA de un empleado no se le cobra la mitad del empleador. El factor de {{us.se-earnings-factor}} le da a usted el mismo beneficio."),
            ("¿Tengo que pagarlo cada trimestre?", "Por lo general sí. Si no tiene retención de un cheque que lo cubra, el IRS espera pagos estimados en abril, junio, septiembre y enero. Nuestra calculadora de impuestos estimados trimestrales muestra el monto seguro."),
        ],
        "glosario": [
            ("Ingreso neto del trabajo por cuenta propia", "Su ganancia neta multiplicada por {{us.se-earnings-factor}}."),
            ("Anexo SE (Schedule SE)", "El formulario del IRS donde se calcula este impuesto. Se presenta con el Formulario 1040."),
        ],
    },
    "bonus-tax": {
        "h1": "Calculadora de impuestos sobre un bono",
        "title": "Impuestos sobre un bono 2026: cuánto le queda",
        "description": "Vea cuánto de su bono le queda después de la retención federal de {{us.supplemental-rate}}, el Seguro Social y Medicare. Con las reglas del IRS para salarios suplementarios de 2026.",
        "intro": [
            "Los bonos parecen pagar más impuestos porque los empleadores suelen retener un {{us.supplemental-rate}} fijo de impuesto federal, más el Seguro Social y Medicare.",
            "Indique su bono para ver cada parte y lo que llega a su cuenta.",
        ],
        "como": [
            "Impuesto federal: {{us.supplemental-rate}} del bono. Cuando su pago suplementario del año pasa de {{us.supplemental-threshold}}, la parte que excede se retiene al {{us.supplemental-rate-over-1m}}.",
            "Seguro Social: {{us.social-security-rate}} del bono, pero solo hasta que sus salarios del año llegan a {{us.social-security-wage-base}}.",
            "Medicare: {{us.medicare-rate}} del bono, más {{us.additional-medicare-rate}} sobre la parte de sus salarios anuales por encima de {{us.additional-medicare-withholding}}.",
        ],
        "ejemplo": ["Sobre un bono de $5,000, $1,100 van al impuesto federal, $310 al Seguro Social y $72.50 a Medicare. Le quedan $3,517.50 antes del impuesto estatal."],
        "faq": [
            ("¿Los bonos pagan más impuestos que el sueldo normal?", "No. El método de retención es distinto, pero al declarar un bono es simplemente más salario. Si el {{us.supplemental-rate}} es más que su tasa real, la diferencia vuelve en su reembolso."),
            ("¿Mi empleador puede usar otro método?", "Sí. Si el bono se paga junto con el sueldo normal, el empleador puede sumar los dos y retener como si fuera un solo cheque más grande. Eso muchas veces retiene más."),
            ("¿Puedo poner mi bono en mi 401(k) para ahorrar impuestos?", "Muchas veces sí, si su plan permite aportes desde bonos. El dinero que va a un 401(k) tradicional no tiene retención de impuesto federal, pero igual paga Seguro Social y Medicare."),
        ],
        "glosario": [
            ("Salarios suplementarios", "Pagos fuera de su salario normal, como bonos, comisiones e indemnizaciones."),
            ("Método de tasa fija", "Retener un porcentaje fijo de los salarios suplementarios en lugar de usar las tablas de impuestos."),
        ],
    },
    "employer-payroll-tax": {
        "h1": "Calculadora de impuestos de nómina para empleadores",
        "title": "Impuestos de nómina del empleador 2026: costo de un empleado",
        "description": "Calcule cuánto cuesta de verdad un empleado en 2026: salario más el Seguro Social, Medicare, FUTA e impuesto estatal de desempleo del empleador. Para dueños de pequeños negocios.",
        "intro": [
            "Contratar a alguien cuesta más que el salario. Como empleador usted paga su parte del Seguro Social y de Medicare, más los impuestos federal y estatal de desempleo.",
            "Indique el salario anual para ver cada impuesto y el costo total por empleado.",
        ],
        "como": [
            "Seguro Social: {{us.social-security-rate}} de los salarios hasta {{us.social-security-wage-base}}.",
            "Medicare: {{us.medicare-rate}} de todo el salario. A diferencia de los empleados, los empleadores nunca pagan el impuesto adicional de Medicare.",
            "FUTA: {{us.futa-rate}} de los primeros {{us.futa-wage-base}} del salario de cada empleado, menos un crédito de hasta {{us.futa-credit}} por pagar el impuesto estatal de desempleo. La mayoría de los empleadores paga un neto de 0.6%.",
            "SUTA: la tasa que le asigna su estado, sobre los salarios hasta la base salarial de su estado.",
        ],
        "ejemplo": ["Un empleado con $50,000 al año cuesta $53,867: $3,100 de Seguro Social, $725 de Medicare y $42 de FUTA, antes del impuesto estatal de desempleo."],
        "faq": [
            ("¿Cuánto cuesta un empleado además del salario?", "Los impuestos federales de nómina suman alrededor de 7.7% en la mayoría de los salarios. El impuesto estatal de desempleo, los beneficios y la compensación laboral suelen subir el total."),
            ("¿Cuál es mi tasa de SUTA?", "Cada estado la fija todos los años según su industria y cuántos exempleados pidieron beneficios de desempleo. Los empleadores nuevos reciben una tasa inicial estándar del estado."),
            ("¿Pago estos impuestos por contratistas?", "No. Los contratistas independientes que reciben un 1099 pagan su propio impuesto sobre el trabajo por cuenta propia. Clasifique bien a sus trabajadores: el IRS y el Departamento de Trabajo miran cómo se controla el trabajo, no el título del contrato."),
        ],
        "glosario": [
            ("FUTA", "El impuesto de la Ley Federal de Impuestos de Desempleo, que pagan solo los empleadores."),
            ("SUTA", "Impuesto estatal de desempleo. La tasa y la base salarial cambian según el estado y el empleador."),
        ],
    },
    "minimum-wage": {
        "h1": "Salario mínimo por estado",
        "title": "Salario mínimo por estado 2026: por hora, semana y año",
        "description": "Consulte el salario mínimo de 2026 en su estado y cuánto suma por semana, mes y año. El mínimo federal es de {{us.min-wage-federal}} por hora. Tasas oficiales.",
        "intro": [
            "Elija su estado para ver su salario mínimo, el mínimo federal y el que su empleador le tiene que pagar.",
            "Indique sus horas por semana para convertir la tarifa por hora en pago semanal, mensual y anual.",
        ],
        "como": [
            "El salario mínimo federal es de {{us.min-wage-federal}} por hora para los empleos cubiertos por la Ley de Normas Justas de Trabajo (FLSA).",
            "Cuando un estado fija una tasa más alta, los trabajadores reciben la más alta. En California es de {{us.min-wage-state[california]}}, en la ciudad de Nueva York {{us.min-wage-state[new-york-city-area]}} y en Florida {{us.min-wage-state[florida]}}.",
            "El pago semanal es la tarifa por hora por sus horas. Un año cuenta 52 semanas y un mes es la doceava parte.",
        ],
        "ejemplo": ["En California, una persona a tiempo completo que gana el mínimo recibe $676 por semana, unos $2,929 al mes o $35,152 al año."],
        "faq": [
            ("¿Cuál es el salario mínimo federal en 2026?", "{{us.min-wage-federal}} por hora. No cambia desde el 24 de julio de 2009."),
            ("¿Qué estados pagan solo el mínimo federal?", "Estados como Texas, Pennsylvania, Carolina del Norte e Indiana usan {{us.min-wage-federal}}. Alabama, Louisiana, Mississippi, Carolina del Sur y Tennessee no tienen ley de salario mínimo estatal, así que se aplica la tasa federal a los empleos cubiertos."),
            ("Mi ciudad paga más que el estado. ¿Cuál vale?", "El más alto. Ciudades y condados como Seattle, Denver y muchos de California fijan su propio salario mínimo por encima del estatal."),
            ("¿Cuándo cambian los salarios mínimos?", "La mayoría de los estados los suben el 1 de enero. Algunos, como Oregon y el Distrito de Columbia, los ajustan el 1 de julio, y el aumento de Florida llegó el 30 de septiembre."),
        ],
        "glosario": [
            ("Ley de Normas Justas de Trabajo (FLSA)", "La ley federal que fija el salario mínimo y las reglas de horas extras para la mayoría de los empleos."),
            ("Salario mínimo con propinas", "Un salario en efectivo más bajo que algunos estados permiten para quienes reciben propinas, siempre que las propinas los lleven al mínimo completo."),
        ],
    },
    "overtime": {
        "h1": "Calculadora de horas extras",
        "title": "Calculadora de horas extras: pago a tiempo y medio",
        "description": "Calcule su pago de horas extras según la ley federal: tiempo y medio por cada hora sobre {{us.overtime-hours}} en la semana laboral. Vea el pago regular, las horas extras y el total.",
        "intro": [
            "Según la Ley de Normas Justas de Trabajo, la mayoría de los trabajadores por hora gana al menos una vez y media su tarifa normal por las horas sobre {{us.overtime-hours}} en una semana laboral.",
            "Indique su tarifa por hora y las horas que trabajó para ver su pago de la semana.",
        ],
        "como": [
            "Las horas regulares son las primeras {{us.overtime-hours}} de la semana laboral, pagadas a su tarifa normal.",
            "Cada hora después de esas se paga a su tarifa por {{us.overtime-multiplier}}.",
            "La prima es la mitad adicional que gana en cada hora extra. Es la parte cubierta por la deducción federal de horas extras que califican.",
        ],
        "ejemplo": ["A $20 la hora y con 45 horas, gana $800 por las primeras 40 horas y $150 por 5 horas extras a $30. La semana paga $950."],
        "faq": [
            ("¿Las horas extras se cuentan por día o por semana?", "La ley federal cuenta por semana laboral, un período fijo de 168 horas. Algunos estados pagan también horas extras después de 8 horas en un día."),
            ("¿Quién no recibe horas extras?", "Los empleados exentos, sobre todo gerentes, administrativos y profesionales asalariados que cumplen las pruebas de salario y funciones del Departamento de Trabajo. Algunos empleos, como ciertos trabajos agrícolas y de transporte, siguen reglas especiales."),
            ("¿Los bonos cambian mi tarifa de horas extras?", "Muchas veces sí. Los bonos no discrecionales, como los de producción o asistencia, se suman a la tarifa normal antes de calcular las horas extras."),
            ("¿Las horas extras pagan impuestos?", "Sí, se retienen como el pago normal. De 2025 a 2028 puede deducir la parte de la prima en su declaración federal, hasta un tope anual."),
        ],
        "glosario": [
            ("Semana laboral", "Siete días seguidos de 24 horas que fija su empleador. Las horas extras se cuentan dentro de cada semana laboral."),
            ("Tarifa normal", "Su pago por hora más ciertos bonos y diferenciales de turno, que se usa para calcular la tarifa de horas extras."),
        ],
    },
}
