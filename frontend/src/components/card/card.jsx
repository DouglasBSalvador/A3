import { useState } from "react";
import './card.css';
import Answer from "../answer/answer";
import axios from "axios";

const Card = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Codifica a questão para o formato de URL
    const encodedQuestion = encodeURIComponent(question)

    try {
      // Faz a requisição GET para a API utilizando Axios
      const response = await axios.get(`http://localhost:3000/consultar`, {
        params: {
          question: encodedQuestion,
        },
      })

      setAnswer(response.data.answer)
      setIsLoading(false)
    } catch (error) {
      console.error('Erro na requisição:', error)
      setAnswer("Houve um erro, tente novamente mais tarde.")
      setIsLoading(false)
    }
  };
  return (   
    <div className="cardContainer">
      <h2 className="title"><strong>Faça sua pergunta sobre o mundo dos videogames</strong></h2>
      <form className="form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="input" 
          placeholder="Digite sua pergunta aqui"/>
        <button type="submit" disabled={isLoading} className="button">Perguntar</button>
      </form>
      {answer && (
        <div className="flex items-start w-full">
          <Answer answer={answer}/>
        </div>
      )}
    </div>
   );
}
 
export default Card;