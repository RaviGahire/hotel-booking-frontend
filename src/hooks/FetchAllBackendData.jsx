import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const FetchAllBackendData = async (endpoint, method = "GET", data = null) => {
  try {
    // console.log(endpoint)
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

// console.log("Mybookings" ,res.data)

    return res

  } catch (error) {
    console.error(error.message);

  }
};