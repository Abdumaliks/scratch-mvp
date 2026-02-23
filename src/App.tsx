import { ScratchProvider } from './context/ScratchContext';
import { BlocksPanel } from './components/BlocksPanel';
import { Workspace } from './components/Workspace';
import './App.css';

function App() {
  return (
    <ScratchProvider>
      <div className="app">
        <BlocksPanel />
        <Workspace />
      </div>
    </ScratchProvider>
  );
}

export default App;
