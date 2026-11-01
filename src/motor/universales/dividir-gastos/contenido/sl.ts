import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Izračun delitve stroškov",
    title: tituloQueEntre(`Delitev stroškov: izračun skupnih stroškov (${ctx.nombrePais})`, "Delitev stroškov: izračun skupnih stroškov", "Delitev stroškov"),
    description: "Razdelite skupne stroške med največ osem oseb: delež vsake osebe in kdo komu koliko nakaže, s čim manj nakazili.",
    intro: [
      "Uporabno za potovanje, večerjo, praznovanje ali skupno najemnino, ko je vsak plačal drugačen znesek.",
      "Vnesite, koliko je plačal vsak. Dobili boste delež vsake osebe in nakazila, po katerih nihče nikomur ničesar ne dolguje.",
    ],
    comoSeCalcula: [
      "Delež na osebo = skupni strošek ÷ število oseb.",
      "Kdor je plačal manj od svojega deleža, dolguje razliko. Kdor je plačal več, razliko dobi nazaj.",
      "Nakazila gredo od največjega dolga k največjemu preplačilu, zato nobeno nakazilo ni odveč.",
    ],
    ejemplo: [
      `Maja je plačala ${m(a)}, Luka ${m(b)}, Ana pa nič. Skupaj je to ${m(a + b)}, zato je delež vsake osebe ${m(cuota)}.`,
      `Ana nakaže Maji ${m(cuota)}, Luka pa Maji ${m(cuota - b)}.`,
    ],
    faq: [
      {
        pregunta: "Kako razdeliti račun, ko je vsak plačal drugačen znesek?",
        respuesta: "Seštejte vse zneske, vsoto delite s številom oseb in rezultat primerjajte s tem, kar je plačal vsak. Razlika pokaže, kdo koliko dolguje ali koliko mora dobiti.",
      },
      {
        pregunta: "Kaj če kdo ni plačal ničesar?",
        respuesta: "Za to osebo vnesite 0, da bo tudi ona sodelovala pri strošku. Če polje pustite prazno, se ta oseba ne šteje.",
      },
      {
        pregunta: "Zakaj je nakazil manj kot oseb?",
        respuesta: "Dolgovi se združijo: kdor dolguje največ, plača tistemu, ki je največ preplačal, in tako naprej. Nikoli ni treba več nakazil, kot je število oseb minus ena.",
      },
    ],
    glosario: [
      { termino: "Delež na osebo", definicion: "Koliko mora vsak plačati od skupnega stroška." },
      { termino: "Saldo", definicion: "Razlika med tem, kar je oseba plačala, in njenim deležem." },
    ],
  };
};
