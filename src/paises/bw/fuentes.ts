import { esFechaISO } from "@/motor/vigencia";
import type { Detector, HallazgoNorma, PuntoSerie } from "@/motor/tipos";

const MESES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Último año de leyes y de tabla de PAYE ya leído (Income Tax Act y VAT Act de 2026, Tax Table_2026).
const ULTIMO_ANIO_LEIDO = 2026;

export const detectores: readonly Detector[] = [
  {
    id: "bw.cpi-statsbots",
    carril: "serie",
    serie: "bw.cpi-annual",
    metodo: "html",
    url: "https://www.statsbots.org.bw/",
    // Desde fuera de Botswana el sitio falla la verificación TLS.
    tlsTolerante: true,
    // Es una variación interanual en puntos: en abril de 2026 saltó de 4,2 a 10,3.
    banda: { min: -5, max: 25, saltoRelativoMax: 1.6 },
    async traer(http) {
      const html = await http.texto(this.url, { tlsTolerante: true });
      // La portada trae el gráfico «National Inflation Rate» como JSON escapado: {\"name\":\"Aug-26\",\"y\":9.3}.
      const i = html.indexOf("National Inflation Rate");
      if (i < 0) return null;
      const puntos: PuntoSerie[] = [];
      for (const m of html.slice(i, i + 30000).matchAll(/\{\\?"name\\?":\\?"([A-Z][a-z]{2})-(\d{2})\\?",\\?"y\\?":(-?[\d.]+)\}/g)) {
        const mes = MESES.indexOf(m[1]);
        const fecha = `20${m[2]}-${String(mes + 1).padStart(2, "0")}-01`;
        const valor = Number(m[3]);
        if (mes < 0 || !esFechaISO(fecha) || !Number.isFinite(valor)) return null;
        puntos.push({ fecha, valor });
      }
      puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
      return puntos.length >= 12 ? puntos : null;
    },
  },
  {
    id: "bw.burs-leyes",
    carril: "norma",
    datos: [
      "bw.paye-resident",
      "bw.paye-non-resident",
      "bw.cgt-individual",
      "bw.company-tax",
      "bw.wht-resident",
      "bw.wht-non-resident",
      "bw.wht-domestic-threshold",
      "bw.vat",
      "bw.vat-registration-threshold",
      "bw.gratuity-exempt-share",
      "bw.lump-sum-exempt-share",
      "bw.pension-deduction-cap",
      "bw.car-benefit-rate",
    ],
    metodo: "html",
    url: "https://www.burs.org.bw/",
    async traer(http) {
      const html = await http.texto(this.url);
      // BURS abre una página «Tax Laws <año>» por cada tanda de leyes y sube la tabla de PAYE como
      // «Tax Table_<año>.pdf». Un año nuevo en cualquiera de los dos es señal de cambio.
      const leyes = [...html.matchAll(/href="(\/index\.php\/tax\/tax-laws-(\d{4}))"/g)];
      if (leyes.length === 0) return null;
      const hallazgos: HallazgoNorma[] = [];
      const sumar = (titulo: string, ruta: string, anio: string) => {
        const fecha = `${anio}-01-01`;
        if (Number(anio) > ULTIMO_ANIO_LEIDO && esFechaISO(fecha)) hallazgos.push({ titulo, url: `https://www.burs.org.bw${ruta.replace(/ /g, "%20")}`, fecha });
      };
      for (const m of leyes) sumar(`BURS Tax Laws ${m[2]}`, m[1], m[2]);
      for (const m of html.matchAll(/href="(\/images\/Tax(?:%20| )Table_(\d{4})\.pdf)"/g)) sumar(`BURS Tax Table ${m[2]}`, m[1], m[2]);
      return hallazgos;
    },
  },
];
