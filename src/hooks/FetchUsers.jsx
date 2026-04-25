import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const FetchUsers = async (endpoint, method = "GET", data = null) => {
  try {
    const token = localStorage.getItem("token");

    // console.log(endpoint,method,data)

    const res = await axios({
      url: `${API_URL}/${endpoint}`,
      method: method.toLowerCase(),
      data: data, 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res?.data?.success) {
      console.log(res?.data?.message);
    }

    return res.data.data;

  } catch (error) {
    console.error(error.message);
    throw error;
  }
};