import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { hintamuutos } from "../lib/inflaatio";
import { kuukausiVuosi } from "../lib/paivat";
import series from "../series.json";

const KHI = (series.series.find((s) => s.id === "fi.khi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "fi.inflaatiolaskuri",
  mercado: "fi",
  concepto: "inflacion",
  slug: "inflaatiolaskuri",
  estado: "publicado",
  requiere: { "fi.khi": "serie" },
  campos: [
    { id: "summa", tipo: "moneda", etiqueta: "Summa", min: 0, porDefecto: 1000 },
    { id: "alku", tipo: "fecha", etiqueta: "Kuukausi, jonka hintatasolla summa on", min: "2000-01-01", porDefecto: "2015-01-01", ayuda: "Laskuri käyttää kuukauden indeksiä, päivällä ei ole merkitystä." },
    { id: "loppu", tipo: "fecha", etiqueta: "Kuukausi, jonka hintatasolle muutat", min: "2000-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.summa <= 0) throw new ErrorEntrada("Syötä summa, joka on suurempi kuin nolla.", "summa");
    const m = hintamuutos(KHI, v["fi.khi"], e.alku, e.loppu, { alku: "alku", loppu: "loppu" });
    return {
      nyt: redondear(e.summa * m.kerroin),
      ero: redondear(e.summa * m.kerroin - e.summa),
      ostovoima: redondear(e.summa / m.kerroin),
      inflaatio: m.yhteensa,
      alkuKk: kuukausiVuosi(m.alku),
      loppuKk: kuukausiVuosi(m.loppu),
      observaciones: m.huomiot,
    };
  },
  resultado: [
    { clave: "nyt", etiqueta: "Sama ostovoima loppukuukauden hinnoin", formato: "moneda", destacada: true },
    { clave: "ero", etiqueta: "Lisää inflaation takia", formato: "moneda" },
    { clave: "ostovoima", etiqueta: "Summan arvo alkukuukauden hinnoin", formato: "moneda" },
    { clave: "inflaatio", etiqueta: "Hintojen nousu koko jaksolla", formato: "porcentaje", decimales: 1 },
    { clave: "alkuKk", etiqueta: "Alku", formato: "texto" },
    { clave: "loppuKk", etiqueta: "Loppu", formato: "texto" },
  ],
});
