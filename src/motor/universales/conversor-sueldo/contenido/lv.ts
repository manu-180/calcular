import { GRAMATICA } from "../../../i18n/gramatica";
import { formaLv } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  const nedelas = 52 / 12;
  return {
    h1: "Stundas, mēneša un gada algas pārrēķins",
    title: tituloQueEntre(
      `Stundas, mēneša un gada alga ${GRAMATICA.lv.en(ctx.nombrePais)}`,
      `Algas perioda pārrēķins ${GRAMATICA.lv.en(ctx.nombrePais)}`,
      "Algas perioda pārrēķins",
    ),
    description: "Pārrēķiniet algu stundai, dienai, nedēļai, pusmēnesim, mēnesim un gadam pēc savām stundām un apmaksātajām nedēļām.",
    intro: [
      "Cik nopelnāt stundā? Cik gadā dod piedāvājums ar stundas likmi? Ievadiet summu, izvēlieties periodu, un parādīsim visus pārējos.",
      "Tas palīdzēs salīdzināt darba piedāvājumus, novērtēt virsstundas vai uzzināt, cik vērts ir jūsu laiks.",
    ],
    comoSeCalcula: [
      "Vispirms viss tiek pārrēķināts gada summā.",
      "Stundā = gada summa ÷ (stundas nedēļā × apmaksātās nedēļas).",
      "Dienā = gada summa ÷ (dienas nedēļā × apmaksātās nedēļas). Nedēļā = gada summa ÷ apmaksātās nedēļas.",
      "Mēnesī = gada summa ÷ 12. Pusmēnesī = gada summa ÷ 24.",
    ],
    ejemplo: [
      `Alga ${m(anual)} gadā, strādājot 40 stundas nedēļā, atbilst ${m(anual / 2080)} stundā un ${m(anual / 12)} mēnesī.`,
      `Piedāvājums ${m(hora)} stundā pilnā slodzē gadā dod ${m(hora * 2080)}.`,
    ],
    faq: [
      {
        pregunta: "Cik darba stundu ir gadā?",
        respuesta: `Strādājot 40 stundas nedēļā un ar 52 apmaksātām nedēļām, sanāk ${formatearNumero(ctx, 2080)} stundas. Tāpēc ātram novērtējumam stundas likmi reizina aptuveni ar ${formatearNumero(ctx, 2000)}.`,
      },
      {
        pregunta: "Kāpēc nedēļas alga, reizināta ar 4, nedod mēneša algu?",
        respuesta: `Jo mēnesī vidēji ir ${formatearNumero(ctx, nedelas, 2)} ${formaLv(nedelas, "nedēļa", "nedēļas", "nedēļu")}, nevis 4. Nedēļas algu reiziniet ar 52, daliet ar 12, un iegūsiet mēneša algu.`,
      },
      {
        pregunta: "Vai iekļautas piemaksas un nodokļi?",
        respuesta: "Nē. Kalkulators pārrēķina to pašu summu citiem periodiem. Ja saņemat piemaksas, salīdzinājumam pieskaitiet tās atsevišķi.",
      },
    ],
    glosario: [
      { termino: "Bruto alga", definicion: "Alga pirms ienākuma nodokļa un sociālās apdrošināšanas iemaksu ieturēšanas." },
      { termino: "Izmaksa divreiz mēnesī", definicion: "Alga, ko katru mēnesi izmaksā divās daļās. Gadā sanāk 24 izmaksas." },
    ],
  };
};
