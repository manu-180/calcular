import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosLv: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "bezzaudejuma-punkta-kalkulators",
  ui: () => ({
    fijos: "Pastāvīgās izmaksas mēnesī",
    fijosAyuda: "Ko maksājat, pat ja neko nepārdodat: īre, fiksētas algas, komunālie maksājumi, programmatūra.",
    precio: "Vienības pārdošanas cena",
    variable: "Mainīgās izmaksas uz vienību",
    variableAyuda: "Cik izmaksā katra pārdotā vienība: materiāli, preces, komisijas, transports.",
    objetivo: "Vēlamā peļņa mēnesī (nav obligāta)",
    objetivoAyuda: "Lai redzētu, cik jāpārdod papildus, kad izmaksas jau ir segtas.",
    unidades: "Vienību skaits bezzaudējuma punktā",
    facturacion: "Ieņēmumi bezzaudējuma punktā",
    contribucion: "Seguma marža uz vienību",
    contribucionAyuda: "Cik katrs pārdošanas darījums atstāj pastāvīgajām izmaksām: cena mīnus mainīgās izmaksas.",
    contribucionPct: "Seguma marža (%)",
    unidadesObjetivo: "Vienību skaits vēlamajai peļņai",
    facturacionObjetivo: "Ieņēmumi vēlamajai peļņai",
    errorPrecio: "Ievadiet vienas vienības pārdošanas cenu.",
    errorMargen:
      "Mainīgās izmaksas ir vienādas ar cenu vai lielākas par to: katrs pārdošanas darījums nes zaudējumus, tāpēc bezzaudējuma punktu nesasniegsiet. Pārbaudiet cenu vai izmaksas.",
    observacionRedondeo: "Vienību skaitu noapaļo uz augšu, jo vienības daļu pārdot nevar.",
  }),
};
