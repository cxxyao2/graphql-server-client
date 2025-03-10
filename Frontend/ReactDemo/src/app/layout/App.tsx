import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { setContext } from '@apollo/client/link/context'

import CustomersDashboard from '../../features/customers/customersDashboard/CustomersDashboard'
import './styles.css'
import Layout from './Layout'
import HomePage from '../../features/home/HomePage'
import OrdersDashboard from '../../features/orders/ordersDashboard/OrdersDashboard'
import CustomerPage from '../../features/customers/CustomerPage'
import OrderPage from '../../features/orders/OrderPage'
import NewCustomerPage from '../../features/customers/NewCustomerPage'
import NewOrderPage from '../../features/orders/NewOrderPage'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { split, HttpLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import LoginForm from '../../features/auth/LoginForm'
import RegisterForm from '../../features/auth/RegisterForm'
import TestOrder from '../../features/orders/TestOrder'

const httpLink = new HttpLink({
	uri: import.meta.env.VITE_APP_API_GRAPHQL_URL
})
const wsLink = new GraphQLWsLink(
	createClient({
		url: import.meta.env.VITE_APP_API_WS_URL
	})
)

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('accessToken')
	return {
		headers: {
			...headers,
			Authorization: token ? `Bearer ${token}` : ''
		}
	}
})

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query)
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		)
	},
	wsLink,
	authLink.concat(httpLink)
)

const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache({
		typePolicies: {}
	})
})

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<ApolloProvider client={client}>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Layout />}>
							<Route index element={<HomePage />} />
							<Route path='login' element={<LoginForm />} />
							<Route path='test' element={<TestOrder />} />
							<Route path='register' element={<RegisterForm />} />
							<Route path='customers' element={<CustomersDashboard />} />
							<Route path='customers/:customerId' element={<CustomerPage />} />
							<Route
								path='customers/:customerId/neworder'
								element={<NewOrderPage />}
							/>
							<Route
								path='customers/newcustomer'
								element={<NewCustomerPage />}
							/>
							<Route path='orders' element={<OrdersDashboard />} />
							<Route path='orders/:orderId' element={<OrderPage />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</ApolloProvider>
		</LocalizationProvider>
	)
}

export default App
