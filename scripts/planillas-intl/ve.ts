import type { BloqueHoja, Entrada, Hoja, Libro, PlanillaPais } from "./marco";
import { tiempoPorMeses } from "./formulas";

const BS = "Bolívares (Bs.)";

function moneda(h: Hoja): Entrada {
  return h.opcion(
    "En qué moneda está tu salario",
    [
      { valor: "VES", etiqueta: BS },
      { valor: "USD", etiqueta: "Dólares ($)" },
    ],
    "USD",
    "Los montos salen en la misma moneda.",
  );
}

// Las calculadoras devuelven cada monto en la clave de su moneda (Bs o Usd) y dejan la otra vacía.
function enMoneda(h: Hoja, b: BloqueHoja, clave: string, etiqueta: string, ref: string, mon: Entrada): void {
  b.resultado(`${clave}Bs`, h.paso(`${etiqueta} (si cobras en bolívares)`, `IF(${mon.ref}="${BS}",${ref},"")`, "numero"));
  b.resultado(`${clave}Usd`, h.paso(`${etiqueta} (si cobras en dólares)`, `IF(${mon.ref}="${BS}","",${ref})`, "numero"));
}

// diasDeVacaciones de src/paises/ve/reglas.ts (LOTTT arts. 190 y 192) para el año de servicio n.
function diasVac(l: Libro, n: string): { vacaciones: string; bono: string } {
  const T = l.tablas;
  const extra = `MAX(0,${n}-1)`;
  return {
    vacaciones: `(${T.numero("ve.vacaciones-dias-base")}+MIN(${extra},${T.numero("ve.vacaciones-dias-adicionales-tope")}))`,
    bono: `MIN(${T.numero("ve.bono-vacacional-dias-base")}+${extra},${T.numero("ve.bono-vacacional-dias-tope")})`,
  };
}

function bonos(l: Libro): void {
  const T = l.tablas;
  const conUt = l.disponible("utilidades");
  const conVac = l.disponible("vacaciones");
  if (!conUt && !conVac) return;
  const h = l.hoja("Utilidades y vacaciones", "Utilidades, vacaciones y bono vacacional", "calcula las utilidades del año y el pago de vacaciones con su bono vacacional.");
  h.seccion("TUS DATOS");
  const mon = moneda(h);
  const salario = h.numero("Salario mensual", 200, { formato: "numero", min: 0, ayuda: "Solo la parte salarial. El cestaticket y el bono de guerra económica no cuentan." });
  const diario = h.paso("Salario diario (entre 30)", `${salario.ref}/${T.numero("ve.dias-mes-salario")}`, "numero");
  if (conUt) {
    const b = h.bloque("utilidades");
    h.seccion("UTILIDADES");
    const dias = h.numero("Días de utilidades que paga tu empresa al año", 30, { formato: "entero", min: 30, max: 120, ayuda: "Si no lo sabes, deja el mínimo de ley." });
    const meses = h.numero("Meses completos trabajados en el año", 12, { formato: "entero", min: 0, max: 12 });
    b.campo("moneda", mon).campo("salario", salario).campo("dias", dias).campo("meses", meses);
    const monto = h.paso("Utilidades", l.r(`${dias.ref}*${meses.ref}*${diario}/12`), "numero");
    enMoneda(h, b, "diario", "Salario diario", l.r(diario), mon);
    enMoneda(h, b, "utilidades", "Utilidades", monto, mon);
    b.resultado("diasQueTocan", h.resultado("Días de utilidades que te tocan", l.r(`${dias.ref}*${meses.ref}/12`), { formato: "numero" }));
    h.resultado("Utilidades", `${monto}`, { total: true, formato: "numero" });
    h.nota("Van de 30 a 120 días de salario por año. Si no trabajaste el año completo, cobras la parte de los meses completos.");
  }
  if (conVac) {
    const b = h.bloque("vacaciones");
    h.seccion("VACACIONES Y BONO VACACIONAL");
    const anios = h.numero("Años de servicio que cumples con estas vacaciones", 1, { formato: "entero", min: 1, max: 60, ayuda: "Si es tu primer año completo, pon 1." });
    b.campo("moneda", mon).campo("salario", salario).campo("anios", anios);
    const d = diasVac(l, anios.ref);
    const dv = h.paso("Días de vacaciones", d.vacaciones, "entero");
    const db = h.paso("Días de bono vacacional", d.bono, "entero");
    const pago = h.paso("Pago de vacaciones", l.r(`${dv}*${diario}`), "numero");
    const bono = h.paso("Bono vacacional", l.r(`${db}*${diario}`), "numero");
    enMoneda(h, b, "pago", "Pago de vacaciones", pago, mon);
    enMoneda(h, b, "bono", "Bono vacacional", bono, mon);
    enMoneda(h, b, "total", "Vacaciones más bono", l.r(`${pago}+${bono}`), mon);
    b.resultado("diasVacaciones", h.resultado("Días hábiles de vacaciones", `${dv}`, { formato: "entero" }));
    b.resultado("diasBono", h.resultado("Días de bono vacacional", `${db}`, { formato: "entero" }));
    h.resultado("Pago de vacaciones", `${pago}`, { formato: "numero" });
    h.resultado("Bono vacacional", `${bono}`, { formato: "numero" });
    h.resultado("Total", l.r(`${pago}+${bono}`), { total: true, formato: "numero" });
    h.nota("15 días hábiles el primer año y uno más por año, hasta 15 adicionales. El bono vacacional va de 15 a 30 días.");
  }
}

