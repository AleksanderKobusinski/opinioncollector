import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Row, Col, Form, Dropdown } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'
import { listCategories } from '../actions/categoryActions';

function HomeScreen() {

  let navigate = useNavigate()
  const dispatch = useDispatch()

  const [searchParams, setSearchParams] = useSearchParams()
  const [filter, setFilter] = useState('')

  const productList = useSelector(state => state.productList)
  const { error, loading, products } = productList

  const categoryList = useSelector(state => state.categoryList)
  const { error: errorCategory, loading: loadingCategory, categories } = categoryList

  let keyword = searchParams

  useEffect(() => {
    dispatch(listProducts(keyword))
    dispatch(listCategories())
  }, [ dispatch, keyword ])

  const submitHandler = (e) => {
      e.preventDefault()
      console.log(filter)
      if (filter) {
          navigate(`/?filter=${filter}&page=1`)
      } else {
          navigate('/')
      }
  }

  return (
    <div>
      <Row className='align-items-center'>
          <Col>
            <h1>Products</h1>
          </Col>

          <Col className='text-right'>
            <Form className='d-flex float-end' inline>
                {/* <Form.Control
                style={{ width: '200px'}}
                as="select"
                onChange={(e) => setFilter(e.target.value)}
                defaultValue={filter}
                >
                    <option value='None'>...</option>
                {categories?.map(category => (          
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))}
                </Form.Control>

                <Button
                    type='submit'
                    variant='outline-dark'
                >
                    <i className="fa-solid fa-filter"></i>
                </Button> */}
                <Dropdown>
                  <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                  <i className="fa-solid fa-filter"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="0" onChange={submitHandler}>
                      <Form.Check 
                            name="filter"
                            type='radio'
                            value='None'
                            label='...'
                            onChange={(e) => setFilter(e.target.value)}
                            checked={window.location.href.slice(32,33) == "N" || window.location.href.slice(32,33) == '' ? true : false}
                          />
                      </Dropdown.Item>  
                      {categories?.map(category => (  
                        <Dropdown.Item key={category._id} eventKey={category._id} onChange={submitHandler}> 
                          <Form.Check 
                            name="filter"
                            type='radio'
                            value={category._id}
                            id={category._id}
                            label={category.name}
                            onChange={(e) => setFilter(e.target.value)}
                            checked={window.location.href.slice(32,33) == category._id ? true : false}
                          />
                        </Dropdown.Item>  
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
            </Form>
          </Col>
      </Row>
      
      {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
          :
          <Row>
            {products?.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))}
          </Row>
    }

      
    </div>
  )
}

export default HomeScreen
