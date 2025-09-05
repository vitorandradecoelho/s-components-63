import React, { useState, useEffect } from "react";
import { ComboBox, type ComboOption } from "./ComboBox";

interface Trajeto {
  _id: string;
  id_migracao: number;
  externalId: string;
  nome: string;
  colorIdx: number;
  qtdTransmisoesInicial: number;
  qtdTransmisoesFinal: number;
  percentConclusao: number;
  toleranciaArrasto: number;
  kmTrajeto: number;
  tempoMedioViagem: number;
  sentidoTipo: string;
  headwayCopiloto: number;
  orientacao: string;
  consorcioSinoticoUnificado: any[];
  garagem: any[];
  despachoSemCor: boolean;
  ativo: boolean;
  sentido: string;
  codigosIntegracao: string[];
  raioTrajeto: number;
  id: string;
}

interface Linha {
  _id: string;
  clienteId: number;
  id_migracao: number;
  descr: string;
  numero: string;
  trajetos: Trajeto[];
  id: string;
}

interface LinhaTrajetoSelectorProps {
  linhas: Linha[];
  selectedLinhaId?: string;
  selectedTrajetoIds?: string[];
  onLinhaChange?: (linha: Linha | null) => void;
  onTrajetoChange?: (trajetos: Trajeto[]) => void;
  linhaPlaceholder?: string;
  trajetoPlaceholder?: string;
  linhaLabel?: string;
  trajetoLabel?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  multiSelectTrajeto?: boolean;
}

const LinhaTrajetoSelector = React.forwardRef<HTMLDivElement, LinhaTrajetoSelectorProps>(
  ({
    linhas,
    selectedLinhaId,
    selectedTrajetoIds = [],
    onLinhaChange,
    onTrajetoChange,
    linhaPlaceholder = "Selecione uma linha",
    trajetoPlaceholder = "Selecione trajetos",
    linhaLabel = "Linha",
    trajetoLabel = "Trajeto",
    disabled = false,
    size = "md",
    className,
    multiSelectTrajeto = true,
    ...props
  }, ref) => {
    const [selectedLinha, setSelectedLinha] = useState<Linha | null>(null);
    const [trajetoOptions, setTrajetoOptions] = useState<ComboOption[]>([]);

    // Converte linhas para options do ComboBox
    const linhaOptions: ComboOption[] = linhas.map(linha => ({
      label: linha.descr,
      value: linha._id,
      description: `Número: ${linha.numero}`
    }));

    // Atualiza linha selecionada quando selectedLinhaId muda
    useEffect(() => {
      if (selectedLinhaId) {
        const linha = linhas.find(l => l._id === selectedLinhaId);
        setSelectedLinha(linha || null);
      } else {
        setSelectedLinha(null);
      }
    }, [selectedLinhaId, linhas]);

    // Atualiza trajetos quando linha selecionada muda
    useEffect(() => {
      if (selectedLinha) {
        const options: ComboOption[] = selectedLinha.trajetos.map(trajeto => ({
          label: trajeto.nome,
          value: trajeto._id,
          description: `${trajeto.sentido} - ${trajeto.kmTrajeto}km`
        }));
        setTrajetoOptions(options);
      } else {
        setTrajetoOptions([]);
      }
    }, [selectedLinha]);

    const handleLinhaChange = (linhaId: string) => {
      const linha = linhas.find(l => l._id === linhaId) || null;
      setSelectedLinha(linha);
      onLinhaChange?.(linha);
      
      // Limpa trajetos selecionados quando linha muda
      onTrajetoChange?.([]);
    };

    const handleTrajetoChange = (trajetoIds: string[]) => {
      if (selectedLinha) {
        const trajetos = trajetoIds
          .map(id => selectedLinha.trajetos.find(t => t._id === id))
          .filter(Boolean) as Trajeto[];
        onTrajetoChange?.(trajetos);
      }
    };

    const handleLinhaClear = () => {
      setSelectedLinha(null);
      onLinhaChange?.(null);
      onTrajetoChange?.([]);
    };

    const handleTrajetoClear = () => {
      onTrajetoChange?.([]);
    };

    return (
      <div ref={ref} className={className} {...props}>
        <div className="space-y-4">
          <ComboBox
            options={linhaOptions}
            value={selectedLinhaId ? [selectedLinhaId] : []}
            onValueChange={(values) => {
              const linhaId = values[0];
              if (linhaId) {
                handleLinhaChange(linhaId);
              } else {
                handleLinhaClear();
              }
            }}
            placeholder={linhaPlaceholder}
            label={linhaLabel}
            disabled={disabled}
            size={size}
            clearable
            searchable
          />

          <ComboBox
            options={trajetoOptions}
            value={selectedTrajetoIds}
            onValueChange={(values) => {
              if (values.length > 0) {
                handleTrajetoChange(values);
              } else {
                handleTrajetoClear();
              }
            }}
            placeholder={trajetoPlaceholder}
            label={trajetoLabel}
            disabled={disabled || !selectedLinha}
            size={size}
            multiple={multiSelectTrajeto}
            clearable
            searchable
          />
        </div>
      </div>
    );
  }
);

LinhaTrajetoSelector.displayName = "LinhaTrajetoSelector";

export { LinhaTrajetoSelector, type Linha, type Trajeto, type LinhaTrajetoSelectorProps };