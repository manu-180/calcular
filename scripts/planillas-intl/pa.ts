import type { Libro, PlanillaPais } from "./marco";
import { tiempoPorMeses } from "./formulas";

function salarioNeto(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Salario neto", "Salario neto: Seguro Social, seguro educativo e ISR", "pones tu salario bruto y te dice la cuota del Seguro Social, el seguro educativo, el ISR estimado y lo que recibes por quincena.");
  const b = h.bloque("salario-neto");
  h.seccion("TUS DATOS");
  const salario = h.numero("Salario bruto mensual", 1500, { min: 0 });
  b.campo("salario", salario);
  const s = salario.ref;
  const css = h.paso("Caja de Seguro Social", l.r(`${s}*${T.numero("pa.css-trabajador")}/100`));
  const se = h.paso("Seguro educativo", l.r(`${s}*${T.numero("pa.seguro-educativo-trabajador")}/100`));
  const isr = h.paso("ISR del mes (impuesto de 13 pagos entre 13)", l.r(`${h.escala(T.escala("pa.isr-personas-naturales"), `${s}*13`)}/13`));
  const neto = h.paso("Salario neto", l.r(`${s}-${css}-${se}-${isr}`));
  h.seccion("TU SALARIO NETO");
  b.resultado("css", h.resultado("Caja de Seguro Social", `${css}`));
  b.resultado("seguroEducativo", h.resultado("Seguro educativo", `${se}`));
  b.resultado("isr", h.resultado("Impuesto sobre la renta estimado", `${isr}`));
  b.resultado("neto", h.resultado("Salario neto del mes", `${neto}`, { total: true }));
  b.resultado("quincena", h.resultado("Lo que recibes por quincena", l.r(`${neto}/2`)));
  h.nota("El ISR es una estimación sin deducciones: el año son 13 pagos (12 salarios y el décimo). Si tienes gastos deducibles, la retención real puede ser menor.");
}

function decimo(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Décimo tercer mes", "Décimo tercer mes", "calcula cada partida del décimo tercer mes (abril, agosto y diciembre) y su descuento del Seguro Social.");
  const b = h.bloque("decimo-tercer-mes");
  h.seccion("TUS DATOS");
  const partida = h.opcion(
    "Qué partida quieres calcular",
    [
      { valor: "abril", etiqueta: "Primera partida (15 de abril)" },
      { valor: "agosto", etiqueta: "Segunda partida (15 de agosto)" },
      { valor: "diciembre", etiqueta: "Tercera partida (15 de diciembre)" },
    ],
    "diciembre",
  );
  const total = h.numero("Total ganado en esos cuatro meses", 6000, { min: 0, ayuda: "Salario, horas extra, comisiones y vacaciones del período. Con salario fijo y el período completo, son cuatro salarios." });
  b.campo("partida", partida).campo("totalPeriodo", total);
  const bruto = h.paso("Partida bruta", l.r(`${total.ref}/${T.numero("pa.decimo-divisor")}`));
  const css = h.paso("Seguro Social del décimo", l.r(`${bruto}*${T.numero("pa.css-decimo-trabajador")}/100`));
  h.seccion("TU DÉCIMO");
  b.resultado("bruto", h.resultado("Partida bruta", `${bruto}`));
  b.resultado("css", h.resultado("Seguro Social", `${css}`));
  b.resultado("neto", h.resultado("Partida neta", l.r(`${bruto}-${css}`), { total: true }));
  h.nota("Los períodos van del 16 de diciembre al 15 de abril, del 16 de abril al 15 de agosto y del 16 de agosto al 15 de diciembre. No lleva seguro educativo.");
}

