import { useScratch } from '../../context/ScratchContext';
import { BlocksList } from './BlocksList';
import { CostumesList } from './CostumesList';
import './BlocksPanel.css';

export const BlocksPanel = () => {
  const { activeTab } = useScratch();

  return (
    <div className="blocks-panel">
      <PanelTabs />
      {activeTab === 'code' ? <BlocksContent /> : <CostumesContent />}
    </div>
  );
};

const PanelTabs = () => {
  const { activeTab, setActiveTab } = useScratch();

  return (
    <div className="panel-tabs">
      <button 
        className={`tab-button ${activeTab === 'code' ? 'active' : ''}`}
        onClick={() => setActiveTab('code')}
      >
        🧩 Блоки
      </button>
      <button 
        className={`tab-button ${activeTab === 'costumes' ? 'active' : ''}`}
        onClick={() => setActiveTab('costumes')}
      >
        🎨 Костюмы
      </button>
    </div>
  );
};

const BlocksContent = () => {
  return (
    <div className="blocks-content">
      <BlocksList />
    </div>
  );
};

const CostumesContent = () => {
  return (
    <div className="costumes-content">
      <CostumesList />
    </div>
  );
};
