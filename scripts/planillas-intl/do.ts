import type { Hoja, Libro, PlanillaPais } from "./marco";
import { tiempoPorMeses } from "./formulas";

// mesesEnElAnio de src/paises/do/lib/fechas.ts: meses completos más los días sueltos sobre 30, dentro
// del año calendario. Las fechas vacías valen como «todo el año».
function mesesEnElAnio(h: Hoja, etiqueta: string, anio: string, ingreso: string, salida: string): string {
  const inicio = `DATE(${anio},1,1)`;
  const fin = `DATE(${anio},12,31)`;
  const desde = h.paso(`${etiqueta}: desde`, `IF(AND(ISNUMBER(${ingreso}),${ingreso}>${inicio}),${ingreso},${inicio})`, "fecha");
  const hasta = h.paso(`${etiqueta}: hasta`, `IF(AND(ISNUMBER(${salida}),${salida}<${fin}),${salida},${fin})`, "fecha");
  const finEx = `(${hasta}+1)`;
  const m0 = `((YEAR(${finEx})-YEAR(${desde}))*12+MONTH(${finEx})-MONTH(${desde}))`;
  const meses = h.paso(`${etiqueta}: meses completos`, `MIN(12,IF(EDATE(${desde},${m0})>${finEx},${m0}-1,${m0}))`, "entero");
  return h.paso(`${etiqueta}: meses trabajados`, `IF(${hasta}<${desde},0,MIN(12,${meses}+(${finEx}-EDATE(${desde},${meses}))/30))`, "numero");
}

function salarioNeto(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Salario neto", "Salario neto: SFS, AFP e ISR", "pones tu salario bruto y te dice los descuentos de la TSS (SFS y AFP), el ISR que te retienen y tu salario neto.");
  const b = h.bloque("salario-neto");
  h.seccion("TUS DATOS");
  const salario = h.numero("Salario bruto mensual", 60000, { min: 0, ayuda: "Lo que dice tu contrato antes de los descuentos." });
  b.campo("salario", salario);
  const s = salario.ref;
  const sfs = h.paso("Seguro Familiar de Salud (SFS)", l.r(`MIN(${s},${T.numero("do.tope-sfs")})*${T.numero("do.sfs-trabajador")}/100`));
  const afp = h.paso("Pensión (AFP)", l.r(`MIN(${s},${T.numero("do.tope-afp")})*${T.numero("do.afp-trabajador")}/100`));
  const base = h.paso("Salario sujeto a ISR", l.r(`${s}-${sfs}-${afp}`));
  const anual = h.paso("Base del año (por 12)", `${base}*12`);
  const isr = h.paso("ISR del mes (impuesto anual entre 12)", l.r(`${h.escala(T.escala("do.isr-asalariados"), anual)}/12`));
  const desc = h.paso("Total de descuentos", l.r(`${sfs}+${afp}+${isr}`));
  h.seccion("TU SALARIO NETO");
  b.resultado("bruto", h.resultado("Salario bruto", `${s}`));
  b.resultado("sfs", h.resultado("Seguro Familiar de Salud (SFS)", `${sfs}`));
  b.resultado("afp", h.resultado("Pensión (AFP)", `${afp}`));
  b.resultado("base", h.resultado("Salario sujeto a ISR", `${base}`));
  b.resultado("isr", h.resultado("ISR", `${isr}`));
  b.resultado("descuentos", h.resultado("Total de descuentos", `${desc}`));
  b.resultado("neto", h.resultado("Salario neto", l.r(`${s}-${desc}`), { total: true }));
  h.nota("El SFS y la AFP se descuentan hasta sus topes. El ISR es la doceava parte del impuesto del año, como la tabla de retención de la DGII.");
}

