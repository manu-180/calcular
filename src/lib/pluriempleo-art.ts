import { REGLAS_SUCESION } from "@/data/pluriempleo-art";

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type EmpleoPluriempleo = {
  nombre: string;
  remuneracionMesAnterior: number;
  ingresoBase: number;
  presenciaAgenteRiesgo: boolean;
  trabajabaAlMomento: boolean;
};

export type EntradaPluriempleo = {
  empleos: EmpleoPluriempleo[];
  atribuibleAMasDeUnEmpleo: boolean;
};

export type CriterioPluriempleo =
  | "agente-de-riesgo"
  | "mayor-remuneracion"
  | "indeterminado";

export type ResultadoPluriempleo = {
  responsable: EmpleoPluriempleo | null;
  criterio: CriterioPluriempleo;
  empleosQueAportanBase: EmpleoPluriempleo[];
  baseTotal: number;
  repeticion: EmpleoPluriempleo[];
  avisos: Aviso[];
};

export type EstadoPrevio =
  | "definitiva-misma-modalidad"
  | "definitiva-otra-modalidad"
  | "provisoria";

export type EntradaSucesion = {
  incapacidadesPrevias: number[];
  incapacidadUltima: number;
  estadoPrevio: EstadoPrevio;
  porcentajeTablaConjunta?: number;
};

export type OrigenIntegral = "capacidad-restante" | "tabla-conjunta";
export type QuienPaga =
  | "ultima-art-solo-incremental"
  | "ultima-art-integral-exclusivo"
  | "concurren-proporcionalmente";

export type ResultadoSucesion = {
  incapacidadPrevia: number;
  incapacidadIntegral: number;
  incapacidadIncremental: number;
  origenIntegral: OrigenIntegral;
  quienPaga: QuienPaga;
  siniestralidadImputada: number;
  prestacionesEnEspecie: string;
  avisos: Aviso[];
};

const PRESTACIONES_EN_ESPECIE = REGLAS_SUCESION[2].texto;

function esNumeroValido(valor: number): boolean {
  return Number.isFinite(valor) && valor >= 0 && valor <= 100;
}

function acumularPorCapacidadRestante(porcentajes: number[]): number {
  return porcentajes.reduce(
    (integral, porcentaje) => integral + (porcentaje * (100 - integral)) / 100,
    0,
  );
}

export function resolverPluriempleo(e: EntradaPluriempleo): ResultadoPluriempleo {
  const empleosQueAportanBase = e.empleos.filter(
    (empleo) => empleo.presenciaAgenteRiesgo || empleo.trabajabaAlMomento,
  );
  const baseTotal = empleosQueAportanBase.reduce((total, empleo) => total + empleo.ingresoBase, 0);
  const avisos: Aviso[] = [];
  let responsable: EmpleoPluriempleo | null = null;
  let criterio: CriterioPluriempleo = "indeterminado";

  if (e.empleos.length === 0) {
    avisos.push({
      tono: "bloqueante",
      texto: "Agregá al menos un empleo para poder determinar qué Aseguradora debe responder.",
    });
  } else if (e.atribuibleAMasDeUnEmpleo) {
    const mayorRemuneracion = Math.max(...e.empleos.map((empleo) => empleo.remuneracionMesAnterior));
    const empatados = e.empleos.filter(
      (empleo) => empleo.remuneracionMesAnterior === mayorRemuneracion,
    );
    if (empatados.length === 1) {
      responsable = empatados[0];
      criterio = "mayor-remuneracion";
      avisos.push({
        tono: "ok",
        texto: `Como el hecho es atribuible a más de un empleo, responde la ART de ${responsable.nombre}: allí se devengó la mayor remuneración sujeta a cotización del mes anterior.`,
      });
    } else {
      avisos.push({
        tono: "bloqueante",
        texto: "Hay un empate exacto en la mayor remuneración sujeta a cotización. El art. 13 inc. b) no establece cómo desempatarlo.",
      });
    }
  } else {
    const conAgenteDeRiesgo = e.empleos.filter((empleo) => empleo.presenciaAgenteRiesgo);
    if (conAgenteDeRiesgo.length === 1) {
      responsable = conAgenteDeRiesgo[0];
      criterio = "agente-de-riesgo";
      avisos.push({
        tono: "ok",
        texto: `Responde la ART de ${responsable.nombre}, cuya actividad implica la presencia del agente de riesgo.`,
      });
    } else if (conAgenteDeRiesgo.length > 1) {
      avisos.push({
        tono: "atencion",
        texto: "Marcaste presencia del agente de riesgo en más de un empleo, pero no declaraste que el hecho sea atribuible a más de uno. Definí esa atribución para aplicar el criterio correcto.",
      });
    } else {
      avisos.push({
        tono: "bloqueante",
        texto: "Ningún empleo quedó marcado con presencia del agente de riesgo. Con estos datos no se puede determinar la Aseguradora obligada.",
      });
    }
  }

  if (empleosQueAportanBase.length > 1) {
    avisos.push({
      tono: "atencion",
      texto: "La cuantía debe considerar los ingresos base de todos los empleos alcanzados, no solamente el ingreso del empleo cuya ART paga.",
    });
  } else if (empleosQueAportanBase.length === 0) {
    avisos.push({
      tono: "bloqueante",
      texto: "No hay actividades con presencia del agente de riesgo ni empleos donde se estuviera trabajando al momento del accidente para integrar la base.",
    });
  }

  const repeticion = responsable
    ? empleosQueAportanBase.filter((empleo) => empleo !== responsable)
    : [];

  if (repeticion.length > 0) {
    avisos.push({
      tono: "ok",
      texto: "La Aseguradora obligada puede repetir de las restantes en proporción a la responsabilidad de cada una; ese reparto no reduce la prestación del trabajador.",
    });
  }

  return {
    responsable,
    criterio,
    empleosQueAportanBase,
    baseTotal,
    repeticion,
    avisos,
  };
}

