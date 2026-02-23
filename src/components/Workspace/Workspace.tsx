import { WorkspaceHeader } from './WorkspaceHeader';
import { CodeArea } from './CodeArea';
import { Stage } from './Stage';
import './Workspace.css';

export const Workspace = () => {
  return (
    <div className="workspace">
      <WorkspaceHeader />
      <div className="workspace-content">
        <CodeArea />
        <Stage />
      </div>
    </div>
  );
};
