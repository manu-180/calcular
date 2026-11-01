import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosSq: TextosUi<UiTasaEfectiva> = {
  slug: "norma-efektive-e-interesit",
  ui: () => ({
    direccion: "Çfarë norme interesi keni?",
    nominalAEfectiva: "Normën nominale (kthejeni në normë efektive)",
    efectivaANominal: "Normën efektive (kthejeni në normë nominale)",
    tasa: "Norma vjetore e interesit (%)",
    tasaAyuda: "Vendoseni saktësisht siç shfaqet në ofertë ose në kontratë.",
    capitalizacion: "Kapitalizimi",
    capitalizacionAyuda: "Sa shpesh i shtohet interesi tepricës. Te kreditë dhe kartat, kapitalizimi është zakonisht mujor.",
    mensual: "Mujor (12 herë në vit)",
    trimestral: "Tremujor (4 herë në vit)",
    semestral: "Gjashtëmujor (2 herë në vit)",
    diaria: "Ditor (365 herë në vit)",
    efectiva: "Norma vjetore efektive",
    nominal: "Norma vjetore nominale",
    periodica: "Norma për periudhë",
    errorNegativa: "Norma e interesit nuk mund të jetë negative. Vendosni një numër nga 0 e lart.",
    observacionDiferencia: (puntos) => `Norma efektive është ${puntos} pikë përqindjeje më e lartë se ajo nominale, sepse interesi prodhon edhe vetë interes.`,
  }),
};
