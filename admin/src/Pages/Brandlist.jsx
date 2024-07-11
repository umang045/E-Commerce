import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteABrand, getBrands } from "../feature/brand/brandSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../Components/CustomModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

function Brandlist() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getBrands());
  });

  const deleteBrand = (e) => {
    dispatch(deleteABrand(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  };

  const brandState = useSelector((state) => state?.brand?.brands);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      title: brandState[i].title,
      action: (
        <>
          <Link
            to={`/admin/brand/${brandState[i]?._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            to="/"
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(brandState[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  return (
    <>
      <ToastContainer />
      <div className="mt-4">
        <h3 className="mb-5 title">Brands List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteBrand(brandId);
          }}
          title="Are you sure you want to delete this brand?"
        />
      </div>
    </>
  );
}

export default Brandlist;
