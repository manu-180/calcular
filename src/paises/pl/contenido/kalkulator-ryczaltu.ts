import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.kalkulator-ryczaltu",
  h1: "Kalkulator ryczałtu od przychodów ewidencjonowanych",
  title: "Kalkulator ryczałtu: podatek, ZUS i zdrowotna na ryczałcie",
  description:
    "Policz ryczałt ze stawką {{pl.stawki-ryczaltu[12]}}, {{pl.stawki-ryczaltu[8-5]}} albo inną, składkę zdrowotną według progu przychodu i kwotę na rękę w jednoosobowej działalności.",
  intro: [
    "Na ryczałcie podatek płacisz od przychodu, bez odliczania kosztów. Stawka zależy od rodzaju działalności: od {{pl.stawki-ryczaltu[2]}} do {{pl.stawki-ryczaltu[17]}}.",
    "Składka zdrowotna na ryczałcie jest stała w roku i zależy od tego, ile zarobisz: do 60 000 zł, do 300 000 zł albo więcej.",
  ],
  comoSeCalcula: [
    "Od przychodu odejmujesz zapłacone składki społeczne i {{pl.odliczenie-zdrowotnej-ryczalt}} zapłaconej składki zdrowotnej.",
    "Ryczałt to stawka razy tak pomniejszony przychód, zaokrąglona do pełnych złotych.",
    "Składka zdrowotna to {{pl.skladka-zdrowotna}} od podstawy: {{pl.zdrowotna-ryczalt[do-60000]}} przy przychodzie do 60 000 zł, {{pl.zdrowotna-ryczalt[do-300000]}} do 300 000 zł i {{pl.zdrowotna-ryczalt[ponad-300000]}} powyżej.",
    "Na rękę zostaje przychód minus wydatki firmy, składki i ryczałt.",
  ],
  ejemplo: [
    "Przy 10 000 zł przychodu miesięcznie, stawce 12 % i pełnym ZUS bez chorobowego ryczałt za rok wynosi 11 426 zł, a na rękę zostaje około 6429 zł miesięcznie.",
  ],
  faq: [
    {
      pregunta: "Jakie są stawki ryczałtu?",
      respuesta: "{{pl.stawki-ryczaltu[17]}} dla wolnych zawodów, {{pl.stawki-ryczaltu[15]}}, {{pl.stawki-ryczaltu[14]}} i {{pl.stawki-ryczaltu[12]}} dla wybranych usług, {{pl.stawki-ryczaltu[8-5]}} dla pozostałych usług, {{pl.stawki-ryczaltu[5-5]}} dla produkcji i budowlanki oraz {{pl.stawki-ryczaltu[3]}} dla handlu i gastronomii.",
    },
    {
      pregunta: "Ile wynosi składka zdrowotna na ryczałcie?",
      respuesta: "Przy przychodzie do 60 000 zł w roku to {{pl.skladka-zdrowotna}} z {{pl.zdrowotna-ryczalt[do-60000]}}. Wyższy przychód oznacza wyższą podstawę. Kwotę dla Twojego przychodu pokazuje kalkulator.",
    },
    {
      pregunta: "Czy na ryczałcie odliczę koszty?",
      respuesta: "Nie. Wydatki firmy nie zmniejszają ryczałtu. Odliczasz tylko składki społeczne i część składki zdrowotnej.",
    },
  ],
  glosario: [
    { termino: "Przychód ewidencjonowany", definicion: "Przychód wpisany do ewidencji przychodów, od którego płacisz ryczałt." },
    { termino: "PKWiU", definicion: "Klasyfikacja usług i wyrobów, według której ustala się stawkę ryczałtu." },
  ],
});
