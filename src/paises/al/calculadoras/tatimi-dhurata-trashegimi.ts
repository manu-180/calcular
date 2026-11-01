import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "al.tatimi-dhurata-trashegimi",
  mercado: "al",
  concepto: "propio",
  slug: "tatimi-dhurata-trashegimi",
  estado: "publicado",
  requiere: { "al.tatim-dhurate": "numero", "al.perjashtim-dhurate": "mapa" },
  campos: [
    { id: "vlera", tipo: "moneda", etiqueta: "Vlera e dhuratës ose trashëgimisë", min: 0, porDefecto: 8000000 },
    { id: "lloji", tipo: "opcion-dato", dato: "al.perjashtim-dhurate", etiqueta: "Lloji i pasurisë", porDefecto: "paluajtshme" },
    { id: "familje", tipo: "si-no", etiqueta: "Merrni nga trashëgimtar ligjor i radhës së parë ose të dytë, ose nga motër a vëlla", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.vlera <= 0) throw new ErrorEntrada("Vendosni vlerën e pasurisë.", "vlera");
    const perjashtim = e.familje ? e.vlera : Math.min(e.vlera, enMapa(v["al.perjashtim-dhurate"], e.lloji));
    const baza = e.vlera - perjashtim;
    return { tatimi: redondear((baza * v["al.tatim-dhurate"]) / 100), perjashtim, baza };
  },
  resultado: [
    { clave: "tatimi", etiqueta: "Tatimi për t'u paguar", formato: "moneda", destacada: true },
    { clave: "perjashtim", etiqueta: "Pjesa e përjashtuar", formato: "moneda" },
    { clave: "baza", etiqueta: "Pjesa e tatueshme", formato: "moneda" },
  ],
});
