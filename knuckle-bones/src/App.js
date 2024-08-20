import './App.css';

function App() {
  return (
    <div className='Container'>
      <div className='player-container'>
        <div>
          
        </div>
        <div className='board'>
          <div>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <div>
          <div className='player'>
            <div className='username'></div>
            <div className='userPic'></div>
            <div className='points'></div>
          </div>
        </div>
      </div>
      <div className='player-container'>
        {/* this is where player 2 goes */}
      </div>
    </div>
  );
}

export default App;
