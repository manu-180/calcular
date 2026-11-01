import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Ģimenes budžets pēc 50/30/20 noteikuma",
    title: tituloQueEntre(
      `Ģimenes budžets 50/30/20 ${GRAMATICA.lv.en(ctx.nombrePais)}`,
      "Ģimenes budžets pēc 50/30/20 noteikuma",
      "Ģimenes budžets 50/30/20",
    ),
    description: "Sadaliet mēneša neto ienākumus pēc 50/30/20 noteikuma: cik nepieciešamajiem izdevumiem, cik priekiem un cik uzkrājumiem. Procentus varat mainīt.",
    intro: [
      "50/30/20 noteikums ir vienkāršs veids, kā saplānot mēnesi. Puse ienākumu paredzēta pašam nepieciešamākajam, 30% priekiem un 20% uzkrājumiem.",
      "Ievadiet neto ienākumus un redzēsiet, cik tiek katrai daļai. Ja jūsu situācija ir citāda, piemēram, lielas īres dēļ, procentus nomainiet.",
    ],
    comoSeCalcula: [
      "Nepieciešamie izdevumi = ienākumi × 50%.",
      "Prieki un vēlmes = ienākumi × 30%.",
      "Uzkrājumi = ienākumi × 20%. Visu trīs procentu summai jābūt 100%.",
    ],
    ejemplo: [
      `Ja ienākumi ir ${m(ingreso)} mēnesī: ${m(ingreso * 0.5)} nepieciešamajiem izdevumiem, ${m(ingreso * 0.3)} priekiem un vēlmēm, ${m(ingreso * 0.2)} uzkrājumiem.`,
      `Gadā šie 20% veido ${m(ingreso * 0.2 * 12)} uzkrājumu.`,
    ],
    faq: [
      {
        pregunta: "Kas pieder pie nepieciešamajiem izdevumiem un kas pie priekiem?",
        respuesta:
          "Nepieciešamie ir izdevumi, kas jāsedz obligāti: mājoklis, pamata pārtika, komunālie maksājumi, transports, veselība un obligātie maksājumi. Prieki un vēlmes ir tas, bez kā vajadzības gadījumā varētu iztikt.",
      },
      {
        pregunta: "Ko darīt, ja nepieciešamie izdevumi pārsniedz 50%?",
        respuesta: "Tā notiek bieži, īpaši ja īre ir liela. Izmēģiniet sadalījumu 60/20/20 vai 70/20/10 un nesamaziniet uzkrājumus līdz nullei.",
      },
      {
        pregunta: "Vai parādu maksājumi skaitās uzkrājumi?",
        respuesta: "Obligātie maksājumi pieder pie nepieciešamajiem izdevumiem. Tas, ko maksājat papildus, lai no parādiem tiktu vaļā ātrāk, skaitās uzkrājumi, jo finanšu stāvokli uzlabo tāpat kā taupīšana.",
      },
    ],
    glosario: [
      { termino: "Neto ienākumi", definicion: "Cik saņemat pēc nodokļu un iemaksu atskaitīšanas." },
      { termino: "50/30/20 noteikums", definicion: "Veids, kā sadalīt ienākumus starp nepieciešamajiem izdevumiem, priekiem un uzkrājumiem." },
    ],
  };
};
