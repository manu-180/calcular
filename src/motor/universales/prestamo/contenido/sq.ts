import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Kalkulator kredie",
    title: tituloQueEntre(`Kalkulator kredie: ${ctx.nombrePais}`, "Kalkulator kredie: kësti mujor dhe interesi", "Kalkulator kredie"),
    description: "Llogaritni këstin mujor të një kredie, interesin total dhe planin e plotë të shlyerjes. Shikoni sa kurseni me pagesa të parakohshme.",
    intro: [
      "Para se të nënshkruani për një kredi konsumatore, rëndësi kanë dy shifra: sa paguani çdo muaj dhe sa ju kushton kredia në interes.",
      "Vendosni shumën, interesin vjetor dhe afatin. Nëse dëshironi të paguani pak më shumë çdo muaj, shtoni shumën dhe shikoni sa më herët e mbaroni.",
    ],
    comoSeCalcula: [
      "Përdoret kësti i barabartë (anuitet), metoda e zakonshme te kreditë konsumatore, për makinë dhe për shtëpi.",
      "Norma mujore e interesit = interesi vjetor ÷ 12.",
      "Kësti = shuma × interesi mujor ÷ (1 − (1 + interesi mujor) në fuqi minus numri i kësteve).",
      "Çdo muaj, interesi llogaritet mbi atë që keni ende borxh. Pjesa tjetër e këstit ul principalin.",
    ],
    ejemplo: [
      `Një kredi prej ${m(monto)} me një interes prej 12% në vit, për 36 muaj, ka një këst prej ${m(cuota36)}. Gjithsej paguani ${m(interesesTotales(monto, 12, 36))} interes.`,
      `Për 60 muaj, kësti bie në ${m(cuota60)}, por interesi total ngjitet në ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Si llogaritet kësti i kredisë?",
        respuesta:
          "Me formulën e kësteve të barabarta. Të gjitha këstet janë njësoj, por të parët janë pothuajse vetëm interes, ndërsa të fundit pothuajse vetëm principal. Prandaj teprica ulet ngadalë në fillim.",
      },
      {
        pregunta: "A ia vlen ta shlyeni kredinë para afatit?",
        respuesta:
          "Zakonisht po, nëse nuk ka një komision të madh për shlyerje të parakohshme. Paratë shtesë shkojnë drejt e te principali dhe nuk sjellin më interes për bankën. Sa më herët të paguani, aq më shumë kurseni.",
      },
      {
        pregunta: "A është më mirë një afat më i gjatë?",
        respuesta: "Kësti është më i ulët, por paguani shumë më tepër interes gjithsej. Krahasoni të dyja shifrat para se të vendosni.",
      },
      {
        pregunta: "Pse banka më tregon një këst tjetër?",
        respuesta:
          "Bankat shpesh shtojnë sigurime, komisione ose tarifa, ose përdorin një interes të ndryshëm nga ai i reklamës. Krahasoni ofertat sipas normës efektive vjetore dhe kostos totale të kredisë, jo vetëm sipas interesit.",
      },
    ],
    glosario: [
      { termino: "Principal", definicion: "Pjesa e borxhit që nuk e keni shlyer ende." },
      { termino: "Norma efektive vjetore", definicion: "Kostoja totale e kredisë në vit, me interes, komisione dhe sigurime të detyrueshme." },
      { termino: "Shlyerje", definicion: "Pjesa e çdo kësti që ul borxhin." },
    ],
  };
};
