// Lo que las calculadoras de cm devuelven en francés (errores y observaciones): se traduce acá una
// vez para todas las traducciones de la edición.
export const MENSAJES: Readonly<Record<string, string>> = {
  "Indiquez un salaire brut supérieur à zéro.": "Enter a gross salary above zero.",
  "Le salaire de base ne peut pas dépasser le brut taxable.": "Basic salary can't be higher than taxable gross pay.",
  "Les retenues dépassent le salaire du mois.": "The deductions are higher than the month's pay.",
  "Votre brut est sous le seuil de retenue du Code général des impôts : l'employeur ne retient pas d'IRPP.":
    "Your gross pay is below the withholding threshold in the General Tax Code, so your employer deducts no IRPP.",
  "Le montant ne peut pas être négatif.": "The amount can't be negative.",
  "Le salaire ne peut pas être négatif.": "The salary can't be negative.",
  "Ce salaire est inférieur au SMIG de votre secteur.": "This salary is below the minimum wage for your sector.",
  "Indiquez un net supérieur à zéro.": "Enter a net salary above zero.",
  "Le chiffre d'affaires ne peut pas être négatif.": "Turnover can't be negative.",
  "Avec ce chiffre d'affaires, vous relevez du régime du réel et non de l'impôt général synthétique.":
    "With this turnover you fall under the actual earnings regime, not the global synthetic tax.",
  "Le barème commence à 2 CV.": "The scale starts at 2 fiscal horsepower.",
};

// Nombres y etiquetas de los datos de cm en inglés (opciones de los campos opcion-dato y fuentes).
export const DATOS = {
  "cm.cnps-prestations-familiales": {
    nombre: "CNPS family benefits contribution (employer)",
    etiquetas: { general: "General scheme (including domestic staff)", agricole: "Agricultural scheme", "enseignement-prive": "Private education" },
  },
  "cm.cnps-accidents-travail": {
    nombre: "CNPS occupational injury contribution by risk group",
    etiquetas: { a: "Group A (low risk)", b: "Group B (medium risk)", c: "Group C (high risk)" },
  },
  "cm.cnps-pension": { nombre: "CNPS old-age, invalidity and death pension contribution", etiquetas: { salarie: "Employee share", employeur: "Employer share" } },
  "cm.cnps-plafond": { nombre: "Monthly earnings ceiling for CNPS pension and family benefits" },
  "cm.tva": { nombre: "VAT rates (principal)", etiquetas: { general: "Standard rate", reduit: "Reduced rate" } },
  "cm.cac": { nombre: "Council additional tax (CAC)" },
  "cm.smig": {
    nombre: "Guaranteed minimum wage (SMIG), monthly",
    etiquetas: { general: "Other sectors", agricole: "Agriculture and related", etat: "State employees under the Labour Code" },
  },
  "cm.igs-seuils": {
    nombre: "Annual turnover from which the actual earnings regime applies",
    etiquetas: { commercial: "Trade, industry, crafts or agro-pastoral", liberal: "Liberal professions" },
  },
  "cm.igs-bareme": { nombre: "Annual global synthetic tax (IGS) by turnover" },
  "cm.igs-reduction-cga": { nombre: "IGS reduction for members of an approved management centre" },
  "cm.irpp-bareme": { nombre: "Annual personal income tax (IRPP) scale on salaries" },
  "cm.irpp-frais-professionnels": { nombre: "Flat deduction for work expenses" },
  "cm.irpp-plafond-frais": { nombre: "Annual cap on the work expenses deduction" },
  "cm.irpp-abattement": { nombre: "Annual flat allowance on salaries" },
  "cm.irpp-seuil-retenue": { nombre: "Monthly gross pay below which no IRPP is withheld" },
  "cm.cfc-taux": { nombre: "Cameroon Housing Loan Fund (CFC) contribution", etiquetas: { salarie: "Employee share", employeur: "Employer share" } },
  "cm.fne-taux": { nombre: "National Employment Fund (FNE) employer contribution" },
  "cm.rav-bareme": { nombre: "Monthly broadcasting fee (CRTV) on salaries" },
  "cm.tdl-bareme": { nombre: "Annual local development tax (TDL) for employees" },
  "cm.parite-euro": { nombre: "Fixed CFA franc (CEMAC) to euro parity" },
  "cm.timbre-automobile": {
    nombre: "Annual vehicle stamp duty by fiscal horsepower",
    etiquetas: {
      "transport-2-7": "Public transport, 2 to 7 hp",
      "transport-8-13": "Public transport, 8 to 13 hp",
      "transport-14-20": "Public transport, 14 to 20 hp",
      "transport-21": "Public transport, over 20 hp",
      "autre-2-7": "Other vehicles, 2 to 7 hp",
      "autre-8-13": "Other vehicles, 8 to 13 hp",
      "autre-14-20": "Other vehicles, 14 to 20 hp",
      "autre-21": "Other vehicles, over 20 hp",
      "moto-2-roues": "Two-wheel motorcycle",
      "moto-3-roues": "Three-wheel motorcycle",
    },
  },
} as const;
