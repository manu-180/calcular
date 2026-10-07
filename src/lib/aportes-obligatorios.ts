// Motor de afiliación al sistema previsional (Ley 24.241, arts. 2º, 3º y 4º). Funciones puras.
//
// QUÉ DECIDE Y QUÉ NO. Decide si una situación queda **obligatoriamente** comprendida, si la
// incorporación es **voluntaria**, o si está **exceptuada**, y por qué inciso. NO calcula cuánto se
// aporta: las categorías de autónomos las fija ARCA por resolución y viven fuera de esta página
// (NO-GO escrito en el data file).
//
// LA TRAMPA QUE EL MOTOR ESTÁ HECHO PARA NO REPETIR. El inciso d) del art. 2º dice cuándo un socio
// NO se incluye obligatoriamente **en el inciso a)** —o sea, como trabajador en relación de
// dependencia— y arranca el apartado 2 con «Sin perjuicio de su inclusión en el inciso b)». Leer
// eso como «no aporta» es el error caro: el mismo socio, si dirige o administra, queda alcanzado
// por el inciso b) ap. 1 igual, «aunque por esas actividades no obtengan retribución, utilidad o
// ingreso alguno». Por eso el resultado tiene DOS puertas separadas (dependiente / autónomo) y no
// un sí o un no: colapsarlas es exactamente lo que hacen las notas que esta página corrige.

import {
  EXCEPCION_ANIOS,
  GRADO_PARENTESCO,
  umbralParticipacion,
} from "@/data/aportes-obligatorios";

export type Estado = "obligatorio" | "voluntario" | "exceptuado" | "no-aplica";

export type Puerta = {
  /** Cómo queda esa puerta: como dependiente (inciso a) o como autónomo (inciso b). */
  estado: Estado;
  /** El inciso exacto que lo decide. Vacío sólo cuando el estado es `no-aplica`. */
  norma: string;
  motivo: string;
};

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type Entrada = {
  situacion: string;
  /** Socios: cuántos son en total (incluido el usuario). */
  totalSocios?: number;
  /** Socios: qué porcentaje del capital tiene el usuario. */
  participacion?: number;
  /** Socios: tipo de sociedad, porque tres tipos tienen regla propia. */
  tipoSociedad?: "srl-sa" | "comandita" | "civil-o-de-hecho";
  /** Socios de comandita: ¿es el único comanditado? */
  comanditadoUnico?: boolean;
  /** Socios: todos los integrantes están ligados por parentesco hasta el 2º grado. */
  todosParientes?: boolean;
  /** Socios: además de ser socio, dirige/administra/conduce la sociedad. */
  dirigeLaSociedad?: boolean;
  /** Empleo público provincial: la provincia o el municipio adhirió al sistema nacional. */
  provinciaAdherida?: boolean;
  /** Contratado en el exterior: duración del contrato, en años. */
  aniosContrato?: number;
  /** Contratado en el exterior: ya usó la excepción antes. */
  yaUsoLaExcepcion?: boolean;
  /** Contratado en el exterior: tiene residencia permanente en el país. */
  residenciaPermanente?: boolean;
  /** Contratado en el exterior: está cubierto por vejez, invalidez y muerte en su país. */
  cubiertoEnSuPais?: boolean;
};

export type Resultado = {
  /** Cómo queda como trabajador en relación de dependencia (art. 2º inc. a / art. 3º inc. a). */
  dependiente: Puerta;
  /** Cómo queda como trabajador autónomo (art. 2º inc. b / art. 3º inc. b). */
  autonomo: Puerta;
  /** El umbral del art. 2º inc. d) ap. 1.1, cuando la situación lo hace pertinente. */
  umbral: number | null;
  avisos: Aviso[];
};

const SIN_PUERTA: Puerta = { estado: "no-aplica", norma: "", motivo: "" };

/**
 * ¿El socio queda fuera de la inclusión obligatoria del inciso a)? Los cuatro apartados del
 * art. 2º inc. d) ap. 1 son alternativos: alcanza con que se cumpla uno.
 */
