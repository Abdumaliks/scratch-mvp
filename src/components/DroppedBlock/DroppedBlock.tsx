import { useScratch } from '../../context/ScratchContext';

interface DroppedBlockProps {
  block: {
    id: string;
    action: string;
    type: string;
    value?: number;
    text?: string;
  };
}

export const DroppedBlock = ({ block }: DroppedBlockProps) => {
  const { currentBlockId, removeBlock, updateBlockValue, updateBlockText } = useScratch();

  return (
    <div 
      className={`dropped-block ${block.type} ${currentBlockId === block.id ? 'executing' : ''}`}
      style={currentBlockId === block.id ? { 
        transform: 'scale(1.05)', 
        boxShadow: '0 0 15px rgba(76, 154, 255, 0.8)' 
      } : {}}
    >
      <span>
        {block.action}
        {block.action === 'Сказать' && block.text !== undefined ? (
          <input
            type="text"
            value={block.text}
            onChange={(e) => updateBlockText(block.id, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="Текст..."
            style={{ width: '120px' }}
          />
        ) : null}
        {block.value !== undefined ? (
          <input
            type="number"
            value={block.value}
            onChange={(e) => updateBlockValue(block.id, parseInt(e.target.value) || 0)}
            onClick={(e) => e.stopPropagation()}
          />
        ) : null}
      </span>
      <button onClick={() => removeBlock(block.id)}>✕</button>
    </div>
  );
};
