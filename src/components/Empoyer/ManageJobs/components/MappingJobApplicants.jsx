import React, { useEffect, useState } from "react";
import { GiMoneyStack } from "react-icons/gi";
import { GoLocation } from "react-icons/go";
import axios from "axios";
import hostUrl from "../../../Assets/Api";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";

const MappingJobApplicants = ({ applicant }) => {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const apiUrl = `${hostUrl}/api/company//single/applicant/avatar/${applicant.userID}`;
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(apiUrl, config)
      .then((res) => setAvatar(res.data.applicantAvatar.logo));
  }, [applicant.userID]);

  return (
    <>
      <div className="col-lg-6 mt-2">
        <div className="row px-3 shadow py-4 rounded-4 mx-1">
          <div className="col-3">
            <img
              //  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHcxVd5Hxs2G_4YVx0ks8pSwJBL2tzFpQBQVS1ZMmb6g&s"
              src={avatar}
              alt=""
              className="applicantAvatar"
            />
          </div>
          <div className="col-8">
            <div className="name_style">
              <b>{applicant.fullName}</b>
            </div>
            <div className="detail_style d-flex mt-2">
              <div className="filed text-primary">{applicant.jobTitle}</div>
              <div className="location mx-3" style={{ fontSize: "14px" }}>
                <GoLocation /> London, UK
              </div>
              <div className="location" style={{ fontSize: "14px" }}>
                <GiMoneyStack /> {applicant.expectedSalary}
              </div>
            </div>
            <div className="specialization d-flex mt-2">
              <div className="specilization_first">App</div>
              <div className="specilization_first mx-2">UI Designer</div>
              <div className="specilization_first">App Developer</div>
            </div>
            <div className="Action d-flex mt-3">
              <Tooltip placement="top" title="View Application">
                <div
                  className="viewApplication text-primary"
                  style={{ cursor: "pointer" }}
                >
                  <Link to={`/job/applicants/detail/${applicant._id}`}>
                    view
                  </Link>
                </div>
              </Tooltip>
              <Tooltip placement="bottom" title="Approve Application">
                <div
                  className="viewApplication text-primary mx-1"
                  style={{ cursor: "pointer" }}
                >
                  Approve
                </div>
              </Tooltip>
              <Tooltip placement="bottom" title="Reject Application">
                <div
                  className="viewApplication text-primary mx-1"
                  style={{ cursor: "pointer" }}
                >
                  Reject
                </div>
              </Tooltip>
              <Tooltip placement="bottom" title="Delete Application">
                <div
                  className="viewApplication text-primary mx-1"
                  title="View Application"
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MappingJobApplicants;
