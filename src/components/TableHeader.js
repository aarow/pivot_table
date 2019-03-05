import React from "react";

const TableHeaderCell = ({ children, sticky = false }) => (
  <th
    scope="col"
    className={`table__header__cell border-0 ${sticky ? "sticky-col" : ""}`}
  >
    <span className="text-nowrap">{children}</span>
  </th>
);

export default ({ cells }) => (
  <thead>
    <tr>
      {cells.map((cell, index) => (
        <TableHeaderCell sticky={index < 2 ? true : false} key={cell}>
          {cell}
        </TableHeaderCell>
      ))}
    </tr>
  </thead>
);
