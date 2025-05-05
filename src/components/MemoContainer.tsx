import { Memo } from '../types/memo';

interface MemoContainerProps {
  memo: Memo | undefined;
  //memo가 undefined도 올 수 있기 때문에
  setMemo: (memo: Memo) => void;
}

const MemoContainer = ({ memo, setMemo }: MemoContainerProps) => {
  if (memo === undefined) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center text-gray-500">
        <h1 className="text-2xl font-semibold">There are no memos. </h1>
        <h2 className="text-xl mt-2">Please add a new memo.</h2>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-2 p-4">
      <input
        value={memo.title}
        onChange={e =>
          setMemo({ ...memo, title: e.target.value, updatedAt: Date.now() })
        }
        className="bg-white text-xl w-full outline-none border border-gray-300 focus:border-blue-500 rounded-md"
        type="text"
      />

      <textarea
        value={memo.content}
        onChange={e =>
          setMemo({ ...memo, content: e.target.value, updatedAt: Date.now() })
        }
        className="flex-1 resize-none bg-white text-lg w-full outline-none border border-gray-300 focus:border-blue-500 rounded-md"
      />
    </div>
  );
};

export default MemoContainer;
