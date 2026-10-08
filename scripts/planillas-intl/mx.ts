import type { Hoja, Libro, PlanillaPais } from "./marco";
import { antiguedadPorAniversario, siOpcion } from "./formulas";

const PERIODO_NOMINA = [
  { valor: "quincenal", etiqueta: "Quincenal" },
  { valor: "mensual", etiqueta: "Mensual" },
  { valor: "semanal", etiqueta: "Semanal" },
  { valor: "decenal", etiqueta: "Decenal" },
] as const;

const PERIODO_SUELDO = [
  { valor: "mensual", etiqueta: "Al mes" },
  { valor: "quincenal", etiqueta: "A la quincena" },
  { valor: "semanal", etiqueta: "A la semana" },
  { valor: "diario", etiqueta: "Al día" },
] as const;

function diarioPorPeriodo(l: Libro, h: Hoja, sueldo: string, periodo: string): string {
  const divisor = siOpcion(periodo, [["Al mes", "30"], ["A la quincena", "15"], ["A la semana", "7"]], "1");
  return h.paso("Salario diario", l.r(`${sueldo}/${divisor}`));
}

// diasDeVacaciones de src/paises/mx/nomina.ts (LFT art. 76).
function diasVacaciones(anios: string, primerAnio: string): string {
  return `IF(${anios}<1,0,IF(${anios}<=5,${primerAnio}+2*(${anios}-1),${primerAnio}+8+2*ROUNDUP((${anios}-5)/5,0)))`;
}

