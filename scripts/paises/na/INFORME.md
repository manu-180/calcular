# Namibia (`na`): informe

Rama `claude/pais-na` (base origin/main). Mercado en `interno`, `en-NA`, NAD con símbolo `N$`, escala 18.
**No se pudo pushear**: `git push` da 403 («Permission to manu-180/calcular.git denied to developers-insights»).
Los commits están solo en el worktree local `C:/MisProyectos/Armagedon/calcular-pais-na`.

## Calculadoras: 19 locales + 41 universales = 60

Todas publicables (datos verificados hoy y casos que dan).

| Slug | Concepto | Publicable | Por qué |
|---|---|---|---|
| paye-calculator | impuesto-renta | sí | Tramos de la Income Tax Amendment Act 2024. 3 casos oficiales de la calculadora de NamRA |
| net-salary-calculator | sueldo-neto | sí | PAYE + SSC 0,9 % con techo y piso + pensión deducible. Declara `mundo` y entra en la grilla |
| social-security-calculator | aportes-seguridad-social | sí | Regs. SSC 1995 (0,9 % + 0,9 %), techos GN 275/2024 y GN 236/2026 |
| employer-cost-calculator | costo-empleador | sí | SSC del empleador + VET levy 1 % (NTA). Sin ECF: su tasa no está publicada |
| minimum-wage | salario-minimo | sí | Wage Order GN 218/2024 + GN 6/2025, por categoría y con tramos 2025, 2026 y 2027 |
| overtime-calculator | horas-extra | sí | Labour Act s.16, 17, 19 y factor 4,333 (s.10) |
| public-holiday-pay-calculator | propio | sí | Labour Act s.21 y s.22 |
| annual-leave-calculator | vacaciones | sí | s.23 (4 semanas) y s.37 (proporcional) |
| sick-leave-calculator | propio | sí | s.24 y ciclo de 36 meses (s.1) |
| maternity-leave-calculator | propio | sí | s.26 (12 semanas) + GN 305/2026 (100 %, tope N$20.000 desde 1/10/2026) |
| severance-pay-calculator | indemnizacion-despido | sí | s.35 |
| notice-period-calculator | preaviso | sí | s.30 |
| final-pay-calculator | liquidacion-final | sí | s.37 (días adeudados, vacaciones, indemnización y preaviso) |
| transfer-duty-calculator | propio | sí | Transfer Duty y Stamp Duties Amendment Acts 2024 (vigentes desde 1/10/2024) |
| pension-tax-deduction-calculator | propio | sí | Tope N$150.000 (folleto y calculadora de NamRA) |
| corporate-tax-calculator | propio | sí | 30 % desde los ejercicios iniciados el 1/1/2025 (Act 4/2024) |
| withholding-tax-calculator | propio | sí | Página de impuestos de NamRA (ITAS) |
| vet-levy-calculator | propio | sí | NTA: 1 % sobre una nómina anual ≥ N$1 millón |
| usd-to-nad | tipo-de-cambio | sí | Serie diaria del Bank of Namibia |

Universales: entran todas (`todas: true`) y el IVA va con ajuste a `na.vat` (15 %). No se excluyó ninguna.

## Datos

30 datos y 36 tramos, todos verificados el 2026-10-27. No hay ninguno sin verificar.
- **Leyes y normas (Government Gazette)**: los PDFs escaneados de la gaceta salen del archivo de gazettes.africa (Laws.Africa), con el mismo criterio que ULII en Uganda. NamibLII y mol.gov.na bloquean (Cloudflare o 468). Fuentes: Labour Act 2007 (Gazette 3971), Wage Order, regulaciones SSC 1995, 2024 y 2026, Income Tax, VAT, Transfer Duty y Stamp Duties Amendment Acts 2024. Para descartar reformas posteriores revisé los índices de las 748 gacetas de 2024 a 2026: no hay otra reforma del Income Tax Act después de la de 2024.
- **NamRA**: folleto de personas (tope de deducciones), página de impuestos de ITAS (IVA 15 %, retenciones), folleto de sellos y transferencias (12 % para quien no es persona física).
- **NTA**: VET levy. **Bank of Namibia**: `services.bon.com.na/ratestable/api/rates` (un punto por día; la serie arranca el 27/10 con 16,6406).
- Sin IPC: la NSA solo tiene un Excel de agosto de 2025 y su portal de inflación no responde. Por eso no hay calculadora de inflación.

