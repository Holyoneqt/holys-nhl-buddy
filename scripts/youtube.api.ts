const apiKey = 'AIzaSyBkuDsvSfgkLRziqy0lAYOkbOSHKzhiDF0';
const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=UCqFMzb-4AUf6WAIbl132QKA&part=snippet,id&order=date&maxResults=50`

export function getAllVideos(): Promise<YoutubeApi.YoutubeApiResponse> {
    return fetch(url)
        .then(response => response.json())
        .catch(err => console.error(err));
}

