import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator za pravilo trojno",
    title: tituloQueEntre(`Pravilo trojno: kalkulator ${GRAMATICA.sr.para(ctx.nombrePais)}`, "Pravilo trojno: kalkulator proporcije", "Pravilo trojno"),
    description: "Rešite direktnu i obrnutu proporciju za tren. Unesite tri poznate vrednosti i dobijate četvrtu, zajedno sa postupkom računa.",
    intro: [
      "Pravilo trojno se koristi kada se dve veličine menjaju zajedno, a poznate su tri od četiri vrednosti.",
      "Izaberite direktnu ili obrnutu proporciju, popunite A, B i C i kalkulator izračunava X.",
    ],
    comoSeCalcula: [
      "Direktna proporcija: X = B × C ÷ A. Koristi se kada obe veličine rastu zajedno (više kilograma, viša cena).",
      "Obrnuta proporcija: X = A × B ÷ C. Koristi se kada jedna raste, a druga opada (više radnika, manje dana).",
    ],
    ejemplo: [
      `Ako 3 kilograma koštaju ${m(precio3)}, 5 kilograma košta ${m((precio3 * 5) / 3)}.`,
      "Ako je za krečenje kuće sa 4 radnika potrebno 12 dana, sa 6 radnika je potrebno 8 dana.",
    ],
    faq: [
      {
        pregunta: "Kako da znam da li je proporcija direktna ili obrnuta?",
        respuesta: "Ako jedna veličina raste zajedno sa drugom, proporcija je direktna. Ako jedna opada dok druga raste, proporcija je obrnuta.",
      },
      {
        pregunta: "Kako se pravilo trojno računa ručno?",
        respuesta: `Pomnožite unakrsno dve poznate vrednosti i podelite preostalom. Ako 3 odgovara broju 600, onda 5 odgovara broju 600 × 5 ÷ 3 = ${formatearNumero(ctx, (600 * 5) / 3)}.`,
      },
      {
        pregunta: "Da li pravilo trojno važi i za procente?",
        respuesta: "Važi. Ako je 200 jednako 100%, onda je 50 jednako 25%: to je direktna proporcija sa A = 200, B = 100 i C = 50.",
      },
    ],
    glosario: [
      { termino: "Direktna proporcija", definicion: "Obe veličine zajedno rastu ili zajedno opadaju." },
      { termino: "Obrnuta proporcija", definicion: "Jedna veličina raste kada druga opada." },
    ],
  };
};
