import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma } from "@/motor/tipos";

const JORADP = "https://www.joradp.dz/HFR/Accueil.htm" as const;

const MOIS: Readonly<Record<string, string>> = {
  janvier: "01",
  fevrier: "02",
  mars: "03",
  avril: "04",
  mai: "05",
  juin: "06",
  juillet: "07",
  aout: "08",
  septembre: "09",
  octobre: "10",
  novembre: "11",
  decembre: "12",
};

// Ni la DGI (mfdgi.gov.dz) ni la CNAS ne répondent hors d'Algérie. La page d'accueil du Journal
// officiel liste les derniers numéros parus, avec leur date : chaque nouveau numéro peut contenir
// une loi de finances, un décret sur le SNMG ou une modification du code du travail.
export const detectores: readonly Detector[] = [
  {
    id: "dz.joradp-derniers-numeros",
    carril: "norma",
    datos: [
      "dz.tva-normal",
      "dz.tva-reduit",
      "dz.irg-bareme",
      "dz.irg-abattement-taux",
      "dz.irg-abattement",
      "dz.irg-exoneration",
      "dz.irg-lissage-plafonds",
      "dz.irg-lissage",
      "dz.irg-primes",
      "dz.irg-occasionnelles",
      "dz.irg-dividendes",
      "dz.irg-loyers",
      "dz.irg-loyers-seuil",
      "dz.cnas",
      "dz.snmg",
      "dz.snmg-horaire",
      "dz.allocation-chomage",
      "dz.allocation-chomage-duree",
      "dz.maternite",
      "dz.maternite-taux",
      "dz.heures-mensuelles",
      "dz.duree-legale",
      "dz.heures-supplementaires",
      "dz.conges",
      "dz.ibs",
      "dz.ibs-reinvesti",
      "dz.ifu-taux",
      "dz.ifu-plafond",
      "dz.ifu-minimum",
      "dz.vignette",
      "dz.vignette-10cv",
      "dz.droits-mutation",
      "dz.capital-deces",
      "dz.maladie-taux",
      "dz.maladie-jours-reduits",
      "dz.indemnite-diviseur",
      "dz.retraite",
      "dz.retraite-conditions",
      "dz.irg-epargne",
      "dz.irg-creances",
      "dz.pv-titres",
      "dz.pv-immo-taux",
      "dz.pv-immo-reduction",
      "dz.pv-immo-abattement",
      "dz.pv-immo-abattement-debut",
      "dz.pv-immo-frais",
      "dz.pv-immo-forfait",
    ],
    metodo: "html",
    url: JORADP,
    async traer(http) {
      const html = await http.texto(this.url, { tlsTolerante: true });
      const depuis = Date.now() - 45 * 86_400_000;
      const sortie: HallazgoNorma[] = [];
      for (const m of html.matchAll(/MaxWin\('(\d{3})'\)">\s*Journal officiel n°\s*(\d+)\s+du\s+(\d{1,2})\s+([A-Za-zéû]+)\s+(\d{4})/g)) {
        const mois = MOIS[m[4].toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")];
        if (!mois) continue;
        const fecha = `${m[5]}-${mois}-${m[3].padStart(2, "0")}` as FechaISO;
        if (!esFechaISO(fecha) || Date.parse(fecha) < depuis) continue;
        sortie.push({
          titulo: `Journal officiel n° ${m[2]} du ${m[3]} ${m[4]} ${m[5]}`,
          url: `https://www.joradp.dz/FTP/jo-francais/${m[5]}/F${m[5]}${m[1]}.pdf`,
          fecha,
        });
      }
      return /Journal officiel n°/.test(html) ? sortie : null;
    },
  },
];
