import React, { useMemo } from 'react';

export const CalculateNumbers = ({numbers}) => {
    const sumNumbers = useMemo(()=> {
        return numbers.reduce((all, num) => all + num)
    }, [numbers])
    return (
        <div>
          <div>Сумма чисел: {sumNumbers}</div>
          <pre>{numbers.join(",\n")}</pre>
        </div>
      )
}
