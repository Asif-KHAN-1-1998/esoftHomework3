import React from 'react';

// Дочерний компонент, который принимает функцию обратного вызова
export const Button = React.memo(({ onClick, children }) => {
  console.log(`Рендер кнопки ${children}`);
  return <button onClick={onClick}>{children}</button>;
});