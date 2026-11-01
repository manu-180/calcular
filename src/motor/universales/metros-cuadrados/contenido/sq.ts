import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: "Kalkulator metra katrorë",
    title: tituloQueEntre(`Kalkulator metra katrorë: ${ctx.nombrePais}`, "Kalkulator metra katrorë (m²) për sipërfaqe", "Kalkulator metra katrorë"),
    description: "Llogaritni sipërfaqen e një dhome, dyshemeje ose toke: drejtkëndësha, trekëndësha dhe rrathë, deri në pesë forma të mbledhura.",
    intro: [
      "Zgjidhni formën dhe vendosni masat. Nëse hapësira nuk është një drejtkëndësh i thjeshtë, ndajeni në pjesë dhe kalkulatori i mbledh.",
      imperial ? "Rezultati shfaqet edhe në metra katrorë." : "Rezultati shfaqet edhe në këmbë katrore (ft²).",
    ],
    comoSeCalcula: [
      "Drejtkëndësh: gjatësi × gjerësi.",
      "Trekëndësh: bazë × lartësi ÷ 2.",
      `Rreth: π × rreze × rreze, ku rrezja është gjysma e diametrit. 1 m² është ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `Një dhomë ndenjeje në formë L mund të ndahet në një drejtkëndësh 16 × 12 ft dhe një tjetër 10 × 6 ft. Gjithsej janë ${n(enL, 0)} ft².`
        : `Një dhomë ndenjeje në formë L mund të ndahet në një drejtkëndësh 5 × 4 m dhe një tjetër 3 × 2 m. Gjithsej janë ${n(enL, 0)} m².`,
      `Një tavolinë e rrumbullakët me diametër 2 ${u} zë ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: "Si llogariten metrat katrorë të një dhome?",
        respuesta: imperial
          ? "Matni gjatësinë dhe gjerësinë në këmbë dhe shumëzojini. Një dhomë 12 × 10 ft ka 120 ft²."
          : "Matni gjatësinë dhe gjerësinë në metra dhe shumëzojini. Një dhomë 4 × 3 m ka 12 m².",
      },
      {
        pregunta: "Çfarë bëni nëse i keni masat në centimetra?",
        respuesta: `Konvertojini fillimisht: pjesëtoni centimetrat me 100 për të marrë metra (ose inçët me 12 për të marrë këmbë). 350 cm janë ${n(3.5, 1)} m.`,
      },
      {
        pregunta: "Si konvertohen metrat katrorë në këmbë katrore?",
        respuesta: `Shumëzoni me ${n(FT2_POR_M2)}. 20 m² janë ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Metër katror (m²)", definicion: "Sipërfaqja e një katrori me brinjë 1 metër." },
      { termino: "Këmbë katrore (ft²)", definicion: "Sipërfaqja e një katrori me brinjë 1 këmbë." },
    ],
  };
};
