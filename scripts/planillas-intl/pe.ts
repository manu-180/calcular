import type { Entrada, Hoja, Libro, PlanillaPais } from "./marco";
import { aniosMesesDias, mesesCalendarioCompletos, mesesCalendarioYDias, siOpcion } from "./formulas";

const REGIMEN = [
  { valor: "general", etiqueta: "Régimen general" },
  { valor: "pequena", etiqueta: "Pequeña empresa (REMYPE)" },
  { valor: "micro", etiqueta: "Microempresa (REMYPE)" },
] as const;
const MICRO = "Microempresa (REMYPE)";

function porRegimen(l: Libro, regimen: string, id: string, conMicro: boolean): string {
  const m = l.tablas.mapa(id);
  return siOpcion(regimen, [["Régimen general", m("general")], ["Pequeña empresa (REMYPE)", m("pequena")]], conMicro ? m("micro") : "0");
}

function asignacion(l: Libro, h: Hoja, af: Entrada): string {
  const T = l.tablas;
  return h.paso("Asignación familiar", `IF(${af.ref}="Sí",${l.r(`${T.numero("pe.rmv")}*${T.numero("pe.asignacion-familiar")}/100`)},0)`);
}

const variable = (e: Entrada) => `IF(ISNUMBER(${e.ref}),${e.ref},0)`;

function sueldoNeto(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Sueldo neto", "Sueldo neto: AFP u ONP y renta de quinta", "pones tu sueldo y te dice el descuento de pensión (AFP u ONP), la retención de quinta categoría y tu sueldo neto.");
  const b = h.bloque("sueldo-neto");
  h.seccion("TUS DATOS");
  const sueldo = h.numero("Sueldo mensual bruto", 3000, { min: 0 });
  const af = h.siNo("Cobras asignación familiar", false);
  const sistema = h.opcion(
    "Sistema de pensiones",
    [
      { valor: "afp", etiqueta: "AFP (sistema privado)" },
      { valor: "onp", etiqueta: "ONP (sistema nacional)" },
    ],
    "afp",
  );
  const comisiones = T.mapa("pe.comision-afp");
  const afp = h.opcionDato("Tu AFP", comisiones, "habitat");
  const esquema = h.opcion(
    "Tipo de comisión de tu AFP",
    [
      { valor: "saldo", etiqueta: "Sobre el saldo (mixta)" },
      { valor: "flujo", etiqueta: "Sobre el sueldo (flujo)" },
    ],
    "saldo",
    "Si entraste a la AFP desde 2013 o no elegiste nada, tienes comisión sobre el saldo.",
  );
  const gratis = h.opcion(
    "Gratificaciones de julio y diciembre",
    [
      { valor: "completas", etiqueta: "Sí: un sueldo cada una" },
      { valor: "medias", etiqueta: "Sí: medio sueldo cada una" },
      { valor: "ninguna", etiqueta: "No recibo gratificaciones" },
    ],
    "completas",
    "Medio sueldo es lo que paga la pequeña empresa del régimen especial.",
  );
  const bonif = T.mapa("pe.bonificacion-extraordinaria");
  const seguro = h.opcionDato("Tu seguro de salud", bonif, "essalud");
  b.campo("sueldo", sueldo).campo("asignacionFamiliar", af).campo("sistema", sistema).campo("afp", afp).campo("esquema", esquema).campo("gratificaciones", gratis).campo("seguro", seguro);

  const uit = T.numero("pe.uit");
  h.pasoTitulo("Pensión");
  const asig = asignacion(l, h, af);
  const bruto = h.paso("Sueldo bruto", l.r(`${sueldo.ref}+${asig}`));
  const esAfp = `${sistema.ref}="AFP (sistema privado)"`;
  const onp = h.paso("Aporte a la ONP", `IF(${esAfp},0,${l.r(`${bruto}*${T.numero("pe.aporte-onp")}/100`)})`);
  const aporteAfp = h.paso("Aporte al fondo AFP", `IF(${esAfp},${l.r(`${bruto}*${T.numero("pe.aporte-afp")}/100`)},0)`);
  const prima = h.paso("Prima de seguro AFP", `IF(${esAfp},${l.r(`MIN(${bruto},${T.numero("pe.rma-afp")})*${T.numero("pe.prima-seguro-afp")}/100`)},0)`);
  const tasaComision = h.paso(
    "Comisión sobre el sueldo (%)",
    `IF(${esquema.ref}="Sobre el sueldo (flujo)",${comisiones.de(afp.ref)},${T.numero("pe.comision-mixta-flujo")})`,
    "porcentaje",
  );
  const comision = h.paso("Comisión de la AFP", `IF(${esAfp},${l.r(`${bruto}*${tasaComision}/100`)},0)`);
  const pension = h.paso("Total de pensión", l.r(`${onp}+${aporteAfp}+${prima}+${comision}`));
  h.pasoTitulo("Renta de quinta categoría");
  const sueldosGrati = siOpcion(gratis.ref, [["Sí: un sueldo cada una", "2"], ["Sí: medio sueldo cada una", "1"]], "0");
  const grat = h.paso("Gratificaciones del año", l.r(`${bruto}*${sueldosGrati}`));
  const bon = h.paso("Bonificación extraordinaria del año", l.r(`${grat}*${bonif.de(seguro.ref)}/100`));
  const anual = h.paso("Ingreso del año", l.r(`${bruto}*12+${grat}+${bon}`));
  const neta = h.paso("Renta neta (menos 7 UIT)", `MAX(0,${l.r(`${anual}-${T.numero("pe.deduccion-renta-trabajo")}*${uit}`)})`);
  const impuesto = h.marginal("Impuesto anual", T.escala("pe.escala-renta-trabajo"), neta, uit);
  const quinta = h.paso("Retención de quinta del mes", l.r(`${l.r(impuesto)}/12`));

  h.seccion("TU SUELDO NETO");
  b.resultado("bruto", h.resultado("Sueldo bruto", `${bruto}`));
  b.resultado("onp", h.resultado("Aporte a la ONP", `${onp}`));
  b.resultado("aporteAfp", h.resultado("Aporte a tu fondo AFP", `${aporteAfp}`));
  b.resultado("primaSeguro", h.resultado("Prima de seguro AFP", `${prima}`));
  b.resultado("comision", h.resultado("Comisión de la AFP", `${comision}`));
  b.resultado("pension", h.resultado("Total de descuento de pensión", `${pension}`));
  b.resultado("quinta", h.resultado("Retención de quinta categoría", `${quinta}`));
  b.resultado("neto", h.resultado("Sueldo neto", l.r(`${bruto}-${pension}-${quinta}`), { total: true }));
  h.nota("La retención de quinta es un promedio mensual: la empresa la ajusta en el año si cambian tus ingresos. Con comisión sobre el saldo, la AFP no te descuenta comisión del sueldo.");
}

