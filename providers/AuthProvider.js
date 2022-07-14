import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import jwtAxios, { setAuthToken } from "./index";
import { AsyncStorage } from "react-native";

const JWTAuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});
const JWTAuthActionsContext = createContext({
  signUpUser: () => {},
  signInUser: () => {},
  logout: () => {},
});

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

const JWTAuthAuthProvider = ({ children }) => {
  const [firebaseData, setJWTAuthData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const retriveUserInfo = async () => {
    const { data: userInfo } = await jwtAxios.post("/auth").catch((err) => {
      return { data: null };
    });

    return userInfo;
  };

  useEffect(() => {
    const getAuthUser = async () => {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }

      setAuthToken(token);

      const userInfo = await retriveUserInfo();

      if (!userInfo) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      if (userInfo) {
        await AsyncStorage.setItem("user", JSON.stringify(userInfo));
        setJWTAuthData({
          user: userInfo,
          isLoading: false,
          isAuthenticated: true,
        });
      }
    };

    getAuthUser();
  }, []);

  const signInUser = async ({ email, password }) => {
    // dispatch(fetchStart());
    try {
      const { data } = await jwtAxios.post("/logIn", {
        email,
        password,
      });

      await AsyncStorage.setItem("token", data.token);
      setAuthToken(data.token);

      setJWTAuthData({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      //   dispatch(fetchSuccess());
    } catch (error) {
      console.log(error?.response?.data?.message);
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      //   dispatch(fetchError(`Error: ${error?.response?.data?.message}`));
    }
  };

  const signUpUser = async ({
    username,
    email,
    password,
    first_name,
    last_name,
    age,
    phone_number,
    address,
  }) => {
    try {
      const { data } = await jwtAxios.post("signUp", {
        username,
        email,
        password,
        first_name,
        last_name,
        age,
        phone_number,
        address,
      });

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      setAuthToken(data.token);
      setJWTAuthData({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return "Sign in Successfully";
    } catch (err) {
      console.log(err.response.data.message);
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      return `${err.response.data.message}`;

      //   dispatch(fetchError(`Error: ${err?.response?.data?.message}`));
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");

    setAuthToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...firebaseData,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          logout,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;
