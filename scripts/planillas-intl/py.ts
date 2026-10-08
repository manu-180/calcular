import type { Hoja, Libro, PlanillaPais } from "./marco";

// antiguedad de src/paises/py/lib/fechas.ts: meses de servicio contados desde el ingreso (recortando al
// último día del mes, como EDATE) hasta el día siguiente al egreso.
function antiguedadPy(h: Hoja, ingreso: string, egreso: string): { anios: string; meses: string; dias: string; conFraccion: string; fin: string } {
  const fin = `(${egreso}+1)`;
  const n0 = `((YEAR(${fin})-YEAR(${ingreso}))*12+MONTH(${fin})-MONTH(${ingreso}))`;
  const n = h.paso("Meses de servicio cumplidos", `IF(EDATE(${ingreso},${n0})>${fin},${n0}-1,${n0})`, "entero");
  const anios = h.paso("Años cumplidos", `INT(${n}/12)`, "entero");
  const meses = h.paso("Meses sueltos", `MOD(${n},12)`, "entero");
  const dias = h.paso("Días sueltos", `${fin}-EDATE(${ingreso},${n})`, "entero");
  return { anios, meses, dias, conFraccion: `OR(${meses}>0,${dias}>0)`, fin };
}

function preavisoDias(l: Libro, a: { anios: string; conFraccion: string }): string {
  const p = l.tablas.mapa("py.preaviso-dias");
  const mas = (n: number) => `OR(${a.anios}>${n},AND(${a.anios}=${n},${a.conFraccion}))`;
  return `IF(${mas(10)},${p("mas-10")},IF(${mas(5)},${p("hasta-10")},IF(${mas(1)},${p("hasta-5")},${p("hasta-1")})))`;
}

function aniosIndemnizables(ingreso: string, a: { anios: string; fin: string }): string {
  return `IF(${a.fin}>EDATE(${ingreso},${a.anios}*12+6),${a.anios}+1,${a.anios})`;
}

function salarioNeto(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Salario neto", "Salario neto y aporte al IPS", "ponés tu salario bruto y te dice el aporte al IPS, tu salario neto y lo que le cuesta al empleador.");
  const b = h.bloque("salario-neto");
  h.seccion("TUS DATOS");
  const bruto = h.numero("Salario bruto del mes", 3500000, { min: 0, ayuda: "El salario más horas extra o comisiones del mes. El aguinaldo no va." });
  b.campo("bruto", bruto);
  const ips = h.paso("Aporte al IPS", l.r(`${bruto.ref}*${T.numero("py.ips-trabajador")}/100`));
  const empleador = h.paso("Aporte del empleador al IPS", l.r(`${bruto.ref}*${T.numero("py.ips-empleador")}/100`));
  h.seccion("TU SALARIO");
  b.resultado("bruto", h.resultado("Salario bruto", `${bruto.ref}`));
  b.resultado("ips", h.resultado("Aporte al IPS", `${ips}`));
  b.resultado("neto", h.resultado("Salario neto", l.r(`${bruto.ref}-${ips}`), { total: true }));
  b.resultado("aporteEmpleador", h.resultado("Aporte del empleador al IPS", `${empleador}`));
  b.resultado("costoEmpleador", h.resultado("Costo total para el empleador", l.r(`${bruto.ref}+${empleador}`)));
  h.aviso(`IF(AND(${bruto.ref}>0,${bruto.ref}<${T.numero("py.salario-minimo")}),"Tu salario está debajo del mínimo legal. Con jornada completa, el IPS toma como base el salario mínimo.","")`);
  h.nota("No incluye el IRP: se liquida una vez al año, en la declaración de marzo, y solo si tus ingresos del año pasan el monto no alcanzado.");
}

