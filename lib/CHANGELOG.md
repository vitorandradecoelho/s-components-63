# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Adicionado
- Novos componentes em desenvolvimento

### Alterado
- Melhorias de performance

### Corrigido
- Correções de bugs menores

## [1.0.0] - 2024-01-15

### Adicionado
- ✨ Versão inicial da biblioteca @formify/essentials
- 🎯 13 componentes fundamentais:
  - Input - Campo de entrada com validação
  - Select - Seletor dropdown
  - TextField - Área de texto expandida
  - RadioButton - Botões de opção
  - CheckBox - Caixas de seleção
  - DataTable - Tabela de dados
  - ComboBox - Campo com autocomplete
  - FileUpload - Upload de arquivos
  - LightBox - Modal/overlay
  - FormModal - Modal para formulários
  - Alert - Componente de alertas
  - Toast - Notificações temporárias
  - SweetAlert - Alertas interativos

- 🎨 Design system completo com:
  - Tokens CSS customizáveis
  - Suporte a tema claro/escuro
  - Variantes de componentes
  - Animações suaves

- 📚 Documentação completa
- 🔧 Configuração TypeScript
- 📦 Build otimizado com Rollup
- 🧪 Tipos TypeScript incluídos

### Notas Técnicas
- Baseado em React 18+
- Utiliza Tailwind CSS para estilização
- Radix UI para componentes primitivos
- Bundle ESM e CommonJS
- Peer dependencies: react, react-dom