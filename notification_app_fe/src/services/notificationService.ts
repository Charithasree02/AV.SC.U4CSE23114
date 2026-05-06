import axios from "axios";

export const fetchNotifications = async () => {
  try {
    const response = await axios.get("/api/notifications");

    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);

    throw error;
  }
};
