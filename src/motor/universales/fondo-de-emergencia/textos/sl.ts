import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosSl: TextosUi<UiFondoDeEmergencia> = {
  slug: "financna-rezerva",
  ui: () => ({
    gastos: "Nujni mesečni stroški",
    gastosAyuda: "Kar morate plačati v vsakem primeru: stanovanje, hrana, položnice, prevoz, zdravje in obroki kreditov.",
    meses: "Za koliko mesecev stroškov",
    mesesAyuda: "Pri stabilnih prihodkih 3 do 6 mesecev. Več, če se prihodki spreminjajo ali če v gospodinjstvu dela samo ena oseba.",
    actual: "Koliko ste že privarčevali (neobvezno)",
    aporte: "Koliko lahko privarčujete na mesec (neobvezno)",
    meta: "Priporočena finančna rezerva",
    falta: "Manjka še",
    mesesParaLlegar: "Meseci do cilja",
    cobertura: "Za koliko mesecev danes zadošča prihranek",
    errorGastos: "Vnesite svoje nujne mesečne stroške.",
    yaCubierto: "Finančno rezervo že imate. Kar boste še privarčevali, lahko usmerite v druge cilje.",
    sinAporte: "Vnesite, koliko lahko privarčujete na mesec, in pokazali bomo, koliko časa bo to trajalo.",
    observacionDonde: "Ta denar imejte na ločenem računu, s katerega ga lahko dvignete še isti dan in kjer ne izgublja vrednosti, na primer na varčevalnem računu brez vezave.",
  }),
};
