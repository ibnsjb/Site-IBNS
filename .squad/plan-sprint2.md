# Sprint 2 — Planejamento Mensal IBNS × Site IBNS
> **Status:** APROVADO — Aguardando execução  
> **Aprovado por:** Kinho (Cesar Henrique Matos de Oliveira)  
> **Data de aprovação:** 2026-11-08  
> **Tamanho:** G — 14 tarefas atômicas  
> **Branch de execução:** `feature/planejamento-mensal` (criada a partir de `dev`)  
> **Merge para main:** somente após QA-PASS 100% + SEC-PASS

---

## Contexto Consolidado (Decisões do Grill-with-docs)

### Templates de Ordem de Culto aprovados

**Template: Culto Regular (Domingos — base 10h)**
| # | Etapa | Duração |
|---|-------|---------|
| 1 | Música 1 (entrada) | 5 min |
| 2 | Boas-vindas, Leitura Bíblica e Oração | 5 min |
| 3 | Louvor 1 | 7 min |
| 4 | Louvor 2 — Dízimos e Ofertas | 7 min |
| 5 | Louvor 3 | 7 min |
| 6 | Oração de Transição | 3 min |
| 7 | Mensagem | 40 min |
| 8 | Avisos | 5 min |
| 9 | Louvor Final | 5 min |
| 10 | Bênção Apostólica | 3 min |
| 11 | Encerramento | 2 min |

**Template: Santa Ceia (1º domingo do mês)** — igual ao Regular, com inserção após item 7:
- `7-A. Momento de Santa Ceia (1 música breve — conduzida pelo pregador)` — 10 min

**Template: Sião Kids (4º domingo do mês)** — igual ao Regular, com inserção após item 7:
- `7-A. Momento Especial — Sião Kids` — 10 min

**Template: Mini Vigília (horário variável)** — estrutura própria, sem herdar do Regular.

### Regras de negócio aprovadas
- **Sem campo "responsável"** nos itens da ordem (fica implícito)
- **Horários calculados automaticamente** a partir da hora de início informada pelo admin
- **Visão pública:** sequência + etapas (sem músicas/Tom)
- **Visão Equipe:** botão na página → revela Tom + link YouTube das músicas
- **Holyrics:** leitura via API relay internet (`api.holyrics.com.br`) — plano Advanced já pago
  - Exibir: lista completa do culto + item atual destacado ("você está aqui")
  - Setup necessário: Kinho gera API key em Arquivo → Configurações → API Server → Gerenciar Permissões
- **JSON enriquecido:** gerado no chat durante sessão de planejamento, importado no site
- **Google Sheets:** removido; substituído pelo importador JSON

### JSON enriquecido — novo formato padrão
```json
{
  "igreja": "Igreja Batista Nova Sião",
  "data": "2026-12-07",
  "tipo": "Culto Regular",
  "hora": "10:00",
  "tema": "...",
  "serie": "...",
  "serie_base": "...",
  "texto_base": "...",
  "evento_id": "IBNS_CultoRegular_20261207_1000",
  "ordem": [
    {
      "etapa": "Música 1",
      "min": 5,
      "musica": {
        "titulo": "Quão Grande és Tu",
        "artista": "Carl Boberg",
        "tom": "C",
        "youtube": "https://youtu.be/xxx"
      }
    },
    {
      "etapa": "Boas-vindas, Leitura Bíblica e Oração",
      "min": 5,
      "musica": null
    },
    {
      "etapa": "Louvor 1",
      "min": 7,
      "musica": { "titulo": "...", "artista": "...", "tom": "G", "youtube": "https://youtu.be/yyy" }
    },
    {
      "etapa": "Louvor 2 — Dízimos e Ofertas",
      "min": 7,
      "musica": { "titulo": "...", "artista": "...", "tom": "D", "youtube": "https://youtu.be/zzz" }
    }
  ],
  "escala": []
}
```

---

## Mapa de Tarefas Atômicas

