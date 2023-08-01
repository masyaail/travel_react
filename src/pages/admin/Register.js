//import hook react
import React, { useState } from 'react';

//import BASE URL API
import Api from '../../api';

//import toats
import toast from 'react-hot-toast';

//import js cookie
import Cookies from 'js-cookie';

//import react router dom
import { useHistory, Redirect, Link } from 'react-router-dom';

function Login() {
    //title page
    document.title = 'Login - Administrator Travel Ilzah';

    //state user
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //state loading
    const [isLoading, setLoading] = useState(false);

    //state validation
    const [validation, setValidation] = useState({});

    //history
    const history = useHistory();

    //function "loginHandler"
    const loginHandler = async (e) => {
        e.preventDefault();

        //set state isLoading to "true"
        setLoading(true);

        await Api.post('/api/admin/register', {
            name: name,
            email: email,
            password: password,
        })
            .then((response) => {
                //set state isLoading to "false"
                setLoading(false);

                //show toast
                toast.success('Login Successfully.', {
                    duration: 4000,
                    position: 'top-right',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });

                //set cookie
                Cookies.set('token', response.data.token);

                if (response.data.user.role_id === 2) {
                    //redirect dashboard page
                    history.push('/');
                } else {
                    history.push('/admin/dashboard');
                }
            })
            .catch((error) => {
                //set state isLoading to "false"
                setLoading(false);

                //set error response validasi to state "validation"
                setValidation(error.response.data);
            });
    };

    // if (Cookies.get("token")) {
    //     //redirect dashboard page
    //     return <Redirect to="/admin/dashboard"></Redirect>;
    // }

    return (
        <React.Fragment>
            {/* <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4 mt-150">
                        <div className="text-center mb-4">
                            <h4><i className="fa fa-map-marked-alt"></i> <strong>Website Travel Ilzah</strong></h4>
                        </div>
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                <div className="text-center">
                                    <h6 className="fw-bold">Register</h6>
                                    <hr />
                                </div>
                                {validation.message && (
                                    <div className="alert alert-danger">
                                        {validation.message}
                                    </div>
                                )}
                                <form onSubmit={loginHandler}>

                                    <label className="mb-1">Name</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                                    </div>
                                    {validation.name && (
                                        <div className="alert alert-danger">
                                            {validation.name[0]}
                                        </div>
                                    )}

                                    <label className="mb-1">EMAIL ADDRESS</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                        <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                                    </div>
                                    {validation.email && (
                                        <div className="alert alert-danger">
                                            {validation.email[0]}
                                        </div>
                                    )}

                                    <label className="mb-1">PASSWORD</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i className="fa fa-lock"></i></span>
                                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                    </div>
                                    {validation.password && (
                                        <div className="alert alert-danger">
                                            {validation.password[0]}
                                        </div>
                                    )}

                                    <button className="btn btn-success shadow-sm rounded-sm px-4 w-100" type="submit" disabled={isLoading}> {isLoading ? "LOADING..." : "SUBMIT"} </button>
                                    <Link to="/admin/login" className="btn btn-success shadow-sm rounded-sm px-4 w-100 mt-2">Have an Account</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div class="container-p">
                <div class="row ">
                    <div class="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3 ">
                        <div class="panel border bg-white">
                            <div class="panel-heading">
                                <h3 class="pt-3 font-weight-bold">Register</h3>
                            </div>
                            <div class="panel-body p-3">
                                <form onSubmit={loginHandler}>
                                    <div class="form-group py-2">
                                        <div class="input-field">
                                            {' '}
                                            <span class="far fa-user p-2"></span> <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />{' '}
                                        </div>
                                        {validation.name && <div className="alert alert-danger">{validation.name[0]}</div>}
                                    </div>
                                    <div class="form-group py-2">
                                        <div class="input-field">
                                            {' '}
                                            <span class="fa fa-envelope p-2"></span> <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />{' '}
                                        </div>
                                        {validation.email && <div className="alert alert-danger">{validation.email[0]}</div>}
                                    </div>
                                    <div class="form-group py-1 pb-2">
                                        <div class="input-field">
                                            {' '}
                                            <span class="fas fa-lock px-2"></span> <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />{' '}
                                        </div>
                                        {validation.password && <div className="alert alert-danger">{validation.password[0]}</div>}
                                    </div>
                                    <button class="btn btn-primary btn-block mt-3" type="submit">
                                        SUBMIT
                                    </button>
                                    <div class="text-center pt-4 text-muted">
                                        Do you have account? <a href="/admin/login">Sign</a>{' '}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Login;
