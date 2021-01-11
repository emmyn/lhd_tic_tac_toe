import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  const [turn, setTurn] = useState(true);
  const [player1, setPlayer1] = useState([]);
  const [player2, setPlayer2] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const handleClick = (id) => {
    let temp = turn ? player1 : player2;
    temp.push(id);
    turn ? setPlayer1(temp) : setPlayer2(temp);
    if (turn ? checkForWin(temp) : checkForWin(temp)) {
      alert(`Looks like ${turn ? "player 1" : "player 2"} wins this one!`);
      turn
        ? setPlayer1Score(player1Score + 1)
        : setPlayer2Score(player2Score + 1);
      setPlayer1([]);
      setPlayer2([]);
    } else {
      if (player1.length + player2.length === 9) {
        alert("Nobody wins this one :(");
        setPlayer1([]);
        setPlayer2([]);
      }
      setTurn(!turn);
    }
  };

  const checkForWin = (player) => {
    return (
      checker([1, 4, 7], player) ||
      checker([2, 5, 8], player) ||
      checker([3, 6, 9], player) ||
      checker([1, 2, 3], player) ||
      checker([4, 5, 6], player) ||
      checker([7, 8, 9], player) ||
      checker([3, 5, 7], player) ||
      checker([1, 5, 9], player)
    );
  };

  const checker = (array, target) => {
    if (target) return array.every((value) => target.includes(value));
    return false;
  };

  const renderSquare = (id) => {
    return (
      <Col
        onClick={() => handleClick(id)}
        className="customRow"
        id={`square${id}`}
      >
        {player1.includes(id) && <p className="selected">X</p>}
        {player2.includes(id) && <p className="selected">O</p>}
      </Col>
    );
  };

  const reset = () => {
    setPlayer1([]);
    setPlayer2([]);
    setPlayer1Score(0);
    setPlayer2Score(0);
  };

  return (
    <div id="container">
      <div id="header">
        <Row>
          <Col sm={5}>
            <h2>Tic Tac Toe</h2>
          </Col>
          <Col sm={5}>
            <p style={{ fontFamily: "'Poppins', sans-serif" }}>
              {" "}
              It's {turn ? "player 1" : "player 2"}'s turn!
            </p>
          </Col>
          <Col>
            <h5 onClick={() => reset()}>Reset Scores</h5>
          </Col>
        </Row>
      </div>
      <div id="options">
        <Row>
          <Col sm={3}>
            <p
              className="info"
              style={{ fontSize: "50px", color: "black", paddingLeft: "50px" }}
            >
              {" "}
              {player1Score} : {player2Score}{" "}
            </p>
          </Col>
        </Row>
      </div>
      <div id="game">
        <Container>
          <Row>
            {renderSquare(1)}
            {renderSquare(2)}
            {renderSquare(3)}
          </Row>
          <Row>
            {renderSquare(4)}
            {renderSquare(5)}
            {renderSquare(6)}
          </Row>
          <Row>
            {renderSquare(7)}
            {renderSquare(8)}
            {renderSquare(9)}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
