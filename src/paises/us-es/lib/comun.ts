// Mensajes que devuelve o lanza calcular() en las calculadoras de us (inglés) y su traducción al español
// de Estados Unidos. Los textos fijos van por texto exacto; los armados con meses o montos, por traducir().

const MESES: Readonly<Record<string, string>> = {
  January: "enero",
  February: "febrero",
  March: "marzo",
  April: "abril",
  May: "mayo",
  June: "junio",
  July: "julio",
  August: "agosto",
  September: "septiembre",
  October: "octubre",
  November: "noviembre",
  December: "diciembre",
};

function mes(texto: string): string {
  const m = /^(\p{L}+) (\d{4})$/u.exec(texto);
  return m && MESES[m[1]] ? `${MESES[m[1]]} de ${m[2]}` : texto;
}

export const MENSAJES: Readonly<Record<string, string>> = {
  "Some cities and counties set a higher minimum wage. Tipped, youth and training wages can be lower.":
    "Algunas ciudades y condados fijan un salario mínimo más alto. Para empleados que reciben propinas, jóvenes y aprendices puede ser más bajo.",
  "The state rate is below the federal one. Most jobs are covered by federal law and must pay the federal minimum.":
    "La tasa estatal es más baja que la federal. La mayoría de los empleos están cubiertos por la ley federal y deben pagar el mínimo federal.",
  "This state has no minimum wage law. Jobs covered by federal law must pay at least the federal minimum.":
    "Este estado no tiene ley de salario mínimo. Los empleos cubiertos por la ley federal deben pagar al menos el mínimo federal.",
  "Pre-tax benefits can't be larger than your salary.": "Los beneficios antes de impuestos no pueden ser mayores que su salario.",
  "Your 401(k) contribution was capped at the yearly employee limit.": "Su aporte al 401(k) se limitó al tope anual para empleados.",
  "Married taxpayers must file jointly.": "Los contribuyentes casados deben presentar una declaración conjunta.",
  "Only a joint return can count two people.": "Solo una declaración conjunta puede contar a dos personas.",
  "Only a joint return has two people.": "Solo una declaración conjunta tiene a dos personas.",
  "Only joint returns have two people.": "Solo las declaraciones conjuntas tienen a dos personas.",
  "The senior deduction is not available when married people file separately.":
    "La deducción para mayores no está disponible para personas casadas que declaran por separado.",
  "Long-term gains stack on top of your other income, so the 0%, 15% and 20% rates depend on both.":
    "Las ganancias a largo plazo se suman encima de sus otros ingresos, por eso las tasas de 0%, 15% y 20% dependen de ambos.",
  "You contribute less than the matched percentage, so part of the employer match is left on the table.":
    "Usted aporta menos que el porcentaje que iguala su empleador, así que deja sin usar parte de ese aporte.",
  "Your contribution was capped at the yearly limit for your age.": "Su aporte se limitó al tope anual para su edad.",
  "The 11250 amount is only for ages 60 to 63.": "El monto de 11,250 es solo para personas de 60 a 63 años.",
  "Your income is too high for a direct Roth IRA contribution. A traditional IRA is still allowed.":
    "Sus ingresos son demasiado altos para aportar directamente a una Roth IRA. Todavía puede aportar a una IRA tradicional.",
  "This uses the range for married people who lived with their spouse at some point in the year. If you lived apart all year, use the single range.":
    "Se usa el rango para personas casadas que vivieron con su cónyuge en algún momento del año. Si vivieron separados todo el año, use el rango de soltero.",
  "RMDs start at 73.": "Las distribuciones mínimas requeridas empiezan a los 73 años.",
  "For your first RMD you can wait until April 1 of next year, but then you take two distributions in the same year.":
    "Para su primera distribución puede esperar hasta el 1 de abril del año siguiente, pero entonces hará dos retiros en el mismo año.",
  "Benefits stop growing at 70. Choose an age up to 70 years and 0 months.": "Los beneficios dejan de crecer a los 70. Elija una edad hasta 70 años y 0 meses.",
  "Delayed credits stop at 70.": "Los créditos por retrasar el cobro terminan a los 70.",
  "Payments are due around April 15, June 15, September 15 and January 15. Your state may require its own estimated payments.":
    "Los pagos vencen alrededor del 15 de abril, 15 de junio, 15 de septiembre y 15 de enero. Su estado puede exigir sus propios pagos estimados.",
  "Enter last year's AGI too. It decides between the 100% and 110% rule.": "Escriba también el AGI del año pasado. Decide entre la regla del 100% y la del 110%.",
  "You expect to owe less than the minimum after withholding, so you don't need to make estimated payments.":
    "Espera deber menos que el mínimo después de la retención, así que no necesita hacer pagos estimados.",
  "The first month has to be before the second one.": "El primer mes tiene que ser anterior al segundo.",
  "BLS skipped October 2025 during the shutdown.": "La BLS no publicó octubre de 2025 durante el cierre del gobierno.",
  "A 0% rate leaves the price as is.": "Con una tasa de 0% el precio queda igual.",
  "Business rates are loaded through December 31, 2026.": "Las tarifas de negocio están cargadas hasta el 31 de diciembre de 2026.",
  "We only have the IRS rates for trips from January 1, 2026 to the end of the current rate period.":
    "Solo tenemos las tarifas del IRS para viajes desde el 1 de enero de 2026 hasta el final del período vigente.",
  Single: "Soltero",
  "Married filing jointly": "Casado, declaración conjunta",
  "Married filing separately": "Casado, declaración por separado",
  "Head of household": "Cabeza de familia",
  "Take the standard deduction": "Tomar la deducción estándar",
  "Standard deduction": "Deducción estándar",
  "Itemized deductions": "Deducciones detalladas",
  "Itemize your deductions": "Detallar sus deducciones",
};

const PATRONES: readonly [RegExp, (m: RegExpExecArray) => string][] = [
  [
    /^Paying (\S+)% of last year's tax is the smaller safe amount, so it protects you from the underpayment penalty even if you owe more in April\.$/,
    (m) => `Pagar el ${m[1]}% del impuesto del año pasado es el monto seguro más bajo, así que lo protege de la multa por pago insuficiente aunque deba más en abril.`,
  ],
  [/^The latest CPI available is for (.+), so that month is used as the end\.$/, (m) => `El último CPI disponible es de ${mes(m[1])}, así que se usa ese mes como final.`],
  [/^The latest CPI available is for (.+)\.$/, (m) => `El último CPI disponible es de ${mes(m[1])}.`],
  [/^There is no CPI for (.+)\.$/, (m) => `No hay CPI para ${mes(m[1])}.`],
  [/^You can't contribute more than your taxable compensation: (\S+)\.$/, (m) => `No puede aportar más que su compensación tributable: ${m[1]}.`],
];

export function traducir(texto: string): string | undefined {
  for (const [re, f] of PATRONES) {
    const m = re.exec(texto);
    if (m) return f(m);
  }
  const conMes = mes(texto);
  return conMes === texto ? undefined : conMes;
}

export const ESTADO_CIVIL = {
  single: "Soltero",
  mfj: "Casado, declaración conjunta",
  mfs: "Casado, declaración por separado",
  hoh: "Cabeza de familia",
} as const;

export const COMUN = { mensajes: MENSAJES, traducir } as const;
