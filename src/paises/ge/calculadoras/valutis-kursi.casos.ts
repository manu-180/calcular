import { definirCasos } from "@/motor/calculo";
import valutisKursi from "./valutis-kursi";

const NBG = "https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/ka/json/?currencies=USD&date=2026-10-31";

export default definirCasos(valutisKursi, [
  {
    nombre: "100 დოლარი ლარში",
    origen: { tipo: "oficial", url: NBG, detalle: "31 ოქტომბრის კურსი 2,5992: 100 × 2,5992 = 259,92." },
    fecha: "2026-11-01",
    entrada: { valuta: "usd", mimartuleba: "larshi", tanxa: 100 },
    esperado: { shedegi: 259.92, kursi: 2.5992, fecha: "2026-10-31" },
  },
  {
    nombre: "1000 ლარი ევროში",
    origen: { tipo: "oficial", url: "https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/ka/json/?currencies=EUR&date=2026-10-31", detalle: "31 ოქტომბრის კურსი 2,9116: 1000 / 2,9116 = 343,45." },
    fecha: "2026-11-01",
    entrada: { valuta: "eur", mimartuleba: "valutashi", tanxa: 1000 },
    esperado: { shedegi: 343.45 },
  },
]);