function sueldoNeto(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Sueldo neto", "Sueldo neto: ISR, subsidio y cuotas del IMSS", "pones tu sueldo bruto y te dice cuánto ISR y cuánto IMSS te descuentan, y cuánto recibes.");
  const b = h.bloque("sueldo-neto");
  h.seccion("TUS DATOS");
  const sueldo = h.numero("Sueldo bruto del periodo", 10000, { min: 0 });
  const periodo = h.opcion("Cada cuánto te pagan", PERIODO_NOMINA, "quincenal");
  const region = h.region("Dónde trabajas", T.porRegion("mx.salario-minimo"), "general");
  const antig = h.numero("Años que llevas en la empresa", 1, { formato: "entero", min: 0, max: 60, ayuda: "Sirve para estimar tu salario base de cotización del IMSS." });
  const sbcIn = h.numero("Salario base de cotización diario (opcional)", null, {
    min: 0,
    ayuda: "Viene en tu recibo de nómina como SBC. Si lo dejas vacío, se estima con las prestaciones mínimas de ley.",
  });
  b.campo("sueldo", sueldo).campo("periodo", periodo).campo("region", region).campo("antiguedad", antig).campo("sbc", sbcIn);

  const p = periodo.ref;
  const s = sueldo.ref;
  h.pasoTitulo("Salario diario y salario mínimo");
  const dias = h.paso("Días del periodo", siOpcion(p, [["Mensual", "30.4"], ["Quincenal", "15"], ["Semanal", "7"]], "10"), "numero");
  const divisor = h.paso("Divisor del salario diario (LFT art. 89)", `IF(${p}="Mensual",30,${dias})`, "numero");
  const diario = h.paso("Salario diario", l.r(`${s}/${divisor}`));
  const minimo = h.paso("Salario mínimo diario de tu zona", T.porRegion("mx.salario-minimo").de(region.ref));
  const ganaMinimo = h.paso("¿Ganas el salario mínimo?", `IF(${diario}<=${minimo},"Sí","No")`, "texto");

  h.pasoTitulo("ISR");
  const tarifa = (id: string) => h.escala(T.escala(id), s);
  const isrTarifa = siOpcion(
    p,
    [
      ["Semanal", tarifa("mx.tarifa-isr-semanal")],
      ["Decenal", tarifa("mx.tarifa-isr-decenal")],
      ["Quincenal", tarifa("mx.tarifa-isr-quincenal")],
    ],
    tarifa("mx.tarifa-isr-mensual"),
  );
  const isr = h.paso("ISR según la tarifa del periodo", `IF(${ganaMinimo}="Sí",0,${l.r(isrTarifa)})`);
  const subMensual = h.paso("Subsidio para el empleo al mes", `${T.numero("mx.uma-mensual")}*${T.numero("mx.subsidio-empleo")}/100`);
  const subPeriodo = h.paso("Subsidio del periodo", `IF(${p}="Mensual",${subMensual},${subMensual}/30.4*${dias})`);
  const ingresoMensual = h.paso("Ingreso mensual", `IF(${p}="Mensual",${s},${s}/${dias}*30.4)`);
  const subsidio = h.paso(
    "Subsidio que te toca",
    `IF(${ganaMinimo}="Sí",0,IF(${ingresoMensual}<=${T.numero("mx.subsidio-empleo-limite")},MIN(${l.r(subPeriodo)},${isr}),0))`,
  );
  const isrRetenido = h.paso("ISR que te retienen", l.r(`${isr}-${subsidio}`));

  h.pasoTitulo("Cuotas del IMSS");
  const vac = h.paso("Días de vacaciones de tu año", diasVacaciones(`MAX(1,${antig.ref})`, T.numero("mx.vacaciones-primer-anio")), "entero");
  const factor = h.paso(
    "Factor de integración",
    `1+(${T.numero("mx.dias-aguinaldo")}+${vac}*${T.numero("mx.prima-vacacional")}/100)/365`,
    "factor",
  );
  const uma = T.numero("mx.uma-diaria");
  const sbcSinTope = h.paso("SBC antes del tope", `IF(ISNUMBER(${sbcIn.ref}),${sbcIn.ref},${l.r(`${diario}*${factor}`)})`);
  const sbc = h.paso("Salario base de cotización", `MIN(MAX(${sbcSinTope},${minimo}),${T.numero("mx.tope-sbc-imss")}*${uma})`);
  const cuota = T.mapa("mx.cuotas-imss-obrero");
  const sobreSbc = h.paso(
    "Cuotas sobre el SBC (%)",
    `${cuota("prestaciones-dinero")}+${cuota("gastos-medicos-pensionados")}+${cuota("invalidez-vida")}+${cuota("cesantia-vejez")}`,
    "porcentaje",
  );
  const excedente = h.paso("Excedente de 3 UMA", `MAX(0,${sbc}-${T.numero("mx.umbral-excedente-imss")}*${uma})`);
  const imssDiario = h.paso("IMSS por día", `${sbc}*${sobreSbc}/100+${excedente}*${cuota("excedente-eym")}/100`, "numero");
  const imss = h.paso("IMSS del periodo", `IF(${ganaMinimo}="Sí",0,${l.r(`${imssDiario}*${dias}`)})`);

  h.seccion("TU RECIBO");
  b.resultado("diario", h.resultado("Salario diario", `${diario}`));
  b.resultado("sbc", h.resultado("Salario base de cotización (IMSS)", l.r(sbc)));
  b.resultado("isr", h.resultado("ISR según la tarifa", `${isr}`));
  b.resultado("subsidio", h.resultado("Subsidio para el empleo", `${subsidio}`));
  b.resultado("isrRetenido", h.resultado("ISR que te retienen", `${isrRetenido}`));
  b.resultado("imss", h.resultado("Cuotas del IMSS", `${imss}`));
  b.resultado("neto", h.resultado("Sueldo neto", l.r(`${s}-${isrRetenido}-${imss}`), { total: true }));
  h.nota(
    "Si ganas el salario mínimo no te retienen ISR y tu empresa paga tus cuotas del IMSS (LISR art. 96 y LSS art. 36). Si dejas vacío el SBC, se estima con 15 días de aguinaldo y la prima vacacional mínima.",
  );
}

function retencionMensual(l: Libro, h: Hoja, etiqueta: string, base: string, subsidio: string): string {
  const T = l.tablas;
  const isr = h.paso(`ISR de ${etiqueta}`, l.r(h.escala(T.escala("mx.tarifa-isr-mensual"), base)));
  return h.paso(
    `Retención de ${etiqueta}`,
    l.r(`${isr}-IF(${base}<=${T.numero("mx.subsidio-empleo-limite")},MIN(${l.r(subsidio)},${isr}),0)`),
  );
}

