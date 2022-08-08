import React, { useState, createContext, useEffect } from "react";

const AuthContext = createContext();

function AuthContextComponent(props) {
  const [loggedInUser, setLoggedInUser] = useState({ token: "", user: {} });
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    const parsedStoredUser = JSON.parse(storedUser || '""');

    if (parsedStoredUser.user) {
      setLoggedInUser({ ...parsedStoredUser })
    }
    setAuthLoading(false)

  }, []);

  return (
    <AuthContext.Provider value={{ authLoading,loggedInUser, setLoggedInUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContextComponent, AuthContext };
