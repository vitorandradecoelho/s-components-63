import React, { useState } from "react";
import { ComboBox, type ComboOption } from "@/components/library";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy, ExternalLink, Globe, Package, Download, FolderOpen, Server, Cloud, GitBranch } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Link } from "react-router-dom";

const ComboBoxDocs = () => {
  const { t } = useLanguage();
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const countries: ComboOption[] = [
    { label: "Brasil", value: "BR", description: "República Federativa do Brasil" },
    { label: "Estados Unidos", value: "US", description: "United States of America" },
    { label: "Argentina", value: "AR", description: "República Argentina" },
    { label: "Chile", value: "CL", description: "República de Chile" },
    { label: "México", value: "MX", description: "Estados Unidos Mexicanos" },
  ];

  const frameworks: ComboOption[] = [
    { label: "React", value: "react", description: "A JavaScript library for building user interfaces" },
    { label: "Vue.js", value: "vue", description: "The Progressive JavaScript Framework" },
    { label: "Angular", value: "angular", description: "Platform for building mobile and desktop web applications" },
    { label: "Svelte", value: "svelte", description: "Cybernetically enhanced web apps" },
    { label: "Next.js", value: "nextjs", description: "The React Framework for Production" },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t('btn.copied'));
  };

  const codeExamples = {
    basic: `import { ComboBox } from '@/components/library';

const options = [
  { label: "React", value: "react" },
  { label: "Vue.js", value: "vue" },
  { label: "Angular", value: "angular" }
];

function MyComponent() {
  const [value, setValue] = useState([]);
  
  return (
    <ComboBox
      options={options}
      value={value}
      onValueChange={setValue}
      placeholder="Select a framework..."
    />
  );
}`,

    multiple: `<ComboBox
  options={countries}
  value={selectedCountries}
  onValueChange={setSelectedCountries}
  multiple
  placeholder="Select countries..."
  maxItems={3}
/>`,

    withUrl: `<ComboBox
  fetchUrl="https://api.example.com/users"
  fetchHeaders={{ Authorization: "Bearer token" }}
  labelKey="name"
  valueKey="id"
  descriptionKey="email"
  placeholder="Search users..."
  onFetchError={(error) => console.error(error)}
/>`,

    npmInstall: `# Instalação via NPM
npm install @your-org/combobox-library

# ou via Yarn
yarn add @your-org/combobox-library

# Import no projeto
import { ComboBox } from '@your-org/combobox-library';
import '@your-org/combobox-library/dist/styles.css';`,

    bucketInstall: `// Via S3 Bucket ou CDN
// 1. Host da biblioteca em bucket S3
aws s3 cp ./dist/combobox-lib.js s3://my-bucket/libs/
aws s3 cp ./dist/combobox-lib.css s3://my-bucket/libs/

// 2. Import via script tag
<script src="https://my-bucket.s3.amazonaws.com/libs/combobox-lib.js"></script>
<link rel="stylesheet" href="https://my-bucket.s3.amazonaws.com/libs/combobox-lib.css">

// 3. Use global variable
const { ComboBox } = window.ComponentLibrary;

// 4. Via dynamic import
const loadComboBox = async () => {
  const module = await import('https://my-bucket.s3.amazonaws.com/libs/combobox-lib.esm.js');
  return module.ComboBox;
};`,


    bitbucketInstall: `# Via Bitbucket Repository
# 1. Clone direto do Bitbucket
git clone https://bitbucket.org/your-workspace/combobox-library.git

# 2. Install via Git URL
npm install git+https://bitbucket.org/your-workspace/combobox-library.git

# 3. Via Bitbucket Pipelines (CI/CD)
# bitbucket-pipelines.yml
pipelines:
  default:
    - step:
        script:
          - npm install
          - npm run build
          - npm publish

# 4. Import no projeto
import { ComboBox } from '@your-workspace/combobox-library';

# 5. Via Bitbucket Downloads API
curl -u username:app_password \\
  https://api.bitbucket.org/2.0/repositories/workspace/repo/downloads/combobox-v1.0.0.tar.gz \\
  -o combobox-library.tar.gz`,

    localInstall: `# Clone do repositório
git clone https://github.com/your-org/combobox-library.git
cd combobox-library

# Instalação de dependências
npm install

# Build da biblioteca
npm run build

# Link para desenvolvimento local
npm link

# No seu projeto
npm link @your-org/combobox-library`,

    variants: `// Variantes de estilo
<ComboBox variant="default" />
<ComboBox variant="filled" />
<ComboBox variant="ghost" />

// Tamanhos
<ComboBox size="sm" />
<ComboBox size="md" />
<ComboBox size="lg" />`,

    withStates: `<ComboBox
  options={options}
  error="Este campo é obrigatório"
  helper="Escolha uma opção da lista"
  success="Seleção válida!"
/>`
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/" className="gap-2">
                ← {t('nav.home')}
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <h2 className="text-lg font-medium">{t('nav.combobox')}</h2>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Installation Methods */}
        <div className="mb-8 space-y-6">
          <Card className="gradient-card border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                {t('install.title')}
              </CardTitle>
              <CardDescription>
                {t('install.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {/* NPM Installation */}
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      {t('install.npm.title')}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {t('install.npm.desc')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-3 rounded-lg relative">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => copyToClipboard(codeExamples.npmInstall)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <pre className="text-xs overflow-x-auto">
                        <code>{codeExamples.npmInstall}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                {/* Bucket/CDN Installation */}
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Cloud className="h-4 w-4" />
                      {t('install.cdn.title')}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {t('install.cdn.desc')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-3 rounded-lg relative">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => copyToClipboard(codeExamples.bucketInstall)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <pre className="text-xs overflow-x-auto">
                        <code>{codeExamples.bucketInstall}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                {/* Bitbucket Installation */}
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <GitBranch className="h-4 w-4" />
                      {t('install.bitbucket.title')}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {t('install.bitbucket.desc')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-3 rounded-lg relative">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => copyToClipboard(codeExamples.bitbucketInstall)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <pre className="text-xs overflow-x-auto">
                        <code>{codeExamples.bitbucketInstall}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                {/* Local Installation */}
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <FolderOpen className="h-4 w-4" />
                      {t('install.local.title')}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {t('install.local.desc')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-3 rounded-lg relative">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => copyToClipboard(codeExamples.localInstall)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <pre className="text-xs overflow-x-auto">
                        <code>{codeExamples.localInstall}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Start */}
        <Card className="mb-8 gradient-card border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🚀</span> {t('quickstart.title')}
            </CardTitle>
            <CardDescription>
              {t('quickstart.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 p-4 rounded-lg relative">
              <Button 
                size="sm" 
                variant="ghost" 
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard("import { ComboBox, type ComboOption } from '@/components/library';")}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <code className="text-sm">
                {`import { ComboBox, type ComboOption } from '@/components/library';`}
              </code>
            </div>
          </CardContent>
        </Card>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Basic Example */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>{t('examples.basic.title')}</CardTitle>
              <CardDescription>
                {t('examples.basic.desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ComboBox
                options={frameworks}
                value={selectedFrameworks}
                onValueChange={setSelectedFrameworks}
                placeholder={t('label.select.framework')}
                label={t('label.framework')}
              />
              
              <div className="bg-muted/30 p-3 rounded-lg">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="float-right mb-2"
                  onClick={() => copyToClipboard(codeExamples.basic)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <pre className="text-xs overflow-x-auto">
                  <code>{codeExamples.basic}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Multiple Selection */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>{t('examples.multiple.title')}</CardTitle>
              <CardDescription>
                {t('examples.multiple.desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ComboBox
                options={countries}
                value={selectedCountries}
                onValueChange={setSelectedCountries}
                multiple
                placeholder={t('label.select.countries')}
                label={t('label.countries')}
                maxItems={3}
              />
              
              <div className="bg-muted/30 p-3 rounded-lg">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="float-right mb-2"
                  onClick={() => copyToClipboard(codeExamples.multiple)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <pre className="text-xs overflow-x-auto">
                  <code>{codeExamples.multiple}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* URL Fetch */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                {t('examples.api.title')}
              </CardTitle>
              <CardDescription>
                {t('examples.api.desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ComboBox
                fetchUrl="https://jsonplaceholder.typicode.com/users"
                labelKey="name"
                valueKey="id"
                descriptionKey="email"
                value={selectedUsers}
                onValueChange={setSelectedUsers}
                placeholder={t('label.select.users')}
                label={t('label.users')}
                helper={t('helper.api.data')}
              />
              
              <div className="bg-muted/30 p-3 rounded-lg">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="float-right mb-2"
                  onClick={() => copyToClipboard(codeExamples.withUrl)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <pre className="text-xs overflow-x-auto">
                  <code>{codeExamples.withUrl}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Variants */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>{t('examples.variants.title')}</CardTitle>
              <CardDescription>
                {t('examples.variants.desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Default</label>
                  <ComboBox options={frameworks.slice(0, 2)} variant="default" size="sm" />
                </div>
                <div>
                  <label className="text-sm font-medium">Filled</label>
                  <ComboBox options={frameworks.slice(0, 2)} variant="filled" size="md" />
                </div>
                <div>
                  <label className="text-sm font-medium">Ghost</label>
                  <ComboBox options={frameworks.slice(0, 2)} variant="ghost" size="lg" />
                </div>
              </div>
              
              <div className="bg-muted/30 p-3 rounded-lg">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="float-right mb-2"
                  onClick={() => copyToClipboard(codeExamples.variants)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <pre className="text-xs overflow-x-auto">
                  <code>{codeExamples.variants}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* API Reference */}
        <Card className="mb-8 gradient-card border-0 shadow-xl">
          <CardHeader>
            <CardTitle>{t('api.title')}</CardTitle>
            <CardDescription>
              {t('api.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-medium">{t('api.property')}</th>
                    <th className="text-left p-3 font-medium">{t('api.type')}</th>
                    <th className="text-left p-3 font-medium">{t('api.default')}</th>
                    <th className="text-left p-3 font-medium">{t('api.description')}</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="p-3"><code>options</code></td>
                    <td className="p-3"><code>ComboOption[]</code></td>
                    <td className="p-3"><code>[]</code></td>
                    <td className="p-3">{t('prop.options')}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3"><code>fetchUrl</code></td>
                    <td className="p-3"><code>string</code></td>
                    <td className="p-3"><code>undefined</code></td>
                    <td className="p-3">{t('prop.fetchUrl')}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3"><code>multiple</code></td>
                    <td className="p-3"><code>boolean</code></td>
                    <td className="p-3"><code>false</code></td>
                    <td className="p-3">{t('prop.multiple')}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3"><code>searchable</code></td>
                    <td className="p-3"><code>boolean</code></td>
                    <td className="p-3"><code>true</code></td>
                    <td className="p-3">{t('prop.searchable')}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3"><code>variant</code></td>
                    <td className="p-3"><code>"default" | "filled" | "ghost"</code></td>
                    <td className="p-3"><code>"default"</code></td>
                    <td className="p-3">{t('prop.variant')}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3"><code>size</code></td>
                    <td className="p-3"><code>"sm" | "md" | "lg"</code></td>
                    <td className="p-3"><code>"md"</code></td>
                    <td className="p-3">{t('prop.size')}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3"><code>labelKey</code></td>
                    <td className="p-3"><code>string</code></td>
                    <td className="p-3"><code>"label"</code></td>
                    <td className="p-3">{t('prop.labelKey')}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3"><code>valueKey</code></td>
                    <td className="p-3"><code>string</code></td>
                    <td className="p-3"><code>"value"</code></td>
                    <td className="p-3">{t('prop.valueKey')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="gradient-card border-0 shadow-xl">
          <CardHeader>
            <CardTitle>{t('features.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-1">✨</Badge>
                <div>
                  <h4 className="font-medium">{t('features.multiple')}</h4>
                  <p className="text-sm text-muted-foreground">{t('features.multiple.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-1">🔍</Badge>
                <div>
                  <h4 className="font-medium">{t('features.search')}</h4>
                  <p className="text-sm text-muted-foreground">{t('features.search.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-1">🌐</Badge>
                <div>
                  <h4 className="font-medium">{t('features.remote')}</h4>
                  <p className="text-sm text-muted-foreground">{t('features.remote.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-1">🎨</Badge>
                <div>
                  <h4 className="font-medium">{t('features.customizable')}</h4>
                  <p className="text-sm text-muted-foreground">{t('features.customizable.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-1">♿</Badge>
                <div>
                  <h4 className="font-medium">{t('features.accessible')}</h4>
                  <p className="text-sm text-muted-foreground">{t('features.accessible.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-1">⚡</Badge>
                <div>
                  <h4 className="font-medium">{t('features.performance')}</h4>
                  <p className="text-sm text-muted-foreground">{t('features.performance.desc')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComboBoxDocs;