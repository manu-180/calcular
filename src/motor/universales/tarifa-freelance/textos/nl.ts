import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosNl: TextosUi<UiTarifaFreelance> = {
  slug: "uurtarief-berekenen",
  ui: () => ({
    ingreso: "Wat je per jaar netto wilt overhouden",
    ingresoAyuda: "Na belastingen en kosten. Dat is je salaris als zelfstandige.",
    gastos: "Zakelijke kosten per jaar",
    gastosAyuda: "Apparatuur, software, internet, cursussen, boekhouder, verzekeringen en pensioen.",
    impuestos: "Geschatte belastingen en premies (%)",
    impuestosAyuda: "Wat er naar belastingen gaat over je omzet min je kosten. Weet je het niet zeker, vraag het een boekhouder. 25% is een beginpunt.",
    diasLibres: "Vrije dagen per jaar",
    diasLibresAyuda: "Vakantie, feestdagen en ziektedagen. Niemand betaalt je daarvoor, dus je tarief moet ze dekken.",
    diasSemana: "Werkdagen per week",
    horasSemana: "Declarabele uren per week",
    horasSemanaAyuda: "Alleen de uren die je bij een klant in rekening brengt. Klanten zoeken, administratie en bijleren tellen niet. 20 tot 30 van de 40 is normaal.",
    tarifaHora: "Uurtarief",
    tarifaDia: "Dagtarief",
    facturacionMensual: "Benodigde omzet per maand",
    facturacionAnual: "Benodigde omzet per jaar",
    horasAnio: "Declarabele uren per jaar",
    errorIngreso: "Vul in hoeveel je per jaar wilt verdienen.",
    errorImpuestos: "Belastingen moeten onder de 100% liggen.",
    errorDias: "Met zoveel vrije dagen blijven er geen werkdagen over in het jaar.",
    errorHoras: "Vul in hoeveel uur per week je kunt declareren.",
    observacionFacturables: "Vraag je minder dan dit, dan verdien je minder dan gepland of werk je meer uren.",
  }),
};
