import type { Hoja, Libro, PlanillaPais } from "./marco";

function sueldoLiquido(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Sueldo líquido", "Sueldo líquido: AFP, salud, seguro de cesantía e impuesto único", "pones tu sueldo imponible y te dice los descuentos de AFP, salud, seguro de cesantía e impuesto único, y tu sueldo líquido.");
  const b = h.bloque("sueldo-liquido");
  h.seccion("TUS DATOS");
  const imponible = h.numero("Sueldo bruto imponible", 1200000, { min: 0, ayuda: "Sueldo base más gratificación, horas extra, bonos y comisiones del mes." });
  const noImponible = h.numero("Colación y movilización", 0, { min: 0, ayuda: "Lo que no paga cotizaciones ni impuesto. Si no tienes, deja 0." });
  const comisiones = T.mapa("cl.comision-afp");
  const afp = h.opcionDato("Tu AFP", comisiones, "habitat");
  const salud = h.opcion(
    "Sistema de salud",
    [
      { valor: "fonasa", etiqueta: "Fonasa" },
      { valor: "isapre", etiqueta: "Isapre" },
    ],
    "fonasa",
  );
  const plan = h.numero("Valor de tu plan de Isapre en UF", 0, {
    formato: "numero",
    min: 0,
    ayuda: "Solo si tu sistema de salud es Isapre. Si tu plan cuesta menos que la cotización legal, se descuenta igual la cotización legal.",
  });
  const contrato = h.opcion(
    "Tipo de contrato",
    [
      { valor: "indefinido", etiqueta: "Indefinido" },
      { valor: "plazo-fijo", etiqueta: "A plazo fijo o por obra o faena" },
    ],
    "indefinido",
  );
  b.campo("imponible", imponible).campo("noImponible", noImponible).campo("afp", afp).campo("salud", salud).campo("planIsapre", plan).campo("contrato", contrato);
  const imp = imponible.ref;
  const uf = T.serie("cl.uf");
  const utm = T.serie("cl.utm");

  h.pasoTitulo("Cotizaciones");
  const tope = h.paso("Tope imponible del mes", l.r(`${T.numero("cl.tope-imponible")}*${uf}`));
  const topeCes = h.paso("Tope imponible del seguro de cesantía", l.r(`${T.numero("cl.tope-imponible-cesantia")}*${uf}`));
  const base = h.paso("Base de AFP y salud", `MIN(${imp},${tope})`);
  const tasaAfp = h.paso("AFP: cotización más comisión (%)", `${T.numero("cl.cotizacion-afp")}+${comisiones.de(afp.ref)}`, "porcentaje");
  const afpM = h.paso("AFP", l.r(`${base}*${tasaAfp}/100`));
  const saludLegal = h.paso("Cotización legal de salud", l.r(`${base}*${T.numero("cl.salud")}/100`));
  const planM = h.paso("Plan de Isapre en pesos", `IF(${salud.ref}="Isapre",${l.r(`${plan.ref}*${uf}`)},0)`);
  const saludM = h.paso("Salud que te descuentan", `MAX(${saludLegal},${planM})`);
  const cesantia = h.paso("Seguro de cesantía", `IF(${contrato.ref}="Indefinido",${l.r(`MIN(${imp},${topeCes})*${T.numero("cl.cesantia-trabajador")}/100`)},0)`);
  h.pasoTitulo("Impuesto único");
  const tributable = h.paso("Base para el impuesto", `MAX(0,${imp}-${afpM}-${saludLegal}-${cesantia})`);
  const enUtm = h.paso("Base en UTM", `${tributable}/${utm}`, "numero");
  const impuesto = h.paso("Impuesto único", l.r(`${h.escala(T.escala("cl.impuesto-unico"), enUtm)}*${utm}`));
  const descuentos = h.paso("Total de descuentos", `${afpM}+${saludM}+${cesantia}+${impuesto}`);

  h.seccion("TU LIQUIDACIÓN DE SUELDO");
  b.resultado("imponible", h.resultado("Sueldo bruto imponible", `${imp}`));
  b.resultado("afp", h.resultado("AFP (cotización y comisión)", `${afpM}`));
  b.resultado("salud", h.resultado("Salud", `${saludM}`));
  b.resultado("cesantia", h.resultado("Seguro de cesantía", `${cesantia}`));
  b.resultado("tributable", h.resultado("Base para el impuesto", `${tributable}`));
  b.resultado("impuesto", h.resultado("Impuesto único", `${impuesto}`));
  b.resultado("descuentos", h.resultado("Total de descuentos", `${descuentos}`));
  b.resultado("noImponible", h.resultado("Colación y movilización", `${noImponible.ref}`));
  b.resultado("liquido", h.resultado("Sueldo líquido", `${imp}-${descuentos}+${noImponible.ref}`, { total: true }));
  b.resultado("tope", h.resultado("Tope imponible del mes", `${tope}`));
  h.nota(
    "La UF y la UTM están en la hoja de tablas con su fecha. Lo que tu plan de Isapre cobra por sobre la cotización legal se descuenta del sueldo, pero no rebaja el impuesto.",
  );
}

