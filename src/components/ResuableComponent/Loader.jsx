import React from "react";
import { Spin } from "antd";

const Loader = () => {
  return (
    <>
      <div className="container py-5">
        <div className="row py-5 d-flex justify-content-center align-items-center">
          <div className="col">            
                <Spin tip="Loading, please wait ..." size="large">
                  <div className="content" />
                </Spin>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
