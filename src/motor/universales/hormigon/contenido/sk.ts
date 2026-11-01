import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `Na terasu 10 × 10 ft s hrúbkou 4 in potrebujete ${n(ft3)} ft³ betónu, teda ${n(ft3 / 27)} kubického yardu.`,
          `Pri vzorovej zmesi na to pôjde asi ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb cementu.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `Na betónovú dosku 4 × 3 m s hrúbkou 10 cm potrebujete ${n(volumen, 1)} m³ betónu.`,
          `Pri vzorovej zmesi na to pôjde asi ${n(MEZCLA.cementoKg * volumen, 0)} kg cementu, ${n(MEZCLA.arenaM3 * volumen)} m³ piesku a ${n(MEZCLA.piedraM3 * volumen)} m³ štrku.`,
        ];
      })();
  return {
    h1: "Kalkulačka betónu",
    title: tituloQueEntre(`Kalkulačka betónu: ${ctx.nombrePais}`, "Kalkulačka betónu a cementu", "Kalkulačka betónu"),
    description: `Vypočítajte, koľko betónu potrebujete na dosku v ${imperial ? "kubických yardoch" : "kubických metroch"}, a približne koľko cementu, piesku a štrku kúpiť.`,
    intro: [
      "Zadajte dĺžku, šírku a hrúbku. Uvidíte objem betónu a približné množstvo materiálu na zmes.",
      "Množstvo materiálu závisí od pomeru zmesi. Kalkulačka ako príklad počíta s bežnou zmesou 1 : 2 : 3.",
    ],
    comoSeCalcula: [
      imperial
        ? "Objem = dĺžka × šírka × hrúbka, s hrúbkou v stopách. Kubické stopy sa vydelia 27, aby vyšli kubické yardy."
        : "Objem = dĺžka × šírka × hrúbka, s hrúbkou v metroch.",
      "K objemu sa pripočíta rezerva na nerovný podklad a straty betónu.",
      `Na 1 m³ pripadá asi ${MEZCLA.cementoKg} kg cementu, ${n(MEZCLA.arenaM3)} m³ piesku, ${n(MEZCLA.piedraM3, 1)} m³ štrku a ${MEZCLA.aguaL} litrov vody.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Koľko cementu treba na 1 m³ betónu?",
        respuesta: `Pri zmesi 1 : 2 : 3 asi ${MEZCLA.cementoKg} kg. Na pevnejší betón treba viac cementu.`,
      },
      {
        pregunta: "Koľko kubických stôp má kubický yard?",
        respuesta: "27. Kubický yard je kocka 3 ft × 3 ft × 3 ft.",
      },
      {
        pregunta: "Oplatí sa objednať hotový betón z betonárky?",
        respuesta: "Pri väčších betonážach býva hotový betón z domiešavača rovnomernejší a práca ide rýchlejšie, predáva sa na kubíky. Pri menších prácach sa betón bežne mieša na mieste v týchto pomeroch.",
      },
    ],
    glosario: [
      { termino: "Pomer zmesi", definicion: "Pomer cementu, piesku, štrku a vody v zmesi." },
      { termino: "Meter kubický (m³)", definicion: "Objem kocky s hranou 1 meter, hovorovo kubík." },
    ],
  };
};
