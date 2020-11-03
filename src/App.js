/*global chrome*/
import { useState } from "react";
import "./App.css";

function App() {
  const [ele, setEle] = useState(null);

  const findEle = function (e) {
    chrome.tabs.executeScript(null, { file: "jquery.min.js" }, function () {
      chrome.tabs.executeScript(null, {
        code: `
          (function(){
            let ele = ${ele}
            console.log(ele)
          })()
        `,
      });
    });
  };

  const clickEle = function (e) {
    chrome.tabs.executeScript(null, { file: "jquery.min.js" }, function () {
      chrome.tabs.executeScript(null, {
        code: `
          (function(){
            ${ele}.click()
          })()
        `,
      });
    });
  };

  const clickEleInterval = function (e) {
    chrome.tabs.executeScript(null, { file: "jquery.min.js" }, function () {
      chrome.tabs.executeScript(
        null,
        { file: "clickInterval.js" },
        function () {
          chrome.tabs.query({ active: true, currentWindow: true }, function (
            tabs
          ) {
            var activeTab = tabs[0];
            chrome.tabs.executeScript(activeTab.id, {
              code: `
              clickInterval(${ele}, "start")
            `,
            });
          });
        }
      );
    });
  };

  const clearClickEleInterval = function (e) {
    chrome.tabs.executeScript(null, { file: "jquery.min.js" }, function () {
      chrome.tabs.executeScript(
        null,
        { file: "clickInterval.js" },
        function () {
          chrome.tabs.query({ active: true, currentWindow: true }, function (
            tabs
          ) {
            var activeTab = tabs[0];
            chrome.tabs.executeScript(activeTab.id, {
              code: `
              clickInterval(${ele}, "stop")
            `,
            });
          });
        }
      );
    });
  };

  return (
    <div className="App">
      <input onChange={(e) => setEle(e.target.value)} />
      <br />
      <button id="findEle" onClick={findEle}>
        find element
      </button>
      <button id="clickEle" onClick={clickEle}>
        click element
      </button>
      <button id="clickEleInterval" onClick={clickEleInterval}>
        click element interval
      </button>
      <button id="clearInterval" onClick={clearClickEleInterval}>
        clear interval
      </button>
    </div>
  );
}

export default App;
