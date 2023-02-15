import { gql } from "@apollo/client"

export const ALL_PRODUCT = gql`
query{
getAllProduct {
id
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

export const FIND_PRODUCT = gql`
query($findProductId: ID){
  findProduct(id: $findProductId) {
    id
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