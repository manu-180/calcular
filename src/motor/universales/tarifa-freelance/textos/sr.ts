import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosSr: TextosUi<UiTarifaFreelance> = {
  slug: "satnica-za-frilensere",
  ui: () => ({
    ingreso: "Koliko želite neto godišnje",
    ingresoAyuda: "Posle poreza i troškova poslovanja. To je vaša plata kao frilensera.",
    gastos: "Troškovi poslovanja godišnje",
    gastosAyuda: "Oprema, softver, internet, kursevi, knjigovođa, osiguranje i štednja za penziju.",
    impuestos: "Procena poreza i doprinosa (%)",
    impuestosAyuda:
      "Koliko odlazi na porez i doprinose od onoga što fakturišete, posle odbitka troškova. Ako niste sigurni, pitajte knjigovođu. Kao početna procena može da posluži 25%.",
    diasLibres: "Slobodni dani godišnje",
    diasLibresAyuda: "Godišnji odmor, praznici i bolovanje. Niko vam ih ne plaća, pa ih mora pokriti vaša satnica.",
    diasSemana: "Radni dani nedeljno",
    horasSemana: "Sati za naplatu nedeljno",
    horasSemanaAyuda:
      "Samo sati koje naplaćujete klijentima. Traženje poslova, administracija i učenje se ne naplaćuju. Obično je to 20 do 30 sati od 40.",
    tarifaHora: "Cena sata",
    tarifaDia: "Cena dana",
    facturacionMensual: "Potreban promet mesečno",
    facturacionAnual: "Potreban promet godišnje",
    horasAnio: "Sati za naplatu godišnje",
    errorIngreso: "Unesite koliko želite da zaradite godišnje.",
    errorImpuestos: "Porezi moraju biti manji od 100%.",
    errorDias: "Sa toliko slobodnih dana ne ostaje vam nijedan radni dan u godini.",
    errorHoras: "Unesite koliko sati nedeljno možete da naplatite.",
    observacionFacturables: "Ako naplatite manje sati, zaradićete manje nego što planirate ili ćete raditi duže.",
  }),
};
