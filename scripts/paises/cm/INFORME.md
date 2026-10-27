# Camerún (`cm`, fr-CM) y edición `cm-en` (en-CM)

Rama `claude/pais-cm`. Último commit de código: `8cffc7b2` (este informe va en el commit siguiente).
Mercados en `estado: "interno"`. `src/paises/index.ts` no se commiteó.

## Calculadoras locales (cm)

| Slug | Concepto | Publicable | Por qué |
|---|---|---|---|
| calcul-salaire-net | sueldo-neto | sí | CGI 2026 (IRPP, CAC, CFC, RAV, TDL) y decreto CNPS 2016/072 reproducido en el CGI. Declara `mundo` |
| calcul-irpp | impuesto-renta | sí | CGI arts. 29, 34, 69, 71, 81. Caso oficial: barème DGI, fila 500 000 F |
| cotisations-cnps | aportes-seguridad-social | sí | Decreto 2016/072 (anexo del CGI 2026) |
| cout-employeur | costo-empleador | sí | CNPS + CFC 1,5 % + FNE 1 % (ley 77/10 modificada, anexo del CGI) |
| calcul-tva | iva | sí | Art. 142 + CAC. Caso oficial: ejemplo del CGI (19,25 %). Reemplaza la universal `calcul-tva` |
| smig | salario-minimo | sí | Decretos 2023/00338/PM y 2024/0168/PM (spm.gov.cm) |
| salaire-net-en-brut | propio | sí | Inversa del neto (búsqueda por tramos CRTV/TDL + dicotomía) |
| redevance-audiovisuelle | propio | sí | Anexo CGI, ley RAV art. 3 (5) |
| taxe-developpement-local | propio | sí | Ley 2024/020 de fiscalidad local, art. C 86 |
| impot-general-synthetique | regimen-simplificado | sí | Arts. C 39 y C 40, art. 93 quater |
| impot-sur-les-societes | propio | sí | Arts. 17, 17 bis, 21-23 (mínimo de percepción 2 %) |
| impot-revenus-capitaux-mobiliers | propio | sí | Arts. 70 y 71 |
| taxe-fonciere | propio | sí | Art. C 53 (ver dudas) |
| avantages-en-nature | propio | sí | Art. 33 |
| calcul-patente | propio | sí | Arts. C 12 y C 13 |
| vignette-automobile | propio | sí | Arts. 597, 598, 598 ter, 598 quinquies |
| droits-de-mutation | propio | sí | Art. C 57 |
| convertisseur-euro-fcfa | tipo-de-cambio | sí | Paridad 655,957 leída en beac.int |
| conges-payes | vacaciones | **no (borrador)** | Código del Trabajo (ley 92/007) solo en copias de Droit-Afrique (FAO/OIT); ningún sitio oficial camerunés lo publica |

18 publicables + 1 borrador. Universales: las 41 en francés entran salvo `calcul-tva` (la reemplaza la local): **40**. Total cm: 59 (58 publicables).

**cm-en**: 10 traducciones (net-salary-calculator, irpp-calculator, cnps-contributions, employer-cost-calculator, vat-calculator, minimum-wage, net-to-gross-salary, global-synthetic-tax, euro-to-cfa-franc, vehicle-stamp-duty) + 40 universales en inglés = 50. Avisos y nombres de datos traducidos.

## Datos

33 datos. **31 verificados** el 2026-10-26 en fuente primaria https:
- CGI edición oficial 2026 (impots.cm, PDF de la DGI): baremo IRPP, gastos profesionales 30 % con tope 4 800 000, abatimiento 500 000, umbral 62 000, CAC 10 %, CNPS (4,2/4,2, PF 7/5,65/3,7, AT 1,75/2,5/5, tope 750 000), CFC 1/1,5, FNE 1, RAV, TDL, TVA 17,5/10, IS 30/25 y umbral 3 000 M, mínimo 2 %, IGS (tarifa, 50 % CGA, umbrales 50/30 M), ventajas en especie, RCM 15/10/30, taxe foncière, patente (tasa/piso/techo), timbre automóvil, derechos de mutación.
- SMIG: decretos en spm.gov.cm (60 000 / 45 000 / 41 875 → 43 969 desde 2024-02-23).
- Paridad euro: beac.int.

