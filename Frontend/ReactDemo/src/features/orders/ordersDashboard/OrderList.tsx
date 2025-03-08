import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { IconButton } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import { Customer, Order } from '../../../types/Nonconstants'

interface OrderListProps {
	orders: Order[]
}

export default function OrderList({ orders }: OrderListProps) {
	const navigate = useNavigate()
	console.log('orders is', orders)

	const [columnDefs] = useState([
		{
			field: 'id',
			headerName: '',
			width: 80,
			suppressSizeToFit: true,
			cellRenderer: function (params: any) {
				return (
					<IconButton onClick={() => navigate(`/orders/${params.value}`)}>
						<LaunchIcon fontSize='small' color='secondary' />
					</IconButton>
				)
			}
		},
		{
			field: 'id',
			width: 80
		},
		{
			field: 'customer',
			cellRenderer: function (params: any) {
				const customer = params.value as Customer
				return customer.firstName + ' ' + customer.lastName
			}
		},
		{ field: 'orderDate' },
		{ field: 'status' }
	])

	const defaultColDef = useMemo(
		() => ({
			sortable: true,
			filter: true,
			resizable: true
		}),
		[]
	)

	return (
		<div className='ag-theme-alpine' style={{ height: 500, width: '100%' }}>
			<AgGridReact
				rowData={orders}
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
			/>
		</div>
	)
}