function gratificacion(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Gratificación", "Gratificación legal del artículo 50", "calcula la gratificación mensual con el 25 % de tu remuneración y su tope legal.");
  const b = h.bloque("gratificacion");
  h.seccion("TUS DATOS");
  const sueldo = h.numero("Remuneración mensual", 900000, { min: 0, ayuda: "Sueldo más lo variable del mes (comisiones, horas extra). Sin colación ni movilización." });
  const meses = h.numero("Meses trabajados en el año", 12, { formato: "entero", min: 1, max: 12 });
  b.campo("sueldo", sueldo).campo("meses", meses);
  const imm = T.numero("cl.imm");
  const veinticinco = h.paso("Porcentaje legal de la remuneración", `${sueldo.ref}*${T.numero("cl.gratificacion-porcentaje")}/100`);
  const tope = h.paso("Tope mensual (4,75 ingresos mínimos al año)", `${T.numero("cl.gratificacion-tope")}*${imm}/12`);
  const mensual = h.paso("Gratificación mensual exacta", `MIN(${veinticinco},${tope})`);
  h.seccion("TU GRATIFICACIÓN");
  b.resultado("veinticinco", h.resultado("Porcentaje legal de tu remuneración", l.r(veinticinco)));
  b.resultado("topeMensual", h.resultado("Tope mensual", l.r(tope)));
  b.resultado("mensual", h.resultado("Gratificación mensual", l.r(mensual), { total: true }));
  b.resultado("anual", h.resultado("Gratificación del año", l.r(`${mensual}*${meses.ref}`)));
  b.resultado("imm", h.resultado("Ingreso mínimo usado para el tope", `${imm}`));
  h.nota("Es la modalidad del artículo 50 del Código del Trabajo, la que usan casi todas las empresas. Si la tuya reparte el 30 % de las utilidades (artículo 47), el monto puede ser otro.");
}

function antiguedadChile(h: Hoja, inicio: string, termino: string): { anios: string; meses: string; dias: string } {
  const k0 = `(YEAR(${termino})-YEAR(${inicio}))`;
  const anios = h.paso("Años completos", `IF(EDATE(${inicio},12*${k0})>${termino},${k0}-1,${k0})`, "entero");
  const anualidad = h.paso("Última anualidad", `EDATE(${inicio},12*${anios})`, "fecha");
  const m0 = `((YEAR(${termino})-YEAR(${anualidad}))*12+MONTH(${termino})-MONTH(${anualidad}))`;
  const meses = h.paso("Meses desde la última anualidad", `MIN(12,IF(EDATE(${anualidad},${m0})>${termino},${m0}-1,${m0}))`, "entero");
  const dias = h.paso("Días sueltos", `${termino}-EDATE(${anualidad},${meses})`, "entero");
  return { anios, meses, dias };
}

