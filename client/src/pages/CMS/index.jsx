import React from "react";
import { useParams } from "react-router-dom";

const CMS = () => {
  const { name } = useParams();
  return (
    <div>
      <h1 className=" flex justify-center items-center">{name}</h1>
    </div>
  );
};

export default CMS;