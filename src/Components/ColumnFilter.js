import React from "react";

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <input
      type="text"
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value)}
      onClick={(e) => e.stopPropagation()}
    />
  );
};

export default ColumnFilter;
