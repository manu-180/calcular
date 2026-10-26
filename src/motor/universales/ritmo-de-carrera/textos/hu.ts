import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosHu: TextosUi<UiRitmo> = {
  slug: "futotempo-kalkulator",
  ui: () => ({
    calcular: "Mit szeretnél kiszámolni?",
    calcRitmo: "Tempó (táv és idő alapján)",
    calcTiempo: "Idő (táv és tempó alapján)",
    calcDistancia: "Táv (idő és tempó alapján)",
    distancia: "Táv",
    distanciaAyuda: "Válassz versenytávot, vagy az „Egyéb táv” lehetőséget, ha saját távot írnál be.",
    otra: "Egyéb táv",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Félmaraton",
    maraton: "Maraton",
    distanciaOtra: (u) => `Egyéb táv (${u})`,
    horas: "Idő: óra",
    minutos: "Idő: perc",
    segundos: "Idő: másodperc",
    ritmoMin: (u) => `Tempó: perc/${u}`,
    ritmoSeg: "Tempó: másodperc",
    ritmo: (u) => `Tempó (perc/${u})`,
    tiempo: "Célidő",
    distanciaRes: (u) => `Táv (${u})`,
    velocidad: (u) => `Átlagsebesség (${u})`,
    errorDistancia: "Nullánál nagyobb távot adj meg.",
    errorTiempo: "Add meg az időt: órát, percet vagy másodpercet.",
    errorRitmo: "Add meg a tempót: percet és másodpercet egy távegységre.",
  }),
};
