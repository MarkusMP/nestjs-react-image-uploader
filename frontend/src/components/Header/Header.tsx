import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaBars, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, reset } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, message } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (message === "Successful logout") {
      toast.success(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [message, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header>
      <nav className={`${styles.navigation} ${styles.container}`}>
        <div className={styles.logo}>
          <li>
            <Link to="/">Stories</Link>
          </li>
        </div>
        <ul
          className={
            isOpen
              ? `${styles.open} ${styles.links}`
              : `${styles.close} ${styles.links}`
          }
        >
          {isAuthenticated ? (
            <>
              <li className={styles.hover}>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button className={styles.btn} onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className={styles.hover}>
                <Link to="/">Home</Link>
              </li>
              <li className={styles.hover}>
                <Link to="/login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li className={styles.hover}>
                <Link to="/register">
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className={styles.menu}>
          <button type="button" onClick={toggleMenu}>
            <FaBars />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
