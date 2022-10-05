import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { columnsData } from "../Constants/columnsData";
import mockData from "../Constants/mockData.json";
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";

const Table = () => {
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
  } = useTable(
    { columns, data, defaultColumn, initialState: { pageIndex: 4 } },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <>
      <GlobalFilter filter={state.globalFilter} setFilter={setGlobalFilter} />
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

      {/* Bottom actions */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <span>
          Page {pageIndex + 1} of {pageOptions.length}{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              gotoPage(e.target.value ? Number(e.target.value) - 1 : 0);
            }}
            style={{ width: "40px" }}
          />
        </span>
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
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((size) => (
            <option key={size} value={size}>
              Show {size} data per page
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Table;