function aguinaldo(l: Libro): void {
  const h = l.hoja("Aguinaldo", "Aguinaldo", "calcula tu aguinaldo con la doceava parte de lo que cobraste en el año.");
  const b = h.bloque("aguinaldo");
  h.seccion("TUS DATOS");
  const salario = h.numero("Salario mensual", 3500000, { min: 0, ayuda: "Si tu salario cambió durante el año, poné el promedio." });
  const meses = h.numero("Meses trabajados en el año", 12, { formato: "numero", min: 0, max: 12, ayuda: "Hasta 12. Se aceptan fracciones: medio mes es 0,5." });
  const extras = h.numero("Horas extra, comisiones y otros cobros del año", 0, { min: 0, ayuda: "Todo lo que cobraste aparte del salario desde enero. Si no tuviste, dejá 0." });
  b.campo("salario", salario).campo("meses", meses).campo("extras", extras);
  const total = h.paso("Total cobrado en el año", l.r(`${salario.ref}*${meses.ref}+${extras.ref}`));
  h.seccion("TU AGUINALDO");
  b.resultado("totalAnio", h.resultado("Total cobrado en el año", `${total}`));
  b.resultado("aguinaldo", h.resultado("Aguinaldo", l.r(`${total}/12`), { total: true }));
  h.nota("Se paga antes del 31 de diciembre, o al terminar la relación laboral si eso pasa antes. No paga aporte al IPS y no se puede embargar.");
}

