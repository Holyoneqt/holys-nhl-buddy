"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiKey = 'AIzaSyBkuDsvSfgkLRziqy0lAYOkbOSHKzhiDF0';
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PL1NbHSfosBuHInmjsLcBuqeSV256FqlOO&key=${apiKey}`;
function getAllVideos() {
    return fetch(url)
        .then(response => response.json())
        .catch(err => console.error(err));
}
exports.getAllVideos = getAllVideos;