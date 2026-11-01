import { formaSk } from "../../../i18n/plural";
import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionSk } from "../../dias-entre-fechas/textos/sk";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Výpočet veku",
    title: tituloQueEntre(`Výpočet veku podľa dátumu narodenia (${ctx.nombrePais})`, "Výpočet veku podľa dátumu narodenia", "Výpočet veku"),
    description: "Vypočítajte si presný vek v rokoch, mesiacoch a dňoch, koľko dní ste už prežili a koľko zostáva do najbližších narodenín.",
    intro: [
      "Zadajte dátum narodenia a uvidíte svoj presný vek k dnešku, a tiež v mesiacoch, týždňoch a dňoch.",
      "Zmeňte druhý dátum, ak chcete zistiť, koľko rokov mal niekto k určitému dňu alebo koľko rokov oslávi.",
    ],
    comoSeCalcula: [
      "Kalkulačka počíta celé mesiace od narodenia do zvoleného dátumu. Každých 12 mesiacov tvorí jeden rok.",
      "Dni, ktoré zostanú po poslednom celom mesiaci, sú dni veku.",
      "Prestupné roky sa počítajú s 366 dňami.",
    ],
    ejemplo: [
      `Človek narodený ${fechaLarga(ctx.locale, nac)} mal ku dňu ${fechaLarga(ctx.locale, ref)} presne ${duracionSk(Math.floor(meses / 12), meses % 12, dias)}.`,
      `To je ${formatearNumero(ctx, total)} ${formaSk(total, "deň", "dni", "dní")}.`,
    ],
    faq: [
      {
        pregunta: "Ako sa počíta presný vek?",
        respuesta: "Najprv sa počítajú celé roky, potom celé mesiace od posledných narodenín a nakoniec dni, ktoré zostávajú.",
      },
      {
        pregunta: "Ako je to s ľuďmi narodenými 29. februára?",
        respuesta: "V neprestupných rokoch táto kalkulačka berie ako deň narodenín 28. február. Niektoré predpisy namiesto toho používajú 1. marec.",
      },
      {
        pregunta: "Koľko dní už mám za sebou?",
        respuesta: "Pozrite sa na riadok „V dňoch“. Počíta každý deň od narodenia do zvoleného dátumu, bez posledného dňa.",
      },
    ],
    glosario: [
      { termino: "Vek", definicion: "Počet celých rokov od narodenia." },
      { termino: "Prestupný rok", definicion: "Rok s 366 dňami, v ktorom je 29. február. Prichádza raz za štyri roky, okrem niektorých rokov na prelome storočia." },
    ],
  };
};
