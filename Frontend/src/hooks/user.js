import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUserGuilds = () => {
  const ug = useQuery({
    queryKey: ["userGuilds"],
    queryFn: async () => {
      const res = await axios.get("/api/user/guilds");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  return ug;
};
