import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import { googleLogin } from '../actions/userActions'
import { GoogleLogin } from 'react-google-login';

function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [ profile, setProfile ] = useState([]);

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    const clientId = "662396126009-bhsnhi6tonm1vrpspfj61259eifqokg5.apps.googleusercontent.com"
    const onSuccess = (res) => {
        setProfile(res.profileObj)
        dispatch(register(res.profileObj.givenName, res.profileObj.email, res.profileObj.googleId))
        setProfile(null);
    }

    const onFailure = (err) => {
        console.log('failed', err);
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }

    //     const initClient = () => {
    //         gapi.client.init({
    //         clientId: clientId,
    //         scope: ''
    //     });
    // };
    // gapi.load('client:auth2', initClient);
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group className="mb-3 rounded" controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3 rounded" controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3 rounded" controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3 rounded" controlId='confirmPassword'>
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button className="rounded" type='submit' variant='primary' style={{ width: '100%', marginLeft: 0 }}>
                    Register
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account? <Link to={redirect ? '/login?redirect=' + redirect : '/login'}>
                        Sign In
                    </Link>
                </Col>
            </Row>
            <Row className='py-3'>
                <GoogleLogin
                    clientId="662396126009-bhsnhi6tonm1vrpspfj61259eifqokg5.apps.googleusercontent.com"
                    buttonText="REGISTER WITH GOOGLE"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                />
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
