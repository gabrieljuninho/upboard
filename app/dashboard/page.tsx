import { auth } from "@/auth";

import LogOutButton from "@/features/auth/components/log-out-button";

const DashboardPage = async () => {
  const session = await auth();

  return (
    <>
      Dashboard Page
      {JSON.stringify(session)}
      <LogOutButton />
    </>
  );
};

export default DashboardPage;
