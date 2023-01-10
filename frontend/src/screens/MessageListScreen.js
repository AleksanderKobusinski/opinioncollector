import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listMessages, deleteMessage } from '../actions/messageActions'

function MessageListScreen() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const messageList = useSelector(state => state.messageList)
    const { loading, error, messages } = messageList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const messageDelete = useSelector(state => state.messageDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = messageDelete

    useEffect(() => {

        if (!userInfo.isAdmin) {
            navigate('/login')
        }

        dispatch(listMessages())
    }, [dispatch, navigate, userInfo, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            dispatch(deleteMessage(id))
        }
    }

    return (
        <div>
            <h1>Messages</h1>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loading
                ? <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>PRODUCT</th>
                                    <th>TEXT</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages?.map(message => (
                                    <tr key={message._id}>
                                        <td>{message._id}</td>
                                        <td>{message.product}</td>
                                        <td>{message.text}</td>
                                        <td>
                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(message._id)}>
                                                <i className='fas fa-trash' ></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default MessageListScreen
