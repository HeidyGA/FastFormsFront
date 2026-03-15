import React from "react";
import { useAtom } from "jotai";
import { userAtom } from "../stores/authAtom";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  return (
    <div>
      <h1>{user?.name}</h1>
      <div>Dashboard</div>
      <button onClick={() => navigate("/create-survey")}>Create Survey</button>
    </div>
  );
};

export default Dashboard;
