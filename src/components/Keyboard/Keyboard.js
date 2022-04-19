import { useEffect, useCallback } from 'react'
// import './Keyboard.scss'
import Key from '../Key/Key'
import { useContext } from 'react'
import { AppContext } from "../../App"

const Keyboard = () => {
  const { onSubmit, onDelete, onSelect, currentAttempt, disabledKey, correctKey, presentKey } = useContext(AppContext)

  const keyRows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"]
  ]
  const allKeys = keyRows.flat()


  const handleKeyPress = useCallback((e)=> {
    if (e.key.toLowerCase() === "enter") {
      onSubmit()
    } else if (e.key.toLowerCase() === "backspace") {
      onDelete()
    } else {
      allKeys.forEach((key) => {
        if(e.key.toLowerCase() === key) {
          onSelect(key)
        }
      })
    }
  }, [currentAttempt])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress]);

  return (
    <section id="keyboard" onKeyDown={handleKeyPress}>
      {keyRows.map((keys, i) => (
        <div className="keyboard__row" key={i}>
          {i === 1 && <div className="flex-half" />}
          {keys.map((key) => (
            <Key 
              key={key} 
              keyVal={key}
              disabled={disabledKey.includes(key.toUpperCase())} 
              correct={correctKey.includes(key.toUpperCase())}
              present={presentKey.includes(key.toUpperCase())}
            />
          ))}
          {i === 1 && <div className="flex-half" />}
        </div>
      ))}
    </section>
  );
}

export default Keyboard;
