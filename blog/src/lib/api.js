import Axios from "axios"

export function getTweets() {
    return Axios.get('https://itc-bootcamp-19.appspot.com/tweet')
}

export function postTweet(payload) {
    return Axios.post('https://itc-bootcamp-19.appspot.com/tweet', payload)
}