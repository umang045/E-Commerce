import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProductCategory, getPcategory } from "../feature/pcategory/pcategorySlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../Components/CustomModal";

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

function Categorylist() {
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPcategory());
  });

  const pcategoryState = useSelector((state) => state?.pcategory?.pcategorys);

  const data1 = [];
  for (let i = 0; i < pcategoryState?.length; i++) {
    data1.push({
      key: i + 1,
      title: pcategoryState[i]?.title,
      action: (
        <>
          <Link
            to={`/admin/category/${pcategoryState[i]?._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(pcategoryState[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteCategory = (e) => {
    dispatch(deleteAProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getPcategory());
    }, 100);
  };

  return (
    <>
      <div className="mt-4">
        <h3 className="mb-5 title">Categories List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteCategory(pCatId);
          }}
          title="Are you sure you want to delete this Product Category?"
        />
      </div>
    </>
  );
}

export default Categorylist;
