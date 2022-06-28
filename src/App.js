import './App.css';
import React from 'react';
import styled from "styled-components";
import HandleTable from "./HandleTable";


function App() {
  return (
    <Container>
       <HandleTable />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export default App;
