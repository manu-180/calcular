import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "th.sso-ceiling-2569",
    fecha: "2026-10-26",
    titulo: "เพดานค่าจ้างประกันสังคมเพิ่มเป็น 17,500 บาท",
    texto:
      "ตั้งแต่ 1 มกราคม 2569 ค่าจ้างที่ใช้คิดเงินสมทบของผู้ประกันตนมาตรา 33 สูงสุด 17,500 บาทต่อเดือน เงินสมทบสูงสุดของลูกจ้างจึงเป็น 875 บาทต่อเดือน เครื่องคำนวณเงินเดือนสุทธิและประกันสังคมใช้เพดานใหม่แล้ว",
    vigenteDesde: "2026-01-01",
    calculadoras: ["th.take-home-pay", "th.social-security"],
    fuente: {
      organismo: "สำนักงานคณะกรรมการกฤษฎีกา",
      titulo: "กฎกระทรวงกำหนดค่าจ้างขั้นต่ำและขั้นสูงที่ใช้เป็นฐานในการคำนวณเงินสมทบของผู้ประกันตนตามมาตรา 33 พ.ศ. 2568",
      url: "https://www.ocs.go.th/searchlaw/law-index/item/14702",
      tipo: "primaria",
      verificadoEl: "2026-10-26",
    },
  },
];
