// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
// Lo usa solo el navegador (calculadora-intl.tsx): rearma la definición de una universal con el
// contexto plano que manda el servidor. Un import() por definición y otro por idioma, así una página
// baja la cuenta y los textos de su idioma y nada más.
import type { DefinicionCalculadora, Idioma } from "../tipos";
import type { ContextoUniversal, TextosUi } from "./tipos";

type Definir = (ctx: ContextoUniversal, ui: never) => DefinicionCalculadora;

interface CargadorUniversal {
  definir: () => Promise<Definir>;
  textos: Partial<Record<Idioma, () => Promise<TextosUi<never>>>>;
}

const CARGADORES: Readonly<Record<string, CargadorUniversal>> = {
  "descuento": {
    definir: () => import("./descuento/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./descuento/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./descuento/textos/es").then((m) => m.textosEs as TextosUi<never>),
    },
  },
};

export async function cargarUniversal(id: string, contexto: ContextoUniversal): Promise<DefinicionCalculadora> {
  const cargador = CARGADORES[id];
  const textos = cargador?.textos[contexto.idioma];
  if (!cargador || !textos) throw new Error(`sin cargador para la universal ${id} en ${contexto.idioma}`);
  const [definir, t] = await Promise.all([cargador.definir(), textos()]);
  return definir(contexto, t.ui(contexto.trato) as never);
}
