import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosPt: TextosUi<UiInteresCompuesto> = {
  slug: "juros-compostos",
  ui: () => ({
    capital: "Valor inicial",
    aporte: "Aporte mensal (opcional)",
    aporteAyuda: "O que você somaria todo mês. Ele entra no fim de cada mês.",
    tasa: "Taxa de juros anual (%)",
    anios: "Anos",
    capitalizacion: "Capitalização",
    anual: "Anual",
    semestral: "Semestral",
    trimestral: "Trimestral",
    mensual: "Mensal",
    diaria: "Diária",
    saldo: "Saldo final",
    aportado: "Total aportado",
    intereses: "Juros ganhos",
    tabla: "Crescimento ano a ano",
    colAnio: "Ano",
    colAportado: "Aportes",
    colIntereses: "Juros",
    colSaldo: "Saldo no fim do ano",
    errorSinDinero: "Coloque um valor inicial ou um aporte mensal.",
    observacionIntereses: (porcentaje) => `${porcentaje}% do saldo final são juros.`,
  }),
};
