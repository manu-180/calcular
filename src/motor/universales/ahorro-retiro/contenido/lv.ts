import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  return {
    h1: "Pensijas uzkrājumu kalkulators",
    title: tituloQueEntre(`Pensijas uzkrājumu kalkulators (${ctx.nombrePais})`, "Pensijas uzkrājumu kalkulators", "Uzkrājumi pensijai"),
    description: "Aprēķiniet, cik ar ikmēneša iemaksām varat uzkrāt pensijai un kādus ikmēneša ienākumus tas dos šodienas cenās.",
    intro: [
      "Ar valsts pensiju bieži nepietiek, lai saglabātu ierasto dzīves līmeni. Savi uzkrājumi, pat nelieli, ļoti palīdz, ja tos sāk veidot laikus.",
      "Ievadiet savu vecumu, vecumu, kurā vēlaties doties pensijā, jau uzkrāto summu un to, cik varat pielikt katru mēnesi. Parādīsim summu pensijas sākumā un to, cik no tās var izmantot katru mēnesi.",
    ],
    comoSeCalcula: [
      "Uzkrājumi katru mēnesi aug ar reālo ienesīgumu, tas ir, ienesīgumu pēc inflācijas atskaitīšanas. Tāpēc rezultāts ir šodienas cenās.",
      "Pensijā uzkrājumi tiek izmaksāti vienādās ikmēneša summās izvēlēto gadu skaitu. Atlikums šajā laikā turpina pelnīt.",
      "Valsts pensija, nodokļi un ieguldījumu komisijas netiek iekļautas.",
    ],
    ejemplo: [
      `Pieņemsim, ka jums ir 30 gadi, jau uzkrāti ${m(actual)}, katru mēnesi pieliekat ${m(aporte)}, un reālais ienesīgums ir 4%. Līdz 65 gadu vecumam uzkrāsiet ${m(capital30)}. Ar šo summu pietiek, lai 25 gadus saņemtu ${m(rentaMensual(capital30, 4, 25))} mēnesī.`,
      `Ja ar tiem pašiem skaitļiem sāk tikai 40 gadu vecumā, uzkrājas ${m(capital40)}. Desmit gadi vairāk rezultātu maina ļoti būtiski.`,
    ],
    faq: [
      {
        pregunta: "Kas ir reālais ienesīgums?",
        respuesta: "Tas, ko ieguldījumi nopelna pēc inflācijas atskaitīšanas. Ja ieguldījumi dod 7%, bet inflācija ir 3%, reālais ienesīgums ir aptuveni 4%.",
      },
      {
        pregunta: "Vai tas aizstāj valsts pensiju?",
        respuesta: "Nē. Tie ir jūsu pašu uzkrājumi, kas papildina valsts pensiju vai pensiju shēmu. Valsts pensijas prognozi var sniegt atbildīgā iestāde jūsu valstī.",
      },
      {
        pregunta: "Cik atlikt pensijai?",
        respuesta: "Viena pareiza skaitļa nav. Bieži lietots noteikums iesaka atlikt no 10 līdz 15% ienākumu. Vissvarīgākais ir sākt pēc iespējas agrāk.",
      },
    ],
    glosario: [
      { termino: "Reālais ienesīgums", definicion: "Tas, ko ieguldījumi nopelna virs inflācijas." },
      { termino: "Šodienas cenas", definicion: "Nākotnes summa, izteikta ar to, ko par to var nopirkt šodien." },
    ],
  };
};
