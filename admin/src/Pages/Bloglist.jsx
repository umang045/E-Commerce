import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteABlog, getAllBlogs } from "../feature/allblogs/allblogSlice";
// import allblogSlice from "../feature/allblogs/allblogSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../Components/CustomModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

function Bloglist() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setblogId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllBlogs());
  });

  const allblogState = useSelector((state) => state?.allblog?.allblogs);
  const data1 = [];
  for (let i = 0; i < allblogState.length; i++) {
    data1.push({
      key: i + 1,
      name: allblogState[i]?.title,
      action: (
        <>
          <Link
            to={`/admin/blog/${allblogState[i]?.id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(allblogState[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteBlog = (e) => {
    dispatch(deleteABlog(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getAllBlogs());
    }, 100);
  };

  return (
    <>
      <ToastContainer />
      <div className="mt-4">
        <h3 className="mb-5 title">Blog List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteBlog(blogId);
          }}
          title="Are you sure you want to delete this blog?"
        />
      </div>
    </>
  );
}

export default Bloglist;
