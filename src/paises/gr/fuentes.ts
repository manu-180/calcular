import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-24";

const EFKA_EGKYKLIOI = "https://www.e-efka.gov.gr/el/egkyklioi-kai-genika-eggrapha";
const ELSTAT_DTK = "https://www.statistics.gr/el/statistics/-/publication/DKT87/-";

const MINES: Readonly<Record<string, string>> = {
  ιαν: "01",
  φεβ: "02",
  μαρ: "03",
  απρ: "04",
  μαϊ: "05",
  μαι: "05",
  ιουν: "06",
  ιουλ: "07",
  αυγ: "08",
  σεπ: "09",
  οκτ: "10",
  νοε: "11",
  δεκ: "12",
};

const sinTonos = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").normalize("NFC").toLowerCase();

// La lista de εγκύκλιοι del e-ΕΦΚΑ trae cada una con día, mes abreviado y año en tres <span>, y el
// título en un <h3>. Las que cambian aportes o topes llevan «εισφορ», «όριο» o «κατώτατ» en el título
// o en la descripción corta.
async function egkykliiEfka(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url);
  if (!/egkyklioi-kai-genika-egg/.test(html)) return null;
  const hallazgos: HallazgoNorma[] = [];
  const re = /<a href="(\/el\/egkyklioi-kai-genika-egg[^"]+)"[\s\S]*?<span[^>]*>(\d{1,2})\s+([^<\s]+)<\/span>\s*<span[^>]*>(\d{4})<\/span>[\s\S]*?<h3[^>]*>\s*<span>([^<]+)<\/span>([\s\S]*?)<\/article>/g;
  for (const m of html.matchAll(re)) {
    const mes = MINES[sinTonos(m[3]).slice(0, 4)] ?? MINES[sinTonos(m[3]).slice(0, 3)];
    const fecha = `${m[4]}-${mes}-${m[2].padStart(2, "0")}`;
    if (!mes || !esFechaISO(fecha)) continue;
    if (fecha <= VERIFICADO) continue;
    const texto = sinTonos(`${m[5]} ${m[6].replace(/<[^>]+>/g, " ")}`);
    if (!/εισφορ|οριο|κατωτατ/.test(texto)) continue;
    hallazgos.push({ titulo: m[5].trim(), url: `https://www.e-efka.gov.gr${m[1]}`, fecha });
  }
  return hallazgos;
}

export const detectores: readonly Detector[] = [
  {
    id: "gr.dtk-elstat",
    carril: "serie",
    serie: "gr.dtk",
    // Manual: la ΕΛΣΤΑΤ publica la serie solo como xlsx (binario) y el Http de los detectores lee
    // texto. El semáforo avisa antes de que gr.dtk venza; el punto nuevo se carga desde el archivo
    // «04. Μηνιαια Εξέλιξη Γενικου ΔΤΚ» de la página DKT87, que sale a principios de cada mes.
    metodo: "manual",
    url: ELSTAT_DTK,
    userAgentNavegador: true,
    banda: { min: 60, max: 200, saltoRelativoMax: 0.04 },
    async traer() {
      return null;
    },
  },
  {
    id: "gr.efka-egkyklioi",
    carril: "norma",
    datos: [
      "gr.eisfores-ergazomenou",
      "gr.eisfores-ergodoti",
      "gr.eisfores-ygeias",
      "gr.eisfores-dypa",
      "gr.anotato-orio-asfalisis",
      "gr.eisfores-eleftheron",
      "gr.eisfores-eleftheron-syntaxi",
      "gr.eisfora-anergias-eleftheron",
      "gr.eisfores-epikourikis-eleftheron",
      "gr.eisfores-efapax-eleftheron",
      "gr.katotatos-misthos",
      "gr.katotato-imeromisthio",
    ],
    metodo: "html",
    url: EFKA_EGKYKLIOI,
    userAgentNavegador: true,
    traer(http) {
      return egkykliiEfka(http, this.url);
    },
  },
];
