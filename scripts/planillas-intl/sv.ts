import type { Escala, Hoja, Libro, PlanillaPais } from "./marco";

// retencionPorTabla de src/paises/sv/lib/renta.ts: el tramo es el primero cuyo «hasta» alcanza la base,
// y el porcentaje se cobra sobre el exceso del «hasta» del tramo anterior (no sobre el «desde»).
function retencionPorTabla(h: Hoja, etiqueta: string, e: Escala, base: string): string {
  const idx = h.paso(`${etiqueta}: tramo`, `MIN(${e.filas},COUNTIF(${e.rangoHasta},"<"&${base})+1)`, "entero");
  const exceso = `IF(${idx}=1,INDEX(${e.rangoDesde},1)-0.01,INDEX(${e.rangoHasta},${idx}-1))`;
  const tasa = `INDEX(${e.rangoTasa},${idx})`;
  return `IF(${base}<=0,0,IF(${tasa}=0,0,INDEX(${e.rangoCuota},${idx})+(${base}-${exceso})*${tasa}/100))`;
}

// servicio de src/paises/sv/lib/fechas.ts: años por aniversario (recortado al fin de mes) y los días
// que sobran, contando hasta el día siguiente al último trabajado.
function servicio(h: Hoja, inicio: string, ultimo: string): { anios: string; diasRestantes: string } {
  const fin = `(${ultimo}+1)`;
  const k0 = `(YEAR(${fin})-YEAR(${inicio}))`;
  const anios = h.paso("Años de servicio", `IF(EDATE(${inicio},12*${k0})>${fin},${k0}-1,${k0})`, "entero");
  const diasRestantes = h.paso("Días después del último aniversario", `${fin}-EDATE(${inicio},12*${anios})`, "entero");
  return { anios, diasRestantes };
}

function renta(l: Libro): void {
  const T = l.tablas;
  const h = l.hoja("Retención de renta", "Retención de renta, AFP e ISSS", "pone su salario y el descuento del ISSS, y le dice la AFP, la renta que le retienen y su salario líquido.");
  const b = h.bloque("retencion-de-renta");
  h.seccion("SUS DATOS");
  const periodo = h.opcion(
    "Cada cuánto le pagan",
    [
      { valor: "mensual", etiqueta: "Cada mes" },
      { valor: "quincenal", etiqueta: "Cada quincena" },
    ],
    "mensual",
  );
  const salario = h.numero("Salario del período", 900, { min: 0, ayuda: "Lo que gana en el mes o en la quincena, antes de descuentos." });
  const isss = h.numero("Descuento del ISSS del período", 27, { min: 0, ayuda: "Aparece en su boleta de pago. Si no cotiza al ISSS, ponga 0." });
  b.campo("periodo", periodo).campo("salario", salario).campo("isss", isss);
  const afp = h.paso("AFP", l.r(`${salario.ref}*${T.numero("sv.afp-trabajador")}/100`));
  const gravado = h.paso("Salario gravado", l.r(`MAX(0,${salario.ref}-${afp}-${isss.ref})`));
  const mensual = retencionPorTabla(h, "Tabla mensual", T.escala("sv.renta-mensual"), gravado);
  const quincenal = retencionPorTabla(h, "Tabla quincenal", T.escala("sv.renta-quincenal"), gravado);
  const ret = h.paso("Renta retenida", l.r(`IF(${periodo.ref}="Cada mes",${mensual},${quincenal})`));
  h.seccion("SU SALARIO LÍQUIDO");
  h.aviso(`IF(${isss.ref}>${salario.ref},"El descuento del ISSS no puede ser mayor que el salario.","")`);
  b.resultado("afp", h.resultado("AFP", `${afp}`));
  b.resultado("isss", h.resultado("ISSS", l.r(isss.ref)));
  b.resultado("gravado", h.resultado("Salario gravado", `${gravado}`));
  b.resultado("renta", h.resultado("Renta retenida", `${ret}`));
  b.resultado("liquido", h.resultado("Salario líquido", l.r(`${salario.ref}-${afp}-${isss.ref}-${ret}`), { total: true }));
  h.nota("En junio y diciembre el patrono recalcula la renta con todo lo ganado en el año, así que ese mes la retención puede cambiar. El ISSS se copia de su boleta.");
}

