import { GRAMATICA } from "../../../i18n/gramatica";
import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Prištevanje dni k datumu",
    title: tituloQueEntre(
      `Prištevanje dni k datumu: kalkulator ${GRAMATICA.sl.para(ctx.nombrePais)}`,
      "Prištevanje in odštevanje dni od datuma",
      "Prištevanje dni k datumu",
    ),
    description: "Datumu prištejte ali od njega odštejte koledarske ali delovne dneve in preverite, na kateri dan pade rezultat. Uporabno za roke in datume zapadlosti.",
    intro: [
      "Izberite datum, število dni in ali jih želite prišteti ali odšteti. Dobili boste nov datum in dan v tednu.",
      "Pri delovnih dnevih kalkulator preskoči sobote in nedelje.",
    ],
    comoSeCalcula: [
      "Pri koledarskih dnevih vsak vneseni dan premakne datum za en dan v koledarju.",
      "Pri delovnih dnevih se štejejo samo dnevi od ponedeljka do petka. Začetni datum se ne šteje.",
      "Prazniki se ne odštevajo, ker se razlikujejo od države do države in od regije do regije.",
    ],
    ejemplo: [
      `Začetni datum: ${f(inicio)}. Če prištejete 90 koledarskih dni, je dobljeni datum: ${f(mas90)}.`,
      `Začetni datum: ${f(inicio)}. Če prištejete 15 delovnih dni, je dobljeni datum: ${f(aFecha(habil))}.`,
    ],
    faq: [
      {
        pregunta: "Ali se začetni datum šteje kot prvi dan?",
        respuesta: "Ne. Če ponedeljku prištejete 1 dan, dobite torek. Tako se računa večina rokov.",
      },
      {
        pregunta: "Kaj se zgodi, če delovne dneve prištevate od sobote?",
        respuesta: "Prvi delovni dan je naslednji ponedeljek. Če soboti prištejete 1 delovni dan, dobite ponedeljek.",
      },
      {
        pregunta: "Ali kalkulator upošteva prestopna leta?",
        respuesta: "Da. Če obdobje vključuje 29. februar, se ta šteje kot dodaten dan.",
      },
    ],
    glosario: [
      { termino: "Koledarski dnevi", definicion: "Vsi dnevi v koledarju, noben se ne preskoči." },
      { termino: "Delovni dnevi", definicion: "V tem kalkulatorju dnevi od ponedeljka do petka." },
    ],
  };
};
