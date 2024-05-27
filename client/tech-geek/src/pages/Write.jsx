import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(""); // Add state for file name
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:8000/api/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = file ? await upload() : "";

    try {
      state
        ? await axios.put(`http://localhost:8000/api/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: imgUrl,
          })
        : await axios.post(`http://localhost:8000/api/posts/`, {
            title,
            desc: value,
            cat,
            img: imgUrl,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name); // Update file name state
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        <input
          className="p-2 border border-gray-300 rounded"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="border border-gray-300 rounded h-64 overflow-hidden">
          <ReactQuill
            className="h-full"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div className="p-4 border border-gray-300 rounded">
          <h1 className="text-xl font-bold mb-2">Publish</h1>
          <span className="block mb-2">
            <b>Status:</b> Draft
          </span>
          <span className="block mb-4">
            <b>Visibility:</b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={handleFileChange}
          />
          <label
            className="block mb-4 p-2 border border-gray-300 rounded cursor-pointer text-center bg-gray-100"
            htmlFor="file"
          >
            Upload Image
          </label>
          {fileName && (
            <span className="block mb-4">
              <b>Selected file:</b> {fileName}
            </span>
          )}
          <div className="flex gap-4">
            <button className="p-2 border border-gray-300 rounded bg-gray-100">
              Save as a draft
            </button>
            <button
              className="p-2 border border-gray-300 rounded bg-blue-500 text-white"
              onClick={handleClick}
            >
              Publish
            </button>
          </div>
        </div>
        <div className="p-4 border border-gray-300 rounded">
          <h1 className="text-xl font-bold mb-4">Category</h1>
          <div className="flex flex-col gap-2">
            {[
              { id: "phone", label: "Phone" },
              { id: "pc", label: "PC" },
              { id: "gaming", label: "Gaming" },
              { id: "ai", label: "AI" },
              { id: "others", label: "Others" },
            ].map((category) => (
              <div key={category.id} className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={cat === category.id}
                  name="cat"
                  value={category.id}
                  id={category.id}
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor={category.id}>{category.label}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
