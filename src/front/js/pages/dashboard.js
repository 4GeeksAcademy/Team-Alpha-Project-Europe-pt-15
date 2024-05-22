import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";

import { UserPanel } from "../component/userPanel"

export const Dash = () => {
  const { store, actions } = useContext(Context);
  const { user } = store;
  const { getUser } = actions;

  const TEST_USER_ID = 1

  React.useEffect(() => {
    getUser(TEST_USER_ID)
  }, [])

  return (
    <div className="container  p-0 m-0 page-dashboard h-100">
      <UserPanel user={user} />
    </div>
  );
};
