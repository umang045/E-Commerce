import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../feature/customers/customerSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    defaultSortOrder : 'descend',
    sorter : (a,b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

function Customers() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  });

  const customerstate = useSelector((state) => state?.customer?.customers);
  const data1 = [];
  for (let i = 0; i < customerstate?.length; i++) {
    if (customerstate?.role !== "admin") {
      data1.push({
        key: i + 1,
        name: customerstate[i]?.firstname + " " + customerstate[i]?.lastname,
        email: customerstate[i]?.email,
        mobile: customerstate[i]?.mobile,
      });
    }
  }

  // console.log(state);

  return (
    <>
      <div className="mt-4">
        <h3 className="mb-5 title">Coustomers List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </>
  );
}

export default Customers;
