import axios from 'axios'
import {
    MESSAGE_LIST_REQUEST,
    MESSAGE_LIST_SUCCESS,
    MESSAGE_LIST_FAIL,

    MESSAGE_DETAILS_REQUEST,
    MESSAGE_DETAILS_SUCCESS,
    MESSAGE_DETAILS_FAIL,
    MESSAGE_DETAILS_RESET,

    MESSAGE_DELETE_REQUEST,
    MESSAGE_DELETE_SUCCESS,
    MESSAGE_DELETE_FAIL,

    MESSAGE_CREATE_REQUEST,
    MESSAGE_CREATE_SUCCESS,
    MESSAGE_CREATE_FAIL,
} from '../constants/messageConstants'

export const listMessages = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: MESSAGE_LIST_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const { data } = await axios
            // .create({
            //     headers: {
            //     Authorization: `Bearer ${userInfo.token}`,
            //     'Content-Type': 'application/json',
            //     },
            // })
            .get(`/messages`)

        dispatch({
            type: MESSAGE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MESSAGE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getMessageDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MESSAGE_DETAILS_REQUEST
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
            .get(`/api/messages/${id}/`)

        dispatch({
            type: MESSAGE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MESSAGE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteMessage = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MESSAGE_DELETE_REQUEST
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
            .delete(`/api/messages/delete/${id}`)

        dispatch({
            type: MESSAGE_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: MESSAGE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createMessage = (message) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MESSAGE_CREATE_REQUEST
        })

        const { data } = await axios
            .post(
                `/api/messages/create/`,
                message
            )

        dispatch({
            type: MESSAGE_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: MESSAGE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}