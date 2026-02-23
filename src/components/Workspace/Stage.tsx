import { Sprite } from './Sprite';
import { OutputConsole } from './OutputConsole';

export const Stage = () => {
  return (
    <div className="stage">
      <h3>🎭 Сцена</h3>
      <div className="canvas-container">
        <Sprite />
      </div>
      <OutputConsole />
    </div>
  );
};
