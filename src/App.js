import React, { useState, useEffect } from 'react';
import './App.scss';
import colorArray from './Color';

const quotesDBUrl = 'https://type.fit/api/quotes';

function App() {
  const [quote, setQuote] = useState("Genius is one percent inspiration and ninety-nine percent perspiration.");
  const [author, setAuthor] = useState("Thomas Edison");
  const [ranNumber, setRanNumber] = useState("0");
  const [quoteArr, setQuoteArr] = useState([]);
  const [colorRandome, setColorRandome] = useState("#282c34");
  const [animation, setAnimation] = useState(true);

  useEffect(() => {
    fetch(quotesDBUrl)
      .then(res => res.json())
      .then(
        (result) => {
          setQuoteArr(result);
        },
        (error) => {
          console.log(error);
        }
      )
  }, [])

  const getRandomQuote = () => {
    setRanNumber(Math.floor(Math.random() * quoteArr.length));
    setQuote(quoteArr[ranNumber].text);
    setAuthor(quoteArr[ranNumber].author);

    const randomInterger = Math.floor(Math.random() * colorArray.length);
    setColorRandome(colorArray[randomInterger]);
  }

  const handleClick = () => {
    getRandomQuote();
    setAnimation(!animation);

  }


  return (
    <div className={`App ${animation ? 'animated' : null }`}>
      <header className="App-header" style={{backgroundColor: colorRandome}}>
        <div id="quote-box" style={{color: colorRandome}}>
          <span id="text"><i className="fas fa-quote-left"></i> {quote}</span>
          <span id="author">{author}</span>
          <div className="buttons">
            <a id="tweet-quote" style={{backgroundColor: colorRandome}} href={encodeURI(`https://twitter.com/intent/tweet?text=${author}`)}><i className="fab fa-twitter"></i></a>
            <button id="new-quote" style={{backgroundColor: colorRandome}} onClick={() => handleClick()}>New quote</button>
          </div>

        </div>

      </header>

    </div>
  );
}

export default App;
