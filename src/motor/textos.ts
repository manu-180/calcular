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
  sv: {
    base: {
      calcular: "Beräkna",
      resultado: "Resultat",
      si: "Ja",
      no: "Nej",
      sinResultado: "Vi visar inte det här resultatet just nu.",
      errores: {
        requerido: "Fyll i det här fältet.",
        "numero-invalido": "Skriv ett tal, till exempel {ejemplo}.",
        "entero-invalido": "Skriv ett heltal, utan decimaler.",
        "menor-que-min": "Lägsta värdet är {min}.",
        "mayor-que-max": "Högsta värdet är {max}.",
        "fecha-invalida": "Välj ett giltigt datum.",
        "hora-invalida": "Välj en giltig tid.",
        "opcion-invalida": "Välj ett alternativ.",
        "region-invalida": "Välj ett område.",
        "calculo-fallido": "Vi kunde inte räkna med de här uppgifterna. Kontrollera värdena och försök igen.",
      },
      milesAmbiguos: "Menade du {sugerido}? Skriv talet utan {signos}.",
      separadores: { punto: "punkter", coma: "kommatecken" },
    },
  },
  da: {
    base: {
      calcular: "Beregn",
      resultado: "Resultat",
      si: "Ja",
      no: "Nej",
      sinResultado: "Vi viser ikke dette resultat lige nu.",
      errores: {
        requerido: "Udfyld dette felt.",
        "numero-invalido": "Skriv et tal, for eksempel {ejemplo}.",
        "entero-invalido": "Skriv et helt tal uden decimaler.",
        "menor-que-min": "Den laveste værdi er {min}.",
        "mayor-que-max": "Den højeste værdi er {max}.",
        "fecha-invalida": "Vælg en gyldig dato.",
        "hora-invalida": "Vælg et gyldigt tidspunkt.",
        "opcion-invalida": "Vælg en mulighed.",
        "region-invalida": "Vælg et område.",
        "calculo-fallido": "Vi kunne ikke regne med disse oplysninger. Tjek værdierne, og prøv igen.",
      },
      milesAmbiguos: "Mente du {sugerido}? Skriv tallet uden {signos}.",
      separadores: { punto: "punktummer", coma: "kommaer" },
    },
  },
  nb: {
    base: {
      calcular: "Beregn",
      resultado: "Resultat",
      si: "Ja",
      no: "Nei",
      sinResultado: "Vi viser ikke dette resultatet akkurat nå.",
      errores: {
        requerido: "Fyll ut dette feltet.",
        "numero-invalido": "Skriv et tall, for eksempel {ejemplo}.",
        "entero-invalido": "Skriv et helt tall uten desimaler.",
        "menor-que-min": "Den laveste verdien er {min}.",
        "mayor-que-max": "Den høyeste verdien er {max}.",
        "fecha-invalida": "Velg en gyldig dato.",
        "hora-invalida": "Velg et gyldig klokkeslett.",
        "opcion-invalida": "Velg et alternativ.",
        "region-invalida": "Velg et område.",
        "calculo-fallido": "Vi kunne ikke regne med disse opplysningene. Sjekk verdiene og prøv igjen.",
      },
      milesAmbiguos: "Mente du {sugerido}? Skriv tallet uten {signos}.",
      separadores: { punto: "punktum", coma: "komma" },
    },
  },
  // Finés: «ilman» rige partitivo («ilman pisteitä»), por eso los separadores van en partitivo plural.
  fi: {
    base: {
      calcular: "Laske",
      resultado: "Tulos",
      si: "Kyllä",
      no: "Ei",
      sinResultado: "Emme näytä tätä tulosta juuri nyt.",
      errores: {
        requerido: "Täytä tämä kenttä.",
        "numero-invalido": "Kirjoita luku, esimerkiksi {ejemplo}.",
        "entero-invalido": "Kirjoita kokonaisluku ilman desimaaleja.",
        "menor-que-min": "Pienin sallittu arvo on {min}.",
        "mayor-que-max": "Suurin sallittu arvo on {max}.",
        "fecha-invalida": "Valitse kelvollinen päivämäärä.",
        "hora-invalida": "Valitse kelvollinen kellonaika.",
        "opcion-invalida": "Valitse jokin vaihtoehto.",
        "region-invalida": "Valitse alue.",
        "calculo-fallido": "Näillä tiedoilla laskeminen ei onnistunut. Tarkista arvot ja yritä uudelleen.",
      },
      milesAmbiguos: "Tarkoititko {sugerido}? Kirjoita luku ilman {signos}.",
      separadores: { punto: "pisteitä", coma: "pilkkuja" },
    },
  },
  ar: {
    base: {
      calcular: "احسب",
      resultado: "النتيجة",
      si: "نعم",
      no: "لا",
      sinResultado: "لا نعرض هذه النتيجة في الوقت الحالي.",
      errores: {
        requerido: "املأ هذا الحقل.",
        "numero-invalido": "اكتب رقمًا، مثل {ejemplo}.",
        "entero-invalido": "اكتب عددًا صحيحًا بلا كسور.",
        "menor-que-min": "الحد الأدنى هو {min}.",
        "mayor-que-max": "الحد الأقصى هو {max}.",
        "fecha-invalida": "اختر تاريخًا صحيحًا.",
        "hora-invalida": "اختر وقتًا صحيحًا.",
        "opcion-invalida": "اختر أحد الخيارات.",
        "region-invalida": "اختر المنطقة.",
        "calculo-fallido": "تعذّر إجراء الحساب بهذه البيانات. راجع القيم وحاول مرة أخرى.",
      },
      milesAmbiguos: "هل تقصد {sugerido}؟ اكتبه بلا {signos}.",
      separadores: { punto: "نقاط", coma: "فواصل" },
    },
  },
  id: {
    base: {
      calcular: "Hitung",
      resultado: "Hasil",
      si: "Ya",
      no: "Tidak",
      sinResultado: "Hasil ini belum kami tampilkan untuk saat ini.",
      errores: {
        requerido: "Kolom ini wajib diisi.",
        "numero-invalido": "Masukkan angka, misalnya {ejemplo}.",
        "entero-invalido": "Masukkan bilangan bulat, tanpa desimal.",
        "menor-que-min": "Nilai minimum {min}.",
        "mayor-que-max": "Nilai maksimum {max}.",
        "fecha-invalida": "Pilih tanggal yang valid.",
        "hora-invalida": "Pilih jam yang valid.",
        "opcion-invalida": "Pilih salah satu opsi.",
        "region-invalida": "Pilih wilayah.",
        "calculo-fallido": "Perhitungan tidak dapat dilakukan dengan data ini. Periksa kembali nilainya, lalu coba lagi.",
      },
      milesAmbiguos: "Maksud Anda {sugerido}? Tulis tanpa {signos}.",
      separadores: { punto: "titik", coma: "koma" },
    },
  },
  // Turco (ADR 0002, D12): «siz» con las formas corteses, como en los bancos y en e-Devlet. El botón
  // va en imperativo corto («Hesapla»), como los botones de esos sitios; las oraciones, en -in/-ın.
  tr: {
    base: {
      calcular: "Hesapla",
      resultado: "Sonuç",
      si: "Evet",
      no: "Hayır",
      sinResultado: "Bu sonucu şimdilik göstermiyoruz.",
      errores: {
        requerido: "Bu alanı doldurun.",
        "numero-invalido": "Bir sayı girin (örneğin {ejemplo}).",
        "entero-invalido": "Ondalık kullanmadan bir tam sayı girin.",
        "menor-que-min": "En düşük değer {min}.",
        "mayor-que-max": "En yüksek değer {max}.",
        "fecha-invalida": "Geçerli bir tarih seçin.",
        "hora-invalida": "Geçerli bir saat seçin.",
        "opcion-invalida": "Seçeneklerden birini seçin.",
        "region-invalida": "Bir bölge seçin.",
        "calculo-fallido": "Bu bilgilerle hesaplama yapılamadı. Değerleri kontrol edip tekrar deneyin.",
      },
      milesAmbiguos: "Bunu mu demek istediniz: {sugerido}? Lütfen {signos} kullanmadan yazın.",
      separadores: { punto: "nokta", coma: "virgül" },
    },
  },
  // Bengalí (ADR 0002, D14): «আপনি» con el imperativo cortés (লিখুন, বেছে নিন), dari «।» al final.
  bn: {
    base: {
      calcular: "হিসাব করুন",
      resultado: "ফলাফল",
      si: "হ্যাঁ",
      no: "না",
      sinResultado: "এই ফলাফলটি আপাতত দেখানো হচ্ছে না।",
      errores: {
        requerido: "এই ঘরটি পূরণ করুন।",
        "numero-invalido": "একটি সংখ্যা লিখুন, যেমন {ejemplo}।",
        "entero-invalido": "দশমিক ছাড়া পূর্ণসংখ্যা লিখুন।",
        "menor-que-min": "সর্বনিম্ন মান {min}।",
        "mayor-que-max": "সর্বোচ্চ মান {max}।",
        "fecha-invalida": "সঠিক একটি তারিখ বেছে নিন।",
        "hora-invalida": "সঠিক একটি সময় বেছে নিন।",
        "opcion-invalida": "তালিকা থেকে একটি বেছে নিন।",
        "region-invalida": "একটি অঞ্চল বেছে নিন।",
        "calculo-fallido": "এই তথ্য দিয়ে হিসাব করা গেল না। মানগুলো আবার দেখে নিয়ে আরেকবার চেষ্টা করুন।",
      },
      milesAmbiguos: "আপনি কি {sugerido} লিখতে চেয়েছেন? {signos} ছাড়া লিখুন।",
      separadores: { punto: "বিন্দু (.)", coma: "কমা (,)" },
    },
  },
  // Tailandés (ADR 0002, D13): sin punto final, «กรุณา» para pedir y sin ครับ/ค่ะ.
  th: {
    base: {
      calcular: "คำนวณ",
      resultado: "ผลการคำนวณ",
      si: "ใช่",
      no: "ไม่ใช่",
      sinResultado: "ขณะนี้ยังไม่แสดงผลลัพธ์นี้",
      errores: {
        requerido: "กรุณากรอกข้อมูลในช่องนี้",
        "numero-invalido": "กรุณากรอกตัวเลข เช่น {ejemplo}",
        "entero-invalido": "กรุณากรอกจำนวนเต็มโดยไม่มีทศนิยม",
        "menor-que-min": "ค่าต่ำสุดคือ {min}",
        "mayor-que-max": "ค่าสูงสุดคือ {max}",
        "fecha-invalida": "กรุณาเลือกวันที่ที่ถูกต้อง",
        "hora-invalida": "กรุณาเลือกเวลาที่ถูกต้อง",
        "opcion-invalida": "กรุณาเลือกหนึ่งตัวเลือก",
        "region-invalida": "กรุณาเลือกพื้นที่",
        "calculo-fallido": "ไม่สามารถคำนวณจากข้อมูลนี้ได้ กรุณาตรวจสอบค่าที่กรอกแล้วลองอีกครั้ง",
      },
      milesAmbiguos: "หมายถึง {sugerido} หรือไม่ กรุณาพิมพ์โดยไม่ใส่{signos}",
      separadores: { punto: "จุด", coma: "จุลภาค" },
    },
  },
  // Ucraniano (ADR 0002, D15): «ви» con minúscula y las formas corteses, como en Дія, ПриватБанк y
  // monobank. El botón va en infinitivo («Розрахувати»), como los botones de esos sitios; las
  // oraciones, en imperativo de cortesía («введіть», «оберіть»).
  uk: {
    base: {
      calcular: "Розрахувати",
      resultado: "Результат",
      si: "Так",
      no: "Ні",
      sinResultado: "Наразі ми не показуємо цей результат.",
      errores: {
        requerido: "Заповніть це поле.",
        "numero-invalido": "Введіть число, наприклад {ejemplo}.",
        "entero-invalido": "Введіть ціле число без десяткових знаків.",
        "menor-que-min": "Мінімальне значення: {min}.",
        "mayor-que-max": "Максимальне значення: {max}.",
        "fecha-invalida": "Оберіть правильну дату.",
        "hora-invalida": "Оберіть правильний час.",
        "opcion-invalida": "Оберіть один із варіантів.",
        "region-invalida": "Оберіть регіон.",
        "calculo-fallido": "З цими даними розрахунок не вдався. Перевірте значення і спробуйте ще раз.",
      },
      milesAmbiguos: "Ви мали на увазі {sugerido}? Введіть число без {signos}.",
      separadores: { punto: "крапок", coma: "ком" },
    },
  },
  // Uzbeko en escritura latina (ADR 0002, D16): «Siz» con las formas corteses (-ing, -ingiz), como en
  // soliq.uz, my.gov.uz y los bancos. El botón va como en esos sitios, con el nombre de la acción
  // («Hisoblash»); las oraciones, en imperativo cortés («kiriting», «tanlang»).
  uz: {
    base: {
      calcular: "Hisoblash",
      resultado: "Natija",
      si: "Ha",
      no: "Yoʻq",
      sinResultado: "Bu natijani hozircha koʻrsatmaymiz.",
      errores: {
        requerido: "Bu maydonni toʻldiring.",
        "numero-invalido": "Raqam kiriting (masalan, {ejemplo}).",
        "entero-invalido": "Kasr qismisiz butun son kiriting.",
        "menor-que-min": "Eng kichik qiymat: {min}.",
        "mayor-que-max": "Eng katta qiymat: {max}.",
        "fecha-invalida": "Toʻgʻri sanani tanlang.",
        "hora-invalida": "Toʻgʻri vaqtni tanlang.",
        "opcion-invalida": "Variantlardan birini tanlang.",
        "region-invalida": "Hududni tanlang.",
        "calculo-fallido": "Bu maʼlumotlar bilan hisoblab boʻlmadi. Qiymatlarni tekshirib, qaytadan urinib koʻring.",
      },
      milesAmbiguos: "{sugerido} demoqchimisiz? Iltimos, {signos} qoʻymasdan yozing.",
      separadores: { punto: "nuqta", coma: "vergul" },
    },
  },
  // Ruso (ADR 0002, D17): «вы» con minúscula y el imperativo cortés, como en Kaspi, Halyk, egov.kz y
  // Сбер. El botón va en infinitivo («Рассчитать»), como los botones de esos sitios; las oraciones,
  // en imperativo de cortesía («введите», «выберите»).
  ru: {
    base: {
      calcular: "Рассчитать",
      resultado: "Результат",
      si: "Да",
      no: "Нет",
      sinResultado: "Сейчас мы не показываем этот результат.",
      errores: {
        requerido: "Заполните это поле.",
        "numero-invalido": "Введите число, например {ejemplo}.",
        "entero-invalido": "Введите целое число без дробной части.",
        "menor-que-min": "Минимальное значение: {min}.",
        "mayor-que-max": "Максимальное значение: {max}.",
        "fecha-invalida": "Выберите правильную дату.",
        "hora-invalida": "Выберите правильное время.",
        "opcion-invalida": "Выберите один из вариантов.",
        "region-invalida": "Выберите регион.",
        "calculo-fallido": "С этими данными расчет не получился. Проверьте значения и попробуйте еще раз.",
      },
      milesAmbiguos: "Вы имели в виду {sugerido}? Введите число без {signos}.",
      separadores: { punto: "точек", coma: "запятых" },
    },
  },
  // Rumano (ADR 0002, D18): «dumneavoastră» implícito y el imperativo de 2.ª del plural, como en ANAF
  // SPV, BCR e ING Home'Bank. Los botones también van en 2.ª del plural («Calculați»), así una misma
  // pantalla no mezcla personas.
  ro: {
    base: {
      calcular: "Calculați",
      resultado: "Rezultat",
      si: "Da",
      no: "Nu",
      sinResultado: "Deocamdată nu afișăm acest rezultat.",
      errores: {
        requerido: "Completați acest câmp.",
        "numero-invalido": "Introduceți un număr, de exemplu {ejemplo}.",
        "entero-invalido": "Introduceți un număr întreg, fără zecimale.",
        "menor-que-min": "Valoarea minimă este {min}.",
        "mayor-que-max": "Valoarea maximă este {max}.",
        "fecha-invalida": "Alegeți o dată validă.",
        "hora-invalida": "Alegeți o oră validă.",
        "opcion-invalida": "Alegeți una dintre opțiuni.",
        "region-invalida": "Alegeți regiunea.",
        "calculo-fallido": "Nu am putut face calculul cu aceste date. Verificați valorile și încercați din nou.",
      },
      milesAmbiguos: "Ați vrut să scrieți {sugerido}? Introduceți numărul fără {signos}.",
      separadores: { punto: "puncte", coma: "virgule" },
    },
  },
  // Checo (ADR 0002, D19): vykání con «vy» en minúscula, como Finanční správa, ČSOB y Česká
  // spořitelna. El botón va en infinitivo («Spočítat») y las oraciones en imperativo cortés de
  // segunda del plural («zadejte», «vyberte»).
  cs: {
    base: {
      calcular: "Spočítat",
      resultado: "Výsledek",
      si: "Ano",
      no: "Ne",
      sinResultado: "Tento výsledek zatím nezobrazujeme.",
      errores: {
        requerido: "Vyplňte toto pole.",
        "numero-invalido": "Zadejte číslo, například {ejemplo}.",
        "entero-invalido": "Zadejte celé číslo bez desetinných míst.",
        "menor-que-min": "Nejnižší povolená hodnota je {min}.",
        "mayor-que-max": "Nejvyšší povolená hodnota je {max}.",
        "fecha-invalida": "Vyberte platné datum.",
        "hora-invalida": "Vyberte platný čas.",
        "opcion-invalida": "Vyberte jednu z možností.",
        "region-invalida": "Vyberte kraj.",
        "calculo-fallido": "S těmito údaji se výpočet nepodařil. Zkontrolujte hodnoty a zkuste to znovu.",
      },
      milesAmbiguos: "Myslíte {sugerido}? Zadejte číslo bez {signos}.",
      separadores: { punto: "teček", coma: "čárek" },
    },
  },
  // Griego (ADR 0002, D20): πληθυντικός ευγενείας, como myAADE, gov.gr y los bancos. El botón es un
  // sustantivo («Υπολογισμός») y las oraciones van en imperativo cortés de segunda del plural
  // («εισάγετε», «επιλέξτε»). La pregunta cierra con «;», el signo de interrogación griego.
  el: {
    base: {
      calcular: "Υπολογισμός",
      resultado: "Αποτέλεσμα",
      si: "Ναι",
      no: "Όχι",
      sinResultado: "Αυτό το αποτέλεσμα δεν εμφανίζεται ακόμη.",
      errores: {
        requerido: "Συμπληρώστε αυτό το πεδίο.",
        "numero-invalido": "Εισάγετε έναν αριθμό, για παράδειγμα {ejemplo}.",
        "entero-invalido": "Εισάγετε έναν ακέραιο αριθμό χωρίς δεκαδικά.",
        "menor-que-min": "Η ελάχιστη επιτρεπτή τιμή είναι {min}.",
        "mayor-que-max": "Η μέγιστη επιτρεπτή τιμή είναι {max}.",
        "fecha-invalida": "Επιλέξτε μια έγκυρη ημερομηνία.",
        "hora-invalida": "Επιλέξτε μια έγκυρη ώρα.",
        "opcion-invalida": "Επιλέξτε μία από τις επιλογές.",
        "region-invalida": "Επιλέξτε περιοχή.",
        "calculo-fallido": "Ο υπολογισμός δεν ολοκληρώθηκε με αυτά τα στοιχεία. Ελέγξτε τις τιμές και δοκιμάστε ξανά.",
      },
      milesAmbiguos: "Μήπως εννοείτε {sugerido}; Εισάγετε τον αριθμό χωρίς {signos}.",
      separadores: { punto: "τελείες", coma: "κόμματα" },
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
  // Búlgaro (ADR 0002, D24): 2.ª del plural, como ДСК y НАП. El botón va en imperativo cortés.
  bg: {
    base: {
      calcular: "Изчислете",
      resultado: "Резултат",
      si: "Да",
      no: "Не",
      sinResultado: "В момента не показваме този резултат.",
      errores: {
        requerido: "Попълнете това поле.",
        "numero-invalido": "Въведете число, например {ejemplo}.",
        "entero-invalido": "Въведете цяло число, без десетични знаци.",
        "menor-que-min": "Минималната стойност е {min}.",
        "mayor-que-max": "Максималната стойност е {max}.",
        "fecha-invalida": "Изберете валидна дата.",
        "hora-invalida": "Изберете валиден час.",
        "opcion-invalida": "Изберете една от възможностите.",
        "region-invalida": "Изберете област.",
        "calculo-fallido": "С тези данни изчислението не успя. Проверете стойностите и опитайте отново.",
      },
      milesAmbiguos: "Имахте предвид {sugerido}? Въведете числото без {signos}.",
      separadores: { punto: "точки", coma: "запетаи" },
    },
  },
  // Mongol (ADR 0002, D28): botón en «-х» («Тооцоолох») y pedidos en «-на уу», como Хаан банк.
  mn: {
    base: {
      calcular: "Тооцоолох",
      resultado: "Үр дүн",
      si: "Тийм",
      no: "Үгүй",
      sinResultado: "Энэ үр дүнг одоогоор харуулахгүй байна.",
      errores: {
        requerido: "Энэ талбарыг бөглөнө үү.",
        "numero-invalido": "Тоо оруулна уу, жишээ нь {ejemplo}.",
        "entero-invalido": "Бутархайгүй бүхэл тоо оруулна уу.",
        "menor-que-min": "Хамгийн бага утга: {min}.",
        "mayor-que-max": "Хамгийн их утга: {max}.",
        "fecha-invalida": "Зөв огноо сонгоно уу.",
        "hora-invalida": "Зөв цаг сонгоно уу.",
        "opcion-invalida": "Сонголтуудаас нэгийг сонгоно уу.",
        "region-invalida": "Бүс нутаг сонгоно уу.",
        "calculo-fallido": "Энэ мэдээллээр тооцоо гарсангүй. Утгуудаа шалгаад дахин оролдоно уу.",
      },
      milesAmbiguos: "Та {sugerido} гэж оруулах гэсэн үү? Тоог {signos} тэмдэггүй оруулна уу.",
      separadores: { punto: "цэг", coma: "таслал" },
    },
  },
  he: {
    base: {
      calcular: "לחישוב",
      resultado: "התוצאה",
      si: "כן",
      no: "לא",
      sinResultado: "התוצאה הזו לא מוצגת כרגע.",
      errores: {
        requerido: "יש למלא את השדה.",
        "numero-invalido": "הזינו מספר, למשל {ejemplo}.",
        "entero-invalido": "הזינו מספר שלם, בלי שברים.",
        "menor-que-min": "הערך המינימלי הוא {min}.",
        "mayor-que-max": "הערך המקסימלי הוא {max}.",
        "fecha-invalida": "בחרו תאריך תקין.",
        "hora-invalida": "בחרו שעה תקינה.",
        "opcion-invalida": "בחרו אחת מהאפשרויות.",
        "region-invalida": "בחרו אזור.",
        "calculo-fallido": "לא הצלחנו לחשב עם הנתונים האלה. בדקו את הערכים ונסו שוב.",
      },
      milesAmbiguos: "האם התכוונתם ל-{sugerido}? כתבו את המספר בלי {signos}.",
      separadores: { punto: "נקודות", coma: "פסיקים" },
    },
  },
  // Serbio en latinica y ekavski (ADR 0002, D23): «vi» en minúscula, como los bancos y eUprava. El
  // botón va en la forma corta de las interfaces serbias («Izračunaj»); las oraciones, en imperativo
  // de segunda del plural («unesite», «izaberite»).
  sr: {
    base: {
      calcular: "Izračunaj",
      resultado: "Rezultat",
      si: "Da",
      no: "Ne",
      sinResultado: "Ovaj rezultat za sada ne prikazujemo.",
      errores: {
        requerido: "Popunite ovo polje.",
        "numero-invalido": "Unesite broj, na primer {ejemplo}.",
        "entero-invalido": "Unesite ceo broj, bez decimala.",
        "menor-que-min": "Najmanja dozvoljena vrednost je {min}.",
        "mayor-que-max": "Najveća dozvoljena vrednost je {max}.",
        "fecha-invalida": "Izaberite ispravan datum.",
        "hora-invalida": "Izaberite ispravno vreme.",
        "opcion-invalida": "Izaberite jednu od ponuđenih opcija.",
        "region-invalida": "Izaberite region.",
        "calculo-fallido": "Sa ovim podacima obračun nije uspeo. Proverite vrednosti i pokušajte ponovo.",
      },
      milesAmbiguos: "Da li ste mislili {sugerido}? Unesite broj bez {signos}.",
      separadores: { punto: "tačaka", coma: "zareza" },
    },
  },
};

export function textosMotor(idioma: Idioma, trato: Trato, locale?: string): TextosMotor {
  return resolver(DICCIONARIOS_MOTOR, idioma, trato, locale);
}

export function interpolar(plantilla: string, params: Readonly<Record<string, string>> = {}): string {
  return plantilla.replace(/\{(\w+)\}/g, (todo, k: string) => params[k] ?? todo);
}
