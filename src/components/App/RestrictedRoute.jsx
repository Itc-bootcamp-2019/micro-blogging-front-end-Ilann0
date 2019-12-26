import React from 'react';
import { Route, Redirect } from "react-router";

function RestrictedRoute(props) {
    const { Component, isAllowed, path, redirect, ...rest } = props;
    // debugger
    return (
		<Route
			{...rest}
			{...path}
			render={ () => (
				<>
					{ !!isAllowed && <Component {...props} /> }
					{  !isAllowed && <Redirect to={`${redirect}?next=${path.slice(1)}`} /> }
				</>
			)}
		/>
	);
}

export default RestrictedRoute;