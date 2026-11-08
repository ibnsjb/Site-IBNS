# Decisões Técnicas da Squad (ADRs) · Site IBNS

## DEC-001: Redesenho de UI/UX com Diretrizes Claro Design Studio AI e Cores IBNS
- **Data**: 08/11/2026
- **Status**: Aprovada pelo Usuário
- **Contexto**: A página legada utilizava visual tradicional em azul escuro denso e controles desatualizados.
- **Decisão**: Adoção das diretrizes de baixa carga cognitiva, escaneabilidade e Apple Human Interface Guidelines (Glassmorphism, Segmented Controls, cantos arredondados contínuos e Safe-Areas), preservando com rigor as cores institucionais da IBNS (`#0c4786` e `#037fba`).

## DEC-002: Isolamento Estrito de Contas Vercel
- **Data**: 08/11/2026
- **Status**: Aprovada pelo Usuário
- **Contexto**: Evitar misturar a conta Vercel pessoal (`kinhochmo2`) com projetos e repositórios da igreja.
- **Decisão**: Toda e qualquer integração ou deploy deste projeto utilizará estritamente a conta e credenciais da organização oficial da IBNS vinculada ao GitHub da igreja.

## DEC-003: Persistência em Tempo Real com Firebase e Rota de Transição para Supabase
- **Data**: 08/11/2026
- **Status**: Aprovada pelo Usuário
- **Contexto**: O projeto já contava com sincronização ativa de eventos e checklist no Firebase Realtime Database.
- **Decisão**: Na Sprint 1, manter e blindar a integração ativa no Firebase com fallback em LocalStorage para garantir zero atrito ou quebra nos cultos; na Fase 2, migrar a persistência para o Supabase IBNS (`Projetos-IBNS` / `Orbit`) seguindo o DDL especificado no DOC-05.
