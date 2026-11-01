"""Escribe las calculadoras en borrador de lv (definición y contenido). Corrió una vez el 1/11/2026.

Se dejan en un solo lugar porque comparten forma; al verificar un dato, cada archivo se edita a mano.
Uso: python scripts/paises/lv/generar_borradores.py
"""
import os

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "src", "paises", "lv")

MONEDA = '{ id: "%s", tipo: "moneda", etiqueta: "%s", min: 0, porDefecto: %s }'

B = {
    "atvalinajuma-naudas-aprekins": dict(
        concepto="vacaciones",
        requiere={"lv.atvalinajums-nedelas": "numero", "lv.videja-izpelna-menesi": "numero"},
        imports="ErrorEntrada",
        campos=[
            MONEDA % ("samaksa", "Darba samaksa pēdējos sešos mēnešos kopā", 10500),
            '{ id: "dienasPeriode", tipo: "entero", etiqueta: "Kalendāra dienas šajos mēnešos", min: 1, max: 190, porDefecto: 181 }',
            '{ id: "dienas", tipo: "entero", etiqueta: "Atvaļinājuma kalendāra dienas", min: 1, max: 60, porDefecto: 28 }',
        ],
        calc="""if (e.samaksa <= 0) throw new ErrorEntrada("Ievadiet darba samaksu, kas lielāka par nulli.", "samaksa");
    const dienas = v["lv.atvalinajums-nedelas"] * 7;
    const videjaDiena = e.samaksa / e.dienasPeriode;
    return { nauda: redondear(videjaDiena * e.dienas), videjaDiena: redondear(videjaDiena), obligatasDienas: dienas };""",
        rez=[("nauda", "Atvaļinājuma nauda (bruto)", "moneda", True), ("videjaDiena", "Vidējā izpeļņa dienā", "moneda", False), ("obligatasDienas", "Likumā noteiktais minimums", "dias", False)],
        h1="Atvaļinājuma naudas aprēķins {{anio}}",
        title="Atvaļinājuma naudas aprēķins {{anio}}: kalkulators",
        desc="Aprēķiniet atvaļinājuma naudu no pēdējo mēnešu vidējās izpeļņas un kalendāra dienām. Rezultāts bruto, pirms nodokļiem.",
        intro="Atvaļinājuma naudu rēķina no vidējās izpeļņas pēdējos mēnešos. Kalkulators dala samaksu ar dienām periodā un reizina ar atvaļinājuma dienām.",
        como="Saskaitiet darba samaksu par periodu, daliet ar kalendāra dienām periodā un reiziniet ar atvaļinājuma dienām.",
    ),
    "slimibas-naudas-aprekins": dict(
        concepto="propio",
        requiere={"lv.slimibas-nauda-2-3": "numero", "lv.slimibas-nauda-4-9": "numero", "lv.slimibas-pabalsts": "numero"},
        imports="ErrorEntrada, porcentaje",
        campos=[
            MONEDA % ("videjaDiena", "Vidējā izpeļņa dienā", 80),
            '{ id: "dienas", tipo: "entero", etiqueta: "Slimības dienas pēc kārtas", min: 1, max: 364, porDefecto: 9 }',
        ],
        calc="""if (e.videjaDiena <= 0) throw new ErrorEntrada("Ievadiet vidējo izpeļņu, kas lielāka par nulli.", "videjaDiena");
    const d23 = Math.max(0, Math.min(e.dienas, 3) - 1);
    const d49 = Math.max(0, Math.min(e.dienas, 9) - 3);
    const d10 = Math.max(0, e.dienas - 9);
    const devejs = redondear(porcentaje(e.videjaDiena * d23, v["lv.slimibas-nauda-2-3"]) + porcentaje(e.videjaDiena * d49, v["lv.slimibas-nauda-4-9"]));
    const vsaa = redondear(porcentaje(e.videjaDiena * d10, v["lv.slimibas-pabalsts"]));
    return { kopa: redondear(devejs + vsaa), devejs, vsaa };""",
        rez=[("kopa", "Kopā par slimības periodu (bruto)", "moneda", True), ("devejs", "Slimības nauda no darba devēja", "moneda", False), ("vsaa", "Slimības pabalsts no VSAA", "moneda", False)],
        h1="Slimības naudas aprēķins {{anio}}",
        title="Slimības naudas aprēķins {{anio}}: kalkulators",
        desc="Aprēķiniet slimības naudu no darba devēja un slimības pabalstu no VSAA pēc vidējās izpeļņas un slimības dienām.",
        intro="Slimības lapas pirmajās dienās maksā darba devējs, vēlāk VSAA. Kalkulators sadala summu pa šiem periodiem.",
        como="Ievadiet vidējo izpeļņu dienā un slimības dienu skaitu. Kalkulators piemēro likmes katram periodam atsevišķi.",
    ),
    "maternitates-pabalsts": dict(
        concepto="propio",
        requiere={"lv.maternitates-pabalsts": "numero"},
        imports="ErrorEntrada, porcentaje",
        campos=[
            MONEDA % ("alga", "Vidējā apdrošināšanas iemaksu alga mēnesī", 1500),
            '{ id: "dienas", tipo: "entero", etiqueta: "Pabalsta kalendāra dienas", min: 1, max: 140, porDefecto: 112 }',
        ],
        calc="""if (e.alga <= 0) throw new ErrorEntrada("Ievadiet algu, kas lielāka par nulli.", "alga");
    const diena = (e.alga * 12) / 365;
    return { pabalsts: redondear(porcentaje(diena * e.dienas, v["lv.maternitates-pabalsts"])) };""",
        rez=[("pabalsts", "Maternitātes pabalsts par periodu", "moneda", True)],
        h1="Maternitātes pabalsts {{anio}}: aprēķins",
        title="Maternitātes pabalsts {{anio}}: kalkulators",
        desc="Aprēķiniet maternitātes pabalstu no vidējās apdrošināšanas iemaksu algas un kalendāra dienām.",
        intro="Maternitātes pabalstu aprēķina no vidējās apdrošināšanas iemaksu algas. Kalkulators parāda aptuveno summu par izvēlēto dienu skaitu.",
        como="Ievadiet vidējo iemaksu algu un dienas. Kalkulators pārrēķina algu dienā un piemēro pabalsta likmi.",
    ),
    "vecaku-pabalsts": dict(
        concepto="propio",
        requiere={"lv.vecaku-pabalsts": "mapa", "lv.vecaku-pabalsts-stradajot": "numero"},
        imports="enMapa, ErrorEntrada, porcentaje",
        campos=[
            MONEDA % ("alga", "Vidējā apdrošināšanas iemaksu alga mēnesī", 1500),
            '{ id: "variants", tipo: "opcion-dato", dato: "lv.vecaku-pabalsts", etiqueta: "Pabalsta periods", porDefecto: "13-menesi" }',
            '{ id: "stradajat", tipo: "si-no", etiqueta: "Strādājat bērna kopšanas laikā", porDefecto: false }',
        ],
        calc="""if (e.alga <= 0) throw new ErrorEntrada("Ievadiet algu, kas lielāka par nulli.", "alga");
    const pilns = porcentaje(e.alga, enMapa(v["lv.vecaku-pabalsts"], e.variants));
    return { pabalsts: redondear(e.stradajat ? porcentaje(pilns, v["lv.vecaku-pabalsts-stradajot"]) : pilns) };""",
        rez=[("pabalsts", "Vecāku pabalsts mēnesī", "moneda", True)],
        h1="Vecāku pabalsts {{anio}}: aprēķins",
        title="Vecāku pabalsts {{anio}}: 13 vai 19 mēneši",
        desc="Salīdziniet vecāku pabalstu par 13 vai 19 mēnešiem pēc vidējās apdrošināšanas iemaksu algas.",
        intro="Vecāku pabalstu var saņemt īsāku vai garāku periodu, un summa mēnesī no tā ir atkarīga. Kalkulators parāda abus variantus.",
        como="Ievadiet vidējo iemaksu algu, izvēlieties periodu un norādiet, vai strādājat. Rezultāts ir summa mēnesī.",
    ),
    "bezdarbnieka-pabalsts": dict(
        concepto="propio",
        requiere={"lv.bezdarbnieka-stazs": "mapa", "lv.bezdarbnieka-posmi": "mapa"},
        imports="enMapa, ErrorEntrada, porcentaje",
        campos=[
            MONEDA % ("alga", "Vidējā apdrošināšanas iemaksu alga mēnesī", 1500),
            '{ id: "stazs", tipo: "opcion-dato", dato: "lv.bezdarbnieka-stazs", etiqueta: "Apdrošināšanas stāžs", porDefecto: "1-9" }',
        ],
        calc="""if (e.alga <= 0) throw new ErrorEntrada("Ievadiet algu, kas lielāka par nulli.", "alga");
    const pamata = porcentaje(e.alga, enMapa(v["lv.bezdarbnieka-stazs"], e.stazs));
    const posms = (k: string) => redondear(porcentaje(pamata, enMapa(v["lv.bezdarbnieka-posmi"], k)));
    return { m12: posms("1-2"), m34: posms("3-4"), m56: posms("5-6"), m78: posms("7-8") };""",
        rez=[("m12", "1. un 2. mēnesī", "moneda", True), ("m34", "3. un 4. mēnesī", "moneda", False), ("m56", "5. un 6. mēnesī", "moneda", False), ("m78", "7. un 8. mēnesī", "moneda", False)],
        h1="Bezdarbnieka pabalsts {{anio}}: aprēķins",
        title="Bezdarbnieka pabalsts {{anio}}: kalkulators pa mēnešiem",
        desc="Aprēķiniet bezdarbnieka pabalstu pēc apdrošināšanas stāža un vidējās iemaksu algas, katram periodam atsevišķi.",
        intro="Bezdarbnieka pabalsts ir atkarīgs no apdrošināšanas stāža un vidējās iemaksu algas, un laika gaitā tas samazinās. Kalkulators parāda summu pa periodiem.",
        como="Ievadiet vidējo iemaksu algu un izvēlieties stāžu. Kalkulators parādīs pabalstu katrā izmaksas posmā.",
    ),
    "atlaisanas-pabalsts": dict(
        concepto="indemnizacion-despido",
        requiere={"lv.atlaisanas-pabalsts": "mapa"},
        imports="enMapa, ErrorEntrada",
        campos=[
            MONEDA % ("izpelna", "Mēneša vidējā izpeļņa", 1500),
            '{ id: "stazs", tipo: "opcion-dato", dato: "lv.atlaisanas-pabalsts", etiqueta: "Nodarbinātības ilgums pie šī darba devēja", porDefecto: "lidz-5" }',
        ],
        calc="""if (e.izpelna <= 0) throw new ErrorEntrada("Ievadiet izpeļņu, kas lielāka par nulli.", "izpelna");
    const menesi = enMapa(v["lv.atlaisanas-pabalsts"], e.stazs);
    return { pabalsts: redondear(e.izpelna * menesi), menesi };""",
        rez=[("pabalsts", "Atlaišanas pabalsts", "moneda", True), ("menesi", "Vidējās izpeļņas apmērs", "meses", False)],
        h1="Atlaišanas pabalsts {{anio}}: aprēķins",
        title="Atlaišanas pabalsts {{anio}}: cik pienākas",
        desc="Aprēķiniet atlaišanas pabalstu pēc mēneša vidējās izpeļņas un nodarbinātības ilguma pie darba devēja.",
        intro="Atlaišanas pabalsta apmērs atkarīgs no tā, cik ilgi strādājat pie viena darba devēja. Kalkulators to aprēķina no vidējās izpeļņas.",
        como="Ievadiet mēneša vidējo izpeļņu un nodarbinātības ilgumu. Rezultāts ir vidējās izpeļņas reizinājums.",
    ),
    "uzteikuma-termins": dict(
        concepto="preaviso",
        requiere={"lv.uzteikums": "mapa"},
        imports="enMapa",
        campos=['{ id: "pamats", tipo: "opcion-dato", dato: "lv.uzteikums", etiqueta: "Uzteikuma pamats", porDefecto: "menesis" }'],
        calc="""return { dienas: enMapa(v["lv.uzteikums"], e.pamats) };""",
        rez=[("dienas", "Uzteikuma termiņš", "dias", True)],
        h1="Uzteikuma termiņš {{anio}}: cik ilgi jāgaida",
        title="Uzteikuma termiņš {{anio}}: darba devējam",
        desc="Noskaidrojiet darba devēja uzteikuma termiņu pēc uzteikuma pamata Darba likumā.",
        intro="Darba devēja uzteikuma termiņš atkarīgs no uzteikuma pamata. Izvēlieties pamatu, un kalkulators parādīs termiņu.",
        como="Izvēlieties Darba likuma pamatu. Rezultāts ir likumā noteiktais termiņš, ja līgumā nav noteikts garāks.",
    ),
    "virsstundu-aprekins": dict(
        concepto="horas-extra",
        requiere={"lv.virsstundu-piemaksa": "numero"},
        imports="ErrorEntrada, porcentaje",
        campos=[
            MONEDA % ("likme", "Stundas algas likme", 10),
            '{ id: "stundas", tipo: "numero", etiqueta: "Virsstundu skaits", min: 0, porDefecto: 8 }',
        ],
        calc="""if (e.likme <= 0) throw new ErrorEntrada("Ievadiet stundas likmi, kas lielāka par nulli.", "likme");
    const pamata = e.likme * e.stundas;
    const piemaksa = porcentaje(pamata, v["lv.virsstundu-piemaksa"]);
    return { kopa: redondear(pamata + piemaksa), pamata: redondear(pamata), piemaksa: redondear(piemaksa) };""",
        rez=[("kopa", "Samaksa par virsstundām", "moneda", True), ("pamata", "Stundas likme", "moneda", False), ("piemaksa", "Piemaksa", "moneda", False)],
        h1="Virsstundu aprēķins {{anio}}: samaksa un piemaksa",
        title="Virsstundu aprēķins {{anio}}: samaksa un piemaksa",
        desc="Aprēķiniet samaksu par virsstundām ar likumā noteikto piemaksu pēc stundas algas likmes un stundu skaita.",
        intro="Par virsstundu darbu pienākas piemaksa virs stundas likmes. Kalkulators saskaita samaksu un piemaksu.",
        como="Ievadiet stundas likmi un virsstundu skaitu. Rezultāts ir samaksa bruto, pirms nodokļiem.",
    ),
}

