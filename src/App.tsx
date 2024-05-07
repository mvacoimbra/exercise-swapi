import React from 'react';
import { useState } from 'react';
import useSWPlanets from './hooks/useSWPlanets';
import TextTyping from './components/TextTyping';

export default function App() {
  const { nameList: planetlist, isLoading } = useSWPlanets();
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(null);
  if (isLoading || planetlist === null) {
    return (
      <div className='flex justify-center p-4 items-center w-full h-screen'>
        <TextTyping className='text-9xl' text='Loading...' />
      </div>
    );
  }

  return (
    <main className='p-4 glow flex flex-col gap-4'>
      <TextTyping text='Star Wars planets' className='text-4xl' />
      <ul className='flex text-2xl w-full min-h-24 border-2 border-[#00FF00] p-2 gap-3 flex-wrap'>
        {planetlist.map((item, index) => {
          return (
            <li key={index}>
              <button
                className='hover:underline glow opacity-0'
                style={{
                  animation: `fadeIn 60ms ${index * 60}ms forwards`,
                  textDecoration: selectedPlanet === index ? 'underline' : '',
                }}
                onClick={() => {
                  setSelectedPlanet(index);
                }}
              >
                {item.name}
                {/* <TextTyping text={item.name} /> */}
              </button>
            </li>
          );
        })}
      </ul>

      <TextTyping text='Planet data' className='text-4xl' />
      <div className='flex w-full min-h-24 border-2 border-[#00FF00] p-2'>
        {selectedPlanet === null ? (
          <h2 className='text-2xl'>please select a planet</h2>
        ) : (
          <ul className='text-2xl'>
            <li>Name: {planetlist[selectedPlanet].name}</li>
            <li>Climate: {planetlist[selectedPlanet].climate}</li>
            <li>Diameter: {planetlist[selectedPlanet].diameter}</li>
            <li>Gravity: {planetlist[selectedPlanet].gravity}</li>
            <li>Population: {planetlist[selectedPlanet].population}</li>
            <li>Orbital period: {planetlist[selectedPlanet].orbital_period}</li>
          </ul>
        )}
      </div>
    </main>
  );
}
