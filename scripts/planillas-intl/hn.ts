import type { Libro, PlanillaPais } from "./marco";
import { tiempoPorMeses } from "./formulas";

function isr(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("ISR de su salario", "Impuesto sobre la renta del salario", "pone su salario mensual y le dice el ISR del año, la retención de cada mes y su tasa efectiva.");
  const b = h.bloque("impuesto-sobre-la-renta");
  h.seccion("SUS DATOS");
  const salario = h.numero("Salario mensual", 30000, { min: 0 });
  const otros = h.numero("Otros ingresos del año que pagan ISR (opcional)", null, { min: 0, ayuda: "Comisiones, bonos u otros pagos gravados que no estén en el salario mensual." });
  b.campo("salario", salario).campo("otrosIngresos", otros);
  const e = T.escala("hn.isr-tabla");
  const bruta = h.paso("Renta bruta del año", l.r(`${salario.ref}*12+IF(ISNUMBER(${otros.ref}),${otros.ref},0)`));
  const ded = h.paso("Deducción por gastos médicos", `MIN(${bruta},${T.numero("hn.isr-deduccion-gastos-medicos")})`);
  const gravable = h.paso("Renta gravable", l.r(`${bruta}-${ded}`));
  // La tabla del SAR está en centavos: cada tramo grava lo que excede el «hasta» del anterior
  // (continua() en src/paises/hn/calculadoras/impuesto-sobre-la-renta.ts), no su «desde».
  const tramos: string[] = [];
  for (let i = 0; i < e.filas; i++) {
    const desde = i === 0 ? "0" : e.hasta(i - 1);
    tramos.push(h.paso(`Impuesto del tramo ${i + 1}`, `MAX(0,MIN(${gravable},${e.hasta(i)})-${desde})*${e.tasa(i)}/100`));
  }
  const anual = h.paso("ISR del año", l.r(`SUM(${tramos.join(",")})`));
  const k = `(IF(${gravable}>0,1,0)+COUNTIF(${e.rangoHasta},"<"&${gravable}))`;
  h.seccion("SU ISR");
  b.resultado("bruta", h.resultado("Renta bruta del año", `${bruta}`));
  b.resultado("deduccion", h.resultado("Deducción por gastos médicos", `${ded}`));
  b.resultado("gravable", h.resultado("Renta gravable", `${gravable}`));
  b.resultado("tasaMarginal", h.resultado("Tasa del último tramo", `IF(${k}=0,0,INDEX(${e.rangoTasa},${k}))`, { formato: "porcentaje" }));
  b.resultado("anual", h.resultado("ISR del año", `${anual}`));
  b.resultado("mensual", h.resultado("Retención de cada mes", l.r(`${anual}/12`), { total: true }));
  b.resultado("tasaEfectiva", h.resultado("Tasa efectiva", `IF(${bruta}>0,${l.r(`${anual}/${bruta}*100`)},0)`, { formato: "porcentaje" }));
  h.nota("Se calcula con 12 salarios y la deducción por gastos médicos que el SAR resta en su tabla del año.");
}

function decimoCuarto(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Décimo cuarto mes", "Décimo cuarto mes", "calcula el décimo cuarto mes de junio, completo o proporcional si dejó de trabajar.");
  const b = h.bloque("decimo-cuarto-mes");
  h.seccion("SUS DATOS");
  const salario = h.numero("Salario ordinario mensual promedio", 15000, { min: 0, ayuda: "El promedio de lo que ganó cada mes desde el 1 de julio (o desde que entró), sin horas extra." });
  const ingreso = h.fecha("Fecha en que empezó a trabajar", "2024-02-01");
  const salidaTxt = "La parte que le toca porque dejó de trabajar";
  const motivo = h.opcion(
    "Qué quiere calcular",
    [
      { valor: "junio", etiqueta: "El décimo cuarto mes que se paga en junio" },
      { valor: "salida", etiqueta: salidaTxt },
    ],
    "junio",
  );
  const salida = h.fecha("Último día de trabajo (opcional)", null, "Solo si dejó de trabajar.");
  const hoy = h.fechaHoy("Fecha de hoy", "Se llena sola. Sirve para saber qué período se paga.");
  b.campo("salario", salario).campo("fechaIngreso", ingreso).campo("motivo", motivo).campo("fechaSalida", salida).hoy(hoy);
  const corte = h.paso("Cierre del período", `IF(${motivo.ref}="${salidaTxt}",${salida.ref},DATE(IF(MONTH(${hoy.ref})<=6,YEAR(${hoy.ref}),YEAR(${hoy.ref})+1),6,30))`, "fecha");
  const inicio = `DATE(IF(MONTH(${corte})>=7,YEAR(${corte}),YEAR(${corte})-1),7,1)`;
  const dias = h.paso("Días del período", `MIN(365,${corte}-MAX(${ingreso.ref},${inicio})+1)`, "entero");
  h.seccion("SU DÉCIMO CUARTO");
  h.aviso(`IF(AND(${motivo.ref}="${salidaTxt}",NOT(ISNUMBER(${salida.ref}))),"Indique su último día de trabajo.",IF(${ingreso.ref}>${corte},"La fecha de ingreso no puede ser posterior al cierre del período.",""))`);
  b.resultado("dias", h.resultado("Días que cuentan", `${dias}`, { formato: "entero" }));
  b.resultado("monto", h.resultado("Décimo cuarto mes", l.r(`${salario.ref}*${T.numero("hn.decimo-cuarto")}/100*${dias}/365`), { total: true }));
  h.nota("Es un salario por año, del 1 de julio al 30 de junio, y se paga en junio. Si renuncia o lo despiden, le pagan la parte proporcional.");
}