export function socioFueraDelIncisoA(e: Entrada): { fuera: boolean; norma: string; motivo: string } {
  const total = e.totalSocios ?? 0;
  const parte = e.participacion ?? 0;
  const umbral = umbralParticipacion(total);

  if (e.tipoSociedad === "civil-o-de-hecho") {
    return {
      fuera: true,
      norma: "Ley 24.241, art. 2º inc. d) ap. 1.3",
      motivo:
        "Los socios de sociedades civiles y de sociedades comerciales irregulares o de hecho quedan fuera del inciso a) «aunque no se cumpla el requisito» del umbral: no hace falta mirar el porcentaje.",
    };
  }
  if (e.tipoSociedad === "comandita" && e.comanditadoUnico) {
    return {
      fuera: true,
      norma: "Ley 24.241, art. 2º inc. d) ap. 1.2",
      motivo:
        "El socio comanditado único de una sociedad en comandita simple o por acciones queda fuera del inciso a) por su sola condición. Si hubiera más de un comanditado, se vuelve al umbral, pero tomando sólo el capital comanditado.",
    };
  }
  if (e.todosParientes) {
    return {
      fuera: true,
      norma: "Ley 24.241, art. 2º inc. d) ap. 1.4",
      motivo: `Todos los integrantes están ligados por parentesco de hasta el ${GRADO_PARENTESCO}º grado de consanguinidad y/o afinidad: el apartado 1.4 los saca del inciso a) «aunque no estuvieran comprendidos en los puntos anteriores».`,
    };
  }
  if (total > 0 && parte >= umbral) {
    return {
      fuera: true,
      norma: "Ley 24.241, art. 2º inc. d) ap. 1.1",
      motivo: `Con ${total} socios el umbral es ${umbral.toFixed(2).replace(".", ",")} % (cien dividido el número total de socios) y la participación declarada es ${parte.toFixed(2).replace(".", ",")} %: igual o superior, así que no hay inclusión obligatoria en el inciso a).`,
    };
  }
  return {
    fuera: false,
    norma: "Ley 24.241, art. 2º inc. d) ap. 1.1, a contrario",
    motivo: `Con ${total} socios el umbral es ${umbral.toFixed(2).replace(".", ",")} % y la participación declarada es ${parte.toFixed(2).replace(".", ",")} %: por debajo del umbral, ninguno de los cuatro apartados lo excluye del inciso a).`,
  };
}

