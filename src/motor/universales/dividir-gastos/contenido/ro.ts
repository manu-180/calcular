import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Calculator pentru împărțirea cheltuielilor",
    title: tituloQueEntre(`Împărțirea cheltuielilor: ${ctx.nombrePais}`, "Calculator împărțire cheltuieli"),
    description: "Împărțiți o cheltuială comună între până la 8 persoane: partea fiecăruia și cine cui plătește, cu cât mai puține transferuri.",
    intro: [
      "Vă ajută pentru o excursie, o cină, o petrecere sau o chirie comună, când fiecare a plătit altă sumă.",
      "Introduceți cât a plătit fiecare persoană. Primiți partea fiecăruia și plățile prin care toată lumea ajunge chit.",
    ],
    comoSeCalcula: [
      "Partea fiecăruia = total cheltuit ÷ numărul de persoane.",
      "Cine a plătit mai puțin decât partea sa datorează diferența. Cine a plătit mai mult o primește înapoi.",
      "Plățile merg de la cea mai mare datorie spre cel mai mare credit, astfel încât nimeni să nu facă transferuri în plus.",
    ],
    ejemplo: [
      `Ana a plătit ${m(a)}, Bogdan a plătit ${m(b)}, iar Carmen nu a plătit nimic. Totalul este ${m(a + b)}, deci partea fiecăruia este ${m(cuota)}.`,
      `Carmen îi plătește Anei ${m(cuota)}, iar Bogdan îi plătește Anei ${m(cuota - b)}.`,
    ],
    faq: [
      {
        pregunta: "Cum împart o notă când fiecare a plătit altă sumă?",
        respuesta: "Adunați totul, împărțiți la numărul de persoane și comparați cu ce a plătit fiecare. Diferența este suma pe care o datorează sau pe care o primește.",
      },
      {
        pregunta: "Ce fac dacă cineva nu a plătit nimic?",
        respuesta: "Introduceți 0 pentru acea persoană, ca să fie inclusă în împărțire. Dacă lăsați câmpul gol, persoana nu este luată în calcul.",
      },
      {
        pregunta: "De ce sunt mai puține plăți decât persoane?",
        respuesta: "Datoriile se grupează: cine datorează cel mai mult îi plătește celui care a plătit cel mai mult și așa mai departe. Nu sunt necesare niciodată mai multe plăți decât numărul de persoane minus unu.",
      },
    ],
    glosario: [
      { termino: "Partea fiecăruia", definicion: "Cât ar trebui să plătească fiecare persoană din costul total." },
      { termino: "Sold", definicion: "Diferența dintre cât a plătit cineva și partea care îi revine." },
    ],
  };
};