**2 no verificados** (→ conges-payes en borrador): `cm.conges-jours-par-mois`, `cm.conges-majorations`. Motivo: arts. 89-90 del Código del Trabajo leídos solo en copia de Droit-Afrique (faolex.fao.org); mintss.gov.cm y cnps.cm no respondieron.

## Detectores (`src/paises/cm/fuentes.ts`)

- `cm.dgi-code-general-des-impots` (norma, 29 datos fiscales): página «Textes» de la DGI, busca `CODE GENERAL DES IMPOTS <año>` posterior a 2026.
- `cm.spm-smig` (norma, `cm.smig`): búsqueda «SMIG» de spm.gov.cm, avisa de decretos que no sean 2014/2217, 2023/00338 ni 2024/0168.

Prueba real (`scripts/paises/cm/probar_detectores.ts`): ambos devuelven `[]` (forma OK, nada nuevo). Sensibilidad (`probar_detectores_sensibilidad.ts`): la DGI lista la edición 2026 (se detectaría con último conocido 2025) y el SPM lista los 3 decretos SMIG.

No hay series: la BEAC no publica en su portada un cambio USD diario fácil de leer (no se hizo conversor dólar).

## Checks (con cm y cm-en registrados localmente)

- `tsc --noEmit`: OK
- `check_paises cm`: OK, 33 datos, 59 calculadoras. `cm-en`: OK, 50 calculadoras
- `check_paises_casos cm`: 68 casos en 18 archivos OK. `cm-en`: 40 casos OK
- `check_textos_paises cm`: 752 textos, 0 avisos. `cm-en`: 344 textos, 0 avisos
- `check_fronteras`: 12 056 archivos OK. `check_eol`: OK
- `check_motor`: 3980 pruebas OK
- `check_mundo`: TODO OK. Con cm en `publicado` (solo para probar) Camerún entra: tasas 12,7 % / 20,5 % / 31,2 % (15k/50k/150k), 12 pagas. Interno no entra a la grilla (filtro de producción)
- `next dev` (puerto 3101, `--webpack` porque turbopack rechaza el junction de node_modules, con `NEXT_PUBLIC_SITIO_INTL_URL`): `/cm`, `/cm/calcul-salaire-net`, `/cm/calcul-imc` y `/cm-en/net-salary-calculator` responden 200 con el neto esperado (423 550)

## Riesgos y dudas para el coordinador

1. **SMIG**: el decreto 2024/0168 abroga «toutes les dispositions antérieures contraires, notamment le décret 2023/00338» pero solo fija el monto de los agentes del Estado. Tomé 60 000 y 45 000 del decreto 2023 como vigentes (lectura habitual) y lo explico en un aviso `info`.
2. **IRPP**: el «barème indicatif» de la DGI (PDF de 70 páginas) coincide con mi cálculo en 500 000 F, pero en sueldos altos parece no aplicar el tope CNPS (750 000) ni el de gastos profesionales (4 800 000). Seguí la ley (CGI 2026, arts. 34 y decreto CNPS); para 1 500 000 F el IRPP mensual da 284 392 en vez de ~255 900 de la tabla.
3. **Taxe foncière** sobre 500 M: el art. C 53 dice «barème progressif» sin decir si es marginal; lo apliqué por tramos y la calculadora lo advierte.
4. **Patente**: la categoría (grande/moyenne/petite) la elige el usuario; el CGI no define los umbrales en el artículo de tarifas.
5. **Labor**: sin fuente oficial del Código del Trabajo no hay preaviso, despido, horas extra ni vacaciones publicables. Si aparece un PDF oficial (MINTSS, Journal officiel), `conges-payes` pasa a publicado verificando los dos datos.
6. Fechas `desde` de los datos del CGI: 2026-01-01 (edición leída), no la fecha original de cada norma.
