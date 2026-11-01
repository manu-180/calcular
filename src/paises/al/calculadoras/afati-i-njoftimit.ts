import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "al.afati-i-njoftimit",
  mercado: "al",
  concepto: "preaviso",
  slug: "afati-i-njoftimit",
  estado: "borrador",
  requiere: { "al.afat-njoftimi": "mapa" },
  campos: [{ id: "muaj", tipo: "entero", etiqueta: "Muaj pune te punëdhënësi", min: 0, porDefecto: 24 }],
  calcular(e, v) {
    if (e.muaj <= 0) throw new ErrorEntrada("Vendosni muajt e punës.", "muaj");
    const m = v["al.afat-njoftimi"];
    const dite = e.muaj <= 6 ? enMapa(m, "deri-6m") : e.muaj <= 24 ? enMapa(m, "deri-2v") : e.muaj <= 60 ? enMapa(m, "deri-5v") : enMapa(m, "mbi-5v");
    return { dite };
  },
  resultado: [{ clave: "dite", etiqueta: "Afati i njoftimit", formato: "dias", destacada: true }],
});
