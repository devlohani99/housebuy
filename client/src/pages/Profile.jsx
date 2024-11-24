import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser || !currentUser._id) {
      console.error("User data is missing.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }

    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || data.success === false) {
        dispatch(updateUserFailure(data.message || "Update failed"));
        return;
      }

      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="file" ref={fileRef} hidden accept="image/*" />
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser?.avatar || "/default-avatar.png"}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="username"
          defaultValue={formData.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          autoComplete="username"
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={formData.email}
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="password"
          value={formData.password}
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button className="bg-slate-600 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