function regalia(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Regalía pascual", "Regalía pascual (salario de Navidad)", "calcula tu regalía pascual del año, completa o proporcional, con el tope legal.");
  const b = h.bloque("regalia-pascual");
  h.seccion("TUS DATOS");
  const salario = h.numero("Salario mensual", 40000, { min: 0, ayuda: "Tu salario ordinario, sin horas extra ni bonificación." });
  const ingreso = h.fecha("Fecha en que empezaste, si fue este año (opcional)", null, "Déjala vacía si trabajas en la empresa desde antes del 1 de enero.");
  const salida = h.fecha("Último día de trabajo, si ya saliste este año (opcional)", null, "Déjala vacía si sigues trabajando.");
  const minimos = T.mapa("do.salario-minimo");
  const tamano = h.opcionDato("Tamaño de la empresa", minimos, "grande");
  const hoy = h.fechaHoy("Fecha de hoy", "Se llena sola. Define el año de la regalía.");
  b.campo("salario", salario).campo("ingreso", ingreso).campo("salida", salida).campo("tamano", tamano).hoy(hoy);
  const meses = mesesEnElAnio(h, "Año", `YEAR(${hoy.ref})`, ingreso.ref, salida.ref);
  const dev = h.paso("Salario ganado en el año", l.r(`${salario.ref}*${meses}`));
  const segun = h.paso("Doceava parte", l.r(`${dev}/12`));
  const tope = h.paso("Tope (5 salarios mínimos)", l.r(`${minimos.de(tamano.ref)}*${T.numero("do.tope-regalia")}`));
  h.seccion("TU REGALÍA");
  h.aviso(`IF(AND(ISNUMBER(${ingreso.ref}),ISNUMBER(${salida.ref}),${salida.ref}<${ingreso.ref}),"El último día tiene que ser posterior a la fecha en que empezaste.","")`);
  b.resultado("meses", h.resultado("Meses que cuentan", l.r(meses), { formato: "numero" }));
  b.resultado("devengado", h.resultado("Salario ganado en el año", `${dev}`));
  b.resultado("segunSalario", h.resultado("Regalía según tu salario", `${segun}`));
  b.resultado("tope", h.resultado("Tope legal", `${tope}`));
  b.resultado("regalia", h.resultado("Regalía pascual", `MIN(${segun},${tope})`, { total: true }));
  h.nota("Se paga a más tardar el 20 de diciembre y no paga ISR. Para el tope se usa el salario mínimo del tamaño de tu empresa: el Código de Trabajo no aclara cuál se toma.");
}

