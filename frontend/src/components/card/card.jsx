import { useState } from "react";
import './card.css';

const Card = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  return (   
    <div className="cardContainer">
      <h2 className="title"><strong>Faça sua pergunta sobre o mundo dos videogames</strong></h2>
      <form className="form">
        <input 
          type="text" 
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="input" 
          placeholder="Digite sua pergunta aqui"/>
        <button type="submit" className="button">Perguntar</button>
      </form>
    </div>
   );
}
 
export default Card;