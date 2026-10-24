import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "pk.salary-tax-2027",
    fecha: "2026-10-17",
    titulo: "Lower salary tax from 1 July 2026",
    texto:
      "The Finance Act 2026 cut the tax rates in most salary slabs for tax year 2027 and withdrew the 9% surcharge on salaried individuals. Income up to Rs. 600,000 a year stays tax free. Our salary tax and take-home salary calculators already use the new table.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["pk.salary-tax-calculator", "pk.take-home-salary-calculator"],
    fuente: {
      organismo: "Federal Board of Revenue",
      titulo: "Circular No. 02 of 2026-27",
      url: "https://download1.fbr.gov.pk/Docs/202698139527880CircularNo.2of2026-27.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-17",
    },
  },
  {
    id: "pk.property-advance-tax-2027",
    fecha: "2026-10-17",
    titulo: "Flat advance tax on property sales and purchases",
    texto:
      "From 1 July 2026 the advance tax on selling property under section 236C is a flat 2.75% of the price, and on buying under section 236K a flat 1.25% of the fair market value, in place of the earlier slabs.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["pk.property-transfer-tax-calculator"],
    fuente: {
      organismo: "Federal Board of Revenue",
      titulo: "Circular No. 02 of 2026-27",
      url: "https://download1.fbr.gov.pk/Docs/202698139527880CircularNo.2of2026-27.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-17",
    },
  },
];
