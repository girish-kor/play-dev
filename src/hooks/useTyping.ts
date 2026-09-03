import { useState, useEffect } from 'react';

export function useTyping(text: string, speed: number = 30) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- must clear synchronously when text is emptied
      setDisplayedText('');
      setIsComplete(true);
      return;
    }
    let index = 0;
    setDisplayedText('');
    setIsComplete(false);
    const interval = setInterval(() => {
      if (index < text.length) {
        const nextChar = text.charAt(index);
        setDisplayedText((prev) => prev + nextChar);
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayedText, isComplete };
}
