import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosLt: TextosUi<UiOvulacion> = {
  slug: "ovuliacijos-skaiciuokle",
  ui: () => ({
    fum: "Pirmoji paskutinių mėnesinių diena",
    fumAyuda: "Pirmoji kraujavimo diena, ne paskutinė.",
    ciclo: "Ciklo trukmė (dienomis)",
    cicloAyuda: "Nuo pirmosios vienų mėnesinių dienos iki dienos prieš kitas. Jei trukmė kinta, įveskite vidurkį.",
    ovulacion: "Numatoma ovuliacija",
    fertilDesde: "Vaisingos dienos nuo",
    fertilHasta: "Vaisingos dienos iki",
    proxima: "Kitos mėnesinės",
    tabla: "Kiti ciklai",
    colRegla: "Mėnesinės",
    colDesde: "Vaisingos nuo",
    colHasta: "Vaisingos iki",
    colOvulacion: "Ovuliacija",
    errorCiclo: "Ciklo trukmė turi būti nuo 21 iki 45 dienų.",
    aviso: "Tai apytikslis skaičiavimas reguliariam ciklui. Tai nėra kontracepcijos metodas, ir jis neatstoja gydytojo konsultacijos.",
  }),
};
