import type { MercadoEdicion } from "@/motor/registro";

// he-001 (hebreo sin país, como en-001, ja-001 y ar-001): con he-IL compartiría locale con Israel en
// hreflang cuando el país se publique.
export const mercado: MercadoEdicion = {
  codigo: "zz-he",
  pais: "ZZ",
  nombre: "זטלנד",
  locale: "he-001",
  idioma: "he",
  trato: "usted",
  estado: "interno",
  regiones: [
    { id: "norte", nombre: "האזור הצפוני" },
    { id: "sur", nombre: "האזור הדרומי" },
  ],
};
