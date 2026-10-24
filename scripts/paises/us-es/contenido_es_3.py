"""Contenido de us-es, parte 3. Traduce el contenido de us sin agregar afirmaciones."""

CONTENIDO = {
    "child-tax-credit": {
        "h1": "Calculadora del crédito tributario por hijos",
        "title": "Crédito tributario por hijos 2026: {{us.ctc-amount}} por hijo",
        "description": "Calcule su crédito tributario por hijos de 2026: {{us.ctc-amount}} por hijo menor de 17, hasta {{us.actc-max}} reembolsable, y {{us.odc-amount}} por otros dependientes.",
        "intro": [
            "El crédito tributario por hijos baja su impuesto federal por cada hijo menor de 17 años. Si el crédito es mayor que su impuesto, una parte puede volver como reembolso.",
            "Indique sus hijos, sus ingresos y su impuesto para ver cuánto del crédito recibe.",
        ],
        "como": [
            "Empiece con {{us.ctc-amount}} por cada hijo que califica y {{us.odc-amount}} por cada otro dependiente.",
            "Si su MAGI pasa de {{us.ctc-threshold[other]}} ({{us.ctc-threshold[mfj]}} en una declaración conjunta), el crédito baja {{us.ctc-phaseout-rate}} del exceso, redondeado hacia arriba a los siguientes $1,000.",
            "El crédito primero reduce su impuesto sobre el ingreso. Lo que sobra se puede reembolsar como crédito tributario adicional por hijos, hasta {{us.actc-max}} por hijo.",
            "La parte reembolsable no puede ser mayor que el {{us.actc-rate}} de su ingreso del trabajo por encima de {{us.actc-earned-income-floor}}.",
        ],
        "ejemplo": ["Un matrimonio con dos hijos, $80,000 de ingresos y $3,000 de impuesto antes de créditos recibe los $4,400 completos. $3,000 eliminan su impuesto y $1,400 vuelven en su reembolso."],
        "faq": [
            ("¿De cuánto es el crédito tributario por hijos en 2026?", "{{us.ctc-amount}} por hijo que califica menor de 17 años. Hasta {{us.actc-max}} por hijo es reembolsable si su impuesto es demasiado bajo para usarlo todo."),
            ("¿Quién cuenta como hijo que califica?", "Un hijo, hija, hijastro, hijo de crianza, hermano o un descendiente de alguno de ellos, menor de 17 años al final del año, que vivió con usted más de la mitad del año y no aportó más de la mitad de su propio sustento."),
            ("¿Recibo el crédito si no debo impuestos?", "En parte. Necesita al menos {{us.actc-earned-income-floor}} de ingreso del trabajo, y el reembolso se limita al {{us.actc-rate}} de lo que gane por encima de eso, hasta {{us.actc-max}} por hijo."),
        ],
        "glosario": [
            ("Crédito no reembolsable", "Un crédito que puede bajar su impuesto a cero pero no más."),
            ("Crédito tributario adicional por hijos (ACTC)", "La parte reembolsable del crédito tributario por hijos."),
            ("Crédito por otros dependientes", "Un crédito no reembolsable más chico para dependientes que no califican para el crédito por hijos."),
        ],
    },
    "quarterly-estimated-taxes": {
        "h1": "Calculadora de impuestos estimados trimestrales",
        "title": "Impuestos estimados trimestrales 2026 (Formulario 1040-ES)",
        "description": "Calcule sus pagos de impuesto estimado de 2026 con las reglas de puerto seguro del IRS: {{us.safe-harbor-current}} del impuesto de este año o {{us.safe-harbor-prior}} a {{us.safe-harbor-prior-high}} del año pasado.",
        "intro": [
            "Si trabaja por cuenta propia o tiene ingresos sin retención, el IRS espera que pague impuestos durante el año en cuatro cuotas.",
            "Indique el impuesto que espera este año, su retención y su declaración del año pasado para ver los pagos más bajos que evitan la multa por pago insuficiente.",
        ],
        "como": [
            "Necesita hacer pagos estimados si espera deber al menos {{us.estimated-tax-min}} después de la retención y los créditos.",
            "Para estar seguro, su retención más los pagos deben cubrir lo menor entre el {{us.safe-harbor-current}} del impuesto de este año y el {{us.safe-harbor-prior}} del impuesto del año pasado.",
            "Si el AGI del año pasado pasó de {{us.safe-harbor-agi[other]}} ({{us.safe-harbor-agi[mfs]}} si es casado y declara por separado), use el {{us.safe-harbor-prior-high}} del impuesto del año pasado.",
            "Reste su retención y divida el resto en cuatro pagos iguales.",
        ],
        "ejemplo": ["Espera $20,000 de impuesto, le retienen $5,000 y el impuesto del año pasado fue de $16,000. Pagar $16,000 en total es suficiente, así que envía $11,000 en cuatro pagos de $2,750."],
        "faq": [
            ("¿Cuándo vencen los impuestos estimados?", "Para 2026: el 15 de abril, el 15 de junio y el 15 de septiembre de 2026, y el 15 de enero de 2027. Puede saltarse el pago de enero si presenta su declaración de 2026 y paga el saldo antes del 1 de febrero de 2027."),
            ("¿Qué pasa si pago muy poco?", "El IRS cobra una multa sobre cada pago insuficiente por los días que queda sin pagar. Las instrucciones del Formulario 2210 explican cómo se calcula y cuándo se puede eximir."),
            ("¿Puedo aumentar mi retención en su lugar?", "Sí. Si también tiene un empleo, el impuesto retenido de sus cheques cuenta para el monto seguro. El Estimador de Retención de Impuestos del IRS le ayuda a llenar el Formulario W-4 correcto."),
        ],
        "glosario": [
            ("Puerto seguro (safe harbor)", "Un nivel de pago que lo protege de la multa por pago insuficiente aunque deba más al declarar."),
            ("Formulario 1040-ES", "El formulario del IRS con la hoja de cálculo y los comprobantes para los pagos de impuesto estimado."),
        ],
    },
    "inflation-calculator": {
        "h1": "Calculadora de inflación",
        "title": "Calculadora de inflación: valor del dólar con el CPI",
        "description": "Vea cuánto vale hoy un monto de cualquier mes desde 1997 con el CPI-U oficial de la Oficina de Estadísticas Laborales (BLS). Inflación acumulada y anual.",
        "intro": [
            "Los precios suben con el tiempo, así que un dólar compra menos cada año. Indique un monto y dos meses para ver cuánto dinero necesitaría hoy para comprar lo mismo.",
            "La calculadora usa el Índice de Precios al Consumidor para Todos los Consumidores Urbanos (CPI-U), la medida de inflación que la BLS publica cada mes. El último valor es {{us.cpi-u}}.",
        ],
        "como": [
            "Busque el CPI-U del primer mes y del segundo mes.",
            "Divida el índice posterior entre el anterior. Eso es cuánto subieron los precios.",
            "Multiplique su monto por ese factor. La tasa anual promedio reparte el cambio en partes iguales entre los años del período.",
        ],
        "ejemplo": ["$100 de enero de 2020 valen unos $123.14 en dólares de enero de 2025. Los precios subieron 23.1%, un promedio de alrededor de 4.25% al año."],
        "faq": [
            ("¿Qué CPI usa?", "El CPI-U del promedio de ciudades de EE. UU., todos los artículos, sin ajuste estacional (serie CUUR0000SA0). Es el índice que más se usa para ajustar montos por inflación."),
            ("¿Por qué no puedo elegir octubre de 2025?", "La Oficina de Estadísticas Laborales no recopiló ni publicó datos del CPI de octubre de 2025 por el cierre del gobierno federal."),
            ("¿Qué tan actualizados están los datos?", "La BLS publica el CPI de cada mes alrededor de la mitad del mes siguiente. Si elige un mes posterior, se usa el índice más reciente."),
        ],
        "glosario": [
            ("CPI-U", "Índice de Precios al Consumidor para Todos los Consumidores Urbanos. Sigue los precios que pagan por bienes y servicios las personas que viven en ciudades y pueblos."),
            ("Inflación acumulada", "La suba total de los precios entre dos fechas."),
        ],
    },
    "sales-tax": {
        "h1": "Calculadora del impuesto sobre las ventas",
        "title": "Calculadora de sales tax: sumar o quitar el impuesto",
        "description": "Sume el impuesto sobre las ventas a un precio o quítelo de un total con su tasa combinada estatal y local. Sirve para cualquier estado, condado o ciudad.",
        "intro": [
            "En Estados Unidos no hay un impuesto nacional sobre las ventas. Cada estado fija su propia tasa, y los condados, las ciudades y los distritos especiales pueden sumar más.",
            "Indique el precio y su tasa combinada para ver el impuesto y el total, o calcule hacia atrás desde un recibo.",
        ],
        "como": [
            "Para sumar el impuesto, multiplique el precio por la tasa y sume el resultado al precio.",
            "Para quitar el impuesto de un total, divida el total entre uno más la tasa. La diferencia es el impuesto.",
            "El impuesto se redondea al centavo, como lo hacen la mayoría de las cajas registradoras.",
        ],
        "ejemplo": ["Un artículo de $49.99 con una tasa combinada de 8.25% tiene $4.12 de impuesto, en total $54.11."],
        "faq": [
            ("¿Qué estados no tienen impuesto sobre las ventas?", "Alaska, Delaware, Montana, New Hampshire y Oregon no tienen impuesto estatal sobre las ventas. Algunos gobiernos locales de esos estados, sobre todo en Alaska, cobran el suyo."),
            ("¿Dónde encuentro mi tasa exacta?", "El departamento de impuestos de su estado publica la tasa estatal y casi siempre un buscador por dirección para las tasas locales. Su recibo también muestra la tasa cobrada."),
            ("¿Se cobra impuesto en las compras por internet?", "En la mayoría de los estados, sí. Los grandes vendedores en línea cobran el impuesto según la dirección donde se entrega el pedido."),
        ],
        "glosario": [
            ("Tasa combinada", "La tasa del estado más todas las tasas locales que se aplican donde ocurre la venta."),
            ("Impuesto sobre el uso (use tax)", "Un impuesto que debe a su estado por compras en las que no se cobró impuesto sobre las ventas."),
        ],
    },
    "mileage-reimbursement": {
        "h1": "Calculadora de millaje del IRS",
        "title": "Calculadora de millaje 2026: tarifa del IRS por milla",
        "description": "Convierta millas en dólares con las tarifas estándar del IRS para 2026: {{us.mileage-business}} por milla de negocios hoy, más las tarifas médica y de caridad.",
        "intro": [
            "El IRS fija tarifas estándar por milla que los empleadores usan para reembolsar el manejo y que los trabajadores por cuenta propia usan para deducirlo.",
            "En 2026 el IRS subió las tarifas de negocios y médica desde el 1 de julio por los precios del combustible, así que la fecha de sus viajes importa.",
        ],
        "como": [
            "Elija el motivo y la fecha de los viajes para obtener la tarifa correcta.",
            "Cada milla de negocios vale hoy {{us.mileage-business}}. Las millas médicas y de mudanza militar valen {{us.mileage-medical}}. Las millas de caridad valen {{us.mileage-charity}}, una tarifa fijada por ley.",
            "Multiplique las millas por la tarifa.",
        ],
        "ejemplo": ["1,000 millas de negocios manejadas en marzo de 2026 valen $725. Las mismas millas en agosto de 2026 valen $760."],
        "faq": [
            ("¿Cuál es la tarifa de millaje del IRS para 2026?", "Desde el {{us.mileage-business#desde}} es de {{us.mileage-business}} por milla de negocios y {{us.mileage-medical}} por milla médica o de mudanza. Las dos tarifas eran más bajas en la primera mitad del año. La de caridad sigue en {{us.mileage-charity}}."),
            ("¿Mi empleador tiene que pagar la tarifa del IRS?", "La ley federal no lo exige. Muchos empleadores la usan igual porque los reembolsos hasta esa tarifa bajo un plan responsable no pagan impuestos. Algunos estados tienen sus propias reglas de reembolso."),
            ("¿Puedo deducir las millas de ida y vuelta al trabajo?", "No. Manejar entre su casa y su lugar de trabajo habitual es traslado personal, no viaje de negocios."),
        ],
        "glosario": [
            ("Tarifa estándar por milla", "Un monto fijo por milla que cubre gasolina, desgaste, seguro y depreciación."),
            ("Plan responsable (accountable plan)", "Un plan de reembolso del empleador que exige documentar las millas y devolver lo que sobre."),
        ],
    },
    "senior-deduction": {
        "h1": "Calculadora de la deducción para mayores de 65",
        "title": "Deducción para mayores de 65: la nueva de {{us.senior-deduction}}",
        "description": "Calcule la deducción adicional para mayores, {{us.senior-deduction}} por persona de 65 años o más de 2025 a 2028, con la reducción por ingresos y el impuesto que ahorra.",
        "intro": [
            "Las personas de 65 años o más pueden tomar una deducción extra de hasta {{us.senior-deduction}} cada una en su declaración federal de 2025 a 2028.",
            "Indique sus ingresos y cuántas personas de la declaración califican para ver su deducción y el impuesto que ahorra.",
        ],
        "como": [
            "Cada persona elegible empieza con {{us.senior-deduction}}.",
            "Si su MAGI pasa de {{us.senior-deduction-threshold[other]}} ({{us.senior-deduction-threshold[mfj]}} en una declaración conjunta), el monto de cada persona baja {{us.senior-deduction-phaseout-rate}} del exceso.",
            "Los matrimonios en que ambos tienen 65 años o más la reciben dos veces. Los casados que declaran por separado no pueden tomarla.",
        ],
        "ejemplo": ["Una persona soltera de 70 años con $100,000 de MAGI está $25,000 sobre el umbral. La deducción baja $1,500 hasta $4,500, lo que ahorra $990 en el tramo de 22%."],
        "faq": [
            ("¿Es lo mismo que la deducción estándar adicional por 65 años?", "No. Es una deducción aparte en el Anexo 1-A, encima de la deducción estándar adicional, y la recibe aunque detalle deducciones."),
            ("¿Quién califica para 2026?", "Cualquier persona nacida antes del 2 de enero de 1962 con un número de Seguro Social válido. Si está casado, tiene que presentar una declaración conjunta."),
            ("¿Hace que el Seguro Social quede libre de impuestos?", "No directamente. Baja su ingreso tributable, lo que puede compensar el impuesto sobre parte de sus beneficios, pero las reglas para gravar los beneficios del Seguro Social no cambiaron."),
        ],
        "glosario": [
            ("Deducción adicional para mayores", "Una deducción temporal para personas de 65 años o más, que se reclama en el Anexo 1-A."),
            ("Reducción gradual (phase-out)", "La forma en que una deducción se achica a medida que los ingresos pasan de cierto monto."),
        ],
    },
    "standard-deduction": {
        "h1": "Calculadora de la deducción estándar",
        "title": "Deducción estándar 2026: calculadora por estado civil",
        "description": "Vea su deducción estándar de 2026: {{us.standard-deduction[single]}} soltero, {{us.standard-deduction[mfj]}} casado en conjunto, {{us.standard-deduction[hoh]}} cabeza de familia, más el extra por 65 años y ceguera.",
        "intro": [
            "La deducción estándar es la parte de su ingreso sobre la que no paga impuesto federal si no detalla deducciones.",
            "Elija su estado civil y las casillas por edad y ceguera para ver la suya de 2026 y compararla con sus deducciones detalladas.",
        ],
        "como": [
            "El monto básico es de {{us.standard-deduction[single]}} para solteros y casados que declaran por separado, {{us.standard-deduction[mfj]}} para matrimonios con declaración conjunta y {{us.standard-deduction[hoh]}} para cabezas de familia.",
            "Cada persona de 65 años o más suma {{us.additional-standard-deduction[married]}} si es casada o {{us.additional-standard-deduction[unmarried]}} si no lo es. Ser ciego suma otra vez el mismo monto.",
            "Si sus deducciones detalladas son mayores, detallarlas baja más su impuesto.",
        ],
        "ejemplo": ["Un matrimonio con declaración conjunta, ambos mayores de 65 y uno de ellos ciego, recibe $32,200 más tres montos extra de $1,650, en total $37,150."],
        "faq": [
            ("¿Cuándo conviene detallar las deducciones?", "Cuando los intereses hipotecarios, los impuestos estatales y locales, las donaciones y los gastos médicos altos suman más que su deducción estándar."),
            ("¿Cuándo se me considera de 65 años?", "El IRS lo considera de 65 años el día antes de su cumpleaños 65. Para 2026, eso incluye a cualquier persona nacida antes del 2 de enero de 1962."),
            ("¿La nueva deducción para mayores es parte de la deducción estándar?", "No. La deducción adicional para mayores es aparte y se reclama en el Anexo 1-A, así que se suma a los montos que se muestran aquí."),
        ],
        "glosario": [
            ("Deducciones detalladas", "Gastos específicos que se anotan en el Anexo A en lugar de tomar la deducción estándar."),
            ("Estado civil para la declaración", "Soltero, casado con declaración conjunta, casado con declaración por separado, cabeza de familia o cónyuge sobreviviente que califica."),
        ],
    },
}
