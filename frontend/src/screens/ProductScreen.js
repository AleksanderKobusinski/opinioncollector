import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form, Modal } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

function ProductScreen() {

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('')

    const productId = useParams();
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        error: errorProductReview, 
        loading: loadingProductReview,  
        success: successProductReview, 
    } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }

        dispatch(listProductDetails(productId.id))

    }, [dispatch, productId, successProductReview])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(
        productId.id, {
        rating,
        comment
    }
    ))
}

const feedbackHandler = (e) => {
    e.preventDefault()
}

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <div><Row className='align-items-center'>
                <Col>
                    <Link to='/' className='btn btn-light my-3'>Go Back</Link>
                </Col>

                <Col>
                    <Button className='my-3 float-end' variant='warning' onClick={handleShow}>
                        <i className="fa-solid fa-circle-exclamation"></i>
                    </Button>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Send feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={feedbackHandler}>
                        <Form.Group className="mb-3 rounded" controlId='description'>
                            <Form.Label>Feedback message</Form.Label>
                            <Form.Control

                                as='textarea'
                                type='text'
                                placeholder='Enter message'
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Button variant="success" type="submit" onClick={handleClose}>
                            Send
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
            
            {loading ?
                <Loader/>
                : error
                    ?<Message variant='danger'>{error}</Message>
                :(
                    <div>
                        <Row>
                            <Col md={8}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={4}>
                                <ListGroup variant='flush'>
                                    <ListGroupItem>
                                        <h3>{product.name}</h3>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                    {product.rating !== null ? (
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                    ) : (
                                    <Rating value={product.rating} text={`0 reviews`} color={'#f8e825'} />
                                    )}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        {product.description}
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row className='pt-5'>
                            <Col md={8}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Reviews</Card.Title>
                                    </Card.Body>
                                
                                    <ListGroup className="list-group-flush">
                                    {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                                        {product.reviews.map((review) => (

                                            <ListGroup.Item>
                                                            {review.name}


                                                            <p className="mb-0">
                                                                {review.createdAt.substring(0, 10)}
                                                            </p>

                                                        <p className="mb-0">
                                                            <Rating value={review.rating} color='#f8e825' />
                                                            {review.comment}
                                                        </p>

                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    {userInfo && !userInfo.isAdmin && (
                                    <Card.Body>
                                        <Card.Title>Write a review</Card.Title>

                                            {loadingProductReview && <Loader />}
                                            {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                            {userInfo ? (

                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group className="mb-3 rounded" controlId='rating'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1 - Poor</option>
                                                            <option value='2'>2 - Fair</option>
                                                            <option value='3'>3 - Good</option>
                                                            <option value='4'>4 - Very Good</option>
                                                            <option value='5'>5 - Excellent</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group className="mb-3 rounded" controlId='comment'>
                                                        <Form.Label>Review</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='5'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>

                                                    <Button
                                                        className="rounded"
                                                        disabled={loadingProductReview}
                                                        type='submit'
                                                        variant='primary'
                                                        style={{width: '100%', marginLeft: 0}}
                                                    >
                                                        Submit
                                                    </Button>
                                                </Form>

                                            ) : (
                                                    <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                                )}
                                    </Card.Body>
                                    )}
                                </Card>
                            </Col>
                        </Row>
                    </div>
                )
            }
        </div>
    )
}

export default ProductScreen
