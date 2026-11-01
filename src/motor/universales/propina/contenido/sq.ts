import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.1;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator bakshishi",
    title: tituloQueEntre(`Kalkulator bakshishi: ${ctx.nombrePais}`, "Kalkulator bakshishi dhe ndarja e faturës", "Kalkulator bakshishi"),
    description: "Llogaritni bakshishin, totalin e faturës dhe sa paguan secili kur e ndani faturën. Mund ta rrumbullakosni lart pjesën e secilit.",
    intro: [
      "Vendosni faturën, përqindjen e bakshishit dhe sa persona paguajnë. Shikoni bakshishin, totalin dhe pjesën e secilit.",
      "Nëse preferoni shuma të rrumbullakëta, kalkulatori e rrumbullakos lart pjesën e secilit dhe diferenca i shtohet bakshishit.",
    ],
    comoSeCalcula: [
      "Bakshishi = fatura × përqindja e bakshishit ÷ 100.",
      "Totali = fatura + bakshishi.",
      "Pjesa e secilit = totali i pjesëtuar me numrin e personave.",
    ],
    ejemplo: [
      `Te një faturë prej ${m(cuenta)} me bakshish 10% shtohen ${m(propina)}, për një total prej ${m(cuenta + propina)}.`,
      `E ndarë për 3 persona, secili paguan ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Sa bakshish lihet?",
        respuesta: `Varet nga zakoni i vendit. Kontrolloni çfarë është e zakonshme ${GRAMATICA.sq.en(ctx.nombrePais)} dhe nëse fatura përfshin tashmë një tarifë shërbimi.`,
      },
      {
        pregunta: "A llogaritet bakshishi nga shuma me TVSH apo pa TVSH?",
        respuesta: "Zakonisht llogaritet nga totali i faturës. Nëse preferoni ta llogaritni nga shuma pa taksa, vendosni atë shumë.",
      },
      {
        pregunta: "Si ta llogaris shpejt një bakshish prej 10%?",
        respuesta: "Zhvendosni presjen një shifër majtas. Te një faturë prej 85, bakshishi 10% është 8,50. Për 15%, shtoni edhe gjysmën e kësaj shume.",
      },
    ],
    glosario: [
      { termino: "Bakshish", definicion: "Një shumë shtesë që lini për shërbimin, mbi çmimin e konsumit." },
      { termino: "Tarifë shërbimi", definicion: "Një shumë që lokali e ka shtuar tashmë në faturë për shërbimin." },
    ],
  };
};
