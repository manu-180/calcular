import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cz.prumerny-vydelek",
  h1: "Výpočet průměrného výdělku",
  title: "Průměrný výdělek: výpočet hodinového a měsíčního",
  description:
    "Spočítejte průměrný hodinový a měsíční výdělek podle zákoníku práce. Potřebujete ho pro náhradu mzdy za dovolenou, odstupné, přesčasy a další náhrady.",
  intro: [
    "Průměrný výdělek je základ pro náhradu mzdy za dovolenou, odstupné, příplatky za přesčas a další náhrady. Zaměstnavatel ho počítá z mzdy a odpracovaných hodin za předchozí kalendářní čtvrtletí.",
    "Kalkulačka spočítá průměrný hodinový výdělek a přepočte ho na měsíc.",
  ],
  comoSeCalcula: [
    "Průměrný hodinový výdělek je hrubá mzda zúčtovaná za předchozí čtvrtletí vydělená počtem odpracovaných hodin v tomto čtvrtletí.",
    "Průměrný měsíční výdělek je hodinový výdělek × týdenní pracovní doba × 4,348 (průměrný počet týdnů v měsíci).",
    "Průměrný výdělek nesmí být nižší než minimální mzda. Hodinová minimální mzda je v roce 2026 {{cz.minimalni-mzda-hodinova}} při 40 hodinách týdně.",
  ],
  ejemplo: ["Za čtvrtletí jste dostali 135 000 Kč hrubého a odpracovali 504 hodin. Průměrný hodinový výdělek je 267,86 Kč a měsíční 46 586,21 Kč."],
  faq: [
    {
      pregunta: "Z jakého období se průměrný výdělek počítá?",
      respuesta: "Z předchozího kalendářního čtvrtletí. Pro dovolenou čerpanou v říjnu až prosinci se tedy použije mzda a hodiny za červenec až září.",
    },
    {
      pregunta: "Počítají se do hodin i dovolená a nemoc?",
      respuesta: "Ne. Za odpracovanou dobu se považuje jen doba, za kterou náleží mzda. Dovolená, nemoc a další náhrady se do hodin ani do mzdy nezapočítávají.",
    },
    {
      pregunta: "K čemu průměrný měsíční výdělek potřebuji?",
      respuesta: "Například k výpočtu odstupného, které je násobkem průměrného měsíčního výdělku.",
    },
  ],
  glosario: [
    { termino: "Rozhodné období", definicion: "Předchozí kalendářní čtvrtletí, ze kterého se průměrný výdělek zjišťuje." },
    { termino: "Koeficient 4,348", definicion: "Průměrný počet týdnů v měsíci (365,25 / 12 / 7)." },
  ],
});
