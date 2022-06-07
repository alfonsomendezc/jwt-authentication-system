import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const SignUp = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [check, setCheck] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    repeat: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();

  const handleSubmit = async () => {
    let data = {
      name: name,
      email: email,
      password: password,
    };
    if (await actions.registerUser(data)) {
      history.push("/private");
    } else {
      alert("User already exists, try again");
    }
  };

  return (
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage: `url(
          https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp
        )`
      }}
    >
      <div className="mask d-flex align-items-center h-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example1cg">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3cg">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={(e) => {
                          let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

                          if (regex.test(email)) {
                            setErrors({ ...errors, email: false });
                          } else {
                            setErrors({ ...errors, email: true });
                          }
                        }}
                      />
                      {errors.email && (
                        <div className="text-secondary">Invalid E-mail</div>
                      )}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4cg">
                        Password
                      </label>
                      <div className="d-flex">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                          onChange={(e) => setPassword(e.target.value)}
                          onBlur={(e) => {
                            let regex =
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                            if (regex.test(password)) {
                              setErrors({ ...errors, password: false });
                            } else {
                              setErrors({ ...errors, password: true });
                            }
                          }}
                        />
                        <button
                          className={
                            showPassword
                              ? "fa fa-eye-slash"
                              : "fa fa-eye password-icon"
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            setShowPassword(!showPassword);
                          }}
                        ></button>
                      </div>
                      {errors.password && (
                        <div className="text-secondary">
                          Remember your password must have at least: 8
                          characters, 1 lower-case letter, 1 upper-case letter,
                          1 number and 1 special character
                        </div>
                      )}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4cdg">
                        Repeat your password
                      </label>
                      <input
                        type="password"
                        id="form3Example4cdg"
                        className="form-control form-control-lg"
                        onChange={(e) => setRepeat(e.target.value)}
                        onBlur={(e) => {
                          if (repeat !== password) {
                            setErrors({ ...errors, repeat: true });
                          } else {
                            setErrors({ ...errors, repeat: false });
                          }
                        }}
                      />
                      {errors.repeat && (
                        <div className="text-secondary">
                          Different password, try again
                        </div>
                      )}
                    </div>

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3cg"
                        onChange={(e) => setCheck(!check)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="form2Example3g"
                      >
                        I agree all statements in{" "}
                        <a href="#!" className="text-body">
                          <u>Terms of service</u>
                        </a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-primary btn-block btn-lg text-body"
                        onClick={handleSubmit}
                        disabled={
                          errors.email ||
                          errors.password ||
                          errors.repeat ||
                          !check ||
                          !name.length > 0 ||
                          !email.length > 0 ||
                          !password.length > 0 ||
                          !repeat.length > 0
                        }
                      >
                        Register
                      </button>
                    </div>
                    <Link className="m-auto" to={"/login"}>
                      <p className="text-center text-muted mt-5 mb-0">
                        Already have an account?{" "}
                        <p className="fw-bold text-body">
                          <u>Login here</u>
                        </p>
                      </p>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {localStorage.getItem("token") != undefined && (
        <Redirect to={"/private"}></Redirect>
      )}
    </section>
  );
};
