import type { Idioma, Trato } from "../tipos";
import { resolver, type Diccionarios } from "./resolver";

// Bloque de enlaces patrocinados de «Tu sueldo en el mundo» (src/motor/mundo/ui/Afiliados.tsx). Sin
// segunda persona a propósito: el componente no recibe el trato del mercado y así el mismo texto sirve
// en tú, vos y usted. Nada de «el mejor»: cada línea dice qué hace el servicio, que es verificable.
export type SocioAfiliado = "wise" | "deel";

export interface TextosAfiliados {
  titulo: string;
  etiqueta: string;
  socios: Record<SocioAfiliado, string>;
  nota: string;
  nuevaPestana: string;
}

const ZH_HANS: TextosAfiliados = {
  titulo: "打算移居国外，或从国外收款？",
  etiqueta: "赞助链接",
  socios: {
    wise: "多币种账户，按市场中间汇率在国家之间收款和汇款，手续费事先列明。",
    deel: "为在一个国家为另一个国家的公司工作的人提供合同和收款服务。",
  },
  nota: "通过这些链接开户，本站可能获得佣金，开户者不会因此多付费用。",
  nuevaPestana: "在新标签页中打开",
};

export const DICCIONARIOS_AFILIADOS: Diccionarios<TextosAfiliados> = {
  es: {
    base: {
      titulo: "¿Mudarse o cobrar desde el exterior?",
      etiqueta: "Enlaces patrocinados",
      socios: {
        wise: "Cuenta en varias monedas para recibir y mandar dinero entre países, con el tipo de cambio medio del mercado y la comisión a la vista.",
        deel: "Contratos y cobros para quien trabaja desde un país para una empresa de otro.",
      },
      nota: "Si se abre una cuenta desde estos enlaces, el sitio puede recibir una comisión. Quien se registra no paga más por eso.",
      nuevaPestana: "se abre en una pestaña nueva",
    },
  },
  pt: {
    base: {
      titulo: "Mudar de país ou receber do exterior?",
      etiqueta: "Links patrocinados",
      socios: {
        wise: "Conta em várias moedas para receber e enviar dinheiro entre países, com o câmbio comercial médio e a tarifa à vista.",
        deel: "Contratos e pagamentos para quem trabalha de um país para uma empresa de outro.",
      },
      nota: "Se uma conta for aberta por estes links, o site pode receber uma comissão. Quem se cadastra não paga nada a mais por isso.",
      nuevaPestana: "abre em uma nova aba",
    },
  },
  en: {
    base: {
      titulo: "Moving abroad or getting paid from another country?",
      etiqueta: "Sponsored links",
      socios: {
        wise: "A multi-currency account to send and receive money across countries at the mid-market rate, with the fee shown upfront.",
        deel: "Contracts and payouts for people who work from one country for a company in another.",
      },
      nota: "If an account is opened through these links, this site may earn a commission. Signing up costs nothing extra.",
      nuevaPestana: "opens in a new tab",
    },
  },
  fr: {
    base: {
      titulo: "S’installer à l’étranger ou être payé depuis un autre pays ?",
      etiqueta: "Liens sponsorisés",
      socios: {
        wise: "Un compte multidevise pour envoyer et recevoir de l’argent entre pays au taux de change moyen du marché, frais affichés à l’avance.",
        deel: "Contrats et paiements pour les personnes qui travaillent depuis un pays pour une entreprise d’un autre.",
      },
      nota: "Si un compte est ouvert via ces liens, le site peut toucher une commission. L’inscription ne coûte rien de plus.",
      nuevaPestana: "s’ouvre dans un nouvel onglet",
    },
  },
  de: {
    base: {
      titulo: "Auswandern oder Gehalt aus dem Ausland beziehen?",
      etiqueta: "Gesponserte Links",
      socios: {
        wise: "Ein Konto in mehreren Währungen, um Geld zwischen Ländern zum Mittelkurs zu senden und zu empfangen, mit vorab ausgewiesener Gebühr.",
        deel: "Verträge und Auszahlungen für Menschen, die von einem Land aus für ein Unternehmen in einem anderen arbeiten.",
      },
      nota: "Wird über diese Links ein Konto eröffnet, kann diese Website eine Provision erhalten. Die Anmeldung kostet dadurch nichts extra.",
      nuevaPestana: "öffnet in einem neuen Tab",
    },
  },
  it: {
    base: {
      titulo: "Trasferirsi all’estero o farsi pagare da un altro paese?",
      etiqueta: "Link sponsorizzati",
      socios: {
        wise: "Un conto multivaluta per inviare e ricevere denaro tra paesi al tasso di cambio medio di mercato, con la commissione indicata prima.",
        deel: "Contratti e pagamenti per chi lavora da un paese per un’azienda di un altro.",
      },
      nota: "Se si apre un conto da questi link, il sito può ricevere una commissione. Chi si iscrive non paga nulla in più.",
      nuevaPestana: "si apre in una nuova scheda",
    },
  },
  nl: {
    base: {
      titulo: "Emigreren of betaald worden vanuit het buitenland?",
      etiqueta: "Gesponsorde links",
      socios: {
        wise: "Een rekening in meerdere valuta om geld tussen landen te versturen en te ontvangen tegen de middenkoers, met de kosten vooraf zichtbaar.",
        deel: "Contracten en uitbetalingen voor wie vanuit het ene land voor een bedrijf in een ander land werkt.",
      },
      nota: "Wordt via deze links een rekening geopend, dan kan deze site een commissie krijgen. Aanmelden kost daardoor niets extra.",
      nuevaPestana: "opent in een nieuw tabblad",
    },
  },
  ja: {
    base: {
      titulo: "海外への移住や、海外からの報酬の受け取りをお考えですか？",
      etiqueta: "スポンサーリンク",
      socios: {
        wise: "複数の通貨に対応した口座です。仲値の為替レートで国をまたいで送金・受け取りができ、手数料は事前に表示されます。",
        deel: "ある国から別の国の会社のために働く人向けの、契約と報酬受け取りのサービスです。",
      },
      nota: "これらのリンクから口座が開設されると、当サイトが紹介料を受け取ることがあります。登録する方の負担が増えることはありません。",
      nuevaPestana: "新しいタブで開きます",
    },
  },
  ko: {
    base: {
      titulo: "해외 이주나 해외에서 급여를 받는 것을 생각 중이신가요?",
      etiqueta: "스폰서 링크",
      socios: {
        wise: "여러 통화를 쓰는 계좌로, 시장 중간 환율로 국가 간에 돈을 보내고 받을 수 있으며 수수료를 미리 보여 줘요.",
        deel: "한 나라에서 다른 나라 회사를 위해 일하는 사람을 위한 계약과 급여 지급 서비스예요.",
      },
      nota: "이 링크로 계좌를 만들면 이 사이트가 수수료를 받을 수 있어요. 가입하는 분이 더 내는 비용은 없어요.",
      nuevaPestana: "새 탭에서 열려요",
    },
  },
  zh: {
    base: {
      titulo: "打算移居國外，或從國外收款？",
      etiqueta: "贊助連結",
      socios: {
        wise: "多幣別帳戶，以市場中間匯率在國家之間收款與匯款，手續費事先列明。",
        deel: "為在一個國家替另一個國家的公司工作的人提供合約與收款服務。",
      },
      nota: "透過這些連結開戶，本站可能獲得佣金，開戶者不會因此多付費用。",
      nuevaPestana: "在新分頁中開啟",
    },
    regional: {
      "zh-CN": ZH_HANS,
      "zh-SG": ZH_HANS,
    },
  },
  pl: {
    base: {
      titulo: "Przeprowadzka za granicę albo wypłata z innego kraju?",
      etiqueta: "Linki sponsorowane",
      socios: {
        wise: "Konto w wielu walutach do wysyłania i odbierania pieniędzy między krajami, po średnim kursie rynkowym i z opłatą podaną z góry.",
        deel: "Umowy i wypłaty dla osób, które pracują z jednego kraju dla firmy z innego.",
      },
      nota: "Jeśli ktoś otworzy konto przez te linki, serwis może dostać prowizję. Osoba, która się rejestruje, nie płaci przez to więcej.",
      nuevaPestana: "otwiera się w nowej karcie",
    },
  },
  sv: {
    base: {
      titulo: "Flytta utomlands eller få betalt från ett annat land?",
      etiqueta: "Sponsrade länkar",
      socios: {
        wise: "Ett konto i flera valutor för att ta emot och skicka pengar mellan länder, till mittkurs och med avgiften synlig från början.",
        deel: "Avtal och utbetalningar för den som jobbar från ett land åt ett företag i ett annat.",
      },
      nota: "Om ett konto öppnas via de här länkarna kan sajten få en provision. Den som registrerar sig betalar inget extra för det.",
      nuevaPestana: "öppnas i en ny flik",
    },
  },
  da: {
    base: {
      titulo: "Flytte til udlandet eller få løn fra et andet land?",
      etiqueta: "Sponsorerede links",
      socios: {
        wise: "En konto i flere valutaer til at sende og modtage penge mellem lande til midtkursen, med gebyret vist på forhånd.",
        deel: "Kontrakter og udbetalinger til folk, der arbejder fra ét land for en virksomhed i et andet.",
      },
      nota: "Bliver en konto oprettet via disse links, kan siden få en provision. Den, der opretter sig, betaler ikke mere for det.",
      nuevaPestana: "åbner i en ny fane",
    },
  },
  nb: {
    base: {
      titulo: "Skal flytte utenlands eller få betalt fra et annet land?",
      etiqueta: "Sponsede lenker",
      socios: {
        wise: "Konto i flere valutaer for å sende og motta penger mellom land, til midtkurs og med gebyret vist på forhånd.",
        deel: "Kontrakter og utbetalinger for dem som jobber fra ett land for et selskap i et annet.",
      },
      nota: "Hvis noen åpner en konto via disse lenkene, kan nettstedet få en provisjon. Den som registrerer seg, betaler ikke mer for det.",
      nuevaPestana: "åpnes i en ny fane",
    },
  },
  // Finés (ADR 0002, D9): sin segunda persona, con pasiva.
  fi: {
    base: {
      titulo: "Muutto ulkomaille tai palkka toisesta maasta?",
      etiqueta: "Sponsoroidut linkit",
      socios: {
        wise: "Monivaluuttatili rahan vastaanottamiseen ja lähettämiseen maasta toiseen markkinoiden keskikurssilla, palkkio näkyy etukäteen.",
        deel: "Sopimukset ja maksut niille, jotka tekevät töitä yhdestä maasta toisen maan yritykselle.",
      },
      nota: "Jos tili avataan näiden linkkien kautta, sivusto voi saada palkkion. Rekisteröityvä ei maksa siitä mitään ylimääräistä.",
      nuevaPestana: "avautuu uuteen välilehteen",
    },
  },
  // Árabe estándar moderno (ADR 0002, D10), impersonal como los demás.
  ar: {
    base: {
      titulo: "هل تنوي الانتقال إلى الخارج أو تلقّي أموال من دولة أخرى؟",
      etiqueta: "روابط مموّلة",
      socios: {
        wise: "حساب متعدد العملات لإرسال الأموال واستلامها بين الدول بسعر الصرف المتوسط في السوق، مع رسوم معروضة مسبقًا.",
        deel: "عقود ومدفوعات لمن يعمل من دولة لصالح شركة في دولة أخرى.",
      },
      nota: "إذا فُتح حساب من هذه الروابط، قد يحصل الموقع على عمولة. ولا يدفع من يسجّل شيئًا إضافيًا مقابل ذلك.",
      nuevaPestana: "يُفتح في علامة تبويب جديدة",
    },
  },
  // Indonesio (ADR 0002, D11): impersonal como los demás, frases cortas.
  id: {
    base: {
      titulo: "Berencana pindah ke luar negeri atau menerima pembayaran dari negara lain?",
      etiqueta: "Tautan bersponsor",
      socios: {
        wise: "Rekening multimata uang untuk mengirim dan menerima uang antarnegara dengan kurs tengah pasar. Biayanya terlihat sebelum transaksi.",
        deel: "Kontrak dan pembayaran bagi orang yang bekerja dari satu negara untuk perusahaan di negara lain.",
      },
      nota: "Jika rekening dibuka lewat tautan ini, situs ini bisa mendapat komisi. Biaya untuk yang mendaftar tidak bertambah.",
      nuevaPestana: "terbuka di tab baru",
    },
  },
  tr: {
    base: {
      titulo: "Yurt dışına taşınmayı ya da başka bir ülkeden ödeme almayı mı düşünüyorsunuz?",
      etiqueta: "Sponsorlu bağlantılar",
      socios: {
        wise: "Ülkeler arasında piyasa ortalaması kurla para almak ve göndermek için çok para birimli hesap; ücreti işlemden önce görünür.",
        deel: "Bir ülkeden başka bir ülkedeki şirket için çalışanlara sözleşme ve ödeme hizmeti.",
      },
      nota: "Bu bağlantılarla hesap açılırsa site komisyon alabilir. Kaydolan kişi bu yüzden daha fazla ödemez.",
      nuevaPestana: "yeni sekmede açılır",
    },
  },
  // Bengalí (ADR 0002, D14): «আপনি» con las formas corteses y dari «।».
  bn: {
    base: {
      titulo: "অন্য দেশে যাওয়ার কথা ভাবছেন, বা বিদেশ থেকে আয় করেন?",
      etiqueta: "স্পনসর করা লিংক",
      socios: {
        wise: "কয়েকটি মুদ্রার একটি অ্যাকাউন্ট: বাজারের মধ্যবর্তী হারে দেশ থেকে দেশে টাকা পাঠান ও গ্রহণ করুন, ফি আগেই দেখানো হয়।",
        deel: "এক দেশে থেকে অন্য দেশের কোম্পানির জন্য যাঁরা কাজ করেন, তাঁদের চুক্তি আর পেমেন্টের ব্যবস্থা।",
      },
      nota: "এই লিংক দিয়ে অ্যাকাউন্ট খুললে সাইটটি কমিশন পেতে পারে। এর জন্য আপনাকে বাড়তি কিছু দিতে হয় না।",
      nuevaPestana: "নতুন ট্যাবে খুলবে",
    },
  },
  // Tailandés (ADR 0002, D13): sin pronombre ni ครับ/ค่ะ, sin punto final.
  th: {
    base: {
      titulo: "กำลังจะย้ายไปต่างประเทศ หรือรับเงินจากต่างประเทศอยู่หรือไม่",
      etiqueta: "ลิงก์ที่ได้รับการสนับสนุน",
      socios: {
        wise: "บัญชีหลายสกุลเงินสำหรับรับและโอนเงินระหว่างประเทศ ด้วยอัตราแลกเปลี่ยนกลางของตลาดและค่าธรรมเนียมที่แจ้งไว้ชัดเจน",
        deel: "สัญญาจ้างและการรับเงินสำหรับผู้ที่ทำงานจากประเทศหนึ่งให้บริษัทในอีกประเทศหนึ่ง",
      },
      nota: "หากเปิดบัญชีผ่านลิงก์เหล่านี้ เว็บไซต์อาจได้รับค่าคอมมิชชัน ผู้สมัครไม่ต้องจ่ายเพิ่ม",
      nuevaPestana: "เปิดในแท็บใหม่",
    },
  },
  uk: {
    base: {
      titulo: "Переїзд за кордон або оплата з іншої країни?",
      etiqueta: "Партнерські посилання",
      socios: {
        wise: "Рахунок у кількох валютах, щоб отримувати й надсилати гроші між країнами за середнім ринковим курсом, з комісією, яку видно заздалегідь.",
        deel: "Договори та виплати для тих, хто працює з однієї країни на компанію з іншої.",
      },
      nota: "Якщо рахунок відкривають за цими посиланнями, сайт може отримати комісію. Той, хто реєструється, не платить через це більше.",
      nuevaPestana: "відкривається в новій вкладці",
    },
  },
  // Uzbeko (ADR 0002, D16): impersonal, como los demás, para que sirva sin el trato del mercado.
  uz: {
    base: {
      titulo: "Boshqa mamlakatga koʻchish yoki chet eldan maosh olish rejasi bormi?",
      etiqueta: "Homiylik havolalari",
      socios: {
        wise: "Bir nechta valyutadagi hisob: mamlakatlar oʻrtasida bozorning oʻrtacha kursi boʻyicha pul yuborish va qabul qilish, komissiya oldindan koʻrsatiladi.",
        deel: "Bir mamlakatda turib boshqa mamlakatdagi kompaniyaga ishlaydiganlar uchun shartnomalar va toʻlovlar.",
      },
      nota: "Shu havolalar orqali hisob ochilsa, sayt komissiya olishi mumkin. Roʻyxatdan oʻtgan kishi buning uchun ortiqcha toʻlamaydi.",
      nuevaPestana: "yangi varaqda ochiladi",
    },
  },
  ru: {
    base: {
      titulo: "Переезжаете за границу или получаете оплату из другой страны?",
      etiqueta: "Партнерские ссылки",
      socios: {
        wise: "Счет в нескольких валютах, чтобы получать и отправлять деньги между странами по среднему рыночному курсу, с комиссией, которую видно заранее.",
        deel: "Договоры и выплаты для тех, кто работает из одной страны на компанию из другой.",
      },
      nota: "Если счет открывают по этим ссылкам, сайт может получить комиссию. Тот, кто регистрируется, не платит из-за этого больше.",
      nuevaPestana: "откроется в новой вкладке",
    },
  },
  // Rumano (ADR 0002, D18): «dumneavoastră» implícito y 2.ª del plural.
  ro: {
    base: {
      titulo: "Vă mutați în altă țară sau primiți bani din străinătate?",
      etiqueta: "Linkuri de afiliere",
      socios: {
        wise: "Un cont în mai multe valute, ca să primiți și să trimiteți bani între țări la cursul mediu al pieței, cu un comision afișat dinainte.",
        deel: "Contracte și plăți pentru cei care lucrează dintr-o țară pentru o firmă din altă țară.",
      },
      nota: "Dacă deschideți un cont prin aceste linkuri, site-ul poate primi un comision. Cine se înregistrează nu plătește nimic în plus din cauza asta.",
      nuevaPestana: "se deschide într-o filă nouă",
    },
  },
  cs: {
    base: {
      titulo: "Stěhujete se do zahraničí nebo platíte z jiné země?",
      etiqueta: "Partnerské odkazy",
      socios: {
        wise: "Účet ve více měnách pro příjem a odesílání peněz mezi zeměmi za středový tržní kurz, s poplatkem, který vidíte předem.",
        deel: "Smlouvy a výplaty pro ty, kdo pracují z jedné země pro firmu z jiné.",
      },
      nota: "Pokud si přes tyto odkazy otevřete účet, web může dostat provizi. Vy kvůli tomu nezaplatíte nic navíc.",
      nuevaPestana: "otevře se v nové kartě",
    },
  },
  el: {
    base: {
      titulo: "Μετακομίζετε στο εξωτερικό ή πληρώνεστε από άλλη χώρα;",
      etiqueta: "Συνεργαζόμενοι σύνδεσμοι",
      socios: {
        wise: "Λογαριασμός σε πολλά νομίσματα για να λαμβάνετε και να στέλνετε χρήματα μεταξύ χωρών με τη μέση τιμή της αγοράς, με χρέωση που βλέπετε από πριν.",
        deel: "Συμβάσεις και πληρωμές για όσους εργάζονται από μια χώρα για εταιρεία άλλης χώρας.",
      },
      nota: "Αν ανοίξετε λογαριασμό μέσω αυτών των συνδέσμων, ο ιστότοπος μπορεί να λάβει προμήθεια. Εσείς δεν πληρώνετε τίποτα παραπάνω.",
      nuevaPestana: "ανοίγει σε νέα καρτέλα",
    },
  },
  // Húngaro (ADR 0002, D21): tegezés.
  hu: {
    base: {
      titulo: "Külföldre költözöl, vagy más országból fizetsz?",
      etiqueta: "Partnerlinkek",
      socios: {
        wise: "Többdevizás számla, amellyel középárfolyamon fogadhatsz és küldhetsz pénzt országok között, előre látható díjjal.",
        deel: "Szerződések és kifizetések azoknak, akik egy országból dolgoznak egy másik ország cégének.",
      },
      nota: "Ha ezeken a linkeken keresztül nyitsz számlát, az oldal jutalékot kaphat. Neked ez semmibe sem kerül.",
      nuevaPestana: "új lapon nyílik meg",
    },
  },
  mn: {
    base: {
      titulo: "Гадаадад нүүж байна уу, эсвэл өөр улсаас цалин авдаг уу?",
      etiqueta: "Түншийн холбоос",
      socios: {
        wise: "Олон валютын данс: улс хооронд мөнгөө дундаж ханшаар, урьдчилан мэдэгдсэн шимтгэлтэй авч, илгээнэ.",
        deel: "Нэг улсаас өөр улсын компанид ажилладаг хүмүүсийн гэрээ, төлбөр.",
      },
      nota: "Эдгээр холбоосоор данс нээвэл сайт шимтгэл авч магадгүй. Танд ямар ч зардал гарахгүй.",
      nuevaPestana: "шинэ табд нээгдэнэ",
    },
  },
  bg: {
    base: {
      titulo: "Местите се в чужбина или плащате от друга държава?",
      etiqueta: "Партньорски връзки",
      socios: {
        wise: "Многовалутна сметка, с която получавате и изпращате пари между държави по средния курс и с предварително известна такса.",
        deel: "Договори и плащания за хора, които работят от една държава за фирма в друга.",
      },
      nota: "Ако откриете сметка през тези връзки, сайтът може да получи комисиона. За Вас това не струва нищо.",
      nuevaPestana: "отваря се в нов раздел",
    },
  },
  // Armenio (ADR 0002, D30): «Դուք» de cortesía con mayúscula.
  hy: {
    base: {
      titulo: "Տեղափոխվո՞ւմ եք արտերկիր կամ վճարում այլ երկրից",
      etiqueta: "Գործընկերային հղումներ",
      socios: {
        wise: "Բազմարժութային հաշիվ, որով երկրների միջև գումար եք ստանում և ուղարկում միջին փոխարժեքով և նախապես հայտնի միջնորդավճարով։",
        deel: "Պայմանագրեր և վճարումներ նրանց համար, ովքեր մի երկրից աշխատում են մեկ այլ երկրի ընկերության համար։",
      },
      nota: "Եթե այս հղումներով հաշիվ բացեք, կայքը կարող է միջնորդավճար ստանալ։ Ձեզ համար դա անվճար է։",
      nuevaPestana: "բացվում է նոր ներդիրում",
    },
  },
  // Hebreo (ADR 0002, D22), impersonal como los demás.
  he: {
    base: {
      titulo: "עוברים לחו\"ל או מקבלים תשלום ממדינה אחרת?",
      etiqueta: "קישורים ממומנים",
      socios: {
        wise: "חשבון רב-מטבעי לשליחה ולקבלה של כסף בין מדינות לפי שער החליפין האמצעי בשוק, עם עמלה שמוצגת מראש.",
        deel: "חוזים ותשלומים למי שעובד ממדינה אחת עבור חברה במדינה אחרת.",
      },
      nota: "אם נפתח חשבון דרך הקישורים האלה, האתר עשוי לקבל עמלה. מי שנרשם לא משלם על כך יותר.",
      nuevaPestana: "נפתח בכרטיסייה חדשה",
    },
  },
  // Serbio en latinica y ekavski (ADR 0002, D23): «vi» en minúscula.
  sr: {
    base: {
      titulo: "Selite se u inostranstvo ili plaćate iz druge zemlje?",
      etiqueta: "Partnerski linkovi",
      socios: {
        wise: "Račun u više valuta za primanje i slanje novca između zemalja po srednjem tržišnom kursu, sa naknadom koju vidite unapred.",
        deel: "Ugovori i isplate za one koji iz jedne zemlje rade za firmu iz druge.",
      },
      nota: "Ako preko ovih linkova otvorite račun, sajt može da dobije proviziju. Vi zbog toga ne plaćate ništa više.",
      nuevaPestana: "otvara se u novoj kartici",
    },
  },
  // Eslovaco (ADR 0002, D25): vykanie con vy en minúscula.
  sk: {
    base: {
      titulo: "Sťahujete sa do zahraničia alebo platíte z inej krajiny?",
      etiqueta: "Partnerské odkazy",
      socios: {
        wise: "Účet vo viacerých menách na príjem a odosielanie peňazí medzi krajinami za stredový trhový kurz, s poplatkom, ktorý vidíte vopred.",
        deel: "Zmluvy a výplaty pre tých, ktorí pracujú z jednej krajiny pre firmu z inej.",
      },
      nota: "Ak si cez tieto odkazy otvoríte účet, web môže dostať províziu. Vy za to nezaplatíte nič navyše.",
      nuevaPestana: "otvorí sa na novej karte",
    },
  },
  // Georgiano: «თქვენ» con formas corteses.
  ka: {
    base: {
      titulo: "საზღვარგარეთ გადადიხართ, ან ანაზღაურებას სხვა ქვეყნიდან იღებთ?",
      etiqueta: "პარტნიორული ბმულები",
      socios: {
        wise: "მრავალვალუტიანი ანგარიში ქვეყნებს შორის ფულის მისაღებად და გასაგზავნად საშუალო საბაზრო კურსით, წინასწარ ცნობილი საკომისიოთი.",
        deel: "ხელშეკრულებები და ანაზღაურება მათთვის, ვინც ერთი ქვეყნიდან მუშაობს მეორე ქვეყნის კომპანიისთვის.",
      },
      nota: "თუ ამ ბმულებით გახსნით ანგარიშს, საიტმა შესაძლოა საკომისიო მიიღოს. თქვენთვის ეს დამატებით არაფერი ღირს.",
      nuevaPestana: "იხსნება ახალ ჩანართში",
    },
  },
  // Croata (ADR 0002, D27): «vi» en minúscula.
  hr: {
    base: {
      titulo: "Selite se u inozemstvo ili plaćate iz druge zemlje?",
      etiqueta: "Partnerske poveznice",
      socios: {
        wise: "Račun u više valuta za primanje i slanje novca između zemalja po srednjem tržišnom tečaju, uz naknadu koju vidite unaprijed.",
        deel: "Ugovori i isplate za one koji iz jedne zemlje rade za tvrtku iz druge.",
      },
      nota: "Ako preko ovih poveznica otvorite račun, stranica može dobiti proviziju. Vi zbog toga ne plaćate ništa više.",
      nuevaPestana: "otvara se u novoj kartici",
    },
  },
  // Albanés (ADR 0002, D31)
  sq: {
    base: {
      titulo: "Po shpërnguleni në një vend tjetër apo merrni para nga jashtë?",
      etiqueta: "Lidhje partnere",
      socios: {
        wise: "Një llogari në disa monedha, për të marrë dhe dërguar para mes vendeve me kursin mesatar të tregut, me një tarifë që shfaqet paraprakisht.",
        deel: "Kontrata dhe pagesa për ata që punojnë nga një vend për një kompani në një vend tjetër.",
      },
      nota: "Nëse hapni një llogari përmes këtyre lidhjeve, faqja mund të marrë një komision. Kush regjistrohet nuk paguan asgjë më shumë për këtë arsye.",
      nuevaPestana: "hapet në një skedë të re",
    },
  },
};

export function textosAfiliados(idioma: Idioma, locale?: string, trato: Trato = "tu"): TextosAfiliados {
  return resolver(DICCIONARIOS_AFILIADOS, idioma, trato, locale);
}
