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
  "Benefits, workers' compensation insurance and local payroll taxes are not included.": "No incluye beneficios, seguro de compensación laboral ni impuestos de nómina locales.",
  "Each child needs a Social Security number valid for work, and you or your spouse need one too.": "Cada hijo necesita un número de Seguro Social válido para trabajar, y usted o su cónyuge también necesitan uno.",
  "Estimate for people born in 1960 or later, whose full retirement age is 67. It uses the benefit formula for people who turn 62 in 2026 and leaves out future cost-of-living increases.": "Estimado para personas nacidas en 1960 o después, cuya plena edad de jubilación es 67. Usa la fórmula de beneficios para quienes cumplen 62 en 2026 y no incluye futuros aumentos por costo de vida.",
  "FUTA assumes you pay your state unemployment tax on time and get the full credit. Employers in a credit reduction state pay more.": "El FUTA supone que paga a tiempo su impuesto estatal de desempleo y recibe el crédito completo. Los empleadores de un estado con reducción del crédito pagan más.",
  "Federal income tax is separate. You also owe it on your profit, minus the deduction for half of this tax.": "El impuesto federal sobre el ingreso es aparte. También lo debe sobre su ganancia, menos la deducción de la mitad de este impuesto.",
  "If someone can claim you as a dependent, your standard deduction may be smaller.": "Si otra persona puede reclamarlo como dependiente, su deducción estándar puede ser menor.",
  "If you were eligible on December 1, the last-month rule may let you contribute the full yearly amount, as long as you stay eligible through the next year.": "Si era elegible el 1 de diciembre, la regla del último mes puede permitirle aportar el monto anual completo, siempre que siga siendo elegible durante el año siguiente.",
  "It is on top of the extra standard deduction for age 65, and you get it whether you itemize or not. It applies to tax years 2025 through 2028.": "Se suma a la deducción estándar adicional por 65 años, y la recibe tanto si detalla deducciones como si no. Se aplica a los años tributarios 2025 a 2028.",
  "Itemized": "Detalladas",
  "Itemize": "Detallar deducciones",
  "Standard": "Estándar",
  "Married people must file a joint return to claim this deduction.": "Las personas casadas deben presentar una declaración conjunta para tomar esta deducción.",
  "Medical and charity miles only help if you itemize deductions.": "Las millas médicas y de caridad solo sirven si detalla sus deducciones.",
  "Medicare premiums are usually taken from the payment. Working while you collect before full retirement age can hold back part of it.": "Las primas de Medicare suelen descontarse del pago. Trabajar mientras cobra antes de la plena edad de jubilación puede retener una parte.",
  "Net earnings under the minimum owe no self-employment tax.": "Un ingreso neto por debajo del mínimo no paga impuesto sobre el trabajo por cuenta propia.",
  "Only overtime required by the Fair Labor Standards Act counts. Social Security, Medicare and state taxes still apply.": "Solo cuentan las horas extras que exige la Ley de Normas Justas de Trabajo. El Seguro Social, Medicare y los impuestos estatales se siguen pagando.",
  "Salaried workers in executive, administrative or professional roles can be exempt from overtime.": "Los empleados asalariados en puestos ejecutivos, administrativos o profesionales pueden estar exentos de horas extras.",
  "Short-term gains are taxed like wages, at your ordinary income tax rates.": "Las ganancias a corto plazo pagan como los salarios, a sus tasas normales del impuesto sobre el ingreso.",
  "State and local income taxes are not included. Use your state's tax agency to add them.": "No incluye impuestos estatales ni locales sobre el ingreso. Consulte la agencia de impuestos de su estado para sumarlos.",
  "State income tax on gains is not included. Collectibles and some real estate gains have other rates.": "No incluye el impuesto estatal sobre las ganancias. Los objetos de colección y algunas ganancias inmobiliarias tienen otras tasas.",
  "The BLS did not publish a CPI for October 2025 because of the government shutdown. Pick another month.": "La BLS no publicó el CPI de octubre de 2025 por el cierre del gobierno. Elija otro mes.",
  "The deduction is available for tax years 2025 through 2028 and you need a valid Social Security number.": "La deducción está disponible para los años tributarios 2025 a 2028 y necesita un número de Seguro Social válido.",
  "The deduction is available for tax years 2025 through 2028. Self-employed workers can't deduct more than their net profit from that work.": "La deducción está disponible para los años tributarios 2025 a 2028. Quienes trabajan por cuenta propia no pueden deducir más que su ganancia neta de ese trabajo.",
  "This is the federal rule. Some states pay overtime after 8 hours in a day (California, Alaska and Nevada, for example) or double time.": "Esta es la regla federal. Algunos estados pagan horas extras después de 8 horas en un día (por ejemplo California, Alaska y Nevada) o pago doble.",
  "This is the tax before credits such as the child tax credit. State and local income taxes are not included.": "Es el impuesto antes de créditos como el crédito tributario por hijos. No incluye impuestos estatales ni locales sobre el ingreso.",
  "This uses the Uniform Lifetime Table. If your spouse is more than 10 years younger and your only beneficiary, the Joint Life Table gives a smaller RMD.": "Se usa la Tabla Uniforme de Vida. Si su cónyuge es más de 10 años menor y es su único beneficiario, la Tabla de Vida Conjunta da una RMD menor.",
  "This uses the flat rate for supplemental wages that most employers apply. State withholding is not included.": "Se usa la tasa fija para salarios suplementarios que aplican la mayoría de los empleadores. No incluye la retención estatal.",
  "Tips must come from a job the IRS lists as customarily tipped. Social Security, Medicare and state taxes still apply.": "Las propinas deben venir de un trabajo que el IRS considera de propinas habituales. El Seguro Social, Medicare y los impuestos estatales se siguen pagando.",
  "Under an employer's accountable plan, reimbursements up to this rate aren't taxed as wages. Self-employed people can deduct it instead of actual car costs.": "Con un plan responsable del empleador, los reembolsos hasta esta tarifa no pagan impuestos como salario. Quienes trabajan por cuenta propia pueden deducirla en lugar de los costos reales del auto.",
  "Wages above the Social Security wage base pay only Medicare tax.": "Los salarios por encima de la base salarial del Seguro Social pagan solo el impuesto de Medicare.",
  "With three or more children, a second method based on Social Security taxes can raise the refundable part. Schedule 8812 walks you through it.": "Con tres o más hijos, un segundo método basado en los impuestos del Seguro Social puede aumentar la parte reembolsable. El Anexo 8812 le guía paso a paso.",
  "Withholding is not your final tax. When you file, the bonus is taxed with the rest of your income and any difference becomes part of your refund or balance due.": "La retención no es su impuesto final. Al declarar, el bono se grava con el resto de sus ingresos y cualquier diferencia pasa a su reembolso o saldo a pagar.",
  "You don't need to take a required minimum distribution until the year you turn 73.": "No necesita hacer una distribución mínima requerida hasta el año en que cumpla 73.",
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
