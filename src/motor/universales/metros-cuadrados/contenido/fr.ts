import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  const faq = [
    {
      pregunta: "Comment calculer la surface d’une pièce ?",
      respuesta: imperial
        ? "Mesurez la longueur et la largeur en pieds, puis multipliez-les. Une pièce de 12 × 10 ft fait 120 ft²."
        : "Mesurez la longueur et la largeur en mètres, puis multipliez-les. Une pièce de 4 × 3 m fait 12 m².",
    },
    {
      pregunta: "Et si mes mesures sont en centimètres ?",
      respuesta: `Convertissez-les d’abord : divisez les centimètres par 100 pour obtenir des mètres. 350 cm font ${n(3.5, 1)} m.`,
    },
    {
      pregunta: "Comment convertir des m² en pieds carrés ?",
      respuesta: `Multipliez par ${n(FT2_POR_M2)}. 20 m² font ${n(20 * FT2_POR_M2)} ft².`,
    },
  ];
  if (ctx.pais === "FR") {
    faq.push({
      pregunta: "Cette surface correspond-elle à la surface loi Carrez ?",
      respuesta: `Pas forcément. La surface loi Carrez, exigée pour vendre un lot en copropriété, ne compte pas les parties dont la hauteur sous plafond est inférieure à ${n(1.8, 2)} m. Mesurez-les à part et retirez-les.`,
    });
  }
  return {
    h1: imperial ? "Calcul de surface en pieds carrés" : "Calcul de surface en m²",
    title: imperial
      ? tituloQueEntre(`Calcul de surface en pieds carrés (${ctx.nombrePais})`, "Calcul de surface en pieds carrés")
      : tituloQueEntre(`Calcul de surface en m² (${ctx.nombrePais})`, "Calcul de surface en m²"),
    description: "Calculez la surface d’une pièce, d’un sol ou d’un terrain : rectangles, triangles et cercles, jusqu’à cinq formes additionnées.",
    intro: [
      "Choisissez une forme et saisissez ses mesures. Si l’espace n’est pas un simple rectangle, découpez-le en parties : le calcul les additionne.",
      imperial ? "Le résultat s’affiche aussi en mètres carrés." : "Le résultat s’affiche aussi en pieds carrés.",
    ],
    comoSeCalcula: [
      "Rectangle : longueur × largeur.",
      "Triangle : base × hauteur ÷ 2.",
      `Cercle : π × rayon × rayon, le rayon étant la moitié du diamètre. 1 m² vaut ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `Un séjour en L se découpe en un rectangle de 16 × 12 ft et un autre de 10 × 6 ft. Cela fait ${n(enL, 0)} ft² au total.`
        : `Un séjour en L se découpe en un rectangle de 5 × 4 m et un autre de 3 × 2 m. Cela fait ${n(enL, 0)} m² au total.`,
      `Une table ronde de 2 ${u} de diamètre occupe ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq,
    glosario: [
      { termino: "Mètre carré (m²)", definicion: "La surface d’un carré de 1 mètre de côté." },
      { termino: "Pied carré (ft²)", definicion: "La surface d’un carré de 1 pied de côté." },
    ],
  };
};
