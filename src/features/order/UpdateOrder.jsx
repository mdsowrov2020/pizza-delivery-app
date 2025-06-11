import React from "react";
import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrderById } from "../../services/baseApiService";

const UpdateOrder = () => {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH">
      <Button>Make priority</Button>
    </fetcher.Form>
  );
};

export default UpdateOrder;

export const action = async ({ request, params }) => {
  const data = { priority: true };
  await updateOrderById(params.orderId, data);

  return null;
};
