import PokemonEmblema from '../assets/img/PokemonEmblema.jpg'

const Header = () => (
    <header>
        <img src={PokemonEmblema} className='logoPokemon' alt="Logo Pokemon" />
        <h1>Buscador de Pokemon</h1>
  </header>
)
export default Header