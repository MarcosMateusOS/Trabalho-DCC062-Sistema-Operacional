import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let pageFaultCount = 0;
  let pointer = 0;
  const [entrada, setEntrada] = useState("");
  const [pointerDegrees, setPointerDegrees] = useState(
    ((pointer + 3) / 12) * 360
  );
  const [bufferToRender, setBufferToRender] = useState(
    new Array(12).fill([-1, undefined])
  );
  const buffer = new Array(12).fill([-1, undefined]);

  const iniciar = async () => {
    if (!entrada) return alert('Digite uma entrada válida!');
    const pagesRequested = entrada.split(" ");
    await searchPages(pagesRequested, buffer);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const clockPageChange = async (page, buffer) => {
    while (true) {
      await sleep(500);
      if (buffer[pointer][0] === -1 || buffer[pointer][0] === 0) {
        buffer[pointer] = [1, page];
        setBufferToRender(buffer);
        pointer = (pointer + 1) % 12;
        setPointerDegrees(((pointer + 3) / 12) * 360);
        break;
      }
      if (buffer[pointer][0] === 1) {
        buffer[pointer][0] = 0;
        setBufferToRender(buffer);
        pointer = (pointer + 1) % 12;
        setPointerDegrees(((pointer + 3) / 12) * 360);
      }
    }
  };

  const searchPages = async (pagesRequested, buffer) => {
    for (const page of pagesRequested) {
      const pageFounded = buffer.find((bufferPage) => bufferPage[1] === page);
      if (!pageFounded) {
        pageFaultCount++;
        await clockPageChange(page, buffer);
      }
    }
    console.log("Quantidade de page faults que ocorreram: ", pageFaultCount);
  };

  return (
    <div className="mainContainer">
      <form className="m-4">
        <div className="mb-3">
          <label htmlFor="entrada" className="form-label">
            Entrada
          </label>
          <input
            type="text"
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            className="form-control"
            id="entrada"
            aria-describedby="entradaHelp"
          />
          <div id="entradaHelp" className="form-text">
            Ex: 1 0 2 5 8 7 9 (Sempre com um espaço após o conteudo)
          </div>
        </div>
        <button type="button" onClick={iniciar} className="btn btn-primary">
          Iniciar
        </button>
      </form>
      <div className="analogicClock">
        <div className="big-circle">
          <div className="marking marking-one"></div>
          <div className="marking marking-two"></div>
          <div className="marking marking-three"></div>
          <div className="marking marking-four"></div>
          <div className="marking marking-six"></div>
          <div className="marking marking-nine"></div>
          {bufferToRender.map((bufferPage, index) => {
            return (
              <div className={`circle-item circle-item-${index + 1}`}>
                {bufferPage[0]}
              </div>
            );
          })}
          <div className="inner-clock-face">
            <div
              className="hand"
              style={{ transform: `rotate(${pointerDegrees}deg)` }}
            ></div>
          </div>
        </div>
      </div>
      <table class="table table-bordered" >
        <thead>
          <tr>
            <th scope="col">Página</th>
            <th scope="col">Bit de Referência</th>
            <th scope="col">Conteúdo</th>
          </tr>
        </thead>
        <tbody>
        {bufferToRender.map((bufferPage, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{bufferPage[0]}</td>
                <td>{bufferPage[1] ?? 'Vazio'}</td>
              </tr>
            );
          })}
          
        </tbody>
      </table>
    </div>
  );
}

export default App;
