import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { misthoiEtous, REQUIERE_PAGES } from "../lib/foros";

export default definirCalculadora({
  id: "gr.kostos-ergodoti",
  mercado: "gr",
  concepto: "costo-empleador",
  slug: "kostos-ergodoti",
  estado: "publicado",
  requiere: {
    ...REQUIERE_PAGES,
    "gr.eisfores-ergodoti": "mapa",
    "gr.eisfores-ergazomenou": "mapa",
    "gr.anotato-orio-asfalisis": "numero",
  },
  campos: [
    { id: "miktos", tipo: "moneda", etiqueta: "Μικτός μηνιαίος μισθός", min: 0, porDefecto: 1500 },
    { id: "kpk", tipo: "opcion-dato", dato: "gr.eisfores-ergodoti", etiqueta: "Ασφάλιση", porDefecto: "101" },
  ],
  calcular(e, v, { redondear }) {
    if (e.miktos <= 0) throw new ErrorEntrada("Εισάγετε μικτό μισθό μεγαλύτερο από το μηδέν.", "miktos");
    const misthoi = misthoiEtous(v);
    const vasi = Math.min(e.miktos, v["gr.anotato-orio-asfalisis"]);
    const ergodotisMina = redondear(porcentaje(vasi, enMapa(v["gr.eisfores-ergodoti"], e.kpk)));
    const ergazomenosMina = redondear(porcentaje(vasi, enMapa(v["gr.eisfores-ergazomenou"], e.kpk)));
    const kostosMina = redondear(e.miktos + ergodotisMina);
    const observaciones: string[] = [];
    if (e.miktos > v["gr.anotato-orio-asfalisis"]) observaciones.push("Ο μισθός ξεπερνά το ανώτατο όριο ασφαλιστέων αποδοχών. Οι εισφορές υπολογίζονται μόνο μέχρι το όριο.");
    return {
      kostosMina,
      ergodotisMina,
      ergazomenosMina,
      synolikesEisfores: redondear(ergodotisMina + ergazomenosMina),
      misthoi,
      kostosEtous: redondear(kostosMina * misthoi),
      ergodotisEtous: redondear(ergodotisMina * misthoi),
      observaciones,
    };
  },
  resultado: [
    { clave: "kostosMina", etiqueta: "Κόστος για τον εργοδότη τον μήνα", formato: "moneda", destacada: true },
    { clave: "ergodotisMina", etiqueta: "Εργοδοτικές εισφορές τον μήνα", formato: "moneda" },
    { clave: "ergazomenosMina", etiqueta: "Εισφορές του εργαζομένου τον μήνα (μέσα στον μικτό)", formato: "moneda" },
    { clave: "synolikesEisfores", etiqueta: "Συνολικές εισφορές τον μήνα", formato: "moneda" },
    { clave: "misthoi", etiqueta: "Μισθοί τον χρόνο (με δώρα και επίδομα αδείας)", formato: "numero" },
    { clave: "kostosEtous", etiqueta: "Κόστος του έτους", formato: "moneda" },
    { clave: "ergodotisEtous", etiqueta: "Εργοδοτικές εισφορές του έτους", formato: "moneda" },
  ],
});
