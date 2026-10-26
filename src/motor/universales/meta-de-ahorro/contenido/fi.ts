import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  const sata = montoEjemplo(ctx, 100);
  return {
    h1: "Säästölaskuri säästötavoitteellesi",
    title: tituloQueEntre(
      `Säästölaskuri: paljonko säästän kuukaudessa | ${ctx.nombrePais}`,
      `Säästölaskuri | ${ctx.nombrePais}`,
      "Säästölaskuri",
    ),
    description: "Laske, paljonko sinun pitää säästää kuukaudessa, jotta saavutat säästötavoitteesi ajallaan, kun mukana ovat jo säästetyt rahat ja niiden tuotto.",
    intro: [
      "Matka, auto, asunnon omarahoitusosuus tai puskuri yllättäviin menoihin. Tavoite, jolla on summa ja päivämäärä, on paljon helpompi saavuttaa.",
      "Syötä, paljonko haluat säästää ja kuinka monessa kuukaudessa. Näet, paljonko sinun pitää laittaa sivuun joka kuukausi ja joka viikko.",
    ],
    comoSeCalcula: [
      "Ensin lasketaan, kuinka paljon jo säästämäsi summa ehtii kasvaa ajanjakson loppuun mennessä.",
      "Puuttuva osa jaetaan yhtä suuriin kuukausittaisiin talletuksiin.",
      "Jos säästöt tuottavat korkoa, myös jokainen talletus kasvaa, joten sinun tarvitsee tallettaa hieman vähemmän.",
    ],
    ejemplo: [
      `Jos haluat säästää ${m(meta)} 24 kuukaudessa ilman korkoa, sinun pitää säästää ${m(meta / 24)} kuukaudessa.`,
      `Jos sinulla on jo ${m(actual)} ja saat 5 prosentin vuosituoton, riittää, että säästät ${m(aporteNecesario(meta, actual, 24, 5))} kuukaudessa.`,
    ],
    faq: [
      {
        pregunta: "Miten pysyn säästötavoitteessa?",
        respuesta: "Siirrä rahat heti palkkapäivänä, ennen kuin ehdit käyttää ne. Tee mieluiten automaattinen siirto omalle säästötilille.",
      },
      {
        pregunta: "Mitä teen, jos kuukausisumma on liian suuri?",
        respuesta: "Anna itsellesi enemmän aikaa tai pienennä tavoitetta. Voit myös aloittaa summalla, johon sinulla on varaa, ja nostaa sitä, kun tulosi kasvavat.",
      },
      {
        pregunta: "Pitääkö inflaatio ottaa huomioon?",
        respuesta: `Jos tavoite on usean vuoden päässä, lisää siihen odottamasi inflaatio. Se, mikä maksaa tänään ${m(sata)}, voi maksaa melko paljon enemmän, kun olet perillä.`,
      },
    ],
    glosario: [
      { termino: "Talletus", definicion: "Raha, jonka laitat joka kuukausi sivuun tavoitetta varten." },
      { termino: "Tuotto", definicion: "Se, mitä säästösi tuottavat tilillä tai sijoituksessa." },
    ],
  };
};
