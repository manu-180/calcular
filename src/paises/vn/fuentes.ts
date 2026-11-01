import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VANBAN = "https://vanban.chinhphu.vn/";
const NSO_CPI = "https://www.nso.gov.vn/cpi-vi/";
const SBV_TY_GIA = "https://sbv.gov.vn/t%E1%BB%B7-gi%C3%A1";

function fechaDma(dia: string, mes: string, anio: string): FechaISO | null {
  const f = `${anio}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
  return esFechaISO(f) ? (f as FechaISO) : null;
}

// La página de tipo de cambio dice «áp dụng cho ngày 31/10/2026» y la celda trae el número limpio
// en el title: <td title="25637">25.637 VND</td>.
async function usdSbv(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const html = await http.texto(url);
  const m = /áp dụng cho ngày\s*(\d{1,2})\/(\d{1,2})\/(\d{4})[\s\S]{0,800}?1 Đô la Mỹ =[\s\S]{0,160}?title="(\d+)"/.exec(html);
  if (!m) return null;
  const fecha = fechaDma(m[1], m[2], m[3]);
  const valor = Number(m[4]);
  if (!fecha || !Number.isFinite(valor)) return null;
  return [{ fecha, valor }];
}

// El comunicado mensual del Cục Thống kê da la frase; el mes sale de la frase misma («CPI tháng 9/2026»).
type FraseCpi = "cung-ky" | "thang-truoc" | "binh-quan";

function leerCpi(texto: string, frase: FraseCpi): PuntoSerie | null {
  const limpio = texto.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");
  const mesAnio = /CPI tháng (\d{1,2})\/(\d{4})/.exec(limpio);
  if (!mesAnio) return null;
  const fecha = fechaDma("1", mesAnio[1], mesAnio[2]);
  if (!fecha) return null;
  const re =
    frase === "cung-ky"
      ? /CPI tháng \d{1,2}\/\d{4} (tăng|giảm) ([\d,]+)% so với cùng kỳ năm trước/
      : frase === "thang-truoc"
        ? /CPI tháng \d{1,2}\/\d{4} (tăng|giảm) ([\d,]+)% \(khu vực/
        : /Bình quân [^,.]{1,40}, CPI (tăng|giảm) ([\d,]+)% so với cùng kỳ năm trước/;
  const m = re.exec(limpio);
  if (!m) return null;
  const n = Number(m[2].replace(",", "."));
  if (!Number.isFinite(n)) return null;
  return { fecha, valor: m[1] === "giảm" ? -n : n };
}

async function cpiNso(http: Http, frase: FraseCpi): Promise<readonly PuntoSerie[] | null> {
  const lista = await http.texto(NSO_CPI);
  const enlaces = [...lista.matchAll(/https:\/\/www\.nso\.gov\.vn\/tin-tuc-thong-ke\/\d{4}\/\d{2}\/thong-cao-bao-chi-ve-tinh-hinh-gia[^"'\s<]*/g)].map((m) => m[0]);
  const ultimo = [...new Set(enlaces)].sort().at(-1);
  if (!ultimo) return null;
  const punto = leerCpi(await http.texto(ultimo), frase);
  return punto ? [punto] : null;
}

// La portada de vanban.chinhphu.vn lista lo último publicado con su docid, que crece con el tiempo. Una fila con
// docid mayor al último leído y las palabras del tema es una norma nueva que hay que abrir a mano.
async function vanbanMoi(http: Http, url: string, tema: RegExp, ultimoDocid: number): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url);
  const filas = [...html.matchAll(/docid=(\d+)'>\s*<span class="code">([^<]*)<\/span>\s*<span class="issue-v2">(\d{2})\/(\d{2})\/(\d{4})<\/span>[\s\S]*?<span class="substract">([^<]*)<\/span>/g)];
  if (!filas.length) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const f of filas) {
    const docid = Number(f[1]);
    const fecha = fechaDma(f[3], f[4], f[5]);
    if (docid > ultimoDocid && fecha && tema.test(f[6])) {
      hallazgos.push({ titulo: `${f[2].trim()}: ${f[6].trim()}`, url: `${VANBAN}?pageid=27160&docid=${docid}`, fecha });
    }
  }
  return hallazgos;
}

function norma(id: string, tema: RegExp, datos: readonly string[], ultimoDocid: number): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url: VANBAN,
    traer(http) {
      return vanbanMoi(http, this.url, tema, ultimoDocid);
    },
  };
}

// Último docid leído el 1/11/2026.
const ULTIMO = 220134;

export const detectores: readonly Detector[] = [
  {
    id: "vn.usd-sbv",
    carril: "serie",
    serie: "vn.usd",
    metodo: "html",
    url: SBV_TY_GIA,
    banda: { min: 20000, max: 35000, saltoRelativoMax: 0.03 },
    traer(http) {
      return usdSbv(http, this.url);
    },
  },
  {
    id: "vn.cpi-nam-nso",
    carril: "serie",
    serie: "vn.cpi-nam",
    metodo: "html",
    url: NSO_CPI,
    banda: { min: -5, max: 30, saltoRelativoMax: 2 },
    traer(http) {
      return cpiNso(http, "cung-ky");
    },
  },
  {
    id: "vn.cpi-thang-nso",
    carril: "serie",
    serie: "vn.cpi-thang",
    metodo: "html",
    url: NSO_CPI,
    banda: { min: -5, max: 10, saltoRelativoMax: 10 },
    traer(http) {
      return cpiNso(http, "thang-truoc");
    },
  },
  {
    id: "vn.cpi-binh-quan-nso",
    carril: "serie",
    serie: "vn.cpi-binh-quan",
    metodo: "html",
    url: NSO_CPI,
    banda: { min: -5, max: 30, saltoRelativoMax: 2 },
    traer(http) {
      return cpiNso(http, "binh-quan");
    },
  },
  norma("vn.vb-luong-toi-thieu", /mức lương tối thiểu/i, ["vn.lttv-thang", "vn.lttv-gio"], ULTIMO),
  norma("vn.vb-luong-co-so", /mức lương cơ sở|mức tham chiếu/i, ["vn.muc-tham-chieu"], ULTIMO),
  norma("vn.vb-thue-tncn", /thuế thu nhập cá nhân|giảm trừ gia cảnh/i, ["vn.bieu-tncn", "vn.giam-tru-ban-than", "vn.giam-tru-phu-thuoc", "vn.nha-tncn"], ULTIMO),
  norma("vn.vb-gtgt", /thuế giá trị gia tăng/i, ["vn.gtgt-giam", "vn.gtgt-pho-thong", "vn.gtgt-uu-dai", "vn.hkd-gtgt"], ULTIMO),
  norma("vn.vb-ho-kinh-doanh", /hộ kinh doanh|giảm thuế thu nhập/i, ["vn.hkd-nguong", "vn.hkd-tncn", "vn.hkd-giam-tncn", "vn.hkd-tran-giam"], ULTIMO),
  norma("vn.vb-bao-hiem", /bảo hiểm xã hội|bảo hiểm y tế|bảo hiểm thất nghiệp|tai nạn lao động/i, ["vn.bhxh-nld", "vn.bhyt-nld", "vn.bhtn-nld", "vn.bhxh-huu-tri-dn", "vn.tnld-dn", "vn.tctn-ty-le", "vn.huu-ty-le-goc"], ULTIMO),
  norma("vn.vb-truoc-ba", /lệ phí trước bạ/i, ["vn.tb-nha-dat", "vn.tb-xe-may", "vn.tb-o-to", "vn.tb-o-to-dien"], ULTIMO),
  norma("vn.vb-lao-dong", /Bộ luật Lao động|thời giờ làm việc/i, ["vn.them-gio-ngay-thuong", "vn.phep-binh-thuong", "vn.bao-truoc-vo-han", "vn.thoi-viec-moi-nam", "vn.mat-viec-moi-nam"], ULTIMO),
];
