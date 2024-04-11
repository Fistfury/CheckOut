const axios = require('axios');

const getPickupLocations = async (req, res) => {
  const { postalCode } = req.body;

  try {
    const response = await axios.get(`https://api2.postnord.com/rest/businesslocation/v1/servicepoint/findByPostalCode.json`, {
      params: {
        countryCode: 'SE', 
        postalCode: postalCode,
        apiKey: process.env.POSTNORD_KEY, 
      }
    });

    res.status(200).json(response.data.servicePointInformationResponse.servicePoints);
  } catch (error) {
    console.error('Error retrieving pickup locations:', error);
    res.status(500).json({ error: 'Error retrieving pickup locations' });
  }
};

module.exports = {getPickupLocations}