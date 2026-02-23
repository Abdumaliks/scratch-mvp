import { useState } from 'react';
import { useScratch } from '../context/ScratchContext';
import type { Block } from '../types';

export const useDragAndDrop = () => {
  const { addBlock } = useScratch();
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, type: string, action: string, value?: number) => {
    e.dataTransfer.setData('blockType', type);
    e.dataTransfer.setData('blockAction', action);
    if (value !== undefined) {
      e.dataTransfer.setData('blockValue', value.toString());
    }
    setDraggedBlock(action);
  };

  const handleDragEnd = () => {
    setDraggedBlock(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const blockType = e.dataTransfer.getData('blockType') as Block['type'];
    const blockAction = e.dataTransfer.getData('blockAction');
    const blockValueStr = e.dataTransfer.getData('blockValue');
    const blockValue = blockValueStr ? parseInt(blockValueStr) : undefined;
    
    const newBlock: Block = {
      id: Date.now().toString(),
      type: blockType,
      action: blockAction,
      value: blockValue,
      text: blockAction === 'Сказать' ? 'Привет! 👋' : undefined
    };
    
    addBlock(newBlock);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return {
    draggedBlock,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleDragOver,
  };
};
