export interface YoutubeApiResponse {
    etag: string;
    items: {
        etag: string;
        id: string;
        kind: string;
        snippet: {
            channelId: string;
            channelTitle: string;
            description: string;
            playlistId: string;
            position: number;
            publishedAt: string;
            resourceId: {
                kind: string;
                videoId: string;
            };
            thumbnails: {
                default: YoutubeApiThumbnail;
                standard: YoutubeApiThumbnail;
                medium: YoutubeApiThumbnail;
                high: YoutubeApiThumbnail;
                maxres: YoutubeApiThumbnail;
            };
            title: string;
        };
    }[];
    kind: string;
    nextPageToken: string;
    pageInfo: {
        resultsPerPage: number;
        totalResults: number;
    };
}

export interface YoutubeApiThumbnail {
    height: number;
    url: string;
    width: number;
}
