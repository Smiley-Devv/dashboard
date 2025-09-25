import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

export const useUserGuilds = () => {
  const { getToken, isSignedIn } = useAuth();

  const ug = useQuery({
    queryKey: ["userGuilds"],
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get("/api/user/guilds", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    enabled: isSignedIn,
    refetchOnWindowFocus: false,
  });

  return ug;
};
