import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: "Calculator metri pătrați",
    title: tituloQueEntre(`Calculator metri pătrați: ${ctx.nombrePais}`, "Calculator metri pătrați (m²) pentru suprafețe", "Calculator metri pătrați"),
    description: "Calculați suprafața unei camere, a unei pardoseli sau a unui teren: dreptunghiuri, triunghiuri și cercuri, până la cinci forme adunate.",
    intro: [
      "Alegeți forma și introduceți măsurile. Dacă spațiul nu este un simplu dreptunghi, împărțiți-l în bucăți, iar calculatorul le adună.",
      imperial ? "Rezultatul apare și în metri pătrați." : "Rezultatul apare și în picioare pătrate (ft²).",
    ],
    comoSeCalcula: [
      "Dreptunghi: lungime × lățime.",
      "Triunghi: bază × înălțime ÷ 2.",
      `Cerc: π × rază × rază, unde raza este jumătate din diametru. 1 m² înseamnă ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `O sufragerie în formă de L se poate împărți într-un dreptunghi de 16 × 12 ft și unul de 10 × 6 ft. În total sunt ${n(enL, 0)} ft².`
        : `O sufragerie în formă de L se poate împărți într-un dreptunghi de 5 × 4 m și unul de 3 × 2 m. În total sunt ${n(enL, 0)} m².`,
      `O masă rotundă cu diametrul de 2 ${u} ocupă ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: "Cum se calculează metrii pătrați ai unei camere?",
        respuesta: imperial
          ? "Măsurați lungimea și lățimea în picioare și înmulțiți-le. O cameră de 12 × 10 ft are 120 ft²."
          : "Măsurați lungimea și lățimea în metri și înmulțiți-le. O cameră de 4 × 3 m are 12 m².",
      },
      {
        pregunta: "Ce faceți dacă aveți măsurile în centimetri?",
        respuesta: `Transformați-le mai întâi: împărțiți centimetrii la 100 ca să obțineți metri (sau inch-ii la 12 ca să obțineți picioare). 350 cm înseamnă ${n(3.5, 1)} m.`,
      },
      {
        pregunta: "Cum se transformă metrii pătrați în picioare pătrate?",
        respuesta: `Înmulțiți cu ${n(FT2_POR_M2)}. 20 m² înseamnă ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Metru pătrat (m²)", definicion: "Suprafața unui pătrat cu latura de 1 metru." },
      { termino: "Picior pătrat (ft²)", definicion: "Suprafața unui pătrat cu latura de 1 picior." },
    ],
  };
};
