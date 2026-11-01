import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosEt: TextosUi<UiTarifaFreelance> = {
  slug: "tunnihinna-kalkulaator",
  ui: () => ({
    ingreso: "Kui palju tahad aastas kätte saada",
    ingresoAyuda: "Pärast makse ja kulusid. See on sinu palk ettevõtja või vabakutselisena.",
    gastos: "Ettevõtluse kulud aastas",
    gastosAyuda: "Seadmed, tarkvara, internet, koolitused, raamatupidamine, kindlustused ja pensionisääst.",
    impuestos: "Hinnangulised maksud ja maksed (%)",
    impuestosAyuda: "Osa, mis läheb pärast kulusid käibest maksudeks ja sotsiaalmakseteks. Kui sa pole kindel, küsi raamatupidajalt. 25% on hea lähtekoht.",
    diasLibres: "Vabad päevad aastas",
    diasLibresAyuda: "Puhkus, riigipühad ja haiguspäevad. Keegi ei maksa nende eest, seega peab sinu tunnihind need katma.",
    diasSemana: "Tööpäevad nädalas",
    horasSemana: "Arveldatavad tunnid nädalas",
    horasSemanaAyuda: "Ainult tunnid, mille eest esitad kliendile arve. Müügi, administreerimise ja enesetäienduse eest arvet esitada ei saa. Tavaliselt on 40 töötunnist arveldatavad 20 või 30.",
    tarifaHora: "Tunnihind",
    tarifaDia: "Päevahind",
    facturacionMensual: "Vajalik käive kuus",
    facturacionAnual: "Vajalik käive aastas",
    horasAnio: "Arveldatavad tunnid aastas",
    errorIngreso: "Sisesta, kui palju tahad aastas teenida.",
    errorImpuestos: "Maksud peavad olema alla 100%.",
    errorDias: "Nii paljude vabade päevadega ei jää aastasse ühtegi tööpäeva.",
    errorHoras: "Sisesta, mitu tundi nädalas saad arveldada.",
    observacionFacturables: "Kui arveldad vähem, teenid plaanitust vähem või pead tegema rohkem tunde. Hinnad on käibemaksuta.",
  }),
};
