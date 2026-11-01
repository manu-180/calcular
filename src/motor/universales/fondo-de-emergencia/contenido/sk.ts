import { GRAMATICA } from "../../../i18n/gramatica";
import { formaSk } from "../../../i18n/plural";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  const meses = Math.ceil((gastos * 6) / aporte);
  return {
    h1: "Kalkulačka finančnej rezervy",
    title: tituloQueEntre(
      `Finančná rezerva: kalkulačka ${GRAMATICA.sk.para(ctx.nombrePais)}`,
      "Finančná rezerva: kalkulačka",
      "Kalkulačka finančnej rezervy",
    ),
    description: "Vypočítajte, akú veľkú finančnú rezervu potrebujete podľa svojich nevyhnutných výdavkov a za koľko mesiacov ju nasporíte.",
    intro: [
      "Finančná rezerva je peňažný vankúš na to, čo sa nedá naplánovať: stratu práce, zdravotné problémy alebo nečakanú opravu doma.",
      "Vďaka nej si nemusíte požičiavať ani žiť na kreditnú kartu práve vtedy, keď je to najťažšie. Zadajte nevyhnutné výdavky a počet mesiacov, ktoré chcete pokryť.",
    ],
    comoSeCalcula: [
      "Odporúčaná rezerva = nevyhnutné mesačné výdavky × počet mesiacov.",
      "Zostáva nasporiť = odporúčaná rezerva − to, čo už máte.",
      "Mesiacov do cieľovej sumy = zostáva nasporiť ÷ suma, ktorú si mesačne odkladáte, zaokrúhlené nahor.",
    ],
    ejemplo: [
      `Ak sú vaše nevyhnutné výdavky ${m(gastos)} mesačne, rezerva na 6 mesiacov je ${m(gastos * 6)}.`,
      `Keď si budete každý mesiac odkladať ${m(aporte)}, nasporíte ju za ${meses} ${formaSk(meses, "mesiac", "mesiace", "mesiacov")}.`,
    ],
    faq: [
      {
        pregunta: "Na koľko mesiacov by mala finančná rezerva stačiť?",
        respuesta:
          "Zvyčajne sa odporúča mať nevyhnutné výdavky na 3 až 6 mesiacov. Ak máte nepravidelný príjem, pracujete na vlastný účet alebo má domácnosť iba jeden príjem, počítajte skôr so 6 až 12 mesiacmi.",
      },
      {
        pregunta: "Kde finančnú rezervu držať?",
        respuesta: "Na bezpečnom mieste, odkiaľ peniaze dostanete ešte v ten istý deň, oddelene od karty na bežné výdavky. Nie sú to peniaze na riskantné investície: majú byť poruke, keď ich budete potrebovať.",
      },
      {
        pregunta: "Čo skôr: rezerva, alebo splatenie dlhov?",
        respuesta: "Častý postup je najprv si odložiť výdavky na jeden mesiac, potom splatiť drahé dlhy, napríklad kreditnú kartu, a nakoniec rezervu doplniť na celú sumu.",
      },
    ],
    glosario: [
      { termino: "Nevyhnutné výdavky", definicion: "Platby, ktoré musíte platiť, aj keď príjem prestane: bývanie, jedlo, energie, zdravie." },
      { termino: "Likvidita", definicion: "Ako rýchlo môžete peniaze použiť bez toho, aby stratili hodnotu." },
    ],
  };
};
