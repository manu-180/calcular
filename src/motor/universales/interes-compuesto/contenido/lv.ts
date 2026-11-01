import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Salikto procentu kalkulators",
    title: tituloQueEntre(`Salikto procentu kalkulators ${GRAMATICA.lv.en(ctx.nombrePais)}`, "Salikto procentu kalkulators", "Saliktie procenti"),
    description: "Paskatieties, kā nauda aug ar saliktajiem procentiem un regulārām ikmēneša iemaksām: galīgā summa, saņemtie procenti un tabula pa gadiem.",
    intro: [
      "Saliktos procentus piemērojot, aprēķinātos procentus pieskaita summai, un arī tie turpina pelnīt. Tāpēc uzkrājumi aug arvien ātrāk.",
      "Ievadiet šodien pieejamo summu, cik varat pievienot mēnesī, procentu likmi un gadu skaitu. Parādīsim galīgo summu un to, kādu tās daļu veido procenti.",
    ],
    comoSeCalcula: [
      "Galīgā summa = sākuma summa × (1 + i) n-tajā pakāpē + ikmēneša iemaksa × ((1 + i) n-tajā pakāpē − 1) ÷ i.",
      "Šeit i ir mēneša likme, kas atbilst izvēlētajai kapitalizācijai, un n ir mēnešu skaits.",
      "Ikmēneša iemaksas ieskaita katra mēneša beigās.",
    ],
    ejemplo: [
      `Ja sāksiet ar ${m(capital)} un katru mēnesi pievienosiet ${m(aporte)}, bet procentu likme gadā būs 7%, pēc 10 gadiem jums būs ${m(a10)}.`,
      `Vēl pēc 10 gadiem summa pieaugs līdz ${m(a20)}. Otrā desmitgade dod ievērojami vairāk nekā pirmā.`,
    ],
    faq: [
      {
        pregunta: "Kāda ir atšķirība starp vienkāršajiem un saliktajiem procentiem?",
        respuesta:
          "Vienkāršos procentus vienmēr rēķina tikai no sākuma summas. Saliktos procentus rēķina no summas kopā ar jau aprēķinātajiem procentiem.",
      },
      {
        pregunta: "Kas ir 72 likums?",
        respuesta: "Ātrs veids, kā novērtēt, cik gados nauda dubultosies: daliet 72 ar procentu likmi gadā. Ja likme ir 6%, summa dubultojas apmēram 12 gados.",
      },
      {
        pregunta: "Kādu procentu likmi ievadīt?",
        respuesta:
          "Tādu, kas ir reālistiska tam, ko darīsiet ar naudu. Ja vēlaties redzēt rezultātu šodienas cenās, ievadiet likmi, kas samazināta par paredzamo inflāciju.",
      },
    ],
    glosario: [
      { termino: "Kapitalizācija", definicion: "Saņemto procentu pieskaitīšana summai, lai turpinātu augt arī tie." },
      { termino: "Saliktie procenti", definicion: "Procenti, ko rēķina no summas kopā ar jau aprēķinātajiem procentiem." },
    ],
  };
};
