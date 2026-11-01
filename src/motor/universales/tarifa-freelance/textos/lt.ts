import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosLt: TextosUi<UiTarifaFreelance> = {
  slug: "laisvai-samdomo-valandinis-ikainis",
  ui: () => ({
    ingreso: "Norimos grynosios pajamos per metus",
    ingresoAyuda: "Sumokėjus mokesčius ir atskaičius išlaidas. Tai jūsų atlyginimas už laisvai samdomą darbą.",
    gastos: "Veiklos išlaidos per metus",
    gastosAyuda: "Įranga, programinė įranga, internetas, kursai, buhalterinė apskaita, draudimas ir taupymas pensijai.",
    impuestos: "Numatomi mokesčiai ir įmokos (%)",
    impuestosAyuda:
      "Kiek sumokėsite mokesčių ir socialinių įmokų nuo pajamų, atskaičius išlaidas. Jei abejojate, pasiteiraukite buhalterio. Pradiniam įvertinimui tiks 25 %.",
    diasLibres: "Laisvos dienos per metus",
    diasLibresAyuda: "Atostogos, šventės ir ligos dienos. Niekas už jas nesumokės, todėl jas turi padengti jūsų įkainis.",
    diasSemana: "Darbo dienos per savaitę",
    horasSemana: "Apmokamos valandos per savaitę",
    horasSemanaAyuda:
      "Tik valandos, kurias apmoka klientai. Užsakymų paieška, administravimas ir mokymasis neapmokami. Paprastai tai nuo 20 iki 30 valandų iš 40.",
    tarifaHora: "Valandinis įkainis",
    tarifaDia: "Dienos įkainis",
    facturacionMensual: "Reikalingos pajamos per mėnesį",
    facturacionAnual: "Reikalingos pajamos per metus",
    horasAnio: "Apmokamos valandos per metus",
    errorIngreso: "Įveskite, kiek norite uždirbti per metus.",
    errorImpuestos: "Mokesčiai turi būti mažesni nei 100 %.",
    errorDias: "Su tiek laisvų dienų per metus neliks nė vienos darbo dienos.",
    errorHoras: "Įveskite, kiek apmokamų valandų per savaitę galite dirbti.",
    observacionFacturables: "Jei apmokamų valandų bus mažiau, uždirbsite mažiau, nei planuojate, arba teks dirbti ilgiau.",
  }),
};