function gratificacionYCts(l: Libro): void {
  const T = l.tablas;
  const conGrati = l.disponible("gratificacion");
  const conCts = l.disponible("cts");
  if (!conGrati && !conCts) return;
  const h = l.hoja("Gratificación y CTS", "Gratificación de julio y diciembre, y depósito de CTS", "calcula la gratificación con su bonificación extraordinaria y el depósito de CTS de mayo o noviembre.");
  h.seccion("TUS DATOS");
  const sueldo = h.numero("Sueldo mensual", 3000, { min: 0, ayuda: "Tu remuneración básica, sin descuentos." });
  const af = h.siNo("Cobras asignación familiar", false);
  const varIn = h.numero("Promedio mensual de pagos variables (opcional)", null, {
    min: 0,
    ayuda: "Comisiones, horas extras u otros pagos que recibiste al menos 3 meses del semestre. Déjalo vacío si no tienes.",
  });
  const regimen = h.opcion("Régimen laboral de tu empleador", REGIMEN, "general");
  const asig = asignacion(l, h, af);
  const esMicro = `${regimen.ref}="${MICRO}"`;
  if (conGrati) {
    const b = h.bloque("gratificacion");
    h.seccion("GRATIFICACIÓN");
    const meses = h.numero("Meses completos trabajados en el semestre", 6, { formato: "entero", min: 0, max: 6 });
    const bonif = T.mapa("pe.bonificacion-extraordinaria");
    const seguro = h.opcionDato("Tu seguro de salud", bonif, "essalud");
    b.campo("sueldo", sueldo).campo("asignacionFamiliar", af).campo("variable", varIn).campo("meses", meses).campo("regimen", regimen).campo("seguro", seguro);
    h.pasoTitulo("Gratificación");
    const rem = h.paso("Remuneración computable de la gratificación", l.r(`${sueldo.ref}+${asig}+${variable(varIn)}`));
    const grat = h.paso("Gratificación", `IF(${esMicro},0,${l.r(`${rem}*${porRegimen(l, regimen.ref, "pe.gratificacion-por-regimen", false)}*${meses.ref}/6`)})`);
    const bon = h.paso("Bonificación extraordinaria", `IF(${esMicro},0,${l.r(`${grat}*${bonif.de(seguro.ref)}/100`)})`);
    b.resultado("remuneracion", h.resultado("Remuneración que se usa para el cálculo", `${rem}`));
    b.resultado("asignacion", h.resultado("Asignación familiar incluida", `${asig}`));
    b.resultado("gratificacion", h.resultado("Gratificación", `${grat}`));
    b.resultado("bonificacion", h.resultado("Bonificación extraordinaria", `${bon}`));
    b.resultado("total", h.resultado("Total a cobrar", l.r(`${grat}+${bon}`), { total: true }));
    h.nota("Se paga en la primera quincena de julio y de diciembre. En la microempresa del régimen especial no se paga gratificación.");
  }
  if (conCts) {
    const b = h.bloque("cts");
    h.seccion("CTS");
    const gratIn = h.numero("Gratificación que cobraste en el semestre (opcional)", null, {
      min: 0,
      ayuda: "La de diciembre para el depósito de mayo y la de julio para el de noviembre, sin la bonificación. Se suma un sexto.",
    });
    const meses = h.numero("Meses completos trabajados en el semestre de la CTS", 6, { formato: "entero", min: 0, max: 6 });
    const dias = h.numero("Días sueltos, además de los meses", 0, { formato: "entero", min: 0, max: 29 });
    b.campo("sueldo", sueldo).campo("asignacionFamiliar", af).campo("variable", varIn).campo("gratificacion", gratIn).campo("meses", meses).campo("dias", dias).campo("regimen", regimen);
    h.pasoTitulo("CTS");
    const sexto = h.paso("Sexto de la gratificación", l.r(`${variable(gratIn)}/6`));
    const rem = h.paso("Remuneración computable de la CTS", l.r(`${sueldo.ref}+${asig}+${variable(varIn)}+${sexto}`));
    const factor = porRegimen(l, regimen.ref, "pe.cts-por-regimen", false);
    const porMeses = h.paso("CTS por los meses", `IF(${esMicro},0,${l.r(`${rem}*${factor}/12*${meses.ref}`)})`);
    const porDias = h.paso("CTS por los días", `IF(${esMicro},0,${l.r(`${rem}*${factor}/360*${dias.ref}`)})`);
    b.resultado("remuneracion", h.resultado("Remuneración computable", `${rem}`));
    b.resultado("sextoGratificacion", h.resultado("Sexto de la gratificación incluido", `${sexto}`));
    b.resultado("porMeses", h.resultado("Por los meses completos", `${porMeses}`));
    b.resultado("porDias", h.resultado("Por los días sueltos", `${porDias}`));
    b.resultado("total", h.resultado("Depósito de CTS", l.r(`${porMeses}+${porDias}`), { total: true }));
    h.nota("Se deposita en la cuenta CTS en los primeros 15 días de mayo y de noviembre. En la microempresa del régimen especial no hay CTS.");
  }
}

