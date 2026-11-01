import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosLv: TextosUi<UiConsumoElectrico> = {
  slug: "elektribas-paterina-kalkulators",
  ui: () => ({
    potencia: "Ierīces jauda (W)",
    potenciaAyuda: "To atradīsiet uz etiķetes vai rokasgrāmatā vatos (W). Ja norādīti kW, reiziniet ar 1000.",
    cantidad: "Vienādu ierīču skaits",
    horas: "Darbības stundas dienā",
    dias: "Darbības dienas mēnesī",
    precio: "1 kWh cena",
    precioAyuda: "To atradīsiet elektrības rēķinā. Lai izmaksas būtu reālas, ievadiet cenu ar sadali un nodokļiem.",
    kwhDia: "Patēriņš dienā (kWh)",
    kwhMes: "Patēriņš mēnesī (kWh)",
    kwhAnio: "Patēriņš gadā (kWh)",
    costoDia: "Izmaksas dienā",
    costoMes: "Izmaksas mēnesī",
    costoAnio: "Izmaksas gadā",
    errorHoras: "Diennaktī ir 24 stundas: darbības ilgumam jābūt no 0 līdz 24.",
  }),
};
