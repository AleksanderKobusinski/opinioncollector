import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login, googleLogin } from '../actions/userActions'
import { GoogleLogin } from 'react-google-login';


function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ profile, setProfile ] = useState([]);

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    const clientId = "662396126009-bhsnhi6tonm1vrpspfj61259eifqokg5.apps.googleusercontent.com"

    const onSuccess = (res) => {
        setProfile(res.profileObj)
        dispatch(login(res.profileObj.email, res.profileObj.googleId))
    }

    const onFailure = (err) => {
        console.log('failed', err)
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }

        // const initClient = () => {
        //         gapi.client.init({
        //         clientId: clientId,
        //         scope: ''
        //     });
        // };
        // gapi.load('client:auth2', initClient);
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    const responseGoogle = (response) => {
        console.log(response)
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3 rounded" controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3 rounded" controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button className="rounded" type='submit' variant='primary' style={{ width: '100%', marginLeft: 0 }}>
                    Sign In
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={redirect ? '/register?redirect=' + redirect : '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>
            <Row className='py-3'>
                <GoogleLogin
                    clientId="662396126009-bhsnhi6tonm1vrpspfj61259eifqokg5.apps.googleusercontent.com"
                    buttonText="LOGIN WITH GOOGLE"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                />
            </Row>

        </FormContainer>
    )
}

export default LoginScreen