CAMEL = lambda s: "".join(p.capitalize() if i else p for i, p in enumerate(s.split("-")))

for slug, d in B.items():
    req = ", ".join(f'"{k}": "{t}"' for k, t in d["requiere"].items())
    campos = ",\n    ".join(d["campos"])
    filas = []
    for clave, etiqueta, fmt, dest in d["rez"]:
        filas.append(f'{{ clave: "{clave}", etiqueta: "{etiqueta}", formato: "{fmt}"' + (", destacada: true" if dest else "") + " }")
    filas = ",\n    ".join(filas)
    calc = f"""import {{ definirCalculadora, {d['imports']} }} from "@/motor/calculo";

export default definirCalculadora({{
  id: "lv.{slug}",
  mercado: "lv",
  concepto: "{d['concepto']}",
  slug: "{slug}",
  estado: "borrador",
  requiere: {{ {req} }},
  campos: [
    {campos},
  ],
  calcular(e, v, {{ redondear }}) {{
    {d['calc']}
  }},
  resultado: [
    {filas},
  ],
}});
"""
    if "redondear" not in d["calc"]:
        calc = calc.replace("calcular(e, v, { redondear })", "calcular(e, v)")
    with open(os.path.join(RAIZ, "calculadoras", slug + ".ts"), "w", encoding="utf8", newline="\n") as f:
        f.write(calc)
    cont = f"""import {{ definirContenido }} from "@/motor/calculo";

export default definirContenido({{
  calculadora: "lv.{slug}",
  h1: "{d['h1']}",
  title: "{d['title']}",
  description: "{d['desc']}",
  intro: ["{d['intro']}"],
  comoSeCalcula: ["{d['como']}"],
  faq: [],
  glosario: [],
}});
"""
    with open(os.path.join(RAIZ, "contenido", slug + ".ts"), "w", encoding="utf8", newline="\n") as f:
        f.write(cont)
print(len(B))
