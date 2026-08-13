# Plano de Implementação: Experiência Fullscreen PWA no Veritas Pericial

Este plano visa configurar o Veritas Pericial para abrir e operar como um aplicativo nativo em tela cheia quando instalado como PWA, eliminando barras de navegação do browser e respeitando as áreas seguras do dispositivo.

## Alterações Técnicas

### 1. Configuração do PWA (`vite.config.ts`)
- Alterar `display` para `fullscreen` no manifest.
- Adicionar `display_override: ["fullscreen", "standalone"]` para garantir fallback.
- Validar `start_url`, `scope` e `orientation`.

### 2. Metadados e Estilo (`src/routes/__root.tsx`)
- Garantir `viewport-fit=cover` na meta tag viewport.
- Configurar `theme-color` e metadados Apple (`apple-mobile-web-app-capable`, status bar style).

### 3. Hook de Detecção e Gestão de Fullscreen (`src/hooks/use-pwa-mode.ts`)
- Criar hook para detectar se o app está rodando em modo `browser`, `standalone` ou `fullscreen`.
- Implementar função `requestFullscreen` com fallback seguro, disparada por interação do usuário.

### 4. Componente de UI para Modo Navegador (`src/components/veritas/PWABrowserNotice.tsx`)
- Criar um aviso discreto para usuários que acessam via navegador, sugerindo o uso da versão instalada para melhor experiência.

### 5. Integração na Interface
- **Splash/Login:** Adicionar lógica para solicitar fullscreen na primeira interação (ex: botão "Entrar").
- **BottomNavigation:** Revisar padding inferior para garantir que respeite o `safe-area-inset-bottom`.
- **Layout Global:** Revisar o uso de `h-screen` vs `h-[100dvh]` para evitar problemas com barras dinâmicas.

### 6. Validação e Build
- Executar `npm run build` para validar integridade.
- Adicionar ferramenta temporária de debug para visualizar o `display-mode` atual durante os testes.

## User Review Required

> [!IMPORTANT]
> A alteração do `display` no manifest PWA geralmente exige que o usuário **remova o aplicativo instalado anteriormente e o instale novamente** para que o sistema operacional aplique as novas configurações de tela cheia.

## Relatório de Conclusão (após implementação)
Será fornecido um relatório detalhado com os arquivos alterados e os resultados observados em Android/iOS.
