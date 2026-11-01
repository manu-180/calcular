import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lt.valiutu-skaiciuokle",
  h1: "Valiutų skaičiuoklė pagal Lietuvos banko duomenis",
  title: "Valiutų skaičiuoklė: euras, doleris, svaras, zlotas",
  description: "Perskaičiuokite eurus į dolerius, svarus, frankus ar zlotus pagal Lietuvos banko skelbiamą santykį. Už 1 eurą dabar: {{lt.usd}}. Įveskite sumą.",
  intro: [
    "Už 1 eurą dabar skelbiama: {{lt.usd}}, {{lt.gbp}}, {{lt.chf}} ir {{lt.pln}} (santykio data {{lt.usd#desde}}). Duomenys imami iš Lietuvos banko sąsajos.",
    "Pasirinkite valiutą ir kryptį, įveskite sumą, ir skaičiuoklė parodys rezultatą bei abu santykius. Tai naudinga, kai reikia greitai įvertinti užsienio sąskaitą, pirkinį internetu ar kelionės biudžetą.",
  ],
  comoSeCalcula: [
    "Lietuvos banko sąsaja „Euro ir užsienio valiutų santykiai“ nurodo, kiek užsienio valiutos vienetų skiriama vienam eurui.",
    "Iš eurų į užsienio valiutą: suma padauginama iš santykio.",
    "Iš užsienio valiutos į eurus: suma padalijama iš santykio.",
    "Imamas naujausias paskelbtas santykis. Jo datą rasite rezultato eilutėje.",
  ],
  ejemplo: [
    "2026 m. spalio 30 d. santykis buvo 1,1172 JAV dolerio už 1 eurą. 100 eurų tada atitiko 111,72 JAV dolerio, o 100 JAV dolerių atitiko 89,51 euro.",
  ],
  faq: [
    {
      pregunta: "Kiek dabar kainuoja euras JAV doleriais?",
      respuesta: "Už 1 eurą skelbiama: {{lt.usd}}. Santykio data: {{lt.usd#desde}}.",
    },
    {
      pregunta: "Iš kur imami santykiai?",
      respuesta: "Iš Lietuvos banko sąsajos „Euro ir užsienio valiutų santykiai“ (tipas EU). Joje pateikiami Europos Centrinio Banko ir Lietuvos banko paskelbti santykiai.",
    },
    {
      pregunta: "Kodėl banke gaunu kitą sumą?",
      respuesta: "Bankai ir valiutos keityklos taiko savo pirkimo ir pardavimo kursus. Ši skaičiuoklė rodo oficialų santykį, todėl tikra keitimo suma gali skirtis.",
    },
    {
      pregunta: "Kas nutinka, jei tą dieną santykis neskelbtas?",
      respuesta: "Pagal sąsajos aprašymą tada rodomas paskutinis paskelbtas santykis. Skaičiuoklė taip pat naudoja naujausią turimą reikšmę ir parodo jos datą.",
    },
  ],
  glosario: [
    { termino: "Santykis", definicion: "Kiek užsienio valiutos vienetų skiriama vienam eurui." },
    { termino: "Keitimo kursas", definicion: "Banko ar keityklos kaina, už kurią valiuta perkama arba parduodama." },
  ],
});
