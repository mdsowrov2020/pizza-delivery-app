export const getAddress = async ({ latitude, longitude }) => {
  console.log(latitude, longitude);
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error("Error to fetch address");

  const data = await res.json();
  console.log(data);
  return data;
};
