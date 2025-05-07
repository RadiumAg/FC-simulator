import { createBrowserRouter } from 'react-router-dom';
import GameEmulator from './components/GameEmulator';
import RomSelector from './components/RomSelector';
import HomePage from './components/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    index:true,
    element: <HomePage />,
  },
  {
    path: '/play',
    element: <GameEmulator />,
  },
  {
    path: '/select',
    element: <RomSelector />,
  },
]);

export default router;