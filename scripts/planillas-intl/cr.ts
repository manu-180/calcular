import type { Libro, PlanillaPais } from "./marco";
import { tiempoPorMeses } from "./formulas";

function salarioNeto(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Salario neto", "Salario neto: cargas sociales e impuesto al salario", "pone su salario bruto y le dice las cuotas de la Caja, el aporte al Banco Popular, el impuesto al salario y su salario neto.");
  const b = h.bloque("salario-neto");
  h.seccion("SUS DATOS");
  const salario = h.numero("Salario bruto mensual", 1200000, { min: 0, ayuda: "Lo que dice el contrato, antes de rebajos." });
  const hijos = h.numero("Hijos que declara para el crédito fiscal", 0, { formato: "entero", min: 0, max: 20 });
  const conyuge = h.siNo("Declara el crédito por cónyuge", false);
  b.campo("salario", salario).campo("hijos", hijos).campo("conyuge", conyuge);
  const s = salario.ref;
  h.pasoTitulo("Cargas sociales");
  const sem = h.paso("Seguro de Salud (SEM)", l.r(`${s}*${T.numero("cr.ccss-sem-trabajador")}/100`));
  const ivm = h.paso("Invalidez, Vejez y Muerte (IVM)", l.r(`${s}*${T.numero("cr.ccss-ivm-trabajador")}/100`));
  const bp = h.paso("Banco Popular", l.r(`${s}*${T.numero("cr.banco-popular-trabajador")}/100`));
  const cargas = h.paso("Total de cargas sociales", l.r(`${sem}+${ivm}+${bp}`));
  h.pasoTitulo("Impuesto al salario");
  const tramos = h.marginal("Impuesto por tramos", T.escala("cr.impuesto-salario"), s);
  const creditos = h.paso("Créditos fiscales", `${hijos.ref}*${T.numero("cr.credito-hijo")}+IF(${conyuge.ref}="Sí",${T.numero("cr.credito-conyuge")},0)`);
  const renta = h.paso("Impuesto al salario", `MAX(0,${l.r(`${tramos}-${creditos}`)})`);
  h.seccion("SU SALARIO NETO");
  b.resultado("sem", h.resultado("Seguro de Salud (SEM)", `${sem}`));
  b.resultado("ivm", h.resultado("Invalidez, Vejez y Muerte (IVM)", `${ivm}`));
  b.resultado("bancoPopular", h.resultado("Banco Popular", `${bp}`));
  b.resultado("cargas", h.resultado("Total de cargas sociales", `${cargas}`));
  b.resultado("renta", h.resultado("Impuesto al salario", `${renta}`));
  b.resultado("neto", h.resultado("Salario neto", l.r(`${s}-${cargas}-${renta}`), { total: true }));
  h.nota("El impuesto se calcula sobre el salario bruto: las cuotas de la Caja no se restan antes.");
}

function aguinaldo(l: Libro): void {
  const h = l.hoja("Aguinaldo", "Aguinaldo", "calcula el aguinaldo de diciembre, completo o proporcional.");
  const b = h.bloque("aguinaldo");
  h.seccion("SUS DATOS");
  const salario = h.numero("Salario bruto mensual", 600000, { min: 0, ayuda: "Sin rebajos. Si su salario cambió durante el año, use el promedio." });
  const meses = h.numero("Meses trabajados entre el 1 de diciembre y el 30 de noviembre", 12, { formato: "numero", min: 0, max: 12, ayuda: "Puede usar decimales: medio mes es 0,5." });
  const extras = h.numero("Horas extra, comisiones y bonos del mismo período (opcional)", null, { min: 0, ayuda: "Si no tuvo, déjelo vacío." });
  b.campo("salario", salario).campo("meses", meses).campo("extras", extras);
  const devengado = h.paso("Total devengado en el período", l.r(`${salario.ref}*${meses.ref}+IF(ISNUMBER(${extras.ref}),${extras.ref},0)`));
  h.seccion("SU AGUINALDO");
  b.resultado("devengado", h.resultado("Total devengado en el período", `${devengado}`));
  b.resultado("aguinaldo", h.resultado("Aguinaldo", `IF(${meses.ref}>=1,${l.r(`${devengado}/12`)},0)`, { total: true }));
  h.nota("Se paga en los primeros 20 días de diciembre. No paga impuesto sobre la renta ni cuotas de la Caja, así que se recibe completo. Con menos de un mes trabajado no hay aguinaldo.");
}