function pagoSegunEstado(estadoPrevio: EstadoPrevio): QuienPaga {
  if (estadoPrevio === "definitiva-otra-modalidad") {
    return "ultima-art-integral-exclusivo";
  }
  if (estadoPrevio === "provisoria") {
    return "concurren-proporcionalmente";
  }
  return "ultima-art-solo-incremental";
}

export function calcularSucesion(e: EntradaSucesion): ResultadoSucesion {
  const quienPaga = pagoSegunEstado(e.estadoPrevio);
  const porcentajes = [...e.incapacidadesPrevias, e.incapacidadUltima];
  const tablaInformada = e.porcentajeTablaConjunta !== undefined;
  const porcentajesValidos = porcentajes.every(esNumeroValido);
  const tablaValida = !tablaInformada || esNumeroValido(e.porcentajeTablaConjunta!);

  if (!porcentajesValidos || !tablaValida) {
    return {
      incapacidadPrevia: 0,
      incapacidadIntegral: 0,
      incapacidadIncremental: 0,
      origenIntegral: "capacidad-restante",
      quienPaga,
      siniestralidadImputada: 0,
      prestacionesEnEspecie: PRESTACIONES_EN_ESPECIE,
      avisos: [
        {
          tono: "bloqueante",
          texto: "Todos los porcentajes deben ser números entre 0 y 100. Revisá las incapacidades ingresadas y el porcentaje opcional de la tabla.",
        },
      ],
    };
  }

  const incapacidadPrevia = acumularPorCapacidadRestante(e.incapacidadesPrevias);
  const integralPorCapacidadRestante = acumularPorCapacidadRestante(porcentajes);
  const usaTabla =
    e.porcentajeTablaConjunta !== undefined &&
    e.porcentajeTablaConjunta > integralPorCapacidadRestante;
  const incapacidadIntegral = usaTabla
    ? e.porcentajeTablaConjunta!
    : integralPorCapacidadRestante;

  if (incapacidadIntegral > 100) {
    return {
      incapacidadPrevia,
      incapacidadIntegral: 0,
      incapacidadIncremental: 0,
      origenIntegral: usaTabla ? "tabla-conjunta" : "capacidad-restante",
      quienPaga,
      siniestralidadImputada: 0,
      prestacionesEnEspecie: PRESTACIONES_EN_ESPECIE,
      avisos: [
        {
          tono: "bloqueante",
          texto: "La incapacidad integral supera el 100 %. Revisá los porcentajes ingresados.",
        },
      ],
    };
  }

  const incapacidadIncremental = incapacidadIntegral - incapacidadPrevia;
  const avisos: Aviso[] = usaTabla
    ? [
        {
          tono: "ok",
          texto: "Se tomó el porcentaje conjunto informado por vos desde la Tabla de Evaluación de Incapacidades Laborales porque es mayor que el resultado por capacidad restante.",
        },
      ]
    : [
        {
          tono: "ok",
          texto: "La incapacidad integral se calculó encadenando cada contingencia con el criterio de capacidad restante.",
        },
      ];

  if (e.estadoPrevio === "definitiva-otra-modalidad") {
    avisos.push({
      tono: "atencion",
      texto: "Como la incapacidad previa era definitiva y la modalidad de pago cambia, la última ART responde a su exclusivo cargo por la incapacidad integral.",
    });
  } else if (e.estadoPrevio === "provisoria") {
    avisos.push({
      tono: "atencion",
      texto: "Como la incapacidad previa era provisoria, las Aseguradoras concurren proporcionalmente de acuerdo con su responsabilidad.",
    });
  } else {
    avisos.push({
      tono: "ok",
      texto: "La última ART abona la prestación dineraria correspondiente a la incapacidad incremental.",
    });
  }

  return {
    incapacidadPrevia,
    incapacidadIntegral,
    incapacidadIncremental,
    origenIntegral: usaTabla ? "tabla-conjunta" : "capacidad-restante",
    quienPaga,
    siniestralidadImputada: incapacidadIncremental,
    prestacionesEnEspecie: PRESTACIONES_EN_ESPECIE,
    avisos,
  };
}
