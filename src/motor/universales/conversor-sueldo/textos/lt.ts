import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosLt: TextosUi<UiConversorSueldo> = {
  slug: "valandinio-atlygio-skaiciuokle",
  ui: () => ({
    monto: "Atlygis",
    periodo: "Atlygis už",
    hora: "Valandą",
    dia: "Dieną",
    semana: "Savaitę",
    quincena: "Pusę mėnesio (du kartus per mėnesį)",
    mes: "Mėnesį",
    anio: "Metus",
    horasSemana: "Dirbamos valandos per savaitę",
    diasSemana: "Darbo dienos per savaitę",
    semanasAnio: "Apmokamos savaitės per metus",
    semanasAnioAyuda: "52, jei turite apmokamas atostogas. Jei mokama tik už dirbtas savaites, kitas atimkite.",
    porHora: "Per valandą",
    porDia: "Per dieną",
    porSemana: "Per savaitę",
    porQuincena: "Per pusę mėnesio",
    porMes: "Per mėnesį",
    porAnio: "Per metus",
    errorHoras: "Įveskite, kiek valandų per savaitę dirbate.",
    errorSemanas: "Apmokamų savaičių per metus turi būti daugiau nei nulis.",
    observacionBruto: "Tai ta pati suma, perskaičiuota kitiems laikotarpiams. Priedai nepridedami, mokesčiai ir draudimo įmokos neatimami.",
  }),
};
