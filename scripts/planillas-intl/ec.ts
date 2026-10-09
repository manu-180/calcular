import type { Hoja, Libro, PlanillaPais } from "./marco";
import { tiempoPorMeses } from "./formulas";

// periodoQueContiene de src/paises/ec/lib/fechas.ts: el período anual que empieza el día 1 del mes dado.
const inicioPeriodo = (fecha: string, mes: string) => `DATE(IF(MONTH(${fecha})>=${mes},YEAR(${fecha}),YEAR(${fecha})-1),${mes},1)`;

// enMeses(tiempoTrabajado(...)) con tope de 12: los décimos y las vacaciones cuentan el mes como 30 días.
function mesesTrabajados(h: Hoja, etiqueta: string, desde: string, ultimoDia: string): string {
  const t = tiempoPorMeses(h, etiqueta, desde, `(${ultimoDia}+1)`);
  return h.paso(`${etiqueta}: meses trabajados`, `MIN(12,${t.anios}*12+${t.meses}+${t.dias}/30)`, "numero");
}

function sueldoNeto(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Sueldo neto", "Sueldo neto: IESS, impuesto a la renta y décimos", "pones tu sueldo y te dice el aporte al IESS, la retención del impuesto a la renta, los décimos mensualizados y lo que recibes.");
  const b = h.bloque("sueldo-neto");
  h.seccion("TUS DATOS");
  const sueldo = h.numero("Sueldo mensual", 1500, { min: 0, ayuda: "Tu remuneración del mes: sueldo, horas extra y comisiones." });
  const decimos = h.siNo("Cobras los décimos cada mes", true);
  const gastos = h.numero("Gastos personales proyectados para el año", 0, { min: 0, ayuda: "Los que pusiste en tu proyección de gastos personales. Si no la presentaste, deja 0." });
  const cargasMapa = T.mapa("ec.canastas-por-cargas");
  const cargas = h.opcionDato("Cargas familiares", cargasMapa, "0");
  const catastrofica = h.siNo("Tú o una carga tienen discapacidad o una enfermedad catastrófica", false, "También vale para enfermedades raras o huérfanas.");
  b.campo("sueldo", sueldo).campo("decimos", decimos).campo("gastos", gastos).campo("cargas", cargas).campo("catastrofica", catastrofica);
  const s = sueldo.ref;
  h.pasoTitulo("Aporte e impuesto a la renta");
  const aporte = h.paso("Aporte personal al IESS", l.r(`${s}*${T.numero("ec.aporte-personal-iess")}/100`));
  const base = h.paso("Base imponible del año", l.r(`(${s}-${aporte})*12`));
  const causado = h.paso("Impuesto causado del año", l.r(h.escala(T.escala("ec.impuesto-renta"), base)));
  const canastas = h.paso("Canastas que topan los gastos", `IF(${catastrofica.ref}="Sí",${T.numero("ec.canastas-catastroficas")},${cargasMapa.de(cargas.ref)})`, "numero");
  const tope = h.paso("Tope de gastos personales", l.r(`${T.numero("ec.canasta-basica-enero")}*${canastas}`));
  const rebaja = h.paso("Rebaja por gastos personales", `MIN(${l.r(`MIN(${gastos.ref},${tope})*${T.numero("ec.rebaja-gastos-personales")}/100`)},${causado})`);
  const impuesto = h.paso("Impuesto a la renta del año", l.r(`${causado}-${rebaja}`));
  const retencion = h.paso("Retención mensual (de febrero a diciembre)", l.r(`${impuesto}/11`));
  const d13 = h.paso("Décimo tercero mensual", `IF(${decimos.ref}="Sí",${l.r(`${s}/12`)},0)`);
  const d14 = h.paso("Décimo cuarto mensual", `IF(${decimos.ref}="Sí",${l.r(`${T.numero("ec.sbu")}/12`)},0)`);
  h.seccion("TU ROL DE PAGOS");
  b.resultado("sueldo", h.resultado("Sueldo", `${s}`));
  b.resultado("aporte", h.resultado("Aporte personal al IESS", `${aporte}`));
  b.resultado("retencion", h.resultado("Retención del impuesto a la renta", `${retencion}`));
  b.resultado("impuestoAnual", h.resultado("Impuesto a la renta del año", `${impuesto}`));
  b.resultado("decimoTercero", h.resultado("Décimo tercero mensual", `${d13}`));
  b.resultado("decimoCuarto", h.resultado("Décimo cuarto mensual", `${d14}`));
  b.resultado("neto", h.resultado("Sueldo neto", l.r(`${s}-${aporte}-${retencion}+${d13}+${d14}`), { total: true }));
  h.nota("En enero no te retienen impuesto a la renta, así que ese mes recibes un poco más. Si llevas más de un año con tu empleador, también te corresponde el fondo de reserva.");
}

