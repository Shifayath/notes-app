import { useState } from "react";
import Login from "./components/Login";
import Notes from "./components/Notes";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app-container">
      {user ? <Notes /> : <Login onLogin={(user) => setUser(user)} />}
    </div>
  );
}

export default App;
