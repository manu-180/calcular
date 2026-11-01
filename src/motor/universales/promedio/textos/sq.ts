import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosSq: TextosUi<UiPromedio> = {
  slug: "kalkulator-mesatare",
  ui: () => ({
    nota: (n) => `Nota ${n}`,
    notaAyuda: "Vendosni çdo notë ose vlerë me peshën e saj. Rreshtat e papërdorur mbeten bosh.",
    peso: (n) => `Pesha ${n}`,
    pesoAyuda: "Mund të jetë një përqindje, numri i krediteve ose sa herë llogaritet. Pa pesha, të gjitha vlerat kanë të njëjtën rëndësi.",
    ponderado: "Mesatarja e ponderuar",
    simple: "Mesatarja aritmetike",
    cantidad: "Numri i vlerave",
    sumaPesos: "Shuma e peshave",
    errorSinNotas: "Vendosni të paktën një vlerë.",
    errorFaltaPeso: "Kjo vlerë nuk ka peshë. Nëse përdorni pesha, plotësojini për të gjitha vlerat.",
    errorFaltaNota: "Kjo peshë nuk ka vlerë. Plotësoni vlerën ose fshini peshën.",
    errorPesosCero: "Shuma e peshave është 0: të paktën njëra duhet të jetë më e madhe se zero.",
    sinPesos: "Pa pesha, mesatarja e ponderuar është e barabartë me mesataren aritmetike.",
  }),
};
