import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `Taras 10 × 10 ft o grubości 4 in wymaga ${n(ft3)} ft³ betonu, czyli ${n(ft3 / 27)} jarda sześciennego.`,
          `Przy mieszance odniesienia to około ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb cementu.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `Płyta 4 × 3 m o grubości 10 cm wymaga ${n(volumen, 1)} m³ betonu.`,
          `Przy mieszance odniesienia to około ${n(MEZCLA.cementoKg * volumen, 0)} kg cementu, ${n(MEZCLA.arenaM3 * volumen)} m³ piasku i ${n(MEZCLA.piedraM3 * volumen)} m³ żwiru.`,
        ];
      })();
  return {
    h1: "Kalkulator betonu",
    title: tituloQueEntre(
      `Kalkulator betonu: ile betonu i cementu potrzeba | ${ctx.nombrePais}`,
      `Kalkulator betonu | ${ctx.nombrePais}`,
      "Kalkulator betonu",
    ),
    description: `Policz, ile betonu potrzebujesz na płytę, w ${imperial ? "jardach sześciennych" : "metrach sześciennych"}, i mniej więcej ile cementu, piasku i żwiru kupić.`,
    intro: [
      "Wpisz długość, szerokość i grubość. Zobaczysz objętość betonu i orientacyjną ilość materiałów do jego przygotowania.",
      "Ilość materiałów zależy od receptury. Kalkulator przyjmuje jako odniesienie mieszankę ogólnego przeznaczenia 1:2:3.",
    ],
    comoSeCalcula: [
      imperial
        ? "Objętość = długość × szerokość × grubość, z grubością w stopach. Stopy sześcienne podziel przez 27, żeby dostać jardy sześcienne."
        : "Objętość = długość × szerokość × grubość, z grubością w metrach.",
      "Do wyniku dodajemy zapas na nierówności podłoża i straty.",
      `Na 1 m³: około ${MEZCLA.cementoKg} kg cementu, ${n(MEZCLA.arenaM3)} m³ piasku, ${n(MEZCLA.piedraM3, 1)} m³ żwiru i ${MEZCLA.aguaL} litrów wody.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Ile cementu jest w metrze sześciennym betonu?",
        respuesta: `Przy mieszance 1:2:3 około ${MEZCLA.cementoKg} kg. Beton o wyższej klasie wytrzymałości potrzebuje więcej cementu.`,
      },
      {
        pregunta: "Ile worków cementu na 1 m³ betonu?",
        respuesta: `Przy około ${MEZCLA.cementoKg} kg cementu na m³ to ${Math.ceil(MEZCLA.cementoKg / 25)} worków po 25 kg.`,
      },
      {
        pregunta: "Czy zamówić beton z betoniarni?",
        respuesta: "Przy dużych wylewkach zwykle tak: beton z wytwórni jest bardziej jednorodny i praca idzie szybciej. Przy małych pracach często miesza się go na miejscu w podanych proporcjach.",
      },
    ],
    glosario: [
      { termino: "Receptura", definicion: "Proporcje cementu, piasku, żwiru i wody w mieszance." },
      { termino: "Metr sześcienny (m³)", definicion: "Objętość sześcianu o boku 1 metra. W tej jednostce zamawia się beton." },
    ],
  };
};
