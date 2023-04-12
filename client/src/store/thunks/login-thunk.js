import axios from "axios";
import { authActions } from "../auth-slice";
import { history } from "../../helpers/history";

export const login = (credentials) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const baseUrl = process.env.REACT_APP_API_URL;
      const res = await axios.post(`${baseUrl}/user/login`, credentials, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        dispatch(
          authActions.login({
            token: res.data.token,
            isPremium: res.data.isPremium,
          })
        );
        history.navigate('/expenses');
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      alert("Error signing in: " + error.message);
    }
  };
};
