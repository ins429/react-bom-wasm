import React, { useEffect, useState } from "react";
import Umd from "./Umd";

const umdMode = true;

function App() {
  const [name, setName] = useState("");
  const [yamlValue, setYamlValue] = useState("");
  const [jsonValue, setJsonValue] = useState("");

  useEffect(() => {
    if (!umdMode) {
      window.Blazor.start({
        loadBootResource: function (type, name, defaultUri, integrity) {
          console.log("defaultUri", defaultUri);
          if (defaultUri.indexOf("localhost") > 0) {
            return "https://localhost:5001/_framework/dotnet.6.0.1.ynjylm5yl3.js";
          }
          return `https://localhost:5001/${defaultUri}`;
        },
      });
    }
  }, []);

  if (umdMode) {
    return <Umd />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dialog parser</h1>

        <div>
          <p>hello world example</p>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button
            onClick={() => {
              const { result, ...rest } = window.DotNet.invokeMethod(
                "Wasm.Client",
                "GetHelloMessage",
                name
              );
              console.log(result, rest);
              alert(result);
            }}
          >
            clickme
          </button>
        </div>
        <div id="wrapper" style={{ display: "flex" }}>
          <div id="left">
            <textarea
              onChange={(e) => {
                setYamlValue(e.target.value);

                const { result, ...rest } = window.DotNet.invokeMethod(
                  "Wasm.Client",
                  "JSYamlChange",
                  e.target.value
                );

                setJsonValue(result);
                console.log(result, rest);
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
