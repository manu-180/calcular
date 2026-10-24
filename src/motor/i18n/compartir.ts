import type { Idioma, Trato } from "../tipos";
import { resolver, type Diccionarios } from "./resolver";

// Textos de «Compartir» y de la línea que lleva a «Tu sueldo en el mundo». Viajan en el JS de la
// calculadora solo cuando hay un resultado en pantalla, y el menú entero se baja recién al tocar
// Compartir. El mensaje que se comparte no habla de «vos» ni de «usted»: sale de la boca de quien lo
// manda a sus amigos, y sin segunda persona sirve igual en un mercado de trato formal.
export interface TextosCompartir {
  boton: string;
  botonAria: string;
  menuTitulo: string;
  copiar: string;
  copiado: string;
  compartido: string;
  errorCorto: string;
  errorAyuda: string;
  nuevaPestana: string;
  mensaje: (nombre: string) => string;
  puenteIntro: string;
  puenteEnlace: (paises: number) => string;
}

const ZH_HANS_COMPARTIR: TextosCompartir = {
  boton: "分享",
  botonAria: "分享这个计算工具",
  menuTitulo: "分享到",
  copiar: "复制链接",
  copiado: "已复制链接",
  compartido: "已分享",
  errorCorto: "无法复制",
  errorAyuda: "无法复制链接，请从浏览器地址栏复制。",
  nuevaPestana: "将在新标签页打开",
  mensaje: (nombre) => `${nombre}。免费使用，一分钟就能算出来。`,
  puenteIntro: "其他国家呢？",
  puenteEnlace: (n) => `看看在 ${n} 个以上国家，您的税后工资是多少`,
};

