import { GRAMATICA } from "../../../i18n/gramatica";
import { formaLv } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "uz vienu jūdzi" : "uz vienu kilometru";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  const millasMaraton = DISTANCIAS_KM.maraton / KM_POR_MILLA;
  return {
    h1: "Skriešanas tempa kalkulators",
    title: tituloQueEntre(
      `Skriešanas tempa kalkulators ${GRAMATICA.lv.en(ctx.nombrePais)}`,
      `Skriešanas tempa kalkulators: temps min/${corto}`,
      "Skriešanas tempa kalkulators",
    ),
    description: `Aprēķiniet tempu ${u}, finiša laiku vai attālumu 5 km, 10 km, pusmaratona vai maratona skrējienam.`,
    intro: [
      "Ievadiet jebkurus divus no trim datiem (attālumu, laiku vai tempu), un trešo aprēķinās kalkulators. Tas noder, plānojot sacensības vai pārbaudot treniņu.",
      "5 km, 10 km, pusmaratona un maratona distances jau ir sarakstā.",
    ],
    comoSeCalcula: [
      `Temps = laiks ÷ attālums, minūtēs un sekundēs ${u}.`,
      "Laiks = temps × attālums.",
      "Attālums = laiks ÷ temps. Vidējais ātrums ir attālums, izdalīts ar stundu skaitu.",
    ],
    ejemplo: imperial
      ? [
          `Ja 3 jūdzes veic 27 minūtēs, temps ir 9:00/mi, bet ātrums ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `Pusmaratona (${formatearNumero(ctx, media, 2)} mi) laiks, skrienot ar tempu ${ritmoTexto(ritmoMedia)}/mi, ir ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "Ja 10 km veic 50 minūtēs, temps ir 5:00/km, bet ātrums 12 km/h.",
          `Pusmaratona (${formatearNumero(ctx, media, 1)} ${corto}) laiks, skrienot ar tempu ${ritmoTexto(ritmoMedia)}/km, ir ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Kā aprēķināt tempu ${u}?`,
        respuesta: imperial
          ? `Laiku pārvērtiet minūtēs un izdaliet ar jūdžu skaitu. Ja 3 jūdzes veic 28 min 30 s, temps ir ${formatearNumero(ctx, 9.5, 1)} min/mi, tas ir, 9:30.`
          : `Laiku pārvērtiet minūtēs un izdaliet ar kilometru skaitu. Ja 10 km veic 55 minūtēs, temps ir ${formatearNumero(ctx, 5.5, 1)} min/km, tas ir, 5:30.`,
      },
      {
        pregunta: "Kāds temps der iesācējiem?",
        respuesta: "Tāds, ar kādu skrienot varat sarunāties. Fiziskajai formai uzlabojoties, temps pamazām kļūst ātrāks.",
      },
      {
        pregunta: "Cik garš ir maratons?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, millasMaraton, 1)} ${formaLv(millasMaraton, "jūdze", "jūdzes", "jūdžu")}). Pusmaratons ir uz pusi īsāks.`,
      },
    ],
    glosario: [
      { termino: "Temps", definicion: "Cik ilgā laikā veicat vienu kilometru vai vienu jūdzi." },
      { termino: "Vidējais ātrums", definicion: "Attālums, kas tiek veikts stundā." },
    ],
  };
};
