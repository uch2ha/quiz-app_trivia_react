import React from "react"
import MaterialUICard from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"

const Card = ({ children, styles, onClick }) => {
    const customStyle = {
        ...styles,
        minWidth: "30%",
        margin: 0,
        fontSize: 10.2,
    }

    return (
        <MaterialUICard style={customStyle} variant="outlined" onClick={onClick}>
            <CardContent>{children}</CardContent>
        </MaterialUICard>
    )
}

export default Card