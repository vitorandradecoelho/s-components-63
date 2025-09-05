import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { SweetAlert, useSweetAlert, type SweetAlertType } from '@/components/library/SweetAlert';
import { 
  ArrowLeft, 
  Copy, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  HelpCircle,
  Sparkles,
  Zap,
  Shield
} from 'lucide-react';

const SweetAlertDocs = () => {
  const { t } = useLanguage();
  const { fire, SweetAlert: SweetAlertComponent } = useSweetAlert();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleBasicAlert = () => {
    fire({
      title: t('sweetalert.example.basic.title'),
      text: t('sweetalert.example.basic.text'),
      type: 'question',
      onConfirm: () => {
        fire({
          title: t('sweetalert.example.confirmed.title'),
          type: 'success',
          showCancelButton: false
        });
      }
    });
  };

  const handleTypeAlert = (type: SweetAlertType) => {
    fire({
      title: t(`sweetalert.example.${type}.title`),
      text: t(`sweetalert.example.${type}.text`),
      type,
      showCancelButton: false
    });
  };

  const handleInputAlert = () => {
    fire({
      title: t('sweetalert.example.input.title'),
      text: t('sweetalert.example.input.text'),
      showInput: true,
      inputPlaceholder: t('sweetalert.example.input.placeholder'),
      onConfirm: (inputValue) => {
        if (inputValue) {
          fire({
            title: t('sweetalert.example.input.success'),
            text: `${t('sweetalert.example.input.entered')}: ${inputValue}`,
            type: 'success',
            showCancelButton: false
          });
        }
      }
    });
  };

  const handleAsyncAlert = () => {
    fire({
      title: t('sweetalert.example.async.title'),
      text: t('sweetalert.example.async.text'),
      type: 'warning',
      confirmButtonText: t('sweetalert.example.async.confirm'),
      onConfirm: async () => {
        // Simular operação assíncrona
        await new Promise(resolve => setTimeout(resolve, 2000));
        fire({
          title: t('sweetalert.example.async.success'),
          type: 'success',
          showCancelButton: false
        });
      }
    });
  };

  const basicExample = `import { useSweetAlert } from '@/components/library/SweetAlert';

const MyComponent = () => {
  const { fire, SweetAlert } = useSweetAlert();

  const handleClick = () => {
    fire({
      title: '${t('sweetalert.example.basic.title')}',
      text: '${t('sweetalert.example.basic.text')}',
      type: 'question',
      onConfirm: () => {
        console.log('Confirmed!');
      }
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Show Alert</button>
      <SweetAlert />
    </div>
  );
};`;

  const typesExample = `// Different alert types
fire({ type: 'success', title: 'Success!' });
fire({ type: 'error', title: 'Error!' });
fire({ type: 'warning', title: 'Warning!' });
fire({ type: 'info', title: 'Info!' });
fire({ type: 'question', title: 'Question?' });`;

  const inputExample = `fire({
  title: '${t('sweetalert.example.input.title')}',
  showInput: true,
  inputPlaceholder: '${t('sweetalert.example.input.placeholder')}',
  onConfirm: (inputValue) => {
    console.log('Input value:', inputValue);
  }
});`;

  const asyncExample = `fire({
  title: '${t('sweetalert.example.async.title')}',
  type: 'warning',
  onConfirm: async () => {
    // Async operation
    await fetch('/api/delete');
    fire({ title: 'Deleted!', type: 'success' });
  }
});`;

  const features = [
    {
      icon: Sparkles,
      title: t('sweetalert.features.beautiful'),
      description: t('sweetalert.features.beautiful.desc')
    },
    {
      icon: Zap,
      title: t('sweetalert.features.interactive'),
      description: t('sweetalert.features.interactive.desc')
    },
    {
      icon: Shield,
      title: t('sweetalert.features.accessible'),
      description: t('sweetalert.features.accessible.desc')
    }
  ];

  const apiProps = [
    { prop: 'title', type: 'string', default: '"Are you sure?"', description: t('sweetalert.prop.title') },
    { prop: 'text', type: 'string', default: 'undefined', description: t('sweetalert.prop.text') },
    { prop: 'type', type: 'SweetAlertType', default: '"question"', description: t('sweetalert.prop.type') },
    { prop: 'showCancelButton', type: 'boolean', default: 'true', description: t('sweetalert.prop.showCancelButton') },
    { prop: 'confirmButtonText', type: 'string', default: '"OK"', description: t('sweetalert.prop.confirmButtonText') },
    { prop: 'cancelButtonText', type: 'string', default: '"Cancel"', description: t('sweetalert.prop.cancelButtonText') },
    { prop: 'showInput', type: 'boolean', default: 'false', description: t('sweetalert.prop.showInput') },
    { prop: 'inputPlaceholder', type: 'string', default: '""', description: t('sweetalert.prop.inputPlaceholder') },
    { prop: 'onConfirm', type: 'function', default: 'undefined', description: t('sweetalert.prop.onConfirm') },
    { prop: 'onCancel', type: 'function', default: 'undefined', description: t('sweetalert.prop.onCancel') }
  ];

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container max-w-6xl mx-auto px-6 py-12">
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
            <h1 className="text-3xl font-bold">{t('component.sweetalert.title')}</h1>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Hero */}
        <div className="text-center space-y-6 mb-12">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {t('sweetalert.hero.title')}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('sweetalert.hero.subtitle')}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="gradient-card border-card-border text-center">
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    <div className="p-3 bg-primary/10 text-primary rounded-lg">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="examples" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="examples">{t('common.examples')}</TabsTrigger>
            <TabsTrigger value="installation">{t('common.installation')}</TabsTrigger>
            <TabsTrigger value="api">{t('common.props')}</TabsTrigger>
            <TabsTrigger value="usage">{t('common.usage')}</TabsTrigger>
          </TabsList>

          {/* Examples */}
          <TabsContent value="examples" className="space-y-8">
            {/* Basic Example */}
            <Card className="gradient-card border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-purple-500" />
                  {t('sweetalert.examples.basic.title')}
                </CardTitle>
                <CardDescription>
                  {t('sweetalert.examples.basic.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button onClick={handleBasicAlert}>
                    {t('sweetalert.examples.basic.button')}
                  </Button>
                </div>
                
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{basicExample}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(basicExample, 'basic')}
                  >
                    {copiedCode === 'basic' ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Types Example */}
            <Card className="gradient-card border-card-border">
              <CardHeader>
                <CardTitle>{t('sweetalert.examples.types.title')}</CardTitle>
                <CardDescription>
                  {t('sweetalert.examples.types.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => handleTypeAlert('success')} className="bg-green-500 hover:bg-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Success
                  </Button>
                  <Button onClick={() => handleTypeAlert('error')} className="bg-red-500 hover:bg-red-600">
                    <XCircle className="h-4 w-4 mr-2" />
                    Error
                  </Button>
                  <Button onClick={() => handleTypeAlert('warning')} className="bg-yellow-500 hover:bg-yellow-600">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Warning
                  </Button>
                  <Button onClick={() => handleTypeAlert('info')} className="bg-blue-500 hover:bg-blue-600">
                    <Info className="h-4 w-4 mr-2" />
                    Info
                  </Button>
                  <Button onClick={() => handleTypeAlert('question')} className="bg-purple-500 hover:bg-purple-600">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Question
                  </Button>
                </div>
                
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{typesExample}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(typesExample, 'types')}
                  >
                    {copiedCode === 'types' ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Input Example */}
            <Card className="gradient-card border-card-border">
              <CardHeader>
                <CardTitle>{t('sweetalert.examples.input.title')}</CardTitle>
                <CardDescription>
                  {t('sweetalert.examples.input.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={handleInputAlert}>
                  {t('sweetalert.examples.input.button')}
                </Button>
                
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{inputExample}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(inputExample, 'input')}
                  >
                    {copiedCode === 'input' ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Async Example */}
            <Card className="gradient-card border-card-border">
              <CardHeader>
                <CardTitle>{t('sweetalert.examples.async.title')}</CardTitle>
                <CardDescription>
                  {t('sweetalert.examples.async.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={handleAsyncAlert} variant="destructive">
                  {t('sweetalert.examples.async.button')}
                </Button>
                
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{asyncExample}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(asyncExample, 'async')}
                  >
                    {copiedCode === 'async' ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Installation */}
          <TabsContent value="installation">
            <Card className="gradient-card border-card-border">
              <CardHeader>
                <CardTitle>{t('common.installation')}</CardTitle>
                <CardDescription>
                  {t('sweetalert.installation.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`import { SweetAlert, useSweetAlert } from '@/components/library/SweetAlert';`}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(`import { SweetAlert, useSweetAlert } from '@/components/library/SweetAlert';`, 'install')}
                  >
                    {copiedCode === 'install' ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Reference */}
          <TabsContent value="api">
            <Card className="gradient-card border-card-border">
              <CardHeader>
                <CardTitle>{t('api.title')}</CardTitle>
                <CardDescription>
                  {t('sweetalert.api.subtitle')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('api.property')}</TableHead>
                      <TableHead>{t('api.type')}</TableHead>
                      <TableHead>{t('api.default')}</TableHead>
                      <TableHead>{t('api.description')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiProps.map((prop, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono text-sm">{prop.prop}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{prop.type}</Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{prop.default}</TableCell>
                        <TableCell>{prop.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Usage */}
          <TabsContent value="usage">
            <Card className="gradient-card border-card-border">
              <CardHeader>
                <CardTitle>{t('common.usage')}</CardTitle>
                <CardDescription>
                  {t('sweetalert.usage.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">{t('sweetalert.usage.hook.title')}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{t('sweetalert.usage.hook.desc')}</p>
                    <div className="relative">
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{`const { fire, SweetAlert } = useSweetAlert();

// Use fire() to show alerts
fire({ title: 'Hello!', type: 'success' });

// Don't forget to render the component
return <div><SweetAlert /></div>;`}</code>
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">{t('sweetalert.usage.component.title')}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{t('sweetalert.usage.component.desc')}</p>
                    <div className="relative">
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{`const [isOpen, setIsOpen] = useState(false);

<SweetAlert
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  title="Custom Alert"
  type="warning"
/>`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <SweetAlertComponent />
      </div>
    </div>
  );
};

export default SweetAlertDocs;