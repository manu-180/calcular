import type { Hoja, Libro, PlanillaPais } from "./marco";
import { aniversario } from "./formulas";

// antiguedad de src/paises/ni/prestaciones.ts: años por aniversario hasta el último día trabajado; si
// ese día es la víspera del aniversario, el año ya cuenta completo.
function antiguedadNi(h: Hoja, ingreso: string, salida: string): { anios: string; diasDelAnio: string } {
  const k0 = `(YEAR(${salida})-YEAR(${ingreso}))`;
  const completos = h.paso("Años cumplidos", `IF(AND(${k0}>0,${aniversario(ingreso, k0)}>${salida}),${k0}-1,${k0})`, "entero");
  const diasDelAnio = h.paso("Días del año en curso", `MIN(365,${salida}-${aniversario(ingreso, completos)}+1)`, "entero");
  const anios = h.paso("Antigüedad en años", `IF(${diasDelAnio}=365,${completos}+1,${completos}+${diasDelAnio}/365)`, "factor");
  return { anios, diasDelAnio };
}

// mesesIndemnizacion (Código del Trabajo, art. 45).
function mesesIndemnizacion(l: Libro, anios: string, conMinimo: string): string {
  const T = l.tablas;
  const sin = `(MIN(${anios},3)*${T.numero("ni.indemnizacion-meses-por-anio")}+MAX(0,${anios}-3)*${T.numero("ni.indemnizacion-dias-desde-cuarto-anio")}/30)`;
  return `MIN(${T.numero("ni.indemnizacion-tope-meses")},IF(${conMinimo},MAX(${T.numero("ni.indemnizacion-minimo-meses")},${sin}),${sin}))`;
}

function diasAguinaldo(h: Hoja, ingreso: string, corte: string): string {
  const inicio = `DATE(IF(MONTH(${corte})=12,YEAR(${corte}),YEAR(${corte})-1),12,1)`;
  return h.paso("Días del período del aguinaldo", `MIN(365,${corte}-MAX(${ingreso},${inicio})+1)`, "entero");
}

function salarioNeto(l: Libro): void {
  const T = l.tablas;
  const conNeto = l.disponible("salario-neto");
  const conIr = l.disponible("ir-salarial");
  if (!conNeto && !conIr) return;
  const h = l.hoja("Salario neto", "Salario neto: INSS e IR", "ponés tu salario bruto y te dice el INSS, el IR que te retienen y tu salario neto.");
  h.seccion("TUS DATOS");
  const salario = h.numero("Salario bruto mensual", 20000, { min: 0 });
  const inss = T.mapa("ni.inss-laboral");
  const regimen = h.opcionDato("Régimen del INSS", inss, "integral");
  const s = salario.ref;
  const tasa = h.paso("Tasa del INSS", inss.de(regimen.ref), "porcentaje");
  const cuota = h.paso("INSS", l.r(`${s}*${tasa}/100`));
  const netoMes = h.paso("Salario menos INSS", l.r(`${s}-${cuota}`));
  const rna = h.paso("Renta neta del año", l.r(`${netoMes}*12`));
  const e = T.escala("ni.ir-rentas-trabajo");
  const irAnual = h.paso("IR del año", l.r(h.escala(e, rna)));
  const irMes = h.paso("IR del mes", l.r(`${irAnual}/12`));
  if (conNeto) {
    const b = h.bloque("salario-neto");
    b.campo("salario", salario).campo("regimen", regimen);
    h.seccion("TU SALARIO NETO");
    b.resultado("tasa", h.resultado("Tasa del INSS", `${tasa}`, { formato: "porcentaje" }));
    b.resultado("inss", h.resultado("INSS", `${cuota}`));
    b.resultado("ir", h.resultado("IR", `${irMes}`));
    b.resultado("neto", h.resultado("Salario neto", l.r(`${s}-${cuota}-${irMes}`), { total: true }));
  }
  if (conIr) {
    const b = h.bloque("ir-salarial");
    b.campo("salario", salario).campo("regimen", regimen);
    const k = `COUNTIF(${e.rangoDesde},"<"&${rna})`;
    h.seccion("DETALLE DEL IR");
    b.resultado("inss", h.resultado("INSS del mes", `${cuota}`));
    b.resultado("rentaNetaAnual", h.resultado("Renta neta del año", `${rna}`));
    b.resultado("irAnual", h.resultado("IR del año", `${irAnual}`));
    b.resultado("irMensual", h.resultado("IR del mes", `${irMes}`));
    b.resultado("marginal", h.resultado("Tasa del último tramo", `IF(${k}=0,0,INDEX(${e.rangoTasa},${k}))`, { formato: "porcentaje" }));
    b.resultado("efectiva", h.resultado("Tasa efectiva sobre el salario", `IF(${s}>0,${l.r(`${irMes}/${s}*100`)},0)`, { formato: "porcentaje" }));
  }
  h.nota("El IR se retiene cada mes sobre el salario de todo el año. No incluye otros descuentos, como préstamos, cuota sindical o pensión de alimentos.");
}

