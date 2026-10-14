import type { Idioma, Trato } from "./tipos";

export type CodigoError =
  | "requerido"
  | "numero-invalido"
  | "entero-invalido"
  | "menor-que-min"
  | "mayor-que-max"
  | "fecha-invalida"
  | "opcion-invalida"
  | "region-invalida"
  | "calculo-fallido";

export interface TextosMotor {
  calcular: string;
  resultado: string;
  si: string;
  no: string;
  sinResultado: string;
  errores: Record<CodigoError, string>;
}

type Variante = Idioma | `es-${Trato}`;

const ES_COMUN = {
  calcular: "Calcular",
  resultado: "Resultado",
  si: "Sí",
  no: "No",
  sinResultado: "Por ahora no mostramos este resultado.",
};

const TEXTOS: Record<"pt" | `es-${Trato}`, TextosMotor> & Partial<Record<Exclude<Variante, "es">, TextosMotor>> = {
  "es-tu": {
    ...ES_COMUN,
    errores: {
      requerido: "Completa este campo.",
      "numero-invalido": "Escribe un número, por ejemplo {ejemplo}.",
      "entero-invalido": "Escribe un número entero, sin decimales.",
      "menor-que-min": "El mínimo es {min}.",
      "mayor-que-max": "El máximo es {max}.",
      "fecha-invalida": "Elige una fecha válida.",
      "opcion-invalida": "Elige una opción.",
      "region-invalida": "Elige una región.",
      "calculo-fallido": "No pudimos hacer la cuenta con estos datos. Revisa los valores e inténtalo de nuevo.",
    },
  },
  "es-usted": {
    ...ES_COMUN,
    errores: {
      requerido: "Complete este campo.",
      "numero-invalido": "Escriba un número, por ejemplo {ejemplo}.",
      "entero-invalido": "Escriba un número entero, sin decimales.",
      "menor-que-min": "El mínimo es {min}.",
      "mayor-que-max": "El máximo es {max}.",
      "fecha-invalida": "Elija una fecha válida.",
      "opcion-invalida": "Elija una opción.",
      "region-invalida": "Elija una región.",
      "calculo-fallido": "No pudimos hacer la cuenta con estos datos. Revise los valores e inténtelo de nuevo.",
    },
  },
  "es-vos": {
    ...ES_COMUN,
    errores: {
      requerido: "Completá este campo.",
      "numero-invalido": "Escribí un número, por ejemplo {ejemplo}.",
      "entero-invalido": "Escribí un número entero, sin decimales.",
      "menor-que-min": "El mínimo es {min}.",
      "mayor-que-max": "El máximo es {max}.",
      "fecha-invalida": "Elegí una fecha válida.",
      "opcion-invalida": "Elegí una opción.",
      "region-invalida": "Elegí una región.",
      "calculo-fallido": "No pudimos hacer la cuenta con estos datos. Revisá los valores y probá de nuevo.",
    },
  },
  pt: {
    calcular: "Calcular",
    resultado: "Resultado",
    si: "Sim",
    no: "Não",
    sinResultado: "Por enquanto não mostramos este resultado.",
    errores: {
      requerido: "Preencha este campo.",
      "numero-invalido": "Digite um número, por exemplo {ejemplo}.",
      "entero-invalido": "Digite um número inteiro, sem decimais.",
      "menor-que-min": "O mínimo é {min}.",
      "mayor-que-max": "O máximo é {max}.",
      "fecha-invalida": "Escolha uma data válida.",
      "opcion-invalida": "Escolha uma opção.",
      "region-invalida": "Escolha uma região.",
      "calculo-fallido": "Não conseguimos fazer a conta com esses dados. Revise os valores e tente de novo.",
    },
  },
};

export function textosMotor(idioma: Idioma, trato: Trato): TextosMotor {
  if (idioma === "es") return TEXTOS[`es-${trato}`];
  return TEXTOS[idioma] ?? TEXTOS[`es-${trato}`];
}

export function interpolar(plantilla: string, params: Readonly<Record<string, string>> = {}): string {
  return plantilla.replace(/\{(\w+)\}/g, (todo, k: string) => params[k] ?? todo);
}
