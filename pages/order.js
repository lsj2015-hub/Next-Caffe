import { useState, useMemo } from 'react';
import Header from '../components/Header';

const formatter = Intl.NumberFormat('KO-KR');

export default function Order() {
  const [hasEspresso, setEspresso] = useState(false);
  const [hasAmericano, setAmericano] = useState(false);
  const [hasLatte, setLatte] = useState(false);

  const sum = useMemo(() => {
    let value = 0;
    value += hasEspresso ? 2800 : 0;
    value += hasAmericano ? 3000 : 0;
    value += hasLatte ? 3500 : 0;
    return value;
  }, [hasEspresso, hasAmericano, hasLatte]);

  return (
    <div className="container">
      <Header />
      <h1 className="font-bold">Order</h1>
      <h2 className="text-xl font-bold">메뉴판</h2>
      <dl>
        <dt>에스프레소</dt>
        <dd>
          2,8000원
          <small>
            <button onClick={() => setEspresso(!hasEspresso)}>
              [{hasEspresso ? '선택 해제' : '선택'}]
            </button>
          </small>
        </dd>

        <dt>아메리카노</dt>
        <dd>
          3,0000원
          <small>
            <button onClick={() => setAmericano(!hasAmericano)}>
              [{hasAmericano ? '선택 해제' : '선택'}]
            </button>
          </small>
        </dd>

        <dt>카페라떼</dt>
        <dd>
          3,5000원
          <small>
            <button onClick={() => setLatte(!hasLatte)}>
              [{hasLatte ? '선택 해제' : '선택'}]
            </button>
          </small>
        </dd>
      </dl>
      <hr />
      <h2 className="text-xl font-bold">주문서</h2>
      <ul className="list-unstyled">
        {hasEspresso && <li>에스프레소</li>}
        {hasAmericano && <li>아메리카노</li>}
        {hasLatte && <li>카페라떼</li>}
      </ul>
      합계 : {formatter.format(sum)}원
      <div className="mt-4">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => {
            confirm(
              `주문 합계는 ${formatter.format(sum)}원입니다. 주문하시겠습니끼?`
            );
          }}
        >
          주문하기
        </button>
      </div>
    </div>
  );
}
