import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Adăugați zile la o dată",
    title: tituloQueEntre(`Adăugați zile la o dată: ${ctx.nombrePais}`, "Calculator adăugare zile la o dată", "Adăugați zile la o dată"),
    description: "Adăugați sau scădeți zile calendaristice sau lucrătoare dintr-o dată și vedeți în ce zi cade. Util pentru termene și scadențe.",
    intro: [
      "Alegeți o dată, un număr de zile și dacă vreți să le adăugați sau să le scădeți. Vedeți data rezultată și ziua săptămânii.",
      "Cu zile lucrătoare, calculatorul sare peste sâmbete și duminici.",
    ],
    comoSeCalcula: [
      "Cu zile calendaristice, data avansează câte o zi în calendar pentru fiecare zi introdusă.",
      "Cu zile lucrătoare, se numără doar zilele de luni până vineri. Data de început nu se numără.",
      "Sărbătorile legale nu se scad, pentru că diferă de la o țară la alta și de la o regiune la alta.",
    ],
    ejemplo: [`${f(inicio)} plus 90 de zile calendaristice înseamnă ${f(mas90)}.`, `${f(inicio)} plus 15 zile lucrătoare înseamnă ${f(aFecha(habil))}.`],
    faq: [
      {
        pregunta: "Data de început se numără ca prima zi?",
        respuesta: "Nu. Dacă adăugați o zi la o zi de luni, ajungeți marți. Așa se calculează majoritatea termenelor.",
      },
      {
        pregunta: "Ce se întâmplă dacă adaug zile lucrătoare de la o zi de sâmbătă?",
        respuesta: "Prima zi lucrătoare este lunea următoare. O zi lucrătoare adăugată la o sâmbătă dă ziua de luni.",
      },
      {
        pregunta: "Ține cont de anii bisecți?",
        respuesta: "Da. Dacă intervalul trece prin 29 februarie, acea zi se numără în plus.",
      },
    ],
    glosario: [
      { termino: "Zile calendaristice", definicion: "Toate zilele din calendar, fără excepție." },
      { termino: "Zile lucrătoare", definicion: "În acest calculator, zilele de luni până vineri." },
    ],
  };
};
