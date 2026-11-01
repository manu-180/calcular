import { deRo } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `O terasă de 10 × 10 ft, groasă de 4 in, necesită ${n(ft3)} ft³ de beton: ${n(ft3 / 27)} yarzi cubi.`,
          `Cu rețeta de referință, asta înseamnă circa ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb de ciment.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        const kg = MEZCLA.cementoKg * volumen;
        return [
          `O placă de 4 × 3 m, groasă de 10 cm, necesită ${n(volumen, 1)} m³ de beton.`,
          `Cu rețeta de referință, asta înseamnă circa ${n(kg, 0)} ${deRo(n(kg, 0))}kg de ciment, ${n(MEZCLA.arenaM3 * volumen)} m³ de nisip și ${n(MEZCLA.piedraM3 * volumen)} m³ de pietriș.`,
        ];
      })();
  return {
    h1: "Calculator beton",
    title: tituloQueEntre(`Calculator beton: ${ctx.nombrePais}`, "Calculator beton"),
    description: `Calculați cât beton vă trebuie pentru o placă, în ${imperial ? "yarzi cubi" : "metri cubi"}, și aproximativ cât ciment, nisip și pietriș să cumpărați.`,
    intro: [
      "Introduceți lungimea, lățimea și grosimea. Vedeți volumul de beton și materialele aproximative pentru preparare.",
      "Materialele depind de rețetă. Acest calculator folosește ca referință un beton obișnuit 1:2:3.",
    ],
    comoSeCalcula: [
      imperial ? "Volum = lungime × lățime × grosime, cu grosimea în picioare. Împărțiți picioarele cubi la 27 pentru yarzi cubi." : "Volum = lungime × lățime × grosime, cu grosimea în metri.",
      "Se adaugă rezerva pentru teren denivelat și pierderi.",
      `Pe m³: circa ${MEZCLA.cementoKg} ${deRo(MEZCLA.cementoKg)}kg de ciment, ${n(MEZCLA.arenaM3)} m³ de nisip, ${n(MEZCLA.piedraM3, 1)} m³ de pietriș și ${MEZCLA.aguaL} ${deRo(MEZCLA.aguaL)}litri de apă.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Câți saci de ciment intră într-un metru cub de beton?",
        respuesta: `Cu o rețetă 1:2:3, circa ${MEZCLA.cementoKg} ${deRo(MEZCLA.cementoKg)}kg de ciment, adică în jur de ${Math.ceil(MEZCLA.cementoKg / 40)} saci de 40 kg. Un beton mai rezistent folosește mai mult ciment.`,
      },
      {
        pregunta: "Cum calculez câți metri cubi de beton îmi trebuie?",
        respuesta: "Înmulțiți lungimea cu lățimea și cu grosimea, toate în metri. O placă de 5 × 4 m și 10 cm grosime are 2 m³. Adăugați 5% până la 10% rezervă.",
      },
      {
        pregunta: "Comand beton gata preparat de la stație?",
        respuesta: "Pentru turnări mari este de obicei mai uniform și mai rapid. Pentru lucrări mici, prepararea pe șantier cu aceste cantități este o variantă des folosită.",
      },
    ],
    glosario: [
      { termino: "Rețetă de beton", definicion: "Proporția de ciment, nisip, pietriș și apă dintr-un amestec." },
      { termino: "Metru cub (m³)", definicion: "Volumul unui cub cu latura de 1 metru." },
    ],
  };
};
