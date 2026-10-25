import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosSr: TextosUi<UiHipoteca> = {
  slug: "kalkulator-stambenog-kredita",
  ui: () => ({
    precio: "Cena nekretnine",
    entradaPorcentaje: "Učešće (% od cene)",
    entradaMonto: "Učešće u novcu (nije obavezno)",
    entradaMontoAyuda: "Ako unesete iznos, on zamenjuje procenat.",
    tasa: "Godišnja kamatna stopa (%)",
    anios: "Rok otplate (godine)",
    gastos: "Mesečni troškovi stanovanja (nije obavezno)",
    gastosAyuda: "Osiguranje nekretnine, porez na imovinu ili troškovi održavanja zgrade koje plaćate uz ratu.",
    cuota: "Mesečna rata kredita",
    cuotaTotal: "Mesečna rata sa troškovima",
    entrada: "Učešće",
    prestado: "Iznos kredita",
    intereses: "Ukupna kamata",
    total: "Ukupno na ratama",
    tabla: "Po godinama",
    colAnio: "Godina",
    colIntereses: "Plaćena kamata",
    colCapital: "Otplaćena glavnica",
    colSaldo: "Preostali dug na kraju godine",
    errorPrecio: "Unesite cenu nekretnine.",
    errorEntrada: "Učešće pokriva celu cenu, pa vam kredit nije potreban. Smanjite učešće.",
    observacionPrestado: (porcentaje) => `Pozajmljujete ${porcentaje}% cene nekretnine. Što je taj deo veći, banka obično traži strože uslove.`,
    observacionCostos: "Troškovi odobrenja kredita (procena nekretnine, naknade, overa ugovora, upis hipoteke) nisu uračunati. Predvidite ih pored učešća.",
  }),
};
