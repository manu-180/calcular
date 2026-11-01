import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosLv: TextosUi<UiPromedio> = {
  slug: "videjas-vertibas-kalkulators",
  ui: () => ({
    nota: (n) => `Atzīme ${n}`,
    notaAyuda: "Ievadiet katru atzīmi vai vērtību un tās svaru. Neizmantotās rindas atstājiet tukšas.",
    peso: (n) => `Svars ${n}`,
    pesoAyuda: "Tas var būt procents, kredītpunktu skaits vai tas, cik reižu vērtība tiek skaitīta. Bez svariem visas vērtības tiek vērtētas vienādi.",
    ponderado: "Svērtā vidējā vērtība",
    simple: "Vienkāršā vidējā vērtība",
    cantidad: "Vērtību skaits",
    sumaPesos: "Svaru summa",
    errorSinNotas: "Ievadiet vismaz vienu vērtību.",
    errorFaltaPeso: "Šai vērtībai trūkst svara. Ja izmantojat svarus, norādiet tos visām vērtībām.",
    errorFaltaNota: "Šim svaram trūkst vērtības. Ievadiet vērtību vai izdzēsiet svaru.",
    errorPesosCero: "Svaru summa ir 0: vismaz vienam svaram jābūt lielākam par nulli.",
    sinPesos: "Bez svariem svērtā vidējā vērtība sakrīt ar vienkāršo.",
  }),
};
