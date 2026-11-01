import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cy.eisfores-gesy",
  mercado: "cy",
  concepto: "propio",
  slug: "eisfores-gesy",
  estado: "publicado",
  requiere: { "cy.eisfores-gesy": "mapa", "cy.anotato-orio-gesy": "numero" },
  campos: [
    { id: "misthoi", tipo: "moneda", etiqueta: "Μισθοί του έτους", min: 0, porDefecto: 30000 },
    { id: "autotelos", tipo: "moneda", etiqueta: "Εισόδημα ως αυτοτελώς εργαζόμενος", min: 0, porDefecto: 0 },
    { id: "syntaxi", tipo: "moneda", etiqueta: "Συντάξεις του έτους", min: 0, porDefecto: 0 },
    { id: "eisodimata", tipo: "moneda", etiqueta: "Ενοίκια, τόκοι και μερίσματα", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    const synolo = e.misthoi + e.autotelos + e.syntaxi + e.eisodimata;
    if (synolo <= 0) throw new ErrorEntrada("Εισάγετε τουλάχιστον ένα εισόδημα.", "misthoi");
    const g = v["cy.eisfores-gesy"];
    // Art. 19(4)(β): el tope se llena primero con sueldos, después pensiones y al final otras rentas.
    let ypoloipo = v["cy.anotato-orio-gesy"];
    const meros = (poso: number) => {
      const x = Math.min(poso, ypoloipo);
      ypoloipo -= x;
      return x;
    };
    const apoMisthous = redondear(porcentaje(meros(e.misthoi), enMapa(g, "misthotos")));
    const apoAutotelos = redondear(porcentaje(meros(e.autotelos), enMapa(g, "autotelos")));
    const apoSyntaxi = redondear(porcentaje(meros(e.syntaxi), enMapa(g, "syntaxiouchos")));
    const apoEisodimata = redondear(porcentaje(meros(e.eisodimata), enMapa(g, "eisodimatias")));
    const eisfora = redondear(apoMisthous + apoAutotelos + apoSyntaxi + apoEisodimata);
    const observaciones: string[] = [];
    if (synolo > v["cy.anotato-orio-gesy"]) observaciones.push("Τα εισοδήματά σας ξεπερνούν το ανώτατο όριο. Πάνω από αυτό δεν πληρώνεται εισφορά ΓεΣΥ.");
    return {
      eisfora,
      apoMisthous,
      apoAutotelos,
      apoSyntaxi,
      apoEisodimata,
      ergodotis: redondear(porcentaje(Math.min(e.misthoi, v["cy.anotato-orio-gesy"]), enMapa(g, "ergodotis"))),
      observaciones,
    };
  },
  resultado: [
    { clave: "eisfora", etiqueta: "Δική σας εισφορά ΓεΣΥ του έτους", formato: "moneda", destacada: true },
    { clave: "apoMisthous", etiqueta: "Από μισθούς", formato: "moneda", ocultarSiCero: true },
    { clave: "apoAutotelos", etiqueta: "Από αυτοτελή εργασία", formato: "moneda", ocultarSiCero: true },
    { clave: "apoSyntaxi", etiqueta: "Από συντάξεις", formato: "moneda", ocultarSiCero: true },
    { clave: "apoEisodimata", etiqueta: "Από ενοίκια, τόκους και μερίσματα", formato: "moneda", ocultarSiCero: true },
    { clave: "ergodotis", etiqueta: "Εισφορά του εργοδότη για τους μισθούς σας", formato: "moneda", ocultarSiCero: true },
  ],
});
