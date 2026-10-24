import { esFechaISO } from "@/motor/vigencia";
import type { Detector, HallazgoNorma } from "@/motor/tipos";

const VERIFICADO = "2026-10-23";

export const detectores: readonly Detector[] = [
  {
    // La página de membresía del NSSF dice en una oración cuánto descuenta el empleador y cuánto
    // aporta. Si la oración cambia, hay que volver a leer las tasas.
    id: "ug.nssf-membership",
    carril: "norma",
    datos: ["ug.nssf-employee", "ug.nssf-employer"],
    metodo: "html",
    url: "https://www.nssfug.org/about-us/membership/",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const texto = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
      const m = /deduct (\d+(?:\.\d+)?)% from the employee.{0,80}?add (\d+(?:\.\d+)?)%/i.exec(texto);
      if (!m) return null;
      if (m[1] === "5" && m[2] === "10") return [];
      const hallazgos: HallazgoNorma[] = [{ titulo: `NSSF rates now ${m[1]}% and ${m[2]}%`, url: this.url, fecha: "2026-10-24" }];
      return hallazgos;
    },
  },
  {
    // La lista de proyectos de ley tributarios del Parlamento cambia con cada presupuesto; un
    // proyecto de un año posterior anticipa cambios en el impuesto a la renta.
    id: "ug.parliament-tax-bills",
    carril: "norma",
    datos: ["ug.paye-bands", "ug.paye-threshold-monthly", "ug.rental-tax-rate", "ug.rental-tax-threshold", "ug.company-tax-rate"],
    metodo: "html",
    url: "https://www.parliament.go.ug/page/tax-bills-2026",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const anios = [...html.matchAll(/Income%20Tax%20\(Amendment\)%20Bill%2C%20(20\d{2})/g)].map((m) => Number(m[1]));
      if (!anios.length) return null;
      const ultimo = Math.max(...anios);
      const fecha = `${ultimo}-07-01`;
      if (ultimo <= 2026 || !esFechaISO(fecha) || fecha <= VERIFICADO) return [];
      return [{ titulo: `Income Tax (Amendment) Bill, ${ultimo}`, url: this.url, fecha }];
    },
  },
];
