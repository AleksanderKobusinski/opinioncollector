import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')

    let navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`)
        } else {
            navigate('/')
        }
    }
    return (
        <Form className='d-flex' onSubmit={submitHandler} inline>
            <Form.Control
                type='text'
                name='q'
                placeholder="Search"
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5 me-2'
                aria-label="Search"
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-success'
            >
                Search
            </Button>
        </Form>
    )
}

export default SearchBox
