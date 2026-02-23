import { useScratch } from '../../context/ScratchContext';

export const OutputConsole = () => {
  const { output } = useScratch();

  return (
    <div className="output-console">
      <h4>📤 Консоль</h4>
      {output.length === 0 ? (
        <div style={{ color: '#6c757d', fontSize: '12px' }}>
          Здесь будут логи выполнения...
        </div>
      ) : (
        output.map((line, index) => (
          <div key={index} className="output-line">{line}</div>
        ))
      )}
    </div>
  );
};
