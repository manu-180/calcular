import { pluralRo } from "../../../i18n/plural";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  const luni = Math.ceil((gastos * 6) / aporte);
  return {
    h1: "Calculator fond de urgență",
    title: tituloQueEntre(`Calculator fond de urgență: ${ctx.nombrePais}`, "Calculator fond de urgență"),
    description: "Aflați cât de mare ar trebui să fie fondul de urgență după cheltuielile esențiale și în câte luni îl strângeți cu ce puteți economisi.",
    intro: [
      "Fondul de urgență înseamnă bani puși deoparte pentru ce nu se poate planifica: pierderea locului de muncă, o problemă de sănătate sau o reparație urgentă în casă.",
      "Cu un astfel de fond nu trebuie să apelați la cardul de credit tocmai când e mai greu. Introduceți cheltuielile esențiale și câte luni vreți să acoperiți.",
    ],
    comoSeCalcula: [
      "Fondul recomandat = cheltuieli esențiale pe lună × luni de acoperit.",
      "Mai aveți de economisit = fondul recomandat − ce aveți deja.",
      "Luni până îl completați = suma rămasă ÷ cât economisiți pe lună, rotunjit în sus.",
    ],
    ejemplo: [
      `Cu cheltuieli esențiale de ${m(gastos)} pe lună, un fond pentru 6 luni înseamnă ${m(gastos * 6)}.`,
      `Dacă economisiți ${m(aporte)} pe lună, îl completați în ${pluralRo(luni, "lună", "luni")}.`,
    ],
    faq: [
      {
        pregunta: "Câte luni ar trebui să acopere fondul de urgență?",
        respuesta:
          "Recomandarea obișnuită este între 3 și 6 luni de cheltuieli esențiale. Dacă venitul variază, lucrați pe cont propriu sau în gospodărie există un singur venit, țintiți spre 6 până la 12 luni.",
      },
      {
        pregunta: "Unde țin fondul de urgență?",
        respuesta: "Într-un loc sigur, din care puteți scoate banii în aceeași zi, separat de contul de cheltuieli curente. Nu este pentru investiții riscante: rolul lui este să fie acolo când aveți nevoie.",
      },
      {
        pregunta: "Strâng mai întâi fondul sau plătesc datoriile?",
        respuesta: "O variantă des folosită: economisiți mai întâi cheltuielile pe o lună, apoi achitați datoriile scumpe, cum sunt cele de pe cardul de credit, și abia apoi completați fondul.",
      },
    ],
    glosario: [
      { termino: "Cheltuieli esențiale", definicion: "Facturile pe care trebuie să le plătiți chiar dacă venitul se oprește: locuința, mâncarea, utilitățile, sănătatea." },
      { termino: "Lichiditate", definicion: "Cât de repede pot fi folosiți banii fără să-și piardă valoarea." },
    ],
  };
};
