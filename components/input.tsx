/* eslint-disable react/prop-types */
/* eslint-disable no-var */
import { useState } from "react"
import styled from "styled-components"
import validator from "validator"

export const Input = (props) => {
	const [email, setEmail] = useState(true)
	function validateEmail(event) {
		var email = event.target.value

		if (validator.isEmail(email)) {
			setEmail(true)
			props.emailValid(true)
		} else {
			setEmail(false)
			props.emailValid(false)
		}
	}

	return (
		<Container isEmailValid={email} isAnEmail={props.isEmail}>
			<div className="group">
				<input
					type={props.Type}
					className="input"
					onChange={(e) => {
						if (props.isEmail) {
							props.comeBack(e.target.value), validateEmail(e)
						} else {
							props.comeBack(e.target.value)
						}
					}}
				/>
				<span className="bar"></span>
				<label>{props.Text}</label>
			</div>
		</Container>
	)
}

const Container: any = styled.div`
	/* From uiverse.io by @G4b413l */
	.group {
		position: relative;
	}
	.input {
		font-size: 16px;
		color: black;
		color: ${(props: any) => {
			if (props.isAnEmail) {
				if (props.isEmailValid) {
					return "black"
				} else {
					return "red"
				}
			}
		}};
		padding: 20px 10px 0px 5px;
		display: block;
		width: 200px;
		border: none;
		border-bottom: 1px solid #515151;
		background: transparent;
	}
	.input:focus {
		outline: none;
	}
	label {
		color: #999;
		font-size: 18px;
		font-weight: normal;
		position: absolute;
		pointer-events: none;
		left: 5px;
		top: 10px;
		transition: 0.2s ease all;
		-moz-transition: 0.2s ease all;
		-webkit-transition: 0.2s ease all;
	}
	.input:valid ~ label {
		top: -1.5vw;
		font-size: 14pt;
		color: #5264ae;
	}
	.bar {
		position: relative;
		display: block;
		width: 200px;
	}
`
