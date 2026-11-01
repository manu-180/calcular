import type { Detector, FechaISO } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-29";

export const detectores: readonly Detector[] = [
  {
    // La página de tasas de FRCS no lleva fecha por entrada: si deja de mostrar la fila del 33 % sobre
    // 270,000, la tabla de impuesto a la renta cambió y hay que releerla.
    id: "fj.frcs-income-tax-bands",
    carril: "norma",
    datos: ["fj.paye-bands", "fj.paye-bands-non-resident", "fj.fbt-rate", "fj.cgt-rate", "fj.withholding-rates"],
    metodo: "html",
    url: "https://frcs.org.fj/tax-rates-and-codes",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      if (!/Resident Income Tax Rate/i.test(html)) return null;
      const igual = /\$47,600 \+ 33% of excess over \$270,000/.test(html) && /\$318,500 \+ 39% of excess over \$1,000,000/.test(html);
      return igual ? [] : [{ titulo: "FRCS tax rates page no longer shows the 2024 resident income tax bands", url: this.url, fecha: VERIFICADO }];
    },
  },
  {
    id: "fj.frcs-vat-rate",
    carril: "norma",
    datos: ["fj.vat", "fj.vat-threshold"],
    metodo: "html",
    url: "https://frcs.org.fj/our-services/taxation-section/non-individuals/reporting-and-paying-taxes/vat-guide/",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      if (!/Value Added Tax/i.test(html)) return null;
      const igual = /12\.5%/.test(html) && /registration threshold of \$100,000/.test(html);
      return igual ? [] : [{ titulo: "FRCS VAT guide no longer shows 12.5% with a FJ$100,000 registration threshold", url: this.url, fecha: VERIFICADO }];
    },
  },
];
