import React, { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [sayHelloResult, setSayHelloResult] = useState("");
  const [isBooted, setIsBooted] = useState(false);
  const [yamlValue, setYamlValue] = useState("");
  const [jsonValue, setJsonValue] = useState("");

  useEffect(() => {
    window.dotnet.boot().then(() => setIsBooted(true));
  }, []);

  if (!isBooted) {
    return "Booting dotnet wasm...";
  }

  return (
    <div className="App">
      <div>
        <input
          type="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="your name"
          value={name}
        />
        <button
          onClick={() => {
            const result = window.dotnet.Umd.SayHello(name);
            setSayHelloResult(result);
          }}
        >
          Say hi
        </button>
        <p>{sayHelloResult}</p>
      </div>
      <header className="App-header">
        <h1>Dialog parser</h1>

        <div id="wrapper" style={{ display: "flex" }}>
          <div id="left">
            <textarea
              onChange={async (e) => {
                setYamlValue(e.target.value);

                const result = window.dotnet.Umd.YamlChange(e.target.value);

                setJsonValue(result);
              }}
              value={yamlValue}
              style={{ width: "600px", height: "600px" }}
            />
          </div>
          <div id="right">
            <pre style={{ width: "600px", height: "600px" }}>{jsonValue}</pre>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
