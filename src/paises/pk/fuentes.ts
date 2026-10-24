import { esFechaISO } from "@/motor/vigencia";
import type { Detector, HallazgoNorma } from "@/motor/tipos";

const VERIFICADO = "2026-10-17";
const MESES = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

// La portada del SBP muestra "As on 16- Oct - 2026" y debajo "M2M Revaluation Rate" con el valor;
// solo trae el día publicado, así que cada corrida suma un punto.
function puntoSbp(html: string): { fecha: string; valor: number } | null {
  const texto = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const f = /As on (\d{1,2})\s*-\s*([A-Za-z]{3})\s*-\s*(\d{4})/.exec(texto);
  const v = /M2M Revaluation Rate\s*([\d.]+)/.exec(texto);
  if (!f || !v) return null;
  const mes = MESES.indexOf(f[2].toLowerCase()) + 1;
  const fecha = `${f[3]}-${String(mes).padStart(2, "0")}-${f[1].padStart(2, "0")}`;
  const valor = Number(v[1]);
  if (mes === 0 || !esFechaISO(fecha) || !Number.isFinite(valor)) return null;
  return { fecha, valor };
}

export const detectores: readonly Detector[] = [
  {
    id: "pk.usd-pkr-sbp",
    carril: "serie",
    serie: "pk.usd-pkr",
    metodo: "html",
    url: "https://www.sbp.org.pk/",
    userAgentNavegador: true,
    banda: { min: 200, max: 450, saltoRelativoMax: 0.05 },
    async traer(http) {
      const p = puntoSbp(await http.texto(this.url, { userAgentNavegador: true }));
      return p && esFechaISO(p.fecha) ? [{ fecha: p.fecha, valor: p.valor }] : null;
    },
  },
  {
    // La página de tasas de National Savings anuncia "w.e.f. dd-mm-aaaa"; una fecha nueva es un
    // cambio de tasas que hay que volver a leer.
    id: "pk.nss-rates",
    carril: "norma",
    datos: ["pk.nss-rates", "pk.nss-wht-filer", "pk.nss-wht-nonfiler"],
    metodo: "html",
    url: "https://savings.gov.pk/latest-profit-rates/",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const m = /w\.e\.f\.?\s*(\d{2})-(\d{2})-(\d{4})/i.exec(html);
      if (!m) return null;
      const fecha = `${m[3]}-${m[2]}-${m[1]}`;
      if (!esFechaISO(fecha)) return null;
      const hallazgos: HallazgoNorma[] = fecha > VERIFICADO ? [{ titulo: `NSS profit rates w.e.f. ${m[1]}-${m[2]}-${m[3]}`, url: this.url, fecha }] : [];
      return hallazgos;
    },
  },
  {
    // El listado de Finance Acts del FBR pone primero la ley más nueva ("Finance Act 2026"). Una
    // ley de un año posterior trae tablas nuevas de salario y de retenciones.
    id: "pk.fbr-finance-acts",
    carril: "norma",
    datos: ["pk.salary-tax-slabs", "pk.wht-236c", "pk.wht-236k", "pk.wht-foreign-card", "pk.profit-on-debt-bank", "pk.sales-tax"],
    metodo: "html",
    url: "https://www.fbr.gov.pk/Categ/Finance-Acts/620",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const anios = [...html.matchAll(/Finance Act,?\s*(20\d{2})/gi)].map((m) => Number(m[1]));
      if (!anios.length) return null;
      const ultimo = Math.max(...anios);
      const fecha = `${ultimo}-07-01`;
      if (ultimo <= 2026 || !esFechaISO(fecha)) return [];
      return [{ titulo: `Finance Act ${ultimo}`, url: this.url, fecha }];
    },
  },
];
