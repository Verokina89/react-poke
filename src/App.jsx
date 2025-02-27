
import Header from './pages/Header'
import Form from './components/Form'
import './assets/App.css';

function App() {
  return (
    <>
      <Header />
      <Form />
    </>
  );
}
  
export default App;




/*notas: el fragment agrupa una lista de hijos sin agregar nodos extra al DOM. Simplemente envuelve y mantiene un clean code. Si se utiliza un section, no es necesario un fragment. Tecnicamente; "un fragment se refiere a una característica de React que te permite agrupar un conjunto de elementos hijos sin agregar un nodo adicional al DOM (Documento Object Model) resultante."

*/