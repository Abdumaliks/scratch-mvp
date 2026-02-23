import { createContext, useContext, useState, useRef } from 'react';
import type { ReactNode } from 'react';
import type { Block, SpriteState } from '../types';
import { INITIAL_SPRITE_STATE } from '../constants';

interface ScratchContextType {
  // State
  blocks: Block[];
  sprite: SpriteState;
  isRunning: boolean;
  output: string[];
  currentBlockId: string | null;
  activeTab: 'code' | 'costumes';
  
  // Actions
  addBlock: (block: Block) => void;
  removeBlock: (id: string) => void;
  updateBlockValue: (id: string, value: number) => void;
  updateBlockText: (id: string, text: string) => void;
  setBlocks: (blocks: Block[]) => void;
  setSprite: (sprite: SpriteState | ((prev: SpriteState) => SpriteState)) => void;
  setActiveTab: (tab: 'code' | 'costumes') => void;
  addLog: (message: string) => void;
  executeBlocks: () => Promise<void>;
  stopExecution: () => void;
  resetSprite: () => void;
  setCurrentBlockId: (id: string | null) => void;
}

const ScratchContext = createContext<ScratchContextType | undefined>(undefined);

export const useScratch = () => {
  const context = useContext(ScratchContext);
  if (!context) {
    throw new Error('useScratch must be used within ScratchProvider');
  }
  return context;
};

interface ScratchProviderProps {
  children: ReactNode;
}

export const ScratchProvider = ({ children }: ScratchProviderProps) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [sprite, setSprite] = useState<SpriteState>(INITIAL_SPRITE_STATE);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [currentBlockId, setCurrentBlockId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'code' | 'costumes'>('code');
  const stopExecutionRef = useRef(false);

  const addLog = (message: string) => {
    setOutput(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const addBlock = (block: Block) => {
    setBlocks(prev => [...prev, block]);
    addLog(`Добавлен блок: ${block.action} ${block.value ? `[${block.value}]` : ''}`);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
    addLog('Блок удалён');
  };

  const updateBlockValue = (id: string, value: number) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, value } : block
    ));
  };

  const updateBlockText = (id: string, text: string) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, text } : block
    ));
  };

  const executeBlock = async (block: Block) => {
    console.log('Executing block:', block.action, 'with value:', block.value);
    
    switch (block.action) {
      case 'Двигаться':
        setSprite(prev => ({ ...prev, x: prev.x + (block.value || 10) }));
        addLog(`Переместился на ${block.value} шагов`);
        break;
      case 'Повернуть':
        setSprite(prev => ({ ...prev, rotation: prev.rotation + (block.value || 15) }));
        addLog(`Повернулся на ${block.value} градусов`);
        break;
      case 'В центр':
        setSprite(prev => ({ ...prev, x: 200, y: 150 }));
        addLog('Вернулся в центр');
        break;
      case 'Сказать':
        setSprite(prev => ({ ...prev, message: block.text || 'Привет! 👋' }));
        addLog(`💬 ${block.text || 'Привет! 👋'} (${block.value} сек)`);
        await new Promise(resolve => setTimeout(resolve, (block.value || 2) * 1000));
        setSprite(prev => ({ ...prev, message: '' }));
        break;
      case 'Показаться':
        setSprite(prev => ({ ...prev, visible: true }));
        addLog('Показался');
        break;
      case 'Спрятаться':
        setSprite(prev => ({ ...prev, visible: false }));
        addLog('Спрятался');
        break;
      case 'Ждать':
        addLog(`⏱ Жду ${block.value} сек...`);
        await new Promise(resolve => setTimeout(resolve, (block.value || 1) * 1000));
        break;
      case 'Повторить':
        addLog(`🔁 Повтор ${block.value} раз`);
        break;
      default:
        console.warn('Unknown block action:', block.action);
        addLog(`❌ Неизвестный блок: ${block.action}`);
    }
  };

  const executeBlocks = async () => {
    setIsRunning(true);
    stopExecutionRef.current = false;
    addLog('▶ Запуск программы...');
    
    const executableBlocks = blocks[0]?.action === 'Когда нажато' ? blocks.slice(1) : blocks;
    
    if (executableBlocks.length === 0) {
      addLog('⚠️ Нет блоков для выполнения');
      setIsRunning(false);
      return;
    }
    
    for (const block of executableBlocks) {
      if (stopExecutionRef.current) break;
      
      setCurrentBlockId(block.id);
      await executeBlock(block);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    setCurrentBlockId(null);
    setIsRunning(false);
    addLog('✓ Программа завершена');
  };

  const stopExecution = () => {
    stopExecutionRef.current = true;
    setIsRunning(false);
    addLog('⏸ Программа остановлена');
  };

  const resetSprite = () => {
    setSprite({ ...INITIAL_SPRITE_STATE, costume: sprite.costume });
    setOutput([]);
    addLog('↻ Сброс выполнен');
  };

  const value: ScratchContextType = {
    blocks,
    sprite,
    isRunning,
    output,
    currentBlockId,
    activeTab,
    addBlock,
    removeBlock,
    updateBlockValue,
    updateBlockText,
    setBlocks,
    setSprite,
    setActiveTab,
    addLog,
    executeBlocks,
    stopExecution,
    resetSprite,
    setCurrentBlockId,
  };

  return (
    <ScratchContext.Provider value={value}>
      {children}
    </ScratchContext.Provider>
  );
};