function bonos(l: Libro): void {
  const T = l.tablas;
  const conAg = l.disponible("aguinaldo");
  const conQ = l.disponible("quincena-25");
  if (!conAg && !conQ) return;
  const h = l.hoja("Aguinaldo y Quincena 25", "Aguinaldo y Quincena 25", "calcula el aguinaldo de diciembre y la Quincena 25 de enero, completos o proporcionales.");
  h.seccion("SUS DATOS");
  const salario = h.numero("Salario mensual", 600, { min: 0, ayuda: "Su salario básico, sin horas extra." });
  const dias = h.numero("Días trabajados (solo si tiene menos de 1 año)", null, { formato: "entero", min: 1, max: 365, ayuda: "Cuente desde su primer día de trabajo." });
  if (conAg) {
    const b = h.bloque("aguinaldo");
    h.seccion("AGUINALDO");
    const dm = T.mapa("sv.aguinaldo-dias");
    const antig = h.opcion(
      "Tiempo trabajando con el mismo patrono",
      [
        { valor: "menos-de-uno", etiqueta: "Menos de 1 año" },
        { valor: "uno-a-tres", etiqueta: "De 1 a menos de 3 años" },
        { valor: "tres-a-diez", etiqueta: "De 3 a menos de 10 años" },
        { valor: "diez-o-mas", etiqueta: "10 años o más" },
      ],
      "uno-a-tres",
    );
    b.campo("salario", salario).campo("antiguedad", antig).campo("diasTrabajados", dias);
    const menos = `${antig.ref}="Menos de 1 año"`;
    const diario = h.paso("Salario diario (entre 30)", `${salario.ref}/30`);
    const diasLey = h.paso(
      "Días de aguinaldo por año",
      `IF(OR(${menos},${antig.ref}="De 1 a menos de 3 años"),${dm("uno-a-tres")},IF(${antig.ref}="De 3 a menos de 10 años",${dm("tres-a-diez")},${dm("diez-o-mas")}))`,
      "entero",
    );
    const diasAg = h.paso("Días de aguinaldo", `IF(${menos},${diasLey}*IF(ISNUMBER(${dias.ref}),${dias.ref},0)/365,${diasLey})`, "numero");
    h.aviso(`IF(AND(${menos},NOT(ISNUMBER(${dias.ref}))),"Indique cuántos días lleva trabajando.","")`);
    b.resultado("diario", h.resultado("Salario diario", l.r(diario)));
    b.resultado("diasAguinaldo", h.resultado("Días de aguinaldo", l.r(diasAg), { formato: "numero" }));
    b.resultado("aguinaldo", h.resultado("Aguinaldo", l.r(`${diario}*${diasAg}`), { total: true }));
    h.nota("Se paga entre el 12 y el 20 de diciembre. Con menos de un año cobra la parte proporcional de 15 días.");
  }
  if (conQ) {
    const b = h.bloque("quincena-25");
    h.seccion("QUINCENA 25");
    const completo = h.siNo("Tiene un año o más con el mismo patrono", true);
    b.campo("salario", salario).campo("anioCompleto", completo).campo("diasTrabajados", dias);
    const maximo = T.numero("sv.quincena25-salario-maximo");
    const entera = h.paso("Quincena 25 completa", `IF(${salario.ref}>${maximo},0,${l.r(`${salario.ref}*${T.numero("sv.quincena25-porcentaje")}/100`)})`);
    h.aviso(`IF(AND(${completo.ref}="No",NOT(ISNUMBER(${dias.ref}))),"Indique cuántos días lleva trabajando.","")`);
    b.resultado("completa", h.resultado("Quincena 25 completa", `${entera}`));
    b.resultado("quincena", h.resultado("Quincena 25 que le toca", `IF(${completo.ref}="Sí",${entera},${l.r(`${entera}*IF(ISNUMBER(${dias.ref}),${dias.ref},0)/365`)})`, { total: true }));
    h.nota("Es para salarios de hasta el máximo de la ley (ver tablas). Se paga entre el 15 y el 25 de enero, sin descuentos de renta, ISSS ni AFP.");
  }
}