function finiquito(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja(
    "Finiquito",
    "Finiquito: indemnizaciones y vacaciones",
    "pones tus fechas, tu remuneración y el motivo del término, y te dice las indemnizaciones y las vacaciones pendientes y proporcionales.",
  );
  const b = h.bloque("finiquito");
  h.seccion("TUS DATOS");
  const inicio = h.fecha("Fecha en que empezaste a trabajar", "2022-03-15");
  const termino = h.fecha("Último día de trabajo", l.hoy);
  const rem = h.numero("Última remuneración mensual", 1200000, {
    min: 0,
    ayuda: "Sueldo más lo fijo que recibes cada mes (colación, movilización, cotizaciones). Sin horas extra ni gratificación anual.",
  });
  const despidoTxt = "Necesidades de la empresa (despido art. 161)";
  const causal = h.opcion(
    "Motivo del término",
    [
      { valor: "necesidades-empresa", etiqueta: despidoTxt },
      { valor: "renuncia", etiqueta: "Renuncia" },
      { valor: "otra", etiqueta: "Mutuo acuerdo o fin del plazo u otra causal" },
    ],
    "necesidades-empresa",
  );
  const aviso = h.siNo("Te avisaron con 30 días o más de anticipación", false);
  const pend = h.numero("Días hábiles de vacaciones de años anteriores sin tomar", 0, { formato: "numero", min: 0, max: 365 });
  const austral = h.siNo("Trabajas en Magallanes, Aysén o Palena", false);
  b.campo("inicio", inicio).campo("termino", termino).campo("remuneracion", rem).campo("causal", causal).campo("avisoPrevio", aviso).campo("diasPendientes", pend).campo("zonaAustral", austral);
  const t = termino.ref;

  h.pasoTitulo("Antigüedad");
  const a = antiguedadChile(h, inicio.ref, t);
  h.pasoTitulo("Indemnizaciones");
  const despido = `${causal.ref}="${despidoTxt}"`;
  const tope = h.paso("Tope de la remuneración (90 UF)", l.r(`${T.numero("cl.tope-indemnizacion")}*${T.serie("cl.uf")}`));
  const base = h.paso("Base para las indemnizaciones", `MIN(${rem.ref},${tope})`);
  const aniosServ = h.paso("Años que se indemnizan (más de 6 meses suman uno)", `${a.anios}+IF(OR(${a.meses}>6,AND(${a.meses}=6,${a.dias}>0)),1,0)`, "entero");
  const dpa = T.numero("cl.indemnizacion-dias-por-anio");
  const sinTope = `${inicio.ref}<DATE(1981,8,14)`;
  const diasInd = h.paso(
    "Días de indemnización",
    `IF(AND(${despido},${a.anios}>=1),IF(${sinTope},${aniosServ}*${dpa},MIN(${aniosServ}*${dpa},${T.numero("cl.indemnizacion-tope-dias")})),0)`,
    "entero",
  );
  const indAnios = h.paso("Indemnización por años de servicio", l.r(`${base}*${diasInd}/30`));
  const indAviso = h.paso("Indemnización sustitutiva del aviso previo", `IF(AND(${despido},${aviso.ref}="No"),${base},0)`);
  h.pasoTitulo("Vacaciones (feriado)");
  const anual = h.paso("Días hábiles de feriado por año", `IF(${austral.ref}="Sí",${T.numero("cl.feriado-anual-austral")},${T.numero("cl.feriado-anual")})`, "entero");
  const habiles = h.paso("Días hábiles a pagar", `${anual}/12*${a.meses}+${anual}/12/30*${a.dias}+${pend.ref}`, "numero");
  const enteros = h.paso("Días hábiles que se recorren", `MAX(0,ROUNDUP(${habiles}-0.000000001,0))`, "entero");
  const inhabiles = h.paso("Sábados y domingos que se suman", `WORKDAY(${t},${enteros})-${t}-${enteros}`, "entero");
  const diasFeriado = h.paso("Días corridos a pagar", `${habiles}+${inhabiles}`, "numero");
  const feriado = h.paso("Vacaciones a pagar", l.r(`${rem.ref}/30*${diasFeriado}`));

  h.seccion("TU FINIQUITO");
  h.aviso(`IF(${t}<${inicio.ref},"El último día tiene que ser posterior a la fecha en que empezaste.","")`);
  h.resultado("Antigüedad", `${a.anios}&" años, "&${a.meses}&" meses y "&${a.dias}&" días"`, { formato: "texto" });
  b.resultado("base", h.resultado("Base para las indemnizaciones", `${base}`));
  b.resultado("aniosServicio", h.resultado("Años que se indemnizan", `IF(${despido},${aniosServ},0)`, { formato: "entero" }));
  b.resultado("indemnizacionAnios", h.resultado("Indemnización por años de servicio", `${indAnios}`));
  b.resultado("indemnizacionAviso", h.resultado("Indemnización sustitutiva del aviso previo", `${indAviso}`));
  b.resultado("diasFeriado", h.resultado("Días de vacaciones a pagar (corridos)", `${diasFeriado}`, { formato: "numero" }));
  b.resultado("feriado", h.resultado("Vacaciones pendientes y proporcionales", `${feriado}`));
  b.resultado("total", h.resultado("Total del finiquito", `${indAnios}+${indAviso}+${feriado}`, { total: true }));
  h.nota(
    "Las vacaciones se cuentan desde el día siguiente a tu salida, sumando sábados y domingos. Si en ese período cae un festivo en día hábil, se suma un día más por cada uno. La indemnización por años tiene tope de 11 años, salvo contratos anteriores al 14 de agosto de 1981.",
  );
}

export const planillaCl: PlanillaPais = {
  mercado: "cl",
  titulo: (anio) => `Planilla de sueldo y finiquito Chile ${anio}`,
  construir(l) {
    if (l.disponible("sueldo-liquido")) sueldoLiquido(l);
    if (l.disponible("gratificacion")) gratificacion(l);
    if (l.disponible("finiquito")) finiquito(l);
  },
};
