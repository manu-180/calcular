import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-hu.bono",
  h1: "Félévi prémium kalkulátor Zetaországban",
  title: "Félévi prémium Zetaországban: mennyit kapsz",
  description: "Számold ki a félévi prémiumot a megyéd minimálbérével és a kiegészítéssel (mértéke: {{zz.bonificacion}}), hivatalos értékekkel, dátummal és forrással.",
  intro: [
    "A félévi prémium plusz fizetés, amelyet a munkáltató évente kétszer fizet ki.",
    "Ha a teljes félévet ledolgoztad, egy havi fizetést kapsz, és ehhez jön a kiegészítés (mértéke: {{zz.bonificacion}}).",
  ],
  comoSeCalcula: [
    "A számítás alapja a bruttó havi fizetés. Ha ez alacsonyabb a megyéd minimálbérénél, a minimálbérrel számolunk.",
    "Ezt megszorozzuk a ledolgozott hónapok számával, és elosztjuk hattal.",
    "Kisvállalkozásnál a prémium a fele.",
    "A prémiumhoz hozzáadjuk a kiegészítést (mértéke: {{zz.bonificacion}}).",
  ],
  faq: [
    { pregunta: "Mennyi a minimálbér az Északi megyében?", respuesta: "{{zz.minimo@norte}}. Hatályos: {{zz.minimo@norte#desde}}" },
    { pregunta: "Mi van, ha nem dolgoztam le a teljes félévet?", respuesta: "A ledolgozott hónapokkal arányos részt kapod." },
    { pregunta: "Mindig jár a kiegészítés?", respuesta: "Igen. A mértéke a prémiumhoz viszonyítva: {{zz.bonificacion}}, és a cég a prémiummal együtt fizeti ki." },
  ],
  glosario: [
    { termino: "Félévi prémium", definicion: "Plusz fizetés, amelyet a törvény szerint júliusban és decemberben kell kifizetni." },
    { termino: "Minimálbér", definicion: "A teljes munkaidős munka legalacsonyabb díjazása az egyes megyékben." },
  ],
});
