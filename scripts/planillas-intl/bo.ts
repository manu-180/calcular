import type { Hoja, Libro, PlanillaPais } from "./marco";

// tiempoEntre de src/paises/bo/lib/fechas.ts: meses contados desde la fecha inicial (recortando al fin
// de mes, como EDATE) sin contar el día final.
function tiempoEntre(h: Hoja, etiqueta: string, desde: string, hasta: string): { anios: string; meses: string; dias: string; total: string } {
  const n0 = `((YEAR(${hasta})-YEAR(${desde}))*12+MONTH(${hasta})-MONTH(${desde}))`;
  const total = h.paso(`${etiqueta}: meses cumplidos`, `IF(EDATE(${desde},${n0})>${hasta},${n0}-1,${n0})`, "entero");
  const anios = h.paso(`${etiqueta}: años`, `INT(${total}/12)`, "entero");
  const meses = h.paso(`${etiqueta}: meses`, `MOD(${total},12)`, "entero");
  const dias = h.paso(`${etiqueta}: días`, `${hasta}-EDATE(${desde},${total})`, "entero");
  return { anios, meses, dias, total };
}

// montoPorTiempo de src/paises/bo/lib/laboral.ts: un sueldo por año, duodécimas por mes y 1/360 por día,
// cada parte redondeada por separado como en la guía del Ministerio de Trabajo.
function montoPorTiempo(l: Libro, sueldo: string, anios: string, meses: string, dias: string): string {
  return l.r(`${l.r(`${sueldo}*${anios}`)}+${l.r(`${sueldo}/12*${meses}`)}+${l.r(`${sueldo}/360*${dias}`)}`);
}

// duodecimasDeGestion: meses y días de la gestión (enero a diciembre) contando el primer y el último día.
function duodecimas(h: Hoja, ingreso: string, hasta: string): { meses: string; dias: string } {
  const inicio = `MAX(${ingreso},DATE(YEAR(${hasta}),1,1))`;
  const t = tiempoEntre(h, "Gestión", inicio, `(${hasta}+1)`);
  return { meses: t.total, dias: t.dias };
}

function sueldoLiquido(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Sueldo líquido", "Sueldo líquido: aportes a la Gestora y RC-IVA", "pone su total ganado y le dice los aportes laborales, el Aporte Nacional Solidario, el RC-IVA y su líquido pagable.");
  const b = h.bloque("sueldo-liquido");
  h.seccion("SUS DATOS");
  const tg = h.numero("Total ganado del mes", 9000, { min: 0, ayuda: "Haber básico más bono de antigüedad, horas extras, comisiones y otros pagos del mes." });
  const fact = h.numero("Facturas que presenta en el Formulario 110 (opcional)", null, { min: 0, ayuda: "La suma de sus facturas del mes. Solo cuenta si paga RC-IVA." });
  b.campo("totalGanado", tg).campo("facturas", fact);
  const t = tg.ref;
  const ap = T.mapa("bo.aportes-laborales");
  h.pasoTitulo("Aportes laborales");
  const cot = h.paso("Cotización mensual", l.r(`${t}*${ap("cotizacion")}/100`));
  const rc = h.paso("Prima de riesgo común", l.r(`${t}*${ap("riesgo-comun")}/100`));
  const com = h.paso("Comisión de la Gestora", l.r(`${t}*${ap("comision")}/100`));
  const sol = h.paso("Aporte solidario", l.r(`${t}*${ap("solidario")}/100`));
  const gestora = h.paso("Total a la Gestora", l.r(`${cot}+${rc}+${com}+${sol}`));
  const tasas = T.mapa("bo.ans-tasas");
  const umbrales = T.mapa("bo.ans-umbrales");
  const ans = h.paso(
    "Aporte Nacional Solidario",
    l.r(["tramo-1", "tramo-2", "tramo-3"].map((k) => l.r(`MAX(0,${t}-${umbrales(k)})*${tasas(k)}/100`)).join("+")),
  );
  const neto = h.paso("Sueldo neto (menos aportes)", l.r(`${t}-${l.r(`${gestora}+${ans}`)}`));
  h.pasoTitulo("RC-IVA");
  const smn = T.numero("bo.salario-minimo");
  const ali = T.numero("bo.rc-iva-alicuota");
  const base = h.paso("Base imponible (menos dos salarios mínimos)", l.r(`MAX(0,${neto}-${l.r(`${smn}*${T.numero("bo.rc-iva-minimo-no-imponible")}`)})`));
  const imp = h.paso("Impuesto (13 %)", l.r(`${base}*${ali}/100`));
  const impNeto = h.paso("Impuesto menos el 13 % de un salario mínimo", l.r(`MAX(0,${imp}-${l.r(`${smn}*${T.numero("bo.rc-iva-computo-smn")}*${ali}/100`)})`));
  const credito = h.paso("Crédito por facturas", l.r(`IF(ISNUMBER(${fact.ref}),${fact.ref},0)*${ali}/100`));
  const ret = h.paso("RC-IVA retenido", l.r(`MAX(0,${impNeto}-${credito})`));
  h.seccion("SU LÍQUIDO PAGABLE");
  b.resultado("cotizacion", h.resultado("Cotización mensual (10 %)", `${cot}`));
  b.resultado("riesgoComun", h.resultado("Prima de riesgo común", `${rc}`));
  b.resultado("comision", h.resultado("Comisión de la Gestora", `${com}`));
  b.resultado("solidario", h.resultado("Aporte solidario", `${sol}`));
  b.resultado("gestora", h.resultado("Total a la Gestora", `${gestora}`));
  b.resultado("nacionalSolidario", h.resultado("Aporte Nacional Solidario", `${ans}`));
  b.resultado("rcIva", h.resultado("RC-IVA", `${ret}`));
  b.resultado("liquido", h.resultado("Líquido pagable", l.r(`${neto}-${ret}`), { total: true }));
  b.resultado("saldoAFavor", h.resultado("Saldo a favor para el mes siguiente", l.r(`MAX(0,${credito}-${impNeto})`)));
  h.nota("Si le descuentan otros conceptos (anticipos, cuota sindical), réstelos aparte. Con más facturas en el Formulario 110 la retención de RC-IVA baja.");
}

