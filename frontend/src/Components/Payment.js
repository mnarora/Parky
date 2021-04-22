
import React from 'react';
import Bookspacecss from '../CSS/BookSpace.module.css';
import axios from 'axios';
import {  toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
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

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}
		console.log(props.parkinginfo)
		const data = await fetch('http://localhost:3001/razorpay', 
							{ method: 'POST', 
						}).then((t) =>
			t.json()
			
		)
		const arrivall_time = props.parkinginfo.arrival_date + 'T' + props.parkinginfo.arrival_time
		
		const departuree_time = props.parkinginfo.departure_date + 'T' + props.parkinginfo.departure_time
		const date1 = new Date(arrivall_time)
		const date2 = new Date(departuree_time)
		
		const minutesDifference = (date2-date1) / (1000 * 60)
		console.log( "No of minutes: " + minutesDifference);
		props.parkinginfo.price = Math.floor((parseInt(props.parkinginfo.price ) * parseInt(props.parkinginfo.no_of_booked_spaces) *parseInt(minutesDifference)) / 60)
		console.log(data.amount)
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
			{console.log(props.parkinginfo)}
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