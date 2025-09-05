import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Copy, Check, Code2, Palette, Zap } from 'lucide-react';
import { toast } from 'sonner';
import LinhaTrajetoSelectorDocs from './library/docs/LinhaTrajetoSelectorDocs';

interface ComponentDocsProps {
  componentName: keyof typeof componentConfigs;
}

interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface ExampleConfig {
  title: string;
  code: string;
  component: React.ReactNode;
}

interface ComponentConfig {
  importStatement: string;
  description: string;
  props: PropDefinition[];
  examples: ExampleConfig[];
  features?: string[];
}

const componentConfigs = {
  input: {
    importStatement: "import { Input } from '@/components/library';",
    description: 'Campo de entrada de texto com suporte a ícones, estados e validação',
    props: [
      { name: 'label', type: 'string', description: 'Rótulo do campo' },
      { name: 'placeholder', type: 'string', description: 'Texto de placeholder' },
      { name: 'value', type: 'string', description: 'Valor atual do input' },
      { name: 'onChange', type: '(e: ChangeEvent) => void', description: 'Callback de mudança' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Se o campo está desabilitado' },
      { name: 'error', type: 'string', description: 'Mensagem de erro' },
      { name: 'success', type: 'string', description: 'Mensagem de sucesso' },
      { name: 'helper', type: 'string', description: 'Texto de ajuda' },
      { name: 'variant', type: '"default" | "filled" | "ghost"', default: '"default"', description: 'Estilo visual' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Tamanho do componente' },
      { name: 'leftIcon', type: 'ReactNode', description: 'Ícone à esquerda' },
      { name: 'rightIcon', type: 'ReactNode', description: 'Ícone à direita' }
    ],
    examples: [
      {
        title: 'Exemplo Básico',
        code: `<Input
  label="Nome"
  placeholder="Digite seu nome..."
  onChange={(e) => console.log(e.target.value)}
/>`,
        component: React.createElement('div', { className: 'text-center py-4' }, 'Exemplo em desenvolvimento')
      }
    ],
    features: ['Ícones personalizáveis', 'Estados de validação', 'Múltiplas variantes', 'Acessibilidade completa']
  },

  textfield: {
    importStatement: "import { TextField } from '@/components/library';",
    description: 'Área de texto multi-linha com redimensionamento e validação',
    props: [
      { name: 'label', type: 'string', description: 'Rótulo do campo' },
      { name: 'placeholder', type: 'string', description: 'Texto de placeholder' },
      { name: 'value', type: 'string', description: 'Valor atual do textarea' },
      { name: 'onChange', type: '(e: ChangeEvent) => void', description: 'Callback de mudança' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Se o campo está desabilitado' },
      { name: 'error', type: 'string', description: 'Mensagem de erro' },
      { name: 'success', type: 'string', description: 'Mensagem de sucesso' },
      { name: 'helper', type: 'string', description: 'Texto de ajuda' },
      { name: 'variant', type: '"default" | "filled" | "ghost"', default: '"default"', description: 'Estilo visual' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Tamanho do componente' },
      { name: 'resize', type: '"none" | "vertical" | "horizontal" | "both"', default: '"vertical"', description: 'Tipo de redimensionamento' },
      { name: 'rows', type: 'number', default: '4', description: 'Número de linhas visíveis' }
    ],
    examples: [
      {
        title: 'Exemplo Básico',
        code: `<TextField
  label="Descrição"
  placeholder="Digite uma descrição..."
  rows={6}
  onChange={(e) => console.log(e.target.value)}
/>`,
        component: React.createElement('div', { className: 'text-center py-4' }, 'Exemplo de TextField em desenvolvimento')
      },
      {
        title: 'Com Estados',
        code: `<TextField
  label="Comentário"
  placeholder="Deixe seu comentário..."
  helper="Máximo de 500 caracteres"
  variant="filled"
  size="lg"
/>

<TextField
  label="Feedback"
  value="Excelente produto!"
  success="Comentário salvo com sucesso!"
  variant="default"
/>

<TextField
  label="Observações"
  error="Este campo é obrigatório"
  variant="default"
/>`,
        component: React.createElement('div', { className: 'text-center py-4' }, 'Exemplos de estados em desenvolvimento')
      }
    ],
    features: ['Redimensionamento configurável', 'Estados de validação', 'Múltiplas variantes', 'Controle de linhas']
  },

  radiobutton: {
    importStatement: "import { RadioButton } from '@/components/library';",
    description: 'Botões de opção para seleção única com suporte a orientação e variantes',
    props: [
      { name: 'options', type: 'RadioOption[]', required: true, description: 'Array de opções disponíveis' },
      { name: 'value', type: 'string', description: 'Valor selecionado atual' },
      { name: 'onValueChange', type: '(value: string) => void', description: 'Callback de mudança de valor' },
      { name: 'name', type: 'string', required: true, description: 'Nome do grupo de radio buttons' },
      { name: 'label', type: 'string', description: 'Rótulo do grupo' },
      { name: 'error', type: 'string', description: 'Mensagem de erro' },
      { name: 'success', type: 'string', description: 'Mensagem de sucesso' },
      { name: 'helper', type: 'string', description: 'Texto de ajuda' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Se o grupo está desabilitado' },
      { name: 'orientation', type: '"vertical" | "horizontal"', default: '"vertical"', description: 'Orientação das opções' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Tamanho dos radio buttons' },
      { name: 'variant', type: '"default" | "card"', default: '"default"', description: 'Estilo visual' }
    ],
    examples: [
      {
        title: 'Exemplo Básico',
        code: `const options = [
  { label: 'Opção 1', value: 'option1' },
  { label: 'Opção 2', value: 'option2' },
  { label: 'Opção 3', value: 'option3' }
];

<RadioButton
  name="exemplo"
  label="Selecione uma opção"
  options={options}
  value={selectedValue}
  onValueChange={setSelectedValue}
/>`,
        component: React.createElement('div', { className: 'text-center py-4' }, 'Exemplo de RadioButton em desenvolvimento')
      },
      {
        title: 'Variante Card',
        code: `<RadioButton
  name="planos"
  label="Escolha seu plano"
  variant="card"
  orientation="horizontal"
  options={[
    { 
      label: 'Básico', 
      value: 'basic',
      description: 'Ideal para iniciantes'
    },
    { 
      label: 'Pro', 
      value: 'pro',
      description: 'Para usuários avançados'
    }
  ]}
/>`,
        component: React.createElement('div', { className: 'text-center py-4' }, 'Variante card em desenvolvimento')
      }
    ],
    features: ['Orientação horizontal/vertical', 'Variante card', 'Descrições opcionais', 'Estados de validação']
  },

  checkbox: {
    importStatement: "import { CheckBox } from '@/components/library';",
    description: 'Caixas de seleção com estados personalizados e suporte a indeterminado',
    props: [
      { name: 'label', type: 'string', description: 'Rótulo da checkbox' },
      { name: 'description', type: 'string', description: 'Descrição adicional' },
      { name: 'checked', type: 'boolean', description: 'Estado de seleção' },
      { name: 'onChange', type: '(e: ChangeEvent) => void', description: 'Callback de mudança' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Se está desabilitada' },
      { name: 'error', type: 'string', description: 'Mensagem de erro' },
      { name: 'success', type: 'string', description: 'Mensagem de sucesso' },
      { name: 'helper', type: 'string', description: 'Texto de ajuda' },
      { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Estado indeterminado' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Tamanho da checkbox' },
      { name: 'variant', type: '"default" | "card"', default: '"default"', description: 'Estilo visual' }
    ],
    examples: [
      {
        title: 'Exemplo Básico',
        code: `<CheckBox
  label="Aceito os termos de uso"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>

<CheckBox
  label="Receber notificações"
  description="Receba atualizações sobre novos recursos"
  checked={notifications}
  onChange={(e) => setNotifications(e.target.checked)}
/>`,
        component: React.createElement('div', { className: 'text-center py-4' }, 'Exemplo de CheckBox em desenvolvimento')
      },
      {
        title: 'Estados Especiais',
        code: `<CheckBox
  label="Estado indeterminado"
  indeterminate={true}
  helper="Algumas opções selecionadas"
/>

<CheckBox
  label="Checkbox desabilitada"
  checked={true}
  disabled={true}
/>

<CheckBox
  label="Com erro"
  error="Este campo é obrigatório"
/>`,
        component: React.createElement('div', { className: 'text-center py-4' }, 'Estados especiais em desenvolvimento')
      }
    ],
    features: ['Estado indeterminado', 'Variante card', 'Descrições opcionais', 'Estados de validação']
  },

  datatable: {
    importStatement: "import { DataTable, type TableColumn } from '@/components/library';",
    description: 'Tabela de dados com paginação, ordenação e filtragem avançada',
    props: [
      { name: 'data', type: 'T[]', required: true, description: 'Array de dados para exibir' },
      { name: 'columns', type: 'TableColumn<T>[]', required: true, description: 'Configuração das colunas' },
      { name: 'pageSize', type: 'number', default: '10', description: 'Número de itens por página' },
      { name: 'currentPage', type: 'number', default: '1', description: 'Página atual' },
      { name: 'onPageChange', type: '(page: number) => void', description: 'Callback de mudança de página' },
      { name: 'sortKey', type: 'keyof T', description: 'Chave da coluna ordenada' },
      { name: 'sortDirection', type: '"asc" | "desc"', description: 'Direção da ordenação' },
      { name: 'onSort', type: '(key: keyof T, direction: "asc" | "desc") => void', description: 'Callback de ordenação' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Estado de carregamento' },
      { name: 'emptyMessage', type: 'string', default: '"Nenhum dado encontrado"', description: 'Mensagem quando vazio' },
      { name: 'variant', type: '"default" | "striped" | "bordered"', default: '"default"', description: 'Estilo visual' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Tamanho da tabela' }
    ],
    examples: [
      {
        title: 'Exemplo Básico',
        code: `interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: TableColumn<User>[] = [
  { key: 'name', header: 'Nome', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Função', align: 'center' },
  {
    key: 'id',
    header: 'Ações',
    render: (_, user) => (
      <Button size="sm" onClick={() => editUser(user.id)}>
        Editar
      </Button>
    )
  }
];

<DataTable
  data={users}
  columns={columns}
  pageSize={5}
  currentPage={page}
  onPageChange={setPage}
  onSort={handleSort}
/>`,
        component: React.createElement('div', { className: 'text-center py-4' }, 'Exemplo de DataTable em desenvolvimento')
      },
      {
        title: 'Com Variantes',
        code: `<DataTable
  data={data}
  columns={columns}
  variant="striped"
  size="lg"
  loading={isLoading}
  emptyMessage="Nenhum usuário encontrado"
/>`,
        component: React.createElement('div', { className: 'text-center py-4' }, 'Variantes de tabela em desenvolvimento')
      }
    ],
    features: ['Paginação automática', 'Ordenação por colunas', 'Renderização personalizada', 'Estados de carregamento', 'Múltiplas variantes']
  },
  
  alert: {
    importStatement: "import { Alert } from '@/components/library';",
    description: 'Componente de alerta com diferentes variantes e ícones',
    props: [
      { name: 'variant', type: '"default" | "destructive" | "success" | "warning"', default: '"default"', description: 'Tipo do alerta' },
      { name: 'title', type: 'string', description: 'Título do alerta' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Conteúdo do alerta' },
      { name: 'className', type: 'string', description: 'Classes CSS adicionais' },
      { name: 'showIcon', type: 'boolean', default: 'true', description: 'Exibir ícone baseado na variante' }
    ],
    examples: [
      {
        title: 'Alertas Básicos',
        code: `<Alert variant="default" title="Informação">
  Este é um alerta informativo padrão.
</Alert>

<Alert variant="success" title="Sucesso">
  Operação realizada com sucesso!
</Alert>

<Alert variant="warning" title="Atenção">
  Verifique as informações antes de continuar.
</Alert>

<Alert variant="destructive" title="Erro">
  Ocorreu um erro ao processar sua solicitação.
</Alert>`,
        component: React.createElement('div', { className: 'space-y-4' }, 
          React.createElement('div', { className: 'text-center py-4 text-sm text-muted-foreground' }, 'Exemplos de Alert em desenvolvimento')
        )
      }
    ],
    features: ['Múltiplas variantes', 'Ícones automáticos', 'Título opcional', 'Totalmente personalizável']
  },
  
  toast: {
    importStatement: "import { Toast, useToastHelper } from '@/components/library';",
    description: 'Sistema de notificações temporárias com diferentes tipos',
    props: [
      { name: 'variant', type: '"default" | "destructive" | "success" | "warning"', default: '"default"', description: 'Tipo da notificação' },
      { name: 'title', type: 'string', description: 'Título da notificação' },
      { name: 'description', type: 'string', description: 'Descrição da notificação' },
      { name: 'duration', type: 'number', description: 'Duração em milissegundos (0 = nunca fechar)' }
    ],
    examples: [
      {
        title: 'Métodos Estáticos',
        code: `// Notificações rápidas
Toast.success("Dados salvos com sucesso!");
Toast.error("Erro ao salvar os dados.");
Toast.warning("Campos obrigatórios não preenchidos.");
Toast.info("Nova versão disponível.");

// Notificação customizada
Toast.show({
  variant: 'success',
  title: 'Sucesso',
  description: 'Operação realizada com sucesso!',
  duration: 5000
});`,
        component: React.createElement('div', { className: 'text-center py-4 text-sm text-muted-foreground' }, 'Sistema de Toast integrado')
      },
      {
        title: 'Hook useToastHelper',
        code: `const ExampleComponent = () => {
  const { success, error, warning, info } = useToastHelper();
  
  return (
    <div className="space-x-2">
      <Button onClick={() => success("Sucesso!")}>
        Sucesso
      </Button>
      <Button onClick={() => error("Erro!")}>
        Erro
      </Button>
      <Button onClick={() => warning("Atenção!")}>
        Aviso  
      </Button>
      <Button onClick={() => info("Info!")}>
        Info
      </Button>
    </div>
  );
};`,
        component: React.createElement('div', { className: 'text-center py-4 text-sm text-muted-foreground' }, 'Exemplo interativo do Toast')
      }
    ],
    features: ['Métodos estáticos', 'Hook personalizado', 'Múltiplas variantes', 'Duração configurável', 'Ícones automáticos']
  },
  
  linhatrajeto: {
    importStatement: "import { LinhaTrajetoSelector, type Linha, type Trajeto } from '@/components/library/LinhaTrajetoSelector';",
    description: 'Seletor duplo para linha e trajeto com cascata de dependência',
    props: [
      { name: 'linhas', type: 'Linha[]', required: true, description: 'Array de linhas disponíveis' },
      { name: 'selectedLinhaId', type: 'string', description: 'ID da linha selecionada' },
      { name: 'selectedTrajetoIds', type: 'string[]', description: 'Array de IDs dos trajetos selecionados' },
      { name: 'onLinhaChange', type: '(linha: Linha | null) => void', description: 'Callback para mudança de linha' },
      { name: 'onTrajetoChange', type: '(trajetos: Trajeto[]) => void', description: 'Callback para mudança de trajetos' },
      { name: 'linhaPlaceholder', type: 'string', default: '"Selecione uma linha"', description: 'Placeholder da linha' },
      { name: 'trajetoPlaceholder', type: 'string', default: '"Selecione trajetos"', description: 'Placeholder do trajeto' },
      { name: 'linhaLabel', type: 'string', default: '"Linha"', description: 'Label da linha' },
      { name: 'trajetoLabel', type: 'string', default: '"Trajeto"', description: 'Label do trajeto' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Se os seletores estão desabilitados' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Tamanho dos componentes' },
      { name: 'multiSelectTrajeto', type: 'boolean', default: 'true', description: 'Permite seleção múltipla de trajetos' },
      { name: 'className', type: 'string', description: 'Classes CSS adicionais' }
    ],
    examples: [
      {
        title: 'Exemplo Básico',
        code: `const [selectedLinhaId, setSelectedLinhaId] = useState('');
const [selectedTrajetoIds, setSelectedTrajetoIds] = useState<string[]>([]);

<LinhaTrajetoSelector
  linhas={linhas}
  selectedLinhaId={selectedLinhaId}
  selectedTrajetoIds={selectedTrajetoIds}
  onLinhaChange={(linha) => {
    setSelectedLinhaId(linha?._id || '');
  }}
  onTrajetoChange={(trajetos) => {
    setSelectedTrajetoIds(trajetos.map(t => t._id));
  }}
/>`,
        component: React.createElement('div', { className: 'text-center py-4 text-sm text-muted-foreground' }, 'Exemplo de LinhaTrajetoSelector em desenvolvimento')
      },
      {
        title: 'Personalizado',
        code: `<LinhaTrajetoSelector
  linhas={linhas}
  selectedLinhaId={selectedLinhaId}
  selectedTrajetoIds={selectedTrajetoIds}
  onLinhaChange={handleLinhaChange}
  onTrajetoChange={handleTrajetoChange}
  linhaPlaceholder="Escolha uma linha de ônibus..."
  trajetoPlaceholder="Escolha trajetos..."
  linhaLabel="Linha de Ônibus"
  trajetoLabel="Trajetos da Linha"
  size="lg"
  multiSelectTrajeto={true}
  className="space-y-6"
/>`,
        component: React.createElement('div', { className: 'text-center py-4 text-sm text-muted-foreground' }, 'Exemplo personalizado em desenvolvimento')
      }
    ],
    features: ['Seleção em cascata', 'Multi-seleção de trajetos', 'Busca e filtragem', 'Clear automático', 'Múltiplos tamanhos', 'Totalmente customizável']
  }
} as const;

const ComponentDocs: React.FC<ComponentDocsProps> = ({ componentName }) => {
  const { t } = useLanguage();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);
  
  const config = componentConfigs[componentName];

  const copyToClipboard = async (code: string, title: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(title);
      toast.success(t('btn.copied'));
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      toast.error('Erro ao copiar código');
    }
  };

  if (!config) {
    return (
      <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Componente não encontrado</CardTitle>
            <CardDescription>
              A documentação para "{componentName}" não está disponível.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/docs">Voltar à documentação</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/docs">
                <ArrowLeft className="h-4 w-4" />
                {t('nav.docs')}
              </Link>
            </Button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-3xl font-bold">{t(`component.${componentName}.title`)}</h1>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Hero */}
        <div className="space-y-6 mb-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {t(`component.${componentName}.title`)}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {t(`component.${componentName}.description`)}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full">
              <Code2 className="h-4 w-4" />
              TypeScript
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full">
              <Palette className="h-4 w-4" />
              Customizable
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full">
              <Zap className="h-4 w-4" />
              Accessible
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {/* Installation */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle>{t('common.installation')}</CardTitle>
              <CardDescription>
                {t('common.import')} {t(`component.${componentName}.title`)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto">
                  <code className="text-sm">{config.importStatement}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(config.importStatement, 'import')}
                >
                  {copiedCode === 'import' ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          {config.features && (
            <Card className="gradient-card border-card-border shadow-medium">
              <CardHeader>
                <CardTitle>Recursos Principais</CardTitle>
                <CardDescription>
                  Principais funcionalidades do componente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {config.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <Check className="h-4 w-4 text-success flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Examples */}
          {config.examples.length > 0 && (
            <Card className="gradient-card border-card-border shadow-medium">
              <CardHeader>
                <CardTitle>{t('common.examples')}</CardTitle>
                <CardDescription>
                  Exemplos práticos de uso do componente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {config.examples.map((example, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{example.title}</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(example.code, example.title)}
                      >
                        {copiedCode === example.title ? (
                          <>
                            <Check className="h-4 w-4 mr-2 text-success" />
                            Copiado!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            {t('btn.copy')}
                          </>
                        )}
                      </Button>
                    </div>
                    
                    {/* Live Example */}
                    <div className="p-6 bg-background border border-border rounded-lg">
                      {componentName === 'linhatrajeto' && index === 0 ? (
                        <LinhaTrajetoSelectorDocs />
                      ) : (
                        example.component
                      )}
                    </div>
                    
                    {/* Code */}
                    <div className="relative">
                      <pre className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto">
                        <code className="text-sm whitespace-pre-wrap">{example.code}</code>
                      </pre>
                    </div>
                    
                    {index < config.examples.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* API Reference */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle>{t('api.title')}</CardTitle>
              <CardDescription>
                {t('api.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 font-semibold">{t('api.property')}</th>
                      <th className="text-left py-3 font-semibold">{t('api.type')}</th>
                      <th className="text-left py-3 font-semibold">{t('api.default')}</th>
                      <th className="text-left py-3 font-semibold">{t('api.description')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {config.props.map((prop, index) => (
                    <tr key={prop.name} className="border-b border-border/50">
                       <td className="py-3 font-mono text-sm">
                         <div className="flex items-center gap-2">
                           {prop.name}
                           {'required' in prop && prop.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                         </div>
                       </td>
                      <td className="py-3 font-mono text-sm text-muted-foreground">
                        {prop.type}
                      </td>
                      <td className="py-3 font-mono text-sm text-muted-foreground">
                        {'default' in prop ? prop.default || '-' : '-'}
                      </td>
                      <td className="py-3 text-sm">
                        {prop.description}
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComponentDocs;