import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Kalkulačka úvěru a půjčky",
    title: tituloQueEntre(`Kalkulačka úvěru ${GRAMATICA.cs.para(ctx.nombrePais)}`, "Kalkulačka úvěru a půjčky", "Kalkulačka úvěru"),
    description: "Spočítejte měsíční splátku úvěru, úroky celkem a celý splátkový kalendář. Uvidíte, kolik ušetříte mimořádnými splátkami.",
    intro: [
      "Než podepíšete smlouvu o úvěru, rozhodují dvě čísla: kolik budete platit měsíčně a kolik vás půjčka bude stát na úrocích.",
      "Zadejte výši úvěru, roční sazbu a dobu splácení. Pokud plánujete každý měsíc splácet něco navíc, přidejte to a uvidíte, o kolik dřív budete hotovi.",
    ],
    comoSeCalcula: [
      "Počítá se s pevnou měsíční splátkou (anuitní splácení), běžnou u spotřebitelských úvěrů, půjček na auto i hypoték.",
      "Měsíční sazba = roční sazba ÷ 12.",
      "Splátka = výše úvěru × měsíční sazba ÷ (1 − (1 + měsíční sazba) na minus počet splátek).",
      "Každý měsíc se úrok počítá z toho, co ještě dlužíte. Zbytek splátky snižuje jistinu.",
    ],
    ejemplo: [
      `Úvěr ${m(monto)} se sazbou 12 % ročně na 36 měsíců má splátku ${m(cuota36)}. Na úrocích zaplatíte celkem ${m(interesesTotales(monto, 12, 36))}.`,
      `Při prodloužení na 60 měsíců klesne splátka na ${m(cuota60)}, ale úroky vzrostou na ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Jak se počítá splátka úvěru?",
        respuesta:
          "Podle vzorce pro anuitní splácení. Všechny splátky jsou stejné, ale na začátku tvoří většinu splátky úrok a ke konci jistina. Proto dluh zpočátku klesá pomalu.",
      },
      {
        pregunta: "Vyplatí se splatit úvěr předčasně?",
        respuesta:
          "Obvykle ano, pokud za to věřitel nežádá vysoký poplatek. Peníze navíc jdou rovnou na jistinu a z té se už úrok nepočítá. Čím dřív splatíte, tím víc ušetříte.",
      },
      {
        pregunta: "Je delší doba splácení výhodnější?",
        respuesta: "Splátka je nižší, ale na úrocích zaplatíte celkem mnohem víc. Než se rozhodnete, porovnejte obě čísla.",
      },
      {
        pregunta: "Proč mi banka uvádí jinou splátku?",
        respuesta:
          "Banky a jiní věřitelé často připočítávají pojištění, poplatky za vedení úvěru nebo počítají s jinou sazbou, než jakou inzerují. Nabídky porovnávejte podle RPSN a celkové částky, ne jen podle úrokové sazby.",
      },
    ],
    glosario: [
      { termino: "Jistina", definicion: "Část dluhu, kterou jste ještě nesplatili." },
      { termino: "RPSN", definicion: "Roční procentní sazba nákladů. Zahrnuje úrok i poplatky, takže ukazuje skutečnou cenu úvěru." },
      { termino: "Úmor", definicion: "Část každé splátky, která snižuje dluh." },
    ],
  };
};
