import axios from 'axios';
import { useState } from 'react';

interface ServicePoint {
  servicePointId: string;
  name: string;
  visitingAddress: string;
}

interface PostNordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPickupLocationSelected: (location: ServicePoint) => void;
}

export const PostNordModal = ({
  isOpen,
  onClose,
  onPickupLocationSelected,
}: PostNordModalProps) => {
  const [postalCode, setPostalCode] = useState<string>('');
  const [pickupLocations, setPickupLocations] = useState<ServicePoint[]>([]);

  const handleFindPickupLocations = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/postnord/pickup-locations`, {
        params: { postalCode }
      });
      setPickupLocations(response.data.servicePoints);
    } catch (error) {
      console.error('Error fetching pickup locations:', error);
    }
  };

  const handlePickupLocationSelect = (location: ServicePoint) => {
    onPickupLocationSelected(location);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="font-bold text-lg mb-4">Select a Pickup Location</h2>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleFindPickupLocations}
        >
          Find Locations
        </button>
        <div className="mt-4">
          {pickupLocations.map((location, idx) => (
            <div
              key={idx}
              className="p-2 border-b border-gray-200 cursor-pointer"
              onClick={() => handlePickupLocationSelect(location)}
            >
              <p>{location.name}</p>
              <p className="text-sm text-gray-600">{location.visitingAddress}</p>
            </div>
          ))}
        </div>
        <button
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};