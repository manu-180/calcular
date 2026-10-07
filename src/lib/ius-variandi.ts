import { CAMINOS, MOTIVOS_VEDA, type MotivoVeda } from "@/data/ius-variandi";
import { calcularIndemnizacion, type ResultadoIndemnizacion } from "@/lib/indemnizacion";

// Ius variandi (LCT arts. 65, 66 y 68, textos Ley 27.802): qué puede hacer hoy el trabajador
// cuando el empleador le cambia las condiciones de trabajo, y cuánto cobra si el único camino que
// le quedó —considerarse despedido— es el que toma.
//
// LA PÁGINA TIENE DOS MITADES Y LAS DOS SON EL HALLAZGO:
//   1. **Qué cambios siguen vedados.** El art. 66 vigente enuncia dos límites: alterar modalidades
//      esenciales y causar perjuicio material. El texto anterior enunciaba cuatro: esos dos más el
//      perjuicio MORAL y el "ejercicio irrazonable de esa facultad". Un mismo cambio puede estar
//      vedado con el texto viejo y no estarlo con el nuevo — y esa brecha es lo que la calculadora
//      nombra en vez de esconder.
//   2. **Qué caminos quedan.** Antes había dos: considerarse despedido O accionar por el
//      restablecimiento (vía sumarísima, sin innovar hasta sentencia). Hoy queda uno solo, y con
//      un requisito nuevo: intimación previa desoída.
//
// LO QUE NO SE AFIRMA: que un cambio "irrazonable" o con daño moral hoy sea válido sin más. El
// art. 65 quedó intacto y sigue exigiendo ejercicio funcional. Lo que la calculadora dice es lo
// que el TEXTO dice, y marca explícitamente dónde termina el texto y empieza la interpretación.
//
// EL ART. 245 NO SE REIMPLEMENTA (regla de s85): la liquidación del despido indirecto sale de
// `calcularIndemnizacion`, la misma función que usa /indemnizacion. El art. 246 remite a los
// arts. 232, 233 y 245: son exactamente los rubros indemnizatorios de un despido sin causa.

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type EstadoIntimacion = "no-intimo" | "intimo-desoida" | "intimo-rectificaron";

export type ResultadoIusVariandi = {
  /** Motivos marcados por el usuario. */
  marcados: MotivoVeda[];
  /** Motivos marcados que el texto VIGENTE sigue enunciando como veda. */
  vedanHoy: MotivoVeda[];
  /** Motivos marcados que sólo vedaban con el texto anterior al 6/3/2026. */
  vedabanAntes: MotivoVeda[];
  /** true si el cambio está vedado por el texto vigente del art. 66. */
  vedadoHoy: boolean;
  /** true si lo estaba con el texto anterior. */
  vedadoAntes: boolean;
  /** true cuando el cambio cambió de lado con la reforma: es la brecha. */
  cambioDeLado: boolean;
  /** true si además de estar vedado, se cumplió el requisito nuevo de intimación desoída. */
  habilitadoAConsiderarseDespedido: boolean;
  /** Caminos disponibles hoy y los que había antes. */
  caminosHoy: typeof CAMINOS;
  caminosAntes: typeof CAMINOS;
  /** Liquidación del despido indirecto (art. 246 → arts. 232, 233 y 245). Null si faltan datos. */
  liquidacion: ResultadoIndemnizacion | null;
  avisos: Aviso[];
};

