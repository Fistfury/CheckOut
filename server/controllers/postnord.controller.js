const axios = require('axios');

const getPickupLocations = async (req, res) => {
  const { postalCode } = req.query;
  try {
    const response = await axios.get(`https://atapi2.postnord.com/rest/businesslocation/v5/servicepoints/nearest/byaddress`, {
      params: {
        returnType: 'json',
        countryCode: 'SE',
         postalCode: postalCode,
        apikey: process.env.POSTNORD_KEY,
      }
    });
    res.status(200).json(response.data.servicePointInformationResponse.servicePoints);
   
  } catch (error) {
    console.error('Error retrieving pickup locations:', error);
    res.status(500).json({ error: 'Error retrieving pickup locations' });
  }
};

module.exports = {getPickupLocations}