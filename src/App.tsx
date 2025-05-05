import { useCallback, useState } from 'react';
import Sidebar from './components/Sidebar';
import MemoContainer from './components/MemoContainer';
import { Memo } from './types/memo';
import { getItem, setItem } from './lib/storage.ts';
import debounce from 'lodash.debounce';

// debounce는 연속해서 호출되는 함수의 실행을 지연시켜서 마지막 호출만 실행되게 만들어 줌.
const debouncedSetItem = debounce(setItem, 3000); // 3초 후 setItem 실행

function App() {
  const [memos, setMemos] = useState<Memo[]>(getItem<Memo[]>('memo') || []);
  // 사용자가 선택한 메모의 배열 인덱스를 저장
  // -1: 아무 메모도 선택되지 않음
  const [selectedMemoIndex, setSelectedMemoIndex] = useState(0);

  // memos를 직접 참조하면 의존성 배열 관리가 어려워지고, 최신 상태를 보장하기 어려움.
  // addMemo, deleteMemo, setMemo 모두 함수형 업데이트로 리팩토링
  // 선택된 메모를 수정하는 함수(특정 인덱스의 메모만 바꾸는 역할)
  const setMemo = useCallback(
    (newMemo: Memo) => {
      setMemos(prevMemos => {
        // 이전 상태 기반으로 업데이트(prevMemos는 현재 상태값임)
        const newMemos = [...prevMemos];
        newMemos[selectedMemoIndex] = newMemo;
        debouncedSetItem('memo', newMemos);
        return newMemos; // 새 상태
        // setMemos에 전달하는 함수는 반드시 '새 상태'를 리턴해야함
        // setMemos는 이 함수의 리턴값을 보고 상태를 바꿔주기 때문
      });
      // 새 상태 직접 전달 방식.
      // const newMemos = [...memos]; // 복사본 생성 => 불변성 지킴!
      // newMemos[selectedMemoIndex] = newMemo; // 복사본 수정
      // setMemos(newMemos); // 복사본을 set // 여기서는 그냥 배열을 바로 넣음
      // debouncedSetItem('memo', newMemos);
    },
    [selectedMemoIndex], //의존성 배열에서 memos 제거 가능 + 최신 상태 보장.
  );

  const addMemo = useCallback(() => {
    setMemos(prevMemos => {
      const newMemos = [
        ...prevMemos,
        {
          title: 'Untitled',
          content: '',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ];
      debouncedSetItem('memo', newMemos);
      // 이 안에서 바로 인덱스 업데이트
      setSelectedMemoIndex(newMemos.length - 1);
      return newMemos;
    });
  }, []); // 의존성 없음

  const deleteMemo = useCallback(
    (index: number) => {
      setMemos(prevMemos => {
        const newMemos = [...prevMemos]; // 배열 복사
        newMemos.splice(index, 1); // 배열 수정, index 위치에서 1개 삭제
        // selectedMemoIndex도 함수형 업데이트로
        debouncedSetItem('memo', newMemos);
        return newMemos;
      });
      // selectedMemoIndex 업데이트를 setMemos 밖으로 빼기
      setSelectedMemoIndex(prevSelectedIndex => {
        if (memos.length === 0) {
          // 아무 메모도 없으면 -1로 해두는 게 안전 (조건부 렌더링 시 체크하기 쉬움)
          return -1;
        } else if (index === prevSelectedIndex) {
          // 현재 선택한 걸 지웠으면 앞쪽으로 이동하거나 첫 번째로
          return Math.max(0, index - 1);
        } else if (index < prevSelectedIndex) {
          // 앞의 메모가 지워졌으면 인덱스도 1 줄여서 보정
          return prevSelectedIndex - 1;
        }
        return prevSelectedIndex;
      });
    },
    [memos.length], //함수형 업데이트로 memos와 selectedMemoIndex 의존성 제거
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar
        memos={memos}
        setSelectedMemoIndex={setSelectedMemoIndex}
        selectedMemoIndex={selectedMemoIndex}
        addMemo={addMemo}
        deleteMemo={deleteMemo}
      />
      <MemoContainer memo={memos[selectedMemoIndex]} setMemo={setMemo} />
    </div>
  );
}

export default App;
// 앱 로드 시 localStorage에서 데이터 가져오기
//useEffect(() => {}, []);

// 메모 변경될 때 localStorage에 저장
// useEffect(() => {
//   localStorage.setItem('memos', JSON.stringify(memos));
// }, [memos]);