export function calcularAfiliacion(e: Entrada): Resultado {
  const avisos: Aviso[] = [];
  let dependiente: Puerta = SIN_PUERTA;
  let autonomo: Puerta = SIN_PUERTA;
  let umbral: number | null = null;

  switch (e.situacion) {
    case "privada":
      dependiente = {
        estado: "obligatorio",
        norma: "Ley 24.241, art. 2º inc. a) ap. 5",
        motivo:
          "Servicios remunerados en relación de dependencia en la actividad privada, «en forma permanente, transitoria o eventual». El contrato a plazo fijo no cambia nada: el encabezado del inciso lo dice expresamente.",
      };
      break;

    case "publica-nacional":
      dependiente = {
        estado: "obligatorio",
        norma: "Ley 24.241, art. 2º inc. a) ap. 1",
        motivo:
          "Cargos en cualquiera de los poderes del Estado nacional, sus reparticiones y organismos, «aunque sean de carácter electivo». Quedan excluidos el personal militar de las fuerzas armadas y el militarizado o con estado policial de las fuerzas de seguridad.",
      };
      break;

    case "publica-provincial":
      dependiente = e.provinciaAdherida
        ? {
            estado: "obligatorio",
            norma: "Ley 24.241, art. 2º inc. a) ap. 4",
            motivo:
              "Empleado de un gobierno o municipalidad provincial cuya autoridad adhirió al sistema nacional mediante convenio con el Poder Ejecutivo Nacional.",
          }
        : {
            estado: "no-aplica",
            norma: "Ley 24.241, art. 2º inc. a) ap. 4",
            motivo:
              "El apartado 4 alcanza a los empleados provinciales y municipales «a condición que previamente las autoridades respectivas adhieran» mediante convenio. Sin adhesión, quien manda es la caja local, no esta ley.",
          };
      if (!e.provinciaAdherida) {
        avisos.push({
          tono: "atencion",
          texto:
            "Sin convenio de adhesión, la afiliación la define el régimen previsional de esa provincia o municipio, que tiene sus propias reglas y su propia caja. Esta calculadora no las cubre.",
        });
      }
      break;

    case "exterior":
      dependiente = {
        estado: "obligatorio",
        norma: "Ley 24.241, art. 2º inc. a) ap. 6",
        motivo:
          "Trabajo en el extranjero por un contrato celebrado o una relación iniciada en la República, o por traslado o comisión del empleador, siempre que se tuviera domicilio real en el país al momento de celebrarse, iniciarse o disponerse.",
      };
      break;

    case "direccion":
      autonomo = {
        estado: "obligatorio",
        norma: "Ley 24.241, art. 2º inc. b) ap. 1",
        motivo:
          "Dirección, administración o conducción de cualquier empresa, organización, establecimiento o explotación con fines de lucro, o sociedad comercial o civil, «aunque por esas actividades no obtengan retribución, utilidad o ingreso alguno».",
      };
      avisos.push({
        tono: "bloqueante",
        texto:
          "Que la actividad no deje un peso no suspende la obligación: el apartado 1 alcanza al que dirige o administra aunque no cobre nada por eso. Es la parte del artículo que más sorprende y está escrita con todas las letras.",
      });
      break;

    case "profesion":
      autonomo = {
        estado: "obligatorio",
        norma: "Ley 24.241, art. 2º inc. b) ap. 2",
        motivo:
          "Profesión desempeñada por graduado universitario, o por quien tenga especial habilitación legal para el ejercicio de una profesión universitaria reglamentada, siempre que no configure relación de dependencia.",
      };
      break;

    case "otra-lucrativa":
      autonomo = {
        estado: "obligatorio",
        norma: "Ley 24.241, art. 2º inc. b) ap. 4",
        motivo:
          "El apartado residual: «cualquier otra actividad lucrativa no comprendida en los apartados precedentes», ejercida habitualmente y sin relación de dependencia.",
      };
      break;

    case "socio": {
      const r = socioFueraDelIncisoA(e);
      umbral = umbralParticipacion(e.totalSocios ?? 0);
      dependiente = {
        estado: r.fuera ? "no-aplica" : "obligatorio",
        norma: r.norma,
        motivo: r.motivo,
      };
      autonomo = e.dirigeLaSociedad
        ? {
            estado: "obligatorio",
            norma: "Ley 24.241, art. 2º inc. b) ap. 1",
            motivo:
              "Dirige, administra o conduce la sociedad: el inciso b) lo alcanza como autónomo, con independencia de lo que resuelva el inciso d) sobre la relación de dependencia, y aunque no perciba retribución.",
          }
        : {
            estado: "voluntario",
            norma: "Ley 24.241, art. 3º inc. a) ap. 2",
            motivo:
              "Socio que no resulta incluido obligatoriamente por el inciso d) del art. 2º y que no dirige ni administra: la incorporación es voluntaria, con las obligaciones y beneficios de los dependientes.",
          };
      if (r.fuera) {
        avisos.push({
          tono: "bloqueante",
          texto:
            "Quedar fuera del inciso a) NO es quedar exento. El propio inciso d) arranca diciendo «sin perjuicio de su inclusión en el inciso b)»: significa que no entra obligatoriamente como trabajador en relación de dependencia, no que no aporte. Si dirige o administra, aporta como autónomo.",
        });
      }
      break;
    }

    case "director-sa":
      dependiente = {
        estado: "voluntario",
        norma: "Ley 24.241, art. 3º inc. a) ap. 1",
        motivo:
          "Los directores de sociedades anónimas, por las asignaciones que perciban en la misma sociedad por actividades especialmente remuneradas que configuren relación de dependencia, están en el artículo de la incorporación VOLUNTARIA, no en el de la obligatoria.",
      };
      autonomo = {
        estado: "obligatorio",
        norma: "Ley 24.241, art. 2º inc. b) ap. 1",
        motivo:
          "La dirección de la sociedad es actividad del inciso b): ahí la obligación existe igual, y aunque no perciba retribución por el cargo.",
      };
      avisos.push({
        tono: "atencion",
        texto:
          "Son dos cosas distintas y se mezclan todo el tiempo: por el cargo de director se aporta como autónomo (obligatorio); por el sueldo de las tareas técnico-administrativas se puede sumar como dependiente (voluntario).",
      });
      break;

    case "sindico":
      autonomo = {
        estado: "voluntario",
        norma: "Ley 24.241, art. 3º inc. b) ap. 1",
        motivo:
          "Síndicos de cualquier sociedad, fiduciarios, socios no gerentes de S.R.L. y miembros de consejos de administración de cooperativas que no perciban retribución: incorporación voluntaria, con las obligaciones y beneficios de los autónomos.",
      };
      break;

    case "condominio":
      autonomo = {
        estado: "voluntario",
        norma: "Ley 24.241, art. 3º inc. b) ap. 2",
        motivo:
          "Titulares de condominios y de sucesiones indivisas QUE NO ejerzan la dirección, administración o conducción de la explotación común: la incorporación es voluntaria.",
      };
      avisos.push({
        tono: "atencion",
        texto:
          "La bisagra es administrar. El condómino que sí ejerce la dirección o administración de la explotación común sale de este apartado y cae en el art. 2º inc. b) ap. 1, donde la afiliación es obligatoria.",
      });
      break;

    case "caja-provincial":
      autonomo = {
        estado: "voluntario",
        norma: "Ley 24.241, art. 3º inc. b) ap. 4",
        motivo:
          "El profesional obligatoriamente afiliado a uno o más regímenes jubilatorios provinciales por esa misma profesión puede incorporarse al sistema nacional, y es voluntario.",
      };
      avisos.push({
        tono: "bloqueante",
        texto:
          "Sumarse al sistema nacional no reemplaza a la caja provincial: el apartado cierra con que «esta incorporación no modificará la obligatoriedad que dimana de los respectivos regímenes locales». Se aporta a las dos, no se elige una.",
      });
      break;

    case "clero":
      autonomo = {
        estado: "voluntario",
        norma: "Ley 24.241, art. 3º inc. b) ap. 3",
        motivo:
          "Miembros del clero y de organizaciones religiosas del culto católico apostólico romano, u otros inscriptos en el Registro Nacional de Cultos: incorporación voluntaria.",
      };
      break;

    case "ama-de-casa":
      autonomo = {
        estado: "voluntario",
        norma: "Ley 24.241, art. 3º inc. b) ap. 5",
        motivo:
          "Las amas de casa que decidan incorporarse lo hacen «en la categoría mínima de aportes, pudiendo optar por cualquier otra categoría superior». El apartado lo agregó la Ley 24.347 en 1994.",
      };
      break;

    case "contratado-exterior": {
      const anios = e.aniosContrato ?? 0;
      const califica =
        anios <= EXCEPCION_ANIOS &&
        !e.yaUsoLaExcepcion &&
        !e.residenciaPermanente &&
        !!e.cubiertoEnSuPais;
      const faltantes: string[] = [];
      if (anios > EXCEPCION_ANIOS) faltantes.push(`el contrato supera los ${EXCEPCION_ANIOS} años`);
      if (e.yaUsoLaExcepcion) faltantes.push("la excepción ya se usó y es «por una sola vez»");
      if (e.residenciaPermanente) faltantes.push("hay residencia permanente en el país");
      if (!e.cubiertoEnSuPais)
        faltantes.push("falta la cobertura de vejez, invalidez y muerte en el país de origen");

      dependiente = califica
        ? {
            estado: "exceptuado",
            norma: "Ley 24.241, art. 4º",
            motivo:
              "Profesional, investigador, científico o técnico contratado en el extranjero para prestar servicios en el país: se cumplen las cuatro condiciones del art. 4º, así que queda exceptuado.",
          }
        : {
            estado: "obligatorio",
            norma: "Ley 24.241, art. 4º, a contrario + art. 2º inc. a) ap. 5",
            motivo: `Las cuatro condiciones del art. 4º son acumulativas y acá no se cumplen todas: ${faltantes.join("; ")}. Sin excepción, rige la regla general de la relación de dependencia.`,
          };
      avisos.push({
        tono: "atencion",
        texto: califica
          ? "La excepción no es automática: «la solicitud de exención deberá ser formulada ante la autoridad de aplicación por el interesado o su empleador». Y no impide afiliarse igual si las dos partes lo manifiestan expresamente."
          : "El art. 4º pide las cuatro condiciones a la vez: contrato de hasta dos años, por una sola vez, sin residencia permanente en el país, y con cobertura de vejez, invalidez y muerte en el país de origen o de residencia.",
      });
      break;
    }

    default:
      break;
  }

  return { dependiente, autonomo, umbral, avisos };
}
