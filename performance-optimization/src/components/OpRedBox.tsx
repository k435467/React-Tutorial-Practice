import React, { useState, useMemo, useCallback } from 'react';
import '../App.css';

interface BlueBoxProps {
  onClick: () => void;
}

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
      <button onClick={onClick}>Inc GreenBox</button>
    </div>
  );
});

interface GreenBoxProps {
  name: { firstName: string; lastName: string };
}

const GreenBox = React.memo(function GreenBox({ name }: GreenBoxProps) {
  const [num, setNum] = useState<number>(0);

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
        {num}
      </button>
      <BlueBox onClick={onClick} />
    </div>
  );
});

interface RedBoxProps {
  ok?: boolean;
}

const OpRedBox = React.memo(function OpRedBox({ ok }: RedBoxProps) {
  const [num, setNum] = useState<number>(0);

  const name = useMemo(() => ({ firstName: 'foo', lastName: 'bar' }), []);

  return (
    <div className="box red">
      <button
        onClick={() => {
          setNum((v) => v + 1);
        }}
      >
        {num}
      </button>
      <GreenBox name={name} />
    </div>
  );
});

export default OpRedBox;
