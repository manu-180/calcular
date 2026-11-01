import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "rs.porodiljsko-odsustvo",
  mercado: "rs",
  concepto: "propio",
  slug: "porodiljsko-odsustvo",
  // Nije pročitan prečišćen tekst Zakona o finansijskoj podršci porodici sa decom.
  estado: "borrador",
  requiere: { "rs.porodiljsko-gornja-granica": "numero", "rs.prosecna-bruto": "serie" },
  campos: [{ id: "zbirOsnovica", tipo: "moneda", etiqueta: "Zbir mesečnih osnovica za 18 meseci", min: 0 }],
  calcular(e, v, { redondear }) {
    if (e.zbirOsnovica <= 0) throw new ErrorEntrada("Unesite zbir osnovica veći od nule.", "zbirOsnovica");
    const granica = v["rs.prosecna-bruto"].valor * v["rs.porodiljsko-gornja-granica"];
    return { naknada: redondear(Math.min(e.zbirOsnovica / 18, granica)) };
  },
  resultado: [{ clave: "naknada", etiqueta: "Mesečna naknada", formato: "moneda", destacada: true }],
});
