import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: imperial ? "Kalkulator površine u kvadratnim stopama" : "Kalkulator kvadrature",
    title: imperial
      ? tituloQueEntre(`Površina u kvadratnim stopama ${GRAMATICA.sr.para(ctx.nombrePais)}`, "Kalkulator površine u kvadratnim stopama")
      : tituloQueEntre(
          `Kalkulator kvadrature stana ${GRAMATICA.sr.para(ctx.nombrePais)}`,
          "Kalkulator kvadrature: površina u m²",
          "Kalkulator kvadrature",
        ),
    description:
      "Izračunajte površinu prostorije, poda ili placa: pravougaonici, trouglovi i krugovi, i do pet oblika sabranih zajedno.",
    intro: [
      "Izaberite oblik i unesite njegove mere. Ako prostor nije običan pravougaonik, podelite ga na delove i kalkulator će ih sabrati.",
      imperial ? "Rezultat se prikazuje i u kvadratnim metrima." : "Rezultat se prikazuje i u kvadratnim stopama.",
    ],
    comoSeCalcula: [
      "Pravougaonik: dužina × širina.",
      "Trougao: osnovica × visina ÷ 2.",
      `Krug: π × poluprečnik × poluprečnik, gde je poluprečnik polovina prečnika. 1 m² iznosi ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `Dnevna soba u obliku slova L može da se podeli na pravougaonik 16 × 12 ft i pravougaonik 10 × 6 ft. Zajedno to je ${n(enL, 0)} ft².`
        : `Dnevna soba u obliku slova L može da se podeli na pravougaonik 5 × 4 m i pravougaonik 3 × 2 m. Zajedno to je ${n(enL, 0)} m².`,
      `Okrugli sto prečnika 2 ${u} zauzima ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: imperial ? "Kako izračunati površinu prostorije u stopama?" : "Kako izračunati kvadraturu prostorije?",
        respuesta: imperial
          ? "Izmerite dužinu i širinu u stopama i pomnožite ih. Prostorija 12 × 10 ft ima 120 ft²."
          : "Izmerite dužinu i širinu u metrima i pomnožite ih. Soba 4 × 3 m ima 12 m².",
      },
      {
        pregunta: "Šta ako su mere u centimetrima?",
        respuesta: `Prvo ih pretvorite: centimetre podelite sa 100 i dobijate metre (inče podelite sa 12 i dobijate stope). 350 cm je ${n(3.5, 1)} m.`,
      },
      {
        pregunta: "Kako pretvoriti kvadratne metre u kvadratne stope?",
        respuesta: `Pomnožite ih brojem ${n(FT2_POR_M2)}. 20 m² je ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Kvadratni metar (m²)", definicion: "Površina kvadrata čija je stranica 1 metar." },
      { termino: "Kvadratna stopa (ft²)", definicion: "Površina kvadrata čija je stranica 1 stopa." },
    ],
  };
};
