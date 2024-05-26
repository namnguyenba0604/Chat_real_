import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/service";

export const useFetchRecipientUsers = (chatRoom, user) => {
  const [recipientUsers, setRecipientUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecipientUsers = async () => {
      if (!chatRoom?.members) return null;

      const recipientIds = chatRoom.members.filter((id) => id !== user?._id);

      const promises = recipientIds.map(async (recipientId) => {
        const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);
        if (response.error) {
          setError(response.error);
          return null;
        }
        return response;
      });

      const results = await Promise.all(promises);
      const filteredResults = results.filter((result) => result !== null);

      setRecipientUsers(filteredResults);
    };

    getRecipientUsers();
  }, [chatRoom, user]);

  return { recipientUsers, error };
};
