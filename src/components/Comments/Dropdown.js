import React from "react";
import "./styles/dropdown.css";

export default function Dropdown({
  users,
  activeUser,
  handleChangeActiveUser
}) {
  const toggleDropdown = () => {
    document
      .getElementById("dropdownContentWrapper")
      .classList.toggle("showDropdown");
  };

  window.onclick = function (event) {
    if (
      !event.target.matches(".buttonContent") &&
      !event.target.matches(".dropBtn") &&
      !event.target.matches(".btnText")
    ) {
      const dropdownWrapper = document.getElementsByClassName(
        "dropdownContent"
      )[0];
      if (dropdownWrapper.classList.contains("showDropdown")) {
        dropdownWrapper.classList.remove("showDropdown");
      }
    }
  };

  return (
    <div className="dropdownContainer">
      <div className="dropdownWrapper">
        <button className="dropBtn" onClick={toggleDropdown}>
          <div className="buttonContent">
            <span className="btnText">{activeUser.userName}</span>{" "}
            <span className="btnText">↓</span>
          </div>
        </button>
        <div className="dropdownContent" id="dropdownContentWrapper">
          {users.map(item => (
            <div
              className="dropdownItemWrapper"
              key={item.userId}
              onClick={() => handleChangeActiveUser(item)}
              style={{
                fontWeight:
                  item.userId === activeUser.userId ? "bold" : "normal"
              }}
            >
              <div className="avatarContainer">
                <img src={item.userProfilePic} className="image" />
              </div>
              <span>{item.userName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
