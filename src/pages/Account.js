import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Layout } from "../components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  width: 500px;
  max-width: 80%;
  margin: 0 auto;
`;

const styledMixin = css`
  width: 100%;
  border-radius: 5px;
  line-height: 35px;
  border: transparent;
  background-color: ${(props) => props.theme.backgroundColor.secondary};
  color: ${(props) => props.theme.color.primary};
  margin: 5px;
  padding: 3px 15px;
  font-size: 1.1em;
`;

const EmailInput = styled.input.attrs({ type: "email" })`
  ${styledMixin}
`;

const PasswordInput = styled.input.attrs({ type: "password" })`
  ${styledMixin}
`;

const Button = styled.button.attrs({ type: "submit" })`
  display: block;
  ${styledMixin}
`;

const SwitchLink = styled.a`
  color: ${(props) => props.theme.color.primary};
  float: right;
  margin-top: 5px;
`;

const Account = () => {
  const [formType, setFormType] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <Container>
        <LoginForm onSubmit={handleSubmit}>
          <EmailInput
            placeholder="邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button>{formType === "login" ? "登录" : "注册"}</Button>
          <SwitchLink
            onClick={() =>
              setFormType((t) => (t === "login" ? "register" : "login"))
            }
          >
            {formType === "login" ? "注册" : "登录"}
          </SwitchLink>
        </LoginForm>
      </Container>
    </Layout>
  );
};

export default Account;
