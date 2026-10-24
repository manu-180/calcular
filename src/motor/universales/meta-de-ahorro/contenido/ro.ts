import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "Calculator economii",
    title: tituloQueEntre(`Calculator economii: ${ctx.nombrePais}`, "Calculator economii: cât să puneți deoparte lunar", "Calculator economii"),
    description: "Aflați cât trebuie să economisiți în fiecare lună ca să strângeți suma dorită până la termen, ținând cont de ce aveți și de dobândă.",
    intro: [
      "O călătorie, o mașină, avansul pentru o locuință sau o rezervă pentru neprevăzut. Un obiectiv cu sumă și dată se atinge mult mai ușor.",
      "Introduceți suma pe care doriți să o strângeți și în câte luni. Vă spunem cât să puneți deoparte în fiecare lună și în fiecare săptămână.",
    ],
    comoSeCalcula: [
      "Mai întâi se calculează cât vor crește economiile actuale până la sfârșitul perioadei.",
      "Ce mai lipsește se împarte în depuneri lunare egale.",
      "Dacă economiile aduc dobândă, aduce și fiecare depunere, așa că este nevoie de puțin mai puțin.",
    ],
    ejemplo: [
      `Ca să strângeți ${m(meta)} în 24 de luni, fără dobândă, aveți nevoie de ${m(meta / 24)} pe lună.`,
      `Cu ${m(actual)} deja economisiți și un randament de 5% pe an, ajung ${m(aporteNecesario(meta, actual, 24, 5))} pe lună.`,
    ],
    faq: [
      {
        pregunta: "Cum vă puteți ține de obiectivul de economisire?",
        respuesta: "Mutați banii imediat după ce primiți salariul, înainte de orice altă cheltuială. Dacă se poate, setați un transfer automat într-un cont separat.",
      },
      {
        pregunta: "Ce faceți dacă suma lunară este prea mare?",
        respuesta: "Vă dați mai mult timp sau micșorați obiectivul. Puteți începe și cu cât vă permiteți acum, iar suma o creșteți când vă cresc veniturile.",
      },
      {
        pregunta: "Trebuie luată în calcul inflația?",
        respuesta: "Dacă obiectivul este peste câțiva ani, adăugați la sumă inflația estimată. Ce costă 100 azi poate costa vizibil mai mult atunci.",
      },
    ],
    glosario: [
      { termino: "Depunere", definicion: "Banii pe care îi puneți deoparte în fiecare lună pentru obiectiv." },
      { termino: "Randament", definicion: "Ce aduc economiile într-un cont sau într-o investiție." },
    ],
  };
};
