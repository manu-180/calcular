import type { Hoja, Libro, PlanillaPais } from "./marco";

// calcularSueldo de src/paises/uy/lib/sueldo.ts (retención mensual del IRPF, Decreto 148/007 art. 63).
function sueldoUy(l: Libro, h: Hoja, nominal: string, hijos: string, hijosDisc: string, conyuge: string, compartida: string): { montepio: string; fonasa: string; tasaFonasa: string; frl: string; irpf: string; liquido: string } {
  const T = l.tablas;
  const bpc = T.numero("uy.bpc");
  h.pasoTitulo("Aportes");
  const montepio = h.paso("Montepío", l.r(`MIN(${nominal},${T.numero("uy.tope-aportes")})*${T.numero("uy.aporte-jubilatorio")}/100`));
  const conHijos = `(${hijos}+${hijosDisc})>0`;
  const tabla = (id: string) => {
    const m = T.mapa(id);
    return `IF(${conyuge},IF(${conHijos},${m("ambos")},${m("conyuge")}),IF(${conHijos},${m("hijos")},${m("sin")}))`;
  };
  const tasaFonasa = h.paso("Tasa de Fonasa", `IF(${nominal}>${T.numero("uy.fonasa-umbral")}*${bpc},${tabla("uy.fonasa-mas")},${tabla("uy.fonasa-hasta")})`, "porcentaje");
  const fonasa = h.paso("Fonasa", l.r(`${nominal}*${tasaFonasa}/100`));
  const frl = h.paso("Fondo de Reconversión Laboral", l.r(`${nominal}*${T.numero("uy.frl")}/100`));
  h.pasoTitulo("IRPF");
  const renta = h.paso(
    "Renta computable (con el 6 % si pasa 10 BPC)",
    l.r(`IF(${nominal}>${T.numero("uy.irpf-incremento-umbral")}*${bpc},${nominal}+${nominal}*${T.numero("uy.irpf-incremento")}/100,${nominal})`),
  );
  const escala = h.marginal("Impuesto por la escala", T.escala("uy.irpf-escala"), renta, bpc);
  const impuesto = h.paso("Impuesto de la escala", l.r(escala));
  const dedHijos = h.paso(
    "Deducción por hijos del mes",
    l.r(`(${hijos}*${T.numero("uy.irpf-deduccion-hijo")}+${hijosDisc}*${T.numero("uy.irpf-deduccion-hijo-discapacidad")})*${bpc}*IF(${compartida},0.5,1)/12`),
  );
  const deducciones = h.paso("Deducciones", l.r(`${montepio}+${fonasa}+${frl}+${dedHijos}`));
  const tasaDed = h.paso(
    "Tasa sobre las deducciones",
    `IF(${nominal}<=${T.numero("uy.irpf-deducciones-umbral")}*${bpc},${T.numero("uy.irpf-deducciones-tasa-baja")},${T.numero("uy.irpf-deducciones-tasa-alta")})`,
    "porcentaje",
  );
  const descuento = h.paso("Descuento por deducciones", l.r(`${deducciones}*${tasaDed}/100`));
  const irpf = h.paso("IRPF", `MAX(0,${l.r(`${impuesto}-${descuento}`)})`);
  const liquido = h.paso("Sueldo líquido", l.r(`${nominal}-${montepio}-${fonasa}-${frl}-${irpf}`));
  return { montepio, fonasa, tasaFonasa, frl, irpf, liquido };
}

function aniosCumplidos(ingreso: string, egreso: string): string {
  return `MAX(0,YEAR(${egreso})-YEAR(${ingreso})-IF(OR(MONTH(${egreso})<MONTH(${ingreso}),AND(MONTH(${egreso})=MONTH(${ingreso}),DAY(${egreso})<DAY(${ingreso}))),1,0))`;
}

// Ley 12.590 art. 2, como en src/paises/uy/lib/licencia.ts.
function diasLicenciaAnual(l: Libro, anios: string): string {
  return `${l.tablas.numero("uy.licencia-dias")}+IF(${anios}>=5,INT(${anios}/4),0)`;
}

