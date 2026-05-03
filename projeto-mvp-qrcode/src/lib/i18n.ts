import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      header: {
        templates: 'Templates',
        history: 'History',
        api: 'API Docs',
        login: 'Sign In',
        logout: 'Logout'
      },
      hero: {
        title: 'QR Code Generator',
        subtitle: 'Fast & Custom'
      },
      templates: {
        title: 'Quick Presets'
      },
      preview: {
        export: 'Export Matrix',
        copy: 'Copy Config',
        copied: 'Copied!',
        save: 'Save Project',
        share: 'Share',
        namePrompt: 'Name for this QR Code:',
        instagramNote: 'Download the image to share on Instagram!'
      },
      config: {
        content: 'QR Content',
        placeholder: 'Introduce content here...',
        sourceLabel: 'Source URL or Message',
        useCurrent: 'Use Current URL',
        longWarning: 'High density: check scan',
        aesthetics: 'Aesthetics',
        shape: 'Pattern Shape',
        color: 'Pattern Color',
        anchor: 'Anchor Design',
        outer: 'Outer Frame',
        inner: 'Inner Eye',
        emblem: 'Central Emblem',
        assetPlaceholder: 'Drop logo URL here...',
        useGradient: 'Use Gradient',
        gradientType: 'Type',
        rotation: 'Rotation',
        colorStops: 'Color Stops',
        frame: 'Decorative Frame',
        frameType: 'Frame Selection',
        frameNone: 'No Frame',
        frameSimple: 'Minimal Border',
        frameThick: 'Thick Border',
        frameDouble: 'Double Line',
        frameDashed: 'Dashed Path',
        frameGlass: 'Glass Box',
        frameBracket: 'Corner Brackets',
        frameModern: 'Modern Pillars',
        frameLabel: 'Label Frame',
        frameColor: 'Accent Color',
        frameText: 'Label Text',
        system: 'System Settings',
        resolution: 'Resolution',
        error: 'Error Correction'
      },
      history: {
        title: 'History',
        projectsTitle: 'Your Projects',
        exportAll: 'Export All (ZIP)',
        exporting: 'Zipping...',
        empty: 'No projects saved yet.',
        signedOut: 'Sign in to view your history',
        load: 'Load Project'
      },
      footer: {
        tagline: 'Advanced QR experiences. Created with precision and elegance for those who value every detail.',
        terms: 'Archive',
        privacy: 'Privacy',
        status: 'Network Status'
      },
      accessibility: {
        title: 'Accessibility',
        standard: 'Standard',
        highContrast: 'High Contrast',
        protanopia: 'Protanopia',
        deuteranopia: 'Deuteranopia',
        tritanopia: 'Tritanopia',
        monochrome: 'Monochrome'
      }
    }
  },
  pt: {
    translation: {
      header: {
        templates: 'Modelos',
        history: 'Histórico',
        api: 'Documentação',
        login: 'Entrar',
        logout: 'Sair'
      },
      hero: {
        title: 'Gerador de QR Code',
        subtitle: 'Rápido & Customizado'
      },
      templates: {
        title: 'Presets Rápidos'
      },
      preview: {
        export: 'Matriz de Exportação',
        copy: 'Copiar Config',
        copied: 'Copiado!',
        save: 'Salvar Projeto',
        share: 'Compartilhar',
        namePrompt: 'Nome para este QR Code:',
        instagramNote: 'Baixe a imagem para compartilhar no Instagram!'
      },
      config: {
        content: 'Conteúdo do QR',
        placeholder: 'Insira o conteúdo aqui...',
        sourceLabel: 'URL ou Mensagem',
        useCurrent: 'Usar URL Atual',
        longWarning: 'Alta densidade: verifique scan',
        aesthetics: 'Estética',
        shape: 'Forma do Padrão',
        color: 'Cor do Padrão',
        anchor: 'Design da Âncora',
        outer: 'Moldura Externa',
        inner: 'Olho Interno',
        emblem: 'Emblema Central',
        assetPlaceholder: 'Cole a URL do logo aqui...',
        useGradient: 'Usar Gradiente',
        gradientType: 'Tipo',
        rotation: 'Rotação',
        colorStops: 'Paradas de Cor',
        frame: 'Moldura Decorativa',
        frameType: 'Seleção de Moldura',
        frameNone: 'Sem Moldura',
        frameSimple: 'Borda Mínima',
        frameThick: 'Borda Grossa',
        frameDouble: 'Linha Dupla',
        frameDashed: 'Caminho Tracejado',
        frameGlass: 'Caixa de Vidro',
        frameBracket: 'Cantoneiras',
        frameModern: 'Pilares Modernos',
        frameLabel: 'Moldura de Rótulo',
        frameColor: 'Cor de Destaque',
        frameText: 'Texto do Rótulo',
        system: 'Configurações do Sistema',
        resolution: 'Resolução',
        error: 'Correção de Erro'
      },
      history: {
        title: 'Histórico',
        projectsTitle: 'Seus Projetos',
        exportAll: 'Exportar Tudo (ZIP)',
        exporting: 'Compactando...',
        empty: 'Nenhum projeto salvo ainda.',
        signedOut: 'Entre para ver seu histórico',
        load: 'Carregar Projeto'
      },
      footer: {
        tagline: 'Experiências avançadas em QR. Criado com precisão e elegância para quem valoriza cada detalhe.',
        terms: 'Arquivo',
        privacy: 'Privacidade',
        status: 'Status da Rede'
      },
      accessibility: {
        title: 'Acessibilidade',
        standard: 'Padrão',
        highContrast: 'Alto Contraste',
        protanopia: 'Protanopia',
        deuteranopia: 'Deuteranopia',
        tritanopia: 'Tritanopia',
        monochrome: 'Monocromático'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
