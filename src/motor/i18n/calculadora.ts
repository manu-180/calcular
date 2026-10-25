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

const ZH_HANS_CALCULADORA: TextosCalculadora = {
  datos: "您的数据",
  resultado: "计算结果",
  vacio: "填写数据后点击“计算”，即可看到结果。",
  sinResultado: "暂不显示这项结果。",
  avisos: { info: "温馨提示", cautela: "请注意", bloquea: "为什么不显示结果" },
  fuenteDelAviso: "来源",
};

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
  pl: {
    base: {
      datos: "Twoje dane",
      resultado: "Wynik",
      vacio: "Uzupełnij dane i naciśnij Oblicz, aby zobaczyć wynik.",
      sinResultado: "Na razie nie pokazujemy tego wyniku.",
      avisos: { info: "Dobrze wiedzieć", cautela: "Uwaga", bloquea: "Dlaczego nie pokazujemy wyniku" },
      fuenteDelAviso: "Źródło",
    },
  },
  ja: {
    base: {
      datos: "入力項目",
      resultado: "計算結果",
      vacio: "項目を入力して「計算する」を押すと、結果が表示されます。",
      sinResultado: "この結果は現在表示していません。",
      avisos: { info: "ご参考に", cautela: "ご注意ください", bloquea: "結果を表示しない理由" },
      fuenteDelAviso: "出典",
    },
  },
  ko: {
    base: {
      datos: "입력 정보",
      resultado: "계산 결과",
      vacio: "항목을 입력하고 계산하기를 누르면 결과가 나와요.",
      sinResultado: "이 결과는 지금은 보여 드리지 않아요.",
      avisos: { info: "알아 두세요", cautela: "주의하세요", bloquea: "결과를 보여 드리지 않는 이유" },
      fuenteDelAviso: "출처",
    },
  },
  zh: {
    base: {
      datos: "您的資料",
      resultado: "計算結果",
      vacio: "填寫資料後按下「計算」，即可看到結果。",
      sinResultado: "目前暫不顯示這項結果。",
      avisos: { info: "小提醒", cautela: "請注意", bloquea: "為什麼不顯示結果" },
      fuenteDelAviso: "資料來源",
    },
    regional: {
      "zh-CN": ZH_HANS_CALCULADORA,
      "zh-SG": ZH_HANS_CALCULADORA,
    },
  },
  sv: {
    base: {
      datos: "Dina uppgifter",
      resultado: "Resultat",
      vacio: "Fyll i uppgifterna och tryck på Beräkna för att se resultatet.",
      sinResultado: "Vi visar inte det här resultatet just nu.",
      avisos: { info: "Bra att veta", cautela: "Observera", bloquea: "Därför visar vi inget resultat" },
      fuenteDelAviso: "Källa",
    },
  },
  da: {
    base: {
      datos: "Dine oplysninger",
      resultado: "Resultat",
      vacio: "Udfyld oplysningerne, og tryk på Beregn for at se resultatet.",
      sinResultado: "Vi viser ikke dette resultat lige nu.",
      avisos: { info: "Godt at vide", cautela: "Bemærk", bloquea: "Derfor viser vi ikke et resultat" },
      fuenteDelAviso: "Kilde",
    },
  },
  nb: {
    base: {
      datos: "Opplysningene dine",
      resultado: "Resultat",
      vacio: "Fyll ut opplysningene og trykk på Beregn for å se resultatet.",
      sinResultado: "Vi viser ikke dette resultatet akkurat nå.",
      avisos: { info: "Greit å vite", cautela: "Merk deg", bloquea: "Derfor viser vi ikke noe resultat" },
      fuenteDelAviso: "Kilde",
    },
  },
  fi: {
    base: {
      datos: "Tietosi",
      resultado: "Tulos",
      vacio: "Täytä tiedot ja paina Laske, niin näet tuloksen.",
      sinResultado: "Emme näytä tätä tulosta juuri nyt.",
      avisos: { info: "Hyvä tietää", cautela: "Huomaa", bloquea: "Siksi emme näytä tulosta" },
      fuenteDelAviso: "Lähde",
    },
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
  id: {
    base: {
      datos: "Data Anda",
      resultado: "Hasil",
      vacio: "Isi data Anda, lalu ketuk Hitung untuk melihat hasilnya.",
      sinResultado: "Hasil ini belum kami tampilkan untuk saat ini.",
      avisos: { info: "Perlu diketahui", cautela: "Perhatian", bloquea: "Mengapa hasilnya tidak kami tampilkan" },
      fuenteDelAviso: "Sumber",
    },
  },
  tr: {
    base: {
      datos: "Bilgileriniz",
      resultado: "Sonuç",
      vacio: "Bilgilerinizi girin ve sonucu görmek için Hesapla'ya dokunun.",
      sinResultado: "Bu sonucu şimdilik göstermiyoruz.",
      avisos: { info: "Bilmenizde fayda var", cautela: "Dikkat", bloquea: "Sonucu neden göstermiyoruz" },
      fuenteDelAviso: "Kaynak",
    },
  },
  bn: {
    base: {
      datos: "আপনার তথ্য",
      resultado: "ফলাফল",
      vacio: "তথ্যগুলো লিখে ‘হিসাব করুন’ চাপুন, ফলাফল এখানে দেখা যাবে।",
      sinResultado: "এই ফলাফলটি আপাতত দেখানো হচ্ছে না।",
      avisos: { info: "জেনে রাখুন", cautela: "সতর্কতা", bloquea: "ফলাফল কেন দেখানো হচ্ছে না" },
      fuenteDelAviso: "সূত্র",
    },
  },
  th: {
    base: {
      datos: "ข้อมูลสำหรับคำนวณ",
      resultado: "ผลการคำนวณ",
      vacio: "กรอกข้อมูลแล้วกด “คำนวณ” เพื่อดูผลลัพธ์",
      sinResultado: "ขณะนี้ยังไม่แสดงผลลัพธ์นี้",
      avisos: { info: "ข้อควรทราบ", cautela: "โปรดระวัง", bloquea: "เหตุใดจึงไม่แสดงผลลัพธ์" },
      fuenteDelAviso: "แหล่งที่มา",
    },
  },
  uk: {
    base: {
      datos: "Ваші дані",
      resultado: "Результат",
      vacio: "Введіть дані й натисніть «Розрахувати», щоб побачити результат.",
      sinResultado: "Наразі ми не показуємо цей результат.",
      avisos: { info: "Варто знати", cautela: "Зверніть увагу", bloquea: "Чому ми не показуємо результат" },
      fuenteDelAviso: "Джерело",
    },
  },
  uz: {
    base: {
      datos: "Maʼlumotlaringiz",
      resultado: "Natija",
      vacio: "Maʼlumotlarni kiriting va natijani koʻrish uchun «Hisoblash» tugmasini bosing.",
      sinResultado: "Bu natijani hozircha koʻrsatmaymiz.",
      avisos: { info: "Eslatma", cautela: "Diqqat", bloquea: "Natija nega koʻrsatilmaydi" },
      fuenteDelAviso: "Manba",
    },
  },
  ru: {
    base: {
      datos: "Ваши данные",
      resultado: "Результат",
      vacio: "Введите данные и нажмите «Рассчитать», чтобы увидеть результат.",
      sinResultado: "Сейчас мы не показываем этот результат.",
      avisos: { info: "Полезно знать", cautela: "Обратите внимание", bloquea: "Почему мы не показываем результат" },
      fuenteDelAviso: "Источник",
    },
  },
  // Rumano (ADR 0002, D18): «dumneavoastră» implícito; el botón es «Calculați».
  ro: {
    base: {
      datos: "Datele dumneavoastră",
      resultado: "Rezultat",
      vacio: "Completați datele și apăsați „Calculați” ca să vedeți rezultatul.",
      sinResultado: "Deocamdată nu afișăm acest rezultat.",
      avisos: { info: "Bine de știut", cautela: "Atenție", bloquea: "De ce nu afișăm rezultatul" },
      fuenteDelAviso: "Sursa",
    },
  },
  cs: {
    base: {
      datos: "Vaše údaje",
      resultado: "Výsledek",
      vacio: "Vyplňte údaje a klikněte na „Spočítat“, výsledek se zobrazí tady.",
      sinResultado: "Tento výsledek zatím nezobrazujeme.",
      avisos: { info: "Dobré vědět", cautela: "Pozor", bloquea: "Proč výsledek nezobrazujeme" },
      fuenteDelAviso: "Zdroj",
    },
  },
};

export function textosCalculadora(idioma: Idioma, trato: Trato, locale?: string): TextosCalculadora {
  return resolver(DICCIONARIOS_CALCULADORA, idioma, trato, locale);
}