function liquidacion(l: Libro): void {
  const T = l.tablas;
  const conLiq = l.disponible("liquidacion");
  const conInd = l.disponible("indemnizacion-por-despido");
  if (!conLiq && !conInd) return;
  const h = l.hoja("Liquidación", "Liquidación: preaviso, indemnización, vacaciones y aguinaldo", "ponés tus fechas, tu salario promedio y cómo terminó el trabajo, y te dice el preaviso, la indemnización, las vacaciones y el aguinaldo.");
  h.seccion("TUS DATOS");
  const salario = h.numero("Salario mensual promedio de los últimos 6 meses", 3500000, { min: 0, ayuda: "Sumá todo lo que cobraste en esos meses y dividilo por 6." });
  const ingreso = h.fecha("Fecha de ingreso", "2021-04-01");
  const egreso = h.fecha("Último día de trabajo", l.hoy);
  const preaviso = h.siNo("Se dio el preaviso y se trabajó", false, "Si te despidieron sin avisarte con anticipación, dejalo en No. Si renunciaste sin avisar, también.");
  const ing = ingreso.ref;
  const eg = egreso.ref;
  h.pasoTitulo("Antigüedad");
  const a = antiguedadPy(h, ing, eg);
  const diario = h.paso("Salario diario", `${salario.ref}/${T.numero("py.divisor-salario-diario")}`);
  const diasPre = h.paso("Días de preaviso", preavisoDias(l, a), "entero");
  const anios = h.paso("Años indemnizables (más de seis meses suman uno)", aniosIndemnizables(ing, a), "entero");
  const indemBase = h.paso("Indemnización por despido sin causa", l.r(`${diario}*${T.numero("py.indemnizacion-dias-por-anio")}*${anios}`));
  const aviso = `IF(${eg}<${ing},"El último día de trabajo tiene que ser posterior a la fecha de ingreso.","")`;
  if (conLiq) {
    const b = h.bloque("liquidacion");
    const sinCausaTxt = "Me despidieron sin causa";
    const motivo = h.opcion(
      "Cómo termina el trabajo",
      [
        { valor: "despido", etiqueta: sinCausaTxt },
        { valor: "renuncia", etiqueta: "Renuncié" },
        { valor: "despido-con-causa", etiqueta: "Me despidieron con causa justificada" },
      ],
      "despido",
    );
    const cobrado = h.numero("Total cobrado este año desde enero (opcional)", null, { min: 0, ayuda: "Salario, horas extra y comisiones. Si lo dejás vacío, se estima con tu salario promedio." });
    const pend = h.numero("Días de vacaciones ya ganadas que no tomaste", 0, { formato: "entero", min: 0, max: 120 });
    const vencidas = h.siNo("Pasaron más de 6 meses desde que ganaste esas vacaciones", false, "Si te despiden después de ese plazo, se pagan el doble.");
    b.campo("motivo", motivo).campo("salario", salario).campo("ingreso", ingreso).campo("egreso", egreso).campo("preavisoCumplido", preaviso);
    b.campo("cobradoEnElAnio", cobrado).campo("vacacionesPendientes", pend).campo("vacacionesVencidas", vencidas);
    const sinCausa = `${motivo.ref}="${sinCausaTxt}"`;
    const renuncia = `${motivo.ref}="Renuncié"`;
    h.pasoTitulo("Liquidación");
    const pre = h.paso("Preaviso", `IF(AND(${sinCausa},${preaviso.ref}="No"),${l.r(`${diario}*${diasPre}`)},0)`);
    const desc = h.paso("Descuento por no dar preaviso", `IF(AND(${renuncia},${preaviso.ref}="No"),${l.r(`${diario}*${diasPre}/2`)},0)`);
    const ind = h.paso("Indemnización", `IF(${sinCausa},${indemBase},0)`);
    const vc = h.paso("Vacaciones causadas", l.r(`${diario}*${pend.ref}*IF(AND(NOT(${renuncia}),${vencidas.ref}="Sí"),2,1)`));
    const vacMapa = T.mapa("py.vacaciones-dias");
    const n = `(${a.anios}+1)`;
    const diasAnio = `IF(${n}>10,${vacMapa("mas-10")},IF(${n}>5,${vacMapa("hasta-10")},${vacMapa("hasta-5")}))`;
    const aniv = `EDATE(${ing},${a.anios}*12)`;
    const sig = `EDATE(${ing},(${a.anios}+1)*12)`;
    const diasProp = h.paso("Días de vacaciones proporcionales", `IF(${sinCausa},${diasAnio}*(${a.fin}-${aniv})/(${sig}-${aniv}),0)`, "numero");
    const vp = h.paso("Vacaciones proporcionales", l.r(`${diario}*${diasProp}`));
    const cob = h.paso(
      "Cobrado en el año",
      `IF(ISNUMBER(${cobrado.ref}),${cobrado.ref},${salario.ref}*(${eg}-MAX(DATE(YEAR(${eg}),1,1),${ing})+1)/${T.numero("py.divisor-salario-diario")})`,
    );
    const ag = h.paso("Aguinaldo proporcional", l.r(`${cob}/12`));
    h.seccion("TU LIQUIDACIÓN");
    h.aviso(aviso);
    h.resultado("Antigüedad", `${a.anios}&" años, "&${a.meses}&" meses y "&${a.dias}&" días"`, { formato: "texto" });
    b.resultado("preaviso", h.resultado("Preaviso", `${pre}`));
    b.resultado("indemnizacion", h.resultado("Indemnización", `${ind}`));
    b.resultado("vacacionesCausadas", h.resultado("Vacaciones ya ganadas", `${vc}`));
    b.resultado("diasProporcionales", h.resultado("Días de vacaciones proporcionales", `${diasProp}`, { formato: "numero" }));
    b.resultado("vacacionesProporcionales", h.resultado("Vacaciones proporcionales", `${vp}`));
    b.resultado("aguinaldo", h.resultado("Aguinaldo proporcional", `${ag}`));
    b.resultado("descuentoPreaviso", h.resultado("Descuento por no dar preaviso", `IF(${desc}=0,0,-${desc})`));
    b.resultado("total", h.resultado("Total", l.r(`${pre}+${ind}+${vc}+${vp}+${ag}-${desc}`), { total: true }));
    h.nota("Son montos brutos. Con causa justificada no hay indemnización ni preaviso. Con diez años o más tenés estabilidad, y en algunos casos la indemnización es el doble.");
  }
  if (conInd) {
    const b = h.bloque("indemnizacion-por-despido");
    b.campo("salario", salario).campo("ingreso", ingreso).campo("egreso", egreso).campo("preavisoTrabajado", preaviso);
    h.seccion("SOLO LA INDEMNIZACIÓN POR DESPIDO SIN CAUSA");
    if (!conLiq) h.aviso(aviso);
    const preI = h.paso("Preaviso no trabajado", `IF(${preaviso.ref}="Sí",0,${l.r(`${diario}*${diasPre}`)})`);
    b.resultado("anios", h.resultado("Años que se indemnizan", `${anios}`, { formato: "entero" }));
    b.resultado("indemnizacion", h.resultado("Indemnización", `${indemBase}`));
    b.resultado("diasPreaviso", h.resultado("Días de preaviso", `${diasPre}`, { formato: "entero" }));
    b.resultado("preaviso", h.resultado("Preaviso", `${preI}`));
    b.resultado("total", h.resultado("Indemnización más preaviso", l.r(`${indemBase}+${preI}`), { total: true }));
    b.resultado("indemnizacionDoble", h.resultado("Indemnización doble (con diez años o más)", `IF(${a.anios}>=10,${l.r(`${indemBase}*2`)},"")`));
  }
}

export const planillaPy: PlanillaPais = {
  mercado: "py",
  titulo: (anio) => `Planilla de salario y liquidación Paraguay ${anio}`,
  construir(l) {
    if (l.disponible("salario-neto")) salarioNeto(l);
    if (l.disponible("aguinaldo")) aguinaldo(l);
    liquidacion(l);
  },
};
