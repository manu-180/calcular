import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-18";
const CBK = "https://www.cbk.gov.kw/en/monetary-policy/market-operations/exchange-rates/";
const MESES_AR: Readonly<Record<string, string>> = {
  يناير: "01", فبراير: "02", مارس: "03", ابريل: "04", أبريل: "04", مايو: "05", يونيو: "06",
  يوليو: "07", اغسطس: "08", أغسطس: "08", سبتمبر: "09", اكتوبر: "10", أكتوبر: "10", نوفمبر: "11", ديسمبر: "12",
};

function sinEtiquetas(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ");
}

// El CBK publica la tabla de los últimos días como «DD.MM.AAAA | fils por unidad».
async function tablaCbk(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const texto = sinEtiquetas(await http.texto(url, { userAgentNavegador: true }));
  const puntos: PuntoSerie[] = [];
  for (const m of texto.matchAll(/(\d{2})\.(\d{2})\.(20\d{2})\s+(\d+\.\d+)/g)) {
    const fecha = `${m[3]}-${m[2]}-${m[1]}`;
    const valor = Number(m[4]) / 1000;
    if (!esFechaISO(fecha) || !Number.isFinite(valor)) return null;
    puntos.push({ fecha, valor });
  }
  puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puntos.length ? puntos : null;
}

function fx(codigo: string, min: number, max: number): Detector {
  return {
    id: `kw.cbk-${codigo}`,
    carril: "serie",
    serie: `kw.fx-${codigo}`,
    metodo: "html",
    url: `${CBK}${codigo}`,
    userAgentNavegador: true,
    banda: { min, max, saltoRelativoMax: 0.05 },
    traer(http) {
      return tablaCbk(http, this.url);
    },
  };
}

// Bait Al-Zakat publica «آخر تحديث DD / mes / AAAA» y una fila por quilate con el precio del gramo.
function oro(quilates: number, min: number, max: number): Detector {
  return {
    id: `kw.zakat-house-gold-${quilates}k`,
    carril: "serie",
    serie: `kw.gold-${quilates}k`,
    metodo: "html",
    url: "https://www.zakathouse.org.kw/calculate.aspx",
    userAgentNavegador: true,
    banda: { min, max, saltoRelativoMax: 0.1 },
    async traer(http) {
      const texto = sinEtiquetas(await http.texto(this.url, { userAgentNavegador: true }));
      const f = /آخر تحديث\s*(\d{1,2})\s*\/\s*(\S+)\s*\/\s*(20\d{2})/.exec(texto);
      const p = new RegExp(`${quilates}ct\\s*\\|?\\s*(\\d+\\.\\d+)`).exec(texto);
      if (!f || !p || !MESES_AR[f[2]]) return null;
      const fecha = `${f[3]}-${MESES_AR[f[2]]}-${f[1].padStart(2, "0")}`;
      return esFechaISO(fecha) ? [{ fecha, valor: Number(p[1]) }] : null;
    },
  };
}

export const detectores: readonly Detector[] = [
  fx("usd", 0.25, 0.4),
  fx("eur", 0.25, 0.45),
  fx("gbp", 0.3, 0.5),
  fx("sar", 0.07, 0.1),
  fx("aed", 0.07, 0.1),
  fx("inr", 0.002, 0.005),
  fx("egp", 0.003, 0.012),
  fx("pkr", 0.0007, 0.0016),
  fx("bdt", 0.0018, 0.0035),
  fx("lkr", 0.0006, 0.0014),
  {
    id: "kw.cbk-discount-rate",
    carril: "serie",
    serie: "kw.discount-rate",
    metodo: "html",
    url: "https://www.cbk.gov.kw/en/",
    userAgentNavegador: true,
    banda: { min: 0.5, max: 8, saltoRelativoMax: 0.25 },
    async traer(http) {
      // El cuadro Key Figures trae «Updated: Día DD.MM.AAAA» seguido de «Discount Rate N».
      const texto = sinEtiquetas(await http.texto(this.url, { userAgentNavegador: true }));
      const m = /Updated:\s*\w+\s+(\d{2})\.(\d{2})\.(20\d{2})\s+Discount Rate\s+(\d+(?:\.\d+)?)/.exec(texto);
      if (!m) return null;
      const fecha = `${m[3]}-${m[2]}-${m[1]}`;
      return esFechaISO(fecha) ? [{ fecha, valor: Number(m[4]) }] : null;
    },
  },
  oro(24, 20, 80),
  oro(22, 18, 75),
  oro(21, 17, 70),
  oro(18, 15, 60),
  {
    id: "kw.pifss-guide",
    carril: "norma",
    datos: ["kw.pifss-basic-employee-rate", "kw.pifss-basic-employer-rate", "kw.pifss-basic-max", "kw.pifss-supplementary-max", "kw.pifss-increase-max"],
    metodo: "html",
    url: "https://www.pifss.gov.kw/sites/en/pages/pensionsocialsecuritysector/brieflegislationguide.aspx",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      if (!/Taminat Guide/.test(html)) return null;
      return /Attachments\/1\/[^"]*-English\.pdf/.test(html) ? [] : [{ titulo: "PIFSS replaced the Taminat Guide file", url: this.url, fecha: VERIFICADO }];
    },
  },
];
