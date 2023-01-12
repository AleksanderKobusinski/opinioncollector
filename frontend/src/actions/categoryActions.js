import axios from 'axios'
import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,

    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
    CATEGORY_DETAILS_RESET,

    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,

    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,

    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
} from '../constants/categoryConstants'

export const listCategories = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_LIST_REQUEST
        })

        const { data } = await axios
            .get(`/categories`)

        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getCategoryDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const { data } = await axios
            // .create({
            //     headers: {
            //         Authorization: `Bearer ${userInfo.token}`,
            //         'Content-Type': 'application/json',
            //     },
            // })
            .get(`/categories/${id}`)

        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteCategory = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const { data } = await axios
            // .create({
            //     headers: {
            //         Authorization: `Bearer ${userInfo.token}`,
            //         'Content-Type': 'application/json',
            //     },
            // })
            .delete(`/categories/delete/${id}`)

        dispatch({
            type: CATEGORY_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: CATEGORY_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createCategory = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const { data } = await axios
            // .create({
            //     headers: {
            //         'Content-type': 'application/json',
            //         Authorization: `Bearer ${userInfo.token}`
            //     }
            // })
            .post(
                `/categories/create`,
                {}
            )

        dispatch({
            type: CATEGORY_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: CATEGORY_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateCategory = (category) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const { data } = await axios
            // .create({
            //     headers: {
            //         Authorization: `Bearer ${userInfo.token}`,
            //         'Content-Type': 'application/json',
            //     },
            // })
            .put(
                `/categories/update/${category._id}`,
                category,
            )

        dispatch({
            type: CATEGORY_UPDATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: CATEGORY_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}