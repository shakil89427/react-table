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
    disableFilters: true,
  },
  {
    Header: "Date Of Birth",
    accessor: "dateOfBirth",
    Cell: ({ value }) => moment(value).format("DD-MM-YYYY"),
    disableFilters: true,
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

export const orderData1 = [
  "id",
  "firstName",
  "lastName",
  "phone",
  "dateOfBirth",
  "country",
];
export const orderData2 = [
  "id",
  "firstName",
  "lastName",
  "country",
  "phone",
  "dateOfBirth",
];
