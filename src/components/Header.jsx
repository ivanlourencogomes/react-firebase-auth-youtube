import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch } from "react-redux";
import { setUser } from "../store/usersSlice.js";

function Header({ pageTitle }) {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    if (confirm("Are you sure you want to log out?")) {
      signOut(auth)
        .then(() => {
          // On successful sign out
          dispatch(setUser(null));
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <>
      <h1>{pageTitle}</h1>

      <div className="header-btns">
        <NavLink to="/">
          <button className="btn">Books</button>
        </NavLink>

        <NavLink to="/add-book">
          <button className="btn">Add Book +</button>
        </NavLink>

        <button onClick={handleSignOut} className="btn transparent">
          Logout
        </button>
      </div>
    </>
  );
}

export default Header;