```
T01 ──────────────────────────────────── (pré-requisito geral)
 └─→ T02 (bugfix drag-drop)
 └─→ T03 (remove Google Sheets)
 └─→ T04 (templates de culto — data layer)
      └─→ T05 (cálculo automático de horários)
           └─→ T06 (UI: novo evento com template)
      └─→ T07 (importador JSON enriquecido)
      └─→ T08 (Firebase: estrutura de dados)
           └─→ T09 (visão pública da Ordem de Culto)
                └─→ T10 (botão Visão da Equipe)
 └─→ T11 (Holyrics: cliente HTTP relay)
      └─→ T12 (Holyrics: display no site)
 └─→ T13 (Quality Gate: novos testes)
      └─→ T14 (Deploy: dev → main)
```

---

## Tarefas Detalhadas

---

### T01 — Leitura e mapeamento do `index.html` atual
**Papel:** Arquitetura / Tech Lead  
**Pré-requisitos:** nenhum  
**Arquivo-alvo:** `projetos/Site-IBNS/index.html` (1787 linhas)

**O que fazer:**
1. Ler o `index.html` completo
2. Mapear as funções JavaScript existentes relacionadas a:
   - `renderOrdem()` / `renderEventos()` — renderização da ordem de culto
   - `dragSrcIdx` / `dragstart` / `dragover` / `drop` — drag-and-drop
   - `importFromSheets()` / `sheets-url-*` — Google Sheets (linhas 391–399, 1695–1734)
   - `ordemItems` — array de itens da ordem
   - `renderCultoOrdemItem()` — render do item no run sheet
   - Firebase `dbRef` — estrutura de dados atual
3. Documentar as funções existentes que serão modificadas em cada tarefa
4. Produzir um mapa de dependências internas do código para guiar as outras tarefas

**Entregável:** Comentário no plano com mapa de funções → usado como contexto por T02–T13

---

### T02 — Correção do drag-and-drop (desktop + touch)
**Papel:** Frontend Engineer  
**Pré-requisitos:** T01  
**Arquivo-alvo:** `projetos/Site-IBNS/index.html`

**Contexto do bug:**
- Existem dois sistemas de drag: `#ordem-list .drag-item` (admin) e `.culto-ordem-item` (run sheet)
- O problema: após o redesign, o `dragstart` dispara mas o `drop` não reconhece o alvo corretamente
- Touch: `touch-none` no handle impede o swipe, mas não há implementação de `touchstart`/`touchmove`/`touchend` para mobile

**O que fazer:**
1. Corrigir o drag-and-drop desktop nos dois contextos (`#ordem-list` e `.culto-ordem-item`):
   - Garantir `e.preventDefault()` no `dragover`
   - Garantir que o `drop` recalcula `targetIdx` corretamente após re-render
   - Garantir que `dragSrcIdx` é resetado após drop
2. Implementar drag-and-drop touch (mobile):
   - Usar eventos `touchstart`, `touchmove`, `touchend` no `.drag-handle`
   - Calcular elemento-alvo via `document.elementFromPoint(touch.clientX, touch.clientY)`
   - Replicar a mesma lógica de swap de posição
3. Remover `touch-none` do handle e substituir pela lógica touch correta
4. Testar mentalmente para ambos os contextos

**Entregável:** Código corrigido inline no `index.html`

---

### T03 — Remoção do importador Google Sheets
**Papel:** Frontend Engineer  
**Pré-requisitos:** T01  
**Arquivo-alvo:** `projetos/Site-IBNS/index.html`

**O que fazer:**
1. Remover completamente o bloco HTML das linhas ~388–405 (inputs `sheets-url-eventos`, `sheets-url-ordem`, `sheets-url-escala`)
2. Remover as funções JavaScript relacionadas: `importFromSheets()`, handlers dos botões "Importar"
3. Remover quaisquer referências a `sheets-url-*` em todo o arquivo
4. O espaço visual liberado será ocupado pelo importador JSON (T07) — deixar um comentário `<!-- SLOT: JSON-IMPORTER -->` no lugar

**Entregável:** Código com Google Sheets removido; slot para T07

---

### T04 — Templates de ordem de culto (data layer)
**Papel:** Backend / Data Engineer  
**Pré-requisitos:** T01  
**Arquivo-alvo:** `projetos/Site-IBNS/index.html` (bloco `<script>`)

**O que fazer:**
Criar o objeto `IBNS_TEMPLATES` global com os 3 templates aprovados:

