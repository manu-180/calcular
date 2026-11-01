import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Laenukalkulaator",
    title: tituloQueEntre(
      `Laenukalkulaator: arvuta kuumakse ja intressid | ${ctx.nombrePais}`,
      `Laenukalkulaator | ${ctx.nombrePais}`,
      "Laenukalkulaator",
    ),
    description: "Arvuta laenu kuumakse, intressid kokku ja kogu maksegraafik. Näed ka, kui palju säästad lisamaksetega.",
    intro: [
      "Enne laenu võtmist ütlevad kõige rohkem kaks arvu: kui palju maksad iga kuu ja kui palju laen sulle intressidena maksma läheb.",
      "Sisesta laenusumma, aastaintress ja laenuperiood. Kui plaanid iga kuu veidi rohkem tagasi maksta, lisa ka see, siis näed, kui palju kiiremini laenust vabaned.",
    ],
    comoSeCalcula: [
      "Kalkulaator kasutab annuiteetgraafikut, kus iga kuu makse on sama suur. See on tavaline väikelaenu, autolaenu ja kodulaenu puhul.",
      "Kuu intressimäär = aastaintress ÷ 12.",
      "Kuumakse = laenusumma × kuu intressimäär ÷ (1 − (1 + kuu intressimäär) astmes miinus maksete arv).",
      "Intressi arvestatakse iga kuu laenujäägilt. Ülejäänud osa maksest on põhiosa, mis vähendab võlga.",
    ],
    ejemplo: [
      `Kui laenusumma on ${m(monto)}, aastaintress 12% ja laenuperiood 36 kuud, on kuumakse ${m(cuota36)}. Intressi maksad kokku ${m(interesesTotales(monto, 12, 36))}.`,
      `Kui pikendad laenuperioodi 60 kuuni, on kuumakse ainult ${m(cuota60)}, kuid intressi koguneb kokku ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Kuidas laenu kuumakset arvutatakse?",
        respuesta:
          "Annuiteedi valemiga. Kõik maksed on sama suured, kuid alguses on neis rohkem intressi ja lõpus rohkem põhiosa. Seepärast väheneb võlg alguses aeglaselt.",
      },
      {
        pregunta: "Kas laenu tasub ennetähtaegselt tagasi maksta?",
        respuesta:
          "Üldiselt tasub, kui ennetähtaegse tagasimakse tasu ei ole suur. Lisaraha läheb otse võla vähendamiseks ja sellelt osalt sa enam intressi ei maksa. Mida varem maksad, seda rohkem säästad.",
      },
      {
        pregunta: "Kas pikem laenuperiood on parem?",
        respuesta: "Kuumakse väheneb, kuid intressi maksad kokku tunduvalt rohkem. Võrdle enne otsustamist mõlemat arvu.",
      },
      {
        pregunta: "Miks panga arvutatud kuumakse on teistsugune?",
        respuesta:
          "Laenuandja lisab sageli tasusid, kindlustuse või makse või kasutab reklaamist erinevat intressi. Võrdle pakkumisi krediidi kulukuse määra ja kogukulu järgi, mitte ainult nominaalintressi järgi.",
      },
    ],
    glosario: [
      { termino: "Laenujääk", definicion: "Laenu osa, mida sa ei ole veel tagasi maksnud." },
      { termino: "Nominaalintress", definicion: "Aastaintress, mis jagatakse 12 kuuga, et saada iga kuu intress." },
      { termino: "Põhiosa", definicion: "Makse osa, mis vähendab võlga." },
    ],
  };
};
