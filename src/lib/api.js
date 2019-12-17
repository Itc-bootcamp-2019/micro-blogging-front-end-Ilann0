import axios from "axios"

const API_URL = 'https://itc-bootcamp-19-dot-charcha-dev.appspot.com/tweet'

export function getTweets() {
    return axios.get(API_URL)
}

export function postTweet(payload) {
    return axios.post(API_URL, { tweet: payload })
}