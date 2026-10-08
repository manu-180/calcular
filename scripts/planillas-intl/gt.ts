import type { Entrada, Hoja, Libro, PlanillaPais } from "./marco";
import { aniversario } from "./formulas";

// periodoTrabajado de src/paises/gt/prestaciones.ts: desde el ingreso o el inicio del período, con tope de 365 días.
function diasDelPeriodo(h: Hoja, etiqueta: string, ingreso: string, corte: string, mesInicio: number): string {
  const inicio = `DATE(IF(MONTH(${corte})>=${mesInicio},YEAR(${corte}),YEAR(${corte})-1),${mesInicio},1)`;
  return h.paso(`${etiqueta}: días del período`, `MIN(365,${corte}-MAX(${ingreso},${inicio})+1)`, "entero");
}

function isr(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("ISR de su salario", "ISR de rentas del trabajo", "pone su salario, bonificaciones e IGSS, y le dice el ISR del año y la retención de cada mes.");
  const b = h.bloque("isr-asalariados");
  h.seccion("SUS DATOS");
  const sueldo = h.numero("Salario mensual", 12000, { min: 0, ayuda: "Su salario ordinario más horas extra, comisiones y otros pagos fijos del mes." });
  const bonif = h.numero("Bonificaciones mensuales", 250, { min: 0, ayuda: "La bonificación incentivo y otras bonificaciones. Pagan ISR aunque no paguen IGSS." });
  const igss = h.numero("Descuento mensual del IGSS", 580, { min: 0, ayuda: "Cópielo de su recibo de pago o boleta." });
  const meses = h.numero("Meses que va a trabajar este año", 12, { formato: "entero", min: 1, max: 12 });
  const iva = h.numero("IVA de sus facturas del año (planilla del IVA)", 0, { min: 0, ayuda: "El IVA de sus compras personales con factura a su NIT. Déjelo en cero si no presenta la planilla." });
  b.campo("sueldo", sueldo).campo("bonificaciones", bonif).campo("igss", igss).campo("meses", meses).campo("planillaIva", iva);
  const rentaNeta = h.paso("Renta del año", `(${sueldo.ref}+${bonif.ref})*${meses.ref}`);
  const deducciones = h.paso(
    "Deducciones del año",
    `${T.numero("gt.isr-deduccion-gastos-personales")}+${T.numero("gt.isr-deduccion-extraordinaria")}+${igss.ref}*${meses.ref}+MIN(${iva.ref},${T.numero("gt.isr-tope-planilla-iva")})`,
  );
  const imponible = h.paso("Renta imponible", l.r(`MAX(0,${rentaNeta}-${deducciones})`));
  const anual = h.paso("ISR del año", l.r(h.escala(T.escala("gt.isr-escala"), imponible)));
  h.seccion("SU ISR");
  h.aviso(`IF(${igss.ref}>${sueldo.ref},"El descuento del IGSS no puede ser mayor que el salario.","")`);
  b.resultado("rentaNeta", h.resultado("Renta del año", l.r(rentaNeta)));
  b.resultado("deducciones", h.resultado("Deducciones del año", l.r(deducciones)));
  b.resultado("imponible", h.resultado("Renta imponible", `${imponible}`));
  b.resultado("anual", h.resultado("ISR del año", `${anual}`));
  b.resultado("mensual", h.resultado("Retención de cada mes", l.r(`${anual}/${meses.ref}`), { total: true }));
  h.nota("El aguinaldo y el Bono 14 no pagan ISR (hasta un salario cada uno), por eso no se suman. La planilla del IVA tiene un tope.");
}

