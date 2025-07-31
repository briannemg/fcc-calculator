// This replaces writing separate action creators and reducers
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expression: "",
  current: "0",
  evaluated: false,
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    input: (state, action) => {
      const val = action.payload;
      const isNumberOrDecimal = /[0-9.]/.test(val);
      const isOperator = /[+\-*/]/.test(val);

      if (state.evaluated) {
        if (isNumberOrDecimal) {
          state.expression = val;
          state.current = val;
          state.evaluated = false;
          return;
        } else if (isOperator) {
          state.expression = state.current + val;
          state.current = val;
          state.evaluated = false;
          return;
        }
      }

      if (isNumberOrDecimal) {
        const parts = state.expression.split(/[+\-*/]/);
        const currentNum = parts[parts.length - 1];

        if (val === "." && currentNum.includes(".")) return;
        if (val === "0" && currentNum === "0") return;

        const newCurrent =
          state.current === "0" && val !== "." ? val : state.current + val;

        state.expression += val;
        state.current = newCurrent;
        return;
      }

      if (isOperator) {
        const lastChar = state.expression.slice(-1);
        const secondLastChar = state.expression.slice(-2, -1);

        if (/[+\-*/]/.test(lastChar)) {
          if (val === "-" && lastChar !== "-") {
            state.expression += val;
            state.current = val;
            return;
          } else if (/[+\-*/]/.test(secondLastChar)) {
            state.expression = state.expression.slice(0, -2) + val;
            state.current = val;
            return;
          } else {
            state.expression = state.expression.slice(0, -1) + val;
            state.current = val;
            return;
          }
        } else {
          state.expression += val;
          state.current = val;
          return;
        }
      }
    },

    clear: () => initialState,

    evaluate: (state) => {
      try {
        const sanitized = state.expression.replace(/[^-()\d/*+.]/g, "");
        const result = eval(sanitized) || "0";
        state.expression += "=" + result;
        state.current = result.toString();
        state.evaluated = true;
      } catch {
        state.expression = "";
        state.current = "Error";
        state.evaluated = true;
      }
    },
  },
});

export const { input, clear, evaluate } = calculatorSlice.actions;
export default calculatorSlice.reducer;
