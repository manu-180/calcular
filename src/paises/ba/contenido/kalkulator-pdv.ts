import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ba.kalkulator-pdv",
  h1: "Kalkulator PDV-a {{anio}}: stopa {{ba.pdv}} u BiH",
  title: "Kalkulator PDV-a {{anio}}: dodajte ili izdvojte {{ba.pdv}}",
  description: "Dodajte PDV od {{ba.pdv}} na cijenu ili ga izdvojite iz iznosa s računa. Jedna stopa za cijelu BiH, a prag za registraciju je {{ba.pdv-prag}} prometa godišnje.",
  intro: [
    "PDV u Bosni i Hercegovini ima jednu standardnu stopu, {{ba.pdv}}, ista je u oba entiteta i u Brčko distriktu. Naplaćuje ga Uprava za indirektno oporezivanje, a ne entitetske porezne uprave.",
    "Upišite cijenu i recite da li PDV već sadrži. Dobićete osnovicu, porez i iznos za plaćanje.",
  ],
  comoSeCalcula: [
    "Cijena bez PDV-a: PDV = cijena x {{ba.pdv}}. Ukupno je cijena plus PDV.",
    "Cijena sa PDV-om: osnovica = cijena / 1,17, a PDV je razlika između ta dva iznosa. Nije tačno uzeti 17 odsto od pune cijene.",
    "Firma se mora registrovati kad godišnji oporezivi promet pređe {{ba.pdv-prag}} ili je vjerovatno da će preći.",
  ],
  ejemplo: [
    "Račun od 1.000 KM sa PDV-om sadrži 854,70 KM osnovice i 145,30 KM poreza. Da ste uzeli 17 odsto od 1.000 KM, dobili biste pogrešnih 170 KM.",
    "Usluga od 100 KM bez PDV-a na računu je 117 KM.",
  ],
  faq: [
    {
      pregunta: "Da li u BiH postoje snižene stope PDV-a?",
      respuesta: "Član 23 Zakona o PDV-u („Službeni glasnik BiH” 9/05) propisuje standardnu stopu od {{ba.pdv}}. UINO na svojoj stranici o PDV-u navodi tu stopu i nultu stopu za izvoz, a sniženu stopu ne pominje.",
    },
    {
      pregunta: "Od kada se firma mora registrovati za PDV?",
      respuesta: "Od prelaska praga iz člana 57. Zakon iz „Službenog glasnika BiH” 80/23 podigao je prag sa 50.000 KM na {{ba.pdv-prag}} prometa.",
    },
    {
      pregunta: "Da li se PDV razlikuje između FBiH i RS?",
      respuesta: "Ne. Zakon o PDV-u je državni zakon, objavljen u „Službenom glasniku BiH”, sa istom stopom za cijelu zemlju. Entiteti imaju svoje zakone o porezu na dohodak i doprinosima, ali ne i o PDV-u.",
    },
  ],
  glosario: [
    { termino: "PDV", definicion: "Porez na dodanu vrijednost." },
    { termino: "Osnovica", definicion: "Cijena bez poreza." },
    { termino: "UINO", definicion: "Uprava za indirektno oporezivanje BiH." },
  ],
});
