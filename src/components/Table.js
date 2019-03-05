import React from "react";
import { getData } from "../utils/DataLoader";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { regions } from "../utils/regions";

export default class Table extends React.Component {
  state = {
    loading: true,
    cells: [],
    tableData: {}
  };

  componentDidMount() {
    getData().then(tableData => {
      if (!Object.keys(tableData).length) return; // return if no data

      this.setState({
        loading: false,
        tableData,
        cells: ["Category", "Sub-Category", ...regions]
      });
    });
  }

  render() {
    return (
      <>
        {this.state.loading && <div>Loading data...</div>}

        {this.state.tableData.length === 0 && !this.state.loading && (
          <div>No table data available right now</div>
        )}

        <div
          className="table-title  table__header__title d-flex align-items-center"
          style={{ height: "2rem", color: "white" }}
        >
          <div className="" style={{ width: "400px", padding: "0 .75rem" }}>
            <strong>PRODUCTS</strong>
          </div>
          <div
            className=" text-center flex-grow-1"
            style={{ flex: "1 1 auto" }}
          >
            <strong>STATES</strong>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table ">
            <TableHeader cells={this.state.cells} />
            {
              <TableBody
                cells={this.state.cells}
                tableData={this.state.tableData}
              />
            }
          </table>
        </div>
      </>
    );
  }
}
