import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosSl: TextosUi<UiConsumoElectrico> = {
  slug: "poraba-elektrike",
  ui: () => ({
    potencia: "Moč naprave (W)",
    potenciaAyuda: "Piše na nalepki ali v navodilih, v vatih (W). Če je navedena v kW, jo pomnožite s 1000.",
    cantidad: "Število enakih naprav",
    horas: "Ure delovanja na dan",
    dias: "Dnevi delovanja na mesec",
    precio: "Cena za 1 kWh",
    precioAyuda: "Najdete jo na računu za elektriko. Za dejanski strošek vnesite ceno z vsemi dajatvami in DDV.",
    kwhDia: "Poraba na dan (kWh)",
    kwhMes: "Poraba na mesec (kWh)",
    kwhAnio: "Poraba na leto (kWh)",
    costoDia: "Strošek na dan",
    costoMes: "Strošek na mesec",
    costoAnio: "Strošek na leto",
    errorHoras: "Dan ima 24 ur: čas delovanja mora biti od 0 do 24.",
  }),
};
