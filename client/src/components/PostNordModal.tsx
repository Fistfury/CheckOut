import axios from "axios";
import { ChangeEvent, useState } from "react";
import Select from "react-select";

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
  const [postalCode, setPostalCode] = useState<string>("");
  const [pickupLocations, setPickupLocations] = useState<ServicePoint[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<ServicePoint | null>(
    null
  );


  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostalCode(e.target.value);
  };

  const handleFindPickupLocations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/postnord/pickup-locations`,
        { params: { postalCode } }
      );
      setPickupLocations(response.data );
    } catch (error) {
      console.error("Error fetching pickup locations:", error);
      
    }
  };
  const options = pickupLocations.map((location) => ({
    value: location.servicePointId,
    label: `${location.name} `,
  }));

  const handleChange = (option: { value: string; label: string } | null) => {
    if (option) {
      const location = pickupLocations.find(
        (loc) => loc.servicePointId === option.value
      );
      if (location) {
        setSelectedLocation(location);
      }
    } else {
      setSelectedLocation(null);
    }
  };

  const handleSelect = () => {
    if (selectedLocation) {
      onPickupLocationSelected(selectedLocation);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg m-4 relative max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 p-4 text-2xl text-beard-dark hover:text-beard-orange"
        >
          &times;
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-serif font-bold text-beard-dark mb-5">
            Select a Pickup Location
          </h2>
          <input
            className="w-full p-3 mb-4 border border-beard-grey rounded focus:outline-none focus:ring-2 focus:ring-beard-dark focus:border-transparent"
            type="text"
            name="postalCode"
            value={postalCode}
            onChange={handleAddressChange}
            placeholder="Postal Code"
          />
          <button
            onClick={handleFindPickupLocations}
            className="mb-4 px-6 py-2 bg-beard-orange text-beard-cream font-semibold rounded hover:bg-beard-light-orange transition duration-300"
          >
            Find Pickup Locations
          </button>
          <Select
            options={options}
            onChange={handleChange}
            className="w-full mb-4"
            placeholder="Select a pickup location"
            styles={{
              control: (provided) => ({
                ...provided,
                border: "1px solid #545449", 
                boxShadow: "none",
                "&:hover": {
                  border: "1px solid #603321", 
                },
                "&:focus": {
                  borderColor: "#603321", 
                },
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "#b76743" : "#fff", 
                "&:hover": {
                  backgroundColor: "#b56742", 
                },
              }),
            }}
          />
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleSelect}
              className="flex-1 px-6 py-2 bg-beard-dark text-beard-cream font-semibold rounded hover:bg-beard-deep-brown transition duration-300"
            >
              Select Location
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-6 py-2 bg-beard-grey text-beard-cream font-semibold rounded hover:bg-beard-darkest transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
