import React from "react";
import { Link } from "react-router-dom";
import { GoLocation } from "react-icons/go";
import { ImClock } from "react-icons/im";
import { GiMoneyStack } from "react-icons/gi";

const Jobs = ({
   jobTitle,
   city,
   country,
   createdAt,
   offeredSalary,
   jobId,
   image,
}) => {
   const formattedDate = () => {
      const date = new Date(createdAt);
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInSec = Math.round(diffInMs / 1000);
      if (diffInSec < 60) {
         return "just now";
      } else if (diffInSec < 3600) {
         const diffInMin = Math.round(diffInSec / 60);
         return `${diffInMin} minutes ago`;
      } else if (diffInSec < 86400) {
         const diffInHrs = Math.round(diffInSec / 3600);
         return `${diffInHrs} hours ago`;
      } else {
         const diffInDays = Math.round(diffInSec / 86400);
         return `${diffInDays} days ago`;
      }
   };

   const formatedDAte = formattedDate(createdAt);

   return (
      <>
         <div className="col-lg-6 mt-4">
            <div className="border py-4 px-3 rounded">
               <div className="d-flex">
                  <div className="image">
                     <img
                        src={image}
                        width="56px"
                        height="56px"
                        alt="item brand"
                        style={{ borderRadius: "12px" }}
                     />
                  </div>
                  <div className="detail mx-2">
                     <Link
                        to={`/job/detail/${jobId}`}
                        style={{ textDecoration: "none", color: "black" }}
                     >
                        <h4>{jobTitle}</h4>
                     </Link>
                     <div className="list d-flex justify-content-between">
                        {/* <div className="location" style={{ fontSize: "14px" }}>
                           <FaBriefcase /> Segment
                        </div> */}
                        {/* &nbsp;&nbsp; */}
                        <div className="location" style={{ fontSize: "14px" }}>
                           <GoLocation className="text-primary" /> {city},{" "}
                           {country}
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className="location" style={{ fontSize: "14px" }}>
                           <ImClock className="text-primary" /> {formatedDAte}
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className="location" style={{ fontSize: "14px" }}>
                           <GiMoneyStack className="text-primary" />{" "}
                           {offeredSalary}
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

export default Jobs;
