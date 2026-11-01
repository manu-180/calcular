import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosHu: TextosUi<UiHipoteca> = {
  slug: "lakashitel-kalkulator",
  ui: () => ({
    precio: "Az ingatlan vételára",
    entradaPorcentaje: "Önerő (a vételár százalékában)",
    entradaMonto: "Önerő összege (nem kötelező)",
    entradaMontoAyuda: "Ha megadod, a százalék helyett ezzel számolunk.",
    tasa: "Éves kamat (%)",
    anios: "Futamidő (év)",
    gastos: "Havi lakhatási költségek (nem kötelező)",
    gastosAyuda: "Lakásbiztosítás, építményadó vagy közös költség, amelyet a törlesztőrészlet mellett fizetsz.",
    cuota: "Havi törlesztőrészlet",
    cuotaTotal: "Havi kiadás a költségekkel együtt",
    entrada: "Önerő",
    prestado: "Hitelösszeg",
    intereses: "Kamat összesen",
    total: "Összes törlesztés",
    tabla: "Évről évre",
    colAnio: "Év",
    colIntereses: "Kifizetett kamat",
    colCapital: "Törlesztett tőke",
    colSaldo: "Tartozás az év végén",
    errorPrecio: "Add meg az ingatlan vételárát.",
    errorEntrada: "Az önerő a teljes vételárat fedezi, így nincs szükséged hitelre. Csökkentsd az önerőt.",
    observacionPrestado: (porcentaje) => `Hitelből fizetett rész: a vételár ${porcentaje}%. Minél nagyobb ez az arány, annál szigorúbb feltételeket szab általában a bank.`,
    observacionCostos: "A hitelfelvétel költségei (értékbecslés, folyósítási díj, közjegyző, földhivatali díj) nincsenek benne. Ezekre az önerőn felül is tegyél félre.",
  }),
};
