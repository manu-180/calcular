import { resolver, type Diccionarios } from "./i18n/resolver";
import type { Idioma, Trato } from "./tipos";

export type CodigoError =
  | "requerido"
  | "numero-invalido"
  | "entero-invalido"
  | "menor-que-min"
  | "mayor-que-max"
  | "fecha-invalida"
  | "hora-invalida"
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
  // Cuando parsearNumero rechaza "5.000" por ambiguo: {sugerido} es el número sin separadores y
  // {signos} el nombre del separador en plural (de separadores, abajo).
  milesAmbiguos: string;
  separadores: { punto: string; coma: string };
}

// Solo texto con {marcadores}, sin funciones: así el diccionario se puede serializar.
export const DICCIONARIOS_MOTOR: Diccionarios<TextosMotor> = {
  es: {
    base: {
      calcular: "Calcular",
      resultado: "Resultado",
      si: "Sí",
      no: "No",
      sinResultado: "Por ahora no mostramos este resultado.",
      errores: {
        requerido: "Completa este campo.",
        "numero-invalido": "Escribe un número, por ejemplo {ejemplo}.",
        "entero-invalido": "Escribe un número entero, sin decimales.",
        "menor-que-min": "El mínimo es {min}.",
        "mayor-que-max": "El máximo es {max}.",
        "fecha-invalida": "Elige una fecha válida.",
        "hora-invalida": "Elige una hora válida.",
        "opcion-invalida": "Elige una opción.",
        "region-invalida": "Elige una región.",
        "calculo-fallido": "No pudimos hacer la cuenta con estos datos. Revisa los valores e inténtalo de nuevo.",
      },
      milesAmbiguos: "¿Quisiste decir {sugerido}? Escríbelo sin {signos}.",
      separadores: { punto: "puntos", coma: "comas" },
    },
    usted: {
      errores: {
        requerido: "Complete este campo.",
        "numero-invalido": "Escriba un número, por ejemplo {ejemplo}.",
        "entero-invalido": "Escriba un número entero, sin decimales.",
        "fecha-invalida": "Elija una fecha válida.",
        "hora-invalida": "Elija una hora válida.",
        "opcion-invalida": "Elija una opción.",
        "region-invalida": "Elija una región.",
        "calculo-fallido": "No pudimos hacer la cuenta con estos datos. Revise los valores e inténtelo de nuevo.",
      },
      milesAmbiguos: "¿Quiso decir {sugerido}? Escríbalo sin {signos}.",
    },
    vos: {
      errores: {
        requerido: "Completá este campo.",
        "numero-invalido": "Escribí un número, por ejemplo {ejemplo}.",
        "entero-invalido": "Escribí un número entero, sin decimales.",
        "fecha-invalida": "Elegí una fecha válida.",
        "hora-invalida": "Elegí una hora válida.",
        "opcion-invalida": "Elegí una opción.",
        "region-invalida": "Elegí una región.",
        "calculo-fallido": "No pudimos hacer la cuenta con estos datos. Revisá los valores y probá de nuevo.",
      },
      milesAmbiguos: "¿Quisiste decir {sugerido}? Escribilo sin {signos}.",
    },
  },
  pt: {
    base: {
      calcular: "Calcular",
      resultado: "Resultado",
      si: "Sim",
      no: "Não",
      sinResultado: "Por enquanto não mostramos este resultado.",
      errores: {
        requerido: "Preencha este campo.",
        "numero-invalido": "Digite um número, por exemplo {ejemplo}.",
        "entero-invalido": "Digite um número inteiro, sem casas decimais.",
        "menor-que-min": "O mínimo é {min}.",
        "mayor-que-max": "O máximo é {max}.",
        "fecha-invalida": "Escolha uma data válida.",
        "hora-invalida": "Escolha um horário válido.",
        "opcion-invalida": "Escolha uma opção.",
        "region-invalida": "Escolha uma região.",
        "calculo-fallido": "Não conseguimos fazer a conta com esses dados. Revise os valores e tente de novo.",
      },
      milesAmbiguos: "Você quis dizer {sugerido}? Digite sem {signos}.",
      separadores: { punto: "pontos", coma: "vírgulas" },
    },
    usted: { milesAmbiguos: "O valor seria {sugerido}? Digite sem {signos}." },
  },
  en: {
    base: {
      calcular: "Calculate",
      resultado: "Result",
      si: "Yes",
      no: "No",
      sinResultado: "We're not showing this result for now.",
      errores: {
        requerido: "Fill in this field.",
        "numero-invalido": "Enter a number, for example {ejemplo}.",
        "entero-invalido": "Enter a whole number, without decimals.",
        "menor-que-min": "The minimum is {min}.",
        "mayor-que-max": "The maximum is {max}.",
        "fecha-invalida": "Choose a valid date.",
        "hora-invalida": "Choose a valid time.",
        "opcion-invalida": "Choose an option.",
        "region-invalida": "Choose a region.",
        "calculo-fallido": "We couldn't run the numbers with these details. Check the values and try again.",
      },
      milesAmbiguos: "Did you mean {sugerido}? Type it without {signos}.",
      separadores: { punto: "periods", coma: "commas" },
    },
  },
  fr: {
    base: {
      calcular: "Calculer",
      resultado: "Résultat",
      si: "Oui",
      no: "Non",
      sinResultado: "Ce résultat n'est pas affiché pour le moment.",
      errores: {
        requerido: "Remplis ce champ.",
        "numero-invalido": "Saisis un nombre, par exemple {ejemplo}.",
        "entero-invalido": "Saisis un nombre entier, sans décimales.",
        "menor-que-min": "Le minimum est {min}.",
        "mayor-que-max": "Le maximum est {max}.",
        "fecha-invalida": "Choisis une date valide.",
        "hora-invalida": "Choisis une heure valide.",
        "opcion-invalida": "Choisis une option.",
        "region-invalida": "Choisis une région.",
        "calculo-fallido": "Le calcul n'a pas abouti avec ces données. Vérifie les valeurs et réessaie.",
      },
      milesAmbiguos: "Tu voulais dire {sugerido} ? Écris-le sans {signos}.",
      separadores: { punto: "points", coma: "virgules" },
    },
    usted: {
      errores: {
        requerido: "Remplissez ce champ.",
        "numero-invalido": "Saisissez un nombre, par exemple {ejemplo}.",
        "entero-invalido": "Saisissez un nombre entier, sans décimales.",
        "fecha-invalida": "Choisissez une date valide.",
        "hora-invalida": "Choisissez une heure valide.",
        "opcion-invalida": "Choisissez une option.",
        "region-invalida": "Choisissez une région.",
        "calculo-fallido": "Le calcul n'a pas abouti avec ces données. Vérifiez les valeurs et réessayez.",
      },
      milesAmbiguos: "Vouliez-vous dire {sugerido} ? Écrivez-le sans {signos}.",
    },
  },
  de: {
    base: {
      calcular: "Berechnen",
      resultado: "Ergebnis",
      si: "Ja",
      no: "Nein",
      sinResultado: "Dieses Ergebnis zeigen wir derzeit nicht an.",
      errores: {
        requerido: "Füll dieses Feld aus.",
        "numero-invalido": "Gib eine Zahl ein, zum Beispiel {ejemplo}.",
        "entero-invalido": "Gib eine ganze Zahl ohne Nachkommastellen ein.",
        "menor-que-min": "Der Mindestwert ist {min}.",
        "mayor-que-max": "Der Höchstwert ist {max}.",
        "fecha-invalida": "Wähle ein gültiges Datum.",
        "hora-invalida": "Wähle eine gültige Uhrzeit.",
        "opcion-invalida": "Wähle eine Option.",
        "region-invalida": "Wähle eine Region.",
        "calculo-fallido": "Mit diesen Angaben konnten wir nicht rechnen. Prüf die Werte und versuch es noch einmal.",
      },
      milesAmbiguos: "Meintest du {sugerido}? Schreib die Zahl ohne {signos}.",
      separadores: { punto: "Punkte", coma: "Kommas" },
    },
    usted: {
      errores: {
        requerido: "Bitte füllen Sie dieses Feld aus.",
        "numero-invalido": "Geben Sie eine Zahl ein, zum Beispiel {ejemplo}.",
        "entero-invalido": "Geben Sie eine ganze Zahl ohne Nachkommastellen ein.",
        "fecha-invalida": "Wählen Sie ein gültiges Datum.",
        "hora-invalida": "Wählen Sie eine gültige Uhrzeit.",
        "opcion-invalida": "Wählen Sie eine Option.",
        "region-invalida": "Wählen Sie eine Region.",
        "calculo-fallido": "Mit diesen Angaben konnten wir nicht rechnen. Prüfen Sie die Werte und versuchen Sie es noch einmal.",
      },
      milesAmbiguos: "Meinten Sie {sugerido}? Schreiben Sie die Zahl ohne {signos}.",
    },
  },
  it: {
    base: {
      calcular: "Calcola",
      resultado: "Risultato",
      si: "Sì",
      no: "No",
      sinResultado: "Per ora non mostriamo questo risultato.",
      errores: {
        requerido: "Compila questo campo.",
        "numero-invalido": "Inserisci un numero, per esempio {ejemplo}.",
        "entero-invalido": "Inserisci un numero intero, senza decimali.",
        "menor-que-min": "Il minimo è {min}.",
        "mayor-que-max": "Il massimo è {max}.",
        "fecha-invalida": "Scegli una data valida.",
        "hora-invalida": "Scegli un orario valido.",
        "opcion-invalida": "Scegli un'opzione.",
        "region-invalida": "Scegli una regione.",
        "calculo-fallido": "Non siamo riusciti a fare il calcolo con questi dati. Controlla i valori e riprova.",
      },
      milesAmbiguos: "Intendevi {sugerido}? Scrivilo senza {signos}.",
      separadores: { punto: "punti", coma: "virgole" },
    },
    usted: {
      errores: {
        requerido: "Compili questo campo.",
        "numero-invalido": "Inserisca un numero, per esempio {ejemplo}.",
        "entero-invalido": "Inserisca un numero intero, senza decimali.",
        "fecha-invalida": "Scelga una data valida.",
        "hora-invalida": "Scelga un orario valido.",
        "opcion-invalida": "Scelga un'opzione.",
        "region-invalida": "Scelga una regione.",
        "calculo-fallido": "Non siamo riusciti a fare il calcolo con questi dati. Controlli i valori e riprovi.",
      },
      milesAmbiguos: "Intendeva {sugerido}? Lo scriva senza {signos}.",
    },
  },
  nl: {
    base: {
      calcular: "Berekenen",
      resultado: "Uitkomst",
      si: "Ja",
      no: "Nee",
      sinResultado: "Deze uitkomst tonen we voorlopig niet.",
      errores: {
        requerido: "Vul dit veld in.",
        "numero-invalido": "Vul een getal in, bijvoorbeeld {ejemplo}.",
        "entero-invalido": "Vul een heel getal in, zonder decimalen.",
        "menor-que-min": "Het minimum is {min}.",
        "mayor-que-max": "Het maximum is {max}.",
        "fecha-invalida": "Kies een geldige datum.",
        "hora-invalida": "Kies een geldige tijd.",
        "opcion-invalida": "Kies een optie.",
        "region-invalida": "Kies een regio.",
        "calculo-fallido": "Met deze gegevens lukte de berekening niet. Controleer de waarden en probeer het opnieuw.",
      },
      milesAmbiguos: "Bedoel je {sugerido}? Schrijf het zonder {signos}.",
      separadores: { punto: "punten", coma: "komma's" },
    },
    usted: { milesAmbiguos: "Bedoelt u {sugerido}? Schrijf het zonder {signos}." },
  },
  pl: {
    base: {
      calcular: "Oblicz",
      resultado: "Wynik",
      si: "Tak",
      no: "Nie",
      sinResultado: "Na razie nie pokazujemy tego wyniku.",
      errores: {
        requerido: "Uzupełnij to pole.",
        "numero-invalido": "Wpisz liczbę, na przykład {ejemplo}.",
        "entero-invalido": "Wpisz liczbę całkowitą, bez części dziesiętnej.",
        "menor-que-min": "Najmniejsza wartość to {min}.",
        "mayor-que-max": "Największa wartość to {max}.",
        "fecha-invalida": "Wybierz poprawną datę.",
        "hora-invalida": "Wybierz poprawną godzinę.",
        "opcion-invalida": "Wybierz jedną z opcji.",
        "region-invalida": "Wybierz region.",
        "calculo-fallido": "Z tymi danymi nie udało się wykonać obliczeń. Sprawdź wartości i spróbuj jeszcze raz.",
      },
      milesAmbiguos: "Chodziło ci o {sugerido}? Wpisz liczbę bez {signos}.",
      separadores: { punto: "kropek", coma: "przecinków" },
    },
  },
};

export function textosMotor(idioma: Idioma, trato: Trato, locale?: string): TextosMotor {
  return resolver(DICCIONARIOS_MOTOR, idioma, trato, locale);
}

export function interpolar(plantilla: string, params: Readonly<Record<string, string>> = {}): string {
  return plantilla.replace(/\{(\w+)\}/g, (todo, k: string) => params[k] ?? todo);
}
