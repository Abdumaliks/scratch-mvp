import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { AVAILABLE_BLOCKS } from '../../constants';

export const BlocksList = () => {
  const { draggedBlock, handleDragStart, handleDragEnd } = useDragAndDrop();

  const groupedBlocks = AVAILABLE_BLOCKS.reduce((acc, block) => {
    if (!acc[block.category]) acc[block.category] = [];
    acc[block.category].push(block);
    return acc;
  }, {} as Record<string, typeof AVAILABLE_BLOCKS>);

  return (
    <>
      {Object.entries(groupedBlocks).map(([category, categoryBlocks]) => (
        <div key={category} className="block-category">
          <h3>{category}</h3>
          {categoryBlocks.map((block, index) => (
            <div
              key={index}
              className={`code-block ${block.type} ${draggedBlock === block.action ? 'dragging' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, block.type, block.action, block.defaultValue)}
              onDragEnd={handleDragEnd}
            >
              {block.action} {block.hasValue && block.unit ? `[${block.defaultValue}] ${block.unit}` : ''}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
