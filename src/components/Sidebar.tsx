import { Memo } from '../types/memo';
import MemoList from './MemoList';
import SidebarFooter from './SidebarFooter';
import SidebarHeader from './SidebarHeader';

interface SidebarProps {
  memos: Memo[];
  setSelectedMemoIndex: (index: number) => void;
  selectedMemoIndex: number;
  addMemo: () => void;
  deleteMemo: (index: number) => void;
}

const Sidebar = ({
  memos,
  setSelectedMemoIndex,
  selectedMemoIndex,
  addMemo,
  deleteMemo,
}: SidebarProps) => {
  return (
    <div className="bg-gray-100 w-64">
      <SidebarHeader />
      <MemoList
        memos={memos}
        setSelectedMemoIndex={setSelectedMemoIndex}
        selectedMemoIndex={selectedMemoIndex}
        deleteMemo={deleteMemo}
      />
      <SidebarFooter onClick={addMemo} />
    </div>
  );
};

export default Sidebar;
