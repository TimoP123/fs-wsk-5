import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const Statistiikka = ({ reset }) => {
  const state = store.getState();
  const palautteita = state.good + state.ok + state.bad;

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    );
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{state.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{state.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{state.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td />
          </tr>
          <tr>
            <td>positiivisia</td>
            <td />
          </tr>
        </tbody>
      </table>

      <button onClick={reset}>nollaa tilasto</button>
    </div>
  );
};

class App extends React.Component {
  klik = nappi => () => {
    store.dispatch({ type: nappi });
  };

  reset = () => {
    store.dispatch({ type: "ZERO" });
  };

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik("GOOD")}>hyvä</button>
        <button onClick={this.klik("OK")}>neutraali</button>
        <button onClick={this.klik("BAD")}>huono</button>
        <Statistiikka reset={this.reset} />
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

render();
store.subscribe(render);