```javascript
const IBNS_TEMPLATES = {
  culto_regular: {
    nome: "Culto Regular",
    hora_padrao: "10:00",
    itens: [
      { etapa: "Música 1", min: 5, tipo: "musica" },
      { etapa: "Boas-vindas, Leitura Bíblica e Oração", min: 5, tipo: "liturgia" },
      { etapa: "Louvor 1", min: 7, tipo: "musica" },
      { etapa: "Louvor 2 — Dízimos e Ofertas", min: 7, tipo: "musica" },
      { etapa: "Louvor 3", min: 7, tipo: "musica" },
      { etapa: "Oração de Transição", min: 3, tipo: "oracao" },
      { etapa: "Mensagem", min: 40, tipo: "mensagem" },
      { etapa: "Avisos", min: 5, tipo: "aviso" },
      { etapa: "Louvor Final", min: 5, tipo: "musica" },
      { etapa: "Bênção Apostólica", min: 3, tipo: "bencao" },
      { etapa: "Encerramento", min: 2, tipo: "encerramento" }
    ]
  },
  santa_ceia: {
    nome: "Santa Ceia (1º Domingo)",
    hora_padrao: "10:00",
    itens: [
      // igual ao culto_regular, com item extra após "Mensagem":
      // { etapa: "Momento de Santa Ceia", min: 10, tipo: "ceia" }
      // e antes de "Avisos"
    ]
  },
  siao_kids: {
    nome: "Sião Kids (4º Domingo)",
    hora_padrao: "10:00",
    itens: [
      // igual ao culto_regular, com item extra após "Mensagem":
      // { etapa: "Momento Especial — Sião Kids", min: 10, tipo: "especial" }
    ]
  }
};
```

Cada `tipo` define o ícone exibido na UI:
- `musica` → 🎵
- `liturgia` → 📖
- `oracao` → 🙏
- `mensagem` → 🎤
- `aviso` → 📢
- `bencao` → ✝️
- `encerramento` → 🏁
- `ceia` → 🍞
- `especial` → ⭐

**Entregável:** Objeto `IBNS_TEMPLATES` declarado e exportado no escopo global

---

### T05 — Cálculo automático de horários
**Papel:** Backend / Data Engineer  
**Pré-requisitos:** T04  
**Arquivo-alvo:** `projetos/Site-IBNS/index.html`

**O que fazer:**
Criar função `calcularHorarios(horaInicio, itens)`:

```javascript
function calcularHorarios(horaInicio, itens) {
  // horaInicio: "10:00"
  // itens: array de { etapa, min, ... }
  // retorna: array com campo "hora" preenchido em cada item
  let [h, m] = horaInicio.split(':').map(Number);
  return itens.map(item => {
    const hora = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
    m += item.min;
    h += Math.floor(m / 60);
    m = m % 60;
    return { ...item, hora };
  });
}
```

**Entregável:** Função disponível globalmente no script

---

### T06 — UI: Novo evento com seleção de template no Painel Admin
**Papel:** Frontend Engineer  
**Pré-requisitos:** T04, T05  
**Arquivo-alvo:** `projetos/Site-IBNS/index.html`

**O que fazer:**
1. No modal/formulário de "Adicionar Novo Evento" do Painel Admin, adicionar:
   - Campo **Data** (date picker)
   - Campo **Horário** (time input, default "10:00")
   - Campo **Tipo/Template** (select): Culto Regular | Santa Ceia | Sião Kids | Evento Personalizado
   - Campo **Tema do Culto** (text)
   - Campo **Série** (text, opcional)
   - Campo **Versículo-base** (text, opcional)
   - Campo **Pregador** (text, opcional — apenas para controle interno, não exibido publicamente)

2. Ao selecionar um template:
   - Chamar `calcularHorarios(horaInicio, IBNS_TEMPLATES[tipo].itens)`
   - Pré-preencher a lista de itens da ordem com os itens do template
   - Exibir preview da ordem gerada abaixo do formulário

3. Permitir ajustes pontuais nos itens antes de salvar (editar nome da etapa, duração, adicionar músicas)

4. Botão "Salvar Culto" → persiste no Firebase com estrutura do T08

**Entregável:** Modal de novo evento atualizado com seleção de template e preview da ordem

---