function aguinaldo(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Aguinaldo", "Aguinaldo (décimo tercer mes)", "calcula el aguinaldo de diciembre, completo o proporcional si dejaste el trabajo.");
  const b = h.bloque("aguinaldo");
  h.seccion("TUS DATOS");
  const salario = h.numero("Salario mensual", 15000, { min: 0, ayuda: "El último salario ordinario. Si ganás por comisión o a destajo, el más alto de los últimos seis meses." });
  const ingreso = h.fecha("Fecha en que empezaste a trabajar", "2024-03-01");
  const salidaTxt = "La parte que te toca porque dejaste el trabajo";
  const motivo = h.opcion(
    "Qué querés calcular",
    [
      { valor: "diciembre", etiqueta: "El aguinaldo de diciembre" },
      { valor: "salida", etiqueta: salidaTxt },
    ],
    "diciembre",
  );
  const salida = h.fecha("Último día de trabajo (opcional)", null, "Solo si dejaste el trabajo.");
  const hoy = h.fechaHoy("Fecha de hoy", "Se llena sola. Define de qué año es el aguinaldo.");
  b.campo("salario", salario).campo("fechaIngreso", ingreso).campo("motivo", motivo).campo("fechaSalida", salida).hoy(hoy);
  const corte = h.paso("Cierre del período", `IF(${motivo.ref}="${salidaTxt}",${salida.ref},DATE(YEAR(${hoy.ref}),11,30))`, "fecha");
  const dias = diasAguinaldo(h, ingreso.ref, corte);
  h.seccion("TU AGUINALDO");
  h.aviso(`IF(AND(${motivo.ref}="${salidaTxt}",NOT(ISNUMBER(${salida.ref}))),"Poné tu último día de trabajo.",IF(${ingreso.ref}>${corte},"La fecha de ingreso no puede ser posterior al cierre del período.",""))`);
  b.resultado("dias", h.resultado("Días que cuentan", `${dias}`, { formato: "entero" }));
  b.resultado("aguinaldo", h.resultado("Aguinaldo", l.r(`${salario.ref}*${T.numero("ni.aguinaldo-meses")}*${dias}/365`), { total: true }));
  h.nota("Va del 1 de diciembre al 30 de noviembre y se paga en los primeros diez días de diciembre. No paga INSS ni IR.");
}

