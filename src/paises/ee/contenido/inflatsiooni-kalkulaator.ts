import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ee.inflatsiooni-kalkulaator",
  h1: "Inflatsiooni kalkulaator",
  title: "Inflatsiooni kalkulaator {{anio}}: raha väärtus THI järgi",
  description: "Vaata, kui palju on raha väärtus muutunud: arvuta summa Statistikaameti tarbijahinnaindeksi (THI) järgi. Viimane indeks on {{ee.thi}}.",
  intro: [
    "Inflatsioon näitab, kui palju on hinnad kerkinud. Kalkulaator kasutab Statistikaameti tarbijahinnaindeksit (THI, 1997 = 100), mille viimane väärtus on {{ee.thi}}. Andmed: {{ee.thi#desde}}.",
    "Sisesta summa ja kaks kuud. Saad teada, kui palju raha oleks vaja sama ostujõu jaoks lõppkuul ning mida tähendab sama summa alguskuu hindades.",
  ],
  comoSeCalcula: [
    "Võta lõppkuu indeks ja jaga alguskuu indeksiga. See on hindade muutuse kordaja.",
    "Korruta summa selle kordajaga: tulemus on sama ostujõud lõppkuul.",
    "Jaga summa kordajaga, et näha selle väärtust alguskuu hindades.",
    "Hinnamuutus protsentides on kordaja miinus üks.",
  ],
  ejemplo: [
    "Jaanuaris 2020 oli indeks 213,40 ja septembris 2026 oli see 329,07. Kordaja on 1,542. Summa 1000 eurot tähendab sama ostujõudu kui 1542,03 eurot, hinnad tõusid ligi 54 protsenti.",
    "Palgatõusu hindamiseks võrdle oma palka selle kordajaga. Kui palk kasvas samal ajal vähem, on ostujõud langenud.",
  ],
  faq: [
    {
      pregunta: "Kust andmed pärinevad?",
      respuesta: "Statistikaameti tabelist IA002. Uus punkt lisandub iga kuu pärast avaldamist. Kui valid kuu, mille andmeid veel pole, arvutame viimase avaldatud kuuni.",
    },
    {
      pregunta: "Mis vahe on THI ja harmoneeritud indeksil?",
      respuesta: "THI on riiklik tarbijahinnaindeks. Tarbijahindade harmoneeritud indeks on sama nähtuse mõõdik Euroopa võrdluseks ja seda arvutatakse teistsuguse metoodikaga. Selles kalkulaatoris kasutame THI-d.",
    },
    {
      pregunta: "Kas tulemus on täpne minu ostude kohta?",
      respuesta: "See on keskmine ostukorv. Sinu enda kulud võivad muutuda teisiti, näiteks kui suur osa rahast läheb kodule või toidule.",
    },
  ],
  glosario: [
    { termino: "THI", definicion: "Tarbijahinnaindeks: mõõdab tarbekaupade ja teenuste hinna muutust." },
    { termino: "Ostujõud", definicion: "Kui palju kaupu ja teenuseid raha eest saab." },
  ],
});
