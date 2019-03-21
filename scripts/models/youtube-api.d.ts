declare module YoutubeApi {

    export interface ApiResonse {
        etag: string;
        items: Item[];
        kind: string;
        nextPageToken: string;
        pageInfo: PageInfo;
    }

    export interface PageInfo {
        resultsPerPage: number;
        totalResults: number;
    }

    export interface Item {
        etag: string;
        id: string;
        kind: string;
        snippet: Snippet;
    }

    export interface Snippet {
        channelId: string;
        channelTitle: string;
        description: string;
        playlistId: string;
        position: number;
        publishedAt: string;
        resourceId: ResourceId;
        thumbnails: {
            default: Thumbnail;
            standard: Thumbnail;
            medium: Thumbnail;
            high: Thumbnail;
            maxres: Thumbnail;
        };
        title: string;
    }

    export interface ResourceId {
        kind: string;
        videoId: string;
    }

    export interface Thumbnail {
        height: number;
        url: string;
        width: number;
    }

}

