import { formaRo } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

export const textosRo: TextosUi<UiAlquilarOComprar> = {
  slug: "chirie-sau-cumparare-locuinta",
  ui: () => ({
    precio: "Prețul locuinței",
    entrada: "Avans (% din preț)",
    gastosCompra: "Costuri de cumpărare (% din preț)",
    gastosCompraAyuda: "Notar, taxe de transfer, evaluare și comisionul agenției.",
    tasa: "Dobânda creditului ipotecar (% pe an)",
    aniosHipoteca: "Perioada creditului în ani",
    alquiler: "Chiria lunară pentru o locuință similară",
    aumentoAlquiler: "Creșterea anuală a chiriei (%)",
    gastosPropietario: "Costurile proprietarului pe an (% din valoare)",
    gastosPropietarioAyuda: "Întreținere, impozit pe clădire și asigurarea locuinței. De obicei între 1% și 2%.",
    revalorizacion: "Creșterea anuală a prețului locuinței (%)",
    rendimiento: "Randamentul unei investiții alternative (% pe an)",
    rendimientoAyuda: "Cât ați câștiga dacă ați investi avansul în loc să cumpărați.",
    horizonte: "Numărul de ani comparați",
    veredicto: "Rezultat",
    patrimonioComprar: "Averea netă la final dacă cumpărați",
    patrimonioAlquilar: "Averea netă la final dacă stați cu chirie",
    diferencia: "Diferență",
    anioDesde: "Anul din care cumpărarea iese mai bine",
    pagadoAlquilando: "Total chirie plătită",
    pagadoComprando: "Total rate și costuri de proprietar",
    tabla: "Comparație an cu an",
    colAnio: "Anul",
    colComprar: "Cumpărare",
    colAlquilar: "Chirie",
    colDiferencia: "Diferență",
    errorPrecio: "Introduceți prețul locuinței.",
    errorAlquiler: "Introduceți cât ar costa chiria unei locuințe similare.",
    convieneComprar: (anios, diferencia) => `Cumpărarea iese mai bine: după ${anios} ${formaAni(anios)} ați avea cu ${diferencia} mai mult.`,
    convieneAlquilar: (anios, diferencia) => `Chiria iese mai bine: după ${anios} ${formaAni(anios)} ați avea cu ${diferencia} mai mult.`,
    empate: (anios) => `După ${anios} ${formaAni(anios)} cele două variante ajung la fel.`,
    observacionDesde: (anio) => `Cumpărarea trece înaintea chiriei în anul ${anio} și rămâne în față.`,
    observacionMetodo:
      "Se compară ce ați avea în fiecare caz. Dacă stați cu chirie, avansul și ce economisiți lunar rămân investite. Costurile de vânzare nu se scad.",
  }),
};

function formaAni(anios: string): string {
  return formaRo(anios, "an", "ani");
}
