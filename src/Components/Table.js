import React, { useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useColumnOrder,
} from "react-table";
import { columnsData, orderData1, orderData2 } from "../Constants/columnsData";
import mockData from "../Constants/mockData.json";
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";

const Table = () => {
  const [ordered, setOrdered] = useState(false);
  const columns = useMemo(() => columnsData, []);
  const data = useMemo(() => mockData, []);
  const defaultColumn = useMemo(() => ({ Filter: ColumnFilter }), []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    //rows,if pagination not required.globalfilter will work
    //page,if pagination required.globalfilter will not work
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
    setColumnOrder,
  } = useTable(
    { columns, data, defaultColumn, initialState: { pageIndex: 4 } },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useColumnOrder
  );

  return (
    <>
      <GlobalFilter filter={state.globalFilter} setFilter={setGlobalFilter} />

      {/* -------------------------- */}
      <table {...getTableProps()}>
        {/* Head */}
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {column.isSorted && column.isSortedDesc && (
                    <span>&#x21e9;</span>
                  )}
                  {column.isSorted && !column.isSortedDesc && (
                    <span>&#x21e7;</span>
                  )}
                  {!column.isSorted && <span>&#8691;</span>}
                  <br />
                  {column.canFilter && column.render("Filter")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Body */}
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* -------------------------- */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        {/* Page status */}
        <span>
          Page {state.pageIndex + 1} of {pageOptions.length}{" "}
        </span>

        {/* Goto page */}
        <form
          style={{ display: "inline" }}
          onSubmit={(e) => {
            e.preventDefault();
            gotoPage(e.target[0].value ? e.target[0].value - 1 : 0);
            e.target.reset();
          }}
        >
          | Go to page:{" "}
          <input type="number" required style={{ width: "40px" }} />
          <button type="submit">Go</button>
        </form>

        {/* Page navigator */}
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={previousPage} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={nextPage} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>

        {/* Change page size */}
        <select
          value={state.pageSize}
          onChange={(e) => setPageSize(e.target.value)}
        >
          {[10, 25, 50].map((size) => (
            <option key={size} value={size}>
              Show {size} data per page
            </option>
          ))}
        </select>

        {/* change column order */}
        <button
          onClick={() => {
            if (ordered) {
              setColumnOrder(orderData1);
              setOrdered(false);
            } else {
              setColumnOrder(orderData2);
              setOrdered(true);
            }
          }}
        >
          Change Column Order
        </button>
      </div>
    </>
  );
};

export default Table;
