import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ro.impozit-chirie",
  h1: "Calculator impozit pe chirie 2026",
  title: "Impozit pe chirie 2026: cât plătiți la ANAF",
  description:
    "Calculați impozitul pe veniturile din chirii: cota forfetară de {{ro.forfetar-chirii}}, impozit de {{ro.impozit-venit}} pe venitul net și CASS, dacă treceți de prag.",
  intro: [
    "Dacă închiriați o locuință unei persoane fizice, datorați impozit pe venit și, peste un anumit prag, CASS. Le declarați și le plătiți prin Declarația unică.",
    "Calculatorul pornește de la chiria din contract și dă totalul pe an.",
  ],
  comoSeCalcula: [
    "Venitul brut este chiria din contract înmulțită cu lunile închiriate.",
    "Din venitul brut se scade cota forfetară de cheltuieli de {{ro.forfetar-chirii}}. Ce rămâne este venitul net.",
    "Impozitul este {{ro.impozit-venit}} din venitul net.",
    "CASS de {{ro.cass}} se datorează dacă venitul net din chirii, împreună cu celelalte venituri din alte surse, ajunge la {{ro.plafoane-cass[minim]}} × salariul minim ({{ro.salariu-minim-1-ianuarie}} la 1 ianuarie). Baza este fixă, pe trepte.",
  ],
  ejemplo: ["La o chirie de 2.000 de lei pe lună, venitul net pe an este 19.200 de lei, iar impozitul 1.920 de lei. Sub prag nu se plătește CASS."],
  faq: [
    {
      pregunta: "Cât este impozitul pe chirie în 2026?",
      respuesta: "{{ro.impozit-venit}} din venitul net, adică din chiria rămasă după scăderea cotei forfetare de {{ro.forfetar-chirii}}.",
    },
    {
      pregunta: "Plătesc CASS pentru chirie?",
      respuesta: "Doar dacă venitul net din chirii și celelalte venituri din alte surse (dividende, dobânzi, drepturi de autor) trec împreună de {{ro.plafoane-cass[minim]}} × salariul minim pe an.",
    },
    {
      pregunta: "Ce se întâmplă dacă chiria este în euro?",
      respuesta: "Venitul brut anual se calculează la cursul de schimb mediu anual comunicat de BNR pentru anul în care încasați chiria.",
    },
    {
      pregunta: "Calculatorul se aplică și la închirierea în regim hotelier?",
      respuesta: "Nu. Închirierea pe termen scurt a camerelor din locuința proprie și chiriile plătite de firme au reguli separate.",
    },
  ],
  glosario: [
    { termino: "Cota forfetară", definicion: "Procentul din venit considerat cheltuială, fără documente justificative." },
    { termino: "Cedarea folosinței bunurilor", definicion: "Termenul din Codul fiscal pentru închiriere și arendă." },
  ],
});
