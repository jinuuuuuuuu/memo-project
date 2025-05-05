import { FaXmark } from 'react-icons/fa6';

interface MemoItemProps {
  children: React.ReactNode;
  onClickItem: () => void;
  onClickDelete: () => void;
  isSelected: boolean;
}

const MemoItem = ({
  children,
  onClickItem,
  onClickDelete,
  isSelected,
}: MemoItemProps) => {
  return (
    <div
      className={`group flex justify-between items-center min-h-12 px-4 py-3 w-full transition duration-200 
        ${isSelected ? 'bg-gray-300 font-bold' : 'hover:bg-gray-200'}`}
      onClick={onClickItem}
    >
      <span className="truncate">
        {/*단축 클래스 **truncate** => overflow-hidden whitespace-nowrap text-ellipsis 셋 모두 포함.*/}
        {children}
      </span>
      <button
        onClick={e => {
          e.preventDefault();
          e.stopPropagation(); // 부모 클릭 막기
          onClickDelete();
        }}
        className="hidden group-hover:flex cursor-pointer w-7 h-7 justify-center items-center transition"
      >
        <FaXmark className="text-red-600" />
      </button>
    </div>
  );
};

export default MemoItem;
// **whitespace-nowrap** CSS: white-space: nowrap;
// 텍스트가 줄바꿈되지 않도록 만듦
// 텍스트가 요소의 가로폭을 넘어가더라도 강제로 한 줄로 유지
// **text-ellipsis** CSS: text-overflow: ellipsis;4
// 넘친 텍스트를 ...으로 대체
// 단, 이 속성은 **white-space: nowrap + overflow: hidden**과 함께 써야 제대로 작동
