// import assert methods
import { test, expect } from 'vitest'
// import testinglibrary for react
import { screen, render } from '@testing-library/react'
// import component
import Header from '@/app/components/Header'

// name your test
test('header', () => {
  // render component
  render(<Header />)
  // make an asert
  expect(screen.getByText('Favorites')).toBeInTheDocument()
})
