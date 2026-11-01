import type { Novedad } from "@/motor/tipos";

const HOY = "2026-11-01";

export const novedades: readonly Novedad[] = [
  {
    id: "lv.minimala-alga-2026",
    fecha: HOY,
    titulo: "Minimālā alga 780 eiro",
    texto: "Kopš 2026. gada sākuma minimālā mēneša darba alga ir 780 eiro. Tā ir arī pašnodarbinātā obligāto iemaksu minimālais objekts. Summu izmanto minimālās algas un pašnodarbinātā kalkulatori.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["lv.minimala-alga", "lv.pasnodarbinata-nodokli", "lv.darba-deveja-izmaksas"],
    fuente: { organismo: "Valsts ieņēmumu dienests", titulo: "Valsts sociālās apdrošināšanas obligātās iemaksas jaunuzņēmumiem (18.12.2025.)", url: "https://www.vid.gov.lv/lv/media/2471/download", tipo: "primaria", verificadoEl: HOY },
  },
  {
    id: "lv.neapliekamais-minimums-2026",
    fecha: HOY,
    titulo: "Neapliekamais minimums 550 eiro",
    texto: "Neapliekamais minimums ir 550 eiro mēnesī (6600 eiro gadā), bet pensijas saņēmējam 1000 eiro mēnesī. Jaunās summas izmanto algas, IIN un neapliekamā minimuma kalkulatori.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["lv.algas-kalkulators", "lv.iin-kalkulators", "lv.neapliekamais-minimums"],
    fuente: { organismo: "Valsts ieņēmumu dienests", titulo: "Gada neapliekamais minimums", url: "https://www.vid.gov.lv/lv/neapliekamais-minimums", tipo: "primaria", verificadoEl: HOY },
  },
  {
    id: "lv.pvn-mazajiem-2025",
    fecha: HOY,
    titulo: "Īpašā PVN reģistrācijas kārtība mazajiem uzņēmumiem",
    texto: "No 2025. gada 1. jūlija mazie uzņēmumi ar apgrozījumu līdz 50 000 eiro var izmantot īpašu PVN reģistrācijas kārtību. Tas attiecas arī uz mikrouzņēmumu nodokļa maksātājiem.",
    vigenteDesde: "2025-07-01",
    calculadoras: ["lv.pvn-kalkulators", "lv.mikrouznemuma-nodoklis"],
    fuente: { organismo: "Valsts ieņēmumu dienests", titulo: "Īpašā PVN reģistrācijas kārtība mazajiem uzņēmumiem", url: "https://www.vid.gov.lv/lv/ipasa-pvn-registracijas-kartiba-mazajiem-uznemumiem", tipo: "primaria", verificadoEl: HOY },
  },
];
