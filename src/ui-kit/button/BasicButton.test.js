import React            from 'react'
import {render, screen} from '@testing-library/react'
import BasicButton      from './BasicButton'

it('renders Basic Button', () => {
  render(<BasicButton>Test text button</BasicButton>)
  const button = screen.getByText(/Test text button/i)
  expect(button)
    .toBeInTheDocument()
})
