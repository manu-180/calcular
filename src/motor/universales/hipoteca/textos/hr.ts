import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosHr: TextosUi<UiHipoteca> = {
  slug: "kalkulator-stambenog-kredita",
  ui: () => ({
    precio: "Cijena nekretnine",
    entradaPorcentaje: "Polog (% cijene)",
    entradaMonto: "Polog u novcu (neobavezno)",
    entradaMontoAyuda: "Ako unesete iznos, on zamjenjuje postotak.",
    tasa: "Godišnja kamatna stopa (%)",
    anios: "Rok otplate (godine)",
    gastos: "Mjesečni troškovi stanovanja (neobavezno)",
    gastosAyuda: "Osiguranje nekretnine, porez na nekretnine ili troškovi održavanja zgrade koje plaćate uz ratu.",
    cuota: "Mjesečna rata kredita",
    cuotaTotal: "Mjesečna rata s troškovima",
    entrada: "Polog",
    prestado: "Iznos kredita",
    intereses: "Ukupna kamata",
    total: "Ukupno na ratama",
    tabla: "Po godinama",
    colAnio: "Godina",
    colIntereses: "Plaćena kamata",
    colCapital: "Otplaćena glavnica",
    colSaldo: "Preostali dug na kraju godine",
    errorPrecio: "Unesite cijenu nekretnine.",
    errorEntrada: "Polog pokriva cijelu cijenu, pa vam kredit nije potreban. Smanjite polog.",
    observacionPrestado: (porcentaje) => `Posuđujete ${porcentaje} % cijene nekretnine. Što je taj dio veći, banka obično traži strože uvjete.`,
    observacionCostos: "Troškovi odobrenja kredita (procjena nekretnine, naknade, ovjera ugovora, upis hipoteke) nisu uračunati. Predvidite ih uz polog.",
  }),
};
