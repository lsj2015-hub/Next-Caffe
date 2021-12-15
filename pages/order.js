import { Fragment, useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Header from '../components/Header';
import useSWR from 'swr';

const formatter = Intl.NumberFormat('KO-KR');

const data = [
  { name: '오늘의 커피', price: 2500 },
  { name: '에스프레소', price: 2800 },
  { name: '아메리카노', price: 3000 },
  { name: '카페라떼', price: 3500 },
  { name: '카페모카', price: 3800 },
];

const fetcher = function (url) {
  return axios.get(url).then((res) => res.data);
};

export default function Order(props) {
  // console.log('props.menu', props.menu);
  // console.log('render');
  const [menu, setMenu] = useState([]);
  const [selected, setSelected] = useState([]);

  const sum = useMemo(
    () => selected.reduce((prevValue, item) => prevValue + item.price, 0),
    [selected]
  );

  const { data, error } = useSWR('http://localhost:3000/api/menu', fetcher);

  useEffect(() => {
    // axios
    //   .get('/api/menu')
    //   .then((res) => setMenu(res.data))
    //   .catch(console.warn);
  }, []);

  if (error) {
    return <>에러가 발생했시유ㅠㅠ</>;
  }
  if (!data) {
    return <>Loading.....</>;
  }

  return (
    <div className="container">
      <Head>
        <title>주문하기 - Caffe : 온라인 커피 주문</title>
      </Head>
      <Header />
      <h1 className="font-bold">Order</h1>
      <h2 className="text-xl font-bold">메뉴판</h2>
      <dl>
        {data.map((elem) => (
          <Fragment key={elem.name}>
            <dt>{elem.name}</dt>
            <dd>
              {formatter.format(elem.price)}원
              <small>
                <button
                  onClick={() => {
                    if (selected.includes(elem)) {
                      setSelected(selected.filter((item) => item !== elem));
                    } else {
                      setSelected([...selected, elem]);
                    }
                  }}
                >
                  [{selected.includes(elem) ? '선택 해제' : '선택'}]
                </button>
              </small>
            </dd>
          </Fragment>
        ))}
      </dl>
      <hr />
      <h2 className="text-xl font-bold">주문서</h2>
      <ul className="list-unstyled">
        {selected.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
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

// export async function getServerSideProps(context) {
//   const res = await axios.get('http://localhost:3000/api/menu');
//   return {
//     props: {
//       menu: res.data,
//     },
//   };
// }
