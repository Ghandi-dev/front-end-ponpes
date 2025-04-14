import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import { IProfile } from "@/types/Auth";
import DashboardSantriActive from "./DashboardSantriActive/DashboardSantriActive";
import DashboardSantriInactive from "./DashboardSantriInactive/DashboardSantriInactive";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as IProfile | undefined;
  const isSantriActive = user?.role === "santri" && user?.santri?.status === "active";

  return isSantriActive ? <DashboardSantriActive /> : <DashboardSantriInactive />;
};

export default Dashboard;
