import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ba.porez-na-dohodak",
  h1: "Porez na dohodak {{anio}}: {{ba.porez@fbih}} u FBiH, {{ba.porez@rs}} u RS",
  title: "Porez na dohodak {{anio}}: {{ba.porez@fbih}} u FBiH, {{ba.porez@rs}} u RS",
  description: "Izračunajte porez na platu: stopa {{ba.porez@fbih}} u FBiH uz odbitak {{ba.odbitak-mjesecno@fbih}}, ili {{ba.porez@rs}} u RS uz odbitak {{ba.odbitak-mjesecno@rs}}. Mjesečno i godišnje.",
  intro: [
    "Porez na dohodak od plate plaća se u entitetu, po njegovom zakonu. Federacija BiH ima stopu {{ba.porez@fbih}} i odbitak {{ba.odbitak-mjesecno@fbih}} mjesečno. Republika Srpska ima stopu {{ba.porez@rs}} i odbitak {{ba.odbitak-mjesecno@rs}}.",
    "Upišite bruto i entitet. Vidjećete osnovicu, porez i koliki je to dio bruta.",
  ],
  comoSeCalcula: [
    "FBiH: od bruta se oduzmu doprinosi {{ba.doprinosi-ukupno@fbih}}, pa lični odbitak (godišnje {{ba.odbitak@fbih}}, mjesečno {{ba.odbitak-mjesecno@fbih}}, puta faktor). Porez je {{ba.porez@fbih}} na ostatak.",
    "RS: od bruta se oduzme samo lični odbitak (godišnje {{ba.odbitak@rs}}), plus {{ba.odbitak-clan-rs}} godišnje po izdržavanom članu. Porez je {{ba.porez@rs}} na ostatak.",
    "Ako je ostatak manji od nule, poreza nema.",
  ],
  ejemplo: [
    "Bruto 3.000 KM u FBiH: doprinosi 930 KM, osnovica 1.770 KM, porez 177 KM. To je 5,9 odsto bruta.",
    "Bruto 3.000 KM u RS: osnovica 2.000 KM, porez 160 KM. Stopa je niža, ali osnovica veća, jer doprinosi nisu oduzeti.",
  ],
  faq: [
    {
      pregunta: "Gdje piše stopa od {{ba.porez@fbih}} u FBiH?",
      respuesta: "Član 9 Zakona o porezu na dohodak FBiH. Zakon važi u tekstu iz „Službenih novina FBiH” 10/08, 9/10, 44/11, 7/13 i 65/13, a tako ga navodi i Porezna uprava FBiH.",
    },
    {
      pregunta: "Gdje piše stopa od {{ba.porez@rs}} u RS?",
      respuesta: "Član 4 zakona RS, u izmjeni iz „Službenog glasnika RS” 119/21: dohodak od ličnih primanja plaća se po stopi {{ba.porez@rs}}. Ista izmjena u članu 10 povećava osnovni lični odbitak na {{ba.odbitak@rs}} godišnje.",
    },
    {
      pregunta: "Plaća li se porez na topli obrok ili regres?",
      respuesta: "U FBiH Pravilnik o primjeni zakona priznaje topli obrok do {{ba.topli-obrok-fbih}} prosječne neto plate i regres do {{ba.regres-fbih}}, a iznad toga je oporezivo. Za pregled iznosa koristite naš obračun toplog obroka i regresa.",
    },
  ],
  glosario: [
    { termino: "Lični odbitak", definicion: "Iznos koji se oduzima od dohotka prije poreza." },
    { termino: "Osnovica", definicion: "Iznos na koji se primjenjuje stopa poreza." },
    { termino: "Porezna kartica", definicion: "Dokument s faktorom ličnog odbitka u FBiH, odnosno s odbicima za izdržavane članove u RS." },
  ],
});
