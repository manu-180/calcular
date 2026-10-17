import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "it.tfr",
  mercado: "it",
  concepto: "fondo-cesantia",
  slug: "calcolo-tfr",
  estado: "publicado",
  requiere: {
    "it.tfr": "mapa",
    "it.tfr-contributo": "numero",
    "it.tfr-imposta-rivalutazione": "numero",
  },
  campos: [
    { id: "retribuzione", tipo: "moneda", etiqueta: "Retribuzione annua lorda", ayuda: "Comprese tredicesima e quattordicesima, se le hai.", min: 0, porDefecto: 30000 },
    { id: "mesi", tipo: "entero", etiqueta: "Mesi lavorati nell'anno", ayuda: "Una frazione di 15 giorni o più conta come mese intero.", min: 1, max: 12, porDefecto: 12 },
    { id: "fondo", tipo: "moneda", etiqueta: "TFR già accantonato al 31 dicembre dell'anno prima", min: 0, porDefecto: 0 },
    {
      id: "inflazione",
      tipo: "porcentaje",
      etiqueta: "Aumento dell'indice ISTAT FOI da dicembre (%)",
      ayuda: "Facoltativo. È la variazione dei prezzi rispetto a dicembre dell'anno prima, pubblicata ogni mese dall'ISTAT. Senza questo dato la rivalutazione usa solo la parte fissa.",
      min: -20,
      max: 50,
      requerido: false,
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.mesi < 1 || e.mesi > 12) throw new ErrorEntrada("I mesi vanno da 1 a 12.", "mesi");
    const regole = v["it.tfr"];
    const retribuzioneAnno = (e.retribuzione * e.mesi) / 12;
    const quotaLorda = redondear(retribuzioneAnno / regole.divisore);
    const contributo = redondear(porcentaje(retribuzioneAnno, v["it.tfr-contributo"]));
    const quotaNetta = redondear(Math.max(0, quotaLorda - contributo));
    const tasso = (regole["tasso-fisso"] * e.mesi) / 12 + ((e.inflazione ?? 0) * regole["quota-istat"]) / 100;
    const rivalutazione = redondear(Math.max(0, porcentaje(e.fondo, tasso)));
    const imposta = redondear(porcentaje(rivalutazione, v["it.tfr-imposta-rivalutazione"]));
    const rivalutazioneNetta = redondear(rivalutazione - imposta);
    const observaciones: string[] = [];
    if (e.inflazione === null && e.fondo > 0) observaciones.push("Senza l'indice ISTAT la rivalutazione considera solo la parte fissa: quella reale di solito è un po' più alta.");
    observaciones.push("Il TFR che ricevi alla fine del rapporto paga l'IRPEF con la tassazione separata: questo calcolo mostra l'importo lordo.");
    return {
      quotaLorda,
      contributo,
      quotaNetta,
      tasso,
      rivalutazione,
      imposta,
      rivalutazioneNetta,
      totale: redondear(e.fondo + rivalutazioneNetta + quotaNetta),
      observaciones,
    };
  },
  resultado: [
    { clave: "totale", etiqueta: "TFR maturato in totale", formato: "moneda", destacada: true },
    { clave: "quotaLorda", etiqueta: "Quota TFR dell'anno", formato: "moneda" },
    { clave: "contributo", etiqueta: "Contributo aggiuntivo INPS trattenuto", formato: "moneda" },
    { clave: "quotaNetta", etiqueta: "Quota accantonata", formato: "moneda" },
    { clave: "tasso", etiqueta: "Tasso di rivalutazione", formato: "porcentaje", decimales: 4, ocultarSiCero: true },
    { clave: "rivalutazione", etiqueta: "Rivalutazione lorda", formato: "moneda", ocultarSiCero: true },
    { clave: "imposta", etiqueta: "Imposta sostitutiva sulla rivalutazione", formato: "moneda", ocultarSiCero: true },
    { clave: "rivalutazioneNetta", etiqueta: "Rivalutazione netta", formato: "moneda", ocultarSiCero: true },
  ],
});
