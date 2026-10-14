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
      "de": () => import("./ahorro-retiro/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./ahorro-retiro/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./ahorro-retiro/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./ahorro-retiro/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./ahorro-retiro/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./ahorro-retiro/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./ahorro-retiro/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "alquilar-o-comprar": {
    definir: () => import("./alquilar-o-comprar/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./alquilar-o-comprar/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./alquilar-o-comprar/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./alquilar-o-comprar/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./alquilar-o-comprar/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./alquilar-o-comprar/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./alquilar-o-comprar/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./alquilar-o-comprar/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "aumento-de-sueldo": {
    definir: () => import("./aumento-de-sueldo/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./aumento-de-sueldo/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./aumento-de-sueldo/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./aumento-de-sueldo/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./aumento-de-sueldo/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./aumento-de-sueldo/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./aumento-de-sueldo/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./aumento-de-sueldo/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "calorias": {
    definir: () => import("./calorias/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./calorias/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./calorias/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./calorias/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./calorias/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./calorias/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./calorias/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./calorias/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "ceramicos": {
    definir: () => import("./ceramicos/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./ceramicos/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./ceramicos/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./ceramicos/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./ceramicos/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./ceramicos/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./ceramicos/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./ceramicos/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "combustible": {
    definir: () => import("./combustible/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./combustible/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./combustible/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./combustible/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./combustible/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./combustible/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./combustible/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./combustible/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "consumo-electrico": {
    definir: () => import("./consumo-electrico/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./consumo-electrico/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./consumo-electrico/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./consumo-electrico/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./consumo-electrico/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./consumo-electrico/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./consumo-electrico/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./consumo-electrico/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "conversor-sueldo": {
    definir: () => import("./conversor-sueldo/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./conversor-sueldo/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./conversor-sueldo/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./conversor-sueldo/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./conversor-sueldo/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./conversor-sueldo/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./conversor-sueldo/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./conversor-sueldo/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "costo-de-un-auto": {
    definir: () => import("./costo-de-un-auto/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./costo-de-un-auto/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./costo-de-un-auto/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./costo-de-un-auto/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./costo-de-un-auto/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./costo-de-un-auto/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./costo-de-un-auto/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./costo-de-un-auto/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "descuento": {
    definir: () => import("./descuento/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./descuento/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./descuento/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./descuento/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./descuento/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./descuento/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./descuento/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./descuento/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "dias-entre-fechas": {
    definir: () => import("./dias-entre-fechas/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./dias-entre-fechas/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./dias-entre-fechas/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./dias-entre-fechas/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./dias-entre-fechas/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./dias-entre-fechas/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./dias-entre-fechas/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./dias-entre-fechas/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "dividir-gastos": {
    definir: () => import("./dividir-gastos/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./dividir-gastos/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./dividir-gastos/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./dividir-gastos/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./dividir-gastos/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./dividir-gastos/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./dividir-gastos/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./dividir-gastos/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "edad": {
    definir: () => import("./edad/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./edad/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./edad/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./edad/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./edad/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./edad/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./edad/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./edad/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "fecha-de-parto": {
    definir: () => import("./fecha-de-parto/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./fecha-de-parto/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./fecha-de-parto/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./fecha-de-parto/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./fecha-de-parto/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./fecha-de-parto/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./fecha-de-parto/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./fecha-de-parto/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "fondo-de-emergencia": {
    definir: () => import("./fondo-de-emergencia/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./fondo-de-emergencia/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./fondo-de-emergencia/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./fondo-de-emergencia/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./fondo-de-emergencia/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./fondo-de-emergencia/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./fondo-de-emergencia/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./fondo-de-emergencia/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "hipoteca": {
    definir: () => import("./hipoteca/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./hipoteca/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./hipoteca/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./hipoteca/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./hipoteca/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./hipoteca/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./hipoteca/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./hipoteca/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "horas-trabajadas": {
    definir: () => import("./horas-trabajadas/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./horas-trabajadas/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./horas-trabajadas/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./horas-trabajadas/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./horas-trabajadas/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./horas-trabajadas/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./horas-trabajadas/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./horas-trabajadas/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "hormigon": {
    definir: () => import("./hormigon/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./hormigon/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./hormigon/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./hormigon/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./hormigon/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./hormigon/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./hormigon/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./hormigon/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "imc": {
    definir: () => import("./imc/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./imc/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./imc/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./imc/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./imc/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./imc/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./imc/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./imc/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "interes-compuesto": {
    definir: () => import("./interes-compuesto/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./interes-compuesto/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./interes-compuesto/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./interes-compuesto/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./interes-compuesto/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./interes-compuesto/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./interes-compuesto/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./interes-compuesto/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "interes-simple": {
    definir: () => import("./interes-simple/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./interes-simple/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./interes-simple/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./interes-simple/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./interes-simple/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./interes-simple/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./interes-simple/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./interes-simple/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "iva": {
    definir: () => import("./iva/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./iva/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./iva/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./iva/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./iva/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./iva/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./iva/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./iva/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "margen-de-ganancia": {
    definir: () => import("./margen-de-ganancia/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./margen-de-ganancia/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./margen-de-ganancia/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./margen-de-ganancia/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./margen-de-ganancia/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./margen-de-ganancia/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./margen-de-ganancia/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./margen-de-ganancia/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "meta-de-ahorro": {
    definir: () => import("./meta-de-ahorro/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./meta-de-ahorro/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./meta-de-ahorro/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./meta-de-ahorro/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./meta-de-ahorro/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./meta-de-ahorro/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./meta-de-ahorro/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./meta-de-ahorro/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "metros-cuadrados": {
    definir: () => import("./metros-cuadrados/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./metros-cuadrados/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./metros-cuadrados/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./metros-cuadrados/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./metros-cuadrados/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./metros-cuadrados/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./metros-cuadrados/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./metros-cuadrados/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "ovulacion": {
    definir: () => import("./ovulacion/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./ovulacion/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./ovulacion/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./ovulacion/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./ovulacion/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./ovulacion/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./ovulacion/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./ovulacion/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "pintura": {
    definir: () => import("./pintura/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./pintura/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./pintura/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./pintura/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./pintura/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./pintura/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./pintura/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./pintura/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "porcentaje": {
    definir: () => import("./porcentaje/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./porcentaje/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./porcentaje/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./porcentaje/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./porcentaje/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./porcentaje/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./porcentaje/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./porcentaje/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "prestamo": {
    definir: () => import("./prestamo/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./prestamo/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./prestamo/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./prestamo/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./prestamo/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./prestamo/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./prestamo/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./prestamo/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "presupuesto": {
    definir: () => import("./presupuesto/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./presupuesto/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./presupuesto/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./presupuesto/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./presupuesto/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./presupuesto/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./presupuesto/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./presupuesto/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "promedio": {
    definir: () => import("./promedio/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./promedio/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./promedio/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./promedio/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./promedio/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./promedio/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./promedio/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./promedio/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "propina": {
    definir: () => import("./propina/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./propina/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./propina/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./propina/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./propina/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./propina/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./propina/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./propina/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "punto-de-equilibrio": {
    definir: () => import("./punto-de-equilibrio/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./punto-de-equilibrio/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./punto-de-equilibrio/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./punto-de-equilibrio/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./punto-de-equilibrio/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./punto-de-equilibrio/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./punto-de-equilibrio/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./punto-de-equilibrio/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "regla-de-tres": {
    definir: () => import("./regla-de-tres/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./regla-de-tres/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./regla-de-tres/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./regla-de-tres/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./regla-de-tres/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./regla-de-tres/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./regla-de-tres/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./regla-de-tres/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "rendimiento-inversion": {
    definir: () => import("./rendimiento-inversion/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./rendimiento-inversion/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./rendimiento-inversion/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./rendimiento-inversion/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./rendimiento-inversion/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./rendimiento-inversion/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./rendimiento-inversion/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./rendimiento-inversion/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "ritmo-de-carrera": {
    definir: () => import("./ritmo-de-carrera/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./ritmo-de-carrera/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./ritmo-de-carrera/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./ritmo-de-carrera/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./ritmo-de-carrera/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./ritmo-de-carrera/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./ritmo-de-carrera/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./ritmo-de-carrera/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "sumar-dias": {
    definir: () => import("./sumar-dias/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./sumar-dias/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./sumar-dias/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./sumar-dias/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./sumar-dias/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./sumar-dias/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./sumar-dias/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./sumar-dias/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "tarifa-freelance": {
    definir: () => import("./tarifa-freelance/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./tarifa-freelance/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./tarifa-freelance/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./tarifa-freelance/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./tarifa-freelance/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./tarifa-freelance/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./tarifa-freelance/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./tarifa-freelance/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "tarjeta-de-credito": {
    definir: () => import("./tarjeta-de-credito/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./tarjeta-de-credito/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./tarjeta-de-credito/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./tarjeta-de-credito/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./tarjeta-de-credito/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./tarjeta-de-credito/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./tarjeta-de-credito/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./tarjeta-de-credito/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "tasa-efectiva": {
    definir: () => import("./tasa-efectiva/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./tasa-efectiva/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./tasa-efectiva/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./tasa-efectiva/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./tasa-efectiva/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./tasa-efectiva/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./tasa-efectiva/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./tasa-efectiva/textos/pt").then((m) => m.textosPt as TextosUi<never>),
    },
  },
  "variacion-porcentual": {
    definir: () => import("./variacion-porcentual/definicion").then((m) => m.definir as Definir),
    textos: {
      "de": () => import("./variacion-porcentual/textos/de").then((m) => m.textosDe as TextosUi<never>),
      "en": () => import("./variacion-porcentual/textos/en").then((m) => m.textosEn as TextosUi<never>),
      "es": () => import("./variacion-porcentual/textos/es").then((m) => m.textosEs as TextosUi<never>),
      "fr": () => import("./variacion-porcentual/textos/fr").then((m) => m.textosFr as TextosUi<never>),
      "it": () => import("./variacion-porcentual/textos/it").then((m) => m.textosIt as TextosUi<never>),
      "nl": () => import("./variacion-porcentual/textos/nl").then((m) => m.textosNl as TextosUi<never>),
      "pt": () => import("./variacion-porcentual/textos/pt").then((m) => m.textosPt as TextosUi<never>),
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
