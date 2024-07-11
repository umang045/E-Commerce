import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateOrderSt } from "../feature/auth/authSlice";
import axios from "axios";
import { config } from "../utils/axiosconfig";
import { toast } from "react-toastify";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Staus",
    dataIndex: "status",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

function Orders() {
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState(null);
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  const orderState = useSelector((state) => state?.auth?.orders);
  // console.log(orderState);

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i]?.user?.firstname,
      product: (
        <Link to={`/admin/orders/${orderState[i]?._id}`}>View Orders</Link>
      ),
      amount: orderState[i]?.totalPrice,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      status: orderState[i]?.orderStatus,
      action: (
        <>
          <button
            className="btn btn-primary me-2"
            onClick={() => {
              dispatch(updateOrderSt(orderState[i]?._id));
              setTimeout(() => {
                dispatch(getOrders());
              }, 200);
            }}
          >
            Click if Deliverd
          </button>
          <Link to="/" className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <>
      <div className="mt-4">
        <h3 className="mb-5 title">Orders List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </>
  );
}

export default Orders;
