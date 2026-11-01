import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "mn.ndsh-2027",
    fecha: "2026-10-05",
    titulo: "Ажил олгогчийн шимтгэл 2027 оноос буурна",
    texto:
      "Нийгмийн даатгалын ерөнхий газрын мэдээгээр ҮОМШӨ-ний даатгалын хувь 0.5, 1.5, 2.5 байсан нь 0.3, 1.2, 2.2 болж, ажилгүйдлийн даатгал 0.6 болно. Нийт хувь 10.4, 11.3, 12.3 болж, 2027 оны 1 дүгээр сараас мөрдөнө. Манай шимтгэл, ажил олгогчийн зардлын тооцоолуур он гарахад шинэ хувийг автоматаар авна.",
    vigenteDesde: "2027-01-01",
    calculadoras: ["mn.ndsh-tootsooluur", "mn.ajil-olgogchiin-zardal-tootsooluur"],
    fuente: {
      organismo: "Нийгмийн даатгалын ерөнхий газар",
      titulo: "Ажил олгогчийн төлөх шимтгэлийн хувь хэмжээ буурлаа",
      url: "https://www.ndaatgal.mn/%D0%B0%D0%B6%D0%B8%D0%BB-%D0%BE%D0%BB%D0%B3%D0%BE%D0%B3%D1%87%D0%B8%D0%B9%D0%BD-%D1%82%D3%A9%D0%BB%D3%A9%D1%85-%D1%88%D0%B8%D0%BC%D1%82%D0%B3%D1%8D%D0%BB%D0%B8%D0%B9%D0%BD-%D1%85%D1%83%D0%B2/",
      tipo: "primaria",
      verificadoEl: "2026-11-01",
    },
  },
  {
    id: "mn.emd-2026",
    fecha: "2026-01-07",
    titulo: "Эрүүл мэндийн даатгалын 2026 оны хувь хэмжээ батлагдлаа",
    texto:
      "Засгийн газрын 2026 оны дугаар 01 тогтоолоор ажилтны шимтгэлийг сарын хөлсний 4 хувь гэж тогтоов. Үүний 2 хувийг ажил олгогч, 2 хувийг ажилтан төлнө. Манай цалингийн тооцоолуур энэ хувийг хэрэглэж байна.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["mn.tsalingiin-tootsooluur", "mn.ajil-olgogchiin-zardal-tootsooluur"],
    fuente: {
      organismo: "Монгол Улсын Засгийн газар",
      titulo: "Эрүүл мэндийн даатгалын шимтгэлийн 2026 оны хувь хэмжээг тогтоох тухай, дугаар 01",
      url: "https://emd.gov.mn/storage/legals/March2026/ebyRESlE3FYifbLnCd0t.pdf",
      tipo: "primaria",
      verificadoEl: "2026-11-01",
    },
  },
];
