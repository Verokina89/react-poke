import PokemonLogo from '../assets/img/pokemonGo.jpeg'

const Header = () => (
    <header>
        <img src={PokemonLogo} className='logoPokemon' alt="Logo Pokemon" />
        <h1>Buscador de Pokemon</h1>
  </header>
)
export default Header