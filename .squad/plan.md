# Plano de Ação da Squad · Site IBNS (UI/UX Redesign)

## 1. Cabeçalho Corporativo & Governança
- **Projeto**: Site IBNS (`Site-IBNS`)
- **Repositório GitHub**: `ibnsjb/Site-IBNS` (Branch de Trabalho: `dev`)
- **Produção Oficial**: `https://ibnsjb.github.io/Site-IBNS/`
- **Data de Início**: 08/11/2026
- **Classificação Formal**: **Tamanho M (Médio)**
  - *Justificativa*: Reformulação integral de UI/UX de aplicação SPA com 3 abas operacionais (Culto em tempo real, Escala de voluntários, Painel administrativo protegido por senha), drag-and-drop de liturgia, checklist interativo em tempo real, integração com Firebase Realtime / Supabase e Google Sheets, exigindo nova identidade visual, design tokens modernos (Apple HIG + Identidade IBNS), safe-areas mobile, testes automatizados e esteira de segurança.
- **Composição da Squad Alocada**:
  - **Rodrigo (Tech Lead)**: Orquestração, governança, WBS e branch strategy.
  - **Camila (Product & UX/UI)**: Redesenho visual, design system, componentes, microinterações e safe-areas.
  - **Lucas (Frontend)**: Reescrita e componentização SPA, reatividade, estados de UI e drag-and-drop.
  - **Rafael (Backend & Integração)**: Sincronização em tempo real (Firebase / Supabase), parsing de planilhas/JSON.
  - **Otávio (DBA)**: Estrutura de dados litúrgicos, checklist e persistência.
  - **Diego (QA)**: Matriz de testes automatizados e Quality Gate `QA-PASS`.
  - **Murilo (DevSecOps)**: Auditoria de segurança, sanitização XSS, credenciais e `SEC-PASS`.
  - **André (SRE)**: Compatibilidade de build/deploy (GitHub Pages & Vercel) e resiliência offline.

---

## 2. Refinamento Mandatório `/grill-with-docs`
- **Status**: Homologado pelo Usuário em 08/11/2026.
- **Premissas e Decisões Acordadas**:
  - 1. Conta Vercel: Proibido usar a conta pessoal do Kinho (`kinhochmo2`). Usar estritamente a conta e MCP da IBNS vinculada ao GitHub da igreja.
  - 2. Q1 (Arquitetura): Aprovada SPA estática de alta performance (HTML5, Tailwind, Glassmorphism, JS modular) compatível 100% com GitHub Pages e Vercel sem custo de infraestrutura.
  - 3. Q2 (Direção Visual): Aprovadas as diretrizes da equipe Claro Design Studio AI combinadas com as cores oficiais da IBNS (`#0c4786` e `#037fba`) e padrão Apple HIG.
  - 4. Q3 (Persistência): Mantido Firebase Realtime Database na Sprint 1 com fallback offline em LocalStorage, estruturado DDL no DOC-05 para migração futura ao Supabase IBNS.
  - 5. Q4 (Branching): Branch `dev` utilizada para todo o desenvolvimento e testes; promoção para `main` pós-Quality Gate duplo.

---

## 3. WBS (Work Breakdown Structure) & Matriz de Paralelismo

| ID | Sub-tarefa Atômica | Especialista / Assento | Dependência | Status | Execução Paralela |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **ST-01** | Refinamento `/grill-with-docs` e Definição da Stack/Arquitetura | Rodrigo (Tech Lead) | Nenhuma | [✓] Concluído | ST-02 |
| **ST-02** | Design System, Paleta de Cores IBNS & Apple HIG Tokens | Camila (UX/UI) | Nenhuma | [✓] Concluído | ST-01 |
| **ST-03** | Estratégia de Persistência (Firebase vs Supabase) & Contratos | Otávio (DBA) + Rafael (Backend) | ST-01 | [✓] Concluído | ST-04 |
| **ST-04** | Arquitetura SPA Modular (HTML5 Moderno / Tailwind / Vanilla Reativo / Next.js) | Lucas (Frontend) | ST-01, ST-02 | [✓] Concluído | ST-03 |
| **ST-05** | Reformulação Visual da Aba Culto (Run Sheet, Semáforo e Checklist) | Camila (UX/UI) + Lucas (Frontend) | ST-02, ST-04 | [✓] Concluído | ST-06 |
| **ST-06** | Reformulação Visual da Aba Escalas (Cards de Voluntários & Filtros) | Camila (UX/UI) + Lucas (Frontend) | ST-02, ST-04 | [✓] Concluído | ST-05 |
| **ST-07** | Reformulação da Aba Painel Admin (Senha, Gestor de Eventos e Sheets) | Lucas (Frontend) + Rafael (Backend) | ST-04 | [✓] Concluído | ST-08 |
| **ST-08** | Suíte de Testes Automatizados (Responsividade, Checklist, Sync) | Diego (QA) | ST-05, ST-06, ST-07 | [✓] Concluído | ST-09 |
| **ST-09** | Auditoria de Segurança (Sanitização XSS, Senha e Credenciais) | Murilo (DevSecOps) | ST-07 | [✓] Concluído | ST-08 |
| **ST-10** | Quality Gate Formal (`QA-PASS` 100% e `SEC-PASS`) | Diego (QA) + Murilo (DevSecOps) | ST-08, ST-09 | [✓] Concluído | - |
| **ST-11** | Merge da Branch `dev` para `main` e Publicação (GitHub Pages / Vercel) | Rodrigo (Tech Lead) + André (SRE) | ST-10 | [✓] Concluído | - |

---

## 4. Quality Gate Formal
- [x] Bateria de 105 testes automatizados com 100% de sucesso (`QA-PASS`).
- [x] Auditoria de segurança sem apontamentos críticos (`SEC-PASS`).
- [x] Verificação de responsividade mobile (iPhone Notch / Safe-Areas / Android).
- [x] Teste de sincronização em tempo real e fallback offline em LocalStorage.

---

## 5. Histórico de Handovers
1. **08/11/2026 04:25**: Kinho aciona `/squad iniciar` para UI/UX redesign do Site IBNS -> Rodrigo (Tech Lead) assume orquestração, inicia Virtual Office na porta 4444, valida acessos (GitHub, Supabase, Vercel), cria branch `dev` e abre Rodada 1 do `/grill-with-docs`.
2. **08/11/2026 04:40**: Kinho aprova Q1, Q2, Q3, Q4 com orientações: não usar Vercel pessoal (`kinhochmo2`), manter Firebase com transição futura ao Supabase, e usar a equipe de design e elementos da Claro Design Studio AI com as cores oficiais da IBNS.
3. **08/11/2026 04:45**: Camila (UX/UI) e Lucas (Frontend) implementam nova interface com Apple HIG, Glassmorphism, Segmented Controls, Run Sheet interativo e safe-areas mobile.
4. **08/11/2026 04:50**: Diego (QA) e Murilo (DevSecOps) executam a suíte automatizada `test/quality_gate.js`: 105/105 testes aprovados (`QA-PASS 100% & SEC-PASS`).
5. **08/11/2026 04:52**: Rodrigo (Tech Lead) e André (SRE) autorizam a promoção e merge da branch `dev` para `main` no repositório oficial da IBNS.