function prestaciones(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Prestaciones laborales", "Prestaciones laborales: preaviso, cesantía, vacaciones y regalía", "pones tus fechas, tu salario promedio y cómo terminó el contrato, y te dice el preaviso, la cesantía, las vacaciones y la regalía.");
  const b = h.bloque("prestaciones-laborales");
  h.seccion("TUS DATOS");
  const inicio = h.fecha("Fecha en que empezaste a trabajar", "2022-03-15");
  const termino = h.fecha("Último día de trabajo", l.hoy);
  const salario = h.numero("Salario promedio mensual del último año", 40000, { min: 0, ayuda: "Lo ganado en los últimos 12 meses (sin horas extra ni regalía) dividido entre los meses trabajados." });
  const desahucio = "Me desahuciaron (despido sin alegar causa)";
  const injust = "Despido injustificado o dimisión justificada";
  const causa = h.opcion(
    "Cómo terminó el contrato",
    [
      { valor: "desahucio", etiqueta: desahucio },
      { valor: "despido-injustificado", etiqueta: injust },
      { valor: "renuncia", etiqueta: "Renuncié" },
      { valor: "despido-justificado", etiqueta: "Despido justificado" },
    ],
    "desahucio",
  );
  const preavisado = h.siNo("Te dieron el preaviso a tiempo", false, "Solo cuenta en el desahucio. Si te avisaron con los días de ley, el preaviso no se paga.");
  const pend = h.numero("Días de vacaciones de años anteriores que no tomaste", 0, { formato: "numero", min: 0 });
  const minimos = T.mapa("do.salario-minimo");
  const tamano = h.opcionDato("Tamaño de la empresa", minimos, "grande");
  b.campo("inicio", inicio).campo("termino", termino).campo("salario", salario).campo("causa", causa).campo("preavisado", preavisado).campo("vacacionesPendientes", pend).campo("tamano", tamano);
  const t = termino.ref;
  const a = tiempoPorMeses(h, "Antigüedad", inicio.ref, t);
  const diario = h.paso("Salario diario (entre 23.83)", l.r(`${salario.ref}/${T.numero("do.divisor-salario-diario")}`));
  const conPrest = `OR(${causa.ref}="${desahucio}",${causa.ref}="${injust}")`;
  const hastaSeis = `OR(${a.meses}<6,AND(${a.meses}=6,${a.dias}=0))`;
  h.pasoTitulo("Preaviso y cesantía");
  const p = T.mapa("do.preaviso-dias");
  const debe = `OR(${causa.ref}="${injust}",AND(${causa.ref}="${desahucio}",${preavisado.ref}="No"))`;
  const diasPre = h.paso(
    "Días de preaviso",
    `IF(AND(${conPrest},${debe}),IF(${a.anios}>=1,${p("un-anio-o-mas")},IF(${a.meses}<3,0,IF(${hastaSeis},${p("tres-a-seis-meses")},${p("seis-a-doce-meses")}))),0)`,
    "numero",
  );
  const c = T.mapa("do.cesantia-dias");
  const fraccion = (desdeTres: boolean) =>
    `IF(OR(${a.meses}<3${desdeTres ? "" : `,AND(${a.meses}=3,${a.dias}=0)`}),0,IF(${hastaSeis},${c("tres-a-seis-meses")},${c("seis-a-doce-meses")}))`;
  const diasCes = h.paso(
    "Días de cesantía",
    `IF(${conPrest},IF(${a.anios}=0,${fraccion(true)},${a.anios}*IF(${a.anios}>=5,${c("cinco-anios-o-mas")},${c("uno-a-cinco-anios")})+${fraccion(false)}),0)`,
    "numero",
  );
  h.pasoTitulo("Vacaciones y regalía");
  const v = T.mapa("do.vacaciones-proporcionales");
  const pasados = h.paso("Meses que pasaron del último aniversario", `IF(${a.dias}>0,${a.meses},${a.meses}-1)`, "entero");
  const escalaVac = [5, 6, 7, 8, 9, 10, 11].map((n) => v(String(n))).join(",");
  const diasVac = h.paso("Días de vacaciones", `IF(${pasados}<5,0,CHOOSE(MIN(${pasados},11)-4,${escalaVac}))+${pend.ref}`, "numero");
  const mesesReg = mesesEnElAnio(h, "Regalía", `YEAR(${t})`, inicio.ref, t);
  const topeReg = h.paso("Tope de la regalía", l.r(`${minimos.de(tamano.ref)}*${T.numero("do.tope-regalia")}`));
  const reg = h.paso("Regalía proporcional", `MIN(${l.r(`${salario.ref}*${mesesReg}/12`)},${topeReg})`);
  const preaviso = h.paso("Preaviso", l.r(`${diario}*${diasPre}`));
  const ces = h.paso("Cesantía", l.r(`${diario}*${diasCes}`));
  const vac = h.paso("Vacaciones", l.r(`${diario}*${diasVac}`));
  h.seccion("TUS PRESTACIONES");
  h.aviso(`IF(${t}<${inicio.ref},"El último día tiene que ser posterior a la fecha en que empezaste.","")`);
  h.resultado("Antigüedad", `${a.anios}&" años, "&${a.meses}&" meses y "&${a.dias}&" días"`, { formato: "texto" });
  b.resultado("diario", h.resultado("Salario diario", `${diario}`));
  b.resultado("diasPreaviso", h.resultado("Días de preaviso", `${diasPre}`, { formato: "numero" }));
  b.resultado("preaviso", h.resultado("Preaviso", `${preaviso}`));
  b.resultado("diasCesantia", h.resultado("Días de cesantía", `${diasCes}`, { formato: "numero" }));
  b.resultado("cesantia", h.resultado("Auxilio de cesantía", `${ces}`));
  b.resultado("diasVacaciones", h.resultado("Días de vacaciones", `${diasVac}`, { formato: "numero" }));
  b.resultado("vacaciones", h.resultado("Vacaciones", `${vac}`));
  b.resultado("regalia", h.resultado("Regalía pascual proporcional", `${reg}`));
  b.resultado("total", h.resultado("Total", l.r(`${preaviso}+${ces}+${vac}+${reg}`), { total: true }));
  h.nota(
    "Al renunciar no cobras preaviso ni cesantía. Preaviso y cesantía no pagan ISR, y el empleador tiene 10 días para pagarlos (art. 86). Los años anteriores al 29 de mayo de 1992 se pagan con otra escala.",
  );
}

export const planillaDo: PlanillaPais = {
  mercado: "do",
  titulo: (anio) => `Planilla de salario y prestaciones República Dominicana ${anio}`,
  construir(l) {
    if (l.disponible("salario-neto")) salarioNeto(l);
    if (l.disponible("regalia-pascual")) regalia(l);
    if (l.disponible("prestaciones-laborales")) prestaciones(l);
  },
};
