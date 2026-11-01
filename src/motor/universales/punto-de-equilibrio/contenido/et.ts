import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const uhikut = (n: number) => `${formatearNumero(ctx, n)} ${n === 1 ? "ühik" : "ühikut"}`;
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Tasuvuspunkt: arvuta kriitiline müügimaht",
    title: tituloQueEntre(
      `Tasuvuspunkt: arvuta kriitiline müügimaht | ${ctx.nombrePais}`,
      `Tasuvuspunkt | ${ctx.nombrePais}`,
      "Tasuvuspunkt",
    ),
    description: "Arvuta, mitu ühikut pead müüma ja kui suurt käivet vajad kuus, et kulud katta ja kasumisse jõuda.",
    intro: [
      "Tasuvuspunkt on müügimaht, mille juures tegevus ei too kasumit ega kahjumit. Sellest allpool kaotad raha, sellest ülalpool hakkad teenima.",
      "Sisesta püsikulud, hind ja ühe ühiku muutuvkulud. Näed, kui palju pead müüma, et kulud katta ja oma eesmärgini jõuda.",
    ],
    comoSeCalcula: [
      "Kate = hind − muutuvkulud ühiku kohta.",
      "Ühikuid tasuvuspunktini = püsikulud ÷ kate, ümardatuna ülespoole.",
      "Käive tasuvuspunktis = püsikulud ÷ (kate ÷ hind).",
      "Soovitud kasumi jaoks liida kasum püsikuludele ja arvuta samamoodi.",
    ],
    ejemplo: [
      `Kui püsikulud on ${m(fijos)}, hind ${m(precio)} ja muutuvkulud ${m(variable)}, jääb igast müügist ${m(precio - variable)}.`,
      `Kulude katmiseks pead müüma ${uhikut(base.unidades)} (${m(base.facturacion)}). Et teenida kuus ${m(objetivo)}, pead müüma ${uhikut(meta.unidades)}.`,
    ],
    faq: [
      {
        pregunta: "Mis on püsikulud ja muutuvkulud?",
        respuesta: "Püsikulud jäävad samaks ka siis, kui midagi ei müü: üür, püsivad palgad, elekter. Muutuvkulud kasvavad iga müügiga: ostud, materjalid, vahendustasud ja transport.",
      },
      {
        pregunta: "Kuidas tasuvuspunkti allapoole saada?",
        respuesta: "Võimalusi on kolm: tõsta hinda, vähenda ühiku muutuvkulusid või kärbi püsikulusid. Hind mõjutab tavaliselt kõige rohkem.",
      },
      {
        pregunta: "Kas arvutus sobib teenuseettevõttele?",
        respuesta: "Sobib. Ühik võib olla tund, külastus või klient kuus. Kasuta muutuvkuluna seda, mida ühe ühiku pakkumine sulle maksma läheb.",
      },
    ],
    glosario: [
      { termino: "Tasuvuspunkt", definicion: "Müügitase, mille juures tulud on kuludega võrdsed. Seda nimetatakse ka kriitiliseks müügimahuks." },
      { termino: "Kate", definicion: "See, mis jääb igast müügist püsikulude katmiseks." },
    ],
  };
};
