import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.tyonantajan-sivukulut",
  h1: "Työnantajan sivukulut: paljonko työntekijä maksaa yritykselle",
  title: "Työnantajan sivukulut {{anio}}: laske palkan kokonaiskustannus",
  description:
    "Laske palkan sivukulut ja kokonaiskustannus: TyEL-maksu keskimäärin {{fi.tyel-tyonantaja}}, sairausvakuutusmaksu {{fi.sairausvakuutusmaksu-tyonantaja}} ja työttömyysvakuutusmaksu.",
  intro: [
    "Palkan lisäksi työnantaja maksaa lakisääteisiä sivukuluja. Laskuri näyttää, paljonko yksi työntekijä maksaa kuukaudessa ja vuodessa.",
    "Mukana ovat työeläkemaksu, työttömyysvakuutusmaksu ja sairausvakuutusmaksu. Tapaturma- ja ryhmähenkivakuutuksen voit lisätä oman vakuutuksesi prosentilla.",
  ],
  comoSeCalcula: [
    "Työeläkemaksun (TyEL) työnantajan osuus on keskimäärin {{fi.tyel-tyonantaja}} palkasta. Oma maksusi voi poiketa keskiarvosta, joten voit syöttää sen itse.",
    "Työttömyysvakuutusmaksu on {{fi.tyottomyysvakuutusmaksu-tyonantaja[alempi]}} palkoista, kun yrityksen palkkasumma on enintään {{fi.tyottomyysvakuutusmaksun-palkkasummaraja}} vuodessa. Raja-arvon ylittävältä osalta maksu on {{fi.tyottomyysvakuutusmaksu-tyonantaja[ylempi]}}.",
    "Sairausvakuutusmaksu on {{fi.sairausvakuutusmaksu-tyonantaja}} palkasta.",
    "Sivukulut lasketaan yhteen ja lisätään bruttopalkkaan. Tulos on palkan kokonaiskustannus.",
  ],
  ejemplo: [
    "Pieni yritys maksaa työntekijälle 3 000 euroa kuukaudessa. TyEL-maksu on 513,00 euroa, työttömyysvakuutusmaksu 9,30 euroa ja sairausvakuutusmaksu 57,30 euroa.",
    "Sivukulut ovat yhteensä 579,60 euroa, joten palkka maksaa yritykselle 3 579,60 euroa kuukaudessa.",
  ],
  faq: [
    {
      pregunta: "Paljonko työnantajan sivukulut ovat prosentteina?",
      respuesta:
        "Lakisääteiset maksut ovat pienessä yrityksessä noin 19 prosenttia palkasta, kun TyEL-maksu on keskimääräinen. Tapaturmavakuutus nostaa summaa hieman.",
    },
    {
      pregunta: "Sisältyykö työntekijän työeläkemaksu sivukuluihin?",
      respuesta:
        "Ei sisälly. Työnantaja pidättää työntekijän osuuden palkasta ja tilittää sen, mutta se on osa bruttopalkkaa. Laskuri näyttää vain työnantajan oman osuuden.",
    },
    {
      pregunta: "Miksi tapaturmavakuutusta ei lasketa automaattisesti?",
      respuesta: "Tapaturmavakuutuksen maksu vaihtelee yhtiöittäin ja alan riskien mukaan. Siksi siihen ei ole yhtä virallista prosenttia.",
    },
    {
      pregunta: "Kuuluvatko lomaraha ja lomapalkka sivukuluihin?",
      respuesta:
        "Laskuri laskee vain lakisääteiset vakuutusmaksut. Lomapalkka ja lomaraha ovat palkkaa, ja niistäkin maksetaan samat maksut. Lisää ne palkkaan, jos haluat koko vuoden kustannuksen.",
    },
  ],
  glosario: [
    { termino: "TyEL-maksu", definicion: "Työntekijän eläkelain mukainen eläkevakuutusmaksu. Työnantaja ja työntekijä maksavat siitä kumpikin osan." },
    { termino: "Palkkasumma", definicion: "Kaikkien työntekijöiden palkat yhteensä vuodessa." },
  ],
});
