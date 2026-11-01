import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator za sklepni račun",
    title: tituloQueEntre(`Sklepni račun: kalkulator ${GRAMATICA.sl.para(ctx.nombrePais)}`, "Sklepni račun: izračun sorazmerja", "Sklepni račun"),
    description: "Hitro rešite premo in obratno sorazmerje. Vnesite tri znane vrednosti in dobite četrto, skupaj s postopkom računa.",
    intro: [
      "Sklepni račun uporabite, ko se dve količini spreminjata skupaj in poznate tri od štirih vrednosti.",
      "Izberite premo ali obratno sorazmerje, izpolnite A, B in C, kalkulator pa izračuna X.",
    ],
    comoSeCalcula: [
      "Premo sorazmerje: X = B × C ÷ A. Uporabite ga, ko obe količini rasteta skupaj (več kilogramov, višja cena).",
      "Obratno sorazmerje: X = A × B ÷ C. Uporabite ga, ko ena količina raste, druga pa pada (več delavcev, manj dni).",
    ],
    ejemplo: [
      `Če 3 kilogrami stanejo ${m(precio3)}, 5 kilogramov stane ${m((precio3 * 5) / 3)}.`,
      "Če 4 delavci prepleskajo hišo v 12 dneh, jo 6 delavcev prepleska v 8 dneh.",
    ],
    faq: [
      {
        pregunta: "Kako ugotoviti, ali je sorazmerje premo ali obratno?",
        respuesta: "Če ena količina raste skupaj z drugo, je sorazmerje premo. Če ena pada, medtem ko druga raste, je sorazmerje obratno.",
      },
      {
        pregunta: "Kako se sklepni račun izračuna ročno?",
        respuesta: `Navzkrižno zmnožite dve znani vrednosti in delite s preostalo. Če številu 3 ustreza 600, potem številu 5 ustreza 600 × 5 ÷ 3 = ${formatearNumero(ctx, (600 * 5) / 3)}.`,
      },
      {
        pregunta: "Ali sklepni račun velja tudi za odstotke?",
        respuesta: "Velja. Če je 200 enako 100 %, je 50 enako 25 %: to je premo sorazmerje, kjer je A = 200, B = 100 in C = 50.",
      },
    ],
    glosario: [
      { termino: "Premo sorazmerje", definicion: "Obe količini skupaj rasteta ali skupaj padata." },
      { termino: "Obratno sorazmerje", definicion: "Ena količina raste, ko druga pada." },
    ],
  };
};
