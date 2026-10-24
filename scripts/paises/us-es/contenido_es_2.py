"""Contenido de us-es, parte 2. Traduce el contenido de us sin agregar afirmaciones."""

CONTENIDO = {
    "no-tax-on-overtime": {
        "h1": "Calculadora de horas extras sin impuestos",
        "title": "Horas extras sin impuestos: su deducción y ahorro",
        "description": "Calcule su deducción federal por horas extras que califican, hasta {{us.overtime-deduction-max[other]}} o {{us.overtime-deduction-max[mfj]}} en una declaración conjunta, y el impuesto que ahorra.",
        "intro": [
            "De 2025 a 2028 puede deducir de su ingreso tributable federal el pago extra que gana por horas extras, la mitad adicional del tiempo y medio.",
            "Indique su pago de horas extras y sus ingresos para ver cuánto puede deducir y más o menos cuánto impuesto ahorra.",
        ],
        "como": [
            "Solo cuenta la prima. A tiempo y medio, es un tercio de su pago total de horas extras.",
            "La deducción tiene un tope de {{us.overtime-deduction-max[other]}} al año, o {{us.overtime-deduction-max[mfj]}} para matrimonios con declaración conjunta.",
            "Si su MAGI pasa de {{us.tips-overtime-threshold[other]}} ({{us.tips-overtime-threshold[mfj]}} en una declaración conjunta), el tope baja {{us.tips-overtime-phaseout-step}} por cada $1,000 completos de exceso.",
            "El impuesto ahorrado es la diferencia entre el impuesto sobre su ingreso tributable con y sin la deducción.",
        ],
        "ejemplo": ["Una persona soltera con $15,000 de pago por horas extras tiene una prima de $5,000. Con $63,900 de ingreso tributable en el tramo de 22%, deducirla le ahorra $1,100 de impuesto federal."],
        "faq": [
            ("¿Todo mi pago de horas extras queda libre de impuestos?", "No. Solo se puede deducir la prima sobre su tarifa normal, y solo baja el impuesto sobre el ingreso. El Seguro Social, Medicare y los impuestos estatales se siguen pagando."),
            ("¿Dónde encuentro mis horas extras que califican?", "Para 2026, los empleadores las informan en el Formulario W-2, casilla 12, con el código TT. Los contratistas independientes pueden verlas en el Formulario 1099."),
            ("¿Tengo que detallar deducciones para tomarla?", "No. Se reclama en el Anexo 1-A (Schedule 1-A) y funciona también con la deducción estándar."),
            ("¿Cuentan las horas extras de un contrato sindical?", "Solo la parte que exige la Ley de Normas Justas de Trabajo. Las horas extras adicionales que suma un contrato o una ley estatal, como las diarias o el pago doble, no califican."),
        ],
        "glosario": [
            ("Compensación por horas extras que califica", "El pago sobre su tarifa normal que exige la ley federal por las horas sobre 40 en una semana laboral."),
            ("MAGI", "Ingreso bruto ajustado modificado. Para la mayoría de las personas es igual al AGI."),
        ],
    },
    "no-tax-on-tips": {
        "h1": "Calculadora de propinas sin impuestos",
        "title": "Propinas sin impuestos: deducción de hasta {{us.tips-deduction-max}}",
        "description": "Calcule su deducción federal por propinas que califican, hasta {{us.tips-deduction-max}} al año de 2025 a 2028, y cuánto impuesto sobre el ingreso le ahorra.",
        "intro": [
            "Meseros, bartenders, estilistas y otros trabajadores que reciben propinas pueden deducir las propinas declaradas de su ingreso tributable federal, hasta {{us.tips-deduction-max}} al año.",
            "Indique sus propinas y sus ingresos para ver su deducción y un estimado del impuesto que ahorra.",
        ],
        "como": [
            "La deducción son sus propinas que califican, hasta {{us.tips-deduction-max}}. El tope es el mismo para declaraciones individuales y conjuntas.",
            "Si su MAGI pasa de {{us.tips-overtime-threshold[other]}} ({{us.tips-overtime-threshold[mfj]}} en una declaración conjunta), el tope baja {{us.tips-overtime-phaseout-step}} por cada $1,000 completos de exceso.",
            "El impuesto ahorrado es la diferencia entre el impuesto sobre su ingreso tributable con y sin la deducción.",
        ],
        "ejemplo": ["Un mesero con $12,000 de propinas y $28,900 de ingreso tributable las deduce todas y ahorra $1,440 de impuesto federal."],
        "faq": [
            ("¿Qué propinas califican?", "Las propinas en efectivo y con tarjeta que los clientes dan voluntariamente, en un trabajo que el IRS considera de propinas habituales. Los cargos por servicio obligatorios no cuentan. Las propinas deben estar declaradas en un W-2, un 1099 o el Formulario 4137."),
            ("¿Igual pago Seguro Social y Medicare sobre las propinas?", "Sí. La deducción solo baja el impuesto federal sobre el ingreso. Los impuestos de nómina y la mayoría de los impuestos estatales se siguen pagando."),
            ("¿Pueden tomarla los casados que declaran por separado?", "No. Si está casado, debe presentar una declaración conjunta, y quien ganó las propinas necesita un número de Seguro Social válido."),
        ],
        "glosario": [
            ("Propinas que califican", "Propinas voluntarias recibidas en una ocupación de propinas habituales y declaradas correctamente."),
            ("Anexo 1-A (Schedule 1-A)", "El formulario del IRS donde se reclaman las deducciones por propinas, horas extras, intereses de préstamos de auto y para mayores."),
        ],
    },
    "capital-gains-tax": {
        "h1": "Calculadora del impuesto sobre ganancias de capital",
        "title": "Impuesto sobre ganancias de capital 2026: 0%, 15% y 20%",
        "description": "Calcule el impuesto federal por vender acciones, fondos o propiedades en 2026: tasas de largo plazo de 0%, 15% y 20%, ganancias a corto plazo y el impuesto de inversión de 3.8%.",
        "intro": [
            "Cuando vende una inversión por más de lo que pagó, la ganancia es una ganancia de capital. Cómo se grava depende de cuánto tiempo la tuvo y del resto de sus ingresos.",
            "Indique la ganancia, sus otros ingresos tributables y su estado civil para ver el impuesto federal.",
        ],
        "como": [
            "Los bienes que tuvo más de un año pagan tasas de largo plazo. La ganancia se suma encima de sus otros ingresos tributables.",
            "La parte que cabe por debajo de {{us.cg-zero-max[single]}} de ingreso tributable total ({{us.cg-zero-max[mfj]}} en una declaración conjunta, {{us.cg-zero-max[hoh]}} para cabezas de familia) paga 0%.",
            "La parte hasta {{us.cg-15-max[single]}} ({{us.cg-15-max[mfj]}} en conjunto, {{us.cg-15-max[hoh]}} para cabezas de familia, {{us.cg-15-max[mfs]}} por separado) paga 15%. El resto paga 20%.",
            "Las ganancias a corto plazo pagan sus tasas normales: la calculadora compara el impuesto sobre sus ingresos con y sin la ganancia.",
            "Si su AGI modificado pasa de {{us.niit-threshold[single]}} ({{us.niit-threshold[mfj]}} en conjunto), el impuesto sobre ingresos netos de inversión suma {{us.niit-rate}} sobre la ganancia o sobre el exceso de ingresos, lo que sea menor.",
        ],
        "ejemplo": ["Una persona soltera con $40,000 de otros ingresos tributables vende acciones que tuvo tres años con una ganancia de $20,000. $9,450 caen en la franja de 0% y $10,550 pagan 15%. El impuesto es de $1,582.50."],
        "faq": [
            ("¿Cuáles son las tasas del impuesto sobre ganancias de capital en 2026?", "0%, 15% o 20% para las ganancias a largo plazo, según su ingreso tributable. Las ganancias a corto plazo pagan sus tasas normales, de 10% a 37%."),
            ("¿Pago impuesto sobre ganancias de capital al vender mi casa?", "Muchas veces no. Si fue dueño de la casa y vivió en ella dos de los últimos cinco años, se excluyen hasta $250,000 de ganancia, o $500,000 para matrimonios con declaración conjunta. Solo se grava lo que pase de eso."),
            ("¿Las pérdidas pueden bajar mi impuesto?", "Sí. Las pérdidas de capital compensan primero las ganancias. Si las pérdidas son mayores, hasta $3,000 al año ($1,500 si es casado y declara por separado) compensan otros ingresos y el resto pasa a años siguientes."),
        ],
        "glosario": [
            ("Base de costo", "Lo que pagó por una inversión, más comisiones y mejoras. Su ganancia es el precio de venta menos esto."),
            ("Período de tenencia", "Cuánto tiempo fue dueño del bien. Más de un año hace que la ganancia sea a largo plazo."),
        ],
    },
    "401k-contribution": {
        "h1": "Calculadora de aportes al 401(k)",
        "title": "Calculadora 401(k) 2026: límites y aporte del empleador",
        "description": "Vea cuánto entra a su 401(k) en 2026, el aporte equivalente de su empleador y el límite de {{us.401k-limit}}, con el catch-up desde los 50 y el mayor de 60 a 63 años.",
        "intro": [
            "Indique su salario, el porcentaje que ahorra y el aporte equivalente de su empleador para ver lo que entra a su 401(k) este año.",
            "La calculadora aplica el límite del IRS para su edad y le dice qué porcentaje lo llevaría al máximo.",
        ],
        "como": [
            "El límite de 2026 para sus propios aportes es de {{us.401k-limit}}.",
            "A los 50 años o más puede sumar un catch-up de {{us.401k-catch-up}}. Si cumple 60, 61, 62 o 63 este año, el catch-up es de {{us.401k-catch-up-60-63}}.",
            "Su aporte es su salario por su porcentaje, con ese límite como tope.",
            "El aporte del empleador es su tasa de equivalencia aplicada a su aporte, pero solo sobre la parte hasta el porcentaje del salario que iguala.",
        ],
        "ejemplo": ["Con un salario de $75,000, ahorrar 6% pone $4,500 en su 401(k). Con un aporte equivalente de 50% hasta el 6% del sueldo, su empleador suma $2,250, en total $6,750 al año."],
        "faq": [
            ("¿Cuál es el límite del 401(k) para 2026?", "{{us.401k-limit}} para los aportes del empleado, más {{us.401k-catch-up}} si tiene 50 años o más, o {{us.401k-catch-up-60-63}} si tiene de 60 a 63."),
            ("¿El aporte del empleador cuenta para mi límite?", "No. El aporte del empleador tiene su propio límite combinado, mucho más alto. Solo sus propios aportes antes de impuestos y Roth cuentan para el límite del empleado."),
            ("¿Conviene aportar al menos lo necesario para recibir todo el aporte del empleador?", "Para la mayoría de las personas, sí. Ese aporte es parte de su pago, y aportar menos que el porcentaje que se iguala deja ese dinero sin cobrar."),
            ("¿Los aportes catch-up tienen que ser Roth?", "Desde 2026, si sus salarios del Seguro Social con ese empleador pasaron el umbral del IRS el año anterior, sus aportes catch-up deben ir a la parte Roth del plan."),
        ],
        "glosario": [
            ("Aporte electivo", "La parte de su pago que usted elige poner en el plan, antes de impuestos o Roth."),
            ("Aporte catch-up", "Un monto extra que las personas de 50 años o más pueden aportar por encima del límite normal."),
            ("Vesting (consolidación)", "Cuándo el aporte del empleador pasa a ser totalmente suyo. Sus propios aportes siempre son suyos."),
        ],
    },
    "roth-ira-contribution": {
        "h1": "Calculadora de aportes a una Roth IRA",
        "title": "Calculadora de límite de Roth IRA 2026",
        "description": "Vea cuánto puede poner en una Roth IRA en 2026 según sus ingresos y su estado civil. Límite de {{us.ira-limit}}, catch-up a los 50 y la hoja de reducción del IRS.",
        "intro": [
            "El límite de la Roth IRA baja a medida que suben sus ingresos y desaparece por encima de cierto nivel. Indique su AGI modificado y su estado civil para ver su límite personal de 2026.",
        ],
        "como": [
            "El límite base es de {{us.ira-limit}}, más {{us.ira-catch-up}} si tiene 50 años o más, pero nunca más que su compensación tributable.",
            "Los solteros y cabezas de familia tienen el límite completo hasta {{us.roth-phaseout-start[single]}} de MAGI y nada desde {{us.roth-phaseout-end[single]}}. En una declaración conjunta el rango va de {{us.roth-phaseout-start[mfj]}} a {{us.roth-phaseout-end[mfj]}}.",
            "Dentro del rango, el límite baja en proporción a cuánto avanzó en el rango. El resultado se redondea hacia arriba a los siguientes $10, y cualquier valor entre cero y {{us.roth-minimum}} pasa a ser {{us.roth-minimum}}.",
        ],
        "ejemplo": ["Una persona soltera de 35 años con $160,000 de MAGI está $7,000 dentro del rango de reducción de $15,000. El límite baja 46.7%, de $7,500 a $4,000."],
        "faq": [
            ("¿Cuál es el límite de la Roth IRA para 2026?", "{{us.ira-limit}}, más un catch-up de {{us.ira-catch-up}} si tiene 50 años o más. El mismo límite se comparte con cualquier IRA tradicional."),
            ("¿Y si mis ingresos son demasiado altos?", "Todavía puede hacer un aporte no deducible a una IRA tradicional. Muchas personas luego lo convierten a una Roth IRA, una estrategia conocida como backdoor Roth. Si tiene otro dinero antes de impuestos en IRA, consulte antes a un profesional de impuestos."),
            ("¿Hasta cuándo puedo aportar para 2026?", "Hasta la fecha límite para declarar en abril de 2027, sin contar prórrogas."),
        ],
        "glosario": [
            ("Roth IRA", "Una cuenta de jubilación que se financia con dinero después de impuestos. Los retiros que califican en la jubilación están libres de impuestos."),
            ("AGI modificado", "Su AGI con algunas partidas sumadas de nuevo y sin los ingresos de conversiones a Roth."),
        ],
    },
    "hsa-contribution": {
        "h1": "Calculadora de aportes a la HSA",
        "title": "Calculadora de límite de HSA 2026",
        "description": "Vea su límite de 2026 en la cuenta de ahorros para la salud: {{us.hsa-self-only}} con cobertura individual, {{us.hsa-family}} familiar, más el catch-up a los 55. Prorrateado por mes.",
        "intro": [
            "Una cuenta de ahorros para la salud (HSA) le permite apartar dinero antes de impuestos para gastos médicos si tiene un plan de salud con deducible alto.",
            "Indique su cobertura, su edad y los meses en que fue elegible para ver cuánto puede aportar todavía este año.",
        ],
        "como": [
            "El límite de 2026 es de {{us.hsa-self-only}} con cobertura individual y {{us.hsa-family}} con cobertura familiar.",
            "Si tiene 55 años o más al final del año, puede sumar {{us.hsa-catch-up}}.",
            "Si no fue elegible todo el año, el límite se prorratea por los meses en que tenía cobertura HDHP el primer día del mes.",
            "Los aportes del empleador cuentan para el mismo límite, así que se restan de lo que usted puede aportar.",
        ],
        "ejemplo": ["Con cobertura familiar todo el año, 56 años y $1,000 de su empleador, su límite es de $9,750 y puede aportar $8,750 más."],
        "faq": [
            ("¿Cuáles son los límites de la HSA para 2026?", "{{us.hsa-self-only}} con cobertura individual y {{us.hsa-family}} con cobertura familiar. Las personas de 55 años o más pueden sumar {{us.hsa-catch-up}}."),
            ("¿Mi cónyuge y yo podemos hacer los dos aportes catch-up?", "Sí, si ambos tienen 55 años o más, pero cada catch-up tiene que ir a la cuenta del cónyuge que califica."),
            ("¿Puedo seguir aportando cuando me inscribo en Medicare?", "No. Desde el primer mes en que está inscrito en Medicare ya no puede aportar, aunque puede seguir usando el dinero de la cuenta."),
        ],
        "glosario": [
            ("HDHP", "Un plan de salud con deducible alto que cumple las reglas del IRS sobre deducible mínimo y gastos máximos de bolsillo."),
            ("Regla del último mes", "Si es elegible el 1 de diciembre, se le trata como elegible todo el año, con un período de prueba posterior."),
        ],
    },
    "rmd-calculator": {
        "h1": "Calculadora de distribución mínima requerida (RMD)",
        "title": "Calculadora RMD 2026: distribución mínima requerida",
        "description": "Calcule la distribución mínima requerida de su IRA o 401(k) con la Tabla Uniforme de Vida del IRS. Las RMD empiezan a los {{us.rmd-age}} años.",
        "intro": [
            "Cuando llega a los {{us.rmd-age}} años, el IRS le exige retirar cada año un monto mínimo de sus IRA tradicionales y planes de jubilación del trabajo.",
            "Indique su edad y el saldo al cierre del año pasado para ver la RMD de este año.",
        ],
        "como": [
            "Tome el saldo de la cuenta al 31 de diciembre del año pasado.",
            "Busque el período de distribución para la edad que cumple este año en la Tabla Uniforme de Vida. A los 73 es {{us.rmd-uniform-table[73]}}, a los 80 es {{us.rmd-uniform-table[80]}} y a los 90 es {{us.rmd-uniform-table[90]}}.",
            "Divida el saldo entre ese número. El resultado es lo mínimo que debe retirar antes del 31 de diciembre.",
        ],
        "ejemplo": ["A los 75 años con $500,000 en una IRA, el período de distribución es 24.6, así que la RMD es de $20,325.20, alrededor de 4.1% del saldo."],
        "faq": [
            ("¿Cuándo tengo que hacer mi primera RMD?", "En el año en que cumple {{us.rmd-age}}. Puede retrasar esa primera hasta el 1 de abril del año siguiente, pero entonces hace dos RMD en ese año."),
            ("¿Qué pasa si no hago una RMD?", "Debe un impuesto de 25% sobre el monto que no retiró, que baja a 10% si lo corrige a tiempo. Presente el Formulario 5329 para declararlo o pedir una exención."),
            ("¿Las Roth IRA tienen RMD?", "No mientras viva el dueño original. Los herederos de una Roth IRA sí tienen reglas de distribución."),
            ("Tengo varias IRA. ¿Hago una RMD de cada una?", "Calcula una RMD para cada IRA, las suma y puede retirar el total de una o más de sus IRA. Los planes del trabajo siguen sus propias reglas, así que consulte cada plan."),
        ],
        "glosario": [
            ("Período de distribución", "El número de la tabla del IRS entre el que divide su saldo."),
            ("Tabla Uniforme de Vida", "La Tabla III de la Publicación 590-B del IRS, que usan la mayoría de los dueños de IRA."),
        ],
    },
    "social-security-benefits": {
        "h1": "Calculadora de beneficios del Seguro Social",
        "title": "Beneficios del Seguro Social: cobrar a los 62, 67 o 70",
        "description": "Calcule su beneficio mensual de jubilación del Seguro Social a partir de sus ganancias mensuales indexadas promedio y vea cómo cambia si cobra antes o después.",
        "intro": [
            "Su cheque del Seguro Social depende de sus ganancias de toda la vida y de la edad en que empieza a cobrar. Empezar antes lo reduce de por vida, y esperar hasta los 70 lo aumenta.",
            "Indique sus ganancias mensuales indexadas promedio (AIME) y la edad a la que piensa cobrar para estimar su beneficio mensual.",
        ],
        "como": [
            "Su monto de seguro primario (PIA) es el 90% de la primera parte de su AIME, el 32% de la parte del medio y el 15% del resto. Para quienes cumplen 62 en 2026, las partes se cortan en $1,286 y $7,749.",
            "Si nació en 1960 o después, su plena edad de jubilación es 67. A esa edad recibe el 100% de su PIA.",
            "Cada mes que cobra antes reduce el beneficio en 5/9 de 1% durante los primeros 36 meses y en 5/12 de 1% después. A los 62 la reducción es de 30%.",
            "Cada mes que espera después de los 67 suma 2/3 de 1%, o 8% al año, hasta los 70.",
        ],
        "ejemplo": ["Con un AIME de $5,000, el PIA es de $2,345.80. Cobrar a los 62 paga unos $1,642 al mes, a los 67 unos $2,345 y a los 70 unos $2,908."],
        "faq": [
            ("¿Cómo encuentro mi AIME?", "Entre a su cuenta my Social Security en ssa.gov para ver su historial de ganancias y los estimados de beneficios. El AIME son sus 35 años de mayores ganancias, ajustados por el crecimiento salarial, divididos entre 420."),
            ("¿Conviene cobrar a los 62 o esperar?", "Esperar paga más por mes de por vida. Cobrar antes puede tener sentido si necesita el ingreso o no espera una jubilación larga. Un cónyuge que puede cobrar beneficios de sobreviviente también gana cuando espera quien ganaba más."),
            ("¿Por qué es distinto de mi estado de cuenta de la SSA?", "Su estado de cuenta proyecta sus ganancias futuras y usa su propio año de elegibilidad. Esta calculadora usa el AIME que usted indica y la fórmula de 2026, sin aumentos por costo de vida."),
        ],
        "glosario": [
            ("AIME", "Ganancias mensuales indexadas promedio: la base que usa el Seguro Social para calcular su beneficio."),
            ("PIA", "Monto de seguro primario: su beneficio mensual si empieza a cobrar a la plena edad de jubilación."),
            ("Plena edad de jubilación", "La edad en que recibe su beneficio completo. Es 67 para quienes nacieron en 1960 o después."),
        ],
    },
}
