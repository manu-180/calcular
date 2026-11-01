import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: imperial ? "Izračun površine v kvadratnih čevljih" : "Izračun kvadratnih metrov",
    title: imperial
      ? tituloQueEntre(`Površina v kvadratnih čevljih ${GRAMATICA.sl.para(ctx.nombrePais)}`, "Izračun površine v kvadratnih čevljih")
      : tituloQueEntre(
          `Izračun kvadratnih metrov stanovanja ${GRAMATICA.sl.para(ctx.nombrePais)}`,
          "Izračun kvadratnih metrov: površina v m²",
          "Izračun kvadratnih metrov",
        ),
    description:
      "Izračunajte površino prostora, tal ali zemljišča: pravokotniki, trikotniki in krogi, sešteje se lahko do pet oblik.",
    intro: [
      "Izberite obliko in vnesite njene mere. Če prostor ni navaden pravokotnik, ga razdelite na dele in kalkulator jih bo seštel.",
      imperial ? "Rezultat se prikaže tudi v kvadratnih metrih." : "Rezultat se prikaže tudi v kvadratnih čevljih.",
    ],
    comoSeCalcula: [
      "Pravokotnik: dolžina × širina.",
      "Trikotnik: osnovnica × višina ÷ 2.",
      `Krog: π × polmer × polmer, pri čemer je polmer polovica premera. 1 m² je ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `Dnevno sobo v obliki črke L lahko razdelite na pravokotnik 16 × 12 ft in pravokotnik 10 × 6 ft. Skupaj je to ${n(enL, 0)} ft².`
        : `Dnevno sobo v obliki črke L lahko razdelite na pravokotnik 5 × 4 m in pravokotnik 3 × 2 m. Skupaj je to ${n(enL, 0)} m².`,
      `Okrogla miza s premerom 2 ${u} zavzame ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: imperial ? "Kako izračunam površino prostora v čevljih?" : "Kako izračunam kvadratne metre prostora?",
        respuesta: imperial
          ? "Izmerite dolžino in širino v čevljih in ju zmnožite. Prostor 12 × 10 ft ima 120 ft²."
          : "Izmerite dolžino in širino v metrih in ju zmnožite. Soba 4 × 3 m ima 12 m².",
      },
      {
        pregunta: "Kaj, če so mere v centimetrih?",
        respuesta: `Najprej jih pretvorite: centimetre delite s 100 in dobili boste metre (palce delite z 12 in dobili boste čevlje). 350 cm je ${n(3.5, 1)} m.`,
      },
      {
        pregunta: "Kako pretvorim kvadratne metre v kvadratne čevlje?",
        respuesta: `Pomnožite jih s številom ${n(FT2_POR_M2)}. 20 m² je ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Kvadratni meter (m²)", definicion: "Površina kvadrata s stranico 1 meter." },
      { termino: "Kvadratni čevelj (ft²)", definicion: "Površina kvadrata s stranico 1 čevelj." },
    ],
  };
};
