import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosDa: TextosUi<UiAhorroRetiro> = {
  slug: "pensionsopsparing",
  ui: () => ({
    edadActual: "Din alder i dag",
    edadRetiro: "Alder, når du vil gå på pension",
    actual: "Det, du allerede har sparet op",
    aporte: "Månedlig opsparing",
    rendimiento: "Realt afkast om året (%)",
    rendimientoAyuda: "Det, opsparingen giver ud over inflationen. 2 % til 5 % er et forsigtigt bud på lang sigt.",
    aniosRenta: "Antal år, pensionen skal række",
    aniosRentaAyuda: "Hvor mange år du vil hæve penge fra opsparingen.",
    capital: "Opsparet beløb ved pensionen",
    renta: "Månedlig udbetaling fra opsparingen",
    aportado: "Indbetalt i alt",
    intereses: "Samlet værdistigning",
    tabla: "Udvikling efter alder",
    colEdad: "Alder",
    colAportado: "Indbetalt indtil nu",
    colSaldo: "Opsparet beløb",
    errorEdades: "Pensionsalderen skal være højere end din alder i dag.",
    errorSinAhorro: "Skriv din nuværende opsparing eller en månedlig opsparing.",
    observacionDineroDeHoy: "Beløbene er i dagens pengeværdi, fordi afkastet allerede er regnet efter inflation.",
    observacionPublica: "Det her er kun din egen opsparing. Folkepension og arbejdsmarkedspension er ikke med.",
  }),
};
