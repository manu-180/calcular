import { GRAMATICA } from "../../../i18n/gramatica";
import { formaLv } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  // 1 stunda, 3 stundas, 10 stundas, 7,75 stundas (nominativo; siempre se usa como sujeto).
  const h = (x: number, decimales = 0) => `${n(x, decimales)} ${formaLv(x, "stunda", "stundas", "stundu")}`;
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Nostrādāto stundu kalkulators",
    title: tituloQueEntre(
      `Nostrādāto stundu kalkulators ${GRAMATICA.lv.en(ctx.nombrePais)}`,
      "Nostrādāto stundu un samaksas kalkulators",
      "Nostrādāto stundu kalkulators",
    ),
    description: "Saskaitiet nedēļā nostrādātās stundas pēc sākuma, beigām un pārtraukumiem un aprēķiniet samaksu ar virsstundām.",
    intro: [
      "Katrai dienai izvēlieties sākumu un beigas, ievadiet neapmaksāto pārtraukumu un stundas likmi. Parādīsim visas stundas, virsstundas un nedēļas samaksu.",
      "Kalkulators noder, pārbaudot darba samaksu, aizpildot darba laika uzskaiti vai izrakstot rēķinu par stundu darbu.",
    ],
    comoSeCalcula: [
      "Stundas dienā = beigas − sākums − pārtraukums. Ja beigas ir agrāk par sākumu, maiņa beidzas nākamajā dienā.",
      "Virsstundas = visas nedēļas stundas − parastās stundas, ja kopējais stundu skaits ir lielāks.",
      "Samaksa = parastās stundas × stundas likme + virsstundas × stundas likme × (1 + piemaksa).",
    ],
    ejemplo: [
      `No ${hora("09:00")} līdz ${hora("17:30")} ar 30 minūšu pārtraukumu dienā iznāk ${h(jornada)}. No pirmdienas līdz piektdienai tās ir ${h(jornada * 5)}: ja stundas likme ir ${m(pago)}, samaksa ir ${m(jornada * 5 * pago)}.`,
      `No ${hora("08:00")} līdz ${hora("18:00")} ar vienas stundas pārtraukumu nedēļā iznāk ${h(larga * 5)}, no tām virsstundas: ${h(extra)}. Ja piemaksa ir 50%, samaksa ir ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Kā aprēķināt nostrādātās stundas?",
        respuesta: "No beigu laika atņemiet sākuma laiku, tad atņemiet pārtraukumu. Visbeidzot saskaitiet visas nedēļas dienas.",
      },
      {
        pregunta: "Kā minūtes pārvērst decimālās stundās?",
        respuesta: `Daliet minūtes ar 60. Pusstunda ir ${n(0.5, 1)}, 15 minūtes ir ${n(0.25, 2)}, bet 45 minūtes ir ${n(0.75, 2)}. Tātad 7 stundas un 45 minūtes ir ${h(7.75, 2)}.`,
      },
      {
        pregunta: "Cik virsstundu ir atļauts un kā par tām maksā?",
        respuesta: "Tas atkarīgs no tās valsts likumiem, kurā strādājat, un no jūsu līguma. Kalkulators piemēro jūsu ievadīto piemaksu un parastās stundas, bez konkrētas tiesību normas.",
      },
    ],
    glosario: [
      { termino: "Virsstundas", definicion: "Darbs virs parastā darba laika, par kuru maksā piemaksu." },
      { termino: "Pusotra likme", definicion: "Samaksa par virsstundām, kas ir uz pusi lielāka par parasto, tas ir, ar 50% piemaksu." },
    ],
  };
};
