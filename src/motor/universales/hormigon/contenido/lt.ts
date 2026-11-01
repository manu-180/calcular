import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `Terasai, kurios matmenys 10 × 10 ft, o storis 4 in, reikia ${n(ft3)} ft³ betono, tai yra ${n(ft3 / 27)} yd³.`,
          `Naudojant pavyzdinį mišinį, tam prireiks apie ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb cemento.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `Betono plokštei, kurios matmenys 4 × 3 m, o storis 10 cm, reikia ${n(volumen, 1)} m³ betono.`,
          `Naudojant pavyzdinį mišinį, tam prireiks apie ${n(MEZCLA.cementoKg * volumen, 0)} kg cemento, ${n(MEZCLA.arenaM3 * volumen)} m³ smėlio ir ${n(MEZCLA.piedraM3 * volumen)} m³ skaldos.`,
        ];
      })();
  return {
    h1: "Betono skaičiuoklė",
    title: tituloQueEntre(`Betono skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`, "Betono ir cemento skaičiuoklė", "Betono skaičiuoklė"),
    description: `Apskaičiuokite, kiek betono reikia plokštei ${imperial ? "kubiniais jardais" : "kubiniais metrais"}, ir maždaug kiek cemento, smėlio ir skaldos pirkti.`,
    intro: [
      "Įveskite ilgį, plotį ir storį. Matysite betono tūrį ir apytikslį mišiniui reikalingų medžiagų kiekį.",
      "Medžiagų kiekis priklauso nuo mišinio proporcijų. Skaičiuoklė kaip pavyzdį naudoja įprastą mišinį 1 : 2 : 3.",
    ],
    comoSeCalcula: [
      imperial
        ? "Tūris = ilgis × plotis × storis, storį išreiškus pėdomis. Kubinės pėdos dalijamos iš 27, kad gautumėte kubinius jardus."
        : "Tūris = ilgis × plotis × storis, storį išreiškus metrais.",
      "Prie tūrio pridedama atsarga nelygiam pagrindui ir betono nuostoliams.",
      `1 m³ tenka apie ${MEZCLA.cementoKg} kg cemento, ${n(MEZCLA.arenaM3)} m³ smėlio, ${n(MEZCLA.piedraM3, 1)} m³ skaldos ir ${MEZCLA.aguaL} l vandens.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Kiek cemento reikia 1 m³ betono?",
        respuesta: `Mišiniui 1 : 2 : 3 apie ${MEZCLA.cementoKg} kg. Tvirtesniam betonui cemento reikia daugiau.`,
      },
      {
        pregunta: "Kiek kubinių pėdų yra kubiniame jarde?",
        respuesta: "27. Kubinis jardas yra kubas, kurio matmenys 3 ft × 3 ft × 3 ft.",
      },
      {
        pregunta: "Ar verta užsisakyti paruoštą betoną?",
        respuesta: "Didesniems darbams iš maišyklės tiekiamas paruoštas betonas būna vienodesnis, o darbas vyksta greičiau; jis parduodamas kubiniais metrais. Mažesniems darbams betonas dažnai maišomas vietoje pagal šias proporcijas.",
      },
    ],
    glosario: [
      { termino: "Mišinio proporcijos", definicion: "Cemento, smėlio, skaldos ir vandens santykis mišinyje." },
      { termino: "Kubinis metras (m³)", definicion: "Kubo, kurio briauna 1 metras, tūris." },
    ],
  };
};
