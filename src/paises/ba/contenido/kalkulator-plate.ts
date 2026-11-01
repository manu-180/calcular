import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ba.kalkulator-plate",
  h1: "Kalkulator plate {{anio}}: neto iz bruta za FBiH i RS",
  title: "Kalkulator plate {{anio}}: bruto u neto po entitetu",
  description: "Pretvorite bruto u neto za FBiH ili RS: doprinosi {{ba.doprinosi-ukupno@fbih}}, porez {{ba.porez@fbih}} u Federaciji i {{ba.porez@rs}} u Srpskoj, s ličnim odbitkom.",
  intro: [
    "Iz iste bruto plate u dva entiteta ne ostaje isti neto. U Federaciji BiH porez je {{ba.porez@fbih}}, a računa se tek nakon što se od bruta oduzmu doprinosi i lični odbitak od {{ba.odbitak-mjesecno@fbih}} mjesečno. U Republici Srpskoj porez je {{ba.porez@rs}}, odbitak je {{ba.odbitak-mjesecno@rs}}, ali doprinosi ne umanjuju osnovicu.",
    "Izaberite entitet i upišite bruto iz ugovora. Dobićete iznos koji stiže na račun i pregled odbitaka.",
    "Brčko distrikt zasad nije u obračunu, jer njegove stope doprinosa nismo pročitali u važećem službenom izvoru.",
  ],
  comoSeCalcula: [
    "Doprinosi iz plate su {{ba.doprinosi-ukupno@fbih}} u oba entiteta, ali drugačije raspoređeni. U FBiH: penzijsko {{ba.doprinosi[pio]@fbih}}, zdravstveno {{ba.doprinosi[zdravstvo]@fbih}} i nezaposlenost {{ba.doprinosi[nezaposlenost]@fbih}}. U RS: penzijsko {{ba.doprinosi[pio]@rs}}, zdravstveno {{ba.doprinosi[zdravstvo]@rs}}, nezaposlenost {{ba.doprinosi[nezaposlenost]@rs}} i dječija zaštita {{ba.doprinosi[djecija]@rs}}.",
    "Porez u FBiH: bruto minus doprinosi minus lični odbitak pomnožen faktorom s porezne kartice, pa puta {{ba.porez@fbih}}.",
    "Porez u RS: bruto minus lični odbitak, pa puta {{ba.porez@rs}}. Za svakog izdržavanog člana godišnji odbitak raste za {{ba.odbitak-clan-rs}}.",
    "U RS je od januara 2026. dio plate od {{ba.neoporezivo-rs}} neto oslobođen za poslove bez uslova o obrazovanju i za one s trogodišnjom srednjom školom.",
  ],
  ejemplo: [
    "Bruto 2.000 KM u FBiH, faktor 1: doprinosi su 620 KM, osnovica poreza 1.080 KM, porez 108 KM, a na račun stiže 1.272 KM. Poslodavac uz to plaća još 100 KM doprinosa, pa ga radnik košta 2.100 KM.",
    "Isti bruto u RS, posao sa četverogodišnjom školom: doprinosi 620 KM, osnovica 1.000 KM, porez 80 KM, neto 1.300 KM. Poslodavac ne plaća ništa preko bruta.",
  ],
  faq: [
    {
      pregunta: "Zašto je neto u RS veći od neta u FBiH za isti bruto?",
      respuesta: "Razlika je u porezu. Član 13 zakona RS, u tekstu iz „Službenog glasnika” 119/21, kaže da je osnovica bruto, ali je odbitak veći, a stopa niža. U FBiH član 11 Zakona o porezu na dohodak od prihoda oduzima doprinose, a član 24 daje manji odbitak.",
    },
    {
      pregunta: "Šta je faktor ličnog odbitka u FBiH?",
      respuesta: "To je zbir koji piše na poreznoj kartici. Osnovni odbitak je {{ba.odbitak@fbih}} godišnje, a član 24 dodaje 0,5 za izdržavanog bračnog druga, 0,5 za prvo dijete, 0,7 za drugo i 0,9 za treće dijete. Mjesečni iznos dobija se množenjem s {{ba.odbitak-mjesecno@fbih}} (Pravilnik o primjeni zakona).",
    },
    {
      pregunta: "Da li poslodavac u RS plaća doprinose povrh bruta?",
      respuesta: "Ne. Član 22 Zakona o doprinosima RS propisuje {{ba.doprinosi-ukupno@rs}} iz bruto plate i nema dio na teret poslodavca. U FBiH poslodavac plaća još {{ba.doprinosi-poslodavac-fbih-ukupno}}, prema članu 10 zakona, od jula 2025. godine.",
    },
    {
      pregunta: "Koji datum važi za oslobođenje od 50 KM u RS?",
      respuesta: "Zakon o izmjenama Zakona o porezu na dohodak iz „Službenog glasnika RS” 114/25 stupio je na snagu 1. januara 2026. Oslobođen je neto iznos od {{ba.neoporezivo-rs}} mjesečno, uz uslov o poslu iz tačke 13 člana 8.",
    },
  ],
  glosario: [
    { termino: "Bruto plata", definicion: "Plata prije doprinosa i poreza, onakva kakva piše u ugovoru." },
    { termino: "Neto plata", definicion: "Iznos koji radnik dobije na račun." },
    { termino: "Porezna kartica", definicion: "Dokument koji poslodavcu pokazuje na koliki lični odbitak radnik ima pravo." },
    { termino: "Entitet", definicion: "Federacija BiH ili Republika Srpska. Svaki ima svoje zakone o porezu na dohodak i doprinosima." },
  ],
});
