import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function NavBar() {
	return (
		<AppBar position='static'>
			<Toolbar>
				<Typography
					variant='h6'
					noWrap
					sx={{
						mr: 2,
						display: { xs: 'none', md: 'flex' },
						fontFamily: 'monospace',
						fontWeight: 700,
						letterSpacing: '.3rem',
						color: 'inherit',
						textDecoration: 'none'
					}}>
					<Link className='text-link' to='/'>
						Order Management
					</Link>
				</Typography>
				<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
					<Button
						key='Customers'
						sx={{ my: 2, color: 'white', display: 'block' }}>
						<Link className='text-link' to='/customers'>
							Customers
						</Link>
					</Button>
					<Button key='Orders' sx={{ my: 2, color: 'white', display: 'block' }}>
						<Link className='text-link' to='/orders'>
							Orders
						</Link>
					</Button>
					<Button
						key='NewCustomer'
						sx={{ my: 2, color: 'white', display: 'block' }}>
						<Link className='text-link' to='/customers/newcustomer'>
							New Customer
						</Link>
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	)
}
