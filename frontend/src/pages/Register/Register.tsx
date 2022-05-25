import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import styles from "./Register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toast } from "react-toastify";
import { register, reset } from "../../features/auth/authSlice";

const Register = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [passMatch, setPassMatch] = React.useState(false);
  const dispatch = useAppDispatch();
  const { message, errorMessage } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (password === passwordConfirm) {
      setPassMatch(true);
    } else {
      setPassMatch(false);
    }
  }, [password, passwordConfirm]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      navigate("/login");
    }
    if (errorMessage) {
      toast.error(errorMessage);
    }
    return () => {
      dispatch(reset());
    };
  }, [message, dispatch, errorMessage, navigate]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passMatch) {
      dispatch(reset());
      dispatch(register({ email, password, username }));
    } else {
      toast.error("Passwords do not match");
    }
  };
  return (
    <>
      <div className={styles.container}>
        <section>
          <h1>
            <FaUser /> Register
          </h1>
        </section>
        <section className={styles.form}>
          <form onSubmit={onSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>

              <input
                type="username"
                id="username"
                name="username"
                value={username}
                placeholder="Enter your username..."
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>

              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email..."
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div
              className={
                password === "" && passwordConfirm === ""
                  ? styles.formGroup
                  : passMatch
                  ? `${styles.formGroup} ${styles.successGroup}`
                  : `${styles.formGroup} ${styles.errorGroup}`
              }
            >
              <label htmlFor="password">Password</label>

              <input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Enter your password..."
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div
              className={
                password === "" && passwordConfirm === ""
                  ? styles.formGroup
                  : passMatch
                  ? `${styles.formGroup} ${styles.successGroup}`
                  : `${styles.formGroup} ${styles.errorGroup}`
              }
            >
              <label htmlFor="passwordConfirm">passwordConfirm</label>

              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={passwordConfirm}
                placeholder="Confirm your password..."
                required
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <button type="submit" className={styles.btn}>
                Register
              </button>
            </div>
          </form>
          <hr />
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </section>
      </div>
    </>
  );
};

export default Register;
