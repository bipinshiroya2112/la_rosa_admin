import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";
import axiosInstanceAuthFormData from "../../apiInstances/axiosInstanceAuthFormData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import uploadImage from "../../uploadImage/uploadImage";

export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^\-+/, "")
    .replace(/\-+$/, "");
}

const Editor = ({ props }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoader, setIsLoader] = useState(false)
  const navigate = useNavigate();
  const coverInputRef = useRef();
  const [coverImgRef, setCoverImgRef] = useState([])
  useEffect(() => {
    setIsLoader(true)
    if (props?._id) {
      setTitle(props.title || "");
      setDescription(props.description || "");
      setContent(props.content || "");
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
    setIsLoader(false)
  }, [props]);

  function handleTitle(e) {
    const newTitle = e.target.value;
    setTitle(newTitle);
    // setSlug(generateSlug(newTitle));
  }

  const onFlorImageUpload = () => {
    const florFiles = Array.from(coverInputRef.current.files);
    setCoverImgRef((preFiles) => [...preFiles, ...florFiles]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoader(true)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    if (coverInputRef.current.files[0] != undefined) {
      const coverImageUpload = await uploadImage(coverInputRef);
      formData.append("coverImage", coverImageUpload?.url);
    }
    try {
      let response;
      if (isEditing) {
        response = await axiosInstanceAuthFormData.put(`admin/blog/${props._id}`, formData);
      } else {
        response = await axiosInstanceAuthFormData.post(`admin/blog`, formData);
      }
      if (response?.data?.status) {
        setIsLoader(false)
        toast.success(response?.data?.message);
        navigate(`/blog`);
      } else {
        setIsLoader(false)
        toast.error(response?.data?.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }

  // Custom Quill Toolbar
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "color", "image"],
      [{ "code-block": true }],
      ["clean"],
    ],
  };

  const [ListingImages, setListingImages] = useState({
    coverImg: [],
    coverImgShow: [],
  });

  const onChangeImages = (e) => {
    const { name } = e.target;
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    const uploaded = [...ListingImages?.[name]];
    chosenFiles.some((file) => {
      // Check if the file already exists
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
      }
    });

    setListingImages({
      ...ListingImages,
      [name]: uploaded,
      [`${name}Show`]:
        uploaded?.length > 0 && uploaded?.map((d) => URL.createObjectURL(d)),
    });
  };

  return (
    <div>
      {isLoader ? <div className="loading">Loading&#8230;</div> : null}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Blog Editor */}
        <div className="w-full max-w-3xl p-5 bg-white border border-gray-200 rounded-lg shadow mx-auto">
          <h2 className="text-3xl font-bold border-b border-gray-400 pb-2 mb-5 ">
            {isEditing ? "Update Blog" : "Create Blog"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {/* Title */}
              <div className="sm:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
                  Blog Title
                </label>
                <input
                  onChange={handleTitle}
                  type="text"
                  value={title}
                  name="title"
                  id="title"
                  autoComplete="off"
                  className="block w-full rounded-md border py-2 px-4 text-gray-900 shadow-sm ring-1 ring-gray-300 sm:text-sm"
                  placeholder="Enter blog title"
                />
              </div>
              {/* Slug */}
              {/* <div className="sm:col-span-2">
                <label htmlFor="slug" className="block text-sm font-medium text-gray-900 mb-2">
                  Blog Slug
                </label>
                <input
                  onChange={(e) => setSlug(e.target.value)}
                  type="text"
                  value={slug}
                  name="slug"
                  id="slug"
                  autoComplete="off"
                  className="block w-full rounded-md border py-2 px-4 text-gray-900 shadow-sm ring-1 ring-gray-300 sm:text-sm"
                  placeholder="Slug will be auto-generated"
                />
              </div> */}

              {/* Description */}
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
                  Blog Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="block w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 p-2.5"
                  placeholder="Enter a short description"
                ></textarea>
              </div>
              {/* Cover Image */}
              <div className="sm:col-span-2">
                <label htmlFor="coverImg" className="block text-sm font-medium text-gray-900 mb-2">
                  Cover Image
                </label>
                <input
                  type="file"
                  name="coverImg"
                  id="coverImg"
                  multiple
                  ref={coverInputRef}
                  onChange={(e) => { onChangeImages(e); onFlorImageUpload() }}
                  autoComplete="off"
                  className="file-visible block w-full rounded-md border py-2 px-4 text-gray-900 shadow-sm ring-1 ring-gray-300 sm:text-sm"
                  placeholder="Enter blog title"
                />
              </div>
              {/* Content */}
              <div className="sm:col-span-2">
                <label htmlFor="content" className="block text-sm font-medium text-gray-900 mb-2">
                  Blog Content
                </label>
                <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-[#E5002A] text-white rounded-lg hover:bg-[#c40024]"
            >
              {isEditing ? "Update Blog Post" : "Create Blog Post"}
            </button>
          </form>
        </div>

        {/* Blog Preview */}
        <div className="w-full max-w-3xl p-5 bg-white border border-gray-200 rounded-lg shadow mx-auto">
          <h2 className="text-3xl font-bold border-b border-gray-400 pb-2 mb-5 ">
            Blog Preview
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <h2 className="text-sm font-medium text-gray-900 mb-2">Title</h2>
              <p className="text-2xl font-bold">{title}</p>
            </div>
            <div className="sm:col-span-2">
              <h2 className="text-sm font-medium text-gray-900 mb-2">Description</h2>
              <p>{description}</p>
            </div>
            <div className="sm:col-span-full">
              <h2 className="text-sm font-medium text-gray-900 mb-2">Content</h2>
              {parse(content)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