### T07 — Importador JSON enriquecido
**Papel:** Frontend Engineer  
**Pré-requisitos:** T03, T04  
**Arquivo-alvo:** `projetos/Site-IBNS/index.html`

**Novo formato JSON** (ver seção "JSON enriquecido" acima neste plano).

**O que fazer:**
1. Substituir o slot `<!-- SLOT: JSON-IMPORTER -->` (deixado pelo T03) pelo novo bloco:
   ```html
   <div class="importar-json-section">
     <label>Importar Ordem de Culto (JSON)</label>
     <textarea id="json-import-input" rows="6" placeholder='Cole o JSON do planejamento aqui...'></textarea>
     <button onclick="importarJSON()">📥 Importar</button>
     <div id="json-import-log"></div>
   </div>
   ```

2. Implementar `importarJSON()`:
   - Parse do JSON colado no textarea
   - Validar campos obrigatórios: `data`, `tipo`, `hora`, `ordem`
   - Preencher automaticamente: data, horário, tema, série, versículo-base
   - Mapear `ordem[].etapa` para os itens da ordem de culto
   - Mapear `ordem[].musica` (se presente) para dados enriquecidos de cada item
   - Chamar `calcularHorarios()` com base na hora do JSON
   - Persistir no Firebase (estrutura T08)
   - Exibir log de importação: "✅ 11 itens importados | 4 músicas com Tom e YouTube"

3. Tratar erros de JSON malformado com mensagem amigável

**Entregável:** Importador JSON funcional substituindo o Google Sheets

---

### T08 — Firebase: estrutura de dados atualizada
**Papel:** Backend / DBA  
**Pré-requisitos:** T04  
**Arquivo-alvo:** `projetos/Site-IBNS/index.html` (funções Firebase)

**Nova estrutura no Firebase RTDB:**
```
/eventos/{evento_id}/
  ├── data: "2026-12-07"
  ├── tipo: "culto_regular"
  ├── hora: "10:00"
  ├── tema: "..."
  ├── serie: "..."
  ├── serie_base: "..."
  ├── texto_base: "..."
  ├── pregador: "..."         ← apenas controle interno
  └── ordem/
        ├── 0/
        │   ├── etapa: "Música 1"
        │   ├── min: 5
        │   ├── hora: "10:00"
        │   ├── tipo: "musica"
        │   ├── done: false
        │   └── musica/
        │         ├── titulo: "Quão Grande és Tu"
        │         ├── artista: "Carl Boberg"
        │         ├── tom: "C"
        │         └── youtube: "https://youtu.be/xxx"
        └── 1/
            ├── etapa: "Boas-vindas, Leitura Bíblica e Oração"
            ├── min: 5
            ├── hora: "10:05"
            ├── tipo: "liturgia"
            ├── done: false
            └── musica: null
```

**O que fazer:**
1. Atualizar a função `salvarEvento()` para persistir a nova estrutura
2. Atualizar a função `carregarEvento()` para ler a nova estrutura (backward-compatible com eventos antigos sem campo `musica`)
3. Atualizar a função `toggleDone()` para operar por `evento_id` + índice do item
4. Garantir fallback: se `ordem[i].musica` for `null` ou ausente, não quebrar o render

**Entregável:** Funções Firebase atualizadas e backward-compatible

---

### T09 — Visão pública da Ordem de Culto
**Papel:** Frontend Engineer  
**Pré-requisitos:** T08  
**Arquivo-alvo:** `projetos/Site-IBNS/index.html`

**Renomear "Run Sheet" para "Ordem de Culto"** em toda a UI (labels, títulos, IDs).

**O que fazer:**
1. Criar/atualizar a seção pública "Ordem de Culto":
   - Exibir o próximo culto (data mais próxima com evento no Firebase)
   - Mostrar: tema, série, versículo-base, horário
   - Listar os itens da ordem com: `hora | ícone-do-tipo | nome da etapa`
   - **Não** exibir nomes de músicas, Tom ou YouTube na visão pública
   - Item com `done: true` → aparece riscado/acinzentado (atualizado em tempo real via Firebase)
   - Estilo Apple HIG: glassmorphism leve, cores IBNS (`#0c4786` / `#037fba`)

2. Permitir navegar entre cultos do mês (← →)

**Entregável:** Página pública da Ordem de Culto funcional e visualmente alinhada ao design atual

