import './App.css'
import Header from './components/Header/index.jsx'
import Footer from './components/Footer/index.jsx'
import TodoList from './components/TodoList/index.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { useCallback, useEffect, useState, useRef } from 'react';
import { Button } from './components/Button/index.jsx';
import {CalculateNumbers} from './components/CalculateNumbers/index.jsx';

function App() {

  const [counter, setCounter] = useState(0)
  const [numbers, setNumbers] = useState([0, 1, 2])
  const [inputValue, setInputValue] = useState('');

  const increment = () => {
    setCounter((prevCount) => prevCount + 1)
  }

  const decrement = useCallback(() => {
    setCounter((prevCount) => prevCount - 1)
  }, [])

  const addNumbers = () => {
    let someNumbers = []
    while (someNumbers.length < 100) {
      someNumbers.push(Math.floor(Math.random() * 100))
    }
    setNumbers(someNumbers)
    console.log(numbers)
  }

  useEffect(()=>{
    addNumbers()
  },[])

  const prevInputValueRef = useRef('');

  useEffect(() => {
    prevInputValueRef.current = inputValue;
  }, [inputValue]);

  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
    console.log('Сфокусироваться');
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };


  return (
    <ThemeProvider>
      <div className="container">
        <div>
          <h1>Счетчик: {counter}</h1>
          <Button onClick={increment}>Кнопка увеличить</Button>
          <Button onClick={decrement}>Кнопка уменьшить</Button>
        </div>
        <Header />
        <TodoList />
        <Footer />
        <div>
          <input ref={inputRef} 
                  value={inputValue} 
                  onChange={handleChange}
                  placeholder="Введите текст" />
          <p>Текущее значение: {inputValue}</p>
          <p>Предыдущее значение: {prevInputValueRef.current}</p>
          <button onClick={handleClick}>Сфокусироваться</button>
        </div>
        <button onClick={() => addNumbers()}> Кнопка сгенерировать</button>
        <CalculateNumbers numbers={numbers} />

      </div>
    </ThemeProvider>
  )
}

export default App
