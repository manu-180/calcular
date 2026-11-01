import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lt.infliacijos-skaiciuokle",
  h1: "Infliacijos skaičiuoklė {{anio}}: suma pagal vartotojų kainų indeksą",
  title: "Infliacijos skaičiuoklė {{anio}}: perkamoji galia",
  description: "Perskaičiuokite sumą pagal Valstybės duomenų agentūros vartotojų kainų indeksą nuo 1997 m. Naujausias indeksas: {{lt.vki}}. Įveskite sumą ir mėnesius.",
  intro: [
    "Naujausias vartotojų kainų indeksas siekia {{lt.vki}} (2025 m. vidurkis yra 100), o jo mėnuo prasideda {{lt.vki#desde}}. Pagal šį rodiklį skaičiuoklė parodo, kiek šiandien vertos senesnės sumos.",
    "Įveskite sumą ir du mėnesius. Rezultatas parodys sumą, kuri tuo metu turėjo tokią pačią perkamąją galią, ir bendrą kainų pokytį per laikotarpį.",
  ],
  comoSeCalcula: [
    "Skaičiuoklė paima pabaigos mėnesio vartotojų kainų indeksą ir padalija jį iš pradžios mėnesio indekso. Taip gaunamas daugiklis.",
    "Suma padauginama iš daugiklio. Tai ir yra tos pačios perkamosios galios suma pabaigos mėnesio kainomis.",
    "Jei pabaigos mėnesio duomenų dar nėra, skaičiuojama iki naujausio paskelbto mėnesio ir apie tai parašoma po rezultatu.",
    "Indeksas yra Valstybės duomenų agentūros rodiklis S7R330. Skaičiuoklė naudoja bendrą visų prekių ir paslaugų grupę (CP00).",
  ],
  ejemplo: [
    "1000 eurų 2020 m. sausį. Indeksas tada buvo 70,0781, o 2026 m. rugsėjį 106,9034. Daugiklis yra 1,5255, todėl tokia pati perkamoji galia 2026 m. rugsėjį iš viso: 1525,49 euro. Kainų pokytis: 52,5 %.",
  ],
  faq: [
    {
      pregunta: "Kaip sužinoti metinę infliaciją?",
      respuesta: "Įveskite tą patį mėnesį dvejų metų iš eilės, ir eilutėje apie kainų pokytį pamatysite metinį pokytį. Pavyzdžiui, 2025 m. rugsėjo indeksas buvo 100,1516, o 2026 m. rugsėjo 106,9034, taigi pokytis: 6,7 %.",
    },
    {
      pregunta: "Iš kur imami duomenys?",
      respuesta: "Iš Valstybės duomenų agentūros rodiklio S7R330 „Vartotojų kainų indeksai“, kai 2025 m. yra 100. Duomenys gaunami per oficialią agentūros sąsają ir apima mėnesius nuo 1997 m. sausio.",
    },
    {
      pregunta: "Kuo skiriasi vartotojų kainų indeksas ir suderintas indeksas?",
      respuesta: "Agentūra skelbia juos kaip atskirus rodiklius. Ši skaičiuoklė naudoja vartotojų kainų indeksą (S7R330), o ne suderintą (S7R329), todėl metinis pokytis gali skirtis nuo suderintu indeksu paremto skaičiaus.",
    },
    {
      pregunta: "Kodėl diena neturi įtakos rezultatui?",
      respuesta: "Indeksas skelbiamas kas mėnesį, todėl skaičiuoklė iš jūsų datos paima tik mėnesį ir metus.",
    },
  ],
  glosario: [
    { termino: "VKI", definicion: "Vartotojų kainų indeksas: kaip keičiasi prekių ir paslaugų krepšelio kaina." },
    { termino: "Perkamoji galia", definicion: "Kiek prekių ir paslaugų galima nusipirkti už tą pačią sumą." },
  ],
});
