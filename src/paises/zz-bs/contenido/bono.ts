import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-bs.bono",
  h1: "Kalkulator polugodišnje nagrade u Zetalandiji",
  title: "Polugodišnja nagrada u Zetalandiji: koliko dobijate",
  description: "Izračunajte polugodišnju nagradu s minimalnom platom vaše regije i dodatkom od {{zz.bonificacion}}, uz službene vrijednosti, datum i izvor.",
  intro: [
    "Polugodišnja nagrada je dodatna plata koju poslodavac isplaćuje dvaput godišnje.",
    "Ako ste radili cijelo polugodište, dobijate jednu mjesečnu platu i dodatak od {{zz.bonificacion}}.",
  ],
  comoSeCalcula: [
    "Izračun polazi od bruto mjesečne plate. Ako je niža od minimalne plate u vašoj regiji, uzima se minimalna plata.",
    "Ta se plata množi brojem mjeseci koje ste radili i dijeli sa šest.",
    "U malim firmama nagrada je upola manja.",
    "Na nagradu se dodaje dodatak od {{zz.bonificacion}}.",
  ],
  faq: [
    { pregunta: "Kolika je minimalna plata u Sjevernoj regiji?", respuesta: "{{zz.minimo@norte}}, vrijedi od {{zz.minimo@norte#desde}}." },
    { pregunta: "Šta ako u polugodištu nije bilo punih šest mjeseci rada?", respuesta: "Dobijate razmjeran dio, prema broju mjeseci koje ste radili." },
    { pregunta: "Isplaćuje li se dodatak uvijek?", respuesta: "Da. Iznosi {{zz.bonificacion}} od nagrade i firma ga isplaćuje zajedno s nagradom." },
  ],
  glosario: [
    { termino: "Polugodišnja nagrada", definicion: "Dodatna plata koju zakon nalaže isplatiti u julu i u decembru." },
    { termino: "Minimalna plata", definicion: "Najniža naknada za rad s punim radnim vremenom u svakoj regiji." },
  ],
});
