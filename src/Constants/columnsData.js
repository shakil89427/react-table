import moment from "moment";

export const columnsData = [
  {
    Header: "Id",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "First Name",
    accessor: "firstName",
  },
  {
    Header: "Last Name",
    accessor: "lastName",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "Date Of Birth",
    accessor: "dateOfBirth",
    Cell: ({ value }) => moment(value).format("DD-MM-YYYY"),
  },
  {
    Header: "Country",
    accessor: "country",
  },
];

export const groupedColumnsData = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    columns: [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
    ],
  },
  {
    Header: "Info",
    columns: [
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Date Of Birth",
        accessor: "dateOfBirth",
        Cell: ({ value }) => moment(value).format("DD-MM-YYYY"),
      },
      {
        Header: "Country",
        accessor: "country",
      },
    ],
  },
];
