import type { Entrada, Hoja, Libro, PlanillaPais } from "./marco";
import { dias360 } from "./formulas";

function auxilioDe(l: Libro, h: Hoja, salario: string, recibe: Entrada): string {
  const T = l.tablas;
  return h.paso(
    "Auxilio de transporte que entra",
    `IF(AND(${recibe.ref}="Sí",${salario}<=${T.numero("co.auxilio-tope")}*${T.numero("co.smmlv")}),${T.numero("co.auxilio-transporte")},0)`,
  );
}

function salarioNeto(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Salario neto", "Salario neto: salud, pensión y retención en la fuente", "pones tu salario y te dice los aportes a salud y pensión, la retención en la fuente y lo que te consignan.");
  const b = h.bloque("salario-neto");
  h.seccion("TUS DATOS");
  const salario = h.numero("Salario mensual", 3000000, { min: 0 });
  const auxilio = h.siNo("Recibes auxilio de transporte", true);
  const dependiente = h.siNo("Tienes personas a cargo (dependientes)", false, "Hijos, cónyuge o padres que dependen de ti. Baja la retención en la fuente.");
  b.campo("salario", salario).campo("auxilio", auxilio).campo("dependiente", dependiente);
  const s = salario.ref;
  const smmlv = T.numero("co.smmlv");
  const uvt = T.numero("co.uvt");

  h.pasoTitulo("Aportes a seguridad social");
  const ibc = h.paso("Ingreso base de cotización (IBC)", `MIN(MAX(${s},${smmlv}),${T.numero("co.tope-ibc")}*${smmlv})`);
  const tasaPension = h.paso("Pensión a tu cargo (%)", `${T.numero("co.pension-cotizacion")}*${T.numero("co.pension-parte-trabajador")}/100`, "porcentaje");
  const tasaFsp = h.paso("Fondo de Solidaridad Pensional (%)", h.tasaDeTramo(T.escala("co.fsp"), `${ibc}/${smmlv}`), "porcentaje");
  const salud = h.paso("Salud", l.r(`${ibc}*${T.numero("co.salud-trabajador")}/100`));
  const pension = h.paso("Pensión", l.r(`${ibc}*${tasaPension}/100`));
  const fsp = h.paso("Fondo de Solidaridad Pensional", l.r(`${ibc}*${tasaFsp}/100`));

  h.pasoTitulo("Retención en la fuente (procedimiento 1)");
  const ingresoNeto = h.paso("Ingreso menos aportes obligatorios", `MAX(0,${s}-(${salud}+${pension}+${fsp}))`);
  const deducciones = h.paso(
    "Deducción por dependientes",
    l.r(`IF(${dependiente.ref}="Sí",MIN(${s}*${T.numero("co.deduccion-dependientes")}/100,${T.numero("co.deduccion-dependientes-tope")}*${uvt}),0)`),
  );
  const subtotal = h.paso("Subtotal", `MAX(0,${ingresoNeto}-${deducciones})`);
  const rentaExenta = h.paso("Renta exenta del 25 %", l.r(`MIN(${subtotal}*${T.numero("co.renta-exenta-trabajo")}/100,${T.numero("co.renta-exenta-trabajo-tope")}/12*${uvt})`));
  const limite = h.paso("Límite del 40 %", `MIN(${ingresoNeto}*${T.numero("co.limite-beneficios")}/100,${T.numero("co.limite-beneficios-tope")}/12*${uvt})`);
  const beneficios = h.paso("Deducciones y rentas exentas que se restan", l.r(`MIN(${deducciones}+${rentaExenta},${limite})`));
  const base = h.paso("Base de retención", `MAX(0,${ingresoNeto}-${beneficios})`);
  const baseUvt = h.paso("Base en UVT", `${base}/${uvt}`, "numero");
  const retencion = h.paso("Retención en la fuente", l.r(`${h.escala(T.escala("co.retencion-tabla"), baseUvt)}*${uvt}`));
  const aux = auxilioDe(l, h, s, auxilio);
  const descuentos = h.paso("Total de descuentos", l.r(`${salud}+${pension}+${fsp}+${retencion}`));

  h.seccion("LO QUE TE CONSIGNAN");
  b.resultado("salario", h.resultado("Salario", `${s}`));
  b.resultado("auxilio", h.resultado("Auxilio de transporte", `${aux}`));
  b.resultado("salud", h.resultado("Salud (EPS)", `${salud}`));
  b.resultado("pension", h.resultado("Pensión", `${pension}`));
  b.resultado("fsp", h.resultado("Fondo de Solidaridad Pensional", `${fsp}`));
  b.resultado("retencion", h.resultado("Retención en la fuente", `${retencion}`));
  b.resultado("descuentos", h.resultado("Total de descuentos", `${descuentos}`));
  b.resultado("neto", h.resultado("Salario neto (lo que te consignan)", l.r(`${s}+${aux}-${descuentos}`), { total: true }));
  h.nota(
    "Los aportes se calculan sobre el salario, con un piso de un salario mínimo y un techo de 25. El auxilio de transporte se paga a quien gana hasta dos salarios mínimos y no lleva descuentos.",
  );
}

