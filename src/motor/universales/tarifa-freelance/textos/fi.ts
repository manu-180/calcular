import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosFi: TextosUi<UiTarifaFreelance> = {
  slug: "tuntihintalaskuri",
  ui: () => ({
    ingreso: "Paljonko haluat jäävän käteen vuodessa",
    ingresoAyuda: "Verojen ja kulujen jälkeen. Se on palkkasi yrittäjänä tai freelancerina.",
    gastos: "Yritystoiminnan kulut vuodessa",
    gastosAyuda: "Laitteet, ohjelmistot, netti, koulutukset, kirjanpito, vakuutukset ja eläkevakuutus.",
    impuestos: "Arvioidut verot ja maksut (%)",
    impuestosAyuda: "Osuus, joka menee veroihin ja sosiaalimaksuihin laskutuksesta kulujen jälkeen. Jos et ole varma, kysy kirjanpitäjältä. 25 % on hyvä lähtökohta.",
    diasLibres: "Vapaapäivät vuodessa",
    diasLibresAyuda: "Loma, pyhäpäivät ja sairauspäivät. Kukaan ei maksa niistä, joten tuntihintasi pitää kattaa ne.",
    diasSemana: "Työpäivät viikossa",
    horasSemana: "Laskutettavat tunnit viikossa",
    horasSemanaAyuda: "Vain tunnit, joista laskutat asiakasta. Myyntiä, hallintoa ja kouluttautumista ei voi laskuttaa. Tavallista on 20 tai 30 tuntia 40:stä.",
    tarifaHora: "Tuntihinta",
    tarifaDia: "Päivähinta",
    facturacionMensual: "Tarvittava laskutus kuukaudessa",
    facturacionAnual: "Tarvittava laskutus vuodessa",
    horasAnio: "Laskutettavat tunnit vuodessa",
    errorIngreso: "Syötä, paljonko haluat ansaita vuodessa.",
    errorImpuestos: "Verojen pitää olla alle 100 %.",
    errorDias: "Näin monella vapaapäivällä vuoteen ei jää yhtään työpäivää.",
    errorHoras: "Syötä, montako tuntia viikossa voit laskuttaa.",
    observacionFacturables: "Jos laskutat vähemmän, ansaitset suunniteltua vähemmän tai joudut tekemään enemmän tunteja. Hinnat ovat ilman arvonlisäveroa.",
  }),
};
