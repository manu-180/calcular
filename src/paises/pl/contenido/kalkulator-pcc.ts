import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pl.kalkulator-pcc",
  h1: "Kalkulator PCC: podatek od kupna samochodu i mieszkania",
  title: "Kalkulator PCC {{pl.stawki-pcc[sprzedaz]}}: podatek od kupna auta i mieszkania",
  description:
    "Policz podatek od czynności cywilnoprawnych: {{pl.stawki-pcc[sprzedaz]}} przy kupnie używanego samochodu albo mieszkania z rynku wtórnego, {{pl.stawki-pcc[prawa]}} od praw i {{pl.stawki-pcc[pozyczka]}} od pożyczki.",
  intro: [
    "Kupując samochód od osoby prywatnej albo mieszkanie z rynku wtórnego, płacisz podatek od czynności cywilnoprawnych (PCC). Obowiązek podatkowy ma kupujący.",
    "Stawka przy sprzedaży rzeczy i nieruchomości to {{pl.stawki-pcc[sprzedaz]}} wartości rynkowej.",
  ],
  comoSeCalcula: [
    "Podstawa to wartość rynkowa rzeczy albo prawa, zaokrąglona do pełnych złotych. Przy pożyczce to kwota pożyczki.",
    "Podatek: {{pl.stawki-pcc[sprzedaz]}} przy sprzedaży rzeczy i nieruchomości, {{pl.stawki-pcc[prawa]}} przy innych prawach majątkowych, {{pl.stawki-pcc[pozyczka]}} przy pożyczce. Wynik zaokrągla się do pełnych złotych.",
    "Sprzedaż rzeczy ruchomej o wartości do {{pl.pcc-prog-zwolnienia}} jest zwolniona z podatku.",
  ],
  ejemplo: [
    "Za używany samochód kupiony za 30 000 zł PCC wynosi 600 zł.",
  ],
  faq: [
    {
      pregunta: "Kto płaci PCC przy zakupie samochodu?",
      respuesta: "Kupujący. Sprzedający nie płaci podatku od czynności cywilnoprawnych.",
    },
    {
      pregunta: "Czy przy zakupie mieszkania od dewelopera płaci się PCC?",
      respuesta: "Nie, jeśli sprzedaż jest opodatkowana VAT. PCC dotyczy zakupu od osoby prywatnej, czyli rynku wtórnego.",
    },
    {
      pregunta: "Od jakiej kwoty liczy się PCC?",
      respuesta: "Od wartości rynkowej, czyli przeciętnej ceny takich rzeczy w obrocie. Jeśli cena w umowie jest wyraźnie niższa, urząd skarbowy może ją zakwestionować.",
    },
  ],
  glosario: [
    { termino: "PCC", definicion: "Podatek od czynności cywilnoprawnych, na przykład od umowy sprzedaży albo pożyczki." },
    { termino: "Wartość rynkowa", definicion: "Cena, jaką można uzyskać za daną rzecz w zwykłym obrocie." },
  ],
});
