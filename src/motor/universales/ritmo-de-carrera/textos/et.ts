import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosEt: TextosUi<UiRitmo> = {
  slug: "jooksutempo",
  ui: () => ({
    calcular: "Mida tahad arvutada?",
    calcRitmo: "Tempo (distantsi ja aja järgi)",
    calcTiempo: "Aeg (distantsi ja tempo järgi)",
    calcDistancia: "Distants (aja ja tempo järgi)",
    distancia: "Distants",
    distanciaAyuda: "Vali jooksudistants või „Muu distants“, kui tahad sisestada oma.",
    otra: "Muu distants",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Poolmaraton",
    maraton: "Maraton",
    distanciaOtra: (u) => `Muu distants (${u})`,
    horas: "Aeg: tunnid",
    minutos: "Aeg: minutid",
    segundos: "Aeg: sekundid",
    ritmoMin: (u) => `Tempo: minutid (min/${u})`,
    ritmoSeg: "Tempo: sekundid",
    ritmo: (u) => `Tempo (min/${u})`,
    tiempo: "Lõpuaeg",
    distanciaRes: (u) => `Distants (${u})`,
    velocidad: (u) => `Keskmine kiirus (${u})`,
    errorDistancia: "Sisesta distants, mis on suurem kui 0.",
    errorTiempo: "Sisesta aeg: tunnid, minutid või sekundid.",
    errorRitmo: "Sisesta tempo: minutid ja sekundid distantsiühiku kohta.",
  }),
};
