/* eslint-disable react/prop-types */

import React from "react";


export default function Field({ label, htmlFor, error, children }) {
    const id = htmlFor ?? getChildrenId(children);
    return (
        <div className="form-control">
            {label && <label className="auth-label" htmlFor={id}>{label}</label>}
            {children}
            {error && <p className="text-red-500">{error.message}</p>}
        </div>
    )
}

function getChildrenId(children) {
    const child = React.Children.only(children);
    return child.props.id;
}
