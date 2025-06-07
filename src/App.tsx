import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

interface Flight {
  flight: { iata: string };
  airline: { name: string };
  arrival: { airport: string };
  departure: { airport: string; scheduled: string };
  flight_status: string;
}

const App: React.FC = () => {
  const [inputCode, setInputCode] = useState('');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_AVIATION_API_KEY;

  const fetchFlights = async (airportCode: string) => {
    if (!airportCode) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.aviationstack.com/v1/flights?access_key=${apiKey}&dep_iata=${airportCode}`
      );
      const data = await response.json();
      setFlights(data.data.slice(0, 10));
    } catch (error) {
      console.error('Failed to fetch flights:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const trimmed = inputCode.trim().toUpperCase();
    if (trimmed !== '') {
      setFlights([]);
      fetchFlights(trimmed);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-7 text-center mt-3.5 bg-gradient-to-r from-blue-300 to-blue-800 bg-clip-text text-transparent italic">
        Airport Flight Status Board
      </h1>


      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        <input
          type="text"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          placeholder="Enter Airport Code (e.g. LAX)"
          className="border px-4 py-2 rounded-lg w-64 shadow"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-900 font-bold ">Loading flights...</p>
        ) : flights.length > 0 ? (
          <table className="w-full text-left">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-2 px-3">Flight</th>
                <th className="py-2 px-3">Airline</th>
                <th className="py-2 px-3">To</th>
                <th className="py-2 px-3">Departure Time</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3">
                    <Link
                      to={`/flight/${flight.flight.iata}`}
                      className="text-blue-600 hover:underline font-bold"
                    >
                      {flight.flight.iata}
                    </Link>
                  </td>
                  <td className="py-2 px-3">{flight.airline.name}</td>
                  <td className="py-2 px-3">{flight.arrival.airport}</td>
                  <td className="py-2 px-3">
                    {flight.departure.scheduled &&
                      new Date(flight.departure.scheduled).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                  </td>
                  <td className="py-2 px-3 capitalize">{flight.flight_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600">No flights found. Try searching above.</p>
        )}
      </div>
    </div>
  );
};

export default App;
