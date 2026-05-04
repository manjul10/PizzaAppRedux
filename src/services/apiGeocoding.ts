export async function getAddress({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longit
     ude=${longitude}`,
  );
  if(!res.ok) throw Error("failed getting address");

  const data = await res.json();
  return data;
}
