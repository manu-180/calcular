import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  return {
    h1: "Calculator economii pentru pensie",
    title: tituloQueEntre(`Calculator economii pentru pensie: ${ctx.nombrePais}`, "Calculator economii pentru pensie", "Economii pentru pensie"),
    description: "Aflați cât puteți strânge pentru pensie cu o contribuție lunară și ce venit lunar v-ar aduce aceste economii, în banii de azi.",
    intro: [
      "Pensia de stat de multe ori nu ajunge pentru a păstra nivelul de trai. Economiile proprii, chiar mici, fac o diferență mare dacă începeți devreme.",
      "Introduceți vârsta, vârsta la care vreți să ieșiți la pensie, ce aveți deja și cât puteți pune deoparte lunar. Vedeți economiile la pensionare și cât ați putea retrage din ele în fiecare lună.",
    ],
    comoSeCalcula: [
      "Economiile cresc lunar cu randamentul real, adică randamentul minus inflația. Așa rezultatul rămâne în banii de azi.",
      "La pensionare, economiile se plătesc în sume lunare egale pe numărul de ani ales. Ce rămâne continuă să aducă randament între timp.",
      "Nu sunt incluse pensia de stat, impozitele și comisioanele de administrare.",
    ],
    ejemplo: [
      `Cu ${m(actual)} economisiți la 30 de ani și ${m(aporte)} pe lună, la un randament real de 4%, ajungeți la ${m(capital30)} la 65 de ani. Asta înseamnă ${m(rentaMensual(capital30, 4, 25))} pe lună timp de 25 de ani.`,
      `Dacă începeți la 40 de ani cu aceleași cifre, ajungeți la ${m(capital40)}. Zece ani fac o diferență mare.`,
    ],
    faq: [
      {
        pregunta: "Ce este randamentul real?",
        respuesta: "Este ce câștigă o investiție după inflație. Dacă investiția aduce 7% pe an și inflația este 3%, randamentul real este de aproximativ 4%.",
      },
      {
        pregunta: "Economiile înlocuiesc pensia de stat?",
        respuesta: "Nu. Sunt economiile dumneavoastră, pe lângă pensia de stat sau un fond de pensii. Pentru o estimare a pensiei de stat, consultați casa de pensii din țara dumneavoastră.",
      },
      {
        pregunta: "Cât ar trebui să economisesc pentru pensie?",
        respuesta: "Nu există o cifră unică. O regulă des folosită este între 10% și 15% din venit. Cel mai important este să începeți cât mai devreme.",
      },
    ],
    glosario: [
      { termino: "Randament real", definicion: "Cât câștigă o investiție peste inflație." },
      { termino: "Banii de azi", definicion: "O sumă viitoare exprimată prin ce ar putea cumpăra astăzi." },
    ],
  };
};
