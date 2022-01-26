import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import './App.css';

// ---------
// BLUE BOX
// ---------

interface BlueBoxProps {
  onClick: () => void;
}

interface BlueBoxRefObject {
  inc: () => void;
}

// const BlueBox = React.memo(function BlueBox({ onClick }: BlueBoxProps) {
const BlueBox: React.ForwardRefRenderFunction<
  BlueBoxRefObject,
  BlueBoxProps
> = ({ onClick }, ref) => {
  // const BlueBox = React.memo(function BlueBox({ onClick }: BlueBoxProps) {
  const [num, setNum] = useState<number>(0);

  useImperativeHandle(ref, () => ({
    inc: () => {
      setNum((v) => v + 1);
    },
  }));

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
};

const ImperativeBlueBox = forwardRef(BlueBox);

// ----------
// GREEN BOX
// ----------

interface GreenBoxProps {
  name: { firstName: string; lastName: string };
}

// const GreenBox = React.memo(function GreenBox({ name }: GreenBoxProps) {
const GreenBox = ({ name }: GreenBoxProps) => {
  // const GreenBox = React.memo(function GreenBox({ name }: GreenBoxProps) {
  const [num, setNum] = useState<number>(0);

  const onClick = () => {
    setNum((v) => v + 1);
  };
  // const onClick = useCallback(() => {
  //   setNum(num + 1);
  // }, []);
  // const onClick = useCallback(() => {
  //   setNum((v) => v + 1);
  // }, []);

  const blueBoxRef = useRef<BlueBoxRefObject>(null);

  return (
    <div className="box green">
      <button
        onClick={() => {
          setNum((v) => v + 1);
        }}
      >
        {num} {JSON.stringify(name)}
      </button>
      <button onClick={blueBoxRef.current?.inc}>inc on BlueBox</button>
      <ImperativeBlueBox ref={blueBoxRef} onClick={onClick} />
    </div>
  );
};

// ---------
// RED BOX
// ---------

interface RedBoxProps {
  ok?: boolean;
}

const RedBox = ({ ok }: RedBoxProps) => {
  const [num, setNum] = useState<number>(0);

  const name = { firstName: 'foo', lastName: 'bar' };
  // const name = useMemo(() => ({ firstName: "foo", lastName: "bar" }), []);

  return (
    <div className="box red">
      <button
        onClick={() => {
          setNum((v) => v + 1);
        }}
      >
        {num} {ok?.toString()}
      </button>
      <GreenBox name={name} />
    </div>
  );
};

export default RedBox;
