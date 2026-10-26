import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `Egy 35 éves, 180 lb súlyú és 5 ft 10 in magas férfi alapanyagcseréje nagyjából ${n(basal)} kcal.`,
          `Ha keveset mozog, a testsúlya megtartásához naponta körülbelül ${n(basal * FACTORES.sedentaria)} kcal kell neki.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `Egy 30 éves, 60 kg súlyú és 165 cm magas nő alapanyagcseréje nagyjából ${n(basal)} kcal.`,
          `Közepes aktivitás mellett a testsúlya megtartásához naponta körülbelül ${n(basal * FACTORES.moderada)} kcal kell neki.`,
        ];
      })();
  return {
    h1: "Kalóriaszükséglet kalkulátor: napi kalóriabevitel",
    title: tituloQueEntre(`Kalóriaszükséglet kalkulátor (${ctx.nombrePais})`, "Kalóriaszükséglet kalkulátor: napi kalóriabevitel", "Kalóriaszükséglet kalkulátor"),
    description: "Számold ki, hány kalóriát égetsz el naponta, és mennyit egyél, ha meg akarod tartani a testsúlyodat, fogyni vagy hízni szeretnél.",
    intro: [
      "Add meg az adataidat és az aktivitási szintedet. Látod az alapanyagcserédet és azt, hány kalóriát égetsz el egy átlagos napon.",
      "Ez tájékoztató becslés. Nem helyettesíti az orvos vagy a dietetikus tanácsát.",
    ],
    comoSeCalcula: [
      `Alapanyagcsere (Mifflin-St Jeor): 10 × testsúly kilogrammban + ${n(6.25, 2)} × magasság centiméterben − 5 × életkor, a végén férfiaknál + 5, nőknél − 161.`,
      `A testsúly megtartásához szükséges kalória = alapanyagcsere × aktivitási szorzó. A szorzó ${n(1.2, 1)} (minimális mozgás) és ${n(1.9, 1)} (nagyon magas aktivitás) között van.`,
      `Fogyáshoz a napi bevitelből ${DEFICIT} kcal jön le, hízáshoz ${SUPERAVIT} kcal jön hozzá: mérsékelt változás, amelyet sokáig tartani lehet.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Mi az alapanyagcsere?",
        respuesta: "Az az energia, amelyet a szervezet teljes nyugalomban használ el a légzésre, a testhőmérséklet megtartására és a szervek működésére.",
      },
      {
        pregunta: "Hány kalóriát egyek, ha fogyni szeretnék?",
        respuesta: `Szokásos kiindulópont a testsúly megtartásához szükséges mennyiség, mínusz napi ${DEFICIT} kcal. A legjobb szakemberrel együtt meghatározni.`,
      },
      {
        pregunta: "Mennyire pontos a képlet?",
        respuesta: "A Mifflin-St Jeor-képlet az egyik legelterjedtebb, de átlagos értéket ad. A genetika, az izomtömeg és az egészségi állapot befolyásolja, mennyit égetsz el valójában.",
      },
    ],
    glosario: [
      { termino: "Kalória (kcal)", definicion: "Az ételben lévő és a szervezet által felhasznált energia mértékegysége." },
      { termino: "Alapanyagcsere", definicion: "Az a kalóriamennyiség, amelyet a szervezet teljes nyugalomban eléget." },
    ],
  };
};
