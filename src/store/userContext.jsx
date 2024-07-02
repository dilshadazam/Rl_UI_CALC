import React, { useState } from "react";
const UserContext = React.createContext({
  userRole: "",
  userName: "",
  // userControl: "",
  // userLastLoginTime: "",
  // userRefreshToken: "",
  // organisationid: "",
  setUserRole: () => {},
  setUserName: () => {},
  // setUserControl: () => {},
  // setUserLastLoginTime: () => {},
  // setUserRefreshToken: () => {},
  // setorgid: () => {},
});
const retrieveStoredData = () => {
  const storedRole = localStorage.getItem("Role");
  const storedName = localStorage.getItem("Name");
  // const storedControl = localStorage.getItem("Control");
  // const storedLastLoginTime = localStorage.getItem("LasLoginTime");
  // const storeduserId = localStorage.getItem("organisationid");

  return {
    userName: storedName,
    userRole: storedRole,
    // userControl: storedControl,
    // userLastLoginTime: storedLastLoginTime,
    // organisationid: storeduserId,
  };
};
export const UserContextProvider = (props) => {
  const storedData = retrieveStoredData();
  var initialRole;
  var initialName;
  // var initialControl;
  // var initialLastLoginTime;
  // var initialuserId;

  if (storedData) {
    initialRole = storedData.userRole;
    initialName = storedData.userName;
    // initialControl = storedData.userControl;
    // initialLastLoginTime = storedData.userLastLoginTime;
    // initialuserId = storedData.organisationid;
  }
  const [userRole, setUserRole] = useState(initialRole);
  const [userName, setUserName] = useState(initialName);
  // const [userControl, setUserControl] = useState(initialControl);
  // const [organisationid, setorgid] = useState(initialuserId);

  // const [userLastLoginTime, setUserLastLoginTime] =
  //   useState(initialLastLoginTime);

  const userRoleHandler = (userRole) => {
    setUserRole(userRole);
    localStorage.setItem("Role", userRole);
  };
  const userNameHandler = (userName) => {
    setUserName(userName);
    localStorage.setItem("Name", userName);
  };
  // const userLastLoginTimeHandler = (userLastLoginTime) => {
  //   setUserLastLoginTime(userLastLoginTime);
  //   localStorage.setItem("LastLoginTime", userLastLoginTime);
  // };
  // const userNameHandler = (userName) => {
  //   setUserName(userName);
  //   localStorage.setItem("Name", userName);
  // };
  // const userControlHandler = (userControl) => {
  //   setUserControl(userControl);
  //   localStorage.setItem("control", userControl);
  // };

  // const orgidHandler = (organisationid) => {
  //   setorgid(organisationid);
  //   localStorage.setItem("organisationid", organisationid);
  // };

  const contextValue = {
    userRole: userRole,
    userName: userName,
    // userControl: userControl,
    // userLastLoginTime: userLastLoginTime,
    // organisationid: organisationid,

    setUserRole: userRoleHandler,
    setUserName: userNameHandler,
    // setUserControl: userControlHandler,
    // setUserLastLoginTime: userLastLoginTimeHandler,
    // setorgid: orgidHandler,
  };
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
