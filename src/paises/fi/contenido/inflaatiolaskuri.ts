import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.inflaatiolaskuri",
  h1: "Inflaatiolaskuri: rahan arvo eri vuosina",
  title: "Inflaatiolaskuri: rahan arvo kuluttajahintaindeksillä",
  description:
    "Muuta summa toisen kuukauden hintatasoon Tilastokeskuksen kuluttajahintaindeksillä. Uusin indeksi on {{fi.khi}} ({{fi.khi#desde}}, 2000=100).",
  intro: [
    "Inflaatiolaskuri kertoo, paljonko jokin summa olisi rahaa toisen kuukauden hinnoin. Näet myös, kuinka paljon hinnat ovat nousseet välillä.",
    "Laskuri käyttää Tilastokeskuksen kuluttajahintaindeksiä tammikuusta 2000 alkaen. Indeksi päivittyy kuukausittain.",
  ],
  comoSeCalcula: [
    "Laskuri hakee kuluttajahintaindeksin pisteluvun alku- ja loppukuukaudelle. Pisteluvut ovat perusvuodella 2000=100.",
    "Summa kerrotaan loppukuukauden pisteluvulla ja jaetaan alkukuukauden pisteluvulla.",
    "Jos loppukuukauden indeksiä ei ole vielä julkaistu, laskuri käyttää uusinta julkaistua kuukautta.",
  ],
  ejemplo: [
    "Tammikuussa 2015 indeksi oli 126,42 ja syyskuussa 2026 se oli 160. 1 000 euroa vuoden 2015 alussa vastaa 1 265,62 euroa syyskuun 2026 hinnoin.",
  ],
  faq: [
    {
      pregunta: "Mikä on kuluttajahintaindeksi?",
      respuesta: "Tilastokeskuksen indeksi, joka kuvaa kotitalouksien ostamien tavaroiden ja palvelujen hintojen muutosta. Sen vuosimuutosta kutsutaan inflaatioksi.",
    },
    {
      pregunta: "Miksi tulos ei ole sama kuin elinkustannusindeksillä?",
      respuesta: "Elinkustannusindeksi ja kuluttajahintaindeksi ovat eri sarjoja eri perusvuosilla. Laskuri käyttää kuluttajahintaindeksiä.",
    },
    {
      pregunta: "Kuinka usein indeksi päivittyy?",
      respuesta: "Tilastokeskus julkaisee kuluttajahintaindeksin kerran kuukaudessa. Uusin luku on {{fi.khi}} ({{fi.khi#desde}}).",
    },
  ],
  glosario: [
    { termino: "Inflaatio", definicion: "Yleisen hintatason nousu, jonka vuoksi rahalla saa vähemmän." },
    { termino: "Pisteluku", definicion: "Indeksin arvo kuukaudelle verrattuna perusvuoteen." },
  ],
});
