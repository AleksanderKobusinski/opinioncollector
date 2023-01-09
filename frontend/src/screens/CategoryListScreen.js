import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listCategories, deleteCategory, createCategory } from '../actions/categoryActions'
import { CATEGORY_CREATE_RESET } from '../constants/categoryConstants'

function CategoryListScreen() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryList)
    const { loading, error, categories } = categoryList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const categoryDelete = useSelector(state => state.categoryDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = categoryDelete

    const categoryCreate = useSelector(state => state.categoryCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, category: createdCategory } = categoryCreate


    useEffect(() => {
        dispatch({ type: CATEGORY_CREATE_RESET })

        if (!userInfo.isAdmin) {
            navigate('/login')
        }

        if (successCreate) {
            navigate(`/admin/category/${createdCategory._id}/edit`)
        } else {
            dispatch(listCategories())
        }

    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdCategory])

    const createCategoryHandler = () => {
        dispatch(createCategory())
    }

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            dispatch(deleteCategory(id))
        }
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Categories</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3 float-end' onClick={createCategoryHandler}>
                        <i className='fas fa-plus'></i> Create Category
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {categories?.map(category => (
                                        <tr key={category._id}>
                                            <td>{category._id}</td>
                                            <td>{category.name}</td>
                                            <td>
                                                <LinkContainer to={`/admin/category/${category._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(category._id)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
        </div>
    )
}

export default CategoryListScreen
