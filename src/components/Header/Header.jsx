import { Container, LogoutBtn } from "../index";
// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);


  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="relative">
      <Container>
        <nav className="flex p-0 xl:p-5 relative ">
          <ul className="flex xl:gap-5">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="transition-all ease-in-out duration-500 hover:bg-opacity-100 hover:dark:bg-opacity-50 rounded-full px-5 py-3 border-none bg-primaryLight-4 dark:bg-primaryDark-4 bg-opacity-50 dark:bg-opacity-10 text-white dark:text-white"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {/* {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )} */}
          </ul>
        </nav>
      </Container>
      <div className="flex justify-end absolute -top-5 -right-[1.27rem] ">
        <div className=" flex justify-center items-center  gap-5   bg-white dark:bg-black p-5 rounded-[3rem] ">
          {authStatus ? (
            <LogoutBtn />
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="rounded-[3rem] px-10 py-5 border-2 border-primaryLight-2 dark:border-primaryDark-4 bg-primaryLight-1 dark:bg-primaryDark-1 text-black dark:text-white font-bold "
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="rounded-[3rem] px-10 py-5 border-2 border-primaryLight-1 dark:border-primaryDark-4 bg-primaryLight-2 text-black font-bold dark:bg-primaryDark-3 dark:text-white "
              >
                SignUp
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
