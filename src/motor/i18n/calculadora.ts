import type { Idioma, NivelAviso, Trato } from "../tipos";

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

const ES: TextosCalculadora = {
  datos: "Tus datos",
  resultado: "Resultado",
  vacio: "Completa los datos y toca Calcular para ver cuánto te corresponde.",
  sinResultado: "Por ahora no mostramos este resultado.",
  avisos: { info: "Para tener en cuenta", cautela: "Atención", bloquea: "Por qué no mostramos el resultado" },
  fuenteDelAviso: "Fuente",
};

const VARIANTES: Record<Trato, TextosCalculadora> = {
  tu: ES,
  vos: { ...ES, vacio: "Completá los datos y tocá Calcular para ver cuánto te corresponde." },
  usted: { ...ES, datos: "Sus datos", vacio: "Complete los datos y toque Calcular para ver cuánto le corresponde." },
};

const PT: TextosCalculadora = {
  datos: "Seus dados",
  resultado: "Resultado",
  vacio: "Preencha os dados e toque em Calcular para ver quanto você recebe.",
  sinResultado: "Por enquanto não mostramos este resultado.",
  avisos: { info: "Para levar em conta", cautela: "Atenção", bloquea: "Por que não mostramos o resultado" },
  fuenteDelAviso: "Fonte",
};

export function textosCalculadora(idioma: Idioma, trato: Trato): TextosCalculadora {
  return idioma === "pt" ? PT : VARIANTES[trato];
}
