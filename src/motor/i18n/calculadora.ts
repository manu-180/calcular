import type { Idioma, NivelAviso, Trato } from "../tipos";
import { resolver, type Diccionarios } from "./resolver";

// Separado del resto del diccionario porque viaja en el JS de cada calculadora: solo lo que el
// formulario y el resultado muestran en el navegador.
export interface TextosCalculadora {
  datos: string;
  resultado: string;
  vacio: string;
  sinResultado: string;
  avisos: Record<NivelAviso, string>;
  fuenteDelAviso: string;
}

export const DICCIONARIOS_CALCULADORA: Diccionarios<TextosCalculadora> = {
  es: {
    base: {
      datos: "Tus datos",
      resultado: "Resultado",
      vacio: "Completa los datos y toca Calcular para ver el resultado.",
      sinResultado: "Por ahora no mostramos este resultado.",
      avisos: { info: "Para tener en cuenta", cautela: "Atención", bloquea: "Por qué no mostramos el resultado" },
      fuenteDelAviso: "Fuente",
    },
    vos: { vacio: "Completá los datos y tocá Calcular para ver el resultado." },
    usted: { datos: "Sus datos", vacio: "Complete los datos y toque Calcular para ver el resultado." },
  },
  pt: {
    base: {
      datos: "Seus dados",
      resultado: "Resultado",
      vacio: "Preencha os dados e toque em Calcular para ver o resultado.",
      sinResultado: "Por enquanto não mostramos este resultado.",
      avisos: { info: "Bom saber", cautela: "Atenção", bloquea: "Por que não mostramos o resultado" },
      fuenteDelAviso: "Fonte",
    },
    usted: { datos: "Dados", vacio: "Preencha os dados e toque em Calcular para ver o resultado." },
  },
  en: {
    base: {
      datos: "Your details",
      resultado: "Result",
      vacio: "Fill in the details and tap Calculate to see the result.",
      sinResultado: "We're not showing this result for now.",
      avisos: { info: "Good to know", cautela: "Heads up", bloquea: "Why we're not showing a result" },
      fuenteDelAviso: "Source",
    },
  },
  fr: {
    base: {
      datos: "Tes informations",
      resultado: "Résultat",
      vacio: "Remplis les champs et appuie sur Calculer pour voir le résultat.",
      sinResultado: "Ce résultat n'est pas affiché pour le moment.",
      avisos: { info: "Bon à savoir", cautela: "Attention", bloquea: "Pourquoi le résultat n'est pas affiché" },
      fuenteDelAviso: "Source",
    },
    usted: { datos: "Vos informations", vacio: "Remplissez les champs et appuyez sur Calculer pour voir le résultat." },
  },
  de: {
    base: {
      datos: "Deine Angaben",
      resultado: "Ergebnis",
      vacio: "Füll die Felder aus und tippe auf Berechnen, um das Ergebnis zu sehen.",
      sinResultado: "Dieses Ergebnis zeigen wir derzeit nicht an.",
      avisos: { info: "Gut zu wissen", cautela: "Achtung", bloquea: "Warum wir kein Ergebnis anzeigen" },
      fuenteDelAviso: "Quelle",
    },
    usted: { datos: "Ihre Angaben", vacio: "Füllen Sie die Felder aus und tippen Sie auf Berechnen, um das Ergebnis zu sehen." },
  },
  it: {
    base: {
      datos: "I tuoi dati",
      resultado: "Risultato",
      vacio: "Compila i campi e tocca Calcola per vedere il risultato.",
      sinResultado: "Per ora non mostriamo questo risultato.",
      avisos: { info: "Da sapere", cautela: "Attenzione", bloquea: "Perché non mostriamo il risultato" },
      fuenteDelAviso: "Fonte",
    },
    usted: { datos: "I Suoi dati", vacio: "Compili i campi e tocchi Calcola per vedere il risultato." },
  },
  nl: {
    base: {
      datos: "Je gegevens",
      resultado: "Uitkomst",
      vacio: "Vul de gegevens in en tik op Berekenen om de uitkomst te zien.",
      sinResultado: "Deze uitkomst tonen we voorlopig niet.",
      avisos: { info: "Goed om te weten", cautela: "Let op", bloquea: "Waarom we geen uitkomst tonen" },
      fuenteDelAviso: "Bron",
    },
    usted: { datos: "Uw gegevens", vacio: "Vul de gegevens in en tik op Berekenen om de uitkomst te zien." },
  },
  ar: {
    base: {
      datos: "بياناتك",
      resultado: "النتيجة",
      vacio: "أدخل البيانات واضغط «احسب» لتظهر النتيجة.",
      sinResultado: "لا نعرض هذه النتيجة في الوقت الحالي.",
      avisos: { info: "معلومة مفيدة", cautela: "تنبيه", bloquea: "لماذا لا نعرض النتيجة" },
      fuenteDelAviso: "المصدر",
    },
  },
};

export function textosCalculadora(idioma: Idioma, trato: Trato, locale?: string): TextosCalculadora {
  return resolver(DICCIONARIOS_CALCULADORA, idioma, trato, locale);
}
