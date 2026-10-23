"""Textos de las calculadoras de us en español de Estados Unidos (us-es). W-2, IRS, 401(k), FICA y demás siglas
oficiales se mantienen; los nombres de formularios y programas van como los usa el IRS en su versión en español."""

EDICION = "us-es"
IMPORTS_COMUNES = {"COMUN"}

ESTADO = {"e": "Estado civil para la declaración", "o": "ESTADO_CIVIL"}
MAGI = "Ingreso bruto ajustado modificado (MAGI)"
GRAVABLE = {"e": "Ingreso tributable antes de esta deducción", "a": "Opcional. Sirve para estimar cuánto impuesto se ahorra."}
AHORRO = "Impuesto federal sobre el ingreso que se ahorra (estimado)"

TEXTOS = {
    "federal-income-tax": {
        "slug": "calculadora-impuestos-federales",
        "importa": ["ESTADO_CIVIL"],
        "campos": {
            "estado": ESTADO,
            "ingreso": {"e": "Ingreso bruto ajustado (AGI)", "a": "Todos los ingresos tributables del año menos los aportes al 401(k) antes de impuestos y otros ajustes."},
            "itemizadas": {"e": "Deducciones detalladas", "a": "Déjelo en blanco para usar la deducción estándar. Si escribe un monto, se usa la mayor de las dos."},
            "mayores": "Personas en la declaración de 65 años o más",
            "ciegos": "Personas en la declaración que son ciegas",
            "retenido": {"e": "Impuesto federal retenido este año", "a": "Casilla 2 de sus formularios W-2 más los pagos estimados que haya hecho."},
        },
        "filas": {
            "deduccion": "Deducción aplicada",
            "tipoDeduccion": "Tipo de deducción",
            "senior": "Deducción para mayores de 65",
            "gravable": "Ingreso tributable",
            "impuesto": "Impuesto federal sobre el ingreso",
            "marginal": "Tasa marginal (su tramo más alto)",
            "efectiva": "Tasa efectiva sobre su AGI",
            "reembolso": "Reembolso estimado",
            "aPagar": "Monto estimado a pagar",
        },
    },
    "take-home-pay": {
        "slug": "calculadora-cheque-de-pago-neto",
        "importa": ["ESTADO_CIVIL"],
        "campos": {
            "sueldo": "Salario anual antes de impuestos",
            "frecuencia": {
                "e": "Cada cuánto le pagan",
                "o": {"weekly": "Semanal (52 cheques)", "biweekly": "Cada dos semanas (26 cheques)", "semimonthly": "Dos veces al mes (24 cheques)", "monthly": "Mensual (12 cheques)"},
            },
            "estado": ESTADO,
            "aporte": "Aporte al 401(k) tradicional (% del salario)",
            "salud": {"e": "Seguro médico y FSA antes de impuestos, por año", "a": "Primas y cuentas de gastos flexibles pagadas por un plan cafetería. Reducen el impuesto sobre el ingreso y el FICA."},
        },
        "filas": {
            "bruto": "Pago bruto por cheque",
            "k401": "Aporte al 401(k)",
            "salud": "Beneficios de salud antes de impuestos",
            "federal": "Impuesto federal sobre el ingreso",
            "socialSecurity": "Impuesto del Seguro Social",
            "medicare": "Impuesto de Medicare",
            "neto": "Pago neto por cheque",
            "netoAnual": "Pago neto por año",
            "impuestosAnuales": "Impuestos federales por año",
        },
    },
    "fica-tax": {
        "slug": "calculadora-impuesto-fica",
        "importa": ["ESTADO_CIVIL"],
        "campos": {
            "salarios": {"e": "Salarios del año", "a": "Pago bruto menos los beneficios de salud antes de impuestos. Los aportes al 401(k) sí cuentan."},
            "estado": ESTADO,
        },
        "filas": {
            "socialSecurity": "Impuesto del Seguro Social que usted paga",
            "medicare": "Impuesto de Medicare que usted paga",
            "adicional": "Impuesto adicional de Medicare",
            "empleado": "Su FICA total",
            "efectiva": "Porcentaje de sus salarios",
            "ssEmpleador": "Seguro Social que paga su empleador",
            "medicareEmpleador": "Medicare que paga su empleador",
            "empleador": "FICA total del empleador",
            "total": "FICA total sobre sus salarios",
        },
    },
    "self-employment-tax": {
        "slug": "calculadora-impuesto-trabajo-por-cuenta-propia",
        "importa": ["ESTADO_CIVIL"],
        "campos": {
            "ganancia": {"e": "Ganancia neta del trabajo por cuenta propia", "a": "Ingresos menos gastos del negocio, como en el Anexo C (Schedule C)."},
            "salarios": {"e": "Salarios W-2 de un empleo, si los tiene", "a": "Los salarios que ya pagaron Seguro Social usan parte de la base salarial."},
            "estado": ESTADO,
        },
        "filas": {
            "neto": "Ingreso neto sujeto al impuesto",
            "socialSecurity": "Parte del Seguro Social",
            "medicare": "Parte de Medicare",
            "impuesto": "Impuesto sobre el trabajo por cuenta propia",
            "adicional": "Impuesto adicional de Medicare",
            "deduccion": "Deducción de la mitad del impuesto",
            "trimestral": "Para apartar cada trimestre",
        },
    },
    "bonus-tax": {
        "slug": "calculadora-impuestos-sobre-bono",
        "campos": {
            "bono": "Monto del bono",
            "salariosPrevios": {"e": "Salarios que ya le pagaron este año", "a": "Se usan para el tope del Seguro Social y el impuesto adicional de Medicare."},
            "suplementariosPrevios": {"e": "Bonos y comisiones ya pagados este año", "a": "Solo importa si su pago suplementario del año pasa de 1 millón de dólares."},
        },
        "filas": {
            "federal": "Impuesto federal retenido",
            "socialSecurity": "Impuesto del Seguro Social",
            "medicare": "Impuesto de Medicare",
            "neto": "Bono después de la retención federal",
            "porcentajeNeto": "Parte del bono que le queda",
        },
    },
    "employer-payroll-tax": {
        "slug": "calculadora-impuestos-de-nomina-empleador",
        "campos": {
            "salario": "Salario anual por empleado",
            "empleados": "Cantidad de empleados con ese salario",
            "sutaTasa": {"e": "Tasa de desempleo estatal (SUTA)", "a": "Figura en el aviso de tasa de la agencia laboral de su estado."},
            "sutaBase": {"e": "Base salarial del SUTA en su estado", "a": "Déjelo en blanco para aplicar la tasa a todo el salario."},
        },
        "filas": {
            "socialSecurity": "Seguro Social del empleador",
            "medicare": "Medicare del empleador",
            "futa": "Impuesto federal de desempleo (FUTA)",
            "suta": "Impuesto estatal de desempleo (SUTA)",
            "impuestos": "Impuestos de nómina por empleado",
            "porcentajeExtra": "Impuestos sobre el salario",
            "costo": "Costo total por empleado",
            "costoTotal": "Costo total de todos los empleados",
        },
    },
    "minimum-wage": {
        "slug": "salario-minimo-por-estado",
        "campos": {"estado": "Estado", "horas": "Horas que trabaja por semana"},
        "filas": {
            "federal": "Salario mínimo federal por hora",
            "estatal": "Salario mínimo estatal por hora",
            "aplicable": "Mínimo que le deben pagar por hora",
            "semanal": "Pago mínimo por semana",
            "mensual": "Pago mínimo por mes",
            "anual": "Pago mínimo por año (52 semanas)",
        },
    },
    "overtime": {
        "slug": "calculadora-horas-extras",
        "campos": {"tarifa": "Tarifa normal por hora", "horas": "Horas trabajadas en la semana"},
        "filas": {
            "regulares": "Horas regulares",
            "extra": "Horas extras",
            "tarifaExtra": "Tarifa de horas extras",
            "pagoRegular": "Pago regular",
            "pagoExtra": "Pago de horas extras",
            "total": "Pago total de la semana",
            "prima": "Prima de horas extras (la mitad adicional)",
        },
        "ayudas_filas": {"prima": "Es la parte que puede deducir con la regla de horas extras sin impuestos."},
    },
    "no-tax-on-overtime": {
        "slug": "horas-extras-sin-impuestos",
        "importa": ["ESTADO_CIVIL"],
        "campos": {
            "estado": ESTADO,
            "pagoExtra": {"e": "Pago total de horas extras del año", "a": "Todo lo que le pagaron por horas sobre 40 a la semana a tiempo y medio. Si su W-2 muestra solo la prima, multiplíquela por 3."},
            "magi": {"e": MAGI, "a": "Para la mayoría de las personas es igual al AGI."},
            "gravable": GRAVABLE,
        },
        "filas": {
            "prima": "Prima de horas extras que califica",
            "tope": "Tope anual",
            "recorte": "Reducción por ingresos sobre el umbral",
            "deduccion": "Deducción por horas extras",
            "ahorro": AHORRO,
        },
    },
    "no-tax-on-tips": {
        "slug": "propinas-sin-impuestos",
        "importa": ["ESTADO_CIVIL"],
        "campos": {
            "estado": ESTADO,
            "propinas": {"e": "Propinas que califican recibidas este año", "a": "Propinas en efectivo y con tarjeta declaradas a su empleador o en el Formulario 4137."},
            "magi": {"e": MAGI, "a": "Para la mayoría de las personas es igual al AGI."},
            "gravable": GRAVABLE,
        },
        "filas": {"tope": "Tope anual", "recorte": "Reducción por ingresos sobre el umbral", "deduccion": "Deducción por propinas", "ahorro": AHORRO},
    },
    "capital-gains-tax": {
        "slug": "calculadora-impuesto-ganancias-de-capital",
        "importa": ["ESTADO_CIVIL"],
        "campos": {
            "estado": ESTADO,
            "ganancia": {"e": "Ganancia de capital", "a": "Precio de venta menos lo que pagó, incluidas las comisiones."},
            "plazo": {"e": "Cuánto tiempo lo tuvo", "o": {"largo": "Más de un año (largo plazo)", "corto": "Un año o menos (corto plazo)"}},
            "ordinario": {"e": "Otros ingresos tributables", "a": "Su ingreso tributable del año sin esta ganancia, después de deducciones."},
            "magi": {"e": "AGI modificado incluida la ganancia", "a": "Opcional. Se usa para el impuesto de 3.8% sobre ingresos netos de inversión."},
        },
        "filas": {
            "al0": "Ganancia gravada al 0%",
            "al15": "Ganancia gravada al 15%",
            "al20": "Ganancia gravada al 20%",
            "impuesto": "Impuesto federal sobre la ganancia",
            "niit": "Impuesto sobre ingresos netos de inversión",
            "pagar": "Impuesto federal total sobre la ganancia",
            "efectiva": "Tasa efectiva sobre la ganancia",
            "neto": "Ganancia después del impuesto federal",
        },
    },
    "401k-contribution": {
        "slug": "calculadora-401k",
        "campos": {
            "sueldo": "Salario anual",
            "aporte": "Su aporte (% del salario)",
            "edad": "Su edad al final del año",
            "coincidencia": "Aporte equivalente del empleador (% de su aporte)",
            "topeCoincidencia": "Hasta qué porcentaje del salario",
        },
        "filas": {
            "limite": "Su límite de aporte para 2026",
            "catchUp": "Aporte adicional (catch-up) incluido",
            "aporte": "Su aporte anual",
            "porMes": "Su aporte por mes",
            "coincidencia": "Aporte del empleador",
            "total": "Total que entra a su 401(k)",
            "paraElMaximo": "Porcentaje para llegar al máximo",
        },
    },
    "roth-ira-contribution": {
        "slug": "calculadora-roth-ira",
        "importa": ["ESTADO_CIVIL"],
        "campos": {
            "estado": ESTADO,
            "magi": "AGI modificado para la Roth IRA",
            "edad": "Su edad al final del año",
            "compensacion": "Compensación tributable (salarios e ingresos por cuenta propia)",
        },
        "filas": {
            "limite": "Límite de IRA para su edad",
            "inicio": "La reducción empieza en",
            "fin": "La reducción termina en",
            "maximo": "Máximo que puede aportar a una Roth IRA",
            "porMes": "Por mes para llegar",
        },
    },
    "hsa-contribution": {
        "slug": "calculadora-hsa",
        "campos": {
            "cobertura": {"e": "Cobertura del plan de salud con deducible alto", "o": {"individual": "Solo usted", "familiar": "Familiar"}},
            "mayor55": "Tiene 55 años o más al final del año",
            "meses": {"e": "Meses en que fue elegible este año", "a": "Cuente los meses en que tenía cobertura HDHP el primer día del mes."},
            "empleador": "Aportes del empleador este año",
        },
        "filas": {"limite": "Su límite de HSA para el año", "empleador": "Ya aportado por su empleador", "tuyo": "Lo que todavía puede aportar", "porMes": "Por mes"},
    },
    "rmd-calculator": {
        "slug": "calculadora-distribucion-minima-requerida",
        "campos": {"edad": "Edad que cumple este año", "saldo": "Saldo de la cuenta al 31 de diciembre del año pasado"},
        "filas": {"factor": "Período de distribución", "rmd": "Distribución mínima requerida (RMD)", "porMes": "Por mes si la reparte en el año", "porcentajeSaldo": "Porcentaje del saldo"},
    },
    "social-security-benefits": {
        "slug": "calculadora-beneficios-seguro-social",
        "campos": {
            "aime": {"e": "Ganancias mensuales indexadas promedio (AIME)", "a": "Sus 35 años de mayores ganancias, indexados por el crecimiento salarial, divididos entre 420 meses. Su cuenta my Social Security muestra su historial de ganancias."},
            "anios": "Edad a la que empieza a cobrar (años)",
            "meses": "Más meses",
        },
        "filas": {
            "pia": "Beneficio a la plena edad de jubilación (PIA)",
            "ajuste": "Ajuste por la edad en que empieza",
            "mensual": "Beneficio mensual estimado",
            "anual": "Por año",
        },
    },
    "child-tax-credit": {
        "slug": "calculadora-credito-tributario-por-hijos",
        "importa": ["ESTADO_CIVIL"],
        "campos": {
            "estado": ESTADO,
            "ninos": "Hijos que califican menores de 17 años",
            "otros": {"e": "Otros dependientes", "a": "Hijos de 17 años o más y otros familiares que usted mantiene."},
            "magi": MAGI,
            "impuesto": {"e": "Impuesto federal antes de créditos", "a": "Nuestra calculadora de impuestos federales le da este número."},
            "ganado": "Ingreso del trabajo (salarios y trabajo por cuenta propia)",
        },
        "filas": {
            "maximo": "Crédito antes del límite de ingresos",
            "reduccion": "Reducción por ingresos sobre el umbral",
            "credito": "Crédito después del límite de ingresos",
            "noReembolsable": "Usado para reducir su impuesto",
            "reembolsable": "Crédito tributario adicional por hijos (reembolsable)",
            "total": "Beneficio total del crédito",
        },
    },
    "quarterly-estimated-taxes": {
        "slug": "calculadora-impuestos-estimados-trimestrales",
        "importa": ["ESTADO_CIVIL"],
        "campos": {
            "estado": ESTADO,
            "esperado": {"e": "Impuesto total que espera para este año", "a": "Impuesto federal sobre el ingreso más el impuesto sobre el trabajo por cuenta propia, después de créditos."},
            "retencion": "Impuesto retenido de sus cheques este año",
            "anterior": {"e": "Impuesto total en la declaración del año pasado", "a": "Déjelo en blanco si no declaró el año pasado o si cubrió menos de 12 meses."},
            "agiAnterior": "AGI en la declaración del año pasado",
        },
        "filas": {
            "deuda": "Impuesto que no cubre la retención",
            "metaActual": "Monto seguro según este año",
            "metaAnterior": "Monto seguro según el año pasado",
            "anual": "Pagos estimados del año",
            "trimestral": "Cada pago trimestral",
        },
    },
    "inflation-calculator": {
        "slug": "calculadora-de-inflacion",
        "campos": {
            "monto": "Monto en dólares",
            "desde": {"e": "Mes del monto original", "a": "Se usa el CPI de ese mes. El día no importa."},
            "hasta": "Mes con el que quiere comparar",
        },
        "filas": {
            "ajustado": "Monto en dólares del mes final",
            "diferencia": "Aumento por inflación",
            "acumulada": "Inflación acumulada",
            "anual": "Inflación anual promedio",
            "mesInicial": "Primer mes",
            "indiceInicial": "CPI-U del primer mes",
            "mesFinal": "Último mes",
            "indiceFinal": "CPI-U del último mes",
        },
    },
    "sales-tax": {
        "slug": "calculadora-impuesto-sobre-las-ventas",
        "campos": {
            "modo": {"e": "¿Qué quiere hacer?", "o": {"sumar": "Sumar el impuesto a un precio", "quitar": "Quitar el impuesto de un total"}},
            "monto": "Monto",
            "tasa": {"e": "Tasa combinada del impuesto sobre las ventas", "a": "Tasa del estado más las del condado, la ciudad y el distrito donde compra. Aparece en su recibo."},
        },
        "filas": {"antes": "Precio antes del impuesto", "impuesto": "Impuesto sobre las ventas", "total": "Total con impuesto"},
    },
    "mileage-reimbursement": {
        "slug": "calculadora-millaje-irs",
        "campos": {
            "millas": "Millas recorridas",
            "uso": {"e": "Motivo de los viajes", "o": {"negocio": "Negocio", "medico": "Médico o mudanza militar", "caridad": "Caridad"}},
            "fecha": "Fecha de los viajes",
        },
        "filas": {"tarifa": "Tarifa del IRS por milla", "total": "Monto por millaje"},
    },
    "senior-deduction": {
        "slug": "deduccion-para-mayores-de-65",
        "importa": ["ESTADO_CIVIL"],
        "campos": {
            "estado": ESTADO,
            "personas": {"e": "Personas en la declaración de 65 años o más", "a": "Para 2026, nacidas antes del 2 de enero de 1962."},
            "magi": MAGI,
            "gravable": GRAVABLE,
        },
        "filas": {"porPersona": "Deducción por persona elegible", "total": "Deducción para mayores en su declaración", "ahorro": AHORRO},
    },
    "standard-deduction": {
        "slug": "deduccion-estandar",
        "importa": ["ESTADO_CIVIL"],
        "campos": {
            "estado": ESTADO,
            "mayores": {"e": "Personas en la declaración de 65 años o más", "a": "Para 2026, nacidas antes del 2 de enero de 1962."},
            "ciegos": "Personas en la declaración que son ciegas",
            "itemizadas": {"e": "Sus deducciones detalladas, para comparar", "a": "Intereses hipotecarios, impuestos estatales y locales hasta el tope, donaciones y gastos médicos altos."},
        },
        "filas": {
            "basica": "Deducción estándar básica",
            "adicional": "Monto adicional por edad o ceguera",
            "total": "Su deducción estándar",
            "conviene": "Mejor opción",
            "diferencia": "Diferencia entre las dos",
        },
    },
}
