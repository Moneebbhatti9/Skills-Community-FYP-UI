import React from "react";

const Length = ({ message }) => {
  return (
    <>
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col text-center">
            <h1 style={{ fontFamily: "koHO" }}>{message}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Length;
