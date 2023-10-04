import Section from "../Section/Section";
import SearchBar from "../SearchBar/SearchBar";
import Divider from '../Divider/Divider';
import Cards from "../Cards/Cards";


function Movies({cards, type = 'all'}) {
  return (
    <>
      <Section type='inner' customClass='movies' aria='Поиск фильмов'>
        <SearchBar/>
        <Divider/>
        <Cards cards={cards} type={type} />
      </Section>
    </>
  );
}

export default Movies;
