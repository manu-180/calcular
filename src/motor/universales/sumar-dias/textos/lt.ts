import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosLt: TextosUi<UiSumarDias> = {
  slug: "dienu-pridejimas-prie-datos",
  ui: () => ({
    fecha: "Pradinė data",
    operacion: "Veiksmas",
    sumar: "Pridėti dienas",
    restar: "Atimti dienas",
    dias: "Dienų skaičius",
    tipo: "Dienų rūšis",
    corridos: "Kalendorinės dienos",
    habiles: "Darbo dienos (nuo pirmadienio iki penktadienio)",
    resultado: "Galutinė data",
    diaSemana: "Savaitės diena",
    diasCorridos: "Iš viso kalendorinių dienų",
    nombresDias: ["sekmadienis", "pirmadienis", "antradienis", "trečiadienis", "ketvirtadienis", "penktadienis", "šeštadienis"],
    errorDias: "Dienų skaičius turi būti sveikas ir apimti ne daugiau kaip 100 metų.",
    notaHabiles: "Darbo dienos neapima šeštadienių ir sekmadienių, bet valstybinės šventės neatimamos. Jei į laikotarpį patenka šventė, pridėkite ją atskirai.",
  }),
};
