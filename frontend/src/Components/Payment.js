
import React, { useState } from 'react'

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

// const __DEV__ = document.domain === 'localhost'

function Payment() {
	const [name, setName] = useState('Manish')

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('http://localhost:3001/razorpay', { method: 'POST' }).then((t) =>
			t.json()
		)

		// console.log(data)

		const options = {
			key: 'rzp_test_4z2vw67s30xv3b',
			currency: data.currency,
			amount: data.amount,
			order_id: data.amount.id,
			name: 'Donation',
			description: 'Thank you for nothing. Please give us some money',
			handler: function (response) {
				console.log(response);
			},
			prefill: {
				name,
				email: 'sdfdsjfh2@ndsfdf.com',
				phone_number: '9899999999'
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

	return (
		<div className="Payment">
			<button className="Payment-header">
				<a
					className="Payment-link"
					onClick={displayRazorpay}
					target="_blank"
					rel="noopener noreferrer"
				>
					Donate $5
				</a>
            </button>
		</div>
	)
}

export default Payment