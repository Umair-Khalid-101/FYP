import React, { useEffect, useState } from "react";
import axios from "axios";

const EtherScan = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "/api?module=account&action=balance&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&tag=latest&apikey=1DWRED6I53RQBVTGUG9TKUC1GG8TTTIH25"
      )
      .then((res) => {
        const data = res.data;
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("Data: ", data);
  return (
    <>
      <h1>EtherScan</h1>
      <h2>Balance: {data.result}</h2>
    </>
  );
};

export default EtherScan;
