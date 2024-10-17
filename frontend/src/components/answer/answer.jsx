import './answer.css'

const Answer = ({answer}) => {
  return ( 
    <div>
      <h4 className='answerTitle'>Resposta:</h4>
      <p className='answer'>{answer}</p>
    </div>
   );
}
 
export default Answer;