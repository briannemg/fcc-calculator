import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Display from "./components/Display";
import ButtonPad from "./components/ButtonPad";
import { input, clear, evaluate } from "./features/calculatorSlice";

export default function App() {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      if (!isNaN(key) || key === ".") {
        dispatch(input(key));
        setActiveButton(key);
      } else if (["+", "-", "*", "/"].includes(key)) {
        dispatch(input(key));
        setActiveButton(key);
      } else if (key === "Enter" || key === "=") {
        e.preventDefault();
        dispatch(evaluate());
        setActiveButton("=");
      } else if (key === "Backspace" || key.toLowerCase() === "c") {
        dispatch(clear());
        setActiveButton("AC");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  // Clear active button highlight after 200ms
  useEffect(() => {
    if (!activeButton) return;
    const timer = setTimeout(() => setActiveButton(null), 200);
    return () => clearTimeout(timer);
  }, [activeButton]);

  return (
    <div id="calculator" className="calculator">
      <Display />
      <ButtonPad activeButton={activeButton} />
    </div>
  );
}
