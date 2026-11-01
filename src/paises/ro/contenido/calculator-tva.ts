import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ro.calculator-tva",
  h1: "Calculator TVA {{anio}}",
  title: "Calculator TVA {{ro.tva[standard]}} și {{ro.tva[redusa]}}: adăugați sau scoateți TVA",
  description:
    "Adăugați TVA la un preț sau scoateți TVA dintr-un preț cu taxa inclusă. Cota standard este {{ro.tva[standard]}}, iar cota redusă {{ro.tva[redusa]}}.",
  intro: [
    "Calculatorul face cele două operații de zi cu zi: de la prețul fără TVA la prețul final și invers, de la prețul cu TVA la baza de impozitare.",
    "Din {{ro.tva#desde}} România are două cote: {{ro.tva[standard]}} pentru majoritatea bunurilor și serviciilor și {{ro.tva[redusa]}} pentru cele din lista cotei reduse.",
  ],
  comoSeCalcula: [
    "Adăugarea TVA: prețul fără TVA se înmulțește cu cota. Cu {{ro.tva[standard]}}, la 1.000 de lei fără TVA se adaugă 210 lei.",
    "Scoaterea TVA: prețul cu TVA se împarte la 1 plus cota (scrisă ca fracție). Din 1.210 lei cu TVA rămân 1.000 de lei fără TVA.",
    "Rezultatele se rotunjesc la bani.",
  ],
  faq: [
    {
      pregunta: "Care este cota de TVA în 2026?",
      respuesta: "Cota standard este {{ro.tva[standard]}}. Cota redusă este {{ro.tva[redusa]}}. Ambele se aplică din {{ro.tva#desde}}.",
    },
    {
      pregunta: "Ce produse au TVA de {{ro.tva[redusa]}}?",
      respuesta: "Printre altele: medicamentele de uz uman, alimentele (fără băuturi alcoolice, unele băuturi nealcoolice și alimentele cu mult zahăr adăugat), apa și canalizarea, manualele și cărțile, cazarea la hotel și serviciile de restaurant, conform art. 291 alin. (2) din Codul fiscal.",
    },
    {
      pregunta: "Cum scot TVA dintr-un preț?",
      respuesta: "Împărțiți prețul la 1 plus cota scrisă ca fracție. Diferența dintre preț și rezultat este TVA. Calculatorul face împărțirea pentru oricare dintre cele două cote.",
    },
    {
      pregunta: "Mai există cota de 9 % pentru locuințe?",
      respuesta: "Cota de 9 % a fost doar o perioadă de tranziție, pentru locuințele livrate până la 31 iulie 2026 cu avans plătit înainte de 1 august 2025.",
    },
  ],
  glosario: [
    { termino: "TVA", definicion: "Taxa pe valoarea adăugată, inclusă în prețul plătit de consumator." },
    { termino: "Baza de impozitare", definicion: "Prețul fără TVA, la care se aplică cota." },
  ],
});