function aguinaldo(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Aguinaldo", "Aguinaldo de Navidad", "calcula el aguinaldo de la gestión, completo o en duodécimas si entró o salió este año.");
  const b = h.bloque("aguinaldo");
  h.seccion("SUS DATOS");
  const minimos = T.mapa("bo.aguinaldo-meses-minimos");
  const tipo = h.opcion(
    "Usted es",
    [
      { valor: "empleado", etiqueta: "Empleada o empleado" },
      { valor: "obrero", etiqueta: "Obrera u obrero" },
    ],
    "empleado",
  );
  const sueldo = h.numero("Promedio del total ganado de los últimos 3 meses", 6000, { min: 0, ayuda: "Si es obrero, ponga lo del último mes." });
  const ingreso = h.fecha("Fecha de ingreso", "2025-04-15");
  const retiro = h.fecha("Fecha de retiro, si dejó el trabajo este año (opcional)", null, "Si sigue trabajando, déjela vacía: se calcula la gestión completa.");
  const hoy = h.fechaHoy("Fecha de hoy", "Se llena sola. Define la gestión.");
  b.campo("tipo", tipo).campo("sueldo", sueldo).campo("ingreso", ingreso).campo("retiro", retiro).hoy(hoy);
  const hasta = h.paso("Fin del cálculo", `IF(ISNUMBER(${retiro.ref}),${retiro.ref},DATE(YEAR(${hoy.ref}),12,31))`, "fecha");
  const d = duodecimas(h, ingreso.ref, hasta);
  const minimo = h.paso("Meses mínimos", `IF(${tipo.ref}="Obrera u obrero",${minimos("obrero")},${minimos("empleado")})`, "entero");
  h.seccion("SU AGUINALDO");
  h.aviso(`IF(${hasta}<${ingreso.ref},"Revise las fechas: el ingreso tiene que ser anterior al retiro o al fin de la gestión.","")`);
  h.resultado("Tiempo en la gestión", `${d.meses}&" meses y "&${d.dias}&" días"`, { formato: "texto" });
  b.resultado("aguinaldo", h.resultado("Aguinaldo", `IF(${d.meses}>=${minimo},${montoPorTiempo(l, sueldo.ref, "0", d.meses, d.dias)},0)`, { total: true }));
  h.nota("Se paga entero, sin aportes ni RC-IVA. Para cobrarlo hay que trabajar al menos 3 meses seguidos en la gestión (1 mes si es obrero).");
}

