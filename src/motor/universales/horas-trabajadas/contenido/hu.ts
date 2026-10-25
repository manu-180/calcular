import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Munkaidő kalkulátor",
    title: tituloQueEntre(`Munkaidő kalkulátor (${ctx.nombrePais})`, `Ledolgozott órák számítása (${ctx.nombrePais})`, "Munkaidő kalkulátor"),
    description: "Munkaidő kalkulátor: add össze a heti ledolgozott óráidat a kezdés, a befejezés és a szünetek alapján, és számold ki a béredet a túlórával együtt.",
    intro: [
      "Válaszd ki minden napra a kezdés és a befejezés idejét, a nem fizetett szünetet és az órabéredet. Megmutatjuk az összes órát, a túlórát és a heti béredet.",
      "Jól jön a bérpapír ellenőrzéséhez, a jelenléti ív kitöltéséhez vagy az órában végzett munka kiszámlázásához.",
    ],
    comoSeCalcula: [
      "Napi órák = befejezés − kezdés − szünet. Ha a befejezés korábbi, mint a kezdés, a műszak másnap ér véget.",
      "Túlóra = heti összes óra − rendes munkaórák, ha az összes óra meghaladja őket.",
      "Bér = rendes órák × órabér + túlórák × órabér × (1 + pótlék).",
    ],
    ejemplo: [
      `Munka ${hora("09:00")} és ${hora("17:30")} között, fél óra szünettel: naponta ${n(jornada)} óra. Hétfőtől péntekig ${n(jornada * 5)} óra, órabér: ${m(pago)}, így a heti bér ${m(jornada * 5 * pago)}.`,
      `Munka ${hora("08:00")} és ${hora("18:00")} között, egy óra szünettel: a héten ${n(larga * 5)} óra, ebből ${n(extra)} óra túlóra. Másfélszeres díjazással a heti bér ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Hogyan számolom ki a ledolgozott órákat?",
        respuesta: "A befejezés idejéből vond ki a kezdés idejét, majd vond le a szünetet. Utána add össze a hét összes napját.",
      },
      {
        pregunta: "Hogyan váltom át a perceket tizedes órára?",
        respuesta: `Oszd el a perceket hatvannal. A fél óra ${n(0.5, 1)}, a negyedóra ${n(0.25, 2)}, a háromnegyed óra ${n(0.75, 2)}. Így 7 óra 45 perc tizedes alakban ${n(7.75, 2)} óra.`,
      },
      {
        pregunta: "Mennyi túlórát vállalhatok, és hogyan fizetik?",
        respuesta: "Ez a munkavégzés helyén érvényes jogszabályoktól és a munkaszerződésedtől függ. A kalkulátor a megadott pótlékkal és rendes munkaórákkal számol, konkrét szabály alkalmazása nélkül.",
      },
    ],
    glosario: [
      { termino: "Túlóra", definicion: "A rendes munkaidőn felül ledolgozott óra, amelyet magasabb díjjal fizetnek." },
      { termino: "Másfélszeres díjazás", definicion: "Túlórapótlék, amely a rendes órabér másfélszerese, vagyis 50 százalék pótlék." },
    ],
  };
};
