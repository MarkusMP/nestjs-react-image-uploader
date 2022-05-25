import React, { useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authenticated, login, reset } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useAppDispatch();
  const { message, errorMessage, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(authenticated());
    }

    if (isAuthenticated) {
      navigate("/");
    }

    if (errorMessage) {
      toast.error(errorMessage);
    }

    return () => {
      dispatch(reset());
    };
  }, [message, errorMessage, dispatch, navigate, isAuthenticated]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(reset());
    dispatch(login({ email, password }));
  };
  return (
    <>
      <div className={styles.container}>
        <section>
          <h1>
            <FaSignInAlt /> Login
          </h1>
        </section>
        <section className={styles.form}>
          <form onSubmit={onSubmit}>
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

            <div className={styles.formGroup}>
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

            <div className={styles.formGroup}>
              <button type="submit" className={styles.btn}>
                Login
              </button>
            </div>
          </form>
          <hr />
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </section>
      </div>
    </>
  );
};

export default Login;
