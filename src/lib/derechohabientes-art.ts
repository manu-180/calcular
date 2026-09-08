// Motor de derechohabientes de la muerte laboral. Funciones puras, sin fetch.
//
// QUÉ DECIDE Y QUÉ NO. Decide QUIÉNES son derechohabientes bajo cada uno de los dos regímenes que
// se activan con la misma muerte —el art. 18 de la Ley 24.557 (lo paga la ART) y el art. 248 de la
// LCT (lo paga el empleador)— y en qué escalón entra cada uno. NO calcula montos: eso ya lo hacen
// `/indemnizacion-art` y `/indemnizacion-por-fallecimiento`, y duplicar la aritmética sería crear
// una segunda fuente de verdad para el mismo número.
//
// EL LADO LCT NO SE REIMPLEMENTA: se arma la `Familia` del art. 248 y se llama a
// `repartirBeneficiarios` de `lib/muerte-trabajador.ts`, que es la fuente única de ese reparto.
//
// LAS DOS LECTURAS QUE SE MUESTRAN EN VEZ DE RESOLVERSE (mismo criterio que `lib/comision-medica`):
//
//   1. «HASTA LOS 21 AÑOS». El art. 53 dice «hasta los dieciocho (18) años de edad» y el art. 18
//      ap. 2 extiende ese límite a 21 y 25. Se toma la lectura de que el derecho cesa AL CUMPLIR la
//      edad —o sea, cobra quien todavía no la cumplió— porque es la que aplica el organismo que
//      paga. La otra lectura daría un año más. Se dice en la página.
//
//   2. CÓNYUGE CONTRA CONVIVIENTE FUERA DE LOS DOS SUPUESTOS NOMBRADOS. El art. 53 resuelve dos
//      casos: si el cónyuge fue declarado culpable, el conviviente lo excluye; y si hubo alimentos
//      o el causante dio causa a la separación, cobran los dos por partes iguales. El caso restante
//      —conviviente que califica, cónyuge no culpable, sin alimentos ni causa— el texto NO LO
//      RESUELVE. El motor devuelve `discutido` para el cónyuge: no lo tacha ni lo confirma. Poner
//      cualquiera de las dos como certeza es lo peligroso, porque decide quién inicia el trámite.

import {
  ANIOS_CONVIVENCIA,
  ANIOS_CONVIVENCIA_CON_HIJOS,
  EDAD_TOPE_LRT,
  EDAD_TOPE_LRT_ESTUDIANTE,
  EDAD_TOPE_SIPA,
} from "@/data/derechohabientes-art";
import { repartirBeneficiarios, type Beneficiarios, type Familia } from "@/lib/muerte-trabajador";

export type Vinculo = "conyuge" | "conviviente" | "hijo" | "padre" | "familiar";

/** Un integrante del grupo familiar, con sólo los atributos que alguna de las dos normas mira. */
export type Persona = {
  id: string;
  /** Etiqueta libre para mostrar («Hijo 1», «Madre»). No entra en ninguna regla. */
  nombre: string;
  vinculo: Vinculo;
  /** Hijos: años cumplidos a la fecha del fallecimiento. */
  edad?: number;
  /** Hijo estudiante que estaba «a cargo exclusivo del trabajador fallecido» (art. 18 ap. 2). */
  estudianteACargo?: boolean;
  /** Incapacitado para el trabajo al fallecer el causante, o al cumplir los 18 (art. 53). */
  incapacitado?: boolean;
  /** Hijo mayor con Certificado Único de Discapacidad — sólo lo mira el art. 248 de la LCT. */
  cud?: boolean;
  /** Conviviente: años de convivencia pública en aparente matrimonio inmediatamente anteriores. */
  aniosConvivencia?: number;
  /** Conviviente: hay descendencia reconocida por ambos (baja el plazo de 5 a 2 años). */
  hijosEnComun?: boolean;
  /** Hijo que ya goza de jubilación, pensión, retiro o prestación no contributiva. */
  gozaBeneficioPrevisional?: boolean;
  /** Padres y familiares: estaba a cargo del causante. */
  aCargo?: boolean;
  /** Padre o madre que ya había fallecido al momento de la muerte del trabajador. */
  fallecido?: boolean;
};

