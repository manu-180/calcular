import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

// La definición pasa «km»/«mi» y «km/h»/«mph»; en armenio se escriben «կմ», «մղոն», «կմ/ժ» y «մղոն/ժ».
const corta = (u: string) => (u === "mi" ? "մղոն" : "կմ");
const genitivo = (u: string) => (u === "mi" ? "մղոնի" : "կիլոմետրի");
const velocidad = (u: string) => (u === "mph" ? "մղոն/ժ" : "կմ/ժ");

export const textosHy: TextosUi<UiRitmo> = {
  slug: "vazki-tempi-hashvich",
  ui: () => ({
    calcular: "Ի՞նչ եք ուզում հաշվարկել",
    calcRitmo: "Տեմպ (ըստ հեռավորության և ժամանակի)",
    calcTiempo: "Ժամանակ (ըստ հեռավորության և տեմպի)",
    calcDistancia: "Հեռավորություն (ըստ ժամանակի և տեմպի)",
    distancia: "Հեռավորություն",
    distanciaAyuda: "Ընտրեք մրցավազք կամ «Այլ» տարբերակը՝ Ձեր հեռավորությունը մուտքագրելու համար։",
    otra: "Այլ",
    cincoK: "5 կմ",
    diezK: "10 կմ",
    media: "Կիսամարաթոն",
    maraton: "Մարաթոն",
    distanciaOtra: (u) => `Այլ հեռավորություն (${corta(u)})`,
    horas: "Ժամանակ՝ ժամ",
    minutos: "Ժամանակ՝ րոպե",
    segundos: "Ժամանակ՝ վայրկյան",
    ritmoMin: (u) => `Տեմպ՝ րոպե մեկ ${genitivo(u)} համար`,
    ritmoSeg: "Տեմպ՝ վայրկյան",
    ritmo: (u) => `Տեմպ (րոպե/${corta(u)})`,
    tiempo: "Վերջնական ժամանակ",
    distanciaRes: (u) => `Հեռավորություն (${corta(u)})`,
    velocidad: (u) => `Միջին արագություն (${velocidad(u)})`,
    errorDistancia: "Մուտքագրեք 0 թվից մեծ հեռավորություն։",
    errorTiempo: "Մուտքագրեք ժամանակը՝ ժամ, րոպե կամ վայրկյան։",
    errorRitmo: "Մուտքագրեք տեմպը՝ րոպե և վայրկյան մեկ միավոր հեռավորության համար։",
  }),
};
