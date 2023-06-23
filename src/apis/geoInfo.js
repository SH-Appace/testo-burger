import axios from '../axios';
import {google_api_key} from '../utils/googleCloudApi';
export async function getGeoInfo(lat, long, setCountryCode, setLoading) {
  setLoading(true);
  try {
    const {data} = await axios.post(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${google_api_key}`,
    );
    if (data) {
      setCountryCode(
        data.results[data.results.length - 1].address_components[0].short_name,
      );
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
  }
}
