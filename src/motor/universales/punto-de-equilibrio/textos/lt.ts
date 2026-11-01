import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosLt: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "luzio-taskas",
  ui: () => ({
    fijos: "Pastoviosios išlaidos per mėnesį",
    fijosAyuda: "Ką mokate, net jei nieko neparduodate: nuoma, fiksuoti atlyginimai, komunaliniai mokesčiai, programinė įranga.",
    precio: "Vieneto pardavimo kaina",
    variable: "Kintamosios išlaidos vienetui",
    variableAyuda: "Kiek kainuoja kiekvienas parduotas vienetas: medžiagos, prekės, komisiniai, transportas.",
    objetivo: "Siekiamas pelnas per mėnesį (neprivaloma)",
    objetivoAyuda: "Kad matytumėte, kiek reikia parduoti papildomai, kai išlaidos jau padengtos.",
    unidades: "Vienetų skaičius lūžio taške",
    facturacion: "Pajamos lūžio taške",
    contribucion: "Padengimo marža vienetui",
    contribucionAyuda: "Kiek kiekvienas pardavimas palieka pastoviosioms išlaidoms: kaina minus kintamosios išlaidos.",
    contribucionPct: "Padengimo marža (%)",
    unidadesObjetivo: "Vienetų skaičius siekiamam pelnui",
    facturacionObjetivo: "Pajamos siekiamam pelnui",
    errorPrecio: "Įveskite vieno vieneto pardavimo kainą.",
    errorMargen:
      "Kintamosios išlaidos lygios kainai arba už ją didesnės: kiekvienas pardavimas nuostolingas, todėl lūžio taško nepasieksite. Patikrinkite kainą arba išlaidas.",
    observacionRedondeo: "Vienetų skaičius apvalinamas į didesnę pusę, nes vieneto dalies parduoti negalima.",
  }),
};
