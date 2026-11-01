import { pluralLv } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const plaksnes = (k: number) => pluralLv(k, "plāksne", "plāksnes", "plākšņu");
  const kastes = (k: number) => pluralLv(k, "kaste", "kastes", "kastu");
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Ja platība ir 150 ft², plāksnes izmērs 12 × 12 in (vienas platība 1 ft²), bet rezerve 10%, vajag: ${plaksnes(piezas)}.`,
          `Ja kastē ir 10 plāksnes, jāpērk: ${kastes(Math.ceil(piezas / 10))}.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `Ja platība ir 20 m², plāksnes izmērs 60 × 60 cm (vienas platība ${n(pieza)} m²), bet rezerve 10%, vajag: ${plaksnes(piezas)}.`,
          `Ja kastē ir 4 plāksnes, jāpērk: ${kastes(Math.ceil(piezas / 4))}.`,
        ];
      })();
  return {
    h1: "Plīšu kalkulators grīdai un sienām",
    title: tituloQueEntre(
      `Plīšu kalkulators (${ctx.nombrePais})`,
      "Plīšu kalkulators: cik kastes pirkt",
      "Plīšu kalkulators",
    ),
    description: "Aprēķiniet, cik plīšu vajag grīdai vai sienai, ieskaitot rezervi griešanai, un cik kastes pirkt.",
    intro: [
      "Ievadiet platību, vienas plāksnes izmērus un plākšņu skaitu kastē. Redzēsiet, cik plākšņu un kastu jāpērk.",
      "Rezerve griešanai sedz plāksnes, ko griež pie malām, un tās, kas darba laikā saplīst.",
    ],
    comoSeCalcula: [
      `Vienas plāksnes platība = garums × platums, ${imperial ? "kvadrātpēdās" : "kvadrātmetros"}.`,
      "Plākšņu skaits = platība × (1 + rezerve ÷ 100) ÷ vienas plāksnes platība, noapaļojot uz augšu.",
      "Kastes = plākšņu skaits ÷ plāksnes kastē, noapaļojot uz augšu.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Kādu rezervi griešanai rēķināt?",
        respuesta: "Klājot taisni, vajag 10%. Klājot pa diagonāli, eglītes rakstā vai telpās, kur daudz griezumu, vajag no 15 līdz 20%.",
      },
      {
        pregunta: "Vai jārēķina šuves?",
        respuesta: "Nē. Šuves ir tikai dažus milimetrus platas, un rezerve griešanai šo starpību sedz.",
      },
      {
        pregunta: "Vai ir vērts nopirkt nedaudz vairāk?",
        respuesta: "Jā, atstājiet dažas plāksnes no tās pašas partijas. Ja vēlāk kāda saplīsīs, tieši tādu pašu toni atrast var būt grūti.",
      },
    ],
    glosario: [
      { termino: "Rezerve griešanai", definicion: "Procents plākšņu, ko pērk papildus griešanai un saplīsušām plāksnēm." },
      { termino: "Partija", definicion: "Ražošanas sērija. Dažādu partiju plāksnēm tonis var nedaudz atšķirties." },
    ],
  };
};
