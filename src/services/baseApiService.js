const BASE_URL = "https://react-fast-pizza-api.onrender.com/api";

export const getMenuList = async () => {
  const res = await fetch(`${BASE_URL}/menu`);
  if (!res.ok) throw new Error("Data not found!");
  const { data } = await res.json();
  return data;
};

export const createNewOrder = async (newOrder) => {
  try {
    const res = await fetch(`${BASE_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
};

export const getOrderbyId = async (id) => {
  const res = await fetch(`${BASE_URL}/order/${id}`);
  if (!res.ok) throw new Error(`This ${id} is not found`);
  const { data } = await res.json();
  return data;
};

export const updateOrderById = async (id, data) => {
  try {
    const res = await fetch(`${BASE_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Error to updating order");
  } catch (error) {
    console.log(error);
  }
};
