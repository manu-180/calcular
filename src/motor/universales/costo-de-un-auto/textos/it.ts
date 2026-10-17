import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosIt: TextosUi<UiCostoDeUnAuto> = {
  slug: "costo-mantenimento-auto",
  ui: () => ({
    precio: "Valore dell'auto",
    precioAyuda: "Quanto l'hai pagata, o quanto vale oggi se ce l'hai da un po'.",
    depreciacion: "Valore perso ogni anno (%)",
    depreciacionAyuda: "Un'auto nuova perde dal 15% al 25% nel primo anno. Una usata, meno.",
    cuota: "Rata mensile del finanziamento (facoltativo)",
    cuotaAyuda: "Serve solo a mostrare quanto esce dal conto ogni mese. Non si somma al costo reale.",
    seguro: "Assicurazione RC auto al mese",
    distanciaKm: "Chilometri al mese",
    distanciaMi: "Miglia al mese",
    consumoL100: "Consumo (litri ogni 100 km)",
    consumoMpg: "Consumo (miglia per gallone)",
    precioLitro: "Prezzo del carburante al litro",
    precioGalon: "Prezzo del carburante al gallone",
    mantenimiento: "Manutenzione al mese",
    mantenimientoAyuda: "Tagliandi, gomme, riparazioni e lavaggi, in media al mese.",
    estacionamiento: "Parcheggio o garage al mese (facoltativo)",
    otros: "Bollo, pedaggi e altre spese al mese (facoltativo)",
    otrosAyuda: "Bollo auto, revisione, pedaggi e multe, in media al mese.",
    costoMensual: "Costo reale al mese",
    costoAnual: "Costo reale all'anno",
    porKm: "Costo per chilometro",
    porMilla: "Costo per miglio",
    combustible: "Carburante al mese",
    depreciacionMensual: "Valore perso al mese",
    gastoBolsillo: "Quanto esce dal conto ogni mese",
    errorConsumo: "Inserisci il consumo della tua auto per calcolare la spesa di carburante.",
    observacionCuota:
      "La rata del finanziamento non entra nel costo reale perché in parte paga l'auto, che è già contata come valore perso. Gli interessi del finanziamento sono un costo in più.",
  }),
};
