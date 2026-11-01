import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

function enLista(partes: readonly string[]): string {
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} և ${partes[partes.length - 1]}` : partes[0];
}

export function duracionHy(a: number, m: number, d: number): string {
  const partes: string[] = [];
  if (a) partes.push(`${a} տարի`);
  if (m) partes.push(`${m} ամիս`);
  if (d || !partes.length) partes.push(`${d} օր`);
  return enLista(partes);
}

export const textosHy: TextosUi<UiDiasEntreFechas> = {
  slug: "orer-amsatveri-mijev",
  ui: () => ({
    desde: "Սկզբի ամսաթիվ",
    hasta: "Ավարտի ամսաթիվ",
    incluir: "Ներառել նաև ավարտի ամսաթիվը",
    incluirAyuda: "Նշեք, եթե վերջին օրը նույնպես հաշվվում է, օրինակ՝ ճամփորդության կամ արձակուրդի դեպքում։",
    dias: "Օրացուցային օրեր",
    semanas: "Շաբաթներով",
    duracionFila: "Տարիներով, ամիսներով և օրերով",
    habiles: "Աշխատանքային օրեր",
    habilesAyuda: "Երկուշաբթիից ուրբաթ։ Պաշտոնական տոները չեն հանվում։",
    duracion: duracionHy,
    semanasYDias: (semanas, _n, d) => (d ? `${semanas} շաբաթ և ${d} օր` : `${semanas} շաբաթ`),
    notaHabiles: "Աշխատանքային օրերը հաշվվում են երկուշաբթիից ուրբաթ՝ առանց հանելու պաշտոնական տոները, որոնք տարբեր են՝ կախված երկրից և տարածաշրջանից։",
    notaInvertidas: "Ավարտի ամսաթիվը սկզբի ամսաթվից առաջ էր, ուստի երկուսը փոխատեղվեցին։",
  }),
};
