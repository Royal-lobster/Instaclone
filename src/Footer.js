import React from "react";

function Footer() {
  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      className="footer"
    >
      <hr
        style={{
          width: "30vw",
        }}
      ></hr>
      <h2
        style={{
          textAlign: "center",
          fontSize: "18px",
          fontWeight: 300,
          paddingTop: "30px",
          color: "#808080",
        }}
      >
        Made by Srujan with Reactjs
      </h2>
      <h2
        style={{
          textAlign: "center",
          fontSize: "13px",
          paddingBottom: "30px",
          fontWeight: 300,
          color: "#808080",
        }}
      >
        All content belongs to their respective owners
      </h2>
    </div>
  );
}

export default Footer;
