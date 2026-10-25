# País: Mauricio (mu) en inglés, 21 calculadoras locales y 40 universales

Rama `claude/pais-mu`, hecha desde `origin/main` (con `origin/main` mergeado de nuevo el 25/10). No depende de ningún motor sin mergear.

## Qué incluye

- `src/paises/mu/`: mercado `mu` (MU, Mauritius, en, en-MU, trato tu, MUR, Indian/Mauritius, escala 45), 55 datos con 59 tramos, todos verificados en fuentes primarias el 24/10/2026; 4 series (USD, EUR y GBP del BOM, IPC de Statistics Mauritius); 2 avisos; 4 novedades; 9 detectores.
- 21 calculadoras locales, todas publicadas, con casos y contenido SEO propio:
  - salary-calculator (sueldo-neto, PAYE + CSG + NSF, entra a «Tu sueldo en el mundo» con 13 pagas)
  - paye-calculator (propio), income-tax-calculator (impuesto-renta, bandas 2026-27 con la de 35 %)
  - csg-calculator (aportes-seguridad-social), employer-cost-calculator (costo-empleador: CSG, NSF, training levy, PRGF y bono)
  - minimum-wage (salario-minimo, Rs 17.745 desde el 1/1/2026), salary-compensation-calculator (propio, Rs 635 de 2026)
  - end-of-year-bonus-calculator (bono-semestral, 13th month), overtime-calculator (horas-extra)
  - annual-leave-calculator (vacaciones), sick-leave-calculator (propio), maternity-leave-calculator (propio)
  - notice-period-calculator (preaviso), severance-allowance-calculator (indemnizacion-despido), retirement-gratuity-calculator (propio)
  - vat-calculator (iva, 15 %; reemplaza a la universal), registration-duty-calculator (propio: registration duty y land transfer tax, con la reducción de primera vivienda)
  - csg-income-allowance-calculator (propio), pension-age-calculator (jubilacion, reforma de la Finance Act 2026)
  - rupee-exchange-rate (tipo-de-cambio, BOM), inflation-calculator (inflacion, IPC base 2023)
- 40 universales con una línea (`universales: "todas"`; la de IVA se cae sola por la local).
- `scripts/paises/mu/probar_detectores.ts`: prueba los detectores contra la red sin escribir nada.
- Commit `publicar mu`: `estado: "publicado"`, alta al final de `PAISES`, cargadores y medición regenerados.

## Fuentes primarias (leídas el 24/10/2026)

- MRA: Finance Act 2026 (Act 14 of 2026, sancionada el 12/8/2026), carta PAYE 2025-26, guía PAYE de dic. 2025, página NPF/NSF y training levy, VAT Act consolidada, Registration Duty Act y Land (Duties and Taxes) Act consolidadas, Social Contribution and Social Benefits Act 2021 consolidada, Workers' Rights Act 2019 consolidada a la ley 13/2026, National Pensions Act consolidada, GN 7/2026 (additional remuneration), reglamento PRGF.
- Ministry of Labour (labour.govmu.org): GN 8/2026 y GN 8/2025 (salario mínimo), reglamento original de 2017.
- Bank of Mauritius: tipos indicativos consolidados (venta). Statistics Mauritius: IPC mensual abril 2024 a septiembre 2026.

## Checks corridos

(se completan abajo)

## Decisiones

- Fair Share Contribution: la Finance Act 2026 (s. 7(b)) la deja solo para el año 2025-26 en personas, y desde 2026-27 rige la banda de 35 % sobre Rs 12 millones. No hay calculadora de FSC; se explica en las FAQ y en una novedad.
- PAYE mensual: el impuesto anual sobre 13 sueldos (12 meses y el bono) menos las deducciones del EDF, dividido por 13 y redondeado hacia abajo al rupee, como el sistema acumulativo de la MRA.
- Salario mínimo: no se afirma si incluye la compensación salarial (el texto consolidado de la regulación 3(3)(a) no está publicado); la calculadora cubre jornada completa.
- Vacaciones: los 2 días de la s. 45(2) se suman desde los 12 meses. Quien gana más de Rs 600.000 al año recibe el aviso de que las secciones 24, 45 y 46 no lo cubren.
- Preaviso: el pago en lugar del preaviso se estima como 1/30 del sueldo mensual por día, y la calculadora lo dice.
- IPC: la serie arranca en abril de 2024 (base 2023 = 100); Statistics Mauritius dice que no es comparable con la anterior.
- Tipo de cambio: se usa la venta indicativa consolidada del BOM (la que grafica su portada).
- No se hizo la edición mu-fr (queda para después, como pide el encargo).

## Pasos saltados por falta de credenciales

- `git push` y el PR (sin permiso de escritura): la rama queda en el repo local compartido.
- Nada de Supabase, Vercel ni PayPal hizo falta.

## Pendientes y riesgos

- El detector del IPC lee la página HTML trimestral de Statistics Mauritius (los mensuales son PDF): trae dos puntos por trimestre. Los meses del medio hay que cargarlos a mano desde los PDF mensuales; mientras tanto la calculadora de inflación falla para esos meses si alguien los elige.
- Las series de tipo de cambio (10 días) e IPC (70 días) dependen del cron `datos-paises`.
- El cálculo de la edad de pensión sigue el Décimo Anexo de la National Pensions Act; no suma los montos fijos del Duodécimo Anexo (65, 75, 90, 100) ni el ajuste anual por costo de vida, y lo dice.
- Choques esperables con otras ramas en `src/paises/index.ts` y en los cargadores generados al mergear (se regeneran).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