export type Caso = {
  personas: Persona[];
  /** Requisito previo de los incisos c) y d): el causante estaba separado, o era soltero/viudo/divorciado. */
  causanteSeparadoOSoltero: boolean;
  /** El cónyuge supérstite fue declarado culpable de la separación personal o del divorcio. */
  conyugeDeclaradoCulpable: boolean;
  /** Hubo alimentos (pagados o demandados) o el causante dio causa a la separación o al divorcio. */
  huboAlimentosOCausa: boolean;
};

export type Estado = "si" | "no" | "discutido";
export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type Veredicto = {
  id: string;
  nombre: string;
  vinculo: Vinculo;
  /** ¿Es derechohabiente de la prestación que paga la ART? */
  lrt: Estado;
  motivoLrt: string;
  /** ¿Cobra la indemnización del art. 248 que paga el empleador? */
  lct: Estado;
  motivoLct: string;
  /** Cobra una y no la otra: es el hallazgo que la página existe para mostrar. */
  divergente: boolean;
};

export type EscalonLRT = "art53" | "padres" | "familiares" | "sin-derechohabientes";

export type ResultadoDerechohabientes = {
  escalonLrt: EscalonLRT;
  /** Cuántas personas resultan derechohabientes de la ART, contando las discutidas aparte. */
  titularesLrt: number;
  titularesLrtDiscutidos: number;
  /** El reparto del art. 248, calculado por la fuente única de esa norma. */
  lct: Beneficiarios;
  veredictos: Veredicto[];
  /** Personas que cobran en un régimen y no en el otro. */
  divergencias: Veredicto[];
  avisos: Aviso[];
};

/** El tope de edad que le corresponde a un hijo en el régimen de la LRT. */
export function topeEdadLrt(p: Persona): number {
  return p.estudianteACargo ? EDAD_TOPE_LRT_ESTUDIANTE : EDAD_TOPE_LRT;
}

/** Años de convivencia que exige el art. 53 según haya o no descendencia reconocida por ambos. */
export function aniosExigidos(p: Persona): number {
  return p.hijosEnComun ? ANIOS_CONVIVENCIA_CON_HIJOS : ANIOS_CONVIVENCIA;
}

/** ¿El conviviente cumple las condiciones de los incisos c) y d) del art. 53? */
export function convivienteCalifica(p: Persona, caso: Caso): boolean {
  if (!caso.causanteSeparadoOSoltero) return false;
  return (p.aniosConvivencia ?? 0) >= aniosExigidos(p);
}

/** ¿El hijo entra en el inciso e) del art. 53, con el límite de edad extendido por el art. 18 ap. 2? */
export function hijoCalificaLrt(p: Persona): boolean {
  if (p.incapacitado) return true;
  return (p.edad ?? 0) < topeEdadLrt(p);
}

function contar(personas: Persona[], vinculo: Vinculo): Persona[] {
  return personas.filter((p) => p.vinculo === vinculo);
}

/** Arma la composición del art. 248 desde las mismas personas, para no pedirle los datos dos veces. */
export function familiaArt248(caso: Caso): Familia {
  const hijos = contar(caso.personas, "hijo");
  const hayPareja =
    contar(caso.personas, "conyuge").length > 0 || contar(caso.personas, "conviviente").length > 0;
  return {
    conyugeOConviviente: hayPareja,
    hijosMenores: hijos.filter((h) => (h.edad ?? 0) < EDAD_TOPE_SIPA).length,
    hijosMayoresConCUD: hijos.filter((h) => (h.edad ?? 0) >= EDAD_TOPE_SIPA && !!h.cud).length,
    hijosMayores: hijos.filter((h) => (h.edad ?? 0) >= EDAD_TOPE_SIPA && !h.cud).length,
    padresACargo: contar(caso.personas, "padre").filter((p) => p.aCargo && !p.fallecido).length,
  };
}

