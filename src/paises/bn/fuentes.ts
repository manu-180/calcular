import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-29";
const MESES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// La tabla del IPC de DEPS tiene una fila por mes: <td>January</td><td>2026</td><td>105.7</td> y luego las variaciones.
async function ipcDeps(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const html = await http.texto(url);
  const puntos: PuntoSerie[] = [];
  for (const m of html.matchAll(/<td[^>]*>\s*([A-Za-z]+)\s*<\/td>\s*<td[^>]*>\s*(20\d{2})\s*<\/td>\s*<td[^>]*>\s*([\d.]+)\s*<\/td>/g)) {
    const mes = MESES.indexOf(m[1]) + 1;
    const fecha = `${m[2]}-${String(mes).padStart(2, "0")}-01`;
    const valor = Number(m[3]);
    // Diciembre de 2024 está mal impreso en la tabla de DEPS y no se carga.
    if (mes > 0 && esFechaISO(fecha) && fecha >= "2021-01-01" && fecha !== "2024-12-01" && Number.isFinite(valor)) puntos.push({ fecha, valor });
  }
  puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puntos.length ? puntos : null;
}

// Estas páginas no traen fecha de modificación: si el texto que leímos deja de estar, la norma pudo cambiar.
function textoVigente(id: string, url: `https://${string}`, datos: readonly string[], esperado: readonly RegExp[], titulo: string, ancla: RegExp): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url,
    async traer(http: Http): Promise<readonly HallazgoNorma[] | null> {
      const html = (await http.texto(this.url)).replace(/<[^>]+>/g, " ");
      if (!ancla.test(html)) return null;
      return esperado.every((r) => r.test(html)) ? [] : [{ titulo, url: this.url, fecha: VERIFICADO }];
    },
  };
}

export const detectores: readonly Detector[] = [
  {
    id: "bn.cpi-deps",
    carril: "serie",
    serie: "bn.cpi",
    metodo: "html",
    url: "https://www.deps.gov.bn/consumer-price-index-3/",
    banda: { min: 90, max: 130, saltoRelativoMax: 0.03 },
    traer(http) {
      return ipcDeps(http, this.url);
    },
  },
  textoVigente(
    "bn.tap-employer-rates",
    "https://www.tap.com.bn/employers-responsibilities-contribution",
    ["bn.spk-employer-bands", "bn.spk-employer-minimum"],
    [/BND\s*500\.00 and below/i, /Set at BND\s*57\.50/i, /10\.5%/, /9\.5%/, /8\.5%/],
    "TAP no longer shows the SPK employer contribution table we loaded",
    /Prescribed Contribution Rates/i,
  ),
  textoVigente(
    "bn.tap-member-rate",
    "https://www.tap.com.bn/spk-members-contribution",
    ["bn.spk-employee-rate"],
    [/8\.5\s*%\s*of basic salary/i],
    "TAP no longer shows an SPK member rate of 8.5% of basic salary",
    /Contribution Rate/i,
  ),
  textoVigente(
    "bn.tap-self-employed",
    "https://www.tap.com.bn/spk-self-employed-verified-member-contribution",
    ["bn.se-minimum", "bn.se-maximum", "bn.se-matchup"],
    [/\$17\.50\s*-\s*\$40\.00/, /Match-Up/i],
    "TAP no longer shows the self-employed contribution range of 17.50 to 40.00",
    /Self-Employed/i,
  ),
  textoVigente(
    "bn.mof-corporate-tax",
    "https://www.mof.gov.bn/div_revenue_faq_corporatetax/",
    ["bn.corporate-tax-rate", "bn.personal-income-tax-rate", "bn.return-failure-fine"],
    [/18\.5%/, /NO tax is levied on/i],
    "The Revenue Division corporate tax FAQ no longer shows 18.5% and no tax on personal income",
    /Corporate Tax/i,
  ),
  textoVigente(
    "bn.mof-income-tax",
    "https://www.mof.gov.bn/div_revenue_typesoftaxes_incometax/",
    ["bn.threshold-first-band", "bn.threshold-second-band", "bn.new-company-exempt", "bn.vehicle-cap", "bn.capital-plant-accelerated"],
    [/first \$100,000 of chargeable income/i, /\$50,000\.00/, /33/],
    "The Revenue Division income tax page changed its tax threshold, car cap or capital allowance text",
    /Income Tax/i,
  ),
  textoVigente(
    "bn.mof-stamp-duty",
    "https://www.mof.gov.bn/div_revenue_typesoftaxes_stampduty/",
    ["bn.stamp-early-factor", "bn.stamp-early-minimum", "bn.stamp-late-factor", "bn.stamp-late-minimum", "bn.stamp-first-home-loan", "bn.stamp-tenancy-rent"],
    [/double the amount of deficient duty/i, /4 times the amount of deficient duty/i, /\$250,000/],
    "The Revenue Division stamp duty page changed its penalty or exemption text",
    /Stamp Act/i,
  ),
  {
    // La página del MAS se arma con JavaScript y no trae el texto en el HTML: no hay nada que leer sin navegador.
    // El par es un acuerdo de 1967 y no cambia por decreto anual; se revisa a mano con la fuente.
    id: "bn.mas-par",
    carril: "norma",
    datos: ["bn.currency-par"],
    metodo: "manual",
    url: "https://www.mas.gov.sg/currency/brunei-singapore-currency-interchangeability-agreement",
    async traer() {
      return [];
    },
  },
];
