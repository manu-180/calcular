import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.kalkulator-inflacji",
  h1: "Kalkulator inflacji GUS",
  title: "Kalkulator inflacji: ile dziś jest warta kwota z przeszłości",
  description:
    "Przelicz kwotę z dowolnego miesiąca od 2000 r. na dzisiejsze ceny według wskaźnika cen konsumpcyjnych GUS. Najnowsze dane: miesiąc od {{pl.cpi#desde}}.",
  intro: [
    "Kalkulator pokazuje, ile pieniędzy potrzebujesz dziś, żeby kupić to samo, co za daną kwotę kiedyś. Korzysta z miesięcznych wskaźników cen GUS, czyli inflacji CPI.",
    "Dane obejmują miesiące od stycznia 2000 r. Najnowszy wskaźnik dotyczy miesiąca, który zaczyna się {{pl.cpi#desde}}.",
  ],
  comoSeCalcula: [
    "Wskaźniki GUS „grudzień poprzedniego roku = 100” łączymy w jeden indeks cen, w którym grudzień 1999 r. ma wartość 100.",
    "Mnożnik to indeks z miesiąca końcowego podzielony przez indeks z miesiąca początkowego.",
    "Kwota o tej samej sile nabywczej to kwota początkowa razy mnożnik. Inflacja w okresie to mnożnik minus 1.",
  ],
  ejemplo: [
    "Od grudnia 2024 r. do grudnia 2025 r. ceny wzrosły o 2,4 %, więc 1000 zł z grudnia 2024 r. to w grudniu 2025 r. 1024 zł.",
  ],
  faq: [
    {
      pregunta: "Skąd są dane o inflacji?",
      respuesta: "Z Głównego Urzędu Statystycznego: miesięczne wskaźniki cen towarów i usług konsumpcyjnych. Kalkulator pobiera każdy nowy odczyt.",
    },
    {
      pregunta: "Dlaczego wynik może się minimalnie różnić od innych kalkulatorów?",
      respuesta: "GUS podaje wskaźniki z jednym miejscem po przecinku. Łączenie ich przez kolejne lata daje drobne różnice zaokrągleń.",
    },
    {
      pregunta: "Czy mogę policzyć waloryzację umowy?",
      respuesta: "Tak, jeśli umowa odwołuje się do wskaźnika cen konsumpcyjnych GUS. Sprawdź, czy chodzi o wskaźnik miesięczny, roczny czy średnioroczny, bo dają różne wyniki.",
    },
  ],
  glosario: [
    { termino: "CPI", definicion: "Wskaźnik cen towarów i usług konsumpcyjnych, miara inflacji w Polsce." },
    { termino: "Siła nabywcza", definicion: "Ile towarów i usług można kupić za daną kwotę." },
  ],
});