export function evaluarIusVariandi(params: {
  /** ids de MOTIVOS_VEDA marcados. */
  motivos: MotivoVeda["id"][];
  intimacion: EstadoIntimacion;
  ingresoISO: string;
  egresoISO: string;
  mejorRemuneracion: number;
  topeCCT?: number;
}): ResultadoIusVariandi {
  const { motivos, intimacion, ingresoISO, egresoISO, mejorRemuneracion, topeCCT } = params;

  const marcados = MOTIVOS_VEDA.filter((m) => motivos.includes(m.id));
  const vedanHoy = marcados.filter((m) => m.vedaHoy);
  const vedabanAntes = marcados.filter((m) => !m.vedaHoy);

  const vedadoHoy = vedanHoy.length > 0;
  const vedadoAntes = marcados.length > 0;
  const cambioDeLado = vedadoAntes && !vedadoHoy;

  const habilitadoAConsiderarseDespedido = vedadoHoy && intimacion === "intimo-desoida";

  const liquidacion = habilitadoAConsiderarseDespedido
    ? calcularIndemnizacion({
        ingresoISO,
        despidoISO: egresoISO,
        mejorRemuneracion,
        preavisoOtorgado: false,
        topeCCT,
      })
    : null;

  const avisos: Aviso[] = [];

  if (marcados.length === 0) {
    avisos.push({
      tono: "atencion",
      texto:
        "No marcaste ningún motivo. Si el cambio no altera modalidades esenciales del contrato ni te causa perjuicio material, el artículo 66 lo autoriza: es la facultad de organizar el trabajo que la ley le reconoce al empleador.",
    });
  }

  if (cambioDeLado) {
    const nombres = vedabanAntes.map((m) => m.etiqueta.toLowerCase()).join(" y ");
    avisos.push({
      tono: "bloqueante",
      texto: `Lo que marcaste (${nombres}) vedaba el cambio con el texto anterior del artículo 66, pero el texto vigente desde el 6 de marzo de 2026 ya no lo enuncia. Con esos motivos solos, la ley hoy no te habilita a considerarte despedido. El artículo 65, que la reforma no tocó, sigue exigiendo que las facultades de dirección se ejerzan «con carácter funcional (…) sin perjuicio de la preservación y mejora de los derechos personales y patrimoniales del trabajador»: si hay un argumento, va a tener que salir de ahí. Eso es una lectura, no un texto, y todavía no hay jurisprudencia sobre la reforma. Consultá a un profesional antes de dar por roto el contrato.`,
    });
  }

  if (vedadoHoy) {
    avisos.push({
      tono: "ok",
      texto: `El cambio queda vedado por el texto vigente del artículo 66: ${vedanHoy
        .map((m) => m.etiqueta.toLowerCase())
        .join(" y ")}. Los dos límites que la reforma conservó.`,
    });
  }

  if (vedadoHoy && intimacion === "no-intimo") {
    avisos.push({
      tono: "bloqueante",
      texto:
        "Falta el requisito que la reforma agregó: el artículo 66 vigente dice que la posibilidad de considerarse despedido asiste al trabajador «previa intimación y si ésta fuere desoída». Antes del 6 de marzo de 2026 el texto no la exigía. Intimá por escrito y de manera fehaciente (telegrama laboral o carta documento), dando un plazo para que rectifiquen, y guardá la constancia. Sin ese paso, un reclamo bien fundado se cae por la forma.",
    });
  }

  if (vedadoHoy && intimacion === "intimo-rectificaron") {
    avisos.push({
      tono: "atencion",
      texto:
        "Si el empleador rectificó el cambio dentro del plazo, la intimación no quedó desoída y la vía del artículo 66 no se abre: el contrato sigue. Considerarse despedido en ese escenario es un despido indirecto sin la causa que lo justifique, y el riesgo es tuyo.",
    });
  }

  if (habilitadoAConsiderarseDespedido) {
    avisos.push({
      tono: "ok",
      texto:
        "Con el cambio vedado y la intimación desoída, el artículo 66 habilita a considerarte despedido sin causa. Lo que cobrás es lo que el artículo 246 manda para el despido indirecto: las indemnizaciones de los artículos 232 (preaviso), 233 (integración del mes) y 245 (antigüedad), más la liquidación final.",
    });
  }

  avisos.push({
    tono: "atencion",
    texto:
      "El camino que ya no existe: hasta el 6 de marzo de 2026 podías seguir trabajando y pedirle al juez el restablecimiento de las condiciones, por vía sumarísima y sin que el empleador pudiera innovar hasta la sentencia definitiva. Lo había creado la Ley 26.088 en 2006 y la Ley 27.802 lo sacó del artículo. Hoy, frente a un cambio vedado, la ley ofrece un solo camino, y es el que termina el contrato.",
  });

  return {
    marcados,
    vedanHoy,
    vedabanAntes,
    vedadoHoy,
    vedadoAntes,
    cambioDeLado,
    habilitadoAConsiderarseDespedido,
    caminosHoy: CAMINOS.filter((c) => c.disponibleHoy),
    caminosAntes: CAMINOS,
    liquidacion,
    avisos,
  };
}
