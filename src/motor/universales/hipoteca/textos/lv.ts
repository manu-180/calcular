import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosLv: TextosUi<UiHipoteca> = {
  slug: "majokla-kredita-kalkulators",
  ui: () => ({
    precio: "Mājokļa cena",
    entradaPorcentaje: "Pirmā iemaksa (% no cenas)",
    entradaMonto: "Pirmā iemaksa naudā (nav obligāti)",
    entradaMontoAyuda: "Ja ievadīsiet summu, tā aizstās procentuālo daļu.",
    tasa: "Procentu likme gadā (%)",
    anios: "Kredīta termiņš (gados)",
    gastos: "Mājokļa izdevumi mēnesī (nav obligāti)",
    gastosAyuda: "Mājokļa apdrošināšana, nekustamā īpašuma nodoklis vai iemaksas, ko maksājat kopā ar kredītu.",
    cuota: "Ikmēneša kredīta maksājums",
    cuotaTotal: "Ikmēneša maksājums ar izdevumiem",
    entrada: "Pirmā iemaksa",
    prestado: "Kredīta summa",
    intereses: "Procenti kopā",
    total: "Maksājumi kopā",
    tabla: "Pa gadiem",
    colAnio: "Gads",
    colIntereses: "Samaksātie procenti",
    colCapital: "Atmaksātā kredīta daļa",
    colSaldo: "Atlikums gada beigās",
    errorPrecio: "Ievadiet mājokļa cenu.",
    errorEntrada: "Pirmā iemaksa sedz visu cenu, tāpēc kredīts nav vajadzīgs. Samaziniet pirmo iemaksu.",
    observacionPrestado: (porcentaje) => `Aizņematies ${porcentaje}% no mājokļa cenas. Jo lielāka šī daļa, jo stingrākus nosacījumus parasti piemēro banka.`,
    observacionCostos: "Līguma noslēgšanas izdevumi (īpašuma novērtējums, nodevas, notārs, hipotēkas reģistrācija) nav iekļauti. Plānojiet tos papildus pirmajai iemaksai.",
  }),
};
