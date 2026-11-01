import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.1;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Calculator bacșiș",
    title: tituloQueEntre(`Calculator bacșiș: ${ctx.nombrePais}`, "Calculator bacșiș și împărțirea notei", "Calculator bacșiș"),
    description: "Calculați bacșișul, totalul notei de plată și cât plătește fiecare persoană când împărțiți nota. Puteți rotunji în sus partea fiecăruia.",
    intro: [
      "Introduceți nota de plată, procentul de bacșiș și câte persoane plătesc. Vedeți bacșișul, totalul și partea fiecăruia.",
      "Dacă preferați sume rotunde, calculatorul rotunjește în sus partea fiecăruia, iar diferența se adaugă la bacșiș.",
    ],
    comoSeCalcula: [
      "Bacșiș = nota de plată × procentul de bacșiș ÷ 100.",
      "Total = nota de plată + bacșiș.",
      "Partea fiecăruia = totalul împărțit la numărul de persoane.",
    ],
    ejemplo: [
      `La o notă de ${m(cuenta)} cu un bacșiș de 10% se adaugă ${m(propina)}, pentru un total de ${m(cuenta + propina)}.`,
      `Împărțit la 3 persoane, fiecare plătește ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Cât bacșiș se lasă?",
        respuesta: `Depinde de obiceiul locului. Verificați ce este obișnuit ${GRAMATICA.ro.en(ctx.nombrePais)} și dacă nota de plată include deja o taxă de serviciu.`,
      },
      {
        pregunta: "Bacșișul se calculează din suma cu TVA sau fără?",
        respuesta: "De obicei se calculează din totalul de pe nota de plată. Dacă preferați să îl calculați din suma fără taxe, introduceți acea sumă.",
      },
      {
        pregunta: "Cum calculez repede un bacșiș de 10%?",
        respuesta: "Mutați virgula cu o cifră la stânga. La o notă de 85, bacșișul de 10% este 8,50. Pentru 15%, adăugați încă jumătate din această sumă.",
      },
    ],
    glosario: [
      { termino: "Bacșiș", definicion: "O sumă în plus pe care o lăsați pentru servire, peste prețul consumației." },
      { termino: "Taxă de serviciu", definicion: "O sumă pe care localul a adăugat-o deja pe nota de plată pentru servire." },
    ],
  };
};
