import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    
    PRODUCT_UPDATE_VISIBLE_REQUEST,
    PRODUCT_UPDATE_VISIBLE_SUCCESS,
    PRODUCT_UPDATE_VISIBLE_FAIL,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
} from '../constants/productConstants'

export const listProducts = (keyword = '', filter = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get(`/api/products?${keyword}${filter}`)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const { data } = await axios
            .create({
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            .delete(
                `/api/products/delete/${id}/`
            )

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const { data } = await axios
            .create({
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            .post(
                `/api/products/create/`,
                {}
            )

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const { data } = await axios
            .create({
                headers: {
                    // 'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            .put(
                `/api/products/update/${product._id}/`,
                product
            )

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateVisibleProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_VISIBLE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const { data } = await axios
            .create({
                headers: {
                    // 'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            .put(
                `/api/products/updateVisible/${id}/`
            )

        dispatch({
            type: PRODUCT_UPDATE_VISIBLE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_VISIBLE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const { data } = await axios
            .create({
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            .post(
                `/api/products/${productId}/reviews/`,
                review
            )

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}