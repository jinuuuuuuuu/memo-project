import { Memo } from '../types/memo';
import MemoItem from './MemoItem';

interface MemoListProps {
  memos: Memo[];
  setSelectedMemoIndex: (index: number) => void;
  selectedMemoIndex: number; // 현재 선택된 인덱스를 전달받음
  deleteMemo: (index: number) => void;
}

const MemoList = ({
  memos,
  setSelectedMemoIndex,
  selectedMemoIndex,
  deleteMemo,
}: MemoListProps) => {
  return (
    <div>
      {memos.map((memo, index) => (
        <MemoItem
          key={memo.createdAt}
          onClickItem={() => setSelectedMemoIndex(index)}
          onClickDelete={() => {
            deleteMemo(index);
          }}
          isSelected={index === selectedMemoIndex}
        >
          {memo.title}
        </MemoItem>
        // <MemoItem />으로까지 setSelectedMemoIndex랑 index를 다시 프롭스로 전달하면
        // MemoList에 대한 의존성이 너무 커짐. 프롭스가 너무 늘어남.
        // 지금 방식이 더 깔끔하고, 컴포넌트 재사용성도 좋아짐.
        // 작은 컴포넌트는 되도록 어떤 "행동(함수)"을 할지는 상위에서 결정하고,
        // 하위 컴포넌트는 그저 렌더 & 이벤트만 처리하는 게 유지보수성이 좋아요.
      ))}
    </div>
  );
};

export default MemoList;
