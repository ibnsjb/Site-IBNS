# DOC-00 · Índice Geral Corporativo & Matriz de Rastreabilidade

| Metadado | Detalhe |
| :--- | :--- |
| **Código** | DOC-00-INDEX |
| **Projeto** | Site IBNS (Liturgia, Escalas e Painel Operacional) |
| **Repositório** | `ibnsjb/Site-IBNS` |
| **Branch Ativa** | `dev` (desenvolvimento e homologação) |
| **Autor Primário** | Rodrigo (Tech Lead) |
| **Equipe de Design** | Claro Design Studio AI (UI/UX Principal, Brand Guardian, Icon Curator, AAA Reviewer) & Camila (UX/UI) |
| **Status do Gate** | Em Desenvolvimento · Sprint 1 |
| **Data de Emissão** | 08/11/2026 |

---

## 1. Sumário Executivo & Navegação dos Cadernos Técnicos
1. [DOC-00 · Índice Geral Corporativo & Rastreabilidade](file:///Users/os_kinhos/Library/CloudStorage/GoogleDrive-kinhochmo@gmail.com/Outros%20computadores/Meu%20computador/Documents/Obsidian/Kinho_brain/projetos/Site-IBNS/docs/00-indice-geral.md)
2. [DOC-01 · Especificação de Produto & Negócio](file:///Users/os_kinhos/Library/CloudStorage/GoogleDrive-kinhochmo@gmail.com/Outros%20computadores/Meu%20computador/Documents/Obsidian/Kinho_brain/projetos/Site-IBNS/docs/01-produto-e-funcional.md)
3. [DOC-02 · Design System, Apple HIG & Design Studio AI](file:///Users/os_kinhos/Library/CloudStorage/GoogleDrive-kinhochmo@gmail.com/Outros%20computadores/Meu%20computador/Documents/Obsidian/Kinho_brain/projetos/Site-IBNS/docs/02-design-system-ui-ux.md)
4. [DOC-03 · Arquitetura SPA & Engenharia de Frontend](file:///Users/os_kinhos/Library/CloudStorage/GoogleDrive-kinhochmo@gmail.com/Outros%20computadores/Meu%20computador/Documents/Obsidian/Kinho_brain/projetos/Site-IBNS/docs/03-arquitetura-e-engenharia.md)
5. [DOC-04 · Integrações em Tempo Real (Firebase & Sheets)](file:///Users/os_kinhos/Library/CloudStorage/GoogleDrive-kinhochmo@gmail.com/Outros%20computadores/Meu%20computador/Documents/Obsidian/Kinho_brain/projetos/Site-IBNS/docs/04-backend-apis-e-integracao.md)
6. [DOC-05 · Persistência, Modelagem & Transição Supabase](file:///Users/os_kinhos/Library/CloudStorage/GoogleDrive-kinhochmo@gmail.com/Outros%20computadores/Meu%20computador/Documents/Obsidian/Kinho_brain/projetos/Site-IBNS/docs/05-banco-de-dados-e-persistencia.md)
7. [DOC-06 · Matriz de Qualidade & Testes QA-PASS](file:///Users/os_kinhos/Library/CloudStorage/GoogleDrive-kinhochmo@gmail.com/Outros%20computadores/Meu%20computador/Documents/Obsidian/Kinho_brain/projetos/Site-IBNS/docs/06-qualidade-e-testes-qa.md)
8. [DOC-07 · Auditoria de Segurança & SEC-PASS](file:///Users/os_kinhos/Library/CloudStorage/GoogleDrive-kinhochmo@gmail.com/Outros%20computadores/Meu%20computador/Documents/Obsidian/Kinho_brain/projetos/Site-IBNS/docs/07-seguranca-e-devsecops.md)
9. [DOC-08 · Resiliência, SRE & Publicação](file:///Users/os_kinhos/Library/CloudStorage/GoogleDrive-kinhochmo@gmail.com/Outros%20computadores/Meu%20computador/Documents/Obsidian/Kinho_brain/projetos/Site-IBNS/docs/08-operacao-sre-e-resiliencia.md)

---

## 2. Matriz de Rastreabilidade (Requisitos vs Componentes vs Testes)

| Requisito | Descrição | Módulo / Componente | Caderno | Teste QA |
| :--- | :--- | :--- | :--- | :--- |
| **RF-01** | Visualização do Run Sheet do culto com contagem regressiva | `renderCulto()`, Hero Card, Barra de Progresso | DOC-01, DOC-02 | `test_culto_view` |
| **RF-02** | Checklist de momentos do culto em tempo real multi-dispositivo | `toggleCheck()`, Firebase `ibns/checklist` | DOC-03, DOC-04 | `test_checklist_sync` |
| **RF-03** | Reordenação arrastável de momentos litúrgicos | Drag-and-drop Desktop/Touch, `saveCultoOrder()` | DOC-02, DOC-03 | `test_drag_and_drop` |
| **RF-04** | Visualização de escalas por ministério com busca e avatares | `renderEscala()`, Chips de Ministério | DOC-01, DOC-02 | `test_escala_view` |
| **RF-05** | Painel Admin protegido com PIN/Senha estilo Apple | `checkSenha()`, Overlay de Desbloqueio | DOC-01, DOC-07 | `test_admin_auth` |
| **RF-06** | Gestão de eventos (Criação, Edição, Exclusão de cultos) | `salvarEvento()`, `editarEvento()`, `deletarEvento()` | DOC-03, DOC-05 | `test_eventos_crud` |
| **RF-07** | Importação de Google Sheets e JSON com log estruturado | `saveAndLoadSheets()`, `importJSON()` | DOC-04 | `test_sheets_import` |
| **RNF-01** | Interface responsiva mobile-first com Safe-Areas Apple HIG | Tailwind CSS, `env(safe-area-inset-*)` | DOC-02 | `test_safe_areas` |
| **RNF-02** | Design Tokens nobres oficiais da IBNS | Paleta `#0c4786`, `#037fba`, Glassmorphism | DOC-02 | `test_design_tokens` |
| **RNF-03** | Resiliência offline com fallback em LocalStorage | Client Adapter `StorageAdapter` | DOC-04, DOC-08 | `test_offline_fallback` |

---

## 3. Controle de Versões & Sign-offs
- **v1.0.0 (08/11/2026)**: Início da Sprint 1 de Redesenho UI/UX com alinhamento Claro Design Studio AI e identidade visual IBNS.
