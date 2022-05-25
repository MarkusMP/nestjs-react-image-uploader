import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authenticated } from "../../features/auth/authSlice";
import {
  getProfile,
  updateUsername,
  reset,
  deleteProfile,
} from "../../features/profile/profileSlice";
import styles from "./Profile.module.scss";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { profile, errorMessage, message } = useAppSelector(
    (state) => state.profile
  );
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      setUsername(profile?.username as string);
    }
  }, [profile]);

  useEffect(() => {
    dispatch(getProfile());

    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(reset());
    }

    if (message === "User deleted successfully") {
      toast.success(message);
      navigate("/");
    }
  }, [dispatch, errorMessage, message, navigate]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (profile?.username !== username) {
      dispatch(updateUsername(username));
      navigate("/");
    }
  };

  const handleDelete = () => {
    dispatch(deleteProfile());
    dispatch(authenticated());
  };

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <h1>Profile</h1>
        <form onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>

            <input
              type="username"
              id="username"
              name="username"
              value={username}
              placeholder="Enter updated username..."
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <button type="submit" className={styles.btn}>
              Update Username
            </button>
          </div>
        </form>

        <div className={styles.remove}>
          <button
            className={`${styles.errorBtn} ${styles.formGroup}`}
            onClick={handleDelete}
          >
            Remove Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
