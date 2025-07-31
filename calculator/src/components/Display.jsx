import { useSelector } from "react-redux";

export default function Display() {
  const { expression, current } = useSelector((state) => state);

  return (
    <>
      <div id="expression">{expression}</div>
      <div id="display">{current}</div>
    </>
  );
}
