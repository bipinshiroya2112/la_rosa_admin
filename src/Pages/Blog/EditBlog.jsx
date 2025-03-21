import React, { useEffect, useState } from 'react'
import Layout1 from '../../Layouts/Layout1'
import Editor from './Editor'
import { useParams } from "react-router-dom";
import axiosInstanceAuth from '../../apiInstances/axiosInstanceAuth';
import { toast } from 'react-toastify';
const EditBlog = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState();
  const [isLoader, setIsLoader] = useState(false)
  useEffect(() => {
    fetchBlogDetail()
  }, [])

  const fetchBlogDetail = async () => {
    setIsLoader(true)
    await axiosInstanceAuth
      .get(`admin/blog/${id}`)
      .then((res) => {
        if (res?.data?.status) {
          setIsLoader(false)
          setBlogData(res?.data?.data);
        } else {
          setIsLoader(false)
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  }
  return (
    <Layout1>
      {isLoader ? <div className="loading">Loading&#8230;</div> : null}
      <Editor props={blogData} />
    </Layout1>
  )
}

export default EditBlog