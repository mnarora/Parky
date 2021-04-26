
import React from 'react';
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
	axios.post(process.env.REACT_APP_BACKEND  + '/savepaymentdetails', payment)
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

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}
		const data = await fetch(process.env.REACT_APP_BACKEND  + '/razorpay', 
							{ method: 'POST', 
						}).then((t) =>
			t.json()
			
		)
		const arrivall_time = props.parkinginfo.arrival_date + 'T' + props.parkinginfo.arrival_time
		
		const departuree_time = props.parkinginfo.departure_date + 'T' + props.parkinginfo.departure_time
		const date1 = new Date(arrivall_time)
		const date2 = new Date(departuree_time)
		
		const minutesDifference = (date2-date1) / (1000 * 60)

		var Price = Math.floor((parseInt(props.parkinginfo.price ) * parseInt(props.parkinginfo.no_of_booked_spaces) *parseInt(minutesDifference)) / 60)
		data.amount = Price
		savePaymentDetails(data)
		
		const options = {
			key: 'rzp_test_4z2vw67s30xv3b',
			currency: data.currency,
			amount: Price*100,
			order_id: data.amount.id,
			name: 'Parky Booking',
			description: '',
			handler: function (response) {
				props.parkinginfo.price = Price
				axios.post(process.env.REACT_APP_BACKEND  + '/bookspace', props.parkinginfo)
				.then(res => {
					if (res.data.error) {
						toast.error(res.data.error)
					}
					else {
						toast.success(res.data.msg)
						props.history.push('/bookinghistory')
					}
				})
			},
			prefill: {
				name: sessionStorage.name,
				email: props.parkinginfo.email ,
				phone_number: sessionStorage.contact
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

	return (
		
		<div className="Payment" align="center">
			<button className={Bookspacecss.buttonn} 
			onClick={displayRazorpay}
			type="submit"
			target="_blank"
			rel="noopener noreferrer">
				Proceed to Pay
			</button>
			<ToastContainer position={toast.POSITION.TOP_CENTER}/>
		</div>
	)
}

export default Payment