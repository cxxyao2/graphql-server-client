import { gql } from '@apollo/client'

export const GetOrderByIdQuery = gql`
	query GetOrderById($id: Int!) {
		orders(where: { id: { eq: $id } }) {
			nodes {
				id
				orderDate
				description
				totalAmount
				depositAmount
				isDelivery
				status
				otherNotes
				customer {
					id
					firstName
					lastName
					contactNumber
					email
				}
			}
		}
	}
`
