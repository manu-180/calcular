import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "ge.pensia-kanoni-2026-09",
    fecha: "2026-11-01",
    titulo: "განახლდა დაგროვებითი პენსიის კანონის ტექსტი",
    texto: "საპენსიო ფონდმა კანონის ახალი რედაქცია 2026 წლის სექტემბერში გამოაქვეყნა. შენატანების წილები და წლიური ზღვრები იგივე დარჩა, ამიტომ გაანგარიშება არ შეცვლილა.",
    vigenteDesde: "2026-09-17",
    calculadoras: ["ge.sapensio-shenatani", "ge.dagrovebiti-pensia", "ge.khelpasis-kalkulatori"],
    fuente: { organismo: "საპენსიო ფონდი", titulo: "კანონი „დაგროვებითი პენსიის შესახებ“", url: "https://site-api.pensions.ge/uploads/docs/legislation/funded-pension-law-2026.pdf", tipo: "primaria", verificadoEl: "2026-11-01" },
  },
];
