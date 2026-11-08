# DOC-03 · Arquitetura SPA & Engenharia de Frontend

| Metadado | Detalhe |
| :--- | :--- |
| **Código** | DOC-03-ARQUITETURA |
| **Projeto** | Site IBNS |
| **Responsável** | Rodrigo (Tech Lead) & Lucas (Frontend Engineer) |
| **Data** | 08/11/2026 |
| **Status** | Homologado · Sprint 1 |

---

## 1. Visão Arquitetural

```mermaid
flowchart TD
  User["Voluntário / Púlpito / Admin"] --> Browser["Browser Web / Mobile (PWA & GitHub Pages)"]
  Browser --> Shell["App Shell (HTML5 + Tailwind CSS + Glassmorphism)"]
  Shell --> CultoPage["Página 1: Culto & Run Sheet"]
  Shell --> EscalaPage["Página 2: Escalas de Ministérios"]
  Shell --> AdminPage["Página 3: Painel Administrativo"]
  
  CultoPage --> State["Engine de Estado Reativo (window.eventos & window.checklist)"]
  EscalaPage --> State
  AdminPage --> State
  
  State <--> SyncAdapter["Data Sync Adapter"]
  SyncAdapter <--> Firebase["Firebase Realtime Database (siteibns-default-rtdb)"]
  SyncAdapter <--> LocalCache["LocalStorage Fallback (Offline First)"]
  SyncAdapter <-- GoogleSheets["Google Sheets CSV Import"]
```

---

## 2. Decisões Arquiteturais Fundamentadas (ADR)
- **ADR-001 (SPA Estática sem Dependência de Servidor)**: Optou-se por manter uma SPA estática compilada em arquivo único leve e modular para garantir 100% de gratuidade no GitHub Pages (`https://ibnsjb.github.io/Site-IBNS/`) e espelhamento sem atrito na Vercel da IBNS.
- **ADR-002 (Isolamento de Contas Vercel)**: A conta pessoal `kinhochmo2` NUNCA é utilizada para deploys ou tokens deste projeto, respeitando o isolamento estrito da conta oficial da IBNS.
- **ADR-003 (Duplo Motor de Drag-and-Drop)**: Implementação de event listeners nativos HTML5 para desktop (`dragstart`/`drop`) combinados com event listeners de ponteiro touch para celular (`touchstart`/`touchmove`/`touchend` com elemento fantasma flutuante).
