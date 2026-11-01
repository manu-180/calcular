# Informe del país Letonia (lv)

Rama `claude/pais-lv`. **Depende de `claude/mundo-motor-lv`** (sin mergear): sin ella no existe el idioma `lv`.
Estado del mercado: `interno`. No se tocó `src/paises/index.ts` en ningún commit. Registro: ADR 0002, D35.

## Calculadoras: 21 locales (20 publicables, 1 borrador) + 40 universales

| slug | concepto | publicable | fuente o por qué no |
|---|---|---|---|
| algas-kalkulators | sueldo-neto | sí | VID: caso oficial 1750 bruto = 1307,11 neto |
| neto-bruto-kalkulators | propio | sí | VID, el mismo caso al revés |
| darba-deveja-izmaksas | costo-empleador | sí | VID, tabla VSAOI |
| minimala-alga | salario-minimo | sí | VID, MK noteikumi Nr. 656; contraste Eurostat |
| iin-kalkulators | impuesto-renta | sí | VID, tasas y umbrales |
| neapliekamais-minimums | propio | sí | VID |
| vsaoi-kalkulators | aportes-seguridad-social | sí | VID, tabla actualizada 02.09.2026 |
| pasnodarbinata-nodokli | retencion-honorarios | sí | VID: casos oficiales 1200 y 500 |
| mikrouznemuma-nodoklis | regimen-simplificado | sí | VID |
| pvn-kalkulators | iva | sí | VID, actualizada 30.09.2026. Reemplaza a la universal |
| nekustama-ipasuma-nodoklis | propio | sí | VID: rango municipal. La persona carga la tasa de su municipio |
| inflacijas-kalkulators | inflacion | sí | CSP, PCI030m (API) |
| videja-alga | propio | sí | CSP, DSV010m (API) |
| atvalinajuma-naudas-aprekins | vacaciones | sí | VDI (149. pants y fórmula), extracto LM (75. pants) |
| slimibas-naudas-aprekins | propio | sí | VSAA |
| maternitates-pabalsts | propio | sí | VSAA |
| vecaku-pabalsts | propio | sí | VSAA |
| bezdarbnieka-pabalsts | propio | sí | VSAA |
| atlaisanas-pabalsts | indemnizacion-despido | sí | LM |
| virsstundu-aprekins | horas-extra | sí | VDI |
| uzteikuma-termins | preaviso | **no** | ver abajo |

Universales: `"todas"`, 40 de 41 (la `iva` la reemplaza `pvn-kalkulators`, mismo slug y concepto).

Faltaron del encargo, por decisión: pašnodarbinātais y mikrouzņēmums entraron, pero `tipo-de-cambio` no se hizo (no
estaba pedido, Letonia usa euro y bank.lv no conectó).

## Datos: 35 tramos verificados, 1 no verificado

No verificado: `lv.uzteikums` (10 días e inmediato). Solo se leyó el art. 103 en la publicación original de 2001 en
vestnesis.lv; LM confirma el mes (punto 3), no los otros dos. Hace falta la redacción vigente en likumi.lv. Al leerla:
pasar el tramo a verificado, `estado: "publicado"`, sumar `.casos.ts`, FAQ y ejemplo.

## Red: qué conectó (1/11/2026)

- **Sin bloqueo:** `data.stat.gov.lv`, `ec.europa.eu`, `vestnesis.lv`.
- **Por tramos:** `vid.gov.lv`, `vsaa.gov.lv`, `lm.gov.lv`, `vdi.gov.lv` cortaban con ECONNRESET y un rato después
  respondían. Se reintentó sin cambiar nada: sin User-Agent de navegador, sin cabeceras, sin espejos ni archivos web.
- **Caído todo el día:** `likumi.lv` y `m.likumi.lv` (ECONNREFUSED), `bank.lv` (timeout).
- Los extractos de buscador no se usaron para verificar nada. Se usaron solo para encontrar URLs.

