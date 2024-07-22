import React from 'react'


export default function Alert(props) {
    const {alert}=props;
    const Capitalize=(string)=>{
        if (string==='danger'){
            string='error'
          }
        const lower=string.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
            alert && <div className={`alert alert-${alert.type} alert-dismissible`} role="alert">
                 <strong>{Capitalize(alert.type)}</strong>: {alert.msg}
            </div>
    )
}