---

### T10 — Botão "Visão da Equipe" (Tom + YouTube)
**Papel:** Frontend Engineer  
**Pré-requisitos:** T09  
**Arquivo-alvo:** `projetos/Site-IBNS/index.html`

**O que fazer:**
1. Adicionar botão **"🎵 Visão da Equipe"** no topo da seção Ordem de Culto
2. Ao clicar, expandir para cada item que tem `musica != null`:
   - Badge com o Tom (ex: `C`, `G`, `Bb`)
   - Ícone do YouTube com link para o vídeo de referência
   - Nome da música em destaque
3. Toggle: clicar novamente retorna à visão pública simples
4. Estado do toggle não persiste (volta ao simples ao recarregar a página)
5. Estilo: pills coloridos para Tom (`#0c4786`), ícone YouTube vermelho

**Entregável:** Toggle de visão da equipe funcional

---

### T11 — Holyrics: cliente HTTP relay (internet)
**Papel:** Backend Engineer  
**Pré-requisitos:** T01  
**Arquivo-alvo:** `projetos/Site-IBNS/index.html`

**Contexto técnico:**
- Plano Advanced do Holyrics → relay via `https://api.holyrics.com.br`
- Endpoints necessários:
  - `GET /request/GetCPInfo` → item atual projetado
  - `GET /request/GetSongList` → lista de músicas/itens do culto no Holyrics
- Autenticação: header `api_key: <HOLYRICS_API_KEY>`
- O API key será configurado por Kinho e inserido no Painel Admin do site

**O que fazer:**
1. Criar função `holyricsRequest(action, payload = {})`:
   ```javascript
   async function holyricsRequest(action, payload = {}) {
     const apiKey = localStorage.getItem('holyrics_api_key') || '';
     if (!apiKey) return null;
     try {
       const res = await fetch(`https://api.holyrics.com.br/request/${action}`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json', 'api_key': apiKey },
         body: JSON.stringify(payload)
       });
       const data = await res.json();
       return data.status === 'ok' ? data.response : null;
     } catch { return null; }
   }
   ```

2. No Painel Admin, adicionar campo **"Holyrics API Key"** com botão "Testar conexão":
   - Salva no `localStorage` (não no Firebase — é credencial local)
   - Botão testa com `GetCPInfo` e exibe status: ✅ Conectado / ❌ Falha

3. Polling de 5 segundos: `setInterval(() => atualizarHolyricsDisplay(), 5000)` quando a tela de Ordem de Culto estiver ativa

**Entregável:** Funções de comunicação com Holyrics via relay internet

---

### T12 — Holyrics: display no site (item atual + lista)
**Papel:** Frontend Engineer  
**Pré-requisitos:** T09, T11  
**Arquivo-alvo:** `projetos/Site-IBNS/index.html`

**O que fazer:**
1. Adicionar widget **"📺 Ao Vivo — Holyrics"** na seção Ordem de Culto:
   - Aparece somente se `holyrics_api_key` estiver configurado
   - Exibe o item atualmente projetado no Holyrics (nome do slide/música)
   - Na lista da Ordem de Culto, o item que corresponde ao que está no Holyrics ganha destaque visual (borda azul pulsante ou badge "AO VIVO")

2. Lógica de correspondência: comparar `GetCPInfo.current_item.title` com as etapas da ordem de culto (fuzzy match por título da música)

3. Se Holyrics offline ou sem key → widget oculto silenciosamente (sem erro visual)

4. Função `atualizarHolyricsDisplay()`:
   - Chama `holyricsRequest('GetCPInfo')`
   - Atualiza o widget com o título do item atual
   - Destaca o item correspondente na lista

**Entregável:** Widget Holyrics integrado na Ordem de Culto

---

### T13 — Quality Gate: novos testes
**Papel:** QA Engineer  
**Pré-requisitos:** T02–T12 concluídas  
**Arquivo-alvo:** `projetos/Site-IBNS/test/quality_gate.js`

**O que fazer:**
Adicionar testes aos 105 existentes (meta: ≥ 130 testes, 100% PASS):

1. **Templates (T04):**
   - `IBNS_TEMPLATES.culto_regular` tem 11 itens
   - `IBNS_TEMPLATES.santa_ceia` tem 12 itens (item extra "ceia")
   - `IBNS_TEMPLATES.siao_kids` tem 12 itens (item extra "especial")

2. **Cálculo de horários (T05):**
   - `calcularHorarios("10:00", [{min:5}])` → primeiro item tem hora "10:00"
   - `calcularHorarios("10:00", [{min:5},{min:7}])` → segundo item tem hora "10:05"
   - Overflow de minutos (ex: 10:55 + 10min → 11:05)

3. **Importador JSON (T07):**
   - JSON válido com 11 itens → importa sem erros
   - JSON sem campo `hora` → erro amigável
   - JSON com `musica: null` em alguns itens → importa sem quebrar
   - JSON com músicas completas → campo `tom` e `youtube` preservados

4. **Firebase estrutura (T08):**
   - Evento salvo tem campo `ordem[0].musica`
   - Evento antigo sem `musica` carrega sem erro (backward-compat)

5. **Holyrics cliente (T11):**
   - `holyricsRequest` sem API key retorna `null` sem exceção
   - `holyricsRequest` com API key inválida retorna `null` sem exceção

6. **Drag-and-drop (T02):**
   - Trocar item 0 com item 2 → array reordenado corretamente
   - Trocar item com ele mesmo → sem mudança

7. **Visibilidade (T09/T10):**
   - Visão pública: `musica.tom` e `musica.youtube` não aparecem no DOM público
   - Visão Equipe ativa: `musica.tom` aparece no DOM

**Entregável:** `quality_gate.js` atualizado com ≥ 130 testes; resultado PASS 100%

---

### T14 — Deploy: dev → Quality Gate → main → GitHub Pages
**Papel:** DevSecOps / SRE  
**Pré-requisitos:** T13 (QA-PASS 100%)  
**Arquivo-alvo:** `projetos/Site-IBNS/`

**O que fazer:**
1. Garantir que todas as alterações estão na branch `feature/planejamento-mensal`
2. Merge `feature/planejamento-mensal` → `dev`
3. Executar `node projetos/Site-IBNS/test/quality_gate.js` → confirmar QA-PASS 100%
4. Merge `dev` → `main` via GitHub (MCP `github-ibns`)
5. Confirmar GitHub Pages respondendo: `https://ibnsjb.github.io/Site-IBNS/` → HTTP 200
6. Atualizar `projetos/Site-IBNS/.squad/status.json` com Sprint 2 concluída
7. Atualizar `projetos/.squad/global_status.json`