function estadoLct(p: Persona, lct: Beneficiarios): Estado {
  switch (lct.grupo) {
    case "primer-grupo":
      if (p.vinculo === "conyuge" || p.vinculo === "conviviente") return "si";
      if (p.vinculo === "hijo") {
        if ((p.edad ?? 0) < EDAD_TOPE_SIPA) return "si";
        return p.cud ? "si" : "no";
      }
      return "no";
    case "hijos-mayores":
      return p.vinculo === "hijo" && (p.edad ?? 0) >= EDAD_TOPE_SIPA ? "si" : "no";
    case "padres-a-cargo":
      return p.vinculo === "padre" && !!p.aCargo && !p.fallecido ? "si" : "no";
    default:
      return "no";
  }
}

function motivoLct(p: Persona, estado: Estado, lct: Beneficiarios): string {
  if (estado === "si") {
    if (p.vinculo === "conyuge" || p.vinculo === "conviviente")
      return "Inciso a) del art. 248: el texto vigente nombra al cónyuge o conviviente sin exigirle un plazo de convivencia.";
    if (p.vinculo === "hijo" && (p.edad ?? 0) < EDAD_TOPE_SIPA)
      return "Inciso b) del art. 248: hijo menor de edad.";
    if (p.vinculo === "hijo" && p.cud)
      return "Inciso c) del art. 248: hijo mayor de edad con Certificado Único de Discapacidad.";
    if (p.vinculo === "hijo")
      return "Es hijo mayor de edad y no hay ninguno de los tres supuestos del primer grupo: el art. 248 lo llama en subsidio.";
    return "Padre o madre a cargo al momento del fallecimiento: el último escalón del art. 248.";
  }
  if (p.vinculo === "hijo" && (p.edad ?? 0) >= EDAD_TOPE_SIPA && !p.cud)
    return "Hijo mayor de edad sin CUD: el art. 248 lo llama sólo «ante la falta» de los tres supuestos del primer grupo, y acá hay alguno.";
  if (p.vinculo === "padre")
    return lct.grupo === "sin-beneficiarios"
      ? "El art. 248 exige que el padre o la madre estuviera a cargo del causante al momento del fallecimiento."
      : "Los padres son el último escalón del art. 248: sólo cobran si no hay ni primer grupo ni hijos mayores.";
  if (p.vinculo === "familiar")
    return "El art. 248 no llama a otros familiares: su lista termina en los padres a cargo.";
  return "No resulta llamado por el art. 248 con esta composición familiar.";
}

/**
 * Quién es derechohabiente de la ART y quién cobra la indemnización del empleador, con la regla
 * que decide cada caso. Los tres escalones del art. 18 ap. 2 son EXCLUYENTES entre sí: los padres
 * cobran sólo «en ausencia de las personas enumeradas» en el art. 53, y los familiares a cargo
 * sólo «en caso de fallecimiento de ambos padres».
 */
