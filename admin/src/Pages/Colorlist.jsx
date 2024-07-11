import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAColor, getColor } from "../feature/color/colorSlice";
import CustomModal from "../Components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

function Colorlist() {
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getColor());
  });

  const colorState = useSelector((state) => state?.color?.colors);

  const data1 = [];
  for (let i = 0; i < colorState?.length; i++) {
    data1.push({
      key: i + 1,
      color: colorState[i]?.title,
      action: (
        <>
          <Link
            to={`/admin/color/${colorState[i]?._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(colorState[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteColor = (e) => {
    dispatch(deleteAColor(e));
    // console.log('hello');

    setOpen(false);
    setTimeout(() => {
      dispatch(getColor());
    }, 100);
  };
  return (
    <>
      <div className="mt-4">
        <h3 className="mb-5 title">Colors List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteColor(colorId);
          }}
          title="Are you sure you want to delete this color?"
        />
      </div>
    </>
  );
}

export default Colorlist;
