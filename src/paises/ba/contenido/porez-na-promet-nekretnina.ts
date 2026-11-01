import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ba.porez-na-promet-nekretnina",
  h1: "Porez na promet nekretnina {{anio}}: stopa po kantonu",
  title: "Porez na promet nekretnina {{anio}}: stope po kantonima",
  description: "U Kantonu Sarajevo i ZDK porez na promet je {{ba.promet-kanton[ks]}} vrijednosti, a u USK i HNK do {{ba.promet-kanton[hnk]}}. Unesite vrijednost stana ili kuće i vidite iznos.",
  intro: [
    "Promet nekretnina u FBiH oporezuje kanton, po svom zakonu. U Kantonu Sarajevo i Zeničko-dobojskom kantonu stopa je {{ba.promet-kanton[ks]}}. U Unsko-sanskom i Hercegovačko-neretvanskom kantonu toliko iznosi najviša stopa, a općinsko ili gradsko vijeće može odrediti nižu.",
    "Obuhvaćena su četiri kantona čije zakone smo pročitali. Republika Srpska i ostali kantoni nisu u obračunu, pa za njih provjerite nadležnu poreznu ispostavu.",
  ],
  comoSeCalcula: [
    "Osnovica je tržišna vrijednost nekretnine, koju može odrediti i komisija, a ne samo cijena iz ugovora.",
    "Porez je osnovica puta stopa kantona u kojem se nekretnina nalazi.",
    "Oslobođenja zavise od zakona kantona, pa ih kalkulator ne odbija.",
  ],
  ejemplo: [
    "Stan u Sarajevu vrijedan 200.000 KM znači 10.000 KM poreza. Kod istog stana u Unsko-sanskom kantonu ne bi moglo biti više od toga.",
  ],
  faq: [
    {
      pregunta: "Gdje piše stopa u Kantonu Sarajevo?",
      respuesta: "U članu 11 Zakona o porezu na promet nekretnina i porezu na naslijeđe i poklone („Službene novine Kantona Sarajevo” 28/18). Za doživotno izdržavanje kada se vlasništvo stiče do smrti primatelja stopa je 10 %.",
    },
    {
      pregunta: "Može li općina u USK ili HNK odrediti nižu stopu?",
      respuesta: "Da. Član 9 zakona USK kaže da stopu propisuje općinsko ili gradsko vijeće, a član 12 zakona HNK da ukupna stopa ne može preći {{ba.promet-kanton[hnk]}}.",
    },
    {
      pregunta: "Plaća li se porez na promet i uz PDV?",
      respuesta: "Zavisi od prometa. Zakon o PDV-u i kantonalni zakon uređuju svaki svoj slučaj, pa kod kupovine novog stana od firme pitajte prodavca ili poreznu upravu.",
    },
  ],
  glosario: [
    { termino: "Promet nekretnina", definicion: "Prodaja, zamjena ili drugi prenos vlasništva nad nekretninom." },
    { termino: "Tržišna vrijednost", definicion: "Cijena koju bi nekretnina postigla na tržištu." },
    { termino: "Doživotno izdržavanje", definicion: "Ugovor kojim se nekretnina prenosi uz obavezu izdržavanja." },
  ],
});