## Detectores (`scripts/paises/na/probar_detectores.ts`, corrido de verdad)

| id | Resultado |
|---|---|
| na.usd-bon (serie) | `[{2026-10-27, 16.6406}]` |
| na.ssc-portal (norma: tasas, techo y piso de la SSC, leídos del `__NUXT_DATA__` del portal) | `[]` (sin cambios) |
| na.namra-calculator (tramos y tope) | `fetch failed`: itas.namra.org.na da timeouts de conexión intermitentes desde Node; con curl y en reintentos responde 200 |
| na.namra-taxes (IVA y retenciones) | igual que el anterior |
| na.nta-vet-levy (necesita `userAgentNavegador`) | `[]` |
| na.gazette-labour (manual: normas laborales y de transferencias) | `null` a propósito; los avisa `proximaRevision` |

## Checks

- `tsc --noEmit`: sin errores
- `check_paises na`: ✅ 30 datos, 36 tramos verificados, 60 calculadoras. 1 aviso esperable: `usd-to-nad` necesita que el cron cargue la serie antes del 26/11
- `check_paises_casos na`: 66 casos en 19 archivos OK
- `check_textos_paises na`: 814 textos, 0 avisos
- `check_fronteras`: OK, 12.927 archivos · `check_eol`: OK, 14.173 archivos · `check_motor` (con `na` registrado localmente): 4.268 pruebas OK
- `check_mundo`: TODO OK; NA no figura entre los excluidos
- `next dev`: Turbopack no arranca con el junction de `node_modules` ("Symlink ... points out of the filesystem root"). Con `next dev --webpack` y `NEXT_PUBLIC_SITIO_INTL_URL=http://calcularya.localhost:3113`, `/na`, `/na/net-salary-calculator`, `/na/paye-calculator`, `/na/transfer-duty-calculator` y `/na/mortgage` dan 200. Los montos salen con N$ porque agregué `simbolos: { NAD: "N$" }`: Intl formatea NAD como «$» en en-NA

## Riesgos y dudas para el coordinador

1. **Push bloqueado (403)**: hay que pushear la rama con otra credencial.
2. **Fuente de las gacetas**: archive.gazettes.africa no es un sitio del gobierno. Es el escaneo de la gaceta oficial, el mismo criterio que ya se aceptó con ULII. Si no se acepta, casi todo lo laboral queda sin fuente alternativa accesible.
3. **Techo de la SSC de N$12.500**: la GN 236/2026 lo pone desde el 1/3/2026 (retroactivo, publicada el 15/7) y el portal de la SSC lo aplica desde el 1/9/2026. Usé la fecha de la norma. A la fecha de hoy da lo mismo.
4. **Tramos del impuesto**: según la prensa (fuente secundaria) se presentó en 2026 un proyecto de Income Tax Amendment Bill. No está sancionado ni publicado. Si sale, hay que cargar tramos nuevos (`proximaRevision` 2027-03-01).
5. **Tasa de 12 % para empresas en transfer duty**: sale del folleto de NamRA de julio de 2024, cuya tabla para personas ya quedó vieja. La reforma de 2024 solo cambió el párrafo de personas físicas, así que el 12 % sigue vigente.
6. **Licencia por maternidad**: el total de 12 semanas se calcula como mensual / 4,333 × 12 (conversión del Labour Act). La SSC podría liquidarlo de otra forma.
7. **Simplificaciones**: el valor hora usa como máximo 45 horas semanales (los vigilantes pueden tener 60). No se cubren el transfer duty de tierras agrícolas, la exención de un tercio del housing allowance ni el fringe benefit del auto.
