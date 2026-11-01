import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-sr.bono",
  h1: "Kalkulator polugodišnjeg bonusa u Zetalandiji",
  title: "Polugodišnji bonus u Zetalandiji: koliko dobijate",
  description: "Izračunajte polugodišnji bonus sa minimalnom zaradom vašeg regiona i dodatkom od {{zz.bonificacion}}, uz zvanične vrednosti, datum i izvor.",
  intro: [
    "Polugodišnji bonus je dodatna zarada koju poslodavac isplaćuje dva puta godišnje.",
    "Ako ste radili celo polugodište, dobijate jednu mesečnu zaradu i dodatak od {{zz.bonificacion}}.",
  ],
  comoSeCalcula: [
    "Obračun polazi od bruto mesečne zarade. Ako je niža od minimalne zarade u vašem regionu, uzima se minimalna zarada.",
    "Ta zarada se množi brojem meseci koje ste radili i deli sa šest.",
    "U malim firmama bonus je upola manji.",
    "Na bonus se dodaje dodatak od {{zz.bonificacion}}.",
  ],
  faq: [
    { pregunta: "Kolika je minimalna zarada u Severnom regionu?", respuesta: "{{zz.minimo@norte}}, važi od {{zz.minimo@norte#desde}}." },
    { pregunta: "Šta ako u polugodištu nije bilo punih šest meseci rada?", respuesta: "Dobijate srazmeran deo, prema broju meseci koje ste radili." },
    { pregunta: "Da li se dodatak uvek isplaćuje?", respuesta: "Da. Iznosi {{zz.bonificacion}} od bonusa i firma ga isplaćuje zajedno sa bonusom." },
  ],
  glosario: [
    { termino: "Polugodišnji bonus", definicion: "Dodatna zarada koju zakon nalaže da se isplati u julu i u decembru." },
    { termino: "Minimalna zarada", definicion: "Najniža naknada za rad sa punim radnim vremenom u svakom regionu." },
  ],
});