export const DICCIONARIOS_COMPARTIR: Diccionarios<TextosCompartir> = {
  es: {
    base: {
      boton: "Compartir",
      botonAria: "Compartir esta calculadora",
      menuTitulo: "Compartir en",
      copiar: "Copiar link",
      copiado: "Link copiado",
      compartido: "Compartido",
      errorCorto: "No se pudo copiar",
      errorAyuda: "No se pudo copiar el link. Cópialo desde la barra del navegador.",
      nuevaPestana: "se abre en una pestaña nueva",
      mensaje: (nombre) => `${nombre}. Es gratis y la cuenta se hace en un minuto.`,
      puenteIntro: "¿Y en otros países?",
      puenteEnlace: (n) => `Mira cuánto cobrarías neto en más de ${n} países`,
    },
    vos: {
      errorAyuda: "No se pudo copiar el link. Copialo desde la barra del navegador.",
      puenteEnlace: (n) => `Mirá cuánto te quedaría en mano en más de ${n} países`,
    },
    usted: {
      errorAyuda: "No se pudo copiar el link. Cópielo desde la barra del navegador.",
      puenteEnlace: (n) => `Vea cuánto cobraría neto en más de ${n} países`,
    },
  },
  pt: {
    base: {
      boton: "Compartilhar",
      botonAria: "Compartilhar esta calculadora",
      menuTitulo: "Compartilhar em",
      copiar: "Copiar link",
      copiado: "Link copiado",
      compartido: "Compartilhado",
      errorCorto: "Não foi possível copiar",
      errorAyuda: "Não foi possível copiar o link. Copie pela barra do navegador.",
      nuevaPestana: "abre em uma nova aba",
      mensaje: (nombre) => `${nombre}. É grátis e a conta sai em um minuto.`,
      puenteIntro: "E em outros países?",
      puenteEnlace: (n) => `Veja quanto você receberia líquido em mais de ${n} países`,
    },
    usted: {
      puenteEnlace: (n) => `Veja quanto receberia líquido em mais de ${n} países`,
    },
  },
  en: {
    base: {
      boton: "Share",
      botonAria: "Share this calculator",
      menuTitulo: "Share on",
      copiar: "Copy link",
      copiado: "Link copied",
      compartido: "Shared",
      errorCorto: "Couldn't copy",
      errorAyuda: "Couldn't copy the link. Copy it from the browser's address bar.",
      nuevaPestana: "opens in a new tab",
      mensaje: (nombre) => `${nombre}. It's free, and the math takes a minute.`,
      puenteIntro: "And in other countries?",
      puenteEnlace: (n) => `See what you'd take home in more than ${n} countries`,
    },
  },
  fr: {
    base: {
      boton: "Partager",
      botonAria: "Partager ce calculateur",
      menuTitulo: "Partager sur",
      copiar: "Copier le lien",
      copiado: "Lien copié",
      compartido: "Partagé",
      errorCorto: "Copie impossible",
      errorAyuda: "Impossible de copier le lien. Copie-le depuis la barre d'adresse.",
      nuevaPestana: "s'ouvre dans un nouvel onglet",
      mensaje: (nombre) => `${nombre}. C'est gratuit et le calcul prend une minute.`,
      puenteIntro: "Et dans d'autres pays ?",
      puenteEnlace: (n) => `Vois combien tu toucherais net dans plus de ${n} pays`,
    },
    usted: {
      errorAyuda: "Impossible de copier le lien. Copiez-le depuis la barre d'adresse.",
      puenteEnlace: (n) => `Voyez combien vous toucheriez net dans plus de ${n} pays`,
    },
  },
  de: {
    base: {
      boton: "Teilen",
      botonAria: "Diesen Rechner teilen",
      menuTitulo: "Teilen über",
      copiar: "Link kopieren",
      copiado: "Link kopiert",
      compartido: "Geteilt",
      errorCorto: "Kopieren nicht möglich",
      errorAyuda: "Der Link ließ sich nicht kopieren. Kopier ihn aus der Adressleiste.",
      nuevaPestana: "öffnet in einem neuen Tab",
      mensaje: (nombre) => `${nombre}. Kostenlos, und die Rechnung ist in einer Minute erledigt.`,
      puenteIntro: "Und in anderen Ländern?",
      puenteEnlace: (n) => `Sieh nach, wie viel dir netto in mehr als ${n} Ländern bliebe`,
    },
    usted: {
      errorAyuda: "Der Link ließ sich nicht kopieren. Kopieren Sie ihn aus der Adressleiste.",
      puenteEnlace: (n) => `Sehen Sie nach, wie viel Ihnen netto in mehr als ${n} Ländern bliebe`,
    },
  },
  it: {
    base: {
      boton: "Condividi",
      botonAria: "Condividi questo calcolatore",
      menuTitulo: "Condividi su",
      copiar: "Copia il link",
      copiado: "Link copiato",
      compartido: "Condiviso",
      errorCorto: "Copia non riuscita",
      errorAyuda: "Non siamo riusciti a copiare il link. Copialo dalla barra degli indirizzi.",
      nuevaPestana: "si apre in una nuova scheda",
      mensaje: (nombre) => `${nombre}. È gratis e il calcolo richiede un minuto.`,
      puenteIntro: "E negli altri paesi?",
      puenteEnlace: (n) => `Scopri quanto ti resterebbe netto in più di ${n} paesi`,
    },
    usted: {
      errorAyuda: "Non siamo riusciti a copiare il link. Lo copi dalla barra degli indirizzi.",
      puenteEnlace: (n) => `Scopra quanto Le resterebbe netto in più di ${n} paesi`,
    },
  },
  nl: {
    base: {
      boton: "Delen",
      botonAria: "Deze rekenhulp delen",
      menuTitulo: "Delen via",
      copiar: "Link kopiëren",
      copiado: "Link gekopieerd",
      compartido: "Gedeeld",
      errorCorto: "Kopiëren mislukt",
      errorAyuda: "Het kopiëren van de link is mislukt. Kopieer hem uit de adresbalk.",
      nuevaPestana: "opent in een nieuw tabblad",
      mensaje: (nombre) => `${nombre}. Gratis, en de berekening is zo gedaan.`,
      puenteIntro: "En in andere landen?",
      puenteEnlace: (n) => `Bekijk hoeveel je netto overhoudt in meer dan ${n} landen`,
    },
    usted: {
      puenteEnlace: (n) => `Bekijk hoeveel u netto overhoudt in meer dan ${n} landen`,
    },
  },
  ja: {
    base: {
      boton: "共有する",
      botonAria: "この計算ツールを共有する",
      menuTitulo: "共有先",
      copiar: "リンクをコピー",
      copiado: "コピーしました",
      compartido: "共有しました",
      errorCorto: "コピーできませんでした",
      errorAyuda: "リンクをコピーできませんでした。アドレスバーからコピーしてください。",
      nuevaPestana: "新しいタブで開きます",
      mensaje: (nombre) => `${nombre}。無料で、1分ほどで計算できます。`,
      puenteIntro: "ほかの国ではどうでしょう？",
      puenteEnlace: (n) => `${n}か国以上での手取り額を見てみる`,
    },
  },
  ko: {
    base: {
      boton: "공유하기",
      botonAria: "이 계산기 공유하기",
      menuTitulo: "공유할 곳",
      copiar: "링크 복사",
      copiado: "링크를 복사했어요",
      compartido: "공유했어요",
      errorCorto: "복사하지 못했어요",
      errorAyuda: "링크를 복사하지 못했어요. 주소창에서 직접 복사해 주세요.",
      nuevaPestana: "새 탭에서 열려요",
      mensaje: (nombre) => `${nombre}. 무료이고, 1분이면 계산돼요.`,
      puenteIntro: "다른 나라에서는 어떨까요?",
      puenteEnlace: (n) => `${n}개국 이상에서 실수령액이 얼마인지 확인해 보세요`,
    },
  },
  zh: {
    base: {
      boton: "分享",
      botonAria: "分享這個計算工具",
      menuTitulo: "分享到",
      copiar: "複製連結",
      copiado: "已複製連結",
      compartido: "已分享",
      errorCorto: "無法複製",
      errorAyuda: "無法複製連結，請從瀏覽器網址列複製。",
      nuevaPestana: "會在新分頁開啟",
      mensaje: (nombre) => `${nombre}。免費使用，一分鐘就能算出來。`,
      puenteIntro: "其他國家呢？",
      puenteEnlace: (n) => `看看在 ${n} 個以上國家，您的實領薪資是多少`,
    },
    regional: {
      "zh-CN": ZH_HANS_COMPARTIR,
      "zh-SG": ZH_HANS_COMPARTIR,
    },
  },
  pl: {
    base: {
      boton: "Udostępnij",
      botonAria: "Udostępnij ten kalkulator",
      menuTitulo: "Udostępnij przez",
      copiar: "Kopiuj link",
      copiado: "Link skopiowany",
      compartido: "Udostępniono",
      errorCorto: "Nie udało się skopiować",
      errorAyuda: "Nie udało się skopiować linku. Skopiuj go z paska adresu.",
      nuevaPestana: "otwiera się w nowej karcie",
      mensaje: (nombre) => `${nombre}. Za darmo, a obliczenie zajmuje chwilę.`,
      puenteIntro: "A w innych krajach?",
      puenteEnlace: (n) => `Zobacz, ile zostaje netto w ponad ${n} krajach`,
    },
  },
  sv: {
    base: {
      boton: "Dela",
      botonAria: "Dela den här kalkylatorn",
      menuTitulo: "Dela via",
      copiar: "Kopiera länk",
      copiado: "Länken är kopierad",
      compartido: "Delat",
      errorCorto: "Det gick inte att kopiera",
      errorAyuda: "Det gick inte att kopiera länken. Kopiera den från adressfältet.",
      nuevaPestana: "öppnas i en ny flik",
      mensaje: (nombre) => `${nombre}. Gratis, och beräkningen tar en minut.`,
      puenteIntro: "Och i andra länder?",
      puenteEnlace: (n) => `Se hur mycket du får ut netto i fler än ${n} länder`,
    },
  },
  da: {
    base: {
      boton: "Del",
      botonAria: "Del denne beregner",
      menuTitulo: "Del via",
      copiar: "Kopiér link",
      copiado: "Linket er kopieret",
      compartido: "Delt",
      errorCorto: "Kunne ikke kopiere",
      errorAyuda: "Linket kunne ikke kopieres. Kopiér det fra adresselinjen.",
      nuevaPestana: "åbner i en ny fane",
      mensaje: (nombre) => `${nombre}. Gratis, og beregningen tager et minut.`,
      puenteIntro: "Og i andre lande?",
      puenteEnlace: (n) => `Se, hvad du får udbetalt i mere end ${n} lande`,
    },
  },
  nb: {
    base: {
      boton: "Del",
      botonAria: "Del denne kalkulatoren",
      menuTitulo: "Del via",
      copiar: "Kopier lenke",
      copiado: "Lenken er kopiert",
      compartido: "Delt",
      errorCorto: "Kunne ikke kopiere",
      errorAyuda: "Lenken kunne ikke kopieres. Kopier den fra adressefeltet.",
      nuevaPestana: "åpnes i en ny fane",
      mensaje: (nombre) => `${nombre}. Gratis, og beregningen tar et minutt.`,
      puenteIntro: "Og i andre land?",
      puenteEnlace: (n) => `Se hva du får utbetalt i mer enn ${n} land`,
    },
  },
  fi: {
    base: {
      boton: "Jaa",
      botonAria: "Jaa tämä laskuri",
      menuTitulo: "Jaa palvelussa",
      copiar: "Kopioi linkki",
      copiado: "Linkki kopioitu",
      compartido: "Jaettu",
      errorCorto: "Kopiointi ei onnistunut",
      errorAyuda: "Linkin kopiointi ei onnistunut. Kopioi se selaimen osoiteriviltä.",
      nuevaPestana: "avautuu uuteen välilehteen",
      mensaje: (nombre) => `${nombre}. Maksuton, ja laskelma on valmis minuutissa.`,
      puenteIntro: "Entä muissa maissa?",
      puenteEnlace: (n) => `Katso, paljonko käteen jää yli ${n} maassa`,
    },
  },
};

export function textosCompartir(idioma: Idioma, trato: Trato, locale?: string): TextosCompartir {
  return resolver(DICCIONARIOS_COMPARTIR, idioma, trato, locale);
}
