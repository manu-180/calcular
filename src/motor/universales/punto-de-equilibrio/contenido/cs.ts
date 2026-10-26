import { GRAMATICA } from "../../../i18n/gramatica";
import { formaCs } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const kusy = (n: number) => `${formatearNumero(ctx, n)} ${formaCs(n, "kus", "kusy", "kusů")}`;
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Kalkulačka bodu zvratu",
    title: tituloQueEntre(`Bod zvratu: kalkulačka ${GRAMATICA.cs.para(ctx.nombrePais)}`, "Bod zvratu: výpočet online", "Kalkulačka bodu zvratu"),
    description: "Zjistěte, kolik kusů musíte prodat a jaké tržby potřebujete každý měsíc, abyste pokryli náklady a dosáhli cílového zisku.",
    intro: [
      "Bod zvratu je objem prodeje, při kterém firma ani nevydělává, ani neprodělává. Pod ním jste ve ztrátě, nad ním začínáte vydělávat.",
      "Zadejte fixní náklady, cenu a náklady na jeden kus. Ukážeme vám, kolik prodat, abyste pokryli náklady a splnili svůj cíl.",
    ],
    comoSeCalcula: [
      "Příspěvek na úhradu = cena − variabilní náklady na kus.",
      "Bod zvratu v kusech = fixní náklady ÷ příspěvek na úhradu, zaokrouhleno nahoru.",
      "Bod zvratu v tržbách = fixní náklady ÷ (příspěvek na úhradu ÷ cena).",
      "Pro cílový zisk ho přičtěte k fixním nákladům a počítejte stejně.",
    ],
    ejemplo: [
      `Při fixních nákladech ${m(fijos)}, ceně ${m(precio)} a variabilních nákladech ${m(variable)} vám každý prodej nechá ${m(precio - variable)}.`,
      `Abyste pokryli náklady, musíte prodat ${kusy(base.unidades)} (tržby ${m(base.facturacion)}), a pro zisk ${m(objetivo)} měsíčně ${kusy(meta.unidades)}.`,
    ],
    faq: [
      {
        pregunta: "Co jsou fixní a variabilní náklady?",
        respuesta:
          "Fixní náklady zůstávají stejné, i když nic neprodáte: nájem, pevné mzdy, energie. Variabilní náklady rostou s každým prodejem: zboží, materiál, provize, doprava.",
      },
      {
        pregunta: "Jak bod zvratu snížit?",
        respuesta: "Máte tři páky: zvýšit cenu, snížit variabilní náklady na kus, nebo seškrtat fixní náklady. Nejvíc obvykle udělá cena.",
      },
      {
        pregunta: "Funguje to i pro služby?",
        respuesta: "Ano. Kusem může být hodina, konzultace nebo klient za měsíc. Jako variabilní náklad zadejte, kolik vás stojí každý z nich.",
      },
    ],
    glosario: [
      { termino: "Bod zvratu", definicion: "Objem prodeje, při kterém se tržby rovnají nákladům." },
      { termino: "Příspěvek na úhradu", definicion: "Kolik každý prodej nechá na úhradu fixních nákladů." },
    ],
  };
};
