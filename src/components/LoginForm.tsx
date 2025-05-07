import { notifications } from '@mantine/notifications';
import {
  Box,
  Button,
  Paper,
  Title,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import React, { useState } from "react";
import styled from "styled-components";
import { IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const xicon = <IconX size={20} />
  const navigate = useNavigate();

  const handleSubmit = () => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (isSignup) {
      if (users[email]) {
        setMessage({ text: "Account already exists. Please log in.", type: "error" });
      } else {
        users[email] = password;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("isLoggedIn", "true");
        setMessage({ text: "Account created successfully. Please log in.", type: "success" });
        notifications.show({
          color: 'green',
          title: 'Account created!',
          message: 'Redirect to all details page.',
        });
        navigate('/alldetails');
        setIsSignup(false);
      }
    } else {
      if (!users[email]) {
        setMessage({ text: "No account found. Please sign up first.", type: "error" });
        notifications.show({
          color: 'red',
          title: message.type,
          message: message.text,
        });
      } else if (users[email] !== password) {
        setMessage({ text: "Incorrect password.", type: "error" });
        notifications.show({
          color: 'red',
          title: message.type,
          message: message.text,
        });
      } else {
        setMessage({ text: "Login successful!", type: "success" });
        localStorage.setItem("isLoggedIn", "true");
        notifications.show({
          color: 'green',
          title: 'Credentials Matched!',
          message: 'Redirecting to all details page.',
        });
        navigate('/alldetails');
      }
    }
  };

  return (
    <LoginWrapper className='d-flex flex-column'>
      <h2 className='mb-4'>Welcome User!</h2>
      <StyledPaper shadow="sm" radius="md" withBorder>
        <Title align="center" order={3} mb="md" style={{ color: "#222", fontSize: "1.8rem" }}>
          {isSignup ? "Sign Up" : "Login"}
        </Title>

        <Box className="form-box">
          <TextInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            size="sm"
            required
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            size="sm"
            radius="md"
            required
            mt="sm"
          />

          <Button
            fullWidth
            size="sm"
            mt="lg"
            radius="xl"
            onClick={handleSubmit}
            style={{ backgroundColor: "#1e90ff", fontWeight: 500, fontSize: "0.9rem" }}
          >
            {isSignup ? "Sign Up" : "Login"}
          </Button>

          <Button
            variant="subtle"
            mt="sm"
            size="xs"
            color="blue"
            component='a'
            onClick={() => {
              setIsSignup(!isSignup);
              setMessage({ text: "", type: "" });
            }}
          >
            {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </Button>
        </Box>
      </StyledPaper>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const StyledPaper = styled(Paper)`
  width: 100%;
  max-width: 360px;
  padding: 24px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  .form-box {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  label {
    font-size: 0.9rem;
    font-weight: 500;
    color: #333;
  }

  input {
    font-size: 0.9rem;
  }
`;

export default LoginForm;
