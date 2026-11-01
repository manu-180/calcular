import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosSk: TextosUi<UiTarifaFreelance> = {
  slug: "hodinova-sadzba-freelancera",
  ui: () => ({
    ingreso: "Koľko chcete mať čistého za rok",
    ingresoAyuda: "Po zdanení a odpočítaní výdavkov. Je to vaša mzda na voľnej nohe.",
    gastos: "Výdavky na podnikanie za rok",
    gastosAyuda: "Vybavenie, softvér, internet, kurzy, účtovníctvo, poistenie a sporenie na dôchodok.",
    impuestos: "Odhad daní a odvodov (%)",
    impuestosAyuda:
      "Koľko odvediete na daniach a odvodoch z toho, čo vyfakturujete po odpočítaní výdavkov. Ak máte pochybnosti, opýtajte sa účtovníka. Ako východiskový odhad poslúži 25 %.",
    diasLibres: "Dni voľna za rok",
    diasLibresAyuda: "Dovolenka, sviatky a dni choroby. Nikto vám ich nezaplatí, takže ich musí pokryť vaša sadzba.",
    diasSemana: "Pracovné dni v týždni",
    horasSemana: "Fakturovateľné hodiny za týždeň",
    horasSemanaAyuda:
      "Len hodiny, ktoré účtujete klientom. Zháňanie zákaziek, administratíva a vzdelávanie sa nefakturujú. Zvyčajne je to 20 až 30 hodín zo 40.",
    tarifaHora: "Hodinová sadzba",
    tarifaDia: "Denná sadzba",
    facturacionMensual: "Potrebná fakturácia za mesiac",
    facturacionAnual: "Potrebná fakturácia za rok",
    horasAnio: "Fakturovateľné hodiny za rok",
    errorIngreso: "Zadajte, koľko chcete zarobiť za rok.",
    errorImpuestos: "Dane musia byť nižšie ako 100 %.",
    errorDias: "S toľkými dňami voľna vám v roku nezostane žiadny pracovný deň.",
    errorHoras: "Zadajte, koľko hodín týždenne môžete fakturovať.",
    observacionFacturables: "Ak budete účtovať menej, zarobíte menej, ako plánujete, alebo budete pracovať viac hodín.",
  }),
};
