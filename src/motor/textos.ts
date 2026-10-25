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

const ZH_HANS_MOTOR: TextosMotor = {
  calcular: "计算",
  resultado: "计算结果",
  si: "是",
  no: "否",
  sinResultado: "暂不显示这项结果。",
  errores: {
    requerido: "请填写此项。",
    "numero-invalido": "请输入数字，例如 {ejemplo}。",
    "entero-invalido": "请输入整数，不要带小数。",
    "menor-que-min": "最小值为 {min}。",
    "mayor-que-max": "最大值为 {max}。",
    "fecha-invalida": "请选择有效的日期。",
    "hora-invalida": "请选择有效的时间。",
    "opcion-invalida": "请选择一个选项。",
    "region-invalida": "请选择地区。",
    "calculo-fallido": "无法用这些数据完成计算。请检查数值后重试。",
  },
  milesAmbiguos: "您要输入的是 {sugerido} 吗？请不要加{signos}。",
  separadores: { punto: "句点", coma: "逗号" },
};

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
  ja: {
    base: {
      calcular: "計算する",
      resultado: "計算結果",
      si: "はい",
      no: "いいえ",
      sinResultado: "この結果は現在表示していません。",
      errores: {
        requerido: "この項目を入力してください。",
        "numero-invalido": "数字で入力してください（例：{ejemplo}）。",
        "entero-invalido": "小数点のない整数で入力してください。",
        "menor-que-min": "{min}以上で入力してください。",
        "mayor-que-max": "{max}以下で入力してください。",
        "fecha-invalida": "正しい日付を選んでください。",
        "hora-invalida": "正しい時刻を選んでください。",
        "opcion-invalida": "選択肢から選んでください。",
        "region-invalida": "地域を選んでください。",
        "calculo-fallido": "この内容では計算できませんでした。入力した値を確認して、もう一度お試しください。",
      },
      milesAmbiguos: "{sugerido}のことですか？{signos}を付けずに入力してください。",
      separadores: { punto: "ピリオド", coma: "カンマ" },
    },
  },
  ko: {
    base: {
      calcular: "계산하기",
      resultado: "계산 결과",
      si: "예",
      no: "아니요",
      sinResultado: "이 결과는 지금은 보여 드리지 않아요.",
      errores: {
        requerido: "이 항목을 입력해 주세요.",
        "numero-invalido": "숫자로 입력해 주세요. 예: {ejemplo}",
        "entero-invalido": "소수점 없이 정수로 입력해 주세요.",
        "menor-que-min": "{min} 이상으로 입력해 주세요.",
        "mayor-que-max": "{max} 이하로 입력해 주세요.",
        "fecha-invalida": "올바른 날짜를 선택해 주세요.",
        "hora-invalida": "올바른 시간을 선택해 주세요.",
        "opcion-invalida": "항목을 하나 선택해 주세요.",
        "region-invalida": "지역을 선택해 주세요.",
        "calculo-fallido": "입력한 내용으로는 계산할 수 없었어요. 값을 확인하고 다시 시도해 주세요.",
      },
      milesAmbiguos: "{sugerido}을(를) 입력하려고 하셨나요? {signos} 없이 입력해 주세요.",
      separadores: { punto: "마침표", coma: "쉼표" },
    },
  },
  zh: {
    base: {
      calcular: "計算",
      resultado: "計算結果",
      si: "是",
      no: "否",
      sinResultado: "目前暫不顯示這項結果。",
      errores: {
        requerido: "請填寫這個欄位。",
        "numero-invalido": "請輸入數字，例如 {ejemplo}。",
        "entero-invalido": "請輸入整數，不含小數。",
        "menor-que-min": "最小值為 {min}。",
        "mayor-que-max": "最大值為 {max}。",
        "fecha-invalida": "請選擇有效的日期。",
        "hora-invalida": "請選擇有效的時間。",
        "opcion-invalida": "請選擇一個選項。",
        "region-invalida": "請選擇地區。",
        "calculo-fallido": "無法用這些資料完成計算。請檢查數值後再試一次。",
      },
      milesAmbiguos: "您要輸入的是 {sugerido} 嗎？請不要加{signos}。",
      separadores: { punto: "句點", coma: "逗號" },
    },
    regional: {
      "zh-CN": ZH_HANS_MOTOR,
      "zh-SG": ZH_HANS_MOTOR,
    },
  },
  // Húngaro (ADR 0002, D21): tegezés, como OTP, K&H, Revolut y las calculadoras de los portales
  // húngaros. El botón es el sustantivo de acción («Kiszámítás», como los botones de esos sitios) y
  // los mensajes van en imperativo de segunda del singular («add meg», «válassz»). Las cifras que se
  // interpolan van tras dos puntos, nunca con un sufijo pegado («értéke: {min}»).
  hu: {
    base: {
      calcular: "Kiszámítás",
      resultado: "Eredmény",
      si: "Igen",
      no: "Nem",
      sinResultado: "Ezt az eredményt egyelőre nem mutatjuk.",
      errores: {
        requerido: "Töltsd ki ezt a mezőt.",
        "numero-invalido": "Számot adj meg, például: {ejemplo}.",
        "entero-invalido": "Egész számot adj meg, tizedesjegyek nélkül.",
        "menor-que-min": "A legkisebb megengedett érték: {min}.",
        "mayor-que-max": "A legnagyobb megengedett érték: {max}.",
        "fecha-invalida": "Válassz érvényes dátumot.",
        "hora-invalida": "Válassz érvényes időpontot.",
        "opcion-invalida": "Válassz egyet a lehetőségek közül.",
        "region-invalida": "Válassz megyét vagy régiót.",
        "calculo-fallido": "Ezekkel az adatokkal nem sikerült a számítás. Ellenőrizd az értékeket, és próbáld újra.",
      },
      milesAmbiguos: "Erre gondoltál: {sugerido}? Írd be a számot {signos} nélkül.",
      separadores: { punto: "pontok", coma: "vesszők" },
    },
  },
};

export function textosMotor(idioma: Idioma, trato: Trato, locale?: string): TextosMotor {
  return resolver(DICCIONARIOS_MOTOR, idioma, trato, locale);
}

export function interpolar(plantilla: string, params: Readonly<Record<string, string>> = {}): string {
  return plantilla.replace(/\{(\w+)\}/g, (todo, k: string) => params[k] ?? todo);
}
