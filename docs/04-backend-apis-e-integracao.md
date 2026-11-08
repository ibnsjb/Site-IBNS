# DOC-04 · Integrações em Tempo Real (Firebase & Google Sheets)

| Metadado | Detalhe |
| :--- | :--- |
| **Código** | DOC-04-INTEGRACOES |
| **Projeto** | Site IBNS |
| **Responsável** | Rafael (Backend Engineer) & Otávio (DBA) |
| **Data** | 08/11/2026 |
| **Status** | Homologado · Sprint 1 |

---

## 1. Firebase Realtime Database
- **Instância**: `https://siteibns-default-rtdb.firebaseio.com`
- **Nós de Dados**:
  - `ibns/eventos`: Array de eventos litúrgicos com ordens e escalas.
  - `ibns/checklist`: Objeto indexado por chave do evento (`YYYY-MM-DD_tipo`) com booleans de cada etapa.
  - `ibns/sheets_config`: URLs de configuração pública das planilhas em CSV.
- **Protocolo de Escuta**: Módulo ES oficial (`@firebase/database`) com `onValue()` garantindo atualização reativa em menos de 100ms.

---

## 2. Google Sheets CSV Pipeline
- Suporte a exportação nativa do Google Drive (`/export?format=csv&gid=...`).
- O parser `parseCSV()` suporta múltiplos delimitadores (vírgula `,`, ponto-e-vírgula `;` e tabulação `\t`), com descarte automático de aspas delimitadoras e normalização de strings.
- Log de importação retrátil com auditoria linha a linha.
