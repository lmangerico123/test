import React, { useState } from 'react';
import type { PollItem, Guest } from './types';
import { PollSection } from './components/PollSection';
import { GuestList } from './components/GuestList';
import { CalendarIcon, MenuIcon, SantaIcon } from './components/icons';

const App: React.FC = () => {
  const [dateOptions, setDateOptions] = useState<PollItem[]>([
    { id: 1, text: '23 de Dezembro', votes: 3 },
    { id: 2, text: '24 de Dezembro', votes: 5 },
    { id: 3, text: '25 de Dezembro', votes: 1 },
  ]);
  const [menuOptions, setMenuOptions] = useState<PollItem[]>([
    { id: 1, text: 'Peru Assado com Farofa', votes: 6 },
    { id: 2, text: 'Bacalhau à Gomes de Sá', votes: 2 },
    { id: 3, text: 'Pernil com Abacaxi', votes: 4 },
  ]);
  const [guests, setGuests] = useState<Guest[]>([
    { id: 1, name: 'Ana Carolina' },
    { id: 2, name: 'Bruno Alves' },
    { id: 3, name: 'Carlos Eduardo' },
  ]);

  const handleAddItem = (type: 'date' | 'menu', text: string) => {
    const newItem = {
      id: Date.now(),
      text,
      votes: 0,
    };
    if (type === 'date') {
      if (!dateOptions.some(option => option.text.toLowerCase() === text.toLowerCase())) {
        setDateOptions(prev => [...prev, newItem]);
      }
    } else if (type === 'menu') {
      if (!menuOptions.some(option => option.text.toLowerCase() === text.toLowerCase())) {
        setMenuOptions(prev => [...prev, newItem]);
      }
    }
  };

  const handleVote = (type: 'date' | 'menu', id: number) => {
    if (type === 'date') {
      setDateOptions(prev =>
        prev.map(item =>
          item.id === id ? { ...item, votes: item.votes + 1 } : item
        )
      );
    } else if (type === 'menu') {
      setMenuOptions(prev =>
        prev.map(item =>
          item.id === id ? { ...item, votes: item.votes + 1 } : item
        )
      );
    }
  };

  const handleAddGuest = (name: string) => {
    if (!guests.some(guest => guest.name.toLowerCase() === name.toLowerCase())) {
      const newGuest = {
        id: Date.now(),
        name,
      };
      setGuests(prev => [...prev, newGuest].sort((a, b) => a.name.localeCompare(b.name)));
    } else {
        alert("Este convidado já está na lista.");
    }
  };

  const handleRemoveGuest = (id: number) => {
    setGuests(prev => prev.filter(guest => guest.id !== id));
  };


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-xl mx-auto">
        <header className="text-center mb-10">
            <div className="flex justify-center items-center gap-4">
              <SantaIcon className="w-16 h-16 text-red-600 dark:text-red-500" />
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-red-600 dark:text-red-500">
                Planejador de Jantar de Natal
              </h1>
            </div>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Vote para decidir a melhor data e o menu perfeito para a nossa celebração!
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PollSection
            title="Votação da Data"
            icon={<CalendarIcon className="w-8 h-8 text-red-600 dark:text-red-500" />}
            items={dateOptions}
            onAddItem={(text) => handleAddItem('date', text)}
            onVote={(id) => handleVote('date', id)}
            placeholder="Ex: 24 de Dezembro"
            color="red"
          />
          <PollSection
            title="Votação do Menu Principal"
            icon={<MenuIcon className="w-8 h-8 text-green-600 dark:text-green-500" />}
            items={menuOptions}
            onAddItem={(text) => handleAddItem('menu', text)}
            onVote={(id) => handleVote('menu', id)}
            placeholder="Ex: Peru Assado"
            color="green"
          />
          <div className="md:col-span-2">
            <GuestList
              guests={guests}
              onAddGuest={handleAddGuest}
              onRemoveGuest={handleRemoveGuest}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;