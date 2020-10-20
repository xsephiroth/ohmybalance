import React, { useEffect, useState } from "react";
import tcb from "./tcb";

const useAuth = () => {
  const [loginState, setLoginState] = useState(null);

  useEffect(() => {
    if (!tcb.auth().hasLoginState()) {
      tcb
        .auth()
        .anonymousAuthProvider()
        .signIn()
        .then((res) => setLoginState(res))
        .catch(console.error);
    }
  }, []);

  return loginState;
};

function App() {
  const loginState = useAuth();

  return <div className="App">Hello</div>;
}

export default App;
