import { useState, useRef } from "react";
import "./App.css";

interface Block {
  id: string;
  type: "motion" | "looks" | "control" | "events";
  action: string;
  value?: number;
  text?: string;
}

interface SpriteState {
  x: number;
  y: number;
  visible: boolean;
  size: number;
  costume: string;
  rotation: number;
  message: string;
}

function App() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [sprite, setSprite] = useState<SpriteState>({
    x: 200,
    y: 150,
    visible: true,
    size: 60,
    costume: "🐱",
    rotation: 0,
    message: "",
  });
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);
  const [currentBlockId, setCurrentBlockId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"code" | "costumes">("code");
  const stopExecutionRef = useRef(false);

  const costumes = [
    { id: 1, emoji: "🐱", name: "Котик" },
    { id: 2, emoji: "🐶", name: "Собачка" },
    { id: 3, emoji: "🐼", name: "Панда" },
    { id: 4, emoji: "🦊", name: "Лиса" },
    { id: 5, emoji: "🐸", name: "Лягушка" },
    { id: 6, emoji: "🦁", name: "Лев" },
    { id: 7, emoji: "🐯", name: "Тигр" },
    { id: 8, emoji: "🐻", name: "Медведь" },
    { id: 9, emoji: "🐰", name: "Кролик" },
    { id: 10, emoji: "🦄", name: "Единорог" },
    { id: 11, emoji: "🐉", name: "Дракон" },
    { id: 12, emoji: "🦖", name: "Динозавр" },
  ];

  const availableBlocks = [
    { type: "events", action: "Когда нажато", category: "События" },
    {
      type: "motion",
      action: "Двигаться",
      category: "Движение",
      hasValue: true,
      defaultValue: 10,
      unit: "шагов",
    },
    {
      type: "motion",
      action: "Повернуть",
      category: "Движение",
      hasValue: true,
      defaultValue: 15,
      unit: "градусов",
    },
    { type: "motion", action: "В центр", category: "Движение" },
    {
      type: "looks",
      action: "Сказать",
      category: "Внешность",
      hasValue: true,
      defaultValue: 2,
      unit: "сек",
    },
    { type: "looks", action: "Показаться", category: "Внешность" },
    { type: "looks", action: "Спрятаться", category: "Внешность" },
    {
      type: "control",
      action: "Ждать",
      category: "Управление",
      hasValue: true,
      defaultValue: 1,
      unit: "секунд",
    },
    {
      type: "control",
      action: "Повторить",
      category: "Управление",
      hasValue: true,
      defaultValue: 10,
      unit: "раз",
    },
  ];

  const addLog = (message: string) => {
    setOutput((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const blockType = e.dataTransfer.getData("blockType") as Block["type"];
    const blockAction = e.dataTransfer.getData("blockAction");
    const blockValueStr = e.dataTransfer.getData("blockValue");
    const blockValue = blockValueStr ? parseInt(blockValueStr) : undefined;

    console.log("Drop received:", {
      blockType,
      blockAction,
      blockValue,
      blockValueStr,
    });

    const newBlock: Block = {
      id: Date.now().toString(),
      type: blockType,
      action: blockAction,
      value: blockValue,
      text: blockAction === "Сказать" ? "Привет! 👋" : undefined,
    };

    console.log("New block created:", newBlock);

    setBlocks([...blocks, newBlock]);
    addLog(
      `Добавлен блок: ${blockAction} ${blockValue ? `[${blockValue}]` : ""}`,
    );
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (
    e: React.DragEvent,
    type: string,
    action: string,
    value?: number,
  ) => {
    e.dataTransfer.setData("blockType", type);
    e.dataTransfer.setData("blockAction", action);
    if (value !== undefined) {
      e.dataTransfer.setData("blockValue", value.toString());
    }
    setDraggedBlock(action);
  };

  const handleDragEnd = () => {
    setDraggedBlock(null);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id));
    addLog("Блок удалён");
  };

  const updateBlockValue = (id: string, value: number) => {
    setBlocks(
      blocks.map((block) => (block.id === id ? { ...block, value } : block)),
    );
  };

  const updateBlockText = (id: string, text: string) => {
    setBlocks(
      blocks.map((block) => (block.id === id ? { ...block, text } : block)),
    );
  };

  const executeBlocks = async () => {
    setIsRunning(true);
    stopExecutionRef.current = false;
    addLog("▶ Запуск программы...");

    // Пропускаем блок "Когда нажато" если он первый
    const executableBlocks =
      blocks[0]?.action === "Когда нажато" ? blocks.slice(1) : blocks;

    if (executableBlocks.length === 0) {
      addLog("⚠️ Нет блоков для выполнения");
      setIsRunning(false);
      return;
    }

    for (const block of executableBlocks) {
      if (stopExecutionRef.current) break;

      setCurrentBlockId(block.id); // Подсвечиваем текущий блок
      await executeBlock(block);
      await new Promise((resolve) => setTimeout(resolve, 800)); // Увеличили задержку
    }

    setCurrentBlockId(null);
    setIsRunning(false);
    addLog("✓ Программа завершена");
  };

  const executeBlock = async (block: Block) => {
    console.log("Executing block:", block.action, "with value:", block.value);

    switch (block.action) {
      case "Двигаться":
        setSprite((prev) => ({ ...prev, x: prev.x + (block.value || 10) }));
        addLog(`Переместился на ${block.value} шагов`);
        break;
      case "Повернуть":
        setSprite((prev) => ({
          ...prev,
          rotation: prev.rotation + (block.value || 15),
        }));
        addLog(`Повернулся на ${block.value} градусов`);
        break;
      case "В центр":
        setSprite((prev) => ({ ...prev, x: 200, y: 150 }));
        addLog("Вернулся в центр");
        break;
      case "Сказать":
        setSprite((prev) => ({ ...prev, message: block.text || "Привет! 👋" }));
        addLog(`💬 ${block.text || "Привет! 👋"} (${block.value} сек)`);
        await new Promise((resolve) =>
          setTimeout(resolve, (block.value || 2) * 1000),
        );
        setSprite((prev) => ({ ...prev, message: "" }));
        break;
      case "Показаться":
        setSprite((prev) => ({ ...prev, visible: true }));
        addLog("Показался");
        break;
      case "Спрятаться":
        setSprite((prev) => ({ ...prev, visible: false }));
        addLog("Спрятался");
        break;
      case "Ждать":
        addLog(`⏱ Жду ${block.value} сек...`);
        await new Promise((resolve) =>
          setTimeout(resolve, (block.value || 1) * 1000),
        );
        break;
      case "Повторить":
        addLog(`🔁 Повтор ${block.value} раз`);
        break;
      default:
        console.warn("Unknown block action:", block.action);
        addLog(`❌ Неизвестный блок: ${block.action}`);
    }
  };

  const stopExecution = () => {
    stopExecutionRef.current = true;
    setIsRunning(false);
    addLog("⏸ Программа остановлена");
  };

  const resetSprite = () => {
    setSprite({
      x: 200,
      y: 150,
      visible: true,
      size: 60,
      costume: sprite.costume,
      rotation: 0,
      message: "",
    });
    setOutput([]);
    addLog("↻ Сброс выполнен");
  };

  const groupedBlocks = availableBlocks.reduce(
    (acc, block) => {
      if (!acc[block.category]) acc[block.category] = [];
      acc[block.category].push(block);
      return acc;
    },
    {} as Record<string, typeof availableBlocks>,
  );

  return (
    <div className="app">
      <div className="blocks-panel">
        <div className="panel-tabs">
          <button
            className={`tab-button ${activeTab === "code" ? "active" : ""}`}
            onClick={() => setActiveTab("code")}
          >
            🧩 Блоки
          </button>
          <button
            className={`tab-button ${activeTab === "costumes" ? "active" : ""}`}
            onClick={() => setActiveTab("costumes")}
          >
            🎨 Костюмы
          </button>
        </div>

        {activeTab === "code" ? (
          <div className="blocks-content">
            {Object.entries(groupedBlocks).map(([category, categoryBlocks]) => (
              <div key={category} className="block-category">
                <h3>{category}</h3>
                {categoryBlocks.map((block, index) => (
                  <div
                    key={index}
                    className={`code-block ${block.type} ${draggedBlock === block.action ? "dragging" : ""}`}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(
                        e,
                        block.type,
                        block.action,
                        (block as any).defaultValue,
                      )
                    }
                    onDragEnd={handleDragEnd}
                  >
                    {block.action}{" "}
                    {(block as any).hasValue && (block as any).unit
                      ? `[${(block as any).defaultValue}] ${(block as any).unit}`
                      : ""}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="costumes-content">
            <h3 style={{ color: "#495057", marginBottom: "15px" }}>
              Выберите костюм
            </h3>
            <div className="costumes-grid">
              {costumes.map((costume) => (
                <div
                  key={costume.id}
                  className={`costume-item ${sprite.costume === costume.emoji ? "selected" : ""}`}
                  onClick={() =>
                    setSprite((prev) => ({ ...prev, costume: costume.emoji }))
                  }
                >
                  <div className="costume-emoji">{costume.emoji}</div>
                  <div className="costume-name">{costume.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="workspace">
        <div className="workspace-header">
          <button
            onClick={executeBlocks}
            disabled={isRunning || blocks.length === 0}
          >
            ▶ Запустить
          </button>
          <button
            className="stop"
            onClick={stopExecution}
            disabled={!isRunning}
          >
            ⏹ Стоп
          </button>
          <button className="reset" onClick={resetSprite}>
            ↻ Сброс
          </button>
        </div>

        <div className="workspace-content">
          <div className="code-area">
            <h3>📝 Скрипт</h3>
            {blocks.length > 0 && blocks[0]?.action === "Когда нажато" && (
              <div
                style={{
                  backgroundColor: "#e7f3ff",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  marginBottom: "10px",
                  fontSize: "12px",
                  color: "#495057",
                  border: "1px solid #4c9aff",
                }}
              >
                💡 Кликните на спрайт или нажмите "▶ Запустить"
              </div>
            )}
            <div
              className="drop-zone"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {blocks.length === 0 ? (
                <p
                  style={{
                    color: "#6c757d",
                    textAlign: "center",
                    marginTop: "50px",
                  }}
                >
                  Перетащите блоки сюда
                </p>
              ) : (
                blocks.map((block) => (
                  <div
                    key={block.id}
                    className={`dropped-block ${block.type} ${currentBlockId === block.id ? "executing" : ""}`}
                    style={
                      currentBlockId === block.id
                        ? {
                            transform: "scale(1.05)",
                            boxShadow: "0 0 15px rgba(76, 154, 255, 0.8)",
                          }
                        : {}
                    }
                  >
                    <span>
                      {block.action}
                      {block.action === "Сказать" &&
                      block.text !== undefined ? (
                        <input
                          type="text"
                          value={block.text}
                          onChange={(e) =>
                            updateBlockText(block.id, e.target.value)
                          }
                          onClick={(e) => e.stopPropagation()}
                          placeholder="Текст..."
                          style={{ width: "120px" }}
                        />
                      ) : null}
                      {block.value !== undefined ? (
                        <input
                          type="number"
                          value={block.value}
                          onChange={(e) =>
                            updateBlockValue(
                              block.id,
                              parseInt(e.target.value) || 0,
                            )
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : null}
                    </span>
                    <button onClick={() => removeBlock(block.id)}>✕</button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="stage">
            <h3>🎭 Сцена</h3>
            <div className="canvas-container">
              <div
                className={`sprite ${!sprite.visible ? "hidden" : ""} ${blocks[0]?.action === "Когда нажато" && !isRunning ? "clickable" : ""}`}
                style={{
                  left: `${sprite.x}px`,
                  top: `${sprite.y}px`,
                  width: `${sprite.size}px`,
                  height: `${sprite.size}px`,
                  transform: `rotate(${sprite.rotation}deg)`,
                }}
                onClick={() => {
                  if (
                    !isRunning &&
                    blocks.length > 0 &&
                    blocks[0]?.action === "Когда нажато"
                  ) {
                    executeBlocks();
                    addLog("🖱️ Клик по спрайту - запуск программы");
                  }
                }}
              >
                {sprite.costume}
                {sprite.message && (
                  <div className="speech-bubble">{sprite.message}</div>
                )}
              </div>
            </div>

            <div className="output-console">
              <h4>📤 Консоль</h4>
              {output.length === 0 ? (
                <div style={{ color: "#6c757d", fontSize: "12px" }}>
                  Здесь будут логи выполнения...
                </div>
              ) : (
                output.map((line, index) => (
                  <div key={index} className="output-line">
                    {line}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
