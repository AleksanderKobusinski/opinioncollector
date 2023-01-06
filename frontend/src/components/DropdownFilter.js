import React, {useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Dropdown } from 'react-bootstrap'
import { listCategories } from '../actions/categoryActions'

function DropdownFilter() {
    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryList)
    const { loading, error, categories } = categoryList

    useEffect(() => {
        dispatch(listCategories())
    }, [ dispatch ])

    return (
        <Dropdown>
            <Dropdown.Toggle id="dropdown-button" variant="light">
            <i className="fa-solid fa-filter"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
            {categories?.map(category => (
                <Col sm={12} md={6} lg={4} xl={3}>
                    <Dropdown.Item href="{category._id}" active>
                        {category.name}
                    </Dropdown.Item>
                </Col>
            ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropdownFilter