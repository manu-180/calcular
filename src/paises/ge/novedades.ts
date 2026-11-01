import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "ge.mpr-2026-05",
    fecha: "2026-11-01",
    titulo: "ეროვნული ბანკის განაკვეთი უცვლელია",
    texto: "მონეტარული პოლიტიკის განაკვეთი გაიზარდა 2026 წლის 6 მაისს და მას შემდეგ უცვლელია. ბოლო გადაწყვეტილება მიღებულია 21 ოქტომბერს. ციფრს პროცენტის გადასახადის გვერდი აჩვენებს.",
    vigenteDesde: "2026-05-06",
    calculadoras: ["ge.saprotsento-shemosavlis-gadasakhadi"],
    fuente: { organismo: "საქართველოს ეროვნული ბანკი", titulo: "მონეტარული პოლიტიკის კომიტეტის გადაწყვეტილებები", url: "https://nbg.gov.ge/en/monetary-policy/committee-decisions", tipo: "primaria", verificadoEl: "2026-11-01" },
  },
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
