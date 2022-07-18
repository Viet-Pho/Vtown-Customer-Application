import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosGet, axiosPatch } from "../util/restAPI";
import { useJWTAuth } from "./AuthProvider";
import { format as formatDate } from "date-fns";

const ProfileContext = createContext({
  customerId: 0,
  profileInfo: {},
});
const ProfileActionsContext = createContext({
  setProfile: (prop, value) => {},
  updateProfileInfo: (type) => {},
});

export const useProfile = () => useContext(ProfileContext);

export const useProfileActions = () => useContext(ProfileActionsContext);

const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    customerId: 0,
    profileInfo: {},
  });
  // const { user } = useJWTAuth();

  // const fetchProfile = async (customerId) => {
  //   const { data: profile } = await axiosGet(`/customers/${customerId}`).catch(
  //     (err) => {
  //       return { data: null };
  //     }
  //   );

  //   return profile;
  // };

  // useEffect(() => {
  //   const doFetchProfile = async () => {
  //     if (user) {
  //       const profile = await fetchProfile(user.id);
  //       setProfileData({ customerId: user.id, profileInfo: profile });
  //     }
  //   };
  //   doFetchProfile();
  // }, user);

  const initProfile = (customerId, profile) => {
    setProfileData({ profileInfo: profile, customerId });
  };

  const setProfileCustomerId = (customerId) => {
    setProfileData({ ...profileData, customerId });
  };

  const setProfile = (prop, value) => {
    setProfileData({
      customerId: profileData.customerId,
      profileInfo: {
        ...profileData.profileInfo,
        [prop]: value,
      },
    });
  };

  const updateProfileInfo = async (addionalInfo = {}) => {
    const formatedProfile = {
      ...profileData.profileInfo,
      birthday: formatDate(
        new Date(profileData.profileInfo.birthday),
        "yyyy-MM-dd"
      ),
      ...addionalInfo,
    };

    await axiosPatch(
      `/customers/${profileData.customerId}`,
      formatedProfile
    ).catch((err) => {
      console.log(799999, err)
    });

    return true;
  };

  return (
    <ProfileContext.Provider
      value={{
        ...profileData,
      }}
    >
      <ProfileActionsContext.Provider
        value={{
          setProfileCustomerId,
          setProfile,
          updateProfileInfo,
          initProfile,
        }}
      >
        {children}
      </ProfileActionsContext.Provider>
    </ProfileContext.Provider>
  );
};
export default ProfileProvider;