function liquidacion(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Liquidación", "Liquidación: preaviso, cesantía, vacaciones y aguinaldo", "pone sus fechas, su salario y cómo terminó la relación, y le dice el preaviso, la cesantía, las vacaciones y el aguinaldo proporcional.");
  const b = h.bloque("liquidacion");
  h.seccion("SUS DATOS");
  const salario = h.numero("Salario promedio mensual de los últimos seis meses", 600000, { min: 0, ayuda: "Bruto, con horas extra y comisiones incluidas." });
  const ingreso = h.fecha("Fecha de ingreso", "2022-03-01");
  const salida = h.fecha("Último día de trabajo", l.hoy);
  const despidoTxt = "Despido sin justa causa (con responsabilidad patronal)";
  const motivo = h.opcion(
    "Cómo terminó la relación laboral",
    [
      { valor: "despido", etiqueta: despidoTxt },
      { valor: "renuncia", etiqueta: "Renuncia" },
      { valor: "justa-causa", etiqueta: "Despido con justa causa" },
    ],
    "despido",
  );
  const preavisoDado = h.siNo("El patrono le avisó del despido con la anticipación de ley", false, "Si lo despidieron de un día para otro, marque que no.");
  const vac = h.numero("Días de vacaciones que no disfrutó", 0, { formato: "numero", min: 0, ayuda: "Si no lo sabe, cuente un día por cada mes trabajado desde sus últimas vacaciones." });
  const salAg = h.numero("Salarios ganados desde el 1 de diciembre (opcional)", null, { min: 0, ayuda: "Si lo deja vacío, se estima con su salario promedio." });
  b.campo("salario", salario).campo("fechaIngreso", ingreso).campo("fechaSalida", salida).campo("motivo", motivo).campo("preavisoDado", preavisoDado).campo("vacaciones", vac).campo("salariosAguinaldo", salAg);
  const s = salida.ref;
  const t = tiempoPorMeses(h, "Tiempo trabajado", ingreso.ref, `(${s}+1)`);
  const masSeis = `OR(${t.meses}>6,AND(${t.meses}=6,${t.dias}>0))`;
  const despido = `${motivo.ref}="${despidoTxt}"`;
  h.pasoTitulo("Preaviso y cesantía");
  const pre = T.mapa("cr.preaviso-dias");
  const diasPre = h.paso(
    "Días de preaviso",
    `IF(AND(${despido},${preavisoDado.ref}="No"),IF(${t.anios}=0,IF(${t.meses}<3,0,IF(${masSeis},${pre("6-a-12-meses")},${pre("3-a-6-meses")})),IF(AND(${t.anios}=1,${t.meses}=0,${t.dias}=0),${pre("6-a-12-meses")},${pre("mas-de-un-anio")})),0)`,
    "numero",
  );
  const menos = T.mapa("cr.cesantia-dias-menos-de-un-anio");
  const porAnio = T.mapa("cr.cesantia-dias-por-anio");
  const computables = h.paso("Años computables (más de seis meses suman uno)", `${t.anios}+IF(${masSeis},1,0)`, "entero");
  const fila = Array.from({ length: 13 }, (_, i) => porAnio(String(i + 1))).join(",");
  const diasCes = h.paso(
    "Días de cesantía",
    `IF(${despido},IF(${t.anios}=0,IF(${t.meses}<3,0,IF(${masSeis},${menos("6-a-12-meses")},${menos("3-a-6-meses")})),CHOOSE(MIN(${computables},13),${fila})*MIN(${computables},${T.numero("cr.cesantia-tope-anios")})),0)`,
    "numero",
  );
  const diario = h.paso("Salario diario", `${salario.ref}/${T.numero("cr.dias-mes-planilla")}`);
  h.pasoTitulo("Aguinaldo proporcional");
  const inicioAg = `IF(MONTH(${s})=12,DATE(YEAR(${s}),12,1),DATE(YEAR(${s})-1,12,1))`;
  const tAg = tiempoPorMeses(h, "Período del aguinaldo", `MAX(${ingreso.ref},${inicioAg})`, `(${s}+1)`);
  const mesesAg = h.paso("Meses en el período del aguinaldo", `MIN(12,${tAg.anios}*12+${tAg.meses}+${tAg.dias}/30)`, "numero");
  const baseAg = h.paso("Salarios del período", `IF(ISNUMBER(${salAg.ref}),${salAg.ref},${salario.ref}*${mesesAg})`);
  const preaviso = h.paso("Preaviso", l.r(`${diario}*${diasPre}`));
  const cesantia = h.paso("Cesantía", l.r(`${diario}*${diasCes}`));
  const vacaciones = h.paso("Vacaciones", l.r(`${diario}*${vac.ref}`));
  const ag = h.paso("Aguinaldo", `IF(${t.anios}*12+${t.meses}>=1,${l.r(`${baseAg}/12`)},0)`);
  h.seccion("SU LIQUIDACIÓN");
  h.aviso(`IF(${s}<${ingreso.ref},"La fecha de salida tiene que ser igual o posterior a la de ingreso.","")`);
  h.resultado("Tiempo trabajado", `${t.anios}&" años, "&${t.meses}&" meses y "&${t.dias}&" días"`, { formato: "texto" });
  b.resultado("salarioDiario", h.resultado("Salario diario", l.r(diario)));
  b.resultado("diasPreaviso", h.resultado("Días de preaviso", `${diasPre}`, { formato: "numero" }));
  b.resultado("preaviso", h.resultado("Preaviso", `${preaviso}`));
  b.resultado("diasCesantia", h.resultado("Días de cesantía", `${diasCes}`, { formato: "numero" }));
  b.resultado("cesantia", h.resultado("Cesantía", `${cesantia}`));
  b.resultado("vacaciones", h.resultado("Vacaciones no disfrutadas", `${vacaciones}`));
  b.resultado("aguinaldo", h.resultado("Aguinaldo proporcional", `${ag}`));
  b.resultado("total", h.resultado("Total de la liquidación", l.r(`${preaviso}+${cesantia}+${vacaciones}+${ag}`), { total: true }));
  h.nota(
    "La cesantía se paga por 8 años como máximo. Si renunció sin dar el preaviso, el patrono puede rebajarlo de la liquidación. Las vacaciones se calculan con el salario promedio entre 30: la ley usa el promedio de las últimas 50 semanas.",
  );
}

export const planillaCr: PlanillaPais = {
  mercado: "cr",
  titulo: (anio) => `Planilla de salario y liquidación Costa Rica ${anio}`,
  construir(l) {
    if (l.disponible("salario-neto")) salarioNeto(l);
    if (l.disponible("aguinaldo")) aguinaldo(l);
    if (l.disponible("liquidacion")) liquidacion(l);
  },
};
