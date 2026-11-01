import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

// «36 év, 4 hónap és 28 nap»: a magyarban a szám után egyes szám áll, a részek között vessző, az
// utolsó előtt «és».
export function duracionHu(anios: number, meses: number, dias: number): string {
  const partes: string[] = [];
  if (anios) partes.push(`${anios} év`);
  if (meses) partes.push(`${meses} hónap`);
  if (dias || !partes.length) partes.push(`${dias} nap`);
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} és ${partes[partes.length - 1]}` : partes[0];
}

export const textosHu: TextosUi<UiDiasEntreFechas> = {
  slug: "napok-ket-datum-kozott",
  ui: () => ({
    desde: "Kezdő dátum",
    hasta: "Záró dátum",
    incluir: "Az utolsó nap is számítson",
    incluirAyuda: "Pipáld be, ha az utolsó nap is beleszámít, például egy utazásnál vagy szabadságnál.",
    dias: "Naptári napok",
    semanas: "Hetekben",
    duracionFila: "Években, hónapokban és napokban",
    habiles: "Munkanapok",
    habilesAyuda: "Hétfőtől péntekig. Az ünnepnapokat nem vonja le.",
    duracion: duracionHu,
    semanasYDias: (semanas, _n, dias) => (dias ? `${semanas} hét és ${dias} nap` : `${semanas} hét`),
    notaHabiles: "A munkanapok hétfőtől péntekig számítanak, az ünnepnapok levonása nélkül, mert azok országonként és régiónként eltérnek.",
    notaInvertidas: "A záró dátum korábbi volt a kezdő dátumnál, ezért felcseréltük a kettőt.",
  }),
};
