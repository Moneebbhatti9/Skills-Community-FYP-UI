import React from "react";
import { Link } from "react-router-dom";
import { GoLocation } from "react-icons/go";
import { ImClock } from "react-icons/im";
import { GiMoneyStack } from "react-icons/gi";
import { MdDeleteOutline } from "react-icons/md";
import { Tooltip } from "antd";

const MappingJob = ({ job }) => {
  return (
    <>
      <div className="col-lg-6 mt-4">
        <div className="border py-4 px-3 rounded mx-3">
          <div className="d-flex">
            <div className="image">
              <img
                src={job.imageUrl}
                width="56px"
                height="56px"
                alt="item brand"
                style={{ borderRadius: "12px" }}
              />
            </div>
            <div className="detail mx-2">
              <div className="d-flex justify-content-between">
                <Link
                  // to={`/job/detail/${jobId}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    marginLeft: "15px",
                  }}
                >
                  <h4>{job.jobTitle}</h4>
                </Link>
                <Tooltip placement="top" title="Delete job">
                  <div style={{ cursor: "pointer" }}>
                    <MdDeleteOutline
                      className="text-danger"
                      style={{ marginLeft: "", fontSize: "22px" }}
                    />
                  </div>
                </Tooltip>
              </div>
              <div className="list d-flex justify-content-between">
                {/* <div className="location" style={{ fontSize: "14px" }}>
                           <FaBriefcase /> Segment
                        </div> */}
                {/* &nbsp;&nbsp; */}
                <div className="location" style={{ fontSize: "14px" }}>
                  <GoLocation className="text-primary" />
                  {job.city}, {job.country}
                </div>
                &nbsp;&nbsp;&nbsp;
                <div className="location" style={{ fontSize: "14px" }}>
                  <ImClock className="text-primary" />
                  {job.applicationDeadLine}
                </div>
                &nbsp;&nbsp;&nbsp;
                <div className="location" style={{ fontSize: "14px" }}>
                  <GiMoneyStack className="text-primary" />
                  {job.offeredSalary}
                </div>
              </div>
              <div className="time d-flex justify-content-start mt-3">
                <div
                  style={{
                    padding: "3px 20px",
                    backgroundColor: "#DDE8F8",
                    borderRadius: "12px",
                    fontSize: "13px",
                    color: "#1967d2",
                  }}
                >
                  Full time
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div
                  style={{
                    padding: "3px 20px",
                    backgroundColor: "#E1F2E5",
                    borderRadius: "12px",
                    fontSize: "13px",
                    color: "#34a853",
                  }}
                >
                  Private
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div
                  style={{
                    padding: "3px 20px",
                    backgroundColor: "#FEF2D9",
                    borderRadius: "12px",
                    fontSize: "13px",
                    color: "#f9ab00",
                  }}
                >
                  Urgent
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MappingJob;
