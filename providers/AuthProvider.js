import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import jwtAxios, { setAuthToken } from "./index";
import { AsyncStorage } from "react-native";
import { axiosGet, axiosPatch } from "../util/restAPI";

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
      let token = await AsyncStorage.getItem("token");
      // override token when login feature not implement yet
      // if (!token) token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoibnFocHRpdEBnbWFpbC5jb20iLCJyb2xlIjoxLCJ1c2VybmFtZSI6Im5xaHB0aXQxIiwiY29uZmlybWVkIjoxLCJpYXQiOjE2NTcwNzE1NjAsImV4cCI6MTY1OTY2MzU2MH0.PngDhiwG0pW2MSX1aP7i5mNq5_K3u8Jn44on3eghA3k'

      // local
      // await AsyncStorage.setItem("token",'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoibnFocHRpdEBnbWFpbC5jb20iLCJyb2xlIjoxLCJ1c2VybmFtZSI6Im5xaHB0aXQxIiwiY29uZmlybWVkIjoxLCJpYXQiOjE2NTcwNzI4NjQsImV4cCI6MTY1OTY2NDg2NH0.3ZPFISAhJBrLwzkEaZe9GtZmJZc-EGq5LEC_o2D30PE');

      if (!token) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }

      await setAuthToken(token);

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

  const refreshUserInfo = async () => {
    const userInfo = await retriveUserInfo();

    setJWTAuthData({
      user: userInfo,
      isLoading: false,
      isAuthenticated: true,
    });
    return;
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
          refreshUserInfo
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;
