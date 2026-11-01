# Madagascar (`mg`): informe del agente

- Rama: `claude/pais-mg`. Mercado `mg`, francés (`fr-MG`), MGA, `estado: "interno"`. `src/paises/index.ts` no se commitea.
- Total: 56 calculadoras = 16 locales + 40 universales.

## Locales (16)

15 publicables y 1 en borrador (`calcul-salaire-net`: depende de las cotizaciones CNaPS y sanitaria, no verificadas).
Publicables: calcul-irsa, calcul-tva, convertisseur-ariary-euro, impot-synthetique, calcul-impot-sur-les-revenus,
calcul-ircm, impot-plus-value-immobiliere, droits-de-mutation-immobiliere, droit-enregistrement-bail,
droits-enregistrement-cession, droits-de-donation, avantages-en-nature, impot-foncier-propriete-batie,
taxe-sur-les-assurances, taxe-vehicules-a-moteur. Base: Code des impôts mis à jour LFI 2026 (impots.mg, DGI).

## Datos

35 verificados (DGI, Code des impôts LFI 2026, leídos el 2026-10-27), 2 no verificados:
- `mg.cotisation-cnaps-salarie` (1 %): el arrêté n.º 5410/99 no está en línea en fuente oficial.
- `mg.cotisation-sante-salarie` (1 %): el décret n.º 2003-1162 no está en línea y el sitio de OSTIE no responde.

## Pendientes

- Cotizaciones del empleador (CNaPS, OSTIE) y salario mínimo: sin fuente oficial accesible; no se incluyeron.
- El conversor deja de ser publicable si la serie del Banque centrale no se actualiza (aviso a 2026-11-28).
- Avisos de SEO restantes: intros sin número y 207 a 213 palabras en tres fichas.
