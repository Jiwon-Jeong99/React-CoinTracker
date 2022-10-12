import React from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

// interface가 안되는 이유 : useParams가 유니온 타입으로 되어 있어서임
type RouteParams = {
  coinId: string;
};

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
  display: block;
`;

interface ILocation {
  state: string;
}

const Coin = () => {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouteParams>();
  // const {state} = useLocation<RouteState>();
  // //click할 때 state 생성
  const { state } = useLocation() as ILocation;
  console.log(state);

  return (
    <Container>
      <Header>
        <Title>{ state || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
};

export default Coin;
