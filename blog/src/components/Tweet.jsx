import React from "react"

function Tweet(props) {
    const { tweet } = props
    return (
        <div>
            { tweet }
        </div>
    )
}

export default Tweet