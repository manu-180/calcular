import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-16";

// Las páginas de HASiL cierran con «Dikemas kini pada: DD/MM/AAAA». Si la fecha es posterior a la
// última verificación, la tabla pudo cambiar y hay que volver a leerla.
async function paginaHasil(http: Http, url: string, titulo: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const m = /Dikemas kini pada:\s*(\d{2})\/(\d{2})\/(\d{4})/.exec(html);
  if (!m) return null;
  const fecha = `${m[3]}-${m[2]}-${m[1]}`;
  if (!esFechaISO(fecha)) return null;
  return fecha > VERIFICADO ? [{ titulo, url, fecha }] : [];
}

// Páginas sin fecha de modificación: se busca el texto que hoy sostiene el dato. Si desaparece, la
// página cambió y hay que volver a leerla. Si la página no trae nada reconocible, la fuente cayó.
async function marcadores(http: Http, url: string, titulo: string, base: RegExp, esperados: readonly RegExp[]): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!base.test(html)) return null;
  return esperados.every((re) => re.test(html)) ? [] : [{ titulo, url, fecha: VERIFICADO }];
}

function hasil(id: string, datos: readonly string[], url: `https://${string}`, titulo: string): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url,
    userAgentNavegador: true,
    traer(http) {
      return paginaHasil(http, this.url, titulo);
    },
  };
}

export const detectores: readonly Detector[] = [
  {
    id: "my.cpi-dosm",
    carril: "serie",
    serie: "my.cpi",
    metodo: "api-json",
    url: "https://api.data.gov.my/data-catalogue?id=cpi_headline&filter=overall@division&sort=-date&limit=24",
    banda: { min: 120, max: 180, saltoRelativoMax: 0.02 },
    async traer(http) {
      const json = await http.json(this.url);
      if (!Array.isArray(json)) return null;
      const puntos: PuntoSerie[] = [];
      for (const o of json as { date?: unknown; index?: unknown; division?: unknown }[]) {
        if (o.division !== "overall") continue;
        if (typeof o.date !== "string" || typeof o.index !== "number" || !esFechaISO(o.date) || !Number.isFinite(o.index)) return null;
        puntos.push({ fecha: o.date, valor: o.index });
      }
      puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
      return puntos.length ? puntos : null;
    },
  },
  {
    id: "my.opr-bnm",
    carril: "serie",
    serie: "my.opr",
    metodo: "api-json",
    url: "https://api.bnm.gov.my/public/opr",
    // Un cambio de 25 puntos básicos sobre 2,75 % es un salto de 9 %; se deja margen para 50.
    banda: { min: 0.5, max: 8, saltoRelativoMax: 0.25 },
    async traer(http) {
      // La API del BNM responde 404 sin este Accept.
      const json = (await http.json(this.url, { encabezados: { Accept: "application/vnd.BNM.API.v1+json" } })) as { data?: { date?: unknown; new_opr_level?: unknown } };
      const d = json?.data;
      if (!d || typeof d.date !== "string" || !esFechaISO(d.date) || typeof d.new_opr_level !== "number") return null;
      return [{ fecha: d.date, valor: d.new_opr_level }];
    },
  },
  hasil("my.hasil-tax-rates", ["my.income-tax-rates"], "https://www.hasil.gov.my/individu/kadar-cukai/", "HASiL individual tax rates page updated"),
  hasil("my.hasil-reliefs", ["my.tax-reliefs"], "https://www.hasil.gov.my/individu/pelepasan-cukai/", "HASiL tax relief page updated"),
  hasil("my.hasil-rebates", ["my.tax-rebate-individual", "my.tax-rebate-spouse", "my.tax-rebate-threshold"], "https://www.hasil.gov.my/individu/rebat/", "HASiL tax rebate page updated"),
  hasil("my.hasil-pcb", ["my.mtd-minimum", "my.income-tax-rates", "my.tax-reliefs"], "https://www.hasil.gov.my/majikan/jadual-pcb-dan-spesifikasi-data/", "HASiL MTD (PCB) specification page updated"),
  hasil("my.hasil-rpgt", ["my.rpgt-citizen", "my.rpgt-company", "my.rpgt-foreigner"], "https://www.hasil.gov.my/ckht/kadar-cukai-keuntungan-harta-tanah/", "HASiL RPGT rates page updated"),
  hasil("my.hasil-rpgt-exemption", ["my.rpgt-exemption-amount", "my.rpgt-exemption-rate"], "https://www.hasil.gov.my/ckht/pengecualian/", "HASiL RPGT exemption page updated"),
  {
    id: "my.perkeso-rates",
    carril: "norma",
    datos: ["my.socso-employer", "my.socso-employee", "my.socso-skbbk", "my.socso-employer-second", "my.socso-skbbk-second", "my.socso-wage-ceiling", "my.eis"],
    metodo: "html",
    url: "https://www.perkeso.gov.my/en/rate-of-contribution.html",
    traer(http) {
      return marcadores(http, this.url, "PERKESO contribution rate page changed", /PERKESO/, [/wage ceiling for contributions from RM5,000 to RM6,000/, /NewContributionRateIncludingSKBBK\.pdf/, /151124-Rate Contribution ACT 800\.pdf/]);
    },
  },
  {
    id: "my.mysst-rates",
    carril: "norma",
    datos: ["my.sales-tax-rates", "my.service-tax-rates"],
    metodo: "html",
    url: "https://mysst.customs.gov.my/faq-services-tax/",
    traer(http) {
      return marcadores(http, this.url, "MySST service tax FAQ changed", /[Ss]ervice [Tt]ax/, [/The tax rate is 8% for all taxable services/, /rate of 6%/]);
    },
  },
  {
    id: "my.gaji-minimum",
    carril: "norma",
    datos: ["my.minimum-wage-monthly", "my.minimum-wage-hourly", "my.minimum-wage-daily"],
    metodo: "html",
    url: "https://gajiminimum.mohr.gov.my/",
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const anios = [...html.matchAll(/(?:Perintah Gaji Minimum|Minimum Wages Order)\s+(20\d{2})/gi)].map((m) => Number(m[1]));
      if (!anios.length) return null;
      const nuevo = Math.max(...anios);
      return nuevo > 2024 ? [{ titulo: `Minimum Wages Order ${nuevo} on the MPGN portal`, url: this.url, fecha: VERIFICADO }] : [];
    },
  },
  hasil(
    "my.hasil-stamp-duty",
    ["my.stamp-duty-transfer", "my.stamp-duty-foreign", "my.stamp-duty-foreign-residential"],
    "https://www.hasil.gov.my/duti-setem/pengenalan-duti-setem/",
    "HASiL stamp duty page updated",
  ),
];