function primaYCesantias(l: Libro): void {
  const T = l.tablas;
  const conPrima = l.disponible("prima-de-servicios");
  const conCesantias = l.disponible("cesantias");
  if (!conPrima && !conCesantias) return;
  const h = l.hoja("Prima y cesantías", "Prima de servicios, cesantías e intereses", "calcula la prima de servicios del semestre, las cesantías del año y sus intereses.");
  h.seccion("TUS DATOS");
  const salario = h.numero("Salario mensual", 2000000, { min: 0 });
  const auxilio = h.siNo("Recibes auxilio de transporte", true);
  const aux = auxilioDe(l, h, salario.ref, auxilio);
  const base = h.paso("Salario base (salario más auxilio)", `${salario.ref}+${aux}`);
  if (conPrima) {
    const b = h.bloque("prima-de-servicios");
    h.seccion("PRIMA DE SERVICIOS");
    const dias = h.numero("Días trabajados en el semestre", 180, { formato: "entero", min: 1, max: 180, ayuda: "El semestre completo son 180 días (meses de 30 días)." });
    b.campo("salario", salario).campo("auxilio", auxilio).campo("dias", dias);
    b.resultado("auxilio", h.resultado("Auxilio de transporte incluido", `${aux}`));
    b.resultado("base", h.resultado("Salario base de la prima", `${base}`));
    b.resultado("prima", h.resultado("Prima de servicios del semestre", l.r(`${base}*${dias.ref}/360`), { total: true }));
    h.nota("Se paga la mitad antes del 30 de junio y la otra mitad antes del 20 de diciembre (CST art. 306).");
  }
  if (conCesantias) {
    const b = h.bloque("cesantias");
    h.seccion("CESANTÍAS E INTERESES");
    const dias = h.numero("Días trabajados en el año", 360, { formato: "entero", min: 1, max: 360, ayuda: "El año completo son 360 días (meses de 30 días)." });
    b.campo("salario", salario).campo("auxilio", auxilio).campo("dias", dias);
    const ces = h.paso("Cesantías", l.r(`${base}*${dias.ref}/360`));
    const intereses = h.paso("Intereses sobre las cesantías", l.r(`${ces}*${T.numero("co.intereses-cesantias")}/100*${dias.ref}/360`));
    b.resultado("base", h.resultado("Salario base de las cesantías", `${base}`));
    b.resultado("cesantias", h.resultado("Cesantías (van a tu fondo)", `${ces}`));
    b.resultado("intereses", h.resultado("Intereses sobre las cesantías (te los pagan a ti)", `${intereses}`));
    b.resultado("total", h.resultado("Total", l.r(`${ces}+${intereses}`), { total: true }));
    h.nota("Las cesantías se consignan al fondo antes del 14 de febrero. Los intereses te los paga la empresa directo, antes del 31 de enero.");
  }
}

