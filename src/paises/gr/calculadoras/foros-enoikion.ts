import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gr.foros-enoikion",
  mercado: "gr",
  concepto: "propio",
  slug: "foros-enoikion",
  estado: "publicado",
  requiere: { "gr.klimaka-enoikion": "escala", "gr.ekptosi-enoikion": "numero" },
  campos: [
    { id: "enoikia", tipo: "moneda", etiqueta: "Ενοίκια του έτους (ακαθάριστα)", min: 0, porDefecto: 9600 },
    { id: "fysiko", tipo: "si-no", etiqueta: "Είστε φυσικό πρόσωπο", ayuda: "Τα φυσικά πρόσωπα αφαιρούν ένα ποσοστό για επισκευές και συντήρηση.", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.enoikia <= 0) throw new ErrorEntrada("Εισάγετε ενοίκια μεγαλύτερα από το μηδέν.", "enoikia");
    const ekptosi = e.fysiko ? redondear(porcentaje(e.enoikia, v["gr.ekptosi-enoikion"])) : 0;
    const katharo = redondear(e.enoikia - ekptosi);
    const foros = redondear(aplicarEscalaMarginal(v["gr.klimaka-enoikion"], katharo));
    return {
      foros,
      ekptosi,
      katharo,
      mesos: katharo > 0 ? (foros / katharo) * 100 : 0,
      meta: redondear(e.enoikia - foros),
      forosMina: redondear(foros / 12),
    };
  },
  resultado: [
    { clave: "foros", etiqueta: "Φόρος ενοικίων του έτους", formato: "moneda", destacada: true },
    { clave: "ekptosi", etiqueta: "Έκπτωση για επισκευές και συντήρηση", formato: "moneda", ocultarSiCero: true },
    { clave: "katharo", etiqueta: "Καθαρό εισόδημα από ενοίκια", formato: "moneda" },
    { clave: "mesos", etiqueta: "Μέσος συντελεστής", formato: "porcentaje", decimales: 2 },
    { clave: "meta", etiqueta: "Ενοίκια μετά τον φόρο", formato: "moneda" },
    { clave: "forosMina", etiqueta: "Φόρος ανά μήνα (διά 12)", formato: "moneda" },
  ],
});
