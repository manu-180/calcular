import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

// Sin plural detrás del número, coma entre las partes y la conjunción antes de la última.
export function duracionKa(anios: number, meses: number, dias: number): string {
  const partes: string[] = [];
  if (anios) partes.push(`${anios} წელი`);
  if (meses) partes.push(`${meses} თვე`);
  if (dias || !partes.length) partes.push(`${dias} დღე`);
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} და ${partes[partes.length - 1]}` : partes[0];
}

export const textosKa: TextosUi<UiDiasEntreFechas> = {
  slug: "dgheebi-tarighebs-shoris",
  ui: () => ({
    desde: "საწყისი თარიღი",
    hasta: "საბოლოო თარიღი",
    incluir: "ბოლო დღის ჩათვლა",
    incluirAyuda: "მონიშნეთ, თუ ბოლო დღეც უნდა ჩაითვალოს, მაგალითად, მოგზაურობისას ან შვებულებისას.",
    dias: "კალენდარული დღეები",
    semanas: "კვირებში",
    duracionFila: "წლებში, თვეებსა და დღეებში",
    habiles: "სამუშაო დღეები",
    habilesAyuda: "ორშაბათიდან პარასკევის ჩათვლით. უქმე დღეები არ აკლდება.",
    duracion: duracionKa,
    semanasYDias: (semanas, _n, dias) => (dias ? `${semanas} კვირა და ${dias} დღე` : `${semanas} კვირა`),
    notaHabiles: "სამუშაო დღეები ორშაბათიდან პარასკევის ჩათვლით ითვლება. უქმე დღეები არ აკლდება, რადგან ისინი ქვეყნისა და რეგიონის მიხედვით განსხვავდება.",
    notaInvertidas: "საბოლოო თარიღი საწყისზე ადრე იყო, ამიტომ ორივე თარიღს ადგილები გავუცვალეთ.",
  }),
};
