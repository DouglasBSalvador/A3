import './index.css';
import Card from "./components/card/card";
import Header from "./components/header/header";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Card />
      </div>
    </>
  );
}

export default App;
