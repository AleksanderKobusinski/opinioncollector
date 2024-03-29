import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { listCategories } from '../actions/categoryActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


function ProductEditScreen() {

    const productId = useParams();

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate

    const categoryList = useSelector(state => state.categoryList)
    const { error: errorCategory, loading: loadingCategory, categories } = categoryList


    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else {
            if (!product.name || product._id !== Number(productId.id)) {
                dispatch(listProductDetails(productId.id))
                dispatch(listCategories())
            } else {
                setName(product.name)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setDescription(product.description)

            }
        }
    }, [dispatch, product, productId.id, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId.id,
            name,
            image,
            brand,
            category,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId.id)

        setUploading(true)

        try {
            const { data } = await axios
                .create({
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .post('/api/products/upload/', formData)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <Link to='/admin/productlist'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group className="mb-3 rounded" controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group className="mb-3 rounded" controlId='image'>
                                <Form.Label>Image</Form.Label>

                                <Form.Control

                                    type='name'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>

                            </Form.Group>


                            <Form.Group className="mb-3 rounded" controlId='brand'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter brand'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3 rounded" controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control

                                    as="select"
                                    // value={category.name}
                                    onChange={(e) => { setCategory(e.target.value); console.log(category) }}
                                >
                                    <option value=''></option>
                                    {categories?.map(categoryEx => (
                                        <option key={categoryEx._id} value={categoryEx._id}>{categoryEx.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3 rounded" controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control

                                    as='textarea'
                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Button className="mb-3 rounded" type='submit' variant='primary'>
                                Update
                            </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>

    )
}

export default ProductEditScreen