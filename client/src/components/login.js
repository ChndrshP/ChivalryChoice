import React, { useState } from "react";

const login = () => {
    const [formData, setFormData] = useState({
        email: "admin@gmail.com",
        password: "abcd1234"
    });

    // Deconstruct formData
    const { email, password } = formData;

    //onchange Handler
    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //onSubmit handler
    const onSubmitHandler = (e) => {
        e.preventDefault();
    };

    //set the store data
    const {loading, userAuth} = {};

    //redirect 
    if(userAuth?. userIndo?. status){
        window.location.href = "/admin";
    }

    return(
        <>
        <section className="py-20 bg-gray-100 overflow-x-hidden">
            
        </section>
        </>
    )

}