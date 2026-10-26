import { definirCalculadora } from "@/motor/calculo";
import { anaEti, elegxosEton, prosthesiMinon } from "../lib/apolysi";

export default definirCalculadora({
  id: "gr.proeidopoiisi-apolysis",
  mercado: "gr",
  concepto: "preaviso",
  slug: "proeidopoiisi-apolysis",
  estado: "publicado",
  requiere: { "gr.proeidopoiisi-mines": "mapa" },
  campos: [
    { id: "eti", tipo: "entero", etiqueta: "Συμπληρωμένα έτη στον εργοδότη", min: 0, max: 60, porDefecto: 3 },
    { id: "imerominia", tipo: "fecha", etiqueta: "Ημερομηνία της έγγραφης προειδοποίησης", porDefecto: "hoy" },
  ],
  calcular(e, v) {
    elegxosEton(e.eti, "eti");
    const mines = anaEti(v["gr.proeidopoiisi-mines"], e.eti);
    const observaciones: string[] = [];
    if (mines === 0) observaciones.push("Τους πρώτους 12 μήνες η σύμβαση θεωρείται δοκιμαστική: η απόλυση γίνεται χωρίς προειδοποίηση και χωρίς αποζημίωση, εκτός αν συμφωνήθηκε κάτι άλλο.");
    else observaciones.push("Με έγγραφη προειδοποίηση ο εργοδότης πληρώνει τη μισή αποζημίωση, στη λήξη του χρόνου προειδοποίησης. Μέχρι τότε πληρώνεται κανονικά ο μισθός.");
    return { mines, lixi: mines === 0 ? null : prosthesiMinon(e.imerominia, mines), observaciones };
  },
  resultado: [
    { clave: "mines", etiqueta: "Χρόνος προειδοποίησης", formato: "meses", destacada: true },
    { clave: "lixi", etiqueta: "Λήξη της προειδοποίησης (λύση της σύμβασης)", formato: "fecha" },
  ],
});