function despidoMensual(l: Libro, h: Hoja, sueldo: string, ingreso: string, egreso: string, incidencias: string): { aniosComputados: string; meses: string; base: string; indemnizacion: string } {
  const T = l.tablas;
  const cumplidos = h.paso("Años cumplidos", aniosCumplidos(ingreso, egreso), "entero");
  const pasoAniversario = `IF(YEAR(${ingreso})+${cumplidos}<YEAR(${egreso}),TRUE(),MONTH(${ingreso})*100+DAY(${ingreso})<MONTH(${egreso})*100+DAY(${egreso}))`;
  const aniosComputados = h.paso("Años o fracción que se indemnizan", `IF(${pasoAniversario},${cumplidos}+1,MAX(${cumplidos},1))`, "entero");
  const meses = h.paso("Sueldos de indemnización (con tope)", `MIN(${T.numero("uy.despido-tope-meses")},${aniosComputados})`, "entero");
  const diasAnuales = h.paso("Días de licencia por año", diasLicenciaAnual(l, cumplidos), "entero");
  const incAg = h.paso("Incidencia del aguinaldo", `IF(${incidencias},${l.r(`${sueldo}/12`)},0)`);
  const incLic = h.paso("Incidencia de la licencia", `IF(${incidencias},${l.r(`${sueldo}/30*${diasAnuales}/12`)},0)`);
  const base = h.paso("Remuneración total del mes", l.r(`${sueldo}+${incAg}+${incLic}`));
  const indemnizacion = h.paso("Indemnización por despido", l.r(`${base}*${meses}`));
  return { aniosComputados, meses, base, indemnizacion };
}

function sueldoLiquido(l: Libro): void {
  const h = l.hoja("Sueldo líquido", "Sueldo líquido: montepío, Fonasa, FRL e IRPF", "ponés tu nominal y te dice los aportes, el IRPF que te retienen y tu sueldo líquido.");
  const b = h.bloque("sueldo-liquido");
  h.seccion("TUS DATOS");
  const nominal = h.numero("Sueldo nominal del mes", 60000, { min: 0, ayuda: "Todo lo que cobrás antes de descuentos. Sin aguinaldo ni salario vacacional." });
  const hijos = h.numero("Hijos menores de 18 a tu cargo", 0, { formato: "entero", min: 0, max: 15 });
  const hijosDisc = h.numero("Hijos con discapacidad a tu cargo", 0, { formato: "entero", min: 0, max: 15, ayuda: "De cualquier edad. Para el IRPF se deducen el doble que un hijo menor." });
  const conyuge = h.siNo("Tenés cónyuge o concubino a cargo en el Fonasa", false, "Marcalo si tu pareja se atiende por tu Fonasa porque no tiene cobertura propia.");
  const reparto = h.opcion(
    "Deducción de los hijos en el IRPF",
    [
      { valor: "entera", etiqueta: "La uso entera" },
      { valor: "mitad", etiqueta: "La comparto con el otro progenitor" },
    ],
    "entera",
  );
  b.campo("nominal", nominal).campo("hijos", hijos).campo("hijosDiscapacidad", hijosDisc).campo("conyuge", conyuge).campo("reparto", reparto);
  const s = sueldoUy(l, h, nominal.ref, hijos.ref, hijosDisc.ref, `${conyuge.ref}="Sí"`, `${reparto.ref}="La comparto con el otro progenitor"`);
  h.seccion("TU RECIBO");
  b.resultado("nominal", h.resultado("Sueldo nominal", `${nominal.ref}`));
  b.resultado("montepio", h.resultado("Aporte jubilatorio (montepío)", `${s.montepio}`));
  b.resultado("fonasa", h.resultado("Fonasa", `${s.fonasa}`));
  b.resultado("tasaFonasa", h.resultado("Tasa de Fonasa que te corresponde", `${s.tasaFonasa}`, { formato: "porcentaje" }));
  b.resultado("frl", h.resultado("Fondo de Reconversión Laboral", `${s.frl}`));
  b.resultado("irpf", h.resultado("IRPF", `${s.irpf}`));
  b.resultado("descuentos", h.resultado("Total de descuentos", l.r(`${s.montepio}+${s.fonasa}+${s.frl}+${s.irpf}`)));
  b.resultado("liquido", h.resultado("Sueldo líquido", `${s.liquido}`, { total: true }));
  h.nota("Si tu nominal pasa 10 BPC, para el IRPF se le suma un 6 %, como manda el decreto de la retención. El montepío se calcula hasta el tope de aportación.");
}

