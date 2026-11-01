import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator za pravilo trojno",
    title: tituloQueEntre(`Pravilo trojno: kalkulator ${GRAMATICA.hr.para(ctx.nombrePais)}`, "Pravilo trojno: kalkulator proporcije", "Pravilo trojno"),
    description: "Riješite upravnu i obrnutu proporcionalnost u trenu. Unesite tri poznate vrijednosti i dobivate četvrtu, zajedno s postupkom računa.",
    intro: [
      "Pravilo trojno koristi se kada se dvije veličine mijenjaju zajedno, a poznate su tri od četiri vrijednosti.",
      "Odaberite upravnu ili obrnutu proporcionalnost, ispunite A, B i C i kalkulator izračunava X.",
    ],
    comoSeCalcula: [
      "Upravna proporcionalnost: X = B × C ÷ A. Koristi se kada obje veličine rastu zajedno (više kilograma, viša cijena).",
      "Obrnuta proporcionalnost: X = A × B ÷ C. Koristi se kada jedna raste, a druga pada (više radnika, manje dana).",
    ],
    ejemplo: [
      `Ako 3 kilograma koštaju ${m(precio3)}, 5 kilograma košta ${m((precio3 * 5) / 3)}.`,
      "Ako 4 radnika kuću oboje za 12 dana, 6 radnika obojit će je za 8 dana.",
    ],
    faq: [
      {
        pregunta: "Kako znati je li proporcionalnost upravna ili obrnuta?",
        respuesta: "Ako jedna veličina raste zajedno s drugom, proporcionalnost je upravna. Ako jedna pada dok druga raste, proporcionalnost je obrnuta.",
      },
      {
        pregunta: "Kako se pravilo trojno računa ručno?",
        respuesta: `Pomnožite unakrsno dvije poznate vrijednosti i podijelite preostalom. Ako 3 odgovara broju 600, onda 5 odgovara broju 600 × 5 ÷ 3 = ${formatearNumero(ctx, (600 * 5) / 3)}.`,
      },
      {
        pregunta: "Vrijedi li pravilo trojno i za postotke?",
        respuesta: "Vrijedi. Ako je 200 jednako 100 %, onda je 50 jednako 25 %: to je upravna proporcionalnost uz A = 200, B = 100 i C = 50.",
      },
    ],
    glosario: [
      { termino: "Upravna proporcionalnost", definicion: "Obje veličine zajedno rastu ili zajedno padaju." },
      { termino: "Obrnuta proporcionalnost", definicion: "Jedna veličina raste kada druga pada." },
    ],
  };
};
