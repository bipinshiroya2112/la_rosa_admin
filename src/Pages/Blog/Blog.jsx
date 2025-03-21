import React, { useEffect, useState } from 'react'
import Layout1 from '../../Layouts/Layout1'
import { add, deleteRed, editRed, searchGray, eyeSvg } from '../../assets';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstanceAuth from '../../apiInstances/axiosInstanceAuth';
import { toast } from 'react-toastify';
import parse from "html-react-parser";
import { Tooltip } from 'react-tooltip';

const Blog = () => {
  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState(false)
  const [DeleteConfirmation, setDeleteConfirmation] = useState(false);
  const [ShowConfirmation, setShowConfirmation] = useState(false);
  const [blogDetail, setBlogDetail] = useState([]);
  const [viewBlogDetail, setViewBlogDetail] = useState();
  const [searchBlogList, setSearchBlogList] = useState([]);
  const [blogList, setBlogList] = useState();
  const [isviewBlog, setIsviewBlog] = useState(false);
  const searchAdvertise = async (search) => {
    if (search) {
      const searchWords = search.toLowerCase().trim().split(" ");
      setBlogList(
        searchBlogList?.filter((item) => {
          const principalNameWords = (
            (item?.title || "") + " " +
            (item?.city || "") + " " +
            (item?.advertiseType || "")
          )
            .toLowerCase()
            .trim()
            .split(" ");
          return searchWords.every((word) =>
            principalNameWords.some((principalWord) =>
              principalWord.includes(word)
            )
          );
        })
      );
    } else {
      setBlogList(searchBlogList);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    await axiosInstanceAuth
      .get("admin/blog")
      .then((res) => {
        if (res?.data?.status) {
          setBlogList(res?.data?.data);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };
  const fetchViewBlog = async (id) => {
    await axiosInstanceAuth
      .get(`admin/blog/${id}`)
      .then((res) => {
        if (res?.data?.status) {
          setViewBlogDetail(res?.data?.data);
          setIsLoader(false);
        } else {
          setIsLoader(false);
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        console.log("err --->", err);
      });
  };

  const deleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const res = await axiosInstanceAuth.delete(`admin/blog/${id}`);
        if (res?.data?.status) {
          toast.success("Blog deleted successfully!");
          setBlogList((prev) => prev.filter((blog) => blog.id !== id));
          setSearchBlogList((prev) => prev.filter((blog) => blog.id !== id));
        } else {
          toast.error(res?.data?.message);
        }
      } catch (err) {
        console.log("Error deleting blog:", err);
        toast.error("Failed to delete blog.");
      }
    }
  };

  const ConfirmDelete = async (detail) => {
    await axiosInstanceAuth
      .delete(`admin/blog/${detail._id}`)
      .then((res) => {
        if (res?.data?.status) {
          fetchBlog();
          toast.success(res?.data?.message);
        } else {
          toast.error(res?.data?.message);
        }
        setDeleteConfirmation(false);
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  return (
    <Layout1>
      {isLoader ? <div className="loading">Loading&#8230;</div> : null}
      <div className="container mx-auto px-5 xl:px-0">
        {/* ---------- section 1  ---------- */}
        <div className="flex flex-col justify-start gap-5 bg-white rounded-2xl shadow-md p-4 md:p-6">
          <h1 className="text-[#404040] font-extrabold text-lg md:text-xl lg:text-2xl">
            Your Blog List
          </h1>
          <div className="col-span-1 2xl:col-span-2 flex flex-row justify-start items-center gap-3">
            <div className="w-full md:h-12 flex justify-start items-center gap-2 border border-[#E5E5E5] rounded-3xl py-3 px-5 cursor-pointer">
              <img src={searchGray} alt="icon" className="w-3 lg:w-4" />
              <input
                type="text"
                onChange={(e) => {
                  searchAdvertise(e.target.value);
                }}
                placeholder="Enter blog detail..."
                className="w-full text-[#A3A3A3]  text-xs md:text-sm outline-none"
              />
            </div>
          </div>
          <div className="col-span-1 grid place-content-end">
            <div
              className="flex justify-center items-center gap-2 border border-[#E5002A] bg-[#E5002A] rounded-3xl py-2 px-4 cursor-pointer"
              onClick={() => navigate(`/blog/add`)}
            >
              <img src={add} alt="icon" className="w-3 lg:w-4" />
              <div className="text-white font-medium text-xs md:text-sm lg:text-base">
                Add Blog
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {blogList && blogList.length > 0 ? (
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 pb-4">
              {blogList.map((blog) => (
                <>
                  <div className="flex flex-col rounded-lg  bg-white shadow">
                    <img src={blog.coverImage || '/test.jpg'} alt={blog.title} className="w-full h-48 object-cover rounded-t-lg" />
                    <div className="mb-3 flex w-full flex-col justify-between px-4 pt-2 text-start h-[200px] ">
                      <div className="flex flex-col justify-between mb-2 ">
                        <h3 className="text-xl font-semibold text-gray-900">{blog.title}</h3>
                        <p className="text-gray-600 mt-2 flex-grow ">{blog?.description}</p>
                        <p className="text-sm text-gray-500 mt-4">{new Date(blog.updatedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}</p>
                      </div>
                      <div className="w-full sm:w-auto flex flex-wrap justify-start items-center gap-2">
                        <img
                          src={editRed}
                          alt="Edit"
                          className="w-10 h-10 border border-[#FA979A] bg-[#FFEAEF] rounded-full p-2 cursor-pointer"
                          onClick={() => { navigate(`/blog/${blog._id}`) }}
                          data-tooltip-id="edit"
                          data-tooltip-content="Edit"
                        />
                        <Tooltip id="edit" />

                        <img
                          src={deleteRed}
                          alt="Delete"
                          className="w-10 h-10 border border-[#FA979A] bg-[#FFEAEF] rounded-full p-2 cursor-pointer"
                          onClick={() => { setDeleteConfirmation(true); setBlogDetail(blog); setShowConfirmation(false); }}
                          data-tooltip-id="delete"
                          data-tooltip-content="Delete"
                        />
                        <Tooltip id="delete" />

                        <img
                          src={eyeSvg}
                          alt="More Options"
                          data-tooltip-id="view"
                          data-tooltip-content="view"
                          className="w-10 h-10 border border-[#FA979A] bg-[#FFEAEF] rounded-full p-2 cursor-pointer"
                          onClick={() => { setIsLoader(true); setIsviewBlog(true); setBlogDetail(blog); fetchViewBlog(blog._id) }}
                        />
                        <Tooltip id="view" />
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No blogs found.</p>
          )}
        </div>
      </div>

      {/* -----------Delete Confirmation Pop Up ----------- */}
      {
        DeleteConfirmation === true && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999]  outline-none focus:outline-none border ">
              <div className="relative min-w-[285px] md:min-w-[350px] max-w-[90%] mx-auto  my-10 shadow-black shadow-2xl">
                {/* ------ Content ------ */}
                <div className="border-0 rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/* ------ Header ------ */}
                  <div className="grid place-items-center place-content-end">
                    <button
                      className="bg-transparent border-0 text-black opacity-9 text-2xl font-normal outline-none focus:outline-none mx-3 my-2"
                      onClick={(e) => setDeleteConfirmation(false)}
                    >
                      ×
                    </button>
                  </div>
                  {/* ------ Body ------ */}
                  <div className="relative grid place-items-center px-6 md:px-10 py-4 flex-auto">
                    <h3 className="text-black font-semibold text-lg md:text-xl  leading-relaxed text-center mt-2">
                      Are You Sure ?
                    </h3>
                    <p className="text-black font-medium text-sm md:text-base leading-normal text-center mt-3">
                      You want to Delete this Blog
                    </p>
                  </div>

                  {/* ------ Fotter ------ */}
                  <div className="flex justify-center items-center m-5">
                    <button
                      className="bg-[#009600] text-white font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:bg-[#008500] hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                      type="button"
                      onClick={(e) => ConfirmDelete(blogDetail)}
                    >
                      Yes
                    </button>
                    <button
                      className="bg-[#E5002A] text-white font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:bg-[#D80022] hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                      type="button"
                      onClick={(e) => setDeleteConfirmation(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
          </>
        )
      }
      {/* -----------view Blog ----------- */}
      {isviewBlog && viewBlogDetail && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999] outline-none focus:outline-none border">
            <div className="relative min-w-[285px] md:min-w-[500px] max-w-[90%]  mx-auto my-10 shadow-black shadow-2xl">
              {/* ------ Content ------ */}
              <div className="border-0 rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* ------ Header ------ */}
                <div className="flex justify-between items-center p-4 border-b">
                  <h3 className="text-black font-semibold text-lg md:text-xl">
                    {viewBlogDetail.title}
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black text-2xl font-normal outline-none focus:outline-none"
                    onClick={() => setIsviewBlog(false)}
                  >
                    ×
                  </button>
                </div>

                {/* ------ Body ------ */}
                <div className="h-full max-h-[640px] overflow-scroll relative px-6 md:px-10 py-4 flex-auto">
                  <p className="text-gray-500 text-sm">Published: {new Date(viewBlogDetail.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}</p>
                  <p className="text-black font-medium text-base leading-normal mt-2">
                    {viewBlogDetail.description}
                  </p>
                  <div className="mt-4 text-gray-800 w-[364px]">
                    {parse(viewBlogDetail.content || "")}
                  </div>
                </div>

                {/* ------ Footer ------ */}
                <div className="flex justify-end items-center p-4 border-t">
                  <button
                    className="bg-[#E5002A] text-white font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:bg-[#D80022] transition-all duration-150"
                    type="button"
                    onClick={() => setIsviewBlog(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
        </>
      )}

    </Layout1 >
  )
}

export default Blog