function terminacion(l: Libro): void {
  const T = l.tablas;
  const conInd = l.disponible("indemnizacion");
  const conRen = l.disponible("renuncia-voluntaria");
  if (!conInd && !conRen) return;
  const h = l.hoja("Indemnización y renuncia", "Indemnización por despido y prestación por renuncia", "pone sus fechas y su salario, y le dice la indemnización por despido sin causa o la prestación por renuncia voluntaria.");
  h.seccion("SUS DATOS");
  const salario = h.numero("Salario mensual", 600, { min: 0, ayuda: "Su salario básico, sin horas extra." });
  const inicio = h.fecha("Fecha en que empezó a trabajar", "2021-02-01");
  const fin = h.fecha("Último día trabajado", l.hoy);
  const minimos = T.porRegion("sv.salario-minimo-diario");
  const region = h.region("Sector de la empresa", minimos, "comercio-servicios");
  const s = servicio(h, inicio.ref, fin.ref);
  const diario = h.paso("Salario diario (entre 30)", `${salario.ref}/30`);
  const minimo = h.paso("Salario mínimo diario del sector", minimos.de(region.ref));
  const aviso = `IF(${fin.ref}<${inicio.ref},"El último día tiene que ser posterior a la fecha de inicio.","")`;
  if (conInd) {
    const b = h.bloque("indemnizacion");
    b.campo("salario", salario).campo("inicio", inicio).campo("fin", fin).campo("region", region);
    h.pasoTitulo("Indemnización");
    const usado = h.paso("Salario diario para la indemnización (con tope)", `MIN(${diario},${T.numero("sv.indemnizacion-tope")}*${minimo})`);
    const porAnio = T.numero("sv.indemnizacion-dias-por-anio");
    const dias = h.paso("Días de indemnización", `MAX(${porAnio}*${s.anios}+${porAnio}*${s.diasRestantes}/365,${T.numero("sv.indemnizacion-dias-minimo")})`, "numero");
    h.seccion("INDEMNIZACIÓN POR DESPIDO SIN CAUSA");
    h.aviso(aviso);
    h.resultado("Tiempo de servicio", `${s.anios}&" años y "&${s.diasRestantes}&" días"`, { formato: "texto" });
    b.resultado("diarioUsado", h.resultado("Salario diario que se usa", l.r(usado)));
    b.resultado("diasIndemnizacion", h.resultado("Días de indemnización", l.r(dias), { formato: "numero" }));
    b.resultado("indemnizacion", h.resultado("Indemnización", l.r(`${usado}*${dias}`), { total: true }));
    h.nota("Un mes de salario por año, y la fracción en proporción, con un mínimo de 15 días y un tope de cuatro salarios mínimos diarios. Aparte le deben las vacaciones y el aguinaldo proporcionales.");
  }
  if (conRen) {
    const b = h.bloque("renuncia-voluntaria");
    b.campo("salario", salario).campo("inicio", inicio).campo("fin", fin).campo("region", region);
    h.pasoTitulo("Prestación por renuncia");
    const usado = h.paso("Salario diario para la prestación (con tope)", `MIN(${diario},${T.numero("sv.renuncia-tope")}*${minimo})`);
    const dias = h.paso("Días de prestación", `IF(${s.anios}>=${T.numero("sv.renuncia-anios-minimos")},${T.numero("sv.renuncia-dias-por-anio")}*${s.anios},0)`, "entero");
    h.seccion("PRESTACIÓN POR RENUNCIA VOLUNTARIA");
    if (!conInd) h.aviso(aviso);
    b.resultado("diarioUsado", h.resultado("Salario diario que se usa", l.r(usado)));
    b.resultado("dias", h.resultado("Días de prestación", `${dias}`, { formato: "entero" }));
    b.resultado("prestacion", h.resultado("Prestación por renuncia", l.r(`${usado}*${dias}`), { total: true }));
    h.nota("Se gana con al menos 2 años de servicio y paga 15 días por año completo, con un tope de dos salarios mínimos diarios. Hay que avisar por escrito con 15 días de anticipación (30 en jefaturas).");
  }
}

export const planillaSv: PlanillaPais = {
  mercado: "sv",
  titulo: (anio) => `Planilla de salario y prestaciones El Salvador ${anio}`,
  construir(l) {
    if (l.disponible("retencion-de-renta")) renta(l);
    bonos(l);
    terminacion(l);
  },
};