function aguinaldoYVacacional(l: Libro): void {
  const T = l.tablas;
  const conAg = l.disponible("aguinaldo");
  const conSv = l.disponible("salario-vacacional");
  if (!conAg && !conSv) return;
  const h = l.hoja("Aguinaldo y vacacional", "Aguinaldo y salario vacacional", "calcula la cuota de aguinaldo de junio o diciembre y el salario vacacional de tu licencia.");
  if (conAg) {
    const b = h.bloque("aguinaldo");
    h.seccion("AGUINALDO");
    const cuota = h.opcion(
      "Qué aguinaldo querés calcular",
      [
        { valor: "junio", etiqueta: "Junio (de diciembre a mayo)" },
        { valor: "diciembre", etiqueta: "Diciembre (de junio a noviembre)" },
        { valor: "egreso", etiqueta: "Al dejar el trabajo (proporcional)" },
      ],
      "diciembre",
    );
    const sueldo = h.numero("Sueldo nominal mensual", 60000, { min: 0, ayuda: "Si tu sueldo cambió en el período, poné el promedio." });
    const meses = h.numero("Meses trabajados en el período", 6, { formato: "numero", min: 0, max: 6, ayuda: "Hasta 6. Se aceptan fracciones: medio mes es 0,5." });
    const variables = h.numero("Otros cobros en dinero del período", 0, { min: 0, ayuda: "Horas extra, comisiones y primas que cobraste en esos meses. Si no tuviste, dejá 0." });
    b.campo("cuota", cuota).campo("sueldo", sueldo).campo("meses", meses).campo("variables", variables);
    const total = h.paso("Total cobrado en el período", l.r(`${sueldo.ref}*${meses.ref}+${variables.ref}`));
    b.resultado("totalPeriodo", h.resultado("Total cobrado en el período", `${total}`));
    b.resultado("aguinaldo", h.resultado("Aguinaldo nominal", l.r(`${total}/12`), { total: true }));
    h.nota("El aguinaldo es la doceava parte de lo cobrado en el período. Es nominal: lleva aportes e IRPF.");
  }
  if (conSv) {
    const b = h.bloque("salario-vacacional");
    h.seccion("SALARIO VACACIONAL");
    const nominal = h.numero("Sueldo nominal mensual para la licencia", 60000, { min: 0, ayuda: "Si hacés horas extra, sumá el promedio mensual del año: también cuentan para la licencia." });
    const antig = h.numero("Años cumplidos en la empresa", 1, { formato: "entero", min: 0, max: 60, ayuda: "Desde los 5 años se suman días de licencia por antigüedad." });
    const meses = h.numero("Meses trabajados en el año que genera la licencia", 12, { formato: "numero", min: 0, max: 12 });
    const hijos = h.numero("Hijos menores de 18 a tu cargo", 0, { formato: "entero", min: 0, max: 15 });
    const conyuge = h.siNo("Tenés cónyuge o concubino a cargo en el Fonasa", false);
    b.campo("nominal", nominal).campo("antiguedad", antig).campo("meses", meses).campo("hijos", hijos).campo("conyuge", conyuge);
    h.pasoTitulo("Salario vacacional");
    const extra = h.paso("Días extra por antigüedad", `IF(${antig.ref}>=5,INT(${antig.ref}/4),0)`, "entero");
    const anuales = h.paso("Días de licencia por año", `${T.numero("uy.licencia-dias")}+${extra}`, "entero");
    const dias = h.paso("Días de licencia", l.r(`${anuales}*${meses.ref}/12`), "numero");
    const s = sueldoUy(l, h, nominal.ref, hijos.ref, "0", `${conyuge.ref}="Sí"`, "FALSE()");
    const jn = h.paso("Jornal nominal", l.r(`${nominal.ref}/30`));
    const jl = h.paso("Jornal líquido", l.r(`${s.liquido}/30`));
    b.resultado("diasAnuales", h.resultado("Días de licencia por año", `${anuales}`, { formato: "dias" }));
    b.resultado("diasPorAntiguedad", h.resultado("Días extra por antigüedad", `${extra}`, { formato: "dias" }));
    b.resultado("dias", h.resultado("Días de licencia que te tocan", `${dias}`, { formato: "numero" }));
    b.resultado("jornalNominal", h.resultado("Jornal nominal", `${jn}`));
    b.resultado("pagoLicencia", h.resultado("Pago de la licencia", l.r(`${jn}*${dias}`)));
    b.resultado("jornalLiquido", h.resultado("Jornal líquido", `${jl}`));
    b.resultado("salarioVacacional", h.resultado("Salario vacacional", l.r(`${jl}*${dias}*${T.numero("uy.salario-vacacional")}/100`), { total: true }));
    h.nota("El salario vacacional se cobra antes de salir de licencia y se calcula sobre el jornal líquido. Tu laudo o convenio puede mejorarlo.");
  }
}

