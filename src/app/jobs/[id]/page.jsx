import React from "react";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  console.log(id);
  return (
    <div>
      <h1>Here is job details page:</h1>
    </div>
  );
};

export default JobDetailsPage;
