import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosSv: TextosUi<UiAhorroRetiro> = {
  slug: "pensionssparande",
  ui: () => ({
    edadActual: "Din ålder i dag",
    edadRetiro: "Ålder när du vill gå i pension",
    actual: "Det du redan har sparat",
    aporte: "Månadssparande",
    rendimiento: "Real avkastning per år (%)",
    rendimientoAyuda: "Det sparandet ger utöver inflationen. 2 % till 5 % är ett försiktigt antagande på lång sikt.",
    aniosRenta: "Antal år som pensionen ska räcka",
    aniosRentaAyuda: "Hur många år du vill ta ut pengar från sparandet.",
    capital: "Sparat kapital vid pensionen",
    renta: "Månatligt uttag från sparandet",
    aportado: "Totalt insatt",
    intereses: "Total värdeökning",
    tabla: "Utveckling efter ålder",
    colEdad: "Ålder",
    colAportado: "Insatt hittills",
    colSaldo: "Sparat kapital",
    errorEdades: "Pensionsåldern måste vara högre än din ålder i dag.",
    errorSinAhorro: "Fyll i ditt nuvarande sparande eller ett månadssparande.",
    observacionDineroDeHoy: "Beloppen är i dagens penningvärde, eftersom avkastningen redan är räknad efter inflation.",
    observacionPublica: "Det här är bara ditt eget sparande. Allmän pension och tjänstepension ingår inte.",
  }),
};