function liquidacion(l: Libro): void {
  const T = l.tablas;
  const conLiq = l.disponible("liquidacion");
  const conInd = l.disponible("indemnizacion-por-antiguedad");
  if (!conLiq && !conInd) return;
  const h = l.hoja("Liquidación", "Liquidación: indemnización por antigüedad, aguinaldo y vacaciones", "ponés tus fechas, tu salario y cómo terminó el contrato, y te dice la indemnización por antigüedad, el aguinaldo y las vacaciones.");
  h.seccion("TUS DATOS");
  const ingreso = h.fecha("Fecha en que empezaste a trabajar", "2021-06-01");
  const salida = h.fecha("Último día de trabajo", l.hoy);
  const despidoTxt = "Te despidieron sin causa justificada";
  const justTxt = "Te despidieron por una causa del artículo 48";
  const motivo = h.opcion(
    "Cómo terminó el contrato",
    [
      { valor: "despido", etiqueta: despidoTxt },
      { valor: "renuncia", etiqueta: "Renunciaste o fue de mutuo acuerdo" },
      { valor: "despido-justificado", etiqueta: justTxt },
    ],
    "despido",
  );
  const salario = h.numero("Salario mensual", 15000, { min: 0, ayuda: "El último salario ordinario. Si varía, el promedio de los últimos seis meses." });
  const a = antiguedadNi(h, ingreso.ref, salida.ref);
  const meses = h.paso("Meses de indemnización", `IF(${motivo.ref}="${justTxt}",0,${mesesIndemnizacion(l, a.anios, `${motivo.ref}="${despidoTxt}"`)})`, "factor");
  const ind = h.paso("Indemnización por antigüedad", l.r(`${salario.ref}*${meses}`));
  const aviso = `IF(${ingreso.ref}>${salida.ref},"La fecha de ingreso no puede ser posterior a la de salida.","")`;
  if (conLiq) {
    const b = h.bloque("liquidacion");
    const pend = h.numero("Días de vacaciones que no gozaste (opcional)", null, { formato: "numero", min: 0, ayuda: "Si lo dejás vacío, se calculan los del último año, desde tu último aniversario." });
    b.campo("fechaIngreso", ingreso).campo("fechaSalida", salida).campo("motivo", motivo).campo("salario", salario).campo("vacacionesPendientes", pend);
    const dAg = diasAguinaldo(h, ingreso.ref, salida.ref);
    const ag = h.paso("Aguinaldo proporcional", l.r(`${salario.ref}*${T.numero("ni.aguinaldo-meses")}*${dAg}/365`));
    const diasVac = h.paso("Días de vacaciones", l.r(`IF(ISNUMBER(${pend.ref}),${pend.ref},${T.numero("ni.vacaciones-dias-por-semestre")}*2*${a.diasDelAnio}/365)`), "numero");
    const vac = h.paso("Vacaciones", l.r(`${salario.ref}/30*${diasVac}`));
    h.seccion("TU LIQUIDACIÓN");
    h.aviso(aviso);
    b.resultado("anios", h.resultado("Antigüedad en años", l.r(a.anios), { formato: "anios" }));
    b.resultado("meses", h.resultado("Meses de salario de indemnización", l.r(meses), { formato: "numero" }));
    b.resultado("indemnizacion", h.resultado("Indemnización por antigüedad", `${ind}`));
    b.resultado("diasAguinaldo", h.resultado("Días del aguinaldo", `${dAg}`, { formato: "entero" }));
    b.resultado("aguinaldo", h.resultado("Aguinaldo proporcional", `${ag}`));
    b.resultado("diasVacaciones", h.resultado("Días de vacaciones", `${diasVac}`, { formato: "numero" }));
    b.resultado("vacaciones", h.resultado("Vacaciones", `${vac}`));
    b.resultado("total", h.resultado("Total", l.r(`${ind}+${ag}+${vac}`), { total: true }));
    h.nota("Al renunciar conservás lo ganado por antigüedad (art. 43), sin el mínimo de un mes. Con despido justificado no hay indemnización. Las vacaciones se pagan con el salario mensual entre 30.");
  }
  if (conInd) {
    const b = h.bloque("indemnizacion-por-antiguedad");
    b.campo("fechaIngreso", ingreso).campo("fechaSalida", salida).campo("motivo", motivo).campo("salario", salario);
    h.seccion("SOLO LA INDEMNIZACIÓN POR ANTIGÜEDAD");
    if (!conLiq) h.aviso(aviso);
    b.resultado("anios", h.resultado("Antigüedad en años", l.r(a.anios), { formato: "anios" }));
    b.resultado("meses", h.resultado("Meses de salario", l.r(meses), { formato: "numero" }));
    b.resultado("indemnizacion", h.resultado("Indemnización por antigüedad", `${ind}`, { total: true }));
    h.nota("Un mes de salario por cada uno de los tres primeros años y 20 días por año desde el cuarto, con un mínimo de un mes y un máximo de cinco. No paga IR.");
  }
}

export const planillaNi: PlanillaPais = {
  mercado: "ni",
  titulo: (anio) => `Planilla de salario y liquidación Nicaragua ${anio}`,
  construir(l) {
    salarioNeto(l);
    if (l.disponible("aguinaldo")) aguinaldo(l);
    liquidacion(l);
  },
};
