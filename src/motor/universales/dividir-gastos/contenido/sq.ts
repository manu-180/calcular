import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator për ndarjen e shpenzimeve",
    title: tituloQueEntre(`Ndarje shpenzimesh: ${ctx.nombrePais}`, "Kalkulator për ndarjen e shpenzimeve"),
    description: "Ndani një shpenzim të përbashkët midis deri në 8 personave: pjesa e secilit dhe kush i paguan kujt, me sa më pak transferta.",
    intro: [
      "Ju ndihmon për një udhëtim, një darkë, një festë ose një qira të përbashkët, kur secili ka paguar një shumë tjetër.",
      "Vendosni sa ka paguar secili person. Merrni pjesën e secilit dhe pagesat me të cilat të gjithë dalin të barabartë.",
    ],
    comoSeCalcula: [
      "Pjesa e secilit = totali i shpenzuar ÷ numri i personave.",
      "Kush ka paguar më pak se pjesa e vet detyrohet për diferencën. Kush ka paguar më shumë e merr mbrapsht.",
      "Pagesat shkojnë nga borxhi më i madh te kredia më e madhe, që askush të mos bëjë transferta të tepërta.",
    ],
    ejemplo: [
      `Ana pagoi ${m(a)}, Besniku pagoi ${m(b)}, ndërsa Drita nuk pagoi asgjë. Totali është ${m(a + b)}, pra pjesa e secilit është ${m(cuota)}.`,
      `Drita i paguan Anës ${m(cuota)}, ndërsa Besniku i paguan Anës ${m(cuota - b)}.`,
    ],
    faq: [
      {
        pregunta: "Si ta ndaj një faturë kur secili ka paguar një shumë tjetër?",
        respuesta: "Mblidhni gjithçka, pjesëtojeni me numrin e personave dhe krahasojeni me atë që ka paguar secili. Diferenca është shuma që detyrohet ose që merr.",
      },
      {
        pregunta: "Çfarë të bëj nëse dikush nuk ka paguar asgjë?",
        respuesta: "Vendosni 0 për atë person, që të përfshihet në ndarje. Nëse e lini fushën bosh, personi nuk merret parasysh në llogaritje.",
      },
      {
        pregunta: "Pse ka më pak pagesa se persona?",
        respuesta: "Borxhet grupohen: kush detyrohet më shumë i paguan atij që ka paguar më shumë, e kështu me radhë. Nuk duhen kurrë më shumë pagesa se numri i personave minus një.",
      },
    ],
    glosario: [
      { termino: "Pjesa e secilit", definicion: "Sa duhet të paguajë secili person nga kostoja totale." },
      { termino: "Teprica", definicion: "Diferenca midis asaj që ka paguar dikush dhe pjesës që i takon." },
    ],
  };
};
