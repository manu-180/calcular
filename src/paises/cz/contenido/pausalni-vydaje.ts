import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cz.pausalni-vydaje",
  h1: "Paušální výdaje: výpočet daně a pojištění OSVČ",
  title: "Paušální výdaje {{anio}}: kalkulačka daně a odvodů OSVČ",
  description:
    "Spočítejte daň z příjmů, sociální a zdravotní pojištění OSVČ s výdaji procentem z příjmů. Se slevou na poplatníka, dětmi a minimálními odvody {{anio}}.",
  intro: [
    "Osoba samostatně výdělečně činná může místo skutečných nákladů uplatnit výdaje procentem z příjmů. Kalkulačka z ročních příjmů spočítá základ daně, daň a obě pojištění za celý rok.",
    "Výsledek odpovídá daňovému přiznání a přehledům pro ČSSZ a zdravotní pojišťovnu, pokud nemáte jiné příjmy.",
  ],
  comoSeCalcula: [
    "Paušální výdaje jsou procentem z příjmů podle druhu činnosti: {{cz.pausalni-vydaje[zemedelstvi-remesla]}} u řemesel a zemědělství, {{cz.pausalni-vydaje[zivnost]}} u ostatních živností, {{cz.pausalni-vydaje[jine]}} u svobodných povolání a {{cz.pausalni-vydaje[najem]}} u nájmu obchodního majetku. Každé procento má strop, například u živností {{cz.pausalni-vydaje-limit[zivnost]}}.",
    "Základ daně jsou příjmy minus výdaje. Daň je {{cz.dan-z-prijmu[0].tasa}} ze základu zaokrouhleného na stokoruny dolů a {{cz.dan-z-prijmu[-1].tasa}} z části nad {{cz.dan-z-prijmu[1].desde}}. Odečte se sleva na poplatníka {{cz.sleva-na-poplatnika}} a zvýhodnění na děti.",
    "Sociální pojištění je {{cz.osvc-socialni-sazba}} z vyměřovacího základu, který tvoří {{cz.osvc-podil-zakladu[socialni]}} základu daně. Při hlavní činnosti se platí aspoň z minima {{cz.osvc-min-vz-socialni[hlavni]}} za měsíc.",
    "Zdravotní pojištění je {{cz.zdravotni-pojisteni}} z {{cz.osvc-podil-zakladu[zdravotni]}} základu daně, při hlavní činnosti aspoň z {{cz.osvc-min-vz-zdravotni}} měsíčně.",
    "U vedlejší činnosti se sociální pojištění platí, až když základ daně dosáhne rozhodné částky {{cz.osvc-rozhodna-castka}} za rok.",
  ],
  ejemplo: [
    "Živnostník s příjmy 1 000 000 Kč uplatní výdaje 60 %, tedy 600 000 Kč. Ze základu 400 000 Kč zaplatí daň 29 160 Kč po slevě, sociální pojištění 64 240 Kč a zdravotní 39 664 Kč. Dohromady 133 064 Kč za rok.",
  ],
  faq: [
    {
      pregunta: "Jaké paušální výdaje si můžu uplatnit?",
      respuesta: "{{cz.pausalni-vydaje[zemedelstvi-remesla]}} u řemeslných živností a zemědělství, {{cz.pausalni-vydaje[zivnost]}} u ostatních živností, {{cz.pausalni-vydaje[jine]}} u příjmů ze svobodných povolání a {{cz.pausalni-vydaje[najem]}} u nájmu majetku v obchodním majetku.",
    },
    {
      pregunta: "Jaký je strop paušálních výdajů?",
      respuesta: "U výdajů {{cz.pausalni-vydaje[zemedelstvi-remesla]}} nejvýše {{cz.pausalni-vydaje-limit[zemedelstvi-remesla]}}, u {{cz.pausalni-vydaje[zivnost]}} {{cz.pausalni-vydaje-limit[zivnost]}}, u {{cz.pausalni-vydaje[jine]}} {{cz.pausalni-vydaje-limit[jine]}} a u {{cz.pausalni-vydaje[najem]}} {{cz.pausalni-vydaje-limit[najem]}} za rok.",
    },
    {
      pregunta: "Kolik zaplatím minimálně na pojištění při hlavní činnosti?",
      respuesta: "Za celý rok 2026 se sociální pojištění počítá aspoň z {{cz.osvc-min-vz-socialni[hlavni]}} měsíčně a zdravotní aspoň z {{cz.osvc-min-vz-zdravotni}} měsíčně.",
    },
    {
      pregunta: "Vyplatí se mi paušální daň?",
      respuesta: "Porovnejte výsledek s kalkulačkou paušální daně. Paušální režim se vyplatí hlavně při nízkých výdajích a příjmech blízko horní hranice pásma.",
    },
  ],
  glosario: [
    { termino: "OSVČ", definicion: "Osoba samostatně výdělečně činná, tedy podnikatel nebo živnostník." },
    { termino: "Základ daně", definicion: "Příjmy z podnikání po odečtení výdajů." },
    { termino: "Vyměřovací základ", definicion: "Část základu daně, ze které se počítá pojistné." },
  ],
});
