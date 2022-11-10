import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import { requestGet } from '../../../utils/Resquest';
import AppWrap from '../../../wrapper/AppWrap';

function DetailsSeller() {
  const [details, setDetails] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    requestGet(`/customer/orders/${id}`)
      .then((response) => {
        setDetails(response);
        console.log(response);
        console.log(id);
      });
  }, []);
  console.log(details);
  return (
    details.map((detail, index) => (

      <div key={ index }>
        <h1>

          {detail.id}
          {detail.status}

        </h1>
        {detail.totalPrice}
      </div>
    ))
  );
}

export default AppWrap(DetailsSeller, Header, Footer);
