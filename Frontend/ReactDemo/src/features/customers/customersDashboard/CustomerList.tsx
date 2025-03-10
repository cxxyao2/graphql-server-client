import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


import OmGrid from '../../../components/elements/OmGrid'
import { IconButton } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import { Address, Customer } from '../../../types/Nonconstants'

interface CustomerListProps {
	customers: Customer[]
}

export default function CustomerList({ customers }: CustomerListProps) {
	const navigate = useNavigate()

	const [columnDefs] = useState([
		{
			field: 'id',
			width: 50,
			suppressSizeToFit: true,
			cellRenderer: function (params: any) {
				return (
					<IconButton
						onClick={() => navigate(`/customers/${params.value}`)}>
						<LaunchIcon fontSize='small' color='secondary' />
					</IconButton>
				)
			}
		},
		{ field: 'firstName' },
		{ field: 'lastName' },
		{ field: 'contactNumber' },
		{ field: 'email' },
		{
			field: 'address',
			cellRenderer: function (params: any) {
				const address = params.value as Address
				return (
					address.addressLine1 +
					', ' +
					address.addressLine2 +
					', ' +
					address.city +
					', ' +
					address.state +
					', ' +
					address.country
				)
			}
		}
	])

	return <OmGrid columnDefs={columnDefs} rowData={customers} />
}
