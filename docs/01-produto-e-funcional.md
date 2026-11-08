# DOC-01 · Especificação de Produto & Negócio

| Metadado | Detalhe |
| :--- | :--- |
| **Código** | DOC-01-PRODUTO |
| **Projeto** | Site IBNS (Liturgia, Escalas e Painel Operacional) |
| **Responsável** | Camila (Product & UX/UI Designer) |
| **Data** | 08/11/2026 |
| **Status** | Homologado · Sprint 1 |

---

## 1. Visão do Produto & Personas

### 1.1. Visão Geral
O Site IBNS é o sistema operacional de apoio ao púlpito, equipes ministeriais e voluntários da Igreja Batista Nova Sião em São Bernardo do Campo. Ele centraliza a liturgia em tempo real (Run Sheet), as escalas de voluntários e a administração de eventos litúrgicos com sincronização imediata em múltiplos dispositivos.

### 1.2. Personas Atendidas
1. **Dirigente do Culto / Pastor**: No altar com tablet ou celular, acompanha a ordem de culto, tempos estimados por etapa, transições de momento e checklist de execução.
2. **Voluntário Escalado (Louvor, Som, Transmissão, Recepção, Sião Kids)**: Consulta a data e escala semanal, visualizando sua equipe e função.
3. **Secretaria / Gestor Litúrgico (Admin)**: Alimenta o sistema via formulário intuitivo ou planilha oficial do Google Sheets (CSV).

---

## 2. Matriz de Requisitos Funcionais (RF) e Não-Funcionais (RNF)

### Requisitos Funcionais
- **RF-001 (Run Sheet Litúrgico)**: Exibir momento litúrgico, responsável e duração estimada.
- **RF-002 (Checklist em Tempo Real)**: Permitir marcar momentos concluídos com sincronização instantânea via Firebase para todos os dispositivos conectados.
- **RF-003 (Reordenação Dinâmica)**: Permitir reordenar as etapas no meio do culto com drag-and-drop.
- **RF-004 (Visualização de Escalas)**: Listar voluntários agrupados por ministério com busca rápida.
- **RF-005 (Painel Administrativo com Proteção)**: Bloqueio por senha (`0573`) com interface inspirada no padrão Apple.
- **RF-006 (Integração Google Sheets)**: Importar eventos, ordens e escalas a partir de URLs CSV públicas.
- **RF-007 (Backup JSON)**: Exportar e importar backup completo offline.

### Requisitos Não-Funcionais
- **RNF-001 (Apple HIG & Design Tokens IBNS)**: Cores `#0c4786` e `#037fba`, Glassmorphism e Segmented Controls.
- **RNF-002 (Compatibilidade Zero-Cost)**: Execução 100% estática compatível com GitHub Pages e Vercel sem necessidade de servidor Node.js.
- **RNF-003 (Safe-Areas & Mobile First)**: Suporte obrigatório a entalhes (notches) e barras home de iPhones e Androids.
- **RNF-004 (Resiliência Offline)**: Fallback transparente para LocalStorage em caso de instabilidade de rede.