Los extractos de ley vienen de fuentes de organismos: LM y VDI citan el artículo pero no son el texto consolidado.
Las fechas de esas páginas son antiguas (LM 2020, extracto LM al 05.01.2021, VDI 2023). Coinciden con el texto de 2001
y no hay rastro de reforma, pero **conviene contrastarlas con likumi.lv** en cuanto conecte. VDI publicó en 2017 un
proyecto para bajar la prima de horas extra al 50 % en las dos primeras: la página VDI de 2023 sigue dando 100 %.

## Decisiones

1. **Solidaritātes nodoklis:** la tasa no está en una tabla legible, pero el material de VID (18.12.2025) la aplica en
   ejemplos de 2026: 10,5 % y 23,59 %, iguales a VSAOI. Por eso el neto descuenta 10,5 % sobre todo el bruto, sin tope.
2. **33 % y 3 % adicional:** la nómina retiene 25,5 % (VID). El excedente anual se muestra aparte como media mensual
   («IIN piemaksa»). El 3 % sobre 200 000 se modela como fila del 36 % de la escala sobre el ingreso gravable; VID lo
   define sobre el ingreso total del año, así que por encima de 200 000 el resultado es una aproximación.
3. **Deducción del solidario en la base del IIN:** no se leyó. Se aplica igual que VSAOI. Afecta solo a sueldos sobre
   105 300 al año.
4. **Pensionista que trabaja** (reparto 500 y 500) va en FAQ, no en el cálculo.
5. **Vecāku pabalsts:** la cuenta mensual sale de alga × tasa. VSAA calcula por salario diario y días, así que es una
   estimación. El total resta 4 meses no transferibles como un tramo; la deducción de maternidad de la parte básica se
   avisa en el texto y no se descuenta.
6. **NĪN:** la tasa la fija cada municipio, sin tabla nacional: es un campo de la persona, validado entre 0,2 y 3.
7. Claves de datos sin `menesi` (`m13`, `videja-izpelna-periods`): `reglasLv` las toma por letón sin diacríticos.
8. `lv.videja-alga` lleva `maxAntiguedadDias: 200`: CSP publica con unos tres meses de atraso.

## Detectores (`scripts/paises/lv/probar_detectores.ts`, corrido contra la red)

- `lv.pci-csp`: 13 puntos, último 2026-09 = 29751. POST PxWeb.
- `lv.videja-alga-csp`: 13 puntos, último 2026-06 = 1946. POST PxWeb.
- `lv.minimala-alga-eurostat`: 0 hallazgos (780 en 2026). Es de norma, abre PR si cambia.

## Checks con el país registrado localmente

tsc sin errores · `check_paises lv` OK (36 datos, 2 series, 61 calculadoras) · `check_paises_casos lv` 60 casos en 20
archivos · `check_textos_paises lv` 803 textos, 0 avisos · `check_seo_pais lv` 0 avisos · `check_ofertas_intl lv` OK ·
`check_motor` 5102 pruebas (corrido antes de pasar los 7 últimos a publicado) · `check_calendario` OK · `check_fronteras`
y `check_eol` OK. `check_mundo` falla solo por `be` (ajeno, ya anotado en ESTADO).

## Riesgos y pendientes

- **Sin revisión de hablante nativo.** Todo el letón es propio; D35 también lo marca pendiente en el motor.
- **`next dev` no se miró:** Turbopack exige `npm ci` real, se saltó por costo. Falta ver home y dos calculadoras.
- **`mundo`:** declarado en `algas-kalkulators`, pero `check_mundo` no incluye mercados `interno`. Validar al publicar.
- **Reforma del 3/11/2026:** el cuidado infantil de 2 años cambia para los nacidos después del 2/11 (guía CE y VSAA). No
  afecta a estas calculadoras, porque `bērna kopšanas pabalsts` no está. Revisar el vecāku pabalsts cuando VSAA actualice.
- `inflacijas-kalkulators` deja de ser publicable si la serie no se actualiza antes del 1/12: lo resuelve el cron.
- Las páginas de VSAA leídas son las inglesas (la propia página avisa de traducción automática): contrastar con las letonas.
