import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "litros" : "galonos");

export const textosLv: TextosUi<UiPintura> = {
  slug: "krasas-kalkulators",
  ui: () => ({
    modo: "Kādus izmērus zināt?",
    modoMedidas: "Sienu garumu un augstumu",
    modoSuperficie: "Kopējo laukumu",
    largo: (u) => `Kopējais sienu garums (${u})`,
    largoAyuda: "Visas krāsojamās sienas kopā. Telpai tas ir perimetrs.",
    alto: (u) => `Sienu augstums (${u})`,
    superficie: (u) => `Krāsojamais laukums (${u})`,
    aberturas: (u) => `Atņemamās durvis un logi (${u})`,
    aberturasAyuda: "Durvis aizņem apmēram 2 m², parasts logs 1 līdz 2 m².",
    manos: "Kārtu skaits",
    rendimiento: (u) => `Krāsas patēriņš (${u})`,
    rendimientoAyuda: "To atradīsiet uz iepakojuma: kādu laukumu nosedz viena kārta. Ja nezināt, atstājiet ieteikto vērtību.",
    recomendado: (u) => `Pirkt krāsu (${volumen(u)})`,
    recomendadoAyuda: "Ieskaitot 10% rezervi labojumiem un tam, kas paliek uz veltņa.",
    necesario: (u) => `Precīzs daudzums (${volumen(u)})`,
    neta: (u) => `Krāsojamais laukums (${u})`,
    errorMedidas: "Ievadiet sienu garumu un augstumu.",
    errorSuperficie: "Ievadiet krāsojamo laukumu.",
    errorAberturas: "Durvis un logi nevar aizņemt visu sienu.",
    errorRendimiento: "Patēriņam jābūt lielākam par 0.",
  }),
};