function decimos(l: Libro): void {
  const T = l.tablas;
  const con13 = l.disponible("decimo-tercer-sueldo");
  const con14 = l.disponible("decimo-cuarto-sueldo");
  if (!con13 && !con14) return;
  const h = l.hoja("Décimos", "Décimo tercero y décimo cuarto", "calcula el décimo tercero (hasta el 24 de diciembre) y el décimo cuarto de tu región, completos o proporcionales.");
  const sbu = T.numero("ec.sbu");
  if (con13) {
    const b = h.bloque("decimo-tercer-sueldo");
    h.seccion("DÉCIMO TERCERO");
    const sueldo = h.numero("Sueldo mensual", 1000, { min: 0, ayuda: "Sin contar los décimos, las utilidades ni el fondo de reserva." });
    const meses = h.numero("Meses trabajados del 1 de diciembre al 30 de noviembre", 12, { formato: "numero", min: 0, max: 12, ayuda: "Si trabajaste el período completo, deja 12. Puedes usar decimales." });
    const extras = h.numero("Horas extra, comisiones y bonos del período", 0, { min: 0, ayuda: "La suma de todo el período. Si no tuviste, deja 0." });
    b.campo("sueldo", sueldo).campo("meses", meses).campo("extras", extras);
    const total = h.paso("Total ganado en el período", `${sueldo.ref}*${meses.ref}+${extras.ref}`);
    b.resultado("total", h.resultado("Total ganado en el período", l.r(total)));
    b.resultado("mensual", h.resultado("Décimo tercero mensual", l.r(`${sueldo.ref}/12`)));
    b.resultado("decimo", h.resultado("Décimo tercero acumulado", l.r(`${total}/12`), { total: true }));
    h.nota("Si lo cobras cada mes en tu rol de pagos, ya lo recibiste. Este cálculo es para quien lo cobra acumulado.");
  }
  if (con14) {
    const b = h.bloque("decimo-cuarto-sueldo");
    h.seccion("DÉCIMO CUARTO");
    const region = h.region("Región donde trabajas", T.porRegion("ec.decimo-cuarto-mes-inicio"), "sierra");
    const inicio = h.fecha("Fecha en que empezaste a trabajar", "2025-01-15");
    const salida = h.fecha("Fecha de salida (opcional)", null, "Déjala vacía si sigues trabajando: se calcula el próximo pago.");
    const hoy = h.fechaHoy("Fecha de hoy", "Se llena sola. Cámbiala si quieres calcular a otra fecha.");
    b.campo("region", region).campo("inicio", inicio).campo("salida", salida).hoy(hoy);
    h.pasoTitulo("Décimo cuarto");
    const mes = h.paso("Mes en que empieza el período", T.porRegion("ec.decimo-cuarto-mes-inicio").de(region.ref), "entero");
    const sigue = `NOT(ISNUMBER(${salida.ref}))`;
    const corte = h.paso("Fecha de corte", `IF(${sigue},${hoy.ref},${salida.ref})`, "fecha");
    const ini0 = h.paso("Período que contiene el corte", inicioPeriodo(corte, mes), "fecha");
    const ini = h.paso(
      "Inicio del período que se paga",
      `IF(AND(${sigue},${hoy.ref}<=DATE(YEAR(${ini0}),${mes},15)),EDATE(${ini0},-12),${ini0})`,
      "fecha",
    );
    const fin = h.paso("Fin del período que se paga", `EDATE(${ini},12)-1`, "fecha");
    const hasta = h.paso("Último día que cuenta", `IF(${sigue},${fin},${corte})`, "fecha");
    const meses = mesesTrabajados(h, "Período", `MAX(${inicio.ref},${ini})`, hasta);
    h.aviso(`IF(${inicio.ref}>${fin},"Empezaste a trabajar después de este período.",IF(${inicio.ref}>${corte},"La fecha en que empezaste no puede ser posterior al corte.",""))`);
    h.resultado("Período", `"Del "&DAY(${ini})&"/"&MONTH(${ini})&"/"&YEAR(${ini})&" al "&DAY(${fin})&"/"&MONTH(${fin})&"/"&YEAR(${fin})`, { formato: "texto" });
    b.resultado("meses", h.resultado("Meses trabajados en el período", l.r(meses), { formato: "numero" }));
    b.resultado("mensual", h.resultado("Décimo cuarto mensual", l.r(`${sbu}/12`)));
    b.resultado("decimo", h.resultado("Décimo cuarto", l.r(`${sbu}*${meses}/12`), { total: true }));
    h.nota("Es un salario básico por año. En la Sierra y la Amazonía se paga hasta el 15 de agosto; en la Costa y Galápagos, hasta el 15 de marzo.");
  }
}

