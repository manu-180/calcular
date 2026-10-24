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
};

export function textosAfiliados(idioma: Idioma, locale?: string, trato: Trato = "tu"): TextosAfiliados {
  return resolver(DICCIONARIOS_AFILIADOS, idioma, trato, locale);
}
