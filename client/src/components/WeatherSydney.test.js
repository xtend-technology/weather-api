import { render, screen } from '@testing-library/react';
import WeatherSydney from './WeatherSydney';

describe('Weather Sydney', ()=> {
    test('h4 renders', async () => {
        render(<WeatherSydney />);
        const linkElement = await screen.findAllByRole('output');
        await expect(linkElement).not.toHaveLength(0);
      });
      test('test h4 text', async () => {
        render(<WeatherSydney />);
        const linkElement = await screen.findByText("weather", {exact:false});
        await expect(linkElement).toBeInTheDocument();
      });
})
