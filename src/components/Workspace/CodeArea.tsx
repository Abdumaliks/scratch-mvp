import { useScratch } from '../../context/ScratchContext';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { DroppedBlock } from '../DroppedBlock/DroppedBlock';

export const CodeArea = () => {
  const { blocks } = useScratch();
  const { handleDrop, handleDragOver } = useDragAndDrop();

  return (
    <div className="code-area">
      <h3>📝 Скрипт</h3>
      <EventTriggerHint />
      <div 
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {blocks.length === 0 ? (
          <p style={{ color: '#6c757d', textAlign: 'center', marginTop: '50px' }}>
            Перетащите блоки сюда
          </p>
        ) : (
          blocks.map((block) => (
            <DroppedBlock key={block.id} block={block} />
          ))
        )}
      </div>
    </div>
  );
};

const EventTriggerHint = () => {
  const { blocks } = useScratch();

  if (blocks.length === 0 || blocks[0]?.action !== 'Когда нажато') {
    return null;
  }

  return (
    <div style={{ 
      backgroundColor: '#e7f3ff', 
      padding: '8px 12px', 
      borderRadius: '6px', 
      marginBottom: '10px',
      fontSize: '12px',
      color: '#495057',
      border: '1px solid #4c9aff'
    }}>
      💡 Кликните на спрайт или нажмите "▶ Запустить"
    </div>
  );
};
