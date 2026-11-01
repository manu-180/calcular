import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "sk.priplatky-za-pracu",
  mercado: "sk",
  concepto: "propio",
  slug: "priplatky-za-pracu",
  estado: "publicado",
  requiere: { "sk.priplatky": "mapa", "sk.minimalna-mzda-hodinova": "numero" },
  campos: [
    { id: "sobota", tipo: "numero", etiqueta: "Hodiny v sobotu", min: 0, porDefecto: 8 },
    { id: "nedela", tipo: "numero", etiqueta: "Hodiny v nedeľu", min: 0, porDefecto: 0 },
    { id: "noc", tipo: "numero", etiqueta: "Hodiny v noci", min: 0, porDefecto: 0 },
    { id: "riziko", tipo: "si-no", etiqueta: "Riziková práca", porDefecto: false },
    { id: "sviatok", tipo: "numero", etiqueta: "Hodiny vo sviatok", min: 0, porDefecto: 0 },
    { id: "priemerny", tipo: "moneda", etiqueta: "Priemerný hodinový zárobok (na sviatok)", min: 0, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    const p = v["sk.priplatky"];
    const mm = v["sk.minimalna-mzda-hodinova"];
    const zaSobotu = redondear((e.sobota * mm * p.sobota) / 100);
    const zaNedelu = redondear((e.nedela * mm * p.nedela) / 100);
    const zaNoc = redondear((e.noc * mm * (e.riziko ? p["noc-riziko"] : p.noc)) / 100);
    const zaSviatok = redondear((e.sviatok * e.priemerny * p.sviatok) / 100);
    return { spolu: redondear(zaSobotu + zaNedelu + zaNoc + zaSviatok), zaSobotu, zaNedelu, zaNoc, zaSviatok };
  },
  resultado: [
    { clave: "spolu", etiqueta: "Príplatky spolu", formato: "moneda", destacada: true },
    { clave: "zaSobotu", etiqueta: "Za sobotu", formato: "moneda", ocultarSiCero: true },
    { clave: "zaNedelu", etiqueta: "Za nedeľu", formato: "moneda", ocultarSiCero: true },
    { clave: "zaNoc", etiqueta: "Za noc", formato: "moneda", ocultarSiCero: true },
    { clave: "zaSviatok", etiqueta: "Za sviatok", formato: "moneda", ocultarSiCero: true },
  ],
});
