import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import '../App.css';

interface GreenBoxRefObject {
  increment: () => void;
}

const ForwardRefGreenBox = forwardRef(
  ({}, ref: React.ForwardedRef<GreenBoxRefObject>) => {
    const [num, setNum] = useState<number>(0);

    useImperativeHandle(ref, () => ({
      increment: () => {
        setNum((v) => v + 1);
      },
    }));

    return (
      <div className="box green">
        <button
          onClick={() => {
            setNum((v) => v + 1);
          }}
        >
          {num}
        </button>
      </div>
    );
  }
);
const GreenBox = React.memo(ForwardRefGreenBox);

const RedBox = React.memo(function RedBox() {
  const [num, setNum] = useState<number>(0);

  const greenBoxRef = useRef<GreenBoxRefObject>(null);

  return (
    <div className="box red">
      <button
        onClick={() => {
          setNum((v) => v + 1);
        }}
      >
        {num}
      </button>
      <button
        onClick={() => {
          greenBoxRef.current?.increment();
        }}
      >
        Inc GreenBox
      </button>
      <GreenBox ref={greenBoxRef} />
    </div>
  );
});

export default RedBox;