function liquidacion(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja(
    "Liquidación",
    "Liquidación del contrato de trabajo",
    "pones tus fechas y tu salario, y te dice cesantías, intereses, prima, vacaciones y, si te despidieron sin justa causa, la indemnización.",
  );
  const b = h.bloque("liquidacion");
  h.seccion("TUS DATOS");
  const salario = h.numero("Salario mensual", 2500000, { min: 0 });
  const ingreso = h.fecha("Fecha de ingreso", "2024-02-01");
  const retiro = h.fecha("Último día de trabajo", l.hoy);
  const vacDesde = h.fecha("Desde cuándo no tomas vacaciones (opcional)", null, "Si nunca tomaste vacaciones, déjalo vacío y se usa tu fecha de ingreso.");
  const motivo = h.opcion(
    "Cómo terminó el contrato",
    [
      { valor: "renuncia", etiqueta: "Renuncia o fin del plazo" },
      { valor: "despido", etiqueta: "Despido sin justa causa (indefinido)" },
    ],
    "renuncia",
    "Renuncia también incluye el mutuo acuerdo. El despido sin justa causa es para contratos a término indefinido.",
  );
  const auxilio = h.siNo("Recibes auxilio de transporte", true);
  b.campo("salario", salario).campo("fechaIngreso", ingreso).campo("fechaRetiro", retiro).campo("vacacionesDesde", vacDesde).campo("motivo", motivo).campo("auxilio", auxilio);
  const s = salario.ref;
  const ing = ingreso.ref;
  const ret = retiro.ref;
  const smmlv = T.numero("co.smmlv");

  h.pasoTitulo("Cesantías y prima");
  const aux = auxilioDe(l, h, s, auxilio);
  const base = h.paso("Salario base (salario más auxilio)", `${s}+${aux}`);
  const diasCes = h.paso("Días para cesantías este año", dias360(`MAX(${ing},DATE(YEAR(${ret}),1,1))`, ret), "entero");
  const ces = h.paso("Cesantías", l.r(`${base}*${diasCes}/360`));
  const intereses = h.paso("Intereses sobre las cesantías", l.r(`${ces}*${T.numero("co.intereses-cesantias")}/100*${diasCes}/360`));
  const inicioSem = `IF(MONTH(${ret})<=6,DATE(YEAR(${ret}),1,1),DATE(YEAR(${ret}),7,1))`;
  const diasPrima = h.paso("Días para la prima del semestre", dias360(`MAX(${ing},${inicioSem})`, ret), "entero");
  const prima = h.paso("Prima de servicios", l.r(`${base}*${diasPrima}/360`));
  h.pasoTitulo("Vacaciones e indemnización");
  const desde = `IF(ISNUMBER(${vacDesde.ref}),${vacDesde.ref},${ing})`;
  const diasVac = h.paso("Días trabajados sin vacaciones", dias360(desde, ret), "entero");
  const vac = h.paso("Vacaciones en dinero", l.r(`${s}*${diasVac}/720`));
  const diasServ = h.paso("Días de servicio", dias360(ing, ret), "entero");
  const dias = T.mapa("co.indemnizacion-dias");
  const alta = h.paso("¿Ganas 10 salarios mínimos o más?", `IF(${s}>=${T.numero("co.indemnizacion-umbral")}*${smmlv},"Sí","No")`, "texto");
  const primerAnio = `IF(${alta}="Sí",${dias("primer-anio-mayor")},${dias("primer-anio-menor")})`;
  const adicional = `IF(${alta}="Sí",${dias("anio-adicional-mayor")},${dias("anio-adicional-menor")})`;
  const diasInd = h.paso("Días de indemnización", `IF(${diasServ}<=360,${primerAnio},${primerAnio}+${adicional}*(${diasServ}-360)/360)`, "numero");
  const indem = h.paso("Indemnización", `IF(${motivo.ref}="Despido sin justa causa (indefinido)",${l.r(`${s}/30*${diasInd}`)},0)`);

  h.seccion("TU LIQUIDACIÓN");
  h.aviso(
    `IF(${ret}<${ing},"La fecha de retiro tiene que ser posterior a la de ingreso.",IF(AND(ISNUMBER(${vacDesde.ref}),OR(${vacDesde.ref}<${ing},${vacDesde.ref}>${ret})),"La fecha de las vacaciones tiene que estar entre tu ingreso y tu retiro.",""))`,
  );
  b.resultado("base", h.resultado("Salario base para cesantías y prima", `${base}`));
  b.resultado("diasCesantias", h.resultado("Días para cesantías este año", `${diasCes}`, { formato: "dias" }));
  b.resultado("cesantias", h.resultado("Cesantías", `${ces}`));
  b.resultado("intereses", h.resultado("Intereses sobre las cesantías", `${intereses}`));
  b.resultado("diasPrima", h.resultado("Días para la prima de este semestre", `${diasPrima}`, { formato: "dias" }));
  b.resultado("prima", h.resultado("Prima de servicios", `${prima}`));
  b.resultado("diasVacaciones", h.resultado("Días trabajados sin vacaciones", `${diasVac}`, { formato: "dias" }));
  b.resultado("vacaciones", h.resultado("Vacaciones pendientes en dinero", `${vac}`));
  b.resultado("indemnizacion", h.resultado("Indemnización por despido sin justa causa", `${indem}`));
  b.resultado("total", h.resultado("Total de la liquidación", l.r(`${ces}+${intereses}+${prima}+${vac}+${indem}`), { total: true }));
  h.nota(
    "Se cuenta con año comercial de 360 días. Las cesantías de años anteriores ya deberían estar en tu fondo, por eso solo se calculan las de este año. Las vacaciones no incluyen el auxilio de transporte.",
  );
}

export const planillaCo: PlanillaPais = {
  mercado: "co",
  titulo: (anio) => `Planilla de salario y liquidación Colombia ${anio}`,
  construir(l) {
    if (l.disponible("salario-neto")) salarioNeto(l);
    primaYCesantias(l);
    if (l.disponible("liquidacion")) liquidacion(l);
  },
};
