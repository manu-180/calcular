// Motor del sueldo de personal de casas particulares (Ley 26.844). Funciones puras.
//
// ⚠️ LO QUE ESTA CALCULADORA RESUELVE Y CASI NINGUNA OTRA: en este régimen conviven DOS pisos
// distintos —un valor hora y un mínimo mensual— y la mayoría de las notas publica sólo uno. Quien
// trabaja pocas horas por semana cobra por hora; quien cumple la jornada del art. 14 no puede
// cobrar menos que el mínimo mensual de su categoría. Acá se calculan los dos y se muestra cuál
// manda, que es exactamente la pregunta que la gente hace.

import {
  ANTIGUEDAD,
  escalaVigente,
  maxAniosAntiguedad,
  mesVigente,
  escalaDe,
  HORAS_EXTRAS,
  JORNADA,
  SEMANAS_POR_MES,
  VACACIONES,
  VACACIONES_PROPORCIONAL,
  ZONA_DESFAVORABLE,
  type CategoriaCasasParticulares,
} from "@/data/casas-particulares";

export type Modalidad = "con-retiro" | "sin-retiro";

export type EntradaCasasParticulares = {
  categoriaId: string;
  modalidad: Modalidad;
  /** Horas trabajadas por semana para ese empleador. */
  horasSemanales: number;
  /** Suma el 31% del art. 7 de la Res. 4/2026. */
  zonaDesfavorable: boolean;
  /** Horas extras del mes en días comunes. */
  horasExtrasComunes: number;
  /** Horas extras del mes en sábado después de las 13, domingo o feriado. */
  horasExtrasFinDeSemana: number;
  /** Mes de la escala (`2026-09`…). Sin él, el vigente. La planilla paga liquida cualquier mes
   *  de la serie y su check compara contra este mismo motor, mes por mes. */
  mesId?: string;
  /** Años completos de antigüedad. Se toman hasta el tope del mes (se cuentan desde el 1/9/2020). */
  aniosAntiguedad?: number;
};

export type AvisoCasasParticulares = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoCasasParticulares = {
  categoria: CategoriaCasasParticulares;
  modalidad: Modalidad;
  /** Valor hora de la escala para la categoría y modalidad elegidas, ya con zona si corresponde. */
  valorHora: number;
  /** Mínimo mensual de la escala para jornada completa, ya con zona si corresponde. */
  minimoMensual: number;
  horasMensuales: number;
  /** Lo que dan las horas efectivamente trabajadas al valor hora. */
  porHoras: number;
  /** True cuando la jornada llega al piso mensual y por lo tanto manda el mínimo mensual. */
  jornadaCompleta: boolean;
  /** El mayor entre `porHoras` y —si la jornada es completa— el mínimo mensual. */
  basico: number;
  /** Años que se computaron: los cargados, enteros, hasta el tope del mes. */
  aniosAntiguedad: number;
  /** 1% del básico por año computado (Res. CNTCP 2/2021, art. 3). */
  adicionalAntiguedad: number;
  extrasComunes: number;
  extrasFinDeSemana: number;
  /** Básico + antigüedad + extras: el bruto del mes. */
  total: number;
  /** Aguinaldo que va generando este sueldo (50% de la mayor remuneración del semestre). */
  aguinaldoEstimado: number;
  /** Adicional por zona incluido en el cálculo, en pesos, o 0. */
  adicionalZona: number;
  avisos: AvisoCasasParticulares[];
};

export function categoriaPorId(id: string): CategoriaCasasParticulares | null {
  return escalaVigente().find((c) => c.id === id) ?? null;
}

/** Días de vacaciones del art. 29 según los años de antigüedad al 31 de diciembre. */
export function diasDeVacaciones(antiguedadAnios: number): number {
  for (const tramo of VACACIONES) {
    if (antiguedadAnios <= tramo.hastaAnios) return tramo.dias;
  }
  return VACACIONES[VACACIONES.length - 1].dias;
}

/** Días de descanso proporcional cuando no se llegó a los 6 meses (art. 30). */
export function descansoProporcional(diasTrabajados: number): number {
  if (!Number.isFinite(diasTrabajados) || diasTrabajados <= 0) return 0;
  return Math.floor(diasTrabajados / VACACIONES_PROPORCIONAL.diasTrabajadosPorDiaDeDescanso);
}

const redondear = (n: number) => Math.round(n * 100) / 100;

