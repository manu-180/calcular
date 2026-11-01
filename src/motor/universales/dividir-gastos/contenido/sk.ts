import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulačka na rozdelenie výdavkov",
    title: tituloQueEntre(`Rozdelenie účtu: kalkulačka spoločných výdavkov (${ctx.nombrePais})`, "Rozdelenie účtu: kalkulačka spoločných výdavkov", "Rozdelenie účtu"),
    description: "Rozdeľte spoločné výdavky medzi najviac osem ľudí: podiel každého a kto komu koľko pošle, s čo najmenším počtom platieb.",
    intro: [
      "Hodí sa na výlet, večeru, oslavu alebo spoločný nájom, keď každý zaplatil inú sumu.",
      "Zadajte, koľko kto zaplatil. Uvidíte podiel každého a platby, po ktorých budú všetci vyrovnaní.",
    ],
    comoSeCalcula: [
      "Podiel = celkové výdavky ÷ počet osôb.",
      "Kto zaplatil menej, ako je jeho podiel, dlhuje rozdiel. Kto zaplatil viac, dostane rozdiel späť.",
      "Platby idú od najväčšieho dlhu k najväčšiemu preplatku, takže žiadna platba nie je navyše.",
    ],
    ejemplo: [
      `Jana zaplatila ${m(a)}, Peter ${m(b)} a Eva nič. Spolu je to ${m(a + b)}, takže podiel každého je ${m(cuota)}.`,
      `Eva pošle Jane ${m(cuota)} a Peter pošle Jane ${m(cuota - b)}.`,
    ],
    faq: [
      {
        pregunta: "Ako rozdeliť účet, keď každý zaplatil inú sumu?",
        respuesta: "Spočítajte všetky sumy, vydeľte ich počtom osôb a porovnajte s tým, čo kto zaplatil. Rozdiel ukáže, kto koľko dlhuje alebo koľko má dostať.",
      },
      {
        pregunta: "Čo ak niekto nič nezaplatil?",
        respuesta: "Zadajte pri ňom 0, aby sa na výdavkoch tiež podieľal. Ak pole necháte prázdne, s danou osobou sa nepočíta.",
      },
      {
        pregunta: "Prečo je platieb menej ako ľudí?",
        respuesta: "Dlhy sa spájajú: kto dlhuje najviac, platí tomu, kto najviac preplatil, a tak ďalej. Platieb nikdy netreba viac, ako je počet osôb mínus jedna.",
      },
    ],
    glosario: [
      { termino: "Podiel", definicion: "Koľko má každý zaplatiť z celkových výdavkov." },
      { termino: "Saldo", definicion: "Rozdiel medzi tým, čo človek zaplatil, a jeho podielom." },
    ],
  };
};
