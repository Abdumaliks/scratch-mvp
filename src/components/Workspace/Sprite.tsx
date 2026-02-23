import { useScratch } from '../../context/ScratchContext';

export const Sprite = () => {
  const { sprite, blocks, isRunning, executeBlocks, addLog } = useScratch();

  const handleClick = () => {
    if (!isRunning && blocks.length > 0 && blocks[0]?.action === 'Когда нажато') {
      executeBlocks();
      addLog('🖱️ Клик по спрайту - запуск программы');
    }
  };

  const isClickable = blocks[0]?.action === 'Когда нажато' && !isRunning;

  return (
    <div 
      className={`sprite ${!sprite.visible ? 'hidden' : ''} ${isClickable ? 'clickable' : ''}`}
      style={{ 
        left: `${sprite.x}px`, 
        top: `${sprite.y}px`,
        width: `${sprite.size}px`,
        height: `${sprite.size}px`,
        transform: `rotate(${sprite.rotation}deg)`
      }}
      onClick={handleClick}
    >
      {sprite.costume}
      {sprite.message && (
        <div className="speech-bubble">
          {sprite.message}
        </div>
      )}
    </div>
  );
};
