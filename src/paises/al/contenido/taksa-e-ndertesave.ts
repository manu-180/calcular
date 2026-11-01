import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.taksa-e-ndertesave",
  h1: "Tatimi mbi pasurinë: taksa e ndërtesave {{anio}}",
  title: "Taksa e ndërtesave {{anio}}: {{al.taksa-ndertese[banim]}} për banim",
  description: "Tatimi mbi pasurinë e paluajtshme: {{al.taksa-ndertese[banim]}} për banim dhe {{al.taksa-ndertese[ekonomike]}} për veprimtari ekonomike. Llogaritni taksën vjetore të ndërtesës.",
  intro: [
    "Taksa mbi ndërtesat është {{al.taksa-ndertese[banim]}} e vlerës për një ndërtesë banimi dhe {{al.taksa-ndertese[ekonomike]}} për një ndërtesë që përdoret për veprimtari ekonomike, sipas nenit 22/2 të ligjit nr. 9632/2006.",
    "Baza e taksës është vlera e ndërtesës, e llogaritur me metodologjinë e vendimit të Këshillit të Ministrave. Vendosni vlerën që ka vlerësuar bashkia dhe shihni detyrimin vjetor.",
  ],
  comoSeCalcula: [
    "Taksa vjetore: vlera e ndërtesës shumëzohet me shkallën sipas përdorimit.",
    "Taksa është detyrim vjetor dhe e mbledh bashkia, sipas ligjit për taksat vendore.",
    "Taksa mbi tokën dhe truallin janë më vete. Ky kalkulator llogarit vetëm taksën e ndërtesës.",
  ],
  ejemplo: [
    "Një apartament me vlerë 10 milionë lekë paguan 5 000 lekë në vit, rreth 417 lekë në muaj. Po të përdorej si zyrë ose dyqan, taksa do të ishte 20 000 lekë në vit, sepse shkalla për veprimtari ekonomike është katër herë më e lartë.",
  ],
  faq: [
    {
      pregunta: "Si caktohet vlera e ndërtesës?",
      respuesta: "Sipas nenit 22/1 të ligjit nr. 9632, me metodologjinë e miratuar nga Këshilli i Ministrave. Administrata Tatimore publikon Vendimin nr. 132, datë 7.3.2018, për vlerën e taksueshme të pasurisë.",
    },
    {
      pregunta: "Kush përjashtohet nga taksa?",
      respuesta: "Neni 22 përjashton, ndër të tjera, ndërtesat e banimit të kryefamiljarëve që trajtohen me ndihmë ekonomike, ndërtesat që përdoren nga komunitetet fetare dhe ndërtesat e banimit me qira të paliberalizuara.",
    },
    {
      pregunta: "Çfarë ndodh me ndërtimet e papërfunduara?",
      respuesta: "Për sipërfaqen e papërfunduar sipas lejes, zhvilluesi paguan 30% të shkallës përkatëse, sipas shkronjës c të nenit 22/2.",
    },
  ],
  glosario: [
    { termino: "Taksë vendore", definicion: "Detyrim që mblidhet nga bashkia dhe shkon në buxhetin vendor." },
    { termino: "Baza e taksës", definicion: "Vlera e ndërtesës mbi të cilën zbatohet shkalla." },
  ],
});