function liquidacion(l: Libro): void {
  const T = l.tablas;
  const conLiq = l.disponible("liquidacion-de-beneficios-sociales");
  const conDesp = l.disponible("indemnizacion-por-despido-arbitrario");
  if (!conLiq && !conDesp) return;
  const h = l.hoja(
    "Liquidación",
    "Liquidación de beneficios sociales e indemnización",
    "pones tus fechas y tu sueldo, y te dice la CTS trunca, la gratificación trunca, las vacaciones y, si te despidieron sin causa, la indemnización.",
  );
  h.seccion("TUS DATOS");
  const ingreso = h.fecha("Fecha de ingreso", "2023-03-01");
  const cese = h.fecha("Último día de trabajo", l.hoy);
  const sueldo = h.numero("Último sueldo mensual", 3000, { min: 0 });
  const af = h.siNo("Cobras asignación familiar", false);
  const varIn = h.numero("Promedio mensual de pagos variables (opcional)", null, { min: 0, ayuda: "Comisiones, horas extras u otros pagos regulares. Déjalo vacío si no tienes." });
  const regimen = h.opcion("Régimen laboral de tu empleador", REGIMEN, "general");
  const asig = asignacion(l, h, af);
  const rem = h.paso("Remuneración computable", l.r(`${sueldo.ref}+${asig}+${variable(varIn)}`));
  const esMicro = `${regimen.ref}="${MICRO}"`;
  const ing = ingreso.ref;
  const c = cese.ref;
  h.pasoTitulo("Tiempo de servicio");
  const serv = aniosMesesDias(h, "Servicio", ing, c);
  const aviso = `IF(${c}<${ing},"El último día de trabajo tiene que ser posterior a la fecha de ingreso.","")`;

  if (conLiq) {
    const b = h.bloque("liquidacion-de-beneficios-sociales");
    const ultGrat = h.numero("Última gratificación que cobraste (opcional)", null, { min: 0, ayuda: "Sin la bonificación extraordinaria. Un sexto se suma a la CTS trunca." });
    const pend = h.numero("Días de vacaciones ganadas que no tomaste", 0, { formato: "entero", min: 0, max: 120 });
    const bonif = T.mapa("pe.bonificacion-extraordinaria");
    const seguro = h.opcionDato("Tu seguro de salud", bonif, "essalud");
    b.campo("fechaIngreso", ingreso).campo("fechaCese", cese).campo("sueldo", sueldo).campo("asignacionFamiliar", af).campo("variable", varIn);
    b.campo("ultimaGratificacion", ultGrat).campo("diasPendientes", pend).campo("regimen", regimen).campo("seguro", seguro);
    const unMes = `OR(${serv.anios}>0,${serv.meses}>0)`;
    h.pasoTitulo("CTS trunca");
    const inicioCts = `IF(MONTH(${c})>=11,DATE(YEAR(${c}),11,1),IF(MONTH(${c})>=5,DATE(YEAR(${c}),5,1),DATE(YEAR(${c})-1,11,1)))`;
    const pc = mesesCalendarioYDias(h, "CTS", `MAX(${ing},${inicioCts})`, c);
    const rc = h.paso("Remuneración de la CTS (con un sexto de la gratificación)", `${rem}+${l.r(`${variable(ultGrat)}/6`)}`);
    const fCts = porRegimen(l, regimen.ref, "pe.cts-por-regimen", false);
    const cts = h.paso("CTS trunca", `IF(AND(NOT(${esMicro}),${unMes}),${l.r(`${rc}*${fCts}/12*${pc.meses}+${rc}*${fCts}/360*${pc.dias}`)},0)`);
    h.pasoTitulo("Gratificación trunca");
    const inicioSem = `DATE(YEAR(${c}),IF(MONTH(${c})<=6,1,7),1)`;
    const mesesGrati = h.paso("Meses completos del semestre", mesesCalendarioCompletos(`MAX(${ing},${inicioSem})`, c), "entero");
    const grat = h.paso("Gratificación trunca", `IF(${esMicro},0,${l.r(`${rem}*${porRegimen(l, regimen.ref, "pe.gratificacion-por-regimen", false)}*${mesesGrati}/6`)})`);
    const bon = h.paso("Bonificación extraordinaria", `IF(${esMicro},0,${l.r(`${grat}*${bonif.de(seguro.ref)}/100`)})`);
    h.pasoTitulo("Vacaciones");
    const remVac = h.paso("Remuneración vacacional", `${rem}*${porRegimen(l, regimen.ref, "pe.vacaciones-por-regimen", true)}/30`);
    const vacT = h.paso("Vacaciones truncas", `IF(${unMes},${l.r(`${remVac}/12*${serv.meses}+${remVac}/360*${serv.dias}`)},0)`);
    const vacP = h.paso("Vacaciones ganadas no tomadas", l.r(`${rem}/30*${pend.ref}`));
    h.seccion("TU LIQUIDACIÓN");
    h.aviso(aviso);
    b.resultado("remuneracion", h.resultado("Remuneración computable", `${rem}`));
    b.resultado("ctsTrunca", h.resultado("CTS trunca", `${cts}`));
    b.resultado("gratificacion", h.resultado("Gratificación trunca", `${grat}`));
    b.resultado("bonificacion", h.resultado("Bonificación extraordinaria", `${bon}`));
    b.resultado("vacacionesTruncas", h.resultado("Vacaciones truncas", `${vacT}`));
    b.resultado("vacacionesPendientes", h.resultado("Vacaciones ganadas no tomadas", `${vacP}`));
    b.resultado("total", h.resultado("Total de la liquidación", l.r(`${cts}+${grat}+${bon}+${vacT}+${vacP}`), { total: true }));
    b.resultado("mesesCts", h.resultado("Meses que cuenta la CTS trunca", `${pc.meses}`, { formato: "entero" }));
    b.resultado("diasCts", h.resultado("Días sueltos de la CTS trunca", `${pc.dias}`, { formato: "entero" }));
    b.resultado("mesesGrati", h.resultado("Meses que cuenta la gratificación trunca", `${mesesGrati}`, { formato: "entero" }));
    h.nota("Si ya te pagaron la gratificación de este semestre, réstala: no se cobra dos veces. En la microempresa del régimen especial solo se pagan las vacaciones.");
  }

  if (conDesp) {
    const b = h.bloque("indemnizacion-por-despido-arbitrario");
    h.seccion("SI TE DESPIDIERON SIN CAUSA");
    const contrato = h.opcion(
      "Tipo de contrato",
      [
        { valor: "indeterminado", etiqueta: "A plazo indeterminado" },
        { valor: "plazo-fijo", etiqueta: "A plazo fijo (con fecha de fin)" },
      ],
      "indeterminado",
    );
    const mesesF = h.numero("Meses que faltaban para terminar el contrato", 0, { formato: "entero", min: 0, max: 120, ayuda: "Solo si tu contrato era a plazo fijo." });
    const diasF = h.numero("Días sueltos que faltaban", 0, { formato: "entero", min: 0, max: 29, ayuda: "Solo si tu contrato era a plazo fijo." });
    b.campo("contrato", contrato).campo("fechaIngreso", ingreso).campo("fechaCese", cese).campo("sueldo", sueldo).campo("asignacionFamiliar", af);
    b.campo("variable", varIn).campo("regimen", regimen).campo("mesesFaltantes", mesesF).campo("diasFaltantes", diasF);
    h.pasoTitulo("Indemnización por despido arbitrario");
    const porAnio = porRegimen(l, regimen.ref, "pe.despido-por-anio", true);
    const tope = porRegimen(l, regimen.ref, "pe.despido-tope", true);
    const general = `${regimen.ref}="Régimen general"`;
    const sinTope = h.paso(
      "Remuneraciones diarias antes del tope",
      `IF(${contrato.ref}="A plazo fijo (con fecha de fin)",${porAnio}*${mesesF.ref}+${porAnio}/30*${diasF.ref},IF(${general},${porAnio}*(${serv.anios}+${serv.meses}/12+${serv.dias}/360),${porAnio}*(${serv.anios}+${serv.meses}/12)))`,
      "numero",
    );
    const prueba = `AND(${serv.anios}=0,${serv.meses}<3)`;
    const diarias = h.paso("Remuneraciones diarias", `IF(${prueba},0,MIN(${sinTope},${tope}))`, "numero");
    h.aviso(
      `IF(AND(${contrato.ref}="A plazo fijo (con fecha de fin)",NOT(${general})),"Para contratos a plazo fijo en la micro o pequeña empresa no tenemos una regla confirmada en la norma.",IF(${prueba},"Si te despiden durante los tres primeros meses (periodo de prueba) no corresponde indemnización.",""))`,
    );
    if (!conLiq) h.aviso(aviso);
    b.resultado("remuneracion", h.resultado("Remuneración mensual que se usa", `${rem}`));
    b.resultado("anios", h.resultado("Años completos trabajados", `${serv.anios}`, { formato: "entero" }));
    b.resultado("meses", h.resultado("Meses adicionales", `${serv.meses}`, { formato: "entero" }));
    b.resultado("dias", h.resultado("Días adicionales", `${serv.dias}`, { formato: "entero" }));
    b.resultado("remuneracionesDiarias", h.resultado("Remuneraciones diarias que te corresponden", l.r(diarias), { formato: "numero" }));
    b.resultado("indemnizacion", h.resultado("Indemnización por despido arbitrario", l.r(`${diarias}*${rem}/30`), { total: true }));
    h.nota("Régimen general: una remuneración y media por año, con tope de 12 remuneraciones (DS 003-97-TR, art. 38). No incluye la indemnización por vacaciones vencidas.");
  }
}

export const planillaPe: PlanillaPais = {
  mercado: "pe",
  titulo: (anio) => `Planilla de sueldo y liquidación Perú ${anio}`,
  construir(l) {
    if (l.disponible("sueldo-neto")) sueldoNeto(l);
    gratificacionYCts(l);
    liquidacion(l);
  },
};
