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
import { Select, type SelectOption } from '@/components/library';

const SelectDocs = () => {
  const { t } = useLanguage();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);
  const [selectValue, setSelectValue] = React.useState("");
  
  const options: SelectOption[] = [
    { label: "React", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" }
  ];

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

  const examples = [
    {
      title: 'Exemplo Básico',
      code: `import { Select } from '@/components/library';

const options = [
  { label: "React", value: "react" },
  { label: "Vue.js", value: "vue" },
  { label: "Angular", value: "angular" }
];

function MyComponent() {
  const [value, setValue] = useState("");
  
  return (
    <Select
      label="Framework"
      options={options}
      value={value}
      onValueChange={setValue}
      placeholder="Escolha um framework..."
    />
  );
}`,
      component: (
        <Select
          label="Framework"
          options={options}
          value={selectValue}
          onValueChange={setSelectValue}
          placeholder="Escolha um framework..."
        />
      )
    }
  ];

  const props = [
    { name: 'label', type: 'string', description: 'Rótulo do campo' },
    { name: 'options', type: 'SelectOption[]', required: true, description: 'Array de opções disponíveis' },
    { name: 'value', type: 'string', description: 'Valor selecionado' },
    { name: 'onValueChange', type: '(value: string) => void', description: 'Callback chamado quando o valor muda' },
    { name: 'placeholder', type: 'string', description: 'Texto mostrado quando nenhuma opção está selecionada' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Se o campo está desabilitado' },
    { name: 'error', type: 'string', description: 'Mensagem de erro' },
    { name: 'success', type: 'string', description: 'Mensagem de sucesso' },
    { name: 'helper', type: 'string', description: 'Texto de ajuda' },
    { name: 'variant', type: '"default" | "filled" | "ghost"', default: '"default"', description: 'Estilo visual' },
    { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Tamanho do componente' }
  ];

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
            <h1 className="text-3xl font-bold">{t('component.select.title')}</h1>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Hero */}
        <div className="space-y-6 mb-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {t('component.select.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {t('component.select.description')}
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
                {t('common.import')} {t('component.select.title')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto">
                  <code className="text-sm">import &#123; Select &#125; from '@/components/library';</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard("import { Select } from '@/components/library';", 'import')}
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

          {/* Examples */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle>{t('common.examples')}</CardTitle>
              <CardDescription>
                Exemplos práticos de uso do componente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {examples.map((example, index) => (
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
                    {example.component}
                  </div>
                  
                  {/* Code */}
                  <div className="relative">
                    <pre className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto">
                      <code className="text-sm whitespace-pre-wrap">{example.code}</code>
                    </pre>
                  </div>
                  
                  {index < examples.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>

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
                    {props.map((prop) => (
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

export default SelectDocs;