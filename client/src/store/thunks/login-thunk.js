import axios from "axios";
import { authActions } from "../auth-slice";

export const login = (credentials) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const baseUrl = process.env.REACT_APP_API_URL;
      const res = await axios.post(
        `${baseUrl}/user/login`,
        credentials, {headers: {'Content-Type': 'application/json'}}
      );

      if (res.status === 200) {
        // location.replace('/client/pages/expenses/addExpense.html')
        dispatch(
          authActions.login({
            token: res.data.token,
            isPremium: res.data.isPremium,
          })
        );
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      alert("Error signing in: " + error.message);
    }
  };
};
