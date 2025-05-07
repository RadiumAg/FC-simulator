import React, { useEffect, useState } from 'react';

interface Game {
  id: number;
  title: string;
  coverUrl: string;
  romSize: string;
}

const HomePage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // 调用 Puppeteer 爬虫文件
        const { default: fetchRoms } = await import('../src/puppeteerScraper.js');
        const data = await fetchRoms();
        if (data) {
          setGames(data);
        }
      } catch (error) {
        console.error('Failed to fetch games:', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div>
      <h1>红白机游戏列表</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {games.map((game) => (
          <div key={game.id} style={{ margin: '10px', textAlign: 'center' }}>
            <img src={game.coverUrl} alt={game.title} style={{ width: '200px', height: '200px' }} />
            <p>{game.title}</p>
            <p>ROM 大小: {game.romSize}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;