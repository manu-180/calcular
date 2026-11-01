import { definirCalculadora } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { kuuAasta, thiMuutus } from "../lib/thi";
import { suuremNullist } from "../lib/palk";
import series from "../series.json";

const THI = (series.series.find((s) => s.id === "ee.thi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "ee.inflatsiooni-kalkulaator",
  mercado: "ee",
  concepto: "inflacion",
  slug: "inflatsiooni-kalkulaator",
  estado: "publicado",
  requiere: { "ee.thi": "serie" },
  campos: [
    { id: "summa", tipo: "moneda", etiqueta: "Summa", min: 0, porDefecto: 1000 },
    { id: "algus", tipo: "fecha", etiqueta: "Mis kuu hinnad?", min: "2015-01-01", porDefecto: "2020-01-01", ayuda: "Arvesse läheb ainult kuu, mitte päev." },
    { id: "lopp", tipo: "fecha", etiqueta: "Mis kuuni arvutan?", min: "2015-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    suuremNullist(e.summa, "summa");
    const m = thiMuutus(THI, v["ee.thi"], e.algus, e.lopp);
    return {
      tana: redondear(e.summa * m.kordaja),
      vahe: redondear(e.summa * m.kordaja - e.summa),
      vaartus: redondear(e.summa / m.kordaja),
      muutus: m.muutus,
      algusKuu: kuuAasta(m.algus),
      loppKuu: kuuAasta(m.lopp),
      observaciones: m.markused,
    };
  },
  resultado: [
    { clave: "tana", etiqueta: "Sama ostujõud lõppkuul", formato: "moneda", destacada: true },
    { clave: "vahe", etiqueta: "Hindade tõusust tulev vahe", formato: "moneda" },
    { clave: "vaartus", etiqueta: "Summa väärtus alguskuu hindades", formato: "moneda" },
    { clave: "muutus", etiqueta: "Hinnamuutus kogu perioodil", formato: "porcentaje", decimales: 1 },
    { clave: "algusKuu", etiqueta: "Alguskuu", formato: "texto" },
    { clave: "loppKuu", etiqueta: "Lõppkuu", formato: "texto" },
  ],
});
