import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  const kateLisaysta50 = ((costo * 1.5 - costo) / (costo * 1.5)) * 100;
  return {
    h1: "Marginaali kalkulaator: kate ja juurdehindlus",
    title: tituloQueEntre(
      `Marginaali kalkulaator: arvuta kate ja juurdehindlus | ${ctx.nombrePais}`,
      `Marginaali kalkulaator | ${ctx.nombrePais}`,
      "Marginaali kalkulaator",
    ),
    description: "Arvuta kate ja juurdehindlus ostu- ja müügihinnast või leia müügihind, millega jõuad soovitud katteprotsendini.",
    intro: [
      "Kate ja juurdehindlus lähevad sageli segamini ja see võib kalliks minna. Mõlemad mõõdavad sama kasumit, kuid erineva summa suhtes.",
      "Sisesta ostu- ja müügihind, siis näed mõlemat. Või vali kate, siis saad teada, mida tootelt küsida.",
    ],
    comoSeCalcula: [
      "Kasum = müügihind − ostuhind.",
      "Kate = kasum ÷ müügihind × 100.",
      "Juurdehindlus = kasum ÷ ostuhind × 100.",
      "Müügihind soovitud katte jaoks = ostuhind ÷ (1 − kate ÷ 100).",
    ],
    ejemplo: [
      `Toode, mille ostuhind on ${m(costo)} ja müügihind ${m(precio)}, annab kasumiks ${m(precio - costo)}. Kate on ${p(((precio - costo) / precio) * 100)} ja juurdehindlus ${p(((precio - costo) / costo) * 100)}.`,
      `Et selle ostuhinnaga saada 50% katet, peab müügihind olema ${m(precioConMargen(costo, 50))}. Kui lisad ostuhinnale ainult 50%, on kate vaid ${p(kateLisaysta50)}.`,
    ],
    faq: [
      {
        pregunta: "Mis vahe on kattel ja juurdehindlusel?",
        respuesta: "Kate on kasum müügihinna suhtes. Juurdehindlus on kasum ostuhinna suhtes. Sama kasumi puhul on juurdehindluse protsent alati suurem arv.",
      },
      {
        pregunta: "Kuidas määrata tootele hind soovitud katte jaoks?",
        respuesta: `Jaga ostuhind arvuga (1 − kate). Kui tahad 30% katet, jaga ostuhind arvuga ${formatearNumero(ctx, 0.7, 2)}. Ära lihtsalt lisa ostuhinnale 30%, sest siis teenid vähem, kui arvad.`,
      },
      {
        pregunta: "Kas katet arvutatakse käibemaksuga või käibemaksuta hindadest?",
        respuesta: "Arvuta ostu- ja müügihinda käibemaksuta. Muidu paistab kate suurem, kui see on.",
      },
    ],
    glosario: [
      { termino: "Kate (marginaal)", definicion: "Kasum protsentides müügihinnast. Kui kulud on muutuvad, räägitakse ka müügikattest." },
      { termino: "Juurdehindlus", definicion: "Kasum protsentides ostuhinnast." },
    ],
  };
};