**Entregável:** Site live em produção com todas as funcionalidades da Sprint 2

---

## Checklist de Pré-Execução (Orquestrador)

- [ ] Branch `feature/planejamento-mensal` criada a partir de `dev`
- [ ] `index.html` lido e mapeado (T01 concluído)
- [ ] Token GitHub IBNS ativo (`github-ibns` MCP)
- [ ] Firebase projeto `siteibns` acessível
- [ ] Kinho informou o Holyrics API Key (ou T11/T12 marcados como "setup pendente")

## Ordem de Execução Recomendada (Paralelismo)

```
Fase 1 (paralelo): T01
Fase 2 (paralelo): T02, T03, T04
Fase 3 (paralelo): T05 (depende T04), T07 (depende T03+T04), T08 (depende T04), T11 (independente)
Fase 4 (paralelo): T06 (depende T05), T09 (depende T08), T12 (depende T09+T11)
Fase 5 (paralelo): T10 (depende T09)
Fase 6 (sequencial): T13 → T14
```

**Tempo estimado total:** 4–6 horas de execução com 3 subagentes em paralelo

---

## Referências

- Repositório: `ibnsjb/Site-IBNS` (MCP: `github-ibns`)
- Firebase: `siteibns-default-rtdb.firebaseio.com`
- Holyrics API: `https://api.holyrics.com.br` / [holyrics/API-Server](https://github.com/holyrics/API-Server)
- Cores IBNS: `#0c4786` (Navy) | `#037fba` (Azul Vibrante)
- Design: Apple HIG + Claro Design Studio AI (baixa carga cognitiva, escaneabilidade)
- JSON de exemplo: `IBNS/Fontes/2026-07 — Arquivos Base/celebracao_familia_20260705.json`