function bonos(l: Libro): void {
  const T = l.tablas;
  const conAg = l.disponible("aguinaldo");
  const con14 = l.disponible("bono-14");
  if (!conAg && !con14) return;
  const h = l.hoja("Aguinaldo y Bono 14", "Aguinaldo y Bono 14", "calcula el aguinaldo de diciembre y enero y el Bono 14 de julio, completos o proporcionales si dejó de trabajar.");
  h.seccion("SUS DATOS");
  const salario = h.numero("Salario ordinario mensual", 4500, { min: 0, ayuda: "Sin la bonificación incentivo ni horas extra." });
  const ingreso = h.fecha("Fecha en que empezó a trabajar", "2024-03-01");
  const salida = h.fecha("Último día de trabajo (opcional)", null, "Solo si dejó de trabajar.");
  const hoy = h.fechaHoy("Fecha de hoy", "Se llena sola. Sirve para saber qué período se paga.");
  const etiquetaSalida = "Lo que le toca porque dejó de trabajar";
  const motivo = (valor: string, etiqueta: string): Entrada =>
    h.opcion(
      "Qué quiere calcular",
      [
        { valor, etiqueta },
        { valor: "salida", etiqueta: etiquetaSalida },
      ],
      valor,
    );
  if (conAg) {
    const b = h.bloque("aguinaldo");
    h.seccion("AGUINALDO");
    const m = motivo("diciembre", "El aguinaldo de diciembre y enero");
    b.campo("salario", salario).campo("fechaIngreso", ingreso).campo("motivo", m).campo("fechaSalida", salida).hoy(hoy);
    const corte = h.paso("Aguinaldo: cierre del período", `IF(${m.ref}="${etiquetaSalida}",${salida.ref},DATE(IF(MONTH(${hoy.ref})=1,YEAR(${hoy.ref})-1,YEAR(${hoy.ref})),11,30))`, "fecha");
    const dias = diasDelPeriodo(h, "Aguinaldo", ingreso.ref, corte, 12);
    const monto = h.paso("Aguinaldo", l.r(`${salario.ref}*${T.numero("gt.aguinaldo")}/100*${dias}/365`));
    const dic = h.paso("Aguinaldo en diciembre", `IF(${m.ref}="${etiquetaSalida}","",${l.r(`${monto}*${T.numero("gt.aguinaldo-pago-diciembre")}/100`)})`);
    h.aviso(`IF(AND(${m.ref}="${etiquetaSalida}",NOT(ISNUMBER(${salida.ref}))),"Indique su último día de trabajo.",IF(${ingreso.ref}>${corte},"La fecha de ingreso no puede ser posterior al cierre del período.",""))`);
    b.resultado("dias", h.resultado("Días que cuentan", `${dias}`, { formato: "entero" }));
    b.resultado("aguinaldo", h.resultado("Aguinaldo", `${monto}`, { total: true }));
    b.resultado("enDiciembre", h.resultado("Se paga en diciembre", `${dic}`));
    b.resultado("enEnero", h.resultado("Se paga en enero", `IF(${m.ref}="${etiquetaSalida}","",${l.r(`${monto}-${dic}`)})`));
    h.nota("El aguinaldo es un salario por año, del 1 de diciembre al 30 de noviembre. La mitad se paga en la primera quincena de diciembre y el resto en la segunda de enero.");
  }
  if (con14) {
    const b = h.bloque("bono-14");
    h.seccion("BONO 14");
    const m = motivo("julio", "El Bono 14 que se paga en julio");
    b.campo("salario", salario).campo("fechaIngreso", ingreso).campo("motivo", m).campo("fechaSalida", salida).hoy(hoy);
    const corte = h.paso("Bono 14: cierre del período", `IF(${m.ref}="${etiquetaSalida}",${salida.ref},DATE(IF(MONTH(${hoy.ref})<=7,YEAR(${hoy.ref}),YEAR(${hoy.ref})+1),6,30))`, "fecha");
    const dias = diasDelPeriodo(h, "Bono 14", ingreso.ref, corte, 7);
    h.aviso(`IF(AND(${m.ref}="${etiquetaSalida}",NOT(ISNUMBER(${salida.ref}))),"Indique su último día de trabajo.",IF(${ingreso.ref}>${corte},"La fecha de ingreso no puede ser posterior al cierre del período.",""))`);
    b.resultado("dias", h.resultado("Días que cuentan", `${dias}`, { formato: "entero" }));
    b.resultado("bono", h.resultado("Bono 14", l.r(`${salario.ref}*${T.numero("gt.bono-14")}/100*${dias}/365`), { total: true }));
    h.nota("El Bono 14 es un salario por año, del 1 de julio al 30 de junio, y se paga en la primera quincena de julio.");
  }
}

