import React from 'react';

export default ({ input, label, meta:{error, touched} }) =>{
    console.log(input);

    return(
        <div>
            <label>{label}</label>
            <input {...input}  />
            <div className="red-text" style={{ marginBottom:'5px'}}>
                {touched && error  }
            </div>

        </div>
    );
};