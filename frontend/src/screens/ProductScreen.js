import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form, Modal, Alert } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, createProductReview, listProductReviews } from '../actions/productActions'
import { createMessage } from '../actions/messageActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

function ProductScreen() {

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('')
    const [productName, setProductName] = useState('')
    const [showAlert, setShowAlert] = useState(false);

    const productId = useParams();
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productReviewList = useSelector(state => state.productReviewList)
    const { error: errorReview, loading: loadingReview, reviews } = productReviewList

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
        dispatch(listProductReviews(productId.id))

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
        dispatch(createMessage(
                {product: productId,
                text: message}
        ))
        setShowAlert(true)
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(reviews)

    return (

        <div>

                <Alert variant='success' show={showAlert} onClose={() => setShowAlert(false)} dismissible>
                    Feedback sent!
                </Alert>
            <Row className='align-items-center'>
                <Col>
                    <Link to='/' className='btn btn-light my-3'>Go Back</Link>
                </Col>

                <Col>
                    <Button className='my-3 float-end' variant='outline-warning' onClick={handleShow}>
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
                                onChange={(e) => {setMessage(e.target.value); setProductName(product.name)}}
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
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <Row>
                                {/* <Col md={8}>
                                    <Image src={product.image} alt={product.name} fluid />
                                </Col> */}
                                <Col md={4}>
                                    <ListGroup variant='flush'>
                                        <ListGroupItem>
                                            <h3>{product.name}</h3>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                                <Rating value={product.avg_rating} color={'#f8e825'} />
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
                                            {reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                                            {reviews?.map((review) => (

                                                <ListGroup.Item>
                                                    {review.user.first_name} {review.user.last_name}


                                                    {/* <p className="mb-0">
                                                        {review.createdAt.substring(0, 10)}
                                                    </p> */}

                                                    <p className="mb-0">
                                                        <Rating value={review.grade} color='#f8e825' />
                                                        {review.description}
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
                                                                <option value='1'>1</option>
                                                                <option value='2'>2</option>
                                                                <option value='3'>3</option>
                                                                <option value='4'>4</option>
                                                                <option value='5'>5</option>
                                                                <option value='6'>6</option>
                                                                <option value='7'>7</option>
                                                                <option value='8'>8</option>
                                                                <option value='9'>9</option>
                                                                <option value='10'>10</option>
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
                                                            style={{ width: '100%', marginLeft: 0 }}
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
