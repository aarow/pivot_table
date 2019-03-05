import React from "react";
import { regions } from "../utils/regions";

const TableCell = ({
  children,
  alignDir = "left",
  sticky = false,
  colSpan = 1,
  className
}) => (
  <td
    className={`${className} text-${alignDir} ${sticky ? "sticky-col" : ""}`}
    colSpan={colSpan}
  >
    <span>{children}</span>
  </td>
);

const TableRow = ({ sales, category, subcategory, rowIndex }) => {
  let FirstCells;
  if (subcategory.indexOf("total") > -1) {
    // totals row first two columns
    FirstCells = () => (
      <>
        <TableCell sticky>{subcategory}</TableCell>
        <TableCell sticky>{"\u00A0"}</TableCell>
      </>
    );
  } else {
    // standard row first two columns
    FirstCells = () => (
      <>
        <TableCell sticky>{rowIndex === 0 ? category : "\u00A0"}</TableCell>
        <TableCell sticky>{subcategory}</TableCell>
      </>
    );
  }

  let rowClassName = "";
  if (category === "Grand total") rowClassName = "row__grand-total";
  else if (subcategory.indexOf("total") > -1)
    rowClassName = "row__category-total";

  return (
    <tr className={rowClassName}>
      <FirstCells />
      {regions.map(region => {
        if (sales[region]) regionTotals[region] += sales[region];
        return (
          <TableCell key={region} alignDir="right">
            {sales[region] ? Math.round(sales[region]) : 0}
          </TableCell>
        );
      })}
    </tr>
  );
};

export default ({ tableData }) => (
  <tbody>
    {Object.keys(tableData)
      .sort(sortCategories)
      .map(category => {
        let result = Object.keys(tableData[category])
          .sort(sortCategories)
          .map((subcategory, index) => {
            return (
              <TableRow
                key={subcategory}
                category={category}
                subcategory={subcategory}
                rowIndex={index}
                sales={tableData[category][subcategory]}
              />
            );
          });
        return result;
      })}
  </tbody>
);

var regionTotals = regions.reduce(function(acc, cur, i) {
  acc[cur] = 0;
  return acc;
}, {});

var sortCategories = (catA, catB) => {
  if (catA.indexOf("total") > -1) {
    return 1;
  }

  if (catB.indexOf("total") > -1) {
    return -1;
  }

  if (catA < catB) {
    return -1;
  }
  if (catA > catB) {
    return 1;
  }

  return 0;
};