function liquidacion(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Liquidación", "Liquidación: prima de antigüedad, indemnización, vacaciones y décimo", "pones tus fechas, tu salario y cómo terminó la relación, y te dice la prima de antigüedad, la indemnización, las vacaciones y el décimo proporcional.");
  const b = h.bloque("liquidacion");
  h.seccion("TUS DATOS");
  const salario = h.numero("Salario mensual", 1200, { min: 0, ayuda: "Tu salario de los últimos meses, con horas extra y comisiones." });
  const ingreso = h.fecha("Fecha de ingreso", "2020-02-01");
  const salida = h.fecha("Último día de trabajo", l.hoy);
  const motivo = h.opcion(
    "Cómo terminó la relación de trabajo",
    [
      { valor: "despido-injustificado", etiqueta: "Despido injustificado" },
      { valor: "renuncia", etiqueta: "Renuncia" },
      { valor: "despido-justificado", etiqueta: "Despido con causa justificada" },
      { valor: "mutuo-acuerdo", etiqueta: "Mutuo acuerdo" },
    ],
    "despido-injustificado",
  );
  const indefinido = h.siNo("Tu contrato era por tiempo indefinido", true, "Si era por obra o por un plazo fijo, marca que no.");
  const mesesVac = h.numero("Meses trabajados desde tus últimas vacaciones", 0, { formato: "numero", min: 0, ayuda: "Si no tomaste vacaciones en un período completo, súmalo también." });
  b.campo("salario", salario).campo("fechaIngreso", ingreso).campo("fechaSalida", salida).campo("motivo", motivo).campo("indefinido", indefinido).campo("mesesVacaciones", mesesVac);
  const s = salario.ref;
  const sal = salida.ref;
  const t = tiempoPorMeses(h, "Tiempo trabajado", ingreso.ref, `(${sal}+1)`);
  const anios = h.paso("Años con fracción", `(${t.anios}*12+${t.meses}+${t.dias}/30)/12`, "factor");
  const semanal = h.paso("Salario semanal (12 meses entre 52 semanas)", `${s}*12/52`);
  const indef = `${indefinido.ref}="Sí"`;
  const injust = `AND(${indef},${motivo.ref}="Despido injustificado")`;
  h.pasoTitulo("Prima e indemnización");
  const prima = h.paso("Prima de antigüedad", `IF(${indef},${l.r(`${semanal}*${anios}*${T.numero("pa.prima-antiguedad-semanas")}`)},0)`);
  const sem = T.mapa("pa.indemnizacion-semanas");
  const semanas = h.paso("Semanas de indemnización", `IF(${injust},MIN(${anios},10)*${sem("primeros-10-anios")}+MAX(${anios}-10,0)*${sem("desde-anio-11")},0)`, "numero");
  const ind = h.paso("Indemnización", l.r(`${semanal}*${semanas}`));
  h.pasoTitulo("Vacaciones y décimo");
  const vac = h.paso("Vacaciones", l.r(`${s}*${mesesVac.ref}/${T.numero("pa.vacaciones-meses")}`));
  const md = `(MONTH(${sal})*100+DAY(${sal}))`;
  const y = `YEAR(${sal})`;
  const inicioDecimo = `IF(AND(${md}>=416,${md}<=815),DATE(${y},4,16),IF(AND(${md}>=816,${md}<=1215),DATE(${y},8,16),IF(${md}>=1216,DATE(${y},12,16),DATE(${y}-1,12,16))))`;
  const td = tiempoPorMeses(h, "Período del décimo", `MAX(${ingreso.ref},${inicioDecimo})`, `(${sal}+1)`);
  const mesesDec = h.paso("Meses del período del décimo", `MIN(4,${td.anios}*12+${td.meses}+${td.dias}/30)`, "numero");
  const dec = h.paso("Décimo proporcional (con las vacaciones)", l.r(`(${s}*${mesesDec}+${vac})/${T.numero("pa.decimo-divisor")}`));
  h.seccion("TU LIQUIDACIÓN");
  h.aviso(
    `IF(${sal}<${ingreso.ref},"La fecha de salida tiene que ser igual o posterior a la de ingreso.",IF(AND(${injust},${ingreso.ref}<DATE(1995,8,14)),"Si empezaste antes del 14 de agosto de 1995, la indemnización usa otras escalas del artículo 225 que esta planilla no cubre.",""))`,
  );
  h.resultado("Tiempo trabajado", `${t.anios}&" años, "&${t.meses}&" meses y "&${t.dias}&" días"`, { formato: "texto" });
  b.resultado("prima", h.resultado("Prima de antigüedad", `${prima}`));
  b.resultado("indemnizacion", h.resultado("Indemnización por despido injustificado", `${ind}`));
  b.resultado("vacaciones", h.resultado("Vacaciones", `${vac}`));
  b.resultado("decimo", h.resultado("Décimo tercer mes proporcional", `${dec}`));
  b.resultado("total", h.resultado("Total", l.r(`${prima}+${ind}+${vac}+${dec}`), { total: true }));
  h.nota(
    "En un contrato por obra o plazo fijo no hay prima de antigüedad. La indemnización es de 3,4 semanas por año los primeros diez años y una semana por año después. Las vacaciones y el décimo llevan descuentos del Seguro Social.",
  );
}

export const planillaPa: PlanillaPais = {
  mercado: "pa",
  titulo: (anio) => `Planilla de salario y liquidación Panamá ${anio}`,
  construir(l) {
    if (l.disponible("salario-neto")) salarioNeto(l);
    if (l.disponible("decimo-tercer-mes")) decimo(l);
    if (l.disponible("liquidacion")) liquidacion(l);
  },
};
