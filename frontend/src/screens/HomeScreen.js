import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Row, Col, Dropdown } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'
import { listCategories } from '../actions/categoryActions';

function HomeScreen() {

  let navigate = useNavigate()
  const dispatch = useDispatch()

  const [searchParams, setSearchParams] = useSearchParams()

  const productList = useSelector(state => state.productList)
  const { error, loading, products } = productList

  const categoryList = useSelector(state => state.categoryList)
  const { error: errorCategory, loading: loadingCategory, categories } = categoryList

  useEffect(() => {
    dispatch(listProducts())
    dispatch(listCategories())
  }, [dispatch])

  const filterProducts = (filter) => {
    // navigate(`/?filter=${filter}&page=1`)
  }

  return (
    <div>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>

        <Col className='text-right'>
          <Dropdown className='d-flex float-end'>
            <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
              <i className="fa-solid fa-filter"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item key='None'
                onClick={() => { filterProducts('None'); }}>
                ...
              </Dropdown.Item>
              {categories?.map(category => (
                <Dropdown.Item key={category.id} eventKey={category.id}
                  onClick={() => { filterProducts(category.id); }}>
                  {category.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
          :
          <Row>
            {products?.map(product => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
      }


    </div>
  )
}

export default HomeScreen
