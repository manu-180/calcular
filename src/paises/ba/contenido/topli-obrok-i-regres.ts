import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ba.topli-obrok-i-regres",
  h1: "Topli obrok i regres {{anio}}: iznosi u FBiH i RS",
  title: "Topli obrok i regres {{anio}}: iznos po danu i za mjesec",
  description: "U RS topli obrok je {{ba.topli-obrok-rs}} prosječne neto plate po danu. U FBiH neoporezivo je do {{ba.topli-obrok-fbih}} dnevno i regres do {{ba.regres-fbih}}. Izračunajte iznos.",
  intro: [
    "Propisi entiteta rade drugačije. U Republici Srpskoj odluka Vlade daje {{ba.topli-obrok-rs}} prosječne neto plate za prethodnu godinu za svaki radni dan, a ta prosječna plata je {{ba.prosjecna-neto-rs-2025}}.",
    "U Federaciji BiH Pravilnik o porezu na dohodak ne određuje obavezu, nego granicu do koje se ne plaća porez: topli obrok do {{ba.topli-obrok-fbih}} prosječne neto plate, a regres do {{ba.regres-fbih}}.",
  ],
  comoSeCalcula: [
    "RS: {{ba.prosjecna-neto-rs-2025}} x {{ba.topli-obrok-rs}} = iznos po radnom danu, puta broj radnih dana.",
    "FBiH, topli obrok: {{ba.prosjecna-neto-fbih}} x {{ba.topli-obrok-fbih}} po danu, prema zadnjem podatku Federalnog zavoda za statistiku.",
    "FBiH, regres: prosjek zadnja tri objavljena mjeseca ({{ba.prosjecna-neto-fbih-3m}}) x {{ba.regres-fbih}}.",
  ],
  ejemplo: [
    "U RS, uz 22 radna dana, topli obrok iznosi oko 286 KM mjesečno.",
    "U FBiH je za 22 radna dana neoporezivo najviše oko 376 KM, a regres do 863 KM, ako vam ih poslodavac isplaćuje.",
  ],
  faq: [
    {
      pregunta: "Odakle dolazi {{ba.topli-obrok-rs}} u RS?",
      respuesta: "Odluka o utvrđivanju uvećanja plate („Službeni glasnik RS” 53/16) u tački III određuje ovaj iznos, a izmjena iz 39/22 podigla ga je sa 0,75 odsto. Važi ako ishrana nije organizovana kod poslodavca i za prekovremeni rad duži od tri sata.",
    },
    {
      pregunta: "Da li je u FBiH topli obrok obavezan?",
      respuesta: "Pravilnik o primjeni Zakona o porezu na dohodak uređuje samo poreski tretman. Obavezu mogu odrediti kolektivni ugovor, pravilnik o radu ili ugovor. Iznos iznad {{ba.topli-obrok-fbih}} oporezuje se.",
    },
    {
      pregunta: "Koliki je regres u RS?",
      respuesta: "Član 87 Zakona o radu RS daje pravo na regres u skladu sa zakonom i kolektivnim ugovorom. Odluka Vlade ne navodi iznos, pa ga kalkulator ne računa.",
    },
  ],
  glosario: [
    { termino: "Topli obrok", definicion: "Naknada za ishranu u toku radnog dana." },
    { termino: "Regres", definicion: "Novac za korištenje godišnjeg odmora." },
    { termino: "Neoporezivo", definicion: "Iznos na koji se ne plaća porez na dohodak." },
  ],
});
