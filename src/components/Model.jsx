import { ModeContext } from "../context/mode-context";
import React, { useContext } from "react";
import "./Modal.css";

export function Modal({ handleModalClose, handleModalLogout }) {
  const { isDarkMode } = useContext(ModeContext);
  return (
    <div>
      <div className="backdrop"></div>
      <div className={isDarkMode ? "overlay" : "overlay-dark"}>
        <div className="alert">
          <div className={isDarkMode ? "alert-msg" : "alert-msg-dark"}>
            Are you sure you want to logout?
          </div>
          <div className="btn-grp">
            <button type="button" className="btn-blue" onClick={handleModalClose}>
              Cancle
            </button>
            <button type="button" className="btn-red" onClick={handleModalLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
