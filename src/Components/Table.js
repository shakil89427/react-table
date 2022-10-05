import React, { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters } from "react-table";
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
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    { columns, data, defaultColumn },
    useGlobalFilter,
    useFilters,
    useSortBy
  );

  return (
    <div>
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
          {rows.map((row) => {
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
    </div>
  );
};

export default Table;
