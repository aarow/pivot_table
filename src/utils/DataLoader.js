import axios from "axios";

const DATA_SOURCE = "./_data.json";
var interpretedData = {};

const getData = () => {
  return axios
    .get(DATA_SOURCE)
    .then(({ data }) => {
      data.map(addRow);
      return interpretedData;
    })
    .catch(err => {
      console.log("error getting data from source", err);
      return [];
    });
};

const addRow = row => {
  // create property for category
  if (!interpretedData[row.category]) {
    interpretedData[row.category] = {};
  }

  // create property for subcategory
  if (!interpretedData[row.category][row.subCategory]) {
    interpretedData[row.category][row.subCategory] = {};
  }

  // create property for state and assign sales
  if (!interpretedData[row.category][row.subCategory][row.state]) {
    interpretedData[row.category][row.subCategory][row.state] = row.sales;
  } else {
    // just add sales
    interpretedData[row.category][row.subCategory][row.state] += row.sales;
  }

  // create property for category totals
  if (!interpretedData[row.category][row.category + " total"]) {
    interpretedData[row.category][row.category + " total"] = {};
  }

  // create property for category totals
  if (!interpretedData[row.category][row.category + " total"][row.state]) {
    interpretedData[row.category][row.category + " total"][row.state] =
      row.sales;
  } else {
    interpretedData[row.category][row.category + " total"][row.state] +=
      row.sales;
  }

  // create property for grand totals
  if (!interpretedData["Grand total"]) {
    interpretedData["Grand total"] = {};
  }

  // create child property for grand totals
  if (!interpretedData["Grand total"]["\u00A0"]) {
    interpretedData["Grand total"]["\u00A0"] = {};
  }

  // create property for category totals
  if (!interpretedData["Grand total"]["\u00A0"][row.state]) {
    interpretedData["Grand total"]["\u00A0"][row.state] = row.sales;
  } else {
    interpretedData["Grand total"]["\u00A0"][row.state] += row.sales;
  }
};

export { getData };
