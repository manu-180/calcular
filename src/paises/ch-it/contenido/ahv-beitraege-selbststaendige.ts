import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.ahv-beitraege-selbststaendige",
  h1: "Calcolo dei contributi AVS degli indipendenti",
  title: "Contributi AVS indipendenti {{anio}}: tavola scalare",
  description: "Contributi AVS/AI/IPG degli indipendenti nel {{anio}}: tavola scalare decrescente fino a 60’500 franchi, aliquota piena oltre e contributo minimo di {{ch.ahv-mindestbeitrag-selbststaendige}}.",
  intro: [
    "Gli indipendenti pagano da soli i contributi AVS, AI e IPG. Per i redditi più bassi vale un'aliquota ridotta: la tavola scalare decrescente.",
    "Chi guadagna molto poco paga il contributo minimo di {{ch.ahv-mindestbeitrag-selbststaendige}} all'anno.",
  ],
  comoSeCalcula: [
    "Il calcolatore cerca lo scaglione della tavola in cui rientra il tuo reddito annuo e applica la sua aliquota a tutto il reddito.",
    "Da 60’500 franchi vale l'aliquota piena del 10 %: AVS 8.1 %, AI 1.4 % e IPG 0.5 %.",
    "Se il reddito è inferiore allo scaglione più basso, è dovuto il contributo minimo.",
  ],
  ejemplo: [
    "Con un reddito di 50’000 franchi l'aliquota è del 7.84 %. Il contributo annuo ammonta a 3920 franchi, circa 327 franchi al mese.",
  ],
  faq: [
    { pregunta: "Quale reddito conta?", respuesta: "La cassa di compensazione fissa i contributi definitivi sulla base della tassazione fiscale. Aggiunge al reddito netto i contributi personali AVS/AI/IPG e deduce un interesse sul capitale proprio investito nell'azienda." },
    { pregunta: "Ci sono costi aggiuntivi?", respuesta: "Sì. Le casse di compensazione riscuotono contributi alle spese di amministrazione fino al 5 % dei contributi." },
    { pregunta: "Devo versare anche all'assicurazione contro la disoccupazione?", respuesta: "No. All'AD sono tenuti a contribuire i dipendenti e i datori di lavoro, non il reddito da attività indipendente." },
  ],
  glosario: [
    { termino: "Tavola scalare decrescente", definicion: "Aliquote AVS/AI/IPG più basse per gli indipendenti con reddito modesto." },
    { termino: "Cassa di compensazione", definicion: "Organo che riscuote i contributi AVS e versa le rendite." },
  ],
});
