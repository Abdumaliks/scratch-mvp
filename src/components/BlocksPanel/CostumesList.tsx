import { useScratch } from '../../context/ScratchContext';
import { COSTUMES } from '../../constants';

export const CostumesList = () => {
  const { sprite, setSprite } = useScratch();

  return (
    <>
      <h3 style={{ color: '#495057', marginBottom: '15px' }}>Выберите костюм</h3>
      <div className="costumes-grid">
        {COSTUMES.map((costume) => (
          <div
            key={costume.id}
            className={`costume-item ${sprite.costume === costume.emoji ? 'selected' : ''}`}
            onClick={() => setSprite(prev => ({ ...prev, costume: costume.emoji }))}
          >
            <div className="costume-emoji">{costume.emoji}</div>
            <div className="costume-name">{costume.name}</div>
          </div>
        ))}
      </div>
    </>
  );
};
