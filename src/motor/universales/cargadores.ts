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
  "ahorro-retiro": {
    definir: () => import("./ahorro-retiro/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./ahorro-retiro/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./ahorro-retiro/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./ahorro-retiro/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "alquilar-o-comprar": {
    definir: () => import("./alquilar-o-comprar/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./alquilar-o-comprar/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./alquilar-o-comprar/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./alquilar-o-comprar/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "aumento-de-sueldo": {
    definir: () => import("./aumento-de-sueldo/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./aumento-de-sueldo/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./aumento-de-sueldo/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./aumento-de-sueldo/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "calorias": {
    definir: () => import("./calorias/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./calorias/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./calorias/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./calorias/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "ceramicos": {
    definir: () => import("./ceramicos/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./ceramicos/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./ceramicos/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./ceramicos/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "combustible": {
    definir: () => import("./combustible/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./combustible/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./combustible/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./combustible/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "consumo-electrico": {
    definir: () => import("./consumo-electrico/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./consumo-electrico/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./consumo-electrico/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./consumo-electrico/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "conversor-sueldo": {
    definir: () => import("./conversor-sueldo/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./conversor-sueldo/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./conversor-sueldo/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./conversor-sueldo/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "costo-de-un-auto": {
    definir: () => import("./costo-de-un-auto/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./costo-de-un-auto/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./costo-de-un-auto/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./costo-de-un-auto/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "descuento": {
    definir: () => import("./descuento/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./descuento/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./descuento/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./descuento/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "dias-entre-fechas": {
    definir: () => import("./dias-entre-fechas/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./dias-entre-fechas/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./dias-entre-fechas/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./dias-entre-fechas/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "dividir-gastos": {
    definir: () => import("./dividir-gastos/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./dividir-gastos/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./dividir-gastos/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./dividir-gastos/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "edad": {
    definir: () => import("./edad/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./edad/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./edad/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./edad/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "fecha-de-parto": {
    definir: () => import("./fecha-de-parto/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./fecha-de-parto/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./fecha-de-parto/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./fecha-de-parto/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "fondo-de-emergencia": {
    definir: () => import("./fondo-de-emergencia/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./fondo-de-emergencia/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./fondo-de-emergencia/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./fondo-de-emergencia/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "hipoteca": {
    definir: () => import("./hipoteca/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./hipoteca/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./hipoteca/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./hipoteca/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "horas-trabajadas": {
    definir: () => import("./horas-trabajadas/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./horas-trabajadas/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./horas-trabajadas/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./horas-trabajadas/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "hormigon": {
    definir: () => import("./hormigon/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./hormigon/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./hormigon/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./hormigon/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "imc": {
    definir: () => import("./imc/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./imc/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./imc/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./imc/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "interes-compuesto": {
    definir: () => import("./interes-compuesto/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./interes-compuesto/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./interes-compuesto/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./interes-compuesto/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "interes-simple": {
    definir: () => import("./interes-simple/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./interes-simple/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./interes-simple/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./interes-simple/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "iva": {
    definir: () => import("./iva/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./iva/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./iva/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./iva/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "margen-de-ganancia": {
    definir: () => import("./margen-de-ganancia/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./margen-de-ganancia/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./margen-de-ganancia/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./margen-de-ganancia/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "meta-de-ahorro": {
    definir: () => import("./meta-de-ahorro/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./meta-de-ahorro/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./meta-de-ahorro/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./meta-de-ahorro/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "metros-cuadrados": {
    definir: () => import("./metros-cuadrados/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./metros-cuadrados/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./metros-cuadrados/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./metros-cuadrados/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "ovulacion": {
    definir: () => import("./ovulacion/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./ovulacion/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./ovulacion/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./ovulacion/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "pintura": {
    definir: () => import("./pintura/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./pintura/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./pintura/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./pintura/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "porcentaje": {
    definir: () => import("./porcentaje/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./porcentaje/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./porcentaje/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./porcentaje/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "prestamo": {
    definir: () => import("./prestamo/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./prestamo/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./prestamo/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./prestamo/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "presupuesto": {
    definir: () => import("./presupuesto/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./presupuesto/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./presupuesto/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./presupuesto/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "promedio": {
    definir: () => import("./promedio/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./promedio/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./promedio/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./promedio/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "propina": {
    definir: () => import("./propina/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./propina/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./propina/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./propina/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "punto-de-equilibrio": {
    definir: () => import("./punto-de-equilibrio/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./punto-de-equilibrio/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./punto-de-equilibrio/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./punto-de-equilibrio/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "regla-de-tres": {
    definir: () => import("./regla-de-tres/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./regla-de-tres/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./regla-de-tres/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./regla-de-tres/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "rendimiento-inversion": {
    definir: () => import("./rendimiento-inversion/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./rendimiento-inversion/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./rendimiento-inversion/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./rendimiento-inversion/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "ritmo-de-carrera": {
    definir: () => import("./ritmo-de-carrera/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./ritmo-de-carrera/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./ritmo-de-carrera/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./ritmo-de-carrera/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "sumar-dias": {
    definir: () => import("./sumar-dias/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./sumar-dias/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./sumar-dias/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./sumar-dias/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "tarifa-freelance": {
    definir: () => import("./tarifa-freelance/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./tarifa-freelance/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./tarifa-freelance/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./tarifa-freelance/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "tarjeta-de-credito": {
    definir: () => import("./tarjeta-de-credito/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./tarjeta-de-credito/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./tarjeta-de-credito/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./tarjeta-de-credito/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "tasa-efectiva": {
    definir: () => import("./tasa-efectiva/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./tasa-efectiva/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./tasa-efectiva/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./tasa-efectiva/textos/nl").then((m) => m.textosNl as TextosUi<never>),
    },
  },
  "variacion-porcentual": {
    definir: () => import("./variacion-porcentual/definicion").then((m) => m.definir as Definir),
    textos: {
      "en": () => import("./variacion-porcentual/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./variacion-porcentual/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "nl": () => import("./variacion-porcentual/textos/nl").then((m) => m.textosNl as TextosUi<never>),
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