function aguinaldo(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Aguinaldo", "Aguinaldo: monto, parte exenta e ISR", "calcula tu aguinaldo completo o proporcional, la parte que no paga ISR y el ISR estimado.");
  const b = h.bloque("aguinaldo");
  h.seccion("TUS DATOS");
  const sueldo = h.numero("Tu sueldo bruto", 15000, { min: 0 });
  const periodo = h.opcion("Ese sueldo es", PERIODO_SUELDO, "mensual");
  const diasTrab = h.numero("Días que trabajaste este año", 365, { formato: "entero", min: 1, max: 366, ayuda: "Si entraste a mitad de año, cuenta desde tu primer día." });
  const diasIn = h.numero("Días de aguinaldo que da tu empresa (opcional)", null, { formato: "entero", min: 1, ayuda: "Déjalo vacío si no lo sabes: se usa el mínimo de ley." });
  const region = h.region("Dónde trabajas", T.porRegion("mx.salario-minimo"), "general");
  b.campo("sueldo", sueldo).campo("periodo", periodo).campo("diasTrabajados", diasTrab).campo("diasAguinaldo", diasIn).campo("region", region);

  const legal = T.numero("mx.dias-aguinaldo");
  h.pasoTitulo("Aguinaldo");
  const diario = diarioPorPeriodo(l, h, sueldo.ref, periodo.ref);
  const dias = h.paso("Días de aguinaldo", `IF(ISNUMBER(${diasIn.ref}),${diasIn.ref},${legal})`, "entero");
  const monto = h.paso("Aguinaldo bruto", l.r(`${diario}*${dias}*MIN(${diasTrab.ref},365)/365`));
  const minimo = h.paso("Salario mínimo diario de tu zona", T.porRegion("mx.salario-minimo").de(region.ref));
  const ganaMinimo = h.paso("¿Ganas el salario mínimo?", `IF(${diario}<=${minimo},"Sí","No")`, "texto");
  const tope = h.paso("Tope exento (30 UMA)", l.r(`${T.numero("mx.exencion-aguinaldo")}*${T.numero("mx.uma-diaria")}`));
  const exento = h.paso("Parte exenta", `IF(${ganaMinimo}="Sí",${monto},MIN(${monto},${tope}))`);
  const gravado = h.paso("Parte gravada", l.r(`${monto}-${exento}`));
  h.pasoTitulo("ISR del aguinaldo (artículo 96 de la LISR)");
  const mensual = h.paso("Sueldo mensual (diario por 30.4)", l.r(`${diario}*30.4`));
  const subsidio = h.paso("Subsidio para el empleo al mes", `${T.numero("mx.uma-mensual")}*${T.numero("mx.subsidio-empleo")}/100`);
  const base1 = h.paso("Sueldo más aguinaldo gravado", `${mensual}+${gravado}`);
  const conAg = retencionMensual(l, h, "sueldo más aguinaldo", base1, subsidio);
  const sinAg = retencionMensual(l, h, "solo el sueldo", mensual, subsidio);
  const isr = h.paso("ISR del aguinaldo", `IF(${gravado}>0,${l.r(`MAX(0,${conAg}-${sinAg})`)},0)`);

  h.seccion("TU AGUINALDO");
  h.aviso(`IF(AND(ISNUMBER(${diasIn.ref}),${diasIn.ref}<${legal}),"La ley pide al menos "&${legal}&" días de aguinaldo.","")`);
  b.resultado("diario", h.resultado("Salario diario", `${diario}`));
  b.resultado("dias", h.resultado("Días de aguinaldo por año completo", `${dias}`, { formato: "dias" }));
  b.resultado("aguinaldo", h.resultado("Aguinaldo bruto", `${monto}`));
  b.resultado("exento", h.resultado("Parte que no paga ISR", `${exento}`));
  b.resultado("gravado", h.resultado("Parte que paga ISR", `${gravado}`));
  b.resultado("isr", h.resultado("ISR estimado", `${isr}`));
  b.resultado("neto", h.resultado("Aguinaldo que recibes", l.r(`${monto}-${isr}`), { total: true }));
  h.nota("Se paga antes del 20 de diciembre (LFT art. 87). El ISR es una estimación: tu empresa puede usar otro método que permite la ley y el monto cambia un poco.");
}

