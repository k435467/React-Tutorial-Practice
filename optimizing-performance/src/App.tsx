import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

// ---------
// BLUE BOX
// ---------

interface BlueBoxProps {
  onClick: () => void;
}

// const BlueBox = React.memo(function BlueBox({ onClick }: BlueBoxProps) {
// const BlueBox = ({ onClick }: BlueBoxProps) => {
const BlueBox = React.memo(function BlueBox({ onClick }: BlueBoxProps) {
  const [num, setNum] = useState<number>(0);
  return (
    <div className="box blue">
      <button
        onClick={() => {
          setNum((v) => v + 1);
        }}
      >
        {num}
      </button>
      <button onClick={onClick}>onClick</button>
    </div>
  );
});

// ----------
// GREEN BOX
// ----------

interface GreenBoxProps {
  name: { firstName: string; lastName: string };
}

// const GreenBox = React.memo(function GreenBox({ name }: GreenBoxProps) {
// const GreenBox = ({ name }: GreenBoxProps) => {
const GreenBox = React.memo(function GreenBox({ name }: GreenBoxProps) {
  const [num, setNum] = useState<number>(0);

  // const onClick = () => {
  //   setNum((v) => v + 1);
  // };
  // const onClick = useCallback(() => {
  //   setNum(num + 1);
  // }, []);
  const onClick = useCallback(() => {
    setNum((v) => v + 1);
  }, []);

  return (
    <div className="box green">
      <button
        onClick={() => {
          setNum((v) => v + 1);
        }}
      >
        {num} {JSON.stringify(name)}
      </button>
      <BlueBox onClick={onClick} />
    </div>
  );
});

// ---------
// RED BOX
// ---------

interface RedBoxProps {
  ok?: boolean;
}

const RedBox = ({ ok }: RedBoxProps) => {
  const [num, setNum] = useState<number>(0);

  // const name = { firstName: "foo", lastName: "bar" };
  const name = useMemo(() => ({ firstName: "foo", lastName: "bar" }), []);

  console.log("rendered!");
  const done = useRef<boolean>(false);
  useEffect(() => {
    if (!done.current) {
      console.log("not done!");
      done.current = true;
    }
  });

  return (
    <div className="box red">
      <button
        onClick={() => {
          setNum((v) => v + 1);
        }}
      >
        {num} {ok}
      </button>
      <GreenBox name={name} />
    </div>
  );
};

// ----
// APP
// ----

function App() {
  return (
    <div className="App">
      <RedBox />
    </div>
  );
}

export default App;
