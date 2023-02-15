import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
mutation($product: ProductInput){
    createProduct(product: $product) {
     title
     price
     description
     quantity
     stock
     images {
      url
      title
    }
    }
  }
`

export const CREATE_PAYMENT = gql`
mutation($productIds: [ID!], $quantities: [Int!]){
  createPayment (productIds: $productIds, quantities: $quantities){
    id
    init_point
    productIds
    quantities
    operation_type
    items {
      title
      description
      quantity
      unit_price
    }
    payer {
      email
    }
  }
}
`

export const UPDATE_PRODUCT = gql`
mutation($updateProductId: ID!, $product: ProductInput){
    updateProduct(id: $updateProductId, product: $product) {
      title
      price
      description
      quantity
      stock
      images {
      url
      title
    }
    }
  }
  `

export const UPDATE_PRODUCT_STOCK = gql`
mutation($updateProductStockId: ID!, $stock: String){
  updateProductStock(id: $updateProductStockId, stock: $stock) {
    id
    stock
  }
}
`


export const REGISTER_USER = gql`
mutation($registerInput: RegisterInput, $role: Role){
  registerUser(registerInput: $registerInput, role: $role) {
    avatar
    username
    email
    token
  }
}
`

export const LOGIN_USER = gql`
mutation($loginInput: LoginInput){
  loginUser(loginInput: $loginInput) {
    id
    username
    email
    password
    token
    role
    avatar
  }
}
`