import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosIs: TextosUi<UiConversorSueldo> = {
  slug: "launaumreikningur",
  ui: () => ({
    monto: "Laun",
    periodo: "Launatímabil",
    hora: "Klukkustund",
    dia: "Dagur",
    semana: "Vika",
    quincena: "Hálfur mánuður (24 sinnum á ári)",
    mes: "Mánuður",
    anio: "Ár",
    horasSemana: "Vinnustundir á viku",
    diasSemana: "Vinnudagar á viku",
    semanasAnio: "Greiddar vikur á ári",
    semanasAnioAyuda: "52 ef þú færð greitt orlof. Ef þú færð aðeins greitt fyrir vikurnar sem þú vinnur skaltu draga hinar frá.",
    porHora: "Tímakaup",
    porDia: "Daglaun",
    porSemana: "Vikulaun",
    porQuincena: "Laun fyrir hálfan mánuð",
    porMes: "Mánaðarlaun",
    porAnio: "Árslaun",
    errorHoras: "Sláðu inn hve margar stundir þú vinnur á viku.",
    errorSemanas: "Fjöldi greiddra vikna á ári verður að vera meiri en núll.",
    observacionBruto: "Þetta eru sömu laun umreiknuð á önnur tímabil, fyrir skatt. Aukagreiðslum og bónusum er ekki bætt við og skattur er ekki dreginn frá.",
  }),
};
