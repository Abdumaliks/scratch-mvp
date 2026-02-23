import { useScratch } from '../../context/ScratchContext';

export const WorkspaceHeader = () => {
  const { executeBlocks, stopExecution, resetSprite, isRunning, blocks } = useScratch();

  return (
    <div className="workspace-header">
      <button onClick={executeBlocks} disabled={isRunning || blocks.length === 0}>
        ▶ Запустить
      </button>
      <button className="stop" onClick={stopExecution} disabled={!isRunning}>
        ⏹ Стоп
      </button>
      <button className="reset" onClick={resetSprite}>
        ↻ Сброс
      </button>
    </div>
  );
};
