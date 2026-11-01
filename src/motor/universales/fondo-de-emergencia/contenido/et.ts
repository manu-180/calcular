import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  return {
    h1: "Hädaabifond: kui suurt puhvrit sul vaja on?",
    title: tituloQueEntre(
      `Hädaabifond: arvuta oma puhvri suurus | ${ctx.nombrePais}`,
      `Hädaabifond | ${ctx.nombrePais}`,
      "Hädaabifond",
    ),
    description: "Arvuta, kui suurt hädaabifondi sul hädavajalike kulude järgi vaja on ja mitu kuud selle säästmine võtab.",
    intro: [
      "Hädaabifond on kõrvale pandud raha asjade jaoks, mida ei saa ette planeerida: töökoha kaotus, haigestumine või kiire remont kodus.",
      "Kui fond on olemas, ei pea sa võtma väikelaenu just siis, kui on kõige raskem. Sisesta oma hädavajalikud kulud ja mitu kuud soovid hakkama saada.",
    ],
    comoSeCalcula: [
      "Soovitatav fond = hädavajalikud kulud kuus × kuude arv.",
      "Veel säästa = soovitatav fond − juba säästetud summa.",
      "Kuude arv, kuni fond on koos = veel säästa jäänud summa ÷ igakuine sääst, ümardatuna ülespoole.",
    ],
    ejemplo: [
      `Kui hädavajalikud kulud on kuus ${m(gastos)}, on 6 kuu fond ${m(gastos * 6)}.`,
      `Kui säästad kuus ${m(aporte)}, on fond koos ${Math.ceil((gastos * 6) / aporte)} kuu jooksul.`,
    ],
    faq: [
      {
        pregunta: "Mitme kuu kulud peaks fond katma?",
        respuesta:
          "Levinud rusikareegel on vähemalt 3 kuu hädavajalikud kulud, parem 6 kuu oma. Kui sissetulek kõigub, oled ettevõtja või leibkonnas on ainult üks sissetulek, on turvalisem 6 või isegi 12 kuu fond.",
      },
      {
        pregunta: "Kus fondi tasub hoida?",
        respuesta: "Turvalisel kontol, kust saad raha kätte samal päeval, eraldi arvelduskontost. Fondi ei investeerita aktsiatesse. See peab alles olema siis, kui seda vajad.",
      },
      {
        pregunta: "Kas tasub esmalt fond koguda või laenud tagasi maksta?",
        respuesta: "Levinud järjekord on säästa kõigepealt ühe kuu kulud, seejärel maksta tagasi kallid laenud, näiteks krediitkaardi võlg, ja alles pärast seda koguda fond täis.",
      },
    ],
    glosario: [
      { termino: "Hädavajalikud kulud", definicion: "Arved, mis tuleb tasuda ka siis, kui sissetulek lõpeb: eluase, toit, elekter ja tervis." },
      { termino: "Likviidsus", definicion: "Kui kiiresti saab raha kätte, kaotamata selle väärtust." },
    ],
  };
};
