import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

function Product({ product }) {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product.id}`}>
        <Card.Img src={product.image} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product.id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <div className='my-3'>
            {product.rating !== null ? (
              <Rating value={product.avg_rating}  color={'#f8e825'} />
            ) : (
              <Rating value={product.avg_rating}  color={'#f8e825'} />
            )}
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
