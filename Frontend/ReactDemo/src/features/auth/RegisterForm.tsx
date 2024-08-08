import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import api from '../../app/api'
import { Alert, Container, Grid, Snackbar, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import OmTextField from '../../components/FormsUI/OmTextField'
import OmSubmitButton from '../../components/FormsUI/OmSubmitButton'
import { useState } from 'react'


interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

const httpUrl = import.meta.env.VITE_APP_API_HTTPS_URL
const FORM_VALIDATION = Yup.object().shape({
	email: Yup.string()
		.email('Invalid email address')
		.required('Email is required'),
	password: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), ''], 'Passwords must match')
		.required('Confirm Password is required')
})

const RegisterForm = () => {
	const [alert, setAlert] = useState<string | undefined>(undefined)
	const navigate = useNavigate()

	const handleClose = () => {
		setAlert(undefined)
	}
	const INITIAL_FORM_STATE = {
		email: '',
		password: '',
		confirmPassword: ''
	}

	const handleRegister = async ({
		email,
		password
	}: {
		email: string
		password: string
		confirmPassword: string
	}) => {
		try {
			const response = await api.post(httpUrl + '/auth/register', {
				name: email,
				password,
				email
			})
			const { message } = response.data
			console.log('message is ', message)

			navigate('/login')
		} catch (error) {
			console.log('errror', error)
			if (typeof error === 'object' && error !== null ) {
				// Now TypeScript knows alert is an object and has a 'message' property
				// error.response.data.message
				setAlert((error as ErrorResponse).response.data.message)
			}
		}
	}

	return (
		<Container>
			<Snackbar
				open={alert != undefined}
				autoHideDuration={6000}
				onClose={handleClose}>
				<Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
					{alert}
				</Alert>
			</Snackbar>
			<div>
				<Formik
					initialValues={INITIAL_FORM_STATE}
					validationSchema={FORM_VALIDATION}
					onSubmit={handleRegister}>
					<Form placeholder={undefined}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography variant='h6' align='center'>
									Register
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<OmTextField name='email' otherProps={{ label: 'Email' }} />
							</Grid>
							<Grid item xs={12}>
								<OmTextField
									name='password'
									otherProps={{ label: 'Password', type: 'password' }}
								/>
							</Grid>

							<Grid item xs={12}>
								<OmTextField
									name='confirmPassword'
									otherProps={{ label: 'Confirm Password', type: 'password' }}
								/>
							</Grid>

							<Grid item xs={12}>
								<OmSubmitButton otherProps={{}}>Submit</OmSubmitButton>
							</Grid>
						</Grid>
					</Form>
				</Formik>
			</div>
		</Container>
	)
}

export default RegisterForm
