// lib는 "라이브러리"의 줄임말로, 보통 프로젝트에서 공통적으로 쓸 코드들을 모아두는 폴더
// setItem 유틸 함수로 분리
export function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// key: string: 로컬스토리지의 키는 무조건 문자열
// value: T: 어떤 타입이든 받을 수 있게 **제네릭 타입 <T>**로 설정.
//           문자열, 숫자, 배열, 객체 등 어떤 자료형도 타입 안전하게 저장 가능.
// void: 반환값은 없으니까 void

// useEffect로 메모 변경될 때 localStorage에 저장
// useEffect(() => {
//   localStorage.setItem('memos', JSON.stringify(memos));
// }, [memos]);

// key가 없으면 null.
// getItem: 어떤 타입이든 꺼내올 때 타입 안전 + null 처리
export function getItem<T>(key: string): T | null {
  const value = localStorage.getItem(key);
  if (value === null) return null;

  return JSON.parse(value) as T;
}
// as T는 **타입 단언(type assertion)**
