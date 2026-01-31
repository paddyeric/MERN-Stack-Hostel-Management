import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";


const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <a class="navbar-brand active text-white" href="/home">
          Diva Hostel
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon">
            <RxHamburgerMenu size={25} style={{color:'white'}}/>
          </span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <ul class="navbar-nav mr-5">
              {user ? (
                <>
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                     <CgProfile size={20} className="mr-2"/> {user.name}

                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a class="dropdown-item" href="/profile">
                        Profile
                      </a>

                      <a class="dropdown-item" href="#" onClick={logout}>
                        LogOut
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <li class="nav-item">
                    <a class="nav-link active" href="/register">
                      Register
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/login">
                      Login
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
