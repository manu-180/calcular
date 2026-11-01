import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosSq: TextosUi<UiFondoDeEmergencia> = {
  slug: "fond-emergjence",
  ui: () => ({
    gastos: "Shpenzimet thelbësore në muaj",
    gastosAyuda: "Ato që nuk mund të ndaloni së paguari: banesa, ushqimi, faturat, transporti, shëndeti dhe këstet.",
    meses: "Muaj shpenzimesh për t'u mbuluar",
    mesesAyuda: "Midis 3 dhe 6 muajsh nëse të ardhurat janë të qëndrueshme. Më shumë nëse ndryshojnë ose nëse në familje ka vetëm një burim të ardhurash.",
    actual: "Sa keni tashmë mënjanë (opsional)",
    aporte: "Sa mund të kurseni në muaj (opsional)",
    meta: "Fondi i rekomanduar i emergjencës",
    falta: "Mbeten për t'u kursyer",
    mesesParaLlegar: "Muaj derisa ta plotësoni",
    cobertura: "Muaj të mbuluar sot nga kursimet",
    errorGastos: "Vendosni shpenzimet thelbësore për një muaj.",
    yaCubierto: "Fondi është i plotë. Ajo që kurseni tani e tutje mund të shkojë për objektiva të tjerë.",
    sinAporte: "Vendosni sa mund të kurseni çdo muaj dhe do t'ju themi për sa kohë e arrini fondin.",
    observacionDonde: "Mbajeni në një llogari të veçantë, nga e cila mund të tërhiqni të njëjtën ditë dhe që e ruan vlerën, si një llogari kursimi ose një depozitë me tërheqje në çdo kohë.",
  }),
};
