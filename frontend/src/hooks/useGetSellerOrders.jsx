import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setMyOrders } from "../redux/userSlice";

const useGetSellerOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/order/my-orders`,
          { withCredentials: true })
        dispatch(setMyOrders(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchSellerOrders();
  }, []);
};

export default useGetSellerOrders;
