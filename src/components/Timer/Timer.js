import { useContext } from 'react'
import { AppContext } from '../../App';

const Timer = () => {
  const { seconds, minutes } = useContext(AppContext)
  
  return (
    <div className="header__timer">
      {minutes} : {seconds}
    </div>
  );
}

export default Timer;