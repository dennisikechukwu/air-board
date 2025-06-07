// FlightDetails.tsx
import { useParams, Link } from 'react-router-dom';

const FlightDetails = () => {
  const { flightNumber } = useParams();

  return (
    <div className="min-h-screen bg-white text-center p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">Flight Details</h2>
      <p className="text-xl mb-6">Flight Number: <strong>{flightNumber}</strong></p>
      <Link to="/" className="text-blue-600 hover:underline">
        ← Back to Search
      </Link>
    </div>
  );
};

export default FlightDetails;