function liquidacion(l: Libro): void {
  const T = l.tablas;
  const conLiq = l.disponible("liquidacion-por-egreso");
  const conDesp = l.disponible("despido");
  if (!conLiq && !conDesp) return;
  const h = l.hoja("Liquidación por egreso", "Liquidación por egreso e indemnización por despido", "ponés tus fechas y tu sueldo, y te dice el aguinaldo, la licencia, el salario vacacional y, si te despidieron, la indemnización.");
  h.seccion("TUS DATOS");
  const ingreso = h.fecha("Fecha de ingreso", "2022-03-01");
  const egreso = h.fecha("Último día de trabajo", l.hoy);
  const ing = ingreso.ref;
  const eg = egreso.ref;
  if (conLiq) {
    const b = h.bloque("liquidacion-por-egreso");
    const motivo = h.opcion(
      "Por qué termina el trabajo",
      [
        { valor: "renuncia", etiqueta: "Renuncia" },
        { valor: "despido", etiqueta: "Despido" },
      ],
      "renuncia",
    );
    const nominal = h.numero("Sueldo nominal mensual", 60000, { min: 0, ayuda: "Si cobrás horas extra o comisiones, sumá el promedio mensual del último año." });
    const pend = h.numero("Días de licencia de años anteriores sin gozar", 0, { formato: "entero", min: 0, max: 120 });
    const hijos = h.numero("Hijos menores de 18 a tu cargo", 0, { formato: "entero", min: 0, max: 15 });
    const conyuge = h.siNo("Tenés cónyuge o concubino a cargo en el Fonasa", false, "Cambia tus descuentos, y el salario vacacional se paga sobre el sueldo líquido.");
    b.campo("motivo", motivo).campo("nominal", nominal).campo("ingreso", ingreso).campo("egreso", egreso).campo("licenciaPendiente", pend).campo("hijos", hijos).campo("conyuge", conyuge);
    const n = nominal.ref;
    h.pasoTitulo("Aguinaldo del semestre en curso");
    const mes = `MONTH(${eg})`;
    const y = `YEAR(${eg})`;
    const desde = h.paso("Empieza el período", `IF(AND(${mes}>=6,${mes}<=11),DATE(${y},6,1),IF(${mes}=12,DATE(${y},12,1),DATE(${y}-1,12,1)))`, "fecha");
    const hasta = h.paso("Termina el período", `IF(AND(${mes}>=6,${mes}<=11),DATE(${y},11,30),IF(${mes}=12,DATE(${y}+1,5,31),DATE(${y},5,31)))`, "fecha");
    const diasEnSem = h.paso("Días trabajados en el período", `${eg}-MAX(${desde},${ing})+1`, "entero");
    const aguinaldo = h.paso("Aguinaldo", l.r(`${n}/2*${diasEnSem}/(${hasta}-${desde}+1)`));
    h.pasoTitulo("Licencia");
    const inicioAnio = `DATE(${y},1,1)`;
    const diasTrab = h.paso("Días trabajados este año", `${eg}-MAX(${inicioAnio},${ing})+1`, "entero");
    const anuales = h.paso("Días de licencia por año", diasLicenciaAnual(l, aniosCumplidos(ing, eg)), "entero");
    const diasGen = h.paso("Días de licencia generados este año", l.r(`${anuales}*${diasTrab}/(DATE(${y},12,31)-${inicioAnio}+1)`), "numero");
    const diasLic = h.paso("Días de licencia a pagar", l.r(`${diasGen}+${pend.ref}`), "numero");
    const s = sueldoUy(l, h, n, hijos.ref, "0", `${conyuge.ref}="Sí"`, "FALSE()");
    h.pasoTitulo("Licencia y salario vacacional");
    const licencia = h.paso("Licencia no gozada", l.r(`${n}/30*${diasLic}`));
    const sv = h.paso("Salario vacacional", l.r(`${s.liquido}/30*${diasLic}*${T.numero("uy.salario-vacacional")}/100`));
    h.pasoTitulo("Despido");
    const d = despidoMensual(l, h, n, ing, eg, "TRUE()");
    const despido = h.paso("Indemnización si es despido", `IF(${motivo.ref}="Despido",${d.indemnizacion},0)`);
    h.seccion("TU LIQUIDACIÓN");
    h.aviso(`IF(${eg}<${ing},"El último día de trabajo tiene que ser posterior al ingreso.","")`);
    b.resultado("aguinaldo", h.resultado("Aguinaldo proporcional", `${aguinaldo}`));
    b.resultado("diasGenerados", h.resultado("Días de licencia generados este año", `${diasGen}`, { formato: "numero" }));
    b.resultado("diasLicencia", h.resultado("Días de licencia a pagar", `${diasLic}`, { formato: "numero" }));
    b.resultado("licencia", h.resultado("Licencia no gozada", `${licencia}`));
    b.resultado("salarioVacacional", h.resultado("Salario vacacional", `${sv}`));
    b.resultado("despido", h.resultado("Indemnización por despido", `${despido}`));
    b.resultado("total", h.resultado("Total", l.r(`${aguinaldo}+${licencia}+${sv}+${despido}`), { total: true }));
    h.nota("Aguinaldo, licencia y salario vacacional se pagan también si renunciás. La indemnización suma a la base el aguinaldo y la licencia, como indica el MTSS.");
  }
  if (conDesp) {
    const b = h.bloque("despido");
    h.seccion("INDEMNIZACIÓN POR DESPIDO (MENSUALES Y JORNALEROS)");
    const modalidad = h.opcion(
      "Cómo cobrás",
      [
        { valor: "mensual", etiqueta: "Mensual" },
        { valor: "jornalero", etiqueta: "Jornalero o destajista" },
      ],
      "mensual",
    );
    const rem = h.numero("Sueldo mensual o jornal", 60000, {
      min: 0,
      ayuda: "Mensuales: el nominal más el promedio de horas extra y comisiones del último año. Jornaleros: el jornal del último día trabajado.",
    });
    const inc = h.siNo("Sumar aguinaldo y licencia a la base", true, "Es lo que indica el MTSS para calcular la remuneración total del mes. Solo para mensuales.");
    const ac = h.numero("Años en los que trabajaste 240 jornales o más", 0, { formato: "entero", min: 0, max: 60, ayuda: "Solo para jornaleros." });
    const js = h.numero("Jornales trabajados en los años que no llegaron a 240", 0, { formato: "entero", min: 0, max: 20000, ayuda: "Solo para jornaleros. Incluí la fracción del último año." });
    b.campo("modalidad", modalidad).campo("remuneracion", rem).campo("ingreso", ingreso).campo("egreso", egreso).campo("incidencias", inc).campo("aniosCompletos", ac).campo("jornalesSueltos", js);
    h.pasoTitulo("Indemnización de mensuales");
    const d = despidoMensual(l, h, rem.ref, ing, eg, `${inc.ref}="Sí"`);
    h.pasoTitulo("Indemnización de jornaleros");
    const jornal = `${modalidad.ref}="Jornalero o destajista"`;
    const sinTope = h.paso("Jornales antes del tope", `${ac.ref}*${T.numero("uy.despido-jornales-anio")}+${js.ref}*2/25`, "numero");
    const derecho = h.paso("¿Llegás a 100 jornales?", `IF(${ac.ref}*240+${js.ref}>=100,"Sí","No")`, "texto");
    const jornales = h.paso("Jornales de indemnización", `IF(${derecho}="Sí",${l.r(`MIN(${T.numero("uy.despido-tope-jornales")},${sinTope})`)},0)`, "numero");
    b.resultado("aniosComputados", h.resultado("Años o fracción que se indemnizan", `IF(${jornal},"",${d.aniosComputados})`, { formato: "entero" }));
    b.resultado("meses", h.resultado("Sueldos de indemnización", `IF(${jornal},"",${d.meses})`, { formato: "entero" }));
    b.resultado("baseMensual", h.resultado("Remuneración total del mes", `IF(${jornal},"",${d.base})`));
    b.resultado("jornales", h.resultado("Jornales de indemnización", `IF(${jornal},${jornales},"")`, { formato: "numero" }));
    b.resultado("indemnizacion", h.resultado("Indemnización por despido", `IF(${jornal},${l.r(`${jornales}*${rem.ref}`)},${d.indemnizacion})`, { total: true }));
    h.nota("Mensuales: un sueldo por año o fracción, con tope de seis. Jornaleros: 2 jornales cada 25 trabajados, con tope de 150. La indemnización legal no paga aportes ni IRPF.");
  }
}

export const planillaUy: PlanillaPais = {
  mercado: "uy",
  titulo: (anio) => `Planilla de sueldo y liquidación Uruguay ${anio}`,
  construir(l) {
    if (l.disponible("sueldo-liquido")) sueldoLiquido(l);
    aguinaldoYVacacional(l);
    liquidacion(l);
  },
};