function terminacion(l: Libro): void {
  const T = l.tablas;
  const conFiniquito = l.disponible("finiquito");
  const conLiquidacion = l.disponible("liquidacion");
  if (!conFiniquito && !conLiquidacion) return;
  const h = l.hoja(
    "Finiquito y liquidación",
    "Finiquito y liquidación por despido",
    "pones tus fechas y tu sueldo, y te dice el finiquito (salarios, aguinaldo, vacaciones y primas) y, si te despidieron sin causa justificada, la liquidación.",
  );
  const fin = conFiniquito ? h.bloque("finiquito") : null;
  const liq = conLiquidacion ? h.bloque("liquidacion") : null;
  h.seccion("TUS DATOS");
  const motivo = conFiniquito
    ? h.opcion(
        "Cómo termina tu trabajo",
        [
          { valor: "renuncia", etiqueta: "Renuncié" },
          { valor: "despido", etiqueta: "Me despidieron o terminó el contrato" },
        ],
        "renuncia",
      )
    : null;
  const sueldo = h.numero("Tu sueldo bruto", 15000, { min: 0 });
  const periodo = h.opcion("Ese sueldo es", PERIODO_SUELDO, "mensual");
  const ingreso = h.fecha("Fecha en que entraste a trabajar", "2023-03-01");
  const salida = h.fecha("Último día de trabajo", l.hoy);
  const region = h.region("Dónde trabajas", T.porRegion("mx.salario-minimo"), "general");
  const pendientes = h.numero("Días trabajados que todavía no te pagan", 0, { formato: "entero", min: 0, max: 31 });
  const vacPend = h.numero("Días de vacaciones de años anteriores que no tomaste", 0, { formato: "numero", min: 0, max: 200 });
  const diasIn = h.numero("Días de aguinaldo que da tu empresa (opcional)", null, { formato: "entero", min: 1, ayuda: "Déjalo vacío si no lo sabes: se usa el mínimo de ley." });
  const primaIn = h.numero("Prima vacacional que da tu empresa, en % (opcional)", null, { formato: "porcentaje", min: 0, max: 100, ayuda: "Déjalo vacío si no lo sabes: se usa el mínimo de ley." });
  for (const b of [fin, liq]) {
    if (!b) continue;
    b.campo("sueldo", sueldo).campo("periodo", periodo).campo("ingreso", ingreso).campo("salida", salida).campo("region", region);
    b.campo("diasPendientes", pendientes).campo("vacacionesPendientes", vacPend).campo("diasAguinaldo", diasIn).campo("prima", primaIn);
  }
  if (fin && motivo) fin.campo("motivo", motivo);

  h.pasoTitulo("Antigüedad");
  const ant = antiguedadPorAniversario(h, ingreso.ref, salida.ref);
  h.pasoTitulo("Finiquito");
  const diario = diarioPorPeriodo(l, h, sueldo.ref, periodo.ref);
  const legalAg = T.numero("mx.dias-aguinaldo");
  const legalPrima = T.numero("mx.prima-vacacional");
  const diasAg = h.paso("Días de aguinaldo", `IF(ISNUMBER(${diasIn.ref}),${diasIn.ref},${legalAg})`, "entero");
  const tasaPrima = h.paso("Prima vacacional (%)", `IF(ISNUMBER(${primaIn.ref}),${primaIn.ref},${legalPrima})`, "porcentaje");
  const salarios = h.paso("Días trabajados sin pagar", l.r(`${diario}*${pendientes.ref}`));
  const ag = h.paso("Aguinaldo proporcional", l.r(`${diario}*${diasAg}*MIN(${ant.diasEnElAnio},365)/365`));
  const diasVacAnio = h.paso("Vacaciones del año en curso (días por año)", diasVacaciones(`${ant.aniosCompletos}+1`, T.numero("mx.vacaciones-primer-anio")), "entero");
  const diasVacProp = h.paso("Vacaciones proporcionales (días)", `${diasVacAnio}*${ant.diasDesdeAniversario}/365`, "numero");
  const vac = h.paso("Vacaciones", l.r(`${diario}*(${diasVacProp}+${vacPend.ref})`));
  const primaVac = h.paso("Prima vacacional", l.r(`${vac}*${tasaPrima}/100`));
  const minimo = h.paso("Salario mínimo diario de tu zona", T.porRegion("mx.salario-minimo").de(region.ref));
  const baseAnt = h.paso("Salario para la prima de antigüedad", `MIN(MAX(${diario},${minimo}),${T.numero("mx.tope-prima-antiguedad")}*${minimo})`);
  const primaAntCompleta = h.paso("Prima de antigüedad (12 días por año)", l.r(`${baseAnt}*${T.numero("mx.dias-prima-antiguedad")}*${ant.anios}`));

  const avisoMinimos = `IF(AND(ISNUMBER(${diasIn.ref}),${diasIn.ref}<${legalAg}),"La ley pide al menos "&${legalAg}&" días de aguinaldo. ","")&IF(AND(ISNUMBER(${primaIn.ref}),${primaIn.ref}<${legalPrima}),"La prima vacacional no puede ser menor al "&${legalPrima}&" %.","")`;

  if (fin && motivo) {
    const pagaAnt = h.paso(
      "¿Se paga la prima de antigüedad?",
      `IF(OR(${motivo.ref}="Me despidieron o terminó el contrato",${ant.anios}>=${T.numero("mx.anios-prima-antiguedad-renuncia")}),"Sí","No")`,
      "texto",
    );
    const primaAnt = h.paso("Prima de antigüedad del finiquito", `IF(${pagaAnt}="Sí",${primaAntCompleta},0)`);
    h.seccion("TU FINIQUITO");
    h.aviso(avisoMinimos);
    fin.resultado("antiguedad", h.resultado("Antigüedad", l.r(ant.anios), { formato: "anios", ayuda: "En años." }));
    fin.resultado("diario", h.resultado("Salario diario", `${diario}`));
    fin.resultado("salarios", h.resultado("Días trabajados sin pagar", `${salarios}`));
    fin.resultado("aguinaldo", h.resultado("Aguinaldo proporcional", `${ag}`));
    fin.resultado("vacaciones", h.resultado("Vacaciones", `${vac}`));
    fin.resultado("primaVacacional", h.resultado("Prima vacacional", `${primaVac}`));
    fin.resultado("primaAntiguedad", h.resultado("Prima de antigüedad", `${primaAnt}`, { ayuda: "Al renunciar, solo con 15 años de servicio o más." }));
    fin.resultado("total", h.resultado("Total del finiquito", l.r(`${salarios}+${ag}+${vac}+${primaVac}+${primaAnt}`), { total: true }));
  }

  if (liq) {
    h.seccion("SI TE DESPIDIERON SIN CAUSA JUSTIFICADA");
    const sdiIn = h.numero("Salario diario integrado (opcional)", null, {
      min: 0,
      ayuda: "Tu salario diario más la parte de aguinaldo, prima vacacional y otras prestaciones. Si lo dejas vacío, se usa tu salario diario.",
    });
    const veinte = h.siNo(
      "Sumar los 20 días por año del artículo 50",
      false,
      "Proceden cuando la empresa se niega a reinstalarte o en los casos del artículo 49 de la ley. Muchas empresas los pagan al negociar.",
    );
    liq.campo("sdi", sdiIn).campo("veinteDias", veinte);
    h.pasoTitulo("Liquidación");
    const sdi = h.paso("Salario diario para la indemnización", `MAX(IF(ISNUMBER(${sdiIn.ref}),${sdiIn.ref},${diario}),${diario})`);
    const indem = h.paso("Indemnización constitucional (3 meses)", l.r(`${sdi}*${T.numero("mx.meses-indemnizacion")}*30`));
    const veinteDias = h.paso("Días por año de servicio", `IF(${veinte.ref}="Sí",${l.r(`${sdi}*${T.numero("mx.dias-indemnizacion-anio")}*${ant.anios}`)},0)`);
    const separacion = h.paso("Pagos por separación", l.r(`${indem}+${veinteDias}+${primaAntCompleta}`));
    const aniosEx = h.paso("Años para la exención (más de 6 meses cuentan como año)", `MAX(1,${ant.aniosCompletos}+IF(${ant.diasDesdeAniversario}>182,1,0))`, "entero");
    const exento = h.paso("Parte exenta de ISR", `MIN(${separacion},${l.r(`${T.numero("mx.exencion-indemnizacion")}*${T.numero("mx.uma-diaria")}*${aniosEx}`)})`);
    const finiq = h.paso("Finiquito sin prima de antigüedad", l.r(`${salarios}+${ag}+${vac}+${primaVac}`));
    if (!fin) h.aviso(avisoMinimos);
    liq.resultado("antiguedad", h.resultado("Antigüedad", l.r(ant.anios), { formato: "anios", ayuda: "En años." }));
    liq.resultado("sdi", h.resultado("Salario diario para la indemnización", l.r(sdi)));
    liq.resultado("indemnizacion", h.resultado("Indemnización constitucional", `${indem}`));
    liq.resultado("veinteDias", h.resultado("Días por año de servicio", `${veinteDias}`));
    liq.resultado("primaAntiguedad", h.resultado("Prima de antigüedad", `${primaAntCompleta}`));
    liq.resultado("finiquito", h.resultado("Finiquito (salarios, aguinaldo y vacaciones)", `${finiq}`));
    liq.resultado("exento", h.resultado("Parte de la indemnización que no paga ISR", `${exento}`));
    liq.resultado("total", h.resultado("Total de la liquidación", l.r(`${separacion}+${finiq}`), { total: true }));
    h.nota("Los salarios vencidos (hasta 12 meses si llegas a juicio y lo ganas) no están incluidos. Son montos brutos: la parte de la indemnización que pasa el límite exento paga ISR.");
  }
}

export const planillaMx: PlanillaPais = {
  mercado: "mx",
  titulo: (anio) => `Planilla de sueldo y finiquito México ${anio}`,
  construir(l) {
    if (l.disponible("sueldo-neto")) sueldoNeto(l);
    if (l.disponible("aguinaldo")) aguinaldo(l);
    terminacion(l);
  },
};
