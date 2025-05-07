import { FC } from "react";
import LoginForm from "../../components/LoginForm";
import styled from "styled-components";

const Landing: FC = () => {

  return (
    <WebsiteContainer className="d-flex justify-content-center align-items-center">
      <LoginForm />
    </WebsiteContainer>
  );
};

const WebsiteContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;
`;

export default Landing;