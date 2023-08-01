//import cookie
import Cookies from "js-cookie";

import axios from 'axios'

//import react and hook
import React, { useState, useEffect } from "react";

//import react router dom
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
    
    //token from cookie
    const token = Cookies.get('token');

    // const [user, setUser] =useState({});

    // React.useEffect(() => {
    //   axios.get('http://localhost:8000/api/admin/user', {
    //     headers: {
    //         "Accept": "application/json",
    //         "Content-Type": "application/json",
    //         //header Bearer + Token
    //         Authorization: `Bearer ${token}`,
    //     }
    // }).then((response) => {
    //     setUser(response.data);
    //   });
    // });



    return (
        <Route {...rest}>
            {token ?  children :  <Redirect to="/admin/login" />}
        </Route>
    )
    
}

export default PrivateRoute;