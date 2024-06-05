import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders login page', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );
  const loginButton = screen.getByText(/로그인/i);
  expect(loginButton).toBeInTheDocument();
});