import React from 'react'
import '../css/stars.css'
import PropTypes from 'prop-types'

const rating = (props) => {

	const handleClick = (event) => {
		props.modifyRating(event.target.innerHTML)
	}

	const inputs = () => {
		let stars = []
		let checked

		for (let i = 1; i <= 5; i++) {
			i === props.myRating ? checked = true : checked = false

			stars.push(<input defaultChecked={checked} key={props.id + i} type="radio" name="star" className={`star-${i}`} id={props.id + i} />)
			stars.push(<label onClick={handleClick} key={props.id + (i * 6)} className={`star-${i}`} htmlFor={props.id + i}>{i}</label>)
		}

		return (
			<div className="stars">
				{stars}
				<span></span>
			</div>
		)
	}

	return (
		<form id={props.id}>
			{inputs()}
		</form>
	)
}

rating.propTypes = {
	id: PropTypes.string.isRequired,
	myRating: PropTypes.number.isRequired,
	modifyRating: PropTypes.func.isRequired
}

export default rating