function liquidacion(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Liquidación", "Liquidación: desahucio, despido, décimos y vacaciones", "pones tus fechas, tu remuneración y cómo terminó la relación, y te dice el desahucio, la indemnización, los décimos pendientes y las vacaciones.");
  const b = h.bloque("liquidacion");
  h.seccion("TUS DATOS");
  const inicio = h.fecha("Fecha en que empezaste a trabajar", "2022-03-01");
  const salida = h.fecha("Último día de trabajo", l.hoy);
  const rem = h.numero("Última remuneración mensual", 900, { min: 0, ayuda: "Sueldo más horas extra y comisiones habituales. Sin décimos, utilidades ni fondo de reserva." });
  const despidoTxt = "Despido intempestivo (sin causa)";
  const vistoTxt = "Visto bueno pedido por el empleador";
  const motivo = h.opcion(
    "Cómo terminó la relación laboral",
    [
      { valor: "despido", etiqueta: despidoTxt },
      { valor: "renuncia", etiqueta: "Renuncia con aviso escrito (desahucio)" },
      { valor: "acuerdo", etiqueta: "Acuerdo entre las partes" },
      { valor: "visto-bueno", etiqueta: vistoTxt },
    ],
    "despido",
  );
  const region = h.region("Región donde trabajabas", T.porRegion("ec.decimo-cuarto-mes-inicio"), "sierra");
  const dec = h.siNo("Cobrabas los décimos cada mes", true);
  const pend = h.numero("Días de vacaciones de años anteriores sin tomar", 0, { formato: "numero", min: 0 });
  b.campo("inicio", inicio).campo("salida", salida).campo("remuneracion", rem).campo("motivo", motivo).campo("region", region).campo("decimos", dec).campo("pendientes", pend);
  const s = salida.ref;
  const r = rem.ref;
  const t = tiempoPorMeses(h, "Tiempo de servicio", inicio.ref, `(${s}+1)`);
  const conFraccion = `OR(${t.meses}>0,${t.dias}>0)`;
  h.pasoTitulo("Desahucio e indemnización");
  const desahucio = h.paso("Bonificación por desahucio", `IF(${motivo.ref}<>"${vistoTxt}",${l.r(`${r}*${T.numero("ec.desahucio")}/100*${t.anios}`)},0)`);
  const base = T.numero("ec.despido-anios-base");
  const mesesDespido = h.paso(
    "Meses de indemnización",
    `IF(${motivo.ref}="${despidoTxt}",IF(OR(${t.anios}<${base},AND(${t.anios}=${base},NOT(${conFraccion}))),${T.numero("ec.despido-meses-minimo")},MIN(${t.anios}+IF(${conFraccion},1,0),${T.numero("ec.despido-meses-maximo")})),0)`,
    "entero",
  );
  const despido = h.paso("Indemnización por despido", l.r(`${r}*${mesesDespido}`));
  h.pasoTitulo("Décimos pendientes");
  const m13 = mesesTrabajados(h, "Décimo tercero", `MAX(${inicio.ref},${inicioPeriodo(s, "12")})`, s);
  const mes14 = T.porRegion("ec.decimo-cuarto-mes-inicio").de(region.ref);
  const m14 = mesesTrabajados(h, "Décimo cuarto", `MAX(${inicio.ref},${inicioPeriodo(s, mes14)})`, s);
  const d13 = h.paso("Décimo tercero proporcional", `IF(${dec.ref}="Sí",0,${l.r(`${r}*${m13}/12`)})`);
  const d14 = h.paso("Décimo cuarto proporcional", `IF(${dec.ref}="Sí",0,${l.r(`${T.numero("ec.sbu")}*${m14}/12`)})`);
  h.pasoTitulo("Vacaciones");
  const diasAnio = h.paso(
    "Días de vacaciones del año en curso",
    `${T.numero("ec.vacaciones-dias")}+MIN(MAX(${t.anios}+1-${T.numero("ec.vacaciones-anios-sin-adicional")},0),${T.numero("ec.vacaciones-adicionales-max")})`,
    "entero",
  );
  const prop = h.paso("Días proporcionales", `${diasAnio}*((${t.meses}+${t.dias}/30)/12)`, "numero");
  const vac = h.paso("Vacaciones", l.r(`${prop}*${r}/30+${pend.ref}*${r}/30`));
  h.seccion("TU LIQUIDACIÓN");
  h.aviso(`IF(${s}<${inicio.ref},"El último día tiene que ser posterior a la fecha en que empezaste.","")`);
  h.resultado("Tiempo de servicio", `${t.anios}&" años, "&${t.meses}&" meses y "&${t.dias}&" días"`, { formato: "texto" });
  b.resultado("desahucio", h.resultado("Bonificación por desahucio", `${desahucio}`));
  b.resultado("mesesDespido", h.resultado("Meses de indemnización por despido", `${mesesDespido}`, { formato: "entero" }));
  b.resultado("despido", h.resultado("Indemnización por despido intempestivo", `${despido}`));
  b.resultado("decimoTercero", h.resultado("Décimo tercero proporcional", `${d13}`));
  b.resultado("decimoCuarto", h.resultado("Décimo cuarto proporcional", `${d14}`));
  b.resultado("vacaciones", h.resultado("Vacaciones proporcionales y pendientes", `${vac}`));
  b.resultado("total", h.resultado("Total de la liquidación", l.r(`${desahucio}+${despido}+${d13}+${d14}+${vac}`), { total: true }));
  h.nota("El fondo de reserva no entra: si lo cobrabas cada mes ya lo recibiste, y si estaba en el IESS lo retiras allí. Para el despido se usa la última remuneración.");
}

export const planillaEc: PlanillaPais = {
  mercado: "ec",
  titulo: (anio) => `Planilla de sueldo y liquidación Ecuador ${anio}`,
  construir(l) {
    if (l.disponible("sueldo-neto")) sueldoNeto(l);
    decimos(l);
    if (l.disponible("liquidacion")) liquidacion(l);
  },
};
