import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { cenuIzmaina } from "../lib/inflacija";
import series from "../series.json";

const PCI = (series.series.find((s) => s.id === "lv.pci")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "lv.inflacijas-kalkulators",
  mercado: "lv",
  concepto: "inflacion",
  slug: "inflacijas-kalkulators",
  estado: "publicado",
  requiere: { "lv.pci": "serie" },
  campos: [
    { id: "summa", tipo: "moneda", etiqueta: "Summa", min: 0, porDefecto: 1000 },
    { id: "no", tipo: "fecha", etiqueta: "Sākuma mēnesis", min: "2000-01-01", porDefecto: "2020-01-01", ayuda: "Nozīme ir tikai mēnesim, diena rezultātu neietekmē." },
    { id: "lidz", tipo: "fecha", etiqueta: "Beigu mēnesis", min: "2000-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.summa <= 0) throw new ErrorEntrada("Ievadiet summu, kas lielāka par nulli.", "summa");
    const iz = cenuIzmaina(PCI, v["lv.pci"], e.no, e.lidz);
    const tagad = redondear(e.summa * iz.reizinatajs);
    return {
      tagad,
      starpiba: redondear(tagad - e.summa),
      vertiba: redondear(e.summa / iz.reizinatajs),
      izmaina: (iz.reizinatajs - 1) * 100,
      noMenesis: iz.no,
      lidzMenesis: iz.lidz,
      observaciones: iz.piezimes,
    };
  },
  resultado: [
    { clave: "tagad", etiqueta: "Summa ar tādu pašu pirktspēju", formato: "moneda", destacada: true },
    { clave: "starpiba", etiqueta: "Starpība cenu izmaiņu dēļ", formato: "moneda" },
    { clave: "vertiba", etiqueta: "Šīs summas vērtība sākuma mēneša cenās", formato: "moneda" },
    { clave: "izmaina", etiqueta: "Cenu izmaiņas par visu periodu", formato: "porcentaje", decimales: 1 },
    { clave: "noMenesis", etiqueta: "Sākuma mēnesis", formato: "fecha" },
    { clave: "lidzMenesis", etiqueta: "Beigu mēnesis", formato: "fecha" },
  ],
});