function finiquito(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Finiquito", "Finiquito: indemnización, desahucio, aguinaldo y vacaciones", "pone sus fechas, su promedio y cómo terminó el trabajo, y le dice la indemnización, el desahucio, el aguinaldo y las vacaciones.");
  const b = h.bloque("finiquito");
  h.seccion("SUS DATOS");
  const despidoTxt = "Me despidieron sin causa justificada";
  const causaTxt = "Me despidieron por una causa del artículo 16";
  const motivo = h.opcion(
    "Cómo terminó el trabajo",
    [
      { valor: "despido", etiqueta: despidoTxt },
      { valor: "renuncia", etiqueta: "Renuncié (retiro voluntario)" },
      { valor: "fin-contrato", etiqueta: "Terminó mi contrato a plazo fijo" },
      { valor: "despido-justificado", etiqueta: causaTxt },
    ],
    "despido",
    "El artículo 16 es el de la Ley General del Trabajo.",
  );
  const sueldo = h.numero("Promedio del total ganado de los últimos 3 meses", 6000, { min: 0, ayuda: "Es el salario promedio indemnizable." });
  const ingreso = h.fecha("Fecha de ingreso", "2021-07-21");
  const retiro = h.fecha("Fecha de retiro", l.hoy);
  const pend = h.numero("Días de vacación de gestiones anteriores que no tomó", 0, { formato: "numero", min: 0, max: 300 });
  const quinq = h.numero("Quinquenios que ya cobró", 0, { formato: "entero", min: 0, max: 10, ayuda: "Cada quinquenio cobrado ya pagó la indemnización de 5 años, que se descuentan." });
  b.campo("motivo", motivo).campo("sueldo", sueldo).campo("ingreso", ingreso).campo("retiro", retiro).campo("vacacionesPendientes", pend).campo("quinquenios", quinq);
  const s = sueldo.ref;
  const t = tiempoEntre(h, "Antigüedad", ingreso.ref, retiro.ref);
  const cobrados = `${quinq.ref}*${T.numero("bo.quinquenio-anios")}`;
  const supera = `(${retiro.ref}-${ingreso.ref}+1)>${T.numero("bo.indemnizacion-dias-minimos")}`;
  h.pasoTitulo("Indemnización y desahucio");
  const ind = h.paso("Indemnización", `IF(AND(${supera},${motivo.ref}<>"${causaTxt}"),${montoPorTiempo(l, s, `(${t.anios}-${cobrados})`, t.meses, t.dias)},0)`);
  const des = h.paso("Desahucio", `IF(AND(${supera},${motivo.ref}="${despidoTxt}"),${l.r(`${s}*${T.numero("bo.desahucio-sueldos")}`)},0)`);
  h.pasoTitulo("Aguinaldo y vacaciones");
  const d = duodecimas(h, ingreso.ref, retiro.ref);
  const ag = h.paso("Aguinaldo en duodécimas", `IF(${d.meses}>=${T.mapa("bo.aguinaldo-meses-minimos")("empleado")},${montoPorTiempo(l, s, "0", d.meses, d.dias)},0)`);
  const vm = T.mapa("bo.vacaciones-dias");
  const n = `(${t.anios}+1)`;
  const diasAnio = `IF(${n}<=5,${vm("hasta-5")},IF(${n}<=10,${vm("hasta-10")},${vm("mas-10")}))`;
  const diasFr = h.paso("Días de vacación por fracción", `IF(${t.anios}>=1,${diasAnio}/12*${t.meses}+${diasAnio}/360*${t.dias},0)`, "numero");
  const vg = h.paso("Vacaciones de gestiones anteriores", l.r(`${s}/30*${pend.ref}`));
  const vf = h.paso("Vacación por fracción", l.r(`${s}/30*${diasFr}`));
  h.seccion("SU FINIQUITO");
  h.aviso(
    `IF(${retiro.ref}<${ingreso.ref},"La fecha de retiro tiene que ser posterior a la de ingreso.",IF(${cobrados}>${t.anios},"Cobró más quinquenios que los años que trabajó. Revise el dato.",""))`,
  );
  h.resultado("Antigüedad", `${t.anios}&" años, "&${t.meses}&" meses y "&${t.dias}&" días"`, { formato: "texto" });
  b.resultado("indemnizacion", h.resultado("Indemnización por tiempo de servicios", `${ind}`));
  b.resultado("desahucio", h.resultado("Desahucio", `${des}`));
  b.resultado("aguinaldo", h.resultado("Aguinaldo en duodécimas", `${ag}`));
  b.resultado("vacacionesGestiones", h.resultado("Vacaciones de gestiones anteriores", `${vg}`));
  b.resultado("diasFraccion", h.resultado("Días de vacación por fracción", l.r(diasFr), { formato: "numero" }));
  b.resultado("vacacionFraccion", h.resultado("Vacación por fracción", `${vf}`));
  b.resultado("total", h.resultado("Total del finiquito", l.r(`${ind}+${des}+${ag}+${vg}+${vf}`), { total: true }));
  h.nota(
    "Son montos brutos. El empleador tiene 15 días calendario para pagar; si se atrasa, paga un 30 % más. Con 90 días o menos de trabajo no hay indemnización ni desahucio, y el desahucio solo se paga en un despido sin causa.",
  );
}

export const planillaBo: PlanillaPais = {
  mercado: "bo",
  titulo: (anio) => `Planilla de sueldo y finiquito Bolivia ${anio}`,
  construir(l) {
    if (l.disponible("sueldo-liquido")) sueldoLiquido(l);
    if (l.disponible("aguinaldo")) aguinaldo(l);
    if (l.disponible("finiquito")) finiquito(l);
  },
};