function terminacion(l: Libro): void {
  const T = l.tablas;
  const conLiq = l.disponible("liquidacion");
  const conPre = l.disponible("prestaciones-sociales");
  if (!conLiq && !conPre) return;
  const h = l.hoja("Liquidación", "Prestaciones sociales y liquidación", "pones tus fechas y tu salario, y te dice las prestaciones sociales (garantía o retroactivo), la indemnización, las vacaciones y las utilidades fraccionadas.");
  h.seccion("TUS DATOS");
  const mon = moneda(h);
  const salario = h.numero("Último salario mensual", 200, { formato: "numero", min: 0, ayuda: "Solo la parte salarial. El cestaticket y el bono de guerra económica no cuentan." });
  const ingreso = h.fecha("Fecha de ingreso", "2021-03-01");
  const salida = h.fecha("Último día de trabajo", l.hoy);
  const du = h.numero("Días de utilidades que paga tu empresa al año", 30, { formato: "entero", min: 30, max: 120, ayuda: "Si no lo sabes, deja el mínimo de ley." });
  const garantiaIn = h.numero("Garantía de prestaciones depositada, sin intereses (opcional)", null, {
    formato: "numero",
    min: 0,
    ayuda: "Sale de tu fideicomiso o del informe trimestral de la empresa. Si lo dejas vacío, se estima con tu último salario.",
  });
  const t = tiempoPorMeses(h, "Tiempo trabajado", ingreso.ref, `(${salida.ref}+1)`);
  const diario = h.paso("Salario diario (entre 30)", `${salario.ref}/${T.numero("ve.dias-mes-salario")}`, "numero");
  const enCurso = diasVac(l, `(${t.anios}+1)`);
  h.pasoTitulo("Prestaciones sociales");
  const integral = h.paso("Salario integral diario", l.r(`${diario}+${diario}*${du.ref}/360+${diario}*${enCurso.bono}/360`), "numero");
  const tm = h.paso("Meses trabajados", `${t.anios}*12+${t.meses}`, "entero");
  const corta = `${tm}<3`;
  const trimestres = `(INT(${tm}/3)+IF(OR(MOD(${tm},3)>0,${t.dias}>0),1,0))`;
  const ad = T.numero("ve.prestaciones-dias-adicionales");
  const topeAd = T.numero("ve.prestaciones-dias-adicionales-tope");
  const n = `MAX(0,${t.anios}-1)`;
  const m = `MIN(${n},INT(${topeAd}/${ad}))`;
  const adicionales = `(${ad}*${m}*(${m}+1)/2+${topeAd}*MAX(0,${n}-${m}))`;
  const diasG = h.paso("Días de garantía", `IF(${corta},0,${trimestres}*${T.numero("ve.prestaciones-garantia-dias")}+${adicionales})`, "entero");
  const aniosR = `(${t.anios}+IF(OR(${t.meses}>6,AND(${t.meses}=6,${t.dias}>0)),1,0))`;
  const diasR = h.paso(
    "Días del cálculo retroactivo",
    `IF(${corta},MAX(1,${t.meses}+IF(${t.dias}>0,1,0))*${T.numero("ve.prestaciones-dias-por-mes-menos-3-meses")},${aniosR}*${T.numero("ve.prestaciones-retroactivo-dias")})`,
    "entero",
  );
  const retro = h.paso("Cálculo retroactivo", l.r(`${diasR}*${integral}`), "numero");
  const garantia = h.paso("Garantía", `IF(${corta},0,IF(ISNUMBER(${garantiaIn.ref}),${garantiaIn.ref},${l.r(`${diasG}*${integral}`)}))`, "numero");
  const prest = h.paso("Prestaciones sociales (la mayor)", `MAX(${garantia},${retro})`, "numero");
  const avisoUt = `IF(OR(${du.ref}<${T.numero("ve.utilidades-dias-minimo")},${du.ref}>${T.numero("ve.utilidades-dias-maximo")}),"Las utilidades van de 30 a 120 días por año.","")`;
  const avisoFechas = `IF(${salida.ref}<${ingreso.ref},"La fecha de salida tiene que ser igual o posterior a la de ingreso.","")`;

  if (conPre) {
    const b = h.bloque("prestaciones-sociales");
    b.campo("moneda", mon).campo("salario", salario).campo("fechaIngreso", ingreso).campo("fechaSalida", salida).campo("diasUtilidades", du).campo("garantia", garantiaIn);
    h.seccion("PRESTACIONES SOCIALES");
    h.aviso(`${avisoFechas}&${avisoUt}`);
    enMoneda(h, b, "salarioIntegral", "Salario integral diario", integral, mon);
    enMoneda(h, b, "garantia", "Garantía", `IF(${corta},"",${garantia})`, mon);
    enMoneda(h, b, "retroactivo", "Retroactivo", retro, mon);
    enMoneda(h, b, "total", "Prestaciones sociales", prest, mon);
    h.resultado("Tiempo trabajado", `${t.anios}&" años, "&${t.meses}&" meses y "&${t.dias}&" días"`, { formato: "texto" });
    b.resultado("diasGarantia", h.resultado("Días de garantía", `${diasG}`, { formato: "entero" }));
    b.resultado("diasRetroactivo", h.resultado("Días del cálculo retroactivo", `${diasR}`, { formato: "entero" }));
    h.resultado("Garantía", `IF(${corta},"",${garantia})`, { formato: "numero" });
    h.resultado("Cálculo retroactivo", `${retro}`, { formato: "numero" });
    h.resultado("Prestaciones sociales (la mayor de las dos)", `${prest}`, { total: true, formato: "numero" });
  }
  if (conLiq) {
    const b = h.bloque("liquidacion");
    h.seccion("LIQUIDACIÓN COMPLETA");
    const despidoTxt = "Despido sin causa justificada";
    const motivo = h.opcion(
      "Cómo terminó la relación de trabajo",
      [
        { valor: "despido-injustificado", etiqueta: despidoTxt },
        { valor: "renuncia", etiqueta: "Renuncia" },
        { valor: "despido-justificado", etiqueta: "Despido con causa justificada" },
      ],
      "despido-injustificado",
      "Despido sin causa justificada y sin pedir el reenganche.",
    );
    const pend = h.numero("Años de vacaciones vencidas que no disfrutaste ni te pagaron", 0, { formato: "entero", min: 0, max: 10 });
    b.campo("moneda", mon).campo("salario", salario).campo("fechaIngreso", ingreso).campo("fechaSalida", salida).campo("motivo", motivo);
    b.campo("diasUtilidades", du).campo("periodosPendientes", pend).campo("garantia", garantiaIn);
    h.pasoTitulo("Liquidación");
    const ind = h.paso("Indemnización por despido", `IF(${motivo.ref}="${despidoTxt}",${prest},0)`, "numero");
    const fraccion = `(${enCurso.vacaciones}+${enCurso.bono})*${t.meses}/12`;
    const vencidos = Array.from({ length: 10 }, (_, k) => {
      const d = diasVac(l, `(${t.anios}-${k})`);
      return `IF(${k}<${pend.ref},${d.vacaciones}+${d.bono},0)`;
    }).join("+");
    const diasVacTot = h.paso("Días de vacaciones y bono a pagar", `${fraccion}+${vencidos}`, "numero");
    const vac = h.paso("Vacaciones y bono", l.r(`${diasVacTot}*${diario}`), "numero");
    const tu = tiempoPorMeses(h, "Ejercicio de utilidades", `MAX(${ingreso.ref},DATE(YEAR(${salida.ref}),1,1))`, `(${salida.ref}+1)`);
    const mesesU = h.paso("Meses completos del ejercicio", `MIN(12,${tu.anios}*12+${tu.meses})`, "entero");
    const ut = h.paso("Utilidades fraccionadas", l.r(`${du.ref}*${mesesU}*${diario}/12`), "numero");
    const total = l.r(`${prest}+${ind}+${vac}+${ut}`);
    enMoneda(h, b, "prestaciones", "Prestaciones sociales", prest, mon);
    enMoneda(h, b, "indemnizacion", "Indemnización", ind, mon);
    enMoneda(h, b, "vacaciones", "Vacaciones", vac, mon);
    enMoneda(h, b, "utilidades", "Utilidades", ut, mon);
    enMoneda(h, b, "total", "Total", total, mon);
    if (!conPre) h.aviso(`${avisoFechas}&${avisoUt}`);
    h.aviso(`IF(${pend.ref}>${t.anios},"No puedes tener más años de vacaciones vencidas que años trabajados.","")`);
    h.resultado("Prestaciones sociales", `${prest}`, { formato: "numero" });
    h.resultado("Indemnización por despido", `${ind}`, { formato: "numero" });
    h.resultado("Vacaciones y bono vacacional", `${vac}`, { formato: "numero" });
    b.resultado("mesesUtilidades", h.resultado("Meses de utilidades", `${mesesU}`, { formato: "entero" }));
    h.resultado("Utilidades fraccionadas", `${ut}`, { formato: "numero" });
    h.resultado("Total de la liquidación", total, { total: true, formato: "numero" });
    h.nota(
      "La indemnización por despido es igual a tus prestaciones sociales (art. 92 de la LOTTT). Las utilidades se toman del año calendario. No incluye intereses de prestaciones ni salarios pendientes. Los montos van en la moneda de tu salario.",
    );
  }
}

export const planillaVe: PlanillaPais = {
  mercado: "ve",
  titulo: (anio) => `Planilla de prestaciones y liquidación Venezuela ${anio}`,
  construir(l) {
    bonos(l);
    terminacion(l);
  },
};