function indemnizacion(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Indemnización", "Indemnización y prestaciones al terminar", "pone sus fechas, su salario promedio y cómo terminó la relación, y le dice la indemnización, el aguinaldo, el Bono 14 y las vacaciones.");
  const b = h.bloque("indemnizacion");
  h.seccion("SUS DATOS");
  const ingreso = h.fecha("Fecha en que empezó a trabajar", "2021-05-01");
  const salida = h.fecha("Último día de trabajo", l.hoy);
  const motivo = h.opcion(
    "Cómo terminó la relación laboral",
    [
      { valor: "despido", etiqueta: "Lo despidieron sin causa justa" },
      { valor: "despido-indirecto", etiqueta: "Renunció por una falta grave del patrono" },
      { valor: "renuncia", etiqueta: "Renunció" },
      { valor: "despido-justificado", etiqueta: "Lo despidieron con causa justa" },
    ],
    "despido",
  );
  const prom = h.numero("Promedio de su salario de los últimos seis meses", 5000, { min: 0, ayuda: "Con horas extra y sin la bonificación incentivo. Sume los seis meses y divida entre seis." });
  const pend = h.numero("Días de vacaciones de años anteriores que no gozó", 0, { formato: "numero", min: 0 });
  b.campo("fechaIngreso", ingreso).campo("fechaSalida", salida).campo("motivo", motivo).campo("promedio", prom).campo("vacacionesPendientes", pend);
  const ing = ingreso.ref;
  const s = salida.ref;
  const p = prom.ref;
  const ag = T.numero("gt.aguinaldo");
  const b14 = T.numero("gt.bono-14");
  h.pasoTitulo("Indemnización");
  const diasServ = h.paso("Días de servicio", `${s}-${ing}+1`, "entero");
  const conInd = `OR(${motivo.ref}="Lo despidieron sin causa justa",${motivo.ref}="Renunció por una falta grave del patrono")`;
  const salInd = h.paso("Salario indemnizable (con un sexto de aguinaldo y Bono 14)", l.r(`${p}+${p}*${ag}/100/12+${p}*${b14}/100/12`));
  const ind = h.paso("Indemnización", `IF(${conInd},${l.r(`${salInd}*${T.numero("gt.indemnizacion-meses-por-anio")}*${diasServ}/365`)},0)`);
  h.pasoTitulo("Prestaciones proporcionales");
  const dAg = diasDelPeriodo(h, "Aguinaldo", ing, s, 12);
  const dB = diasDelPeriodo(h, "Bono 14", ing, s, 7);
  const aguinaldo = h.paso("Aguinaldo proporcional", l.r(`${p}*${ag}/100*${dAg}/365`));
  const bono = h.paso("Bono 14 proporcional", l.r(`${p}*${b14}/100*${dB}/365`));
  const k0 = `(YEAR(${s})-YEAR(${ing}))`;
  const anios = h.paso("Años cumplidos", `IF(AND(${k0}>0,${aniversario(ing, k0)}>${s}),${k0}-1,${k0})`, "entero");
  const desdeAniv = h.paso("Días desde el último aniversario", `MIN(365,${s}-${aniversario(ing, anios)}+1)`, "entero");
  const diasVac = h.paso("Días de vacaciones", l.r(`${T.numero("gt.vacaciones-dias-habiles")}*${desdeAniv}/365+${pend.ref}`), "numero");
  const vac = h.paso("Vacaciones", l.r(`${p}/30*${diasVac}`));
  h.seccion("SU LIQUIDACIÓN");
  h.aviso(`IF(${ing}>${s},"La fecha de ingreso no puede ser posterior a la de salida.","")`);
  b.resultado("diasServicio", h.resultado("Días de servicio", `${diasServ}`, { formato: "entero" }));
  b.resultado("salarioIndemnizable", h.resultado("Salario indemnizable", `${salInd}`));
  b.resultado("indemnizacion", h.resultado("Indemnización por tiempo servido", `${ind}`));
  b.resultado("aguinaldo", h.resultado("Aguinaldo proporcional", `${aguinaldo}`));
  b.resultado("bono14", h.resultado("Bono 14 proporcional", `${bono}`));
  b.resultado("diasVacaciones", h.resultado("Días de vacaciones a pagar", `${diasVac}`, { formato: "numero" }));
  b.resultado("vacaciones", h.resultado("Vacaciones", `${vac}`));
  b.resultado("total", h.resultado("Total", l.r(`${ind}+${aguinaldo}+${bono}+${vac}`), { total: true }));
  h.nota("La indemnización se calcula con su promedio más la sexta parte del aguinaldo y del Bono 14, como se aplica en la práctica. Si renunció o lo despidieron con causa justa, no hay indemnización, pero sí las prestaciones.");
}

export const planillaGt: PlanillaPais = {
  mercado: "gt",
  titulo: (anio) => `Planilla de salario y prestaciones Guatemala ${anio}`,
  construir(l) {
    if (l.disponible("isr-asalariados")) isr(l);
    bonos(l);
    if (l.disponible("indemnizacion")) indemnizacion(l);
  },
};
