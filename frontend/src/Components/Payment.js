
import React, { useState } from 'react';
import Bookspacecss from '../CSS/BookSpace.module.css';
import axios from 'axios';
import {  toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}
function savePaymentDetails(data) {
	console.log(data)
	let payment = {
		transaction_id: '',
		amount: '',
		email: '',
        booking_id: '',
	}
	payment.email = window.sessionStorage.getItem("useremail")
	payment.amount = data.amount
	payment.transaction_id = data.id
	payment.booking_id = window.sessionStorage.getItem("booking_id")
	axios.post("http://localhost:3001/savepaymentdetails", payment)
	.then(
		res => {
			console.log("saved")
		}
	)
	.catch(
		err => {
			console.log(err)
		}
	)
}

function Payment(props) {
	const [name, setName] = useState('Manish')
	const [state, setState] = useState({
        email: '',
        amount: '',
        payment_id: '',
        booking_id: '',
       
    })

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}
		
		const data = await fetch('http://localhost:3001/razorpay', { method: 'POST' }).then((t) =>
			t.json()
			
		)
		savePaymentDetails(data)
		
		const options = {
			key: 'rzp_test_4z2vw67s30xv3b',
			currency: data.currency,
			amount: props.parkinginfo.price*100,
			order_id: data.amount.id,
			name: 'Parky Booking',
			description: '',
			handler: function (response) {
				console.log(response);
				console.log(props.parkinginfo)
				
				axios.post('http://localhost:3001/bookspace', props.parkinginfo)
				.then(res => {
					if (res.data.error) {
						toast.error(res.data.error)
					}
					else {
						toast.success(res.data.msg)
						props.history.push('/bookinghistory')
					}
				})
				console.log(data);
				//axios.post('http://localhost:3001/payment', props.parkinginfo)
				//.then(res => {
				//	if (res.data.error)
				//		toast.error(res.data.error)
				//	else {
				//		props.history.push('/bookspace')
				//		toast.success(res.data.msg)
				//	}
        		//})
			},
			prefill: {
				name: 'Manish Arora',
				email: props.parkinginfo.email ,
				phone_number: sessionStorage.contact
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

	return (
		
		<div className="Payment">
			{console.log(props.parkinginfo)}
			<button className={Bookspacecss.buttonn} 
			onClick={displayRazorpay}
			target="_blank"
			rel="noopener noreferrer">
				Proceed to Pay
			</button>
			<ToastContainer position={toast.POSITION.TOP_CENTER}/>
		</div>
	)
}

export default Payment