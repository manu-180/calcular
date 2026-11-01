import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-hr.bono",
  h1: "Kalkulator polugodišnje nagrade u Zetalandiji",
  title: "Polugodišnja nagrada u Zetalandiji: koliko dobivate",
  description: "Izračunajte polugodišnju nagradu s minimalnom plaćom vaše regije i dodatkom od {{zz.bonificacion}}, uz službene vrijednosti, datum i izvor.",
  intro: [
    "Polugodišnja nagrada je dodatna plaća koju poslodavac isplaćuje dvaput godišnje.",
    "Ako ste radili cijelo polugodište, dobivate jednu mjesečnu plaću i dodatak od {{zz.bonificacion}}.",
  ],
  comoSeCalcula: [
    "Izračun polazi od bruto mjesečne plaće. Ako je niža od minimalne plaće u vašoj regiji, uzima se minimalna plaća.",
    "Ta se plaća množi brojem mjeseci koje ste radili i dijeli sa šest.",
    "U malim tvrtkama nagrada je upola manja.",
    "Na nagradu se dodaje dodatak od {{zz.bonificacion}}.",
  ],
  faq: [
    { pregunta: "Kolika je minimalna plaća u Sjevernoj regiji?", respuesta: "{{zz.minimo@norte}}, vrijedi od {{zz.minimo@norte#desde}}." },
    { pregunta: "Što ako u polugodištu nije bilo punih šest mjeseci rada?", respuesta: "Dobivate razmjeran dio, prema broju mjeseci koje ste radili." },
    { pregunta: "Isplaćuje li se dodatak uvijek?", respuesta: "Da. Iznosi {{zz.bonificacion}} od nagrade i tvrtka ga isplaćuje zajedno s nagradom." },
  ],
  glosario: [
    { termino: "Polugodišnja nagrada", definicion: "Dodatna plaća koju zakon nalaže isplatiti u srpnju i u prosincu." },
    { termino: "Minimalna plaća", definicion: "Najniža naknada za rad s punim radnim vremenom u svakoj regiji." },
  ],
});
