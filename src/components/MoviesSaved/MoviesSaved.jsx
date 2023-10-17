import { useState } from "react";
import useSearch from "../../hooks/useSearch";
import Section from "../Section/Section";
import SearchBar from '../SearchBar/SearchBar';
import Divider from '../Divider/Divider';
import Cards from "../Cards/Cards";

function MoviesSaved({ cards, onLike, onDisLike, likedList }) {
  const [isShort, setIsShort] = useState(false);

  const {
    onSearchSubmit,
    filteredFilms,
    deleteFromArray,
  } = useSearch({mainArray: cards, isShort: isShort, preload: true});

  /* --- ОБРАБОТЧИКИ --- */
  function handeOptionChange () {
    setIsShort(!isShort)
  }

  async function handleSubmit (inValue) {
    onSearchSubmit(inValue, cards);
  }

  async function handleDelete(card) {
    deleteFromArray(card);
  }

  return (
    <main>
      <Section
        type='inner'
        customClass='movies'
        aria='Поиск фильмов'
      >
        <SearchBar
          onSubmit={handleSubmit}
          onOptionChange={handeOptionChange}
          option={isShort}
        />
        <Divider/>
        <Cards
          cards={filteredFilms}
          type='saved'
          likedList={likedList}
          onLike={onLike}
          onDisLike={onDisLike}
          onDelite={handleDelete}
        />
      </Section>
    </main>
  );
}

export default MoviesSaved;
