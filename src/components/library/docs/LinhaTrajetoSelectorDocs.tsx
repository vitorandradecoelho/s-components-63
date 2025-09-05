import React, { useState } from 'react';
import { LinhaTrajetoSelector, type Linha } from '../LinhaTrajetoSelector';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert } from '../Alert';
import { useToastHelper } from '../Toast';

// Dados de exemplo para demonstração
const sampleLinhas: Linha[] = [
  {
    "_id": "5e8e3bbf4be5542e43e539eb",
    "clienteId": 1314,
    "id_migracao": 3210,
    "descr": "01 - Esperança / Taboão",
    "numero": "01",
    "trajetos": [
      {
        "_id": "5e8e3bbf4be5542e43e539e9",
        "id_migracao": 8639,
        "externalId": "0",
        "nome": "01 - Esperança / Sentido Taboão",
        "colorIdx": 7,
        "qtdTransmisoesInicial": 1,
        "qtdTransmisoesFinal": 1,
        "percentConclusao": 90,
        "toleranciaArrasto": 5,
        "kmTrajeto": 17.51,
        "tempoMedioViagem": 80,
        "sentidoTipo": "P",
        "headwayCopiloto": 0,
        "orientacao": "N",
        "consorcioSinoticoUnificado": [],
        "garagem": [],
        "despachoSemCor": true,
        "ativo": true,
        "sentido": "ida",
        "codigosIntegracao": ["1"],
        "raioTrajeto": 100,
        "id": "5e8e3bbf4be5542e43e539e9"
      },
      {
        "_id": "5e8e3bbf4be5542e43e539ea",
        "id_migracao": 8640,
        "externalId": "0",
        "nome": "01 - Taboão / Sentido Esperança",
        "colorIdx": 3,
        "qtdTransmisoesInicial": 1,
        "qtdTransmisoesFinal": 1,
        "percentConclusao": 70,
        "toleranciaArrasto": 5,
        "kmTrajeto": 17.99,
        "tempoMedioViagem": 80,
        "sentidoTipo": "P",
        "headwayCopiloto": 0,
        "orientacao": "S",
        "consorcioSinoticoUnificado": [],
        "garagem": [],
        "despachoSemCor": true,
        "ativo": true,
        "sentido": "volta",
        "codigosIntegracao": ["1"],
        "raioTrajeto": 80,
        "id": "5e8e3bbf4be5542e43e539ea"
      }
    ],
    "id": "5e8e3bbf4be5542e43e539eb"
  },
  {
    "_id": "5e8e3bbf4be5542e43e539ec",
    "clienteId": 1314,
    "id_migracao": 3211,
    "descr": "02 - Centro / Vila Nova",
    "numero": "02",
    "trajetos": [
      {
        "_id": "5e8e3bbf4be5542e43e539ed",
        "id_migracao": 8641,
        "externalId": "0",
        "nome": "02 - Centro / Sentido Vila Nova",
        "colorIdx": 2,
        "qtdTransmisoesInicial": 1,
        "qtdTransmisoesFinal": 1,
        "percentConclusao": 85,
        "toleranciaArrasto": 3,
        "kmTrajeto": 12.8,
        "tempoMedioViagem": 65,
        "sentidoTipo": "P",
        "headwayCopiloto": 0,
        "orientacao": "N",
        "consorcioSinoticoUnificado": [],
        "garagem": [],
        "despachoSemCor": false,
        "ativo": true,
        "sentido": "ida",
        "codigosIntegracao": ["2"],
        "raioTrajeto": 90,
        "id": "5e8e3bbf4be5542e43e539ed"
      }
    ],
    "id": "5e8e3bbf4be5542e43e539ec"
  },
  {
    "_id": "5e8e3bbf4be5542e43e539ee",
    "clienteId": 1314,
    "id_migracao": 3212,
    "descr": "03 - Terminal / Shopping",
    "numero": "03",
    "trajetos": [
      {
        "_id": "5e8e3bbf4be5542e43e539ef",
        "id_migracao": 8642,
        "externalId": "0",
        "nome": "03 - Terminal / Sentido Shopping",
        "colorIdx": 1,
        "qtdTransmisoesInicial": 2,
        "qtdTransmisoesFinal": 2,
        "percentConclusao": 95,
        "toleranciaArrasto": 2,
        "kmTrajeto": 8.5,
        "tempoMedioViagem": 45,
        "sentidoTipo": "P",
        "headwayCopiloto": 0,
        "orientacao": "E",
        "consorcioSinoticoUnificado": [],
        "garagem": [],
        "despachoSemCor": false,
        "ativo": true,
        "sentido": "ida",
        "codigosIntegracao": ["3A"],
        "raioTrajeto": 75,
        "id": "5e8e3bbf4be5542e43e539ef"
      },
      {
        "_id": "5e8e3bbf4be5542e43e539f0",
        "id_migracao": 8643,
        "externalId": "0",
        "nome": "03 - Shopping / Sentido Terminal",
        "colorIdx": 1,
        "qtdTransmisoesInicial": 2,
        "qtdTransmisoesFinal": 2,
        "percentConclusao": 92,
        "toleranciaArrasto": 2,
        "kmTrajeto": 8.2,
        "tempoMedioViagem": 40,
        "sentidoTipo": "P",
        "headwayCopiloto": 0,
        "orientacao": "W",
        "consorcioSinoticoUnificado": [],
        "garagem": [],
        "despachoSemCor": false,
        "ativo": true,
        "sentido": "volta",
        "codigosIntegracao": ["3B"],
        "raioTrajeto": 75,
        "id": "5e8e3bbf4be5542e43e539f0"
      }
    ],
    "id": "5e8e3bbf4be5542e43e539ee"
  }
];

