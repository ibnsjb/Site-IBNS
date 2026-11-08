# DOC-08 · Operação SRE, Resiliência & Publicação

| Metadado | Detalhe |
| :--- | :--- |
| **Código** | DOC-08-SRE |
| **Projeto** | Site IBNS |
| **Responsável** | André (SRE Engineer) & Rodrigo (Tech Lead) |
| **Data** | 08/11/2026 |
| **Status** | Homologado · Sprint 1 |

---

## 1. Topologia de Publicação
- **Hospedagem Primária**: GitHub Pages (`https://ibnsjb.github.io/Site-IBNS/`) alimentada pela branch `main` do repositório `ibnsjb/Site-IBNS`.
- **Hospedagem Secundária / Preview**: Vercel oficial da organização IBNS (vinculada diretamente ao repositório GitHub da IBNS).

---

## 2. Resiliência de Dados e Operação Offline
- **Estratégia Network-First com Fallback**:
  - Na inicialização, a aplicação tenta carregar imediatamente o snapshot do cache local (`localStorage.getItem('ibns_eventos_cache')`). Isso garante que a tela abra instantaneamente sem nenhum flash em branco mesmo se a conexão estiver instável.
  - Conforme o Firebase Realtime Database estabelece conexão em background, o estado é atualizado reativamente e gravado no cache local para a próxima sessão.
  - O checklist de momentos concluídos também conta com espelhamento duplo (Firebase + LocalStorage), permitindo que o dirigente continue marcando o culto mesmo se a rede do templo oscilar momentaneamente.

---

## 3. Guia de Execução Local
1. Clonar ou navegar até `projetos/Site-IBNS`.
2. Para testar localmente em qualquer navegador:
   ```bash
   npx serve .
   # ou
   python3 -m http.server 8080
   ```
3. Acessar `http://127.0.0.1:8080`.
