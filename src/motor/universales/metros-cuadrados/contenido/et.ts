import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: imperial ? "Arvuta ruutjalad" : "Arvuta ruutmeetrid",
    title: tituloQueEntre(
      `Ruutmeetrite kalkulaator: toa ja krundi pindala | ${ctx.nombrePais}`,
      `Ruutmeetrite kalkulaator | ${ctx.nombrePais}`,
      "Ruutmeetrite kalkulaator",
    ),
    description: "Arvuta toa, põranda või krundi pindala: ristkülikud, kolmnurgad ja ringid ning kuni viis kujundit kokku liidetuna.",
    intro: [
      "Vali kuju ja sisesta mõõdud. Kui ala ei ole lihtne ristkülik, jaga see osadeks ja kalkulaator liidab need kokku.",
      imperial ? "Näed tulemust ka ruutmeetrites." : "Näed tulemust ka ruutjalgades.",
    ],
    comoSeCalcula: [
      "Ristkülik: pikkus × laius.",
      "Kolmnurk: alus × kõrgus ÷ 2.",
      `Ring: π × raadius × raadius, kus raadius on pool läbimõõdust. 1 m² on ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `L-kujulise elutoa saab jagada ristkülikuteks 16 × 12 ft ja 10 × 6 ft. Pindala on kokku ${n(enL, 0)} ft².`
        : `L-kujulise elutoa saab jagada ristkülikuteks 5 × 4 m ja 3 × 2 m. Pindala on kokku ${n(enL, 0)} m².`,
      `Ümmargune laud läbimõõduga 2 ${u} võtab ruumi ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: "Kuidas arvutada toa pindala?",
        respuesta: imperial
          ? `Mõõda pikkus ja laius jalgades ja korruta need omavahel. Tuba mõõtudega 12 × 10 ft on ${n(area("rectangulo", 12, 10), 0)} ft².`
          : `Mõõda pikkus ja laius meetrites ja korruta need omavahel. Tuba mõõtudega 4 × 3 m on ${n(area("rectangulo", 4, 3), 0)} m².`,
      },
      {
        pregunta: "Aga kui mõõdud on sentimeetrites?",
        respuesta: `Teisenda need kõigepealt: jaga sentimeetrid sajaga, et saada meetrid, või tollid arvuga 12, et saada jalad. 350 cm on ${n(350 / 100, 1)} m.`,
      },
      {
        pregunta: "Kuidas teisendada ruutmeetrid ruutjalgadeks?",
        respuesta: `Korruta arvuga ${n(FT2_POR_M2)}. 20 m² on ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Ruutmeeter (m²)", definicion: "Sellise ruudu pindala, mille iga külg on 1 meeter." },
      { termino: "Ruutjalg (ft²)", definicion: "Sellise ruudu pindala, mille iga külg on 1 jalg." },
    ],
  };
};