const LinhaTrajetoSelectorDocs: React.FC = () => {
  const { success } = useToastHelper();
  const [selectedLinhaId, setSelectedLinhaId] = useState<string>("");
  const [selectedTrajetoIds, setSelectedTrajetoIds] = useState<string[]>([]);
  const [selectedLinhaId2, setSelectedLinhaId2] = useState<string>("");
  const [selectedTrajetoIds2, setSelectedTrajetoIds2] = useState<string[]>([]);
  
  return (
    <div className="space-y-8">
      {/* Exemplo Básico */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Exemplo Básico
            <Badge>Interativo</Badge>
          </CardTitle>
          <CardDescription>
            Seleção simples de linha e trajeto com feedback visual
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <LinhaTrajetoSelector
            linhas={sampleLinhas}
            selectedLinhaId={selectedLinhaId}
            selectedTrajetoIds={selectedTrajetoIds}
            onLinhaChange={(linha) => {
              setSelectedLinhaId(linha?._id || '');
              success(`Linha selecionada: ${linha?.descr || 'Nenhuma'}`);
            }}
            onTrajetoChange={(trajetos) => {
              setSelectedTrajetoIds(trajetos.map(t => t._id));
              success(`${trajetos.length} trajeto(s) selecionado(s)`);
            }}
            linhaPlaceholder="Escolha uma linha de ônibus..."
            trajetoPlaceholder="Escolha trajetos..."
            linhaLabel="Linha de Ônibus"
            trajetoLabel="Trajetos"
          />
          
          {selectedLinhaId && selectedTrajetoIds.length > 0 && (
            <Alert variant="success" title="Seleção Completa">
              Linha "{sampleLinhas.find(l => l._id === selectedLinhaId)?.descr}" e {selectedTrajetoIds.length} trajeto(s) selecionados!
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Exemplo Personalizado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Exemplo Personalizado
            <Badge variant="secondary">Avançado</Badge>
          </CardTitle>
          <CardDescription>
            Componente com tamanho maior e labels personalizados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <LinhaTrajetoSelector
            linhas={sampleLinhas}
            selectedLinhaId={selectedLinhaId2}
            selectedTrajetoIds={selectedTrajetoIds2}
            onLinhaChange={(linha) => {
              setSelectedLinhaId2(linha?._id || '');
            }}
            onTrajetoChange={(trajetos) => {
              setSelectedTrajetoIds2(trajetos.map(t => t._id));
            }}
            linhaPlaceholder="Selecione a linha do transporte público..."
            trajetoPlaceholder="Selecione os trajetos desejados..."
            linhaLabel="🚌 Linha do Ônibus"
            trajetoLabel="🛣️ Trajetos da Viagem"
            size="lg"
            className="space-y-6"
            multiSelectTrajeto={true}
          />
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-sm">
              <div className="font-medium text-muted-foreground mb-1">Linha Selecionada:</div>
              <div className="text-foreground">
                {selectedLinhaId2 ? sampleLinhas.find(l => l._id === selectedLinhaId2)?.descr : "Nenhuma"}
              </div>
            </div>
            <div className="text-sm">
              <div className="font-medium text-muted-foreground mb-1">Trajetos Selecionados:</div>
              <div className="text-foreground">
                {selectedTrajetoIds2.length > 0 ? 
                  selectedTrajetoIds2
                    .map(id => sampleLinhas
                      .find(l => l._id === selectedLinhaId2)?.trajetos
                      .find(t => t._id === id)?.nome)
                    .filter(Boolean)
                    .join(", ")
                : "Nenhum"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações dos Dados */}
      <Card>
        <CardHeader>
          <CardTitle>Estrutura dos Dados</CardTitle>
          <CardDescription>
            Exemplo da estrutura JSON esperada pelo componente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto">
{`interface Linha {
  _id: string;
  clienteId: number;
  id_migracao: number;
  descr: string;
  numero: string;
  trajetos: Trajeto[];
  id: string;
}

interface Trajeto {
  _id: string;
  nome: string;
  sentido: string;
  kmTrajeto: number;
  // ... outras propriedades
}`}
            </pre>
          </div>
          
          <Alert variant="default" title="Estrutura Flexível">
            O componente utiliza apenas as propriedades essenciais (_id, descr, nome, trajetos) 
            mas aceita objetos com propriedades adicionais como mostrado no exemplo.
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinhaTrajetoSelectorDocs;