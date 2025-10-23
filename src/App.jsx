import { useEffect, useRef, useState } from 'react';
import './App.css'
import api from './Api';

function App() {
  const [movies, setMovies] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  async function mySubmitHandler(event) {
    event.preventDefault();
    const query = inputRef.current.value;
    try {
      const response = await api.get('/search/shows', {
        params: { q: query }
      });
      setMovies(response.data);

    } catch (error) {
      console.error("Execution error:", error);

    }
    }
  

  return (
    <div className="central-container"> {/* Centraliza o conteúdo na tela */}
      <h1>Filmes</h1>
      
      <form onSubmit={mySubmitHandler}>
        <input type='text' id="query" ref={inputRef} />
        <button type="submit">Buscar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Ano de Estréia</th>
            <th>Término</th>
            <th>Avaliação</th>
          </tr>
        </thead>
        <tbody>
          {movies.map( movie => (
            <tr>
              <td>
                <a href={movie.show.url} target='blank'>
                <img src={movie.show.image && movie.show.image.medium} width={50} />
                </a>
              </td>
              <td>
                {movie.show.name}
              </td>
              <td>
                {movie.show.premiered}
              </td>
              <td>
                {movie.show.ended || `Em exibição`}
              </td>
              <td>
                {movie.show.rating.avarage || 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default App
