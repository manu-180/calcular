import { formaCs } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Kalkulačka počtu dní mezi daty",
    title: tituloQueEntre(`Počet dní mezi daty: kalkulačka (${ctx.nombrePais})`, "Počet dní mezi daty: kalkulačka", "Počet dní mezi daty"),
    description: "Spočítejte, kolik dní je mezi dvěma daty: kalendářní dny, týdny, měsíce a pracovní dny od pondělí do pátku.",
    intro: [
      "Vyberte počáteční a koncové datum. Uvidíte počet kalendářních dní, stejné období v týdnech a měsících a také počet pracovních dní.",
      "Hodí se pro lhůty, termíny, dovolenou, těhotenství nebo odpočet do důležitého dne.",
    ],
    comoSeCalcula: [
      "Kalendářní dny zahrnují každý den mezi oběma daty. První den se počítá, poslední ne, pokud nezaškrtnete příslušnou volbu.",
      "Pracovní dny zahrnují pondělky, úterky, středy, čtvrtky a pátky ve stejném období. Státní svátky se neodečítají.",
      "Přestupné roky se počítají včetně 29. února.",
    ],
    ejemplo: [
      `Od ${f(desde)} do ${f(hasta)} ${formaCs(dias, "uplyne", "uplynou", "uplyne")} ${n(dias)} ${formaCs(dias, "kalendářní den", "kalendářní dny", "kalendářních dní")}.`,
      `Z toho ${n(habiles)} ${formaCs(habiles, "připadá", "připadají", "připadá")} na dny od pondělí do pátku.`,
    ],
    faq: [
      {
        pregunta: "Počítá se první, nebo poslední den?",
        respuesta: "Ve výchozím nastavení se počítá první den a poslední ne, stejně jako při odečtení dvou dat. Pokud potřebujete oba, zaškrtněte „Započítat i poslední den“.",
      },
      {
        pregunta: "Odečítají se státní svátky z pracovních dní?",
        respuesta: "Ne. Počítají se dny od pondělí do pátku. Svátky se liší podle země, regionu a roku, proto je odečtěte zvlášť.",
      },
      {
        pregunta: "Kolik dní má rok?",
        respuesta: "365, přestupný rok 366. Proto mezi stejnými daty v různých letech může vyjít jiný počet dní.",
      },
    ],
    glosario: [
      { termino: "Kalendářní dny", definicion: "Všechny dny v kalendáři včetně víkendů a svátků." },
      { termino: "Pracovní dny", definicion: "V této kalkulačce dny od pondělí do pátku." },
    ],
  };
};
