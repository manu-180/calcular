import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, Http, HallazgoNorma, PuntoSerie } from "@/motor/tipos";

const MESETSI: Readonly<Record<string, string>> = {
  януари: "01", февруари: "02", март: "03", април: "04", май: "05", юни: "06",
  юли: "07", август: "08", септември: "09", октомври: "10", ноември: "11", декември: "12",
};

const NSI_IPC = "https://www.nsi.bg/statistical-data/117/385" as const;
const NOI_ZAKONI = "https://www.noi.bg/administrativno-obslujvane/normativna-uredba/zakoni/" as const;
const NOI_MRZ = "https://noi.bg/osiguriteli/osiguryavane_osiguriteli/osiguryavane-na-litsata-raboteshti-bez-trudovi-pravootnosheniya/" as const;

function bezTagove(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");
}

// Таблицата на НСИ показва само последния месец: „Септември 2026 Общ ИПЦ 105.85“. Историята идва от
// файла CPI_1.1.xlsx, който http не чете; серията расте с по една точка при всяко минаване.
async function nsiIpc(http: Http): Promise<readonly PuntoSerie[] | null> {
  const text = bezTagove(await http.texto(NSI_IPC, { userAgentNavegador: true }));
  const m = /(\p{L}+) (\d{4}) Общ ИПЦ (\d+\.\d+)/u.exec(text);
  if (!m) return null;
  const mesets = MESETSI[m[1].toLowerCase()];
  const fecha = `${m[2]}-${mesets}-01`;
  if (!mesets || !esFechaISO(fecha)) return null;
  return [{ fecha, valor: Number(m[3]) }];
}

// НОИ качва всеки годишен закон за бюджета на ДОО като zbdoo-<година>.pdf.
async function zbdooNov(http: Http, poznata: number): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(NOI_ZAKONI, { userAgentNavegador: true });
  const godini = [...html.matchAll(/zbdoo-(\d{4})\.pdf/g)].map((m) => Number(m[1]));
  if (!godini.length) return null;
  const nova = Math.max(...godini);
  if (nova <= poznata) return [];
  const fecha = `${nova}-01-01`;
  if (!esFechaISO(fecha)) return null;
  return [{ titulo: `Закон за бюджета на ДОО за ${nova} г. в сайта на НОИ`, url: `https://www.noi.bg/wp-content/uploads/zbdoo-${nova}.pdf`, fecha }];
}

// НОИ поддържа изречението с минималната заплата в тази страница.
async function mrzNova(http: Http, poznata: FechaISO): Promise<readonly HallazgoNorma[] | null> {
  const text = bezTagove(await http.texto(NOI_MRZ, { userAgentNavegador: true }));
  const m = /работна заплата за страната от (\d{2})\.(\d{2})\.(\d{4}) г\. е ([\d\s,.]+) евро/.exec(text);
  if (!m) return null;
  const fecha = `${m[3]}-${m[2]}-${m[1]}`;
  if (!esFechaISO(fecha)) return null;
  if (fecha <= poznata) return [];
  return [{ titulo: `Минимална работна заплата от ${fecha}: ${m[4].trim()} евро`, url: NOI_MRZ, fecha }];
}

export const detectores: readonly Detector[] = [
  {
    id: "bg.ipc-nsi",
    carril: "serie",
    serie: "bg.ipc",
    metodo: "html",
    url: NSI_IPC,
    banda: { min: 90, max: 160, saltoRelativoMax: 0.05 },
    traer(http) {
      return nsiIpc(http);
    },
  },
  {
    id: "bg.zbdoo-noi",
    carril: "norma",
    datos: ["bg.maks-osig-dohod", "bg.min-dohod-samoosig", "bg.tzpb", "bg.otglezhdane-dete", "bg.bezrabotitsa-min", "bg.bezrabotitsa-maks"],
    metodo: "html",
    url: NOI_ZAKONI,
    traer(http) {
      return zbdooNov(http, 2026);
    },
  },
  {
    id: "bg.mrz-noi",
    carril: "norma",
    datos: ["bg.minimalna-zaplata"],
    metodo: "html",
    url: NOI_MRZ,
    traer(http) {
      return mrzNova(http, "2026-01-01");
    },
  },
];