function prestaciones(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Prestaciones laborales", "Preaviso y auxilio de cesantía", "pone sus fechas, su salario promedio y cómo terminó el trabajo, y le dice el preaviso y el auxilio de cesantía.");
  const b = h.bloque("prestaciones-laborales");
  h.seccion("SUS DATOS");
  const salario = h.numero("Salario promedio mensual de los últimos seis meses", 15000, { min: 0, ayuda: "Todo lo que ganó: salario, horas extra y comisiones." });
  const ingreso = h.fecha("Fecha de ingreso", "2021-03-01");
  const salida = h.fecha("Último día de trabajo", l.hoy);
  const despidoTxt = "Me despidieron sin causa justificada";
  const motivo = h.opcion(
    "Cómo terminó el trabajo",
    [
      { valor: "despido", etiqueta: despidoTxt },
      { valor: "renuncia", etiqueta: "Renuncié" },
    ],
    "despido",
  );
  const dado = h.siNo("El patrono le dio el preaviso por escrito y lo trabajó", false);
  const micro = h.siNo("La empresa tiene 10 empleados o menos", false);
  b.campo("salario", salario).campo("fechaIngreso", ingreso).campo("fechaSalida", salida).campo("motivo", motivo).campo("preavisoDado", dado).campo("microempresa", micro);
  const t = tiempoPorMeses(h, "Tiempo trabajado", ingreso.ref, `(${salida.ref}+1)`);
  const m = h.paso("Meses trabajados", `${t.anios}*12+${t.meses}`, "entero");
  const exacto = (n: number) => `AND(${m}=${n},${t.dias}=0)`;
  const hasta = (n: number) => `OR(${m}<${n},${exacto(n)})`;
  const diario = h.paso("Salario diario (entre 30)", `${salario.ref}/30`);
  const despido = `${motivo.ref}="${despidoTxt}"`;
  const esMicro = `${micro.ref}="Sí"`;
  h.pasoTitulo("Preaviso");
  const p = T.mapa("hn.preaviso-dias");
  const tramo = `IF(${m}<3,${p("menos-de-3-meses")},IF(${hasta(6)},${p("3-a-6-meses")},IF(${hasta(12)},${p("6-a-12-meses")},IF(${hasta(24)},${p("1-a-2-anios")},${p("mas-de-2-anios")}))))`;
  const diasPre = h.paso("Días de preaviso", `IF(AND(${despido},${dado.ref}="No"),${tramo},0)`, "entero");
  h.pasoTitulo("Auxilio de cesantía");
  const c = T.mapa("hn.cesantia-dias-menos-de-un-anio");
  const tope = h.paso("Tope en meses de salario", `IF(${esMicro},${T.mapa("hn.cesantia-tope-meses")("microempresa")},${T.mapa("hn.cesantia-tope-meses")("general")})`, "entero");
  const mesesCes = h.paso(
    "Meses de salario de cesantía",
    `IF(${m}<3,0,IF(${t.anios}=0,IF(${hasta(6)},${c("3-a-6-meses")},${c("6-a-12-meses")})/30,MIN(${t.anios}+(${t.meses}*30+${t.dias})/360,${tope})))`,
    "factor",
  );
  const renuncia = `IF(OR(${esMicro},${t.anios}<${T.numero("hn.cesantia-renuncia-anios")}),0,${l.r(`${salario.ref}*${mesesCes}*${T.numero("hn.cesantia-renuncia-porcentaje")}/100`)})`;
  const ces = h.paso("Auxilio de cesantía", `IF(${despido},${l.r(`${salario.ref}*${mesesCes}`)},${renuncia})`);
  const pre = h.paso("Preaviso", l.r(`${diario}*${diasPre}`));
  h.seccion("SUS PRESTACIONES");
  h.aviso(`IF(${salida.ref}<${ingreso.ref},"La fecha de salida tiene que ser igual o posterior a la de ingreso.","")`);
  h.resultado("Tiempo trabajado", `${t.anios}&" años, "&${t.meses}&" meses y "&${t.dias}&" días"`, { formato: "texto" });
  b.resultado("salarioDiario", h.resultado("Salario diario", l.r(diario)));
  b.resultado("diasPreaviso", h.resultado("Días de preaviso", `${diasPre}`, { formato: "entero" }));
  b.resultado("preaviso", h.resultado("Preaviso", `${pre}`));
  b.resultado("mesesCesantia", h.resultado("Meses de salario de cesantía", `IF(${ces}>0,${mesesCes},"")`, { formato: "factor" }));
  b.resultado("cesantia", h.resultado("Auxilio de cesantía", `${ces}`));
  b.resultado("total", h.resultado("Total", l.r(`${pre}+${ces}`), { total: true }));
  h.nota(
    "Si renuncia, el preaviso lo da usted y no se le paga. Al renunciar, la cesantía solo corresponde con 15 años o más (el 35 %) y nunca en una microempresa. Aparte le corresponden las vacaciones y los décimos proporcionales.",
  );
}

export const planillaHn: PlanillaPais = {
  mercado: "hn",
  titulo: (anio) => `Planilla de salario y prestaciones Honduras ${anio}`,
  construir(l) {
    if (l.disponible("impuesto-sobre-la-renta")) isr(l);
    if (l.disponible("decimo-cuarto-mes")) decimoCuarto(l);
    if (l.disponible("prestaciones-laborales")) prestaciones(l);
  },
};
