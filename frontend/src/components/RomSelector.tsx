import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Game {
  id: number;
  name: string;
  romPath: string;
  coverImage: string;
}

const RomSelector: React.FC = () => {
  const navigate = useNavigate();
  const [games] = useState<Game[]>([
    {
      id: 1,
      name: 'Super Mario Bros',
      romPath: '/roms/super_mario_bros.nes',
      coverImage: '/images/super_mario_bros.jpg',
    },
    {
      id: 2,
      name: 'Contra',
      romPath: '/roms/contra.nes',
      coverImage: '/images/contra.jpg',
    },
  ]);

  const handleSelectGame = (romPath: string) => {
    navigate('/play', { state: { romPath } });
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '24px' }}>选择游戏</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
        {games.map((game) => (
          <div
            key={game.id}
            style={{ cursor: 'pointer', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}
            onClick={() => handleSelectGame(game.romPath)}
          >
            <img
              src={game.coverImage}
              alt={game.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '12px' }}>
              <h3 style={{ margin: 0 }}>{game.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RomSelector;