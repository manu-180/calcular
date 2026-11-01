import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { amisTari, gnachi } from "../lib/gnach";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "am.gnach")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "am.gnachi-hashvich",
  mercado: "am",
  concepto: "inflacion",
  slug: "gnachi-hashvich",
  estado: "publicado",
  requiere: { "am.gnach": "serie" },
  campos: [
    { id: "gumar", tipo: "moneda", etiqueta: "Գումար", min: 0, porDefecto: 100000 },
    { id: "sksum", tipo: "fecha", etiqueta: "Ո՞ր ամսվա գումարն է", min: "2018-12-01", porDefecto: "2020-01-01", ayuda: "Հաշվի է առնվում միայն ամիսը։" },
    { id: "verj", tipo: "fecha", etiqueta: "Ո՞ր ամսվա գներով հաշվարկել", min: "2018-12-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.gumar <= 0) throw new ErrorEntrada("Մուտքագրեք զրոյից մեծ գումար։", "gumar");
    const p = gnachi(IPC, v["am.gnach"], e.sksum, e.verj);
    return {
      arzheq: redondear(e.gumar * p.gortakits),
      tarberutyun: redondear(e.gumar * p.gortakits - e.gumar),
      yndhanur: p.yndhanur,
      skizb: amisTari(p.sksum),
      avart: amisTari(p.verj),
      observaciones: p.nshumner,
    };
  },
  resultado: [
    { clave: "arzheq", etiqueta: "Նույն գնողունակությունը", formato: "moneda", destacada: true },
    { clave: "tarberutyun", etiqueta: "Տարբերությունը գնաճի պատճառով", formato: "moneda" },
    { clave: "yndhanur", etiqueta: "Գնաճը ամբողջ ժամանակահատվածում", formato: "porcentaje", decimales: 1 },
    { clave: "skizb", etiqueta: "Սկզբի ամիս", formato: "texto" },
    { clave: "avart", etiqueta: "Ավարտի ամիս", formato: "texto" },
  ],
});