export function calcularDerechohabientes(caso: Caso): ResultadoDerechohabientes {
  const avisos: Aviso[] = [];
  const lct = repartirBeneficiarios(familiaArt248(caso));

  const conyuges = contar(caso.personas, "conyuge");
  const convivientes = contar(caso.personas, "conviviente");
  const convivienteHabil = convivientes.find((c) => convivienteCalifica(c, caso));
  const hijosHabiles = contar(caso.personas, "hijo").filter(hijoCalificaLrt);

  const hayArt53 = conyuges.length > 0 || !!convivienteHabil || hijosHabiles.length > 0;

  const padres = contar(caso.personas, "padre");
  const padresVivos = padres.filter((p) => !p.fallecido);
  const familiares = contar(caso.personas, "familiar").filter((f) => f.aCargo);

  let escalonLrt: EscalonLRT = "sin-derechohabientes";
  if (hayArt53) escalonLrt = "art53";
  else if (padresVivos.length > 0) escalonLrt = "padres";
  else if (padres.length > 0 && familiares.length > 0) escalonLrt = "familiares";

  const veredictos: Veredicto[] = caso.personas.map((p) => {
    let lrt: Estado = "no";
    let motivoLrt = "";

    if (p.vinculo === "conyuge") {
      if (escalonLrt !== "art53") {
        motivoLrt = "No hay ningún llamado del art. 53 con esta composición.";
      } else if (convivienteHabil && caso.conyugeDeclaradoCulpable) {
        lrt = "no";
        motivoLrt =
          "El art. 53 es expreso: el conviviente «excluirá al cónyuge supérstite cuando éste hubiere sido declarado culpable de la separación personal o del divorcio».";
      } else if (convivienteHabil && caso.huboAlimentosOCausa) {
        lrt = "si";
        motivoLrt =
          "Concurre con el conviviente por partes iguales: hubo alimentos (pagados o demandados) o el causante dio causa a la separación.";
      } else if (convivienteHabil) {
        lrt = "discutido";
        motivoLrt =
          "El texto no resuelve este caso: hace concurrir al cónyuge con el conviviente sólo cuando hubo alimentos o el causante dio causa, y lo excluye sólo cuando fue declarado culpable. Ninguno de los dos supuestos se da acá.";
      } else {
        lrt = "si";
        motivoLrt = "Incisos a) y b) del art. 53 de la Ley 24.241, al que remite el art. 18 ap. 2.";
      }
    }

    if (p.vinculo === "conviviente") {
      const califica = convivienteCalifica(p, caso);
      lrt = califica ? "si" : "no";
      if (califica) {
        motivoLrt = `Incisos c) y d) del art. 53: acredita ${p.aniosConvivencia ?? 0} años de convivencia y la norma exige ${aniosExigidos(p)}${p.hijosEnComun ? " por haber descendencia reconocida por ambos" : ""}.`;
      } else if (!caso.causanteSeparadoOSoltero) {
        motivoLrt =
          "Falta el requisito previo de los incisos c) y d): que el causante estuviera separado de hecho o legalmente, o fuera soltero, viudo o divorciado.";
      } else {
        motivoLrt = `Le faltan años de convivencia: acredita ${p.aniosConvivencia ?? 0} y el art. 53 exige ${aniosExigidos(p)}.`;
      }
    }

    if (p.vinculo === "hijo") {
      if (escalonLrt !== "art53") {
        motivoLrt = "No hay ningún llamado del art. 53 con esta composición.";
      } else if (p.incapacitado) {
        lrt = "si";
        motivoLrt =
          "Sin límite de edad: el art. 53 aclara que la limitación no rige para quien estaba incapacitado para el trabajo al fallecer el causante o al cumplir los 18 años.";
      } else if (hijoCalificaLrt(p)) {
        lrt = "si";
        motivoLrt = p.estudianteACargo
          ? `Tiene ${p.edad ?? 0} años y el art. 18 ap. 2 eleva el límite a ${EDAD_TOPE_LRT_ESTUDIANTE} para el estudiante a cargo exclusivo del trabajador fallecido.`
          : `Tiene ${p.edad ?? 0} años y el art. 18 ap. 2 extiende el límite del art. 53 hasta los ${EDAD_TOPE_LRT}.`;
      } else {
        lrt = "no";
        motivoLrt = `Tiene ${p.edad ?? 0} años y el tope de la LRT para su caso es ${topeEdadLrt(p)}.`;
      }
    }

    if (p.vinculo === "padre") {
      if (escalonLrt === "padres" && !p.fallecido) {
        lrt = "si";
        motivoLrt =
          padresVivos.length === 1
            ? "Es el único padre vivo: el art. 18 ap. 2 dice que «si hubiera fallecido uno de ellos, la prestación será percibida íntegramente por el otro»."
            : "Segundo escalón del art. 18 ap. 2: en ausencia de los del art. 53, los padres cobran en partes iguales.";
      } else if (p.fallecido) {
        motivoLrt = "Había fallecido antes que el trabajador.";
      } else {
        motivoLrt =
          "Los padres son el segundo escalón: cobran sólo «en ausencia de las personas enumeradas» en el art. 53, y acá hay alguna.";
      }
    }

    if (p.vinculo === "familiar") {
      if (escalonLrt === "familiares" && p.aCargo) {
        lrt = "si";
        motivoLrt =
          "Tercer escalón del art. 18 ap. 2: fallecidos ambos padres, cobran en partes iguales los familiares que acrediten haber estado a cargo del trabajador.";
      } else if (!p.aCargo) {
        motivoLrt = "El tercer escalón exige acreditar haber estado a cargo del trabajador fallecido.";
      } else {
        motivoLrt =
          "El tercer escalón se abre sólo «en caso de fallecimiento de ambos padres», y acá no se da.";
      }
    }

    const estadoLctPersona = estadoLct(p, lct);
    return {
      id: p.id,
      nombre: p.nombre,
      vinculo: p.vinculo,
      lrt,
      motivoLrt,
      lct: estadoLctPersona,
      motivoLct: motivoLct(p, estadoLctPersona, lct),
      divergente: (lrt === "si") !== (estadoLctPersona === "si"),
    };
  });

  if (convivienteHabil && conyuges.length > 0 && !caso.conyugeDeclaradoCulpable && !caso.huboAlimentosOCausa) {
    avisos.push({
      tono: "bloqueante",
      texto:
        "Hay cónyuge y conviviente, y el art. 53 no resuelve esta combinación: sólo dice que el conviviente excluye al cónyuge declarado culpable, y que concurren por partes iguales cuando hubo alimentos o el causante dio causa a la separación. Fuera de esos dos supuestos lo define un juez, no un formulario.",
    });
  }
  if (conyuges.length > 0 && convivientes.length > 0) {
    avisos.push({
      tono: "atencion",
      texto:
        "Para la indemnización del empleador el art. 248 nombra «el cónyuge o conviviente» en un solo inciso y tampoco resuelve el empate: acá se cuenta un titular por ese inciso.",
    });
  }
  const hijosQueOptan = contar(caso.personas, "hijo").filter(
    (h) => h.gozaBeneficioPrevisional && hijoCalificaLrt(h),
  );
  if (hijosQueOptan.length > 0) {
    avisos.push({
      tono: "atencion",
      texto:
        "Un hijo que ya goza de jubilación, pensión, retiro o prestación no contributiva entra al art. 53 sólo si opta por esta pensión: la norma lo dice con esas palabras («salvo que optaren»). No se cobran las dos.",
    });
  }
  if (escalonLrt === "familiares") {
    avisos.push({
      tono: "bloqueante",
      texto:
        "Este es el escalón que la ley dejó sin reglamentar: el art. 18 ap. 2 manda que la reglamentación determine «el grado de parentesco requerido» y el decreto reglamentario de la ley (334/96, art. 7º) no lo hace. Hasta dónde llega «familiar» acá no lo define el reglamento.",
    });
  }
  if (escalonLrt === "sin-derechohabientes") {
    avisos.push({
      tono: "atencion",
      texto:
        "Con esta composición no queda ningún derechohabiente de la ART. Eso no borra la indemnización del art. 248 ni la liquidación final, que se rigen por su propia lista.",
    });
  }

  const titularesLrt = veredictos.filter((v) => v.lrt === "si").length;
  const titularesLrtDiscutidos = veredictos.filter((v) => v.lrt === "discutido").length;

  return {
    escalonLrt,
    titularesLrt,
    titularesLrtDiscutidos,
    lct,
    veredictos,
    divergencias: veredictos.filter((v) => v.divergente),
    avisos,
  };
}
