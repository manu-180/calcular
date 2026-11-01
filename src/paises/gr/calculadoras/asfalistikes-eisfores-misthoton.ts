import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gr.asfalistikes-eisfores-misthoton",
  mercado: "gr",
  concepto: "aportes-seguridad-social",
  slug: "asfalistikes-eisfores-misthoton",
  estado: "publicado",
  requiere: {
    "gr.eisfores-ergazomenou": "mapa",
    "gr.eisfores-ergodoti": "mapa",
    "gr.eisfores-ygeias": "mapa",
    "gr.eisfores-dypa": "mapa",
    "gr.anotato-orio-asfalisis": "numero",
  },
  campos: [
    { id: "miktos", tipo: "moneda", etiqueta: "Μικτές μηνιαίες αποδοχές", min: 0, porDefecto: 1500 },
    { id: "kpk", tipo: "opcion-dato", dato: "gr.eisfores-ergazomenou", etiqueta: "Ασφάλιση", porDefecto: "101" },
  ],
  calcular(e, v, { redondear }) {
    if (e.miktos <= 0) throw new ErrorEntrada("Εισάγετε μικτές αποδοχές μεγαλύτερες από το μηδέν.", "miktos");
    const vasi = Math.min(e.miktos, v["gr.anotato-orio-asfalisis"]);
    const ergazomenos = redondear(porcentaje(vasi, enMapa(v["gr.eisfores-ergazomenou"], e.kpk)));
    const ergodotis = redondear(porcentaje(vasi, enMapa(v["gr.eisfores-ergodoti"], e.kpk)));
    const ygeiaErgazomenou = redondear(porcentaje(vasi, enMapa(v["gr.eisfores-ygeias"], "ergazomenos")));
    const dypaErgazomenou = redondear(porcentaje(vasi, enMapa(v["gr.eisfores-dypa"], "ergazomenos")));
    const observaciones: string[] = [];
    if (e.miktos > v["gr.anotato-orio-asfalisis"]) observaciones.push("Οι αποδοχές ξεπερνούν το ανώτατο όριο. Οι εισφορές υπολογίζονται μόνο μέχρι το όριο.");
    return {
      ergazomenos,
      syntaxiErgazomenou: redondear(ergazomenos - ygeiaErgazomenou - dypaErgazomenou),
      ygeiaErgazomenou,
      dypaErgazomenou,
      ergodotis,
      synolo: redondear(ergazomenos + ergodotis),
      vasi: redondear(vasi),
      observaciones,
    };
  },
  resultado: [
    { clave: "ergazomenos", etiqueta: "Εισφορές του εργαζομένου", formato: "moneda", destacada: true },
    { clave: "syntaxiErgazomenou", etiqueta: "Από αυτές: σύνταξη (κύρια και επικουρική)", formato: "moneda" },
    { clave: "ygeiaErgazomenou", etiqueta: "Από αυτές: υγειονομική περίθαλψη", formato: "moneda" },
    { clave: "dypaErgazomenou", etiqueta: "Από αυτές: ΔΥΠΑ (ανεργία και λοιπές)", formato: "moneda" },
    { clave: "ergodotis", etiqueta: "Εισφορές του εργοδότη", formato: "moneda" },
    { clave: "synolo", etiqueta: "Συνολικές εισφορές", formato: "moneda" },
    { clave: "vasi", etiqueta: "Αποδοχές πάνω στις οποίες υπολογίστηκαν", formato: "moneda" },
  ],
});
