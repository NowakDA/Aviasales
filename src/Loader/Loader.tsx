import  { useState, useEffect } from 'react';
import './Loader.scss';

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 100); // обновляем прогресс каждую 0.1 секунды

    return () => clearInterval(interval); // Очистим интервал при размонтировании
  }, []);

  return (
    <div className="loader-container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default Loader;