export function calcularCasasParticulares(
  e: EntradaCasasParticulares,
): ResultadoCasasParticulares | null {
  const categoria = e.mesId
    ? (escalaDe(e.mesId).find((c) => c.id === e.categoriaId) ?? null)
    : categoriaPorId(e.categoriaId);
  if (!categoria) return null;

  const conRetiro = e.modalidad === "con-retiro";
  const horaBase = conRetiro ? categoria.horaConRetiro : categoria.horaSinRetiro;
  const mesBase = conRetiro ? categoria.mesConRetiro : categoria.mesSinRetiro;
  // Caseros no admite «con retiro»: la combinación no existe en la escala oficial y no se inventa.
  if (horaBase === null || mesBase === null) return null;

  const factorZona = e.zonaDesfavorable ? 1 + ZONA_DESFAVORABLE.porcentaje / 100 : 1;
  const valorHora = redondear(horaBase * factorZona);
  const minimoMensual = redondear(mesBase * factorZona);

  const horasSemanales = Number.isFinite(e.horasSemanales)
    ? Math.max(0, Math.min(e.horasSemanales, JORNADA.horasSemanales))
    : 0;
  const horasMensuales = redondear(horasSemanales * SEMANAS_POR_MES);
  const porHoras = redondear(valorHora * horasMensuales);

  // El piso mensual rige para quien cumple la jornada del art. 14; con jornada reducida el piso es
  // el valor hora. Se toma el mayor de los dos, que es lo que en los hechos se liquida.
  const jornadaCompleta = horasSemanales >= JORNADA.horasSemanales;
  const basico = jornadaCompleta ? Math.max(porHoras, minimoMensual) : porHoras;

  const extrasComunes = redondear(
    Math.max(0, e.horasExtrasComunes || 0) * valorHora * (1 + HORAS_EXTRAS.comunes / 100),
  );
  const extrasFinDeSemana = redondear(
    Math.max(0, e.horasExtrasFinDeSemana || 0) *
      valorHora *
      (1 + HORAS_EXTRAS.finDeSemanaYFeriados / 100),
  );

  const tope = maxAniosAntiguedad(e.mesId ?? mesVigente().id);
  const aniosCargados = Number.isFinite(e.aniosAntiguedad) ? Math.max(0, Math.floor(e.aniosAntiguedad!)) : 0;
  const aniosAntiguedad = Math.min(aniosCargados, tope);
  const adicionalAntiguedad = redondear((basico * aniosAntiguedad * ANTIGUEDAD.porcentajePorAnio) / 100);

  const total = redondear(basico + adicionalAntiguedad + extrasComunes + extrasFinDeSemana);
  const aguinaldoEstimado = redondear(total / 2);
  const adicionalZona = e.zonaDesfavorable
    ? redondear(total - total / factorZona)
    : 0;

  const avisos: AvisoCasasParticulares[] = [];

  if (horasSemanales === 0) {
    avisos.push({
      tono: "atencion",
      texto:
        "Cargá las horas que trabajás por semana para ese empleador. Si trabajás en varias casas, cada empleo se liquida por separado: cada empleador paga su propio sueldo, su propio aguinaldo y sus propias vacaciones.",
    });
  }

  if (jornadaCompleta && minimoMensual > porHoras) {
    avisos.push({
      tono: "ok",
      texto: `Con jornada completa manda el mínimo MENSUAL de la categoría, que es más alto que la suma de las horas: por eso el básico es el mínimo mensual y no el resultado de multiplicar el valor hora. Los dos son pisos legales y se aplica el que más favorece.`,
    });
  }

  if (aniosCargados > tope) {
    avisos.push({
      tono: "atencion",
      texto: `La antigüedad para este adicional se cuenta desde el ${ANTIGUEDAD.cuentaDesdeTexto}, sin efecto retroactivo (${ANTIGUEDAD.articulo}): en este mes suma como máximo ${tope} ${tope === 1 ? "año" : "años"}, aunque la relación haya empezado antes. Para las vacaciones y la indemnización sí cuenta la antigüedad completa.`,
    });
  }

  if (e.zonaDesfavorable) {
    avisos.push({
      tono: "ok",
      texto: `Está aplicado el adicional por zona desfavorable del ${ZONA_DESFAVORABLE.porcentaje}% (subió del 30% al ${ZONA_DESFAVORABLE.porcentaje}% desde el ${ZONA_DESFAVORABLE.desde}). Corresponde en ${ZONA_DESFAVORABLE.provincias.join(", ")} y en el partido bonaerense de ${ZONA_DESFAVORABLE.partidoBonaerense}.`,
    });
  }

  if (!conRetiro) {
    avisos.push({
      tono: "atencion",
      texto:
        "En la modalidad sin retiro, durante las vacaciones la habitación y la comida que normalmente pone el empleador tienen que pagarse en dinero antes de que empiece la licencia (art. 32 de la Ley 26.844).",
    });
  }

  avisos.push({
    tono: "atencion",
    texto: `Estos importes son el MÍNIMO legal, no un tope: la escala de la CNTCP fija pisos y cada relación puede pactar por encima. Y las horas por encima de la jornada se pagan con recargo: ${HORAS_EXTRAS.comunes}% en días comunes y ${HORAS_EXTRAS.finDeSemanaYFeriados}% los sábados después de las 13, los domingos y los feriados.`,
  });

  return {
    categoria,
    modalidad: e.modalidad,
    valorHora,
    minimoMensual,
    horasMensuales,
    porHoras,
    jornadaCompleta,
    basico,
    aniosAntiguedad,
    adicionalAntiguedad,
    extrasComunes,
    extrasFinDeSemana,
    total,
    aguinaldoEstimado,
    adicionalZona,
    avisos,
  };
}
