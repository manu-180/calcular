import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosDa: TextosUi<UiCeramicos> = {
  slug: "fliseberegner",
  ui: () => ({
    superficie: (u) => `Areal, der skal lægges fliser på (${u})`,
    largo: (u) => `Flisens længde (${u})`,
    ancho: (u) => `Flisens bredde (${u})`,
    desperdicio: "Spild (%)",
    desperdicioAyuda: "Til tilskæring og fliser, der går i stykker. Regn med 10 % ved lige lægning og 15 % ved diagonal.",
    porCaja: "Fliser pr. pakke",
    porCajaAyuda: "Valgfrit. Skriv det for at se, hvor mange pakker du skal købe.",
    piezas: "Antal fliser",
    cajas: "Pakker, du skal købe",
    conDesperdicio: (u) => `Areal med spild (${u})`,
    cubre: (u) => `Areal, pakkerne dækker (${u})`,
    errorSuperficie: "Arealet skal være større end 0.",
    errorPieza: "Flisens mål skal være større end 0.",
  }),
};
