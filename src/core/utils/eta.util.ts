import axios from "axios";

async function calculateETA(
  driverLoc: { lat: number; lng: number },
  customerLoc: { lat: number; lng: number }
) {
  const origin = `${driverLoc.lat},${driverLoc.lng}`;
  const destination = `${customerLoc.lat},${customerLoc.lng}`;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${process.env.GOOGLE_API_KEY}`;

  try {
    const res = await axios.get(url);
    const element = res.data.rows[0].elements[0];

    if (element.status === "OK") {
      return {
        eta: element.duration.text,
        distance: element.distance.text,
      };
    } else {
      return { eta: "N/A", distance: "N/A" };
    }
  } catch (err: any) {
    console.error("ETA Error: ", err.message);
    return { eta: "Error", distance: "Error" };
  }
}

export default calculateETA;
