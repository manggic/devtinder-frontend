import React, { useReducer } from "react";
import reducer from "../reducer";

function Play() {
  const [state, dispatch] = useReducer(reducer, { counter: 0 });

  return (
    <div>
      <h1>{state.counter}</h1>
      <button
        className="border p-3 rounded-lg cursor-pointer"
        onClick={() => dispatch({ type: "increment" })}
      >
        increment
      </button>
      <button
        className="border p-3 rounded-lg cursor-pointer"
        onClick={() => dispatch({ type: "decrement" })}
      >
        decrement
      </button>
    </div>
  );
}

export default Play;
