import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../Context/Context';

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  return (
    <div className='main'>
      <div className='nav'>
        <p>Chatbot</p>
        <img src={assets.user_icon} alt='User Icon' />
      </div>
      <div className='main-container'>
        { !showResult ? (
          <>
            <div className='greet'>
              <p><span>Hello, Dev</span></p>
              <p>How can I help you today?</p>
            </div>
          </>
        ) : (
          <div className='result'>
            <div className='result-title'>
              <img src={assets.user_icon} alt='User Icon' />
              <p>{recentPrompt}</p>
            </div>
            <div className='result-data'>
              <img src={assets.gemini_icon} alt='Gemini Icon' />
              {loading ? (
                <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className='main-bottom'>
          <div className='search-box'>
            <input 
              onChange={(e) => setInput(e.target.value)} 
              value={input} 
              type='text' 
              placeholder='Enter a prompt here' 
            />
            <div>
              <img src={assets.gallery_icon} alt='Gallery Icon' />
              <img src={assets.mic_icon} alt='Mic Icon' />
              <img onClick={onSent} src={assets.send_icon} alt='Send Icon' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
