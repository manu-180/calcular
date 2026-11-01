import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  return {
    h1: "Calculator medie ponderată",
    title: tituloQueEntre(`Calculator medie ponderată: ${ctx.nombrePais}`, "Calculator medie ponderată și aritmetică", "Calculator medie ponderată"),
    description: "Calculați media notelor, aritmetică sau ponderată, cu până la 10 valori și ponderea fiecăreia: procente, credite sau număr de apariții.",
    intro: [
      "Introduceți fiecare notă și cât contează. Vedeți media ponderată și, alături, media aritmetică simplă.",
      "Este util pentru notele de la școală sau de la facultate și pentru orice medie în care unele valori cântăresc mai mult decât altele.",
    ],
    comoSeCalcula: [
      "Media aritmetică = suma valorilor ÷ numărul de valori.",
      "Media ponderată = suma produselor (valoare × pondere) ÷ suma ponderilor.",
      "Ponderile nu trebuie să însumeze 100: rezultatul se împarte la totalul lor.",
    ],
    ejemplo: [
      `Cu un 7 care contează 20%, un 8 care contează 30% și un 9 care contează 50%, media ponderată este ${n(8.3)}.`,
      `Media aritmetică a celor trei note este ${n(8)}: nota 9 are o pondere mai mare și ridică media ponderată.`,
    ],
    faq: [
      {
        pregunta: "Cum se calculează media ponderată?",
        respuesta: "Înmulțiți fiecare valoare cu ponderea ei, adunați rezultatele și împărțiți suma la totalul ponderilor.",
      },
      {
        pregunta: "Ce se întâmplă dacă ponderile nu însumează 100%?",
        respuesta: "Nu este o problemă. Dacă o materie are 6 credite și alta 4, folosiți 6 și 4. Suma se împarte la totalul ponderilor.",
      },
      {
        pregunta: "Care este diferența dintre media aritmetică și media ponderată?",
        respuesta: "În media aritmetică toate valorile contează la fel. În media ponderată fiecare valoare contează după ponderea ei.",
      },
    ],
    glosario: [
      { termino: "Pondere", definicion: "Cât contează o valoare în media finală." },
      { termino: "Medie ponderată", definicion: "O medie în care fiecare valoare este înmulțită cu ponderea ei." },
    ],
  };
};
