// Nombres y etiquetas de los datos de cy en inglés (opciones de los campos opcion-dato y fuentes).
export const DATOS = {
  "cy.fpa": { nombre: "VAT rates", etiquetas: { "19": "19% standard", "9": "9% reduced", "5": "5% reduced", "3": "3% reduced", "0": "0% zero rate" } },
  "cy.imeres-adeias": { nombre: "Annual paid leave in working days", etiquetas: { "5": "Five-day week", "6": "Six-day week" } },
  "cy.syntelestes-ae": {
    nombre: "Minimum insurable earnings factor by self-employed category",
    etiquetas: {
      "1a": "1. Doctors, pharmacists, health specialists (up to 10 years)",
      "1b": "1. Doctors, pharmacists, health specialists (over 10 years)",
      "2a": "2. Accountants, economists, lawyers, other professionals (up to 10 years)",
      "2b": "2. Accountants, economists, lawyers, other professionals (over 10 years)",
      "3": "3. Managers (business owners), estate agents, wholesalers",
      "4a": "4. Teachers and lecturers (up to 10 years)",
      "4b": "4. Teachers and lecturers (over 10 years)",
      "5": "5. Builders and related trades",
      "6": "6. Farmers, livestock and poultry breeders, fishermen",
      "7": "7. Drivers, excavator operators",
      "8": "8. Technical assistants, media workers, machine operators",
      "9": "9. Clerks, typists, cashiers, secretaries",
      "10": "10. Craftsmen in other categories",
      "11": "11. Shopkeepers",
      "12": "12. Butchers, bakers, confectioners",
      "13": "13. Street vendors, delivery workers",
      "14": "14. Cleaners, messengers, guards",
      "15": "15. Designers, computer operators, ship engineers",
      "16": "16. Other occupations",
    },
  },
} as const;
