import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getCategoryDetails, updateCategory } from '../actions/categoryActions'
import { CATEGORY_UPDATE_RESET } from '../constants/categoryConstants'

function CategoryEditScreen() {

    const categoryId = useParams();

    const [name, setName] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const categoryDetails = useSelector(state => state.categoryDetails)
    const { error, loading, category } = categoryDetails

    const categoryUpdate = useSelector(state => state.categoryUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = categoryUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: CATEGORY_UPDATE_RESET })
            navigate('/admin/categorylist')
        } else {
            if (!category.name || category._id !== Number(categoryId.id)) {
                dispatch(getCategoryDetails(categoryId.id))
            } else {
                setName(category.name)
            }
        }

    }, [dispatch, category, categoryId.id, successUpdate, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateCategory({ _id: category._id, name }))
    }

    return (
        <div>
            <Link to='/admin/categorylist'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Category</h1>
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

                            <Button type='submit' variant='primary'>
                                Update
                        </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>

    )
}

export default CategoryEditScreen