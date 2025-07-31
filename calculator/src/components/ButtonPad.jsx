import { useDispatch } from "react-redux";
import { input, clear, evaluate } from "../features/calculatorSlice";

const buttons = [
  { id: "clear", text: "AC", value: "AC" },
  { id: "divide", text: "/", value: "/" },
  { id: "multiply", text: "*", value: "*" },
  { id: "seven", text: "7", value: "7" },
  { id: "eight", text: "8", value: "8" },
  { id: "nine", text: "9", value: "9" },
  { id: "subtract", text: "-", value: "-" },
  { id: "four", text: "4", value: "4" },
  { id: "five", text: "5", value: "5" },
  { id: "six", text: "6", value: "6" },
  { id: "add", text: "+", value: "+" },
  { id: "one", text: "1", value: "1" },
  { id: "two", text: "2", value: "2" },
  { id: "three", text: "3", value: "3" },
  { id: "zero", text: "0", value: "0" },
  { id: "decimal", text: ".", value: "." },
  { id: "equals", text: "=", value: "=" },
];

export default function ButtonPad({ activeButton }) {
  const dispatch = useDispatch();

  return (
    <>
      {buttons.map(({ id, text, value }) => {
        const isActive = activeButton === value;
        return (
          <button
            key={id}
            id={id}
            className={isActive ? "active" : ""}
            onClick={() =>
              value === "AC"
                ? dispatch(clear())
                : value === "="
                ? dispatch(evaluate())
                : dispatch(input(value))
            }
          >
            {text}
          </button>
        );
      })}
    </>
  );
}
