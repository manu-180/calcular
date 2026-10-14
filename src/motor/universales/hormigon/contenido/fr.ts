import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `Une dalle de 10 × 10 ft et 4 in d’épaisseur demande ${n(ft3)} ft³ de béton, soit ${n(ft3 / 27)} yards cubes.`,
          `Avec le dosage de référence, cela représente environ ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb de ciment.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `Une dalle de 4 × 3 m et 10 cm d’épaisseur demande ${n(volumen, 1)} m³ de béton.`,
          `Avec le dosage de référence, cela représente environ ${n(MEZCLA.cementoKg * volumen, 0)} kg de ciment, ${n(MEZCLA.arenaM3 * volumen)} m³ de sable et ${n(MEZCLA.piedraM3 * volumen)} m³ de gravier.`,
        ];
      })();
  return {
    h1: "Calcul de béton pour une dalle",
    title: tituloQueEntre(`Calcul de béton pour une dalle (${ctx.nombrePais})`, `Calcul de béton (${ctx.nombrePais})`, "Calcul de béton"),
    description: `Calculez le volume de béton d’une dalle en ${imperial ? "yards cubes" : "mètres cubes"}, et à peu près combien de ciment, de sable et de gravier acheter.`,
    intro: [
      "Saisissez la longueur, la largeur et l’épaisseur. Vous voyez le volume de béton et les matériaux approximatifs pour le préparer.",
      `Les quantités dépendent du dosage. Ce calcul prend comme référence un béton courant dosé à ${MEZCLA.cementoKg} kg/m³.`,
    ],
    comoSeCalcula: [
      imperial
        ? "Volume = longueur × largeur × épaisseur, l’épaisseur en pieds. Divisez les pieds cubes par 27 pour obtenir des yards cubes."
        : "Volume = longueur × largeur × épaisseur, l’épaisseur en mètres.",
      "On ajoute la marge pour les irrégularités du sol et les pertes.",
      `Par m³ : environ ${MEZCLA.cementoKg} kg de ciment, ${n(MEZCLA.arenaM3)} m³ de sable, ${n(MEZCLA.piedraM3, 1)} m³ de gravier et ${MEZCLA.aguaL} litres d’eau.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Combien de sacs de ciment pour 1 m³ de béton ?",
        respuesta: `Avec un dosage à ${MEZCLA.cementoKg} kg/m³, il faut 10 sacs de 35 kg ou 14 sacs de 25 kg. Indiquez le poids de vos sacs dans le calculateur.`,
      },
      {
        pregunta: "Quel dosage choisir ?",
        respuesta: `Un dosage à ${MEZCLA.cementoKg} kg/m³ convient à la plupart des dalles et terrasses. Un béton plus résistant demande plus de ciment.`,
      },
      {
        pregunta: "Faut-il commander du béton prêt à l’emploi ?",
        respuesta: "Pour un gros volume, le béton livré en toupie est en général plus régulier et plus rapide. Pour un petit chantier, on le prépare souvent sur place avec ces quantités.",
      },
    ],
    glosario: [
      { termino: "Dosage", definicion: "La quantité de ciment par mètre cube de béton, et plus largement les proportions du mélange." },
      { termino: "Dalle", definicion: "Une plaque de béton coulée au sol, pour une terrasse, un garage ou un abri." },
      { termino: "Toupie", definicion: "Le camion qui livre le béton prêt à l’emploi en le gardant en rotation." },
    ],
  };
};
