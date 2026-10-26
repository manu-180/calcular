import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Ovulációs kalkulátor: peteérés és termékeny napok",
    title: tituloQueEntre("Ovulációs kalkulátor: peteérés és termékeny napok", "Ovulációs kalkulátor"),
    description: "Számold ki a peteérés napját, a termékeny napokat és a következő menstruáció időpontját, a következő három ciklusra is.",
    intro: [
      "Add meg az utolsó menstruációd első napját és a ciklusod hosszát. Látod a peteérés várható napját, a termékeny napokat és a következő menstruációt.",
      "Ez rendszeres ciklusra szóló becslés. Nem fogamzásgátló módszer, és nem helyettesíti az orvossal vagy nőgyógyásszal való konzultációt.",
    ],
    comoSeCalcula: [
      `A peteérés általában ${FASE_LUTEA} nappal a következő menstruáció előtt történik: az utolsó menstruáció első napja + ciklushossz − ${FASE_LUTEA} nap.`,
      "A termékeny időszak a peteérés előtti 5 naptól a peteérés utáni napig tart, mert a spermiumok akár 5 napig is életben maradhatnak.",
      "A következő menstruáció egy ciklussal az utolsó után várható.",
    ],
    ejemplo: [
      `Ha az utolsó menstruáció ${f(fum)} napján kezdődött, és a ciklus 28 napos, a peteérés várható napja: ${f(aFecha(v.ovulacion))}`,
      `A termékeny napok ${f(aFecha(v.desde))} és ${f(aFecha(v.hasta))} között vannak, a következő menstruáció várható napja: ${f(aFecha(v.proxima))}`,
    ],
    faq: [
      {
        pregunta: "Melyek a legtermékenyebb napok?",
        respuesta: "A peteérés előtti két-három nap és maga a peteérés napja. A teljes termékeny időszak nagyjából 6 nap.",
      },
      {
        pregunta: "Rendszertelen ciklusnál is működik a számítás?",
        respuesta: "Ad egy képet, de kevésbé pontosat. Rendszertelen ciklusnál a peteérés hónapról hónapra több nappal is eltolódhat.",
      },
      {
        pregunta: "Használhatom fogamzásgátlásra?",
        respuesta: "Nem. A becslés közelítő, és a peteérés korábban vagy később is bekövetkezhet. A nem kívánt terhesség ellen használj fogamzásgátlót, és beszélj orvossal.",
      },
    ],
    glosario: [
      { termino: "Peteérés (ovuláció)", definicion: "A petesejt kiszabadulása a petefészekből." },
      { termino: "Termékeny napok", definicion: "A ciklus azon napjai, amikor teherbe lehet esni." },
    ],
  };
};
