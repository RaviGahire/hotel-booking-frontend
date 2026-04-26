import React, { useState } from 'react';
import axios from 'axios';
import { LayOutSkeleton } from '../common/PageSkeleton';
import { InputField, SelectField } from '../form/FormFields';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContextData } from '../../context/Context';
import { useContext } from 'react';

const API_URL = import.meta.env.VITE_API_URL
export const PaymentForm = () => {
    const { loggedInUser } = useContext(ContextData)
    const location = useLocation();
    const navigate = useNavigate();
    const { bookingId, amount } = location.state || {};

    // console.log(bookingId,amount)

    const dashboard = (role) => {
        if (role === "customer") {
            return '/customer'
        }
        if (role === "vendor") {
            return '/vendor'
        }
        if (role === "admin") {
            return '/admin'
        }
        return '/'
    }
    const profile = dashboard(loggedInUser?.role)
    const [paymentDetails, setPaymentDetails] = useState({
        bookingId: bookingId,
        amount: amount,
        method: '',
    });

    // console.log(paymentDetails)

    const handleChange = (e) => {
        setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        console.log(paymentDetails)

        try {
            const res = await axios.post(`${API_URL}/payment/`,
                paymentDetails,
                { headers: { Authorization: `${localStorage.getItem("token")}` } })

            const cleanData = res?.data?.data
            if (res?.data?.success) {
                alert("Payment Successfull")
                navigate(profile)
            }else{
                alert(res?.data?.message || "Payment Erorr")
            }




        } catch (error) {
            console.log(error)
        }


    };

    return (
        <LayOutSkeleton bgImage={'https://images.pexels.com/photos/4512581/pexels-photo-4512581.jpeg'}>
            <div className="absolute  left-0 right-0 bottom-20 top-32 flex justify-center items-center">
                <form onSubmit={handlePayment} className="p-6 backdrop-blur-sm text-white shadow-md rounded-lg w-md mx-auto">
                    <h2 className="text-xl font-bold mb-4">Complete Your Payment</h2>

                    {/* Amount (Read Only) */}
                    <div className="mb-4">
                        <InputField
                            type='text'
                            name={'bookingId'}
                            label={"Your Booking Id is"}
                            value={paymentDetails.bookingId}
                            onChange={handleChange}

                        />
                        <InputField
                            label={'Amount'}
                            placeholder={"Amount"}
                            name={'amount'}
                            type='number'
                            value={paymentDetails.amount}
                            onChange={handleChange}

                        />
                        <SelectField
                            label={"Payment"}
                            defaultOpt='Select Payment Method'
                            name={'method'}
                            options={["credit_card", "debit_card", "upi", "cash"]}
                            value={paymentDetails.method}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                    >
                        Pay Now
                    </button>
                </form>
            </div>
        </LayOutSkeleton>
    );
};

