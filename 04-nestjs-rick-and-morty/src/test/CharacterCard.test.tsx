// import assert methods
import { test, expect } from 'vitest'
// import testinglibrary for react
import { screen, render } from '@testing-library/react'
// import component
import CharacterCard from '../app/components/CharacterCard'
import { Character } from '@/app/api/character'

//generar aquí una constante de ZCharacter
const CharacterObject: Character = {
  id: 5,
  name: 'Caro',
  status: 'Alive',
  species: 'Human',
  type: 'Water',
  gender: 'Female',
  origin: {
    name: 'Mexico',
    url: '',
  },
  location: {
    name: 'Monterrey',
    url: '',
  },
  image: '',
  episode: ['1', '2', '3'],
  url: '',
  created: '2003',
}

// name your test
test('character card', () => {
  // render component
  render(
    <CharacterCard
      character={CharacterObject}
      favorites={[1, 2]}
      setFavorites={() => {}}
    />,
  )
  // make an asert
  expect(screen.getByText('Caro')).toBeInTheDocument()
})
