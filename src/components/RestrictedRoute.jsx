import React from 'react';
import { Route, Redirect } from "react-router";

function RestrictedRoute(props) {
    const { Component, isAllowed, path, redirect, ...rest } = props;
    // debugger
    return (
        <Route {...path} {...rest} render={ (props) => ( 
                isAllowed
                ? ( <Component { ...props } />) 
                : ( <Redirect to={ `${redirect}?next=${path.slice(1)}` } />)
            )}
        />
    )
}

export default RestrictedRoute;