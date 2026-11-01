import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosBs: TextosUi<UiTarifaFreelance> = {
  slug: "satnica-za-freelancere",
  ui: () => ({
    ingreso: "Koliko želite neto godišnje",
    ingresoAyuda: "Nakon poreza i troškova poslovanja. To je vaša plata kao freelancera.",
    gastos: "Troškovi poslovanja godišnje",
    gastosAyuda: "Oprema, softver, internet, kursevi, računovođa, osiguranje i štednja za penziju.",
    impuestos: "Procjena poreza i doprinosa (%)",
    impuestosAyuda:
      "Koliko odlazi na porez i doprinose od onoga što fakturisate, nakon odbitka troškova. Ako niste sigurni, pitajte računovođu. Kao početna procjena može poslužiti 25 %.",
    diasLibres: "Slobodni dani godišnje",
    diasLibresAyuda: "Godišnji odmor, praznici i bolovanje. Niko vam ih ne plaća, pa ih mora pokriti vaša satnica.",
    diasSemana: "Radni dani sedmično",
    horasSemana: "Sati za naplatu sedmično",
    horasSemanaAyuda:
      "Samo sati koje naplaćujete klijentima. Traženje poslova, administracija i učenje ne naplaćuju se. Obično je to 20 do 30 sati od 40.",
    tarifaHora: "Cijena sata",
    tarifaDia: "Cijena dana",
    facturacionMensual: "Potreban promet mjesečno",
    facturacionAnual: "Potreban promet godišnje",
    horasAnio: "Sati za naplatu godišnje",
    errorIngreso: "Unesite koliko želite zaraditi godišnje.",
    errorImpuestos: "Porezi moraju biti manji od 100 %.",
    errorDias: "S toliko slobodnih dana ne ostaje vam nijedan radni dan u godini.",
    errorHoras: "Unesite koliko sati sedmično možete naplatiti.",
    observacionFacturables: "Ako naplatite manje sati, zaradit ćete manje nego što planirate ili ćete raditi duže.",
  }),
};
