import './App.css';
import { useState } from 'react';
import RedBox from './components/RedBox';
import OpRedBox from './components/OpRedBox';
import ImperativeDemo from './components/ImperativeDemo';

function App() {
  const [num, setNum] = useState<number>(0);

  return (
    <div className="container">
      <button
        onClick={() => {
          setNum((v) => v + 1);
        }}
      >
        Render App
      </button>
      <RedBox />
      <OpRedBox />
      <ImperativeDemo />
    </div>
  );
}

export default App;
