import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `10 × 10 ft ölçüsünde, 4 in kalınlığında bir avlu için gereken beton ${n(ft3)} ft³, yani ${n(ft3 / 27)} yarda küp.`,
          `Örnek karışımla bunun için gereken çimento yaklaşık ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `4 × 3 m ölçüsünde, 10 cm kalınlığında bir beton döşeme için gereken beton: ${n(volumen, 1)} m³.`,
          `Örnek karışımla bunun için yaklaşık ${n(MEZCLA.cementoKg * volumen, 0)} kg çimento, ${n(MEZCLA.arenaM3 * volumen)} m³ kum ve ${n(MEZCLA.piedraM3 * volumen)} m³ mıcır gerekir.`,
        ];
      })();
  return {
    h1: "Beton hesaplama",
    title: tituloQueEntre(`Beton hesaplama ${ctx.nombrePais}: kaç m³ beton gerekir`, `Beton hesaplama ${ctx.nombrePais}`, "Beton ve çimento hesaplama", "Beton hesaplama"),
    description: `Bir beton döşeme için ne kadar beton gerektiğini ${imperial ? "yarda küp" : "metreküp"} olarak ve yaklaşık ne kadar çimento, kum ve mıcır almanız gerektiğini hesaplayın.`,
    intro: [
      "Uzunluğu, genişliği ve kalınlığı girin. Beton hacmini ve karışım için gereken yaklaşık malzemeyi görürsünüz.",
      "Malzeme miktarı karışım oranına bağlıdır. Bu hesaplama, örnek olarak genel amaçlı 1:2:3 karışımı kullanır.",
    ],
    comoSeCalcula: [
      imperial
        ? "Hacim = uzunluk × genişlik × kalınlık; kalınlık fit olarak. Fit küp 27'ye bölünerek yarda küp bulunur."
        : "Hacim = uzunluk × genişlik × kalınlık; kalınlık metre olarak.",
      "Düzgün olmayan zemin ve dökülen beton için ek pay eklenir.",
      `Metreküp başına yaklaşık ${MEZCLA.cementoKg} kg çimento, ${n(MEZCLA.arenaM3)} m³ kum, ${n(MEZCLA.piedraM3, 1)} m³ mıcır ve ${MEZCLA.aguaL} litre su.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Bir metreküp betona ne kadar çimento girer?",
        respuesta: `1:2:3 karışımla yaklaşık ${MEZCLA.cementoKg} kg. Daha dayanıklı betonda çimento miktarı artar.`,
      },
      {
        pregunta: "Bir yarda küp kaç fit küptür?",
        respuesta: "27. Bir yarda küp, 3 ft × 3 ft × 3 ft ölçüsündeki küptür.",
      },
      {
        pregunta: "Hazır beton mu sipariş etmeliyim?",
        respuesta: "Büyük dökümlerde hazır beton genellikle daha homojen ve hızlıdır; metreküp üzerinden satılır. Küçük işlerde bu miktarlarla yerinde karıştırmak yaygındır.",
      },
    ],
    glosario: [
      { termino: "Karışım oranı", definicion: "Bir karışımdaki çimento, kum, mıcır ve su oranı." },
      { termino: "Metreküp (m³)", definicion: "Her kenarı 1 metre olan bir küpün hacmi." },
    ],
  };
};
