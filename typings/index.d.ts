import { EventEmitter } from 'events'

export namespace APITypes{

    export interface Bot{
        id: string;
        name: string;
        avatar: string;
        description: {
            short: string;
            long?: string;
        };
        developers: string[];
        required_permissions: number;
        upvotes: number;
        support_server?: string;
        website?: string;
        tags: string[];
        prefix: string;
        submitted_at: number;
        approved: boolean;
        servers: number;
        certified: boolean;
        vanity: string;
    }

    export interface BotReview{
        author_id: string;
        content: string;
        stars: number;
        sent_at: number;
    }

    export interface Voted{
        voted: boolean;
        upvoted_at: number;
        next_at: number;
    }

    export interface ErrorResponse{
        message: string;
    }

    export interface PostResponse{
        success?: boolean;
        message?: boolean;
    }

    export interface Botpack{
        name: string;
        desription: string;
        bots: string[];
        tags: string[];
    }

    export interface Botpacks{
        [key: string]: Botpack;
    }

    export type RawResponse<T> = T | ErrorResponse;
    export type Statuses = 'online' | 'dnd' | 'offline' | 'idle' | 'unknown';

}

export interface RouteBuilderFetchConfig{
    headers: { [key: string]: string };
    params: { [key: string]: string };
    body: { [key: string]: string };
}

export type RouteBuilderFetch = (config?: RouteBuilderFetchConfig) => any;
export type RouteBuilderKeys = RouteBuilder | RouteBuilderFetch | (() => string);

export interface RouteBuilder{
    (): RouteBuilderKeys;
    get(config?: RouteBuilderFetchConfig);
    post(config?: RouteBuilderFetchConfig);
    toString(): string;
    [key: string]: RouteBuilderKeys | (() => RouteBuilderKeys);
}

export const RouteBuilder: (client: Client) => RouteBuilder;

export class Bot{

    data: any;
    client?: Client;
    
    id: string;
    username: string;
    avatarURL: string;
    description: { 
        short: string; 
        long: string;
    };
    developers: string[];
    requiredPermissions: number;
    upvotes: number;
    supportServer: string;
    website: string;
    tags: string[];
    prefix: string;
    submittedTimestamp: number | null;
    isApproved: boolean;
    isCertified: boolean;
    vanityID?: string;

    serverCount: number;
    status: APITypes.Statuses;

    public constructor(data, client?: Client);

    public get submittedAt(): Date | null;
    public get vanityURL(): string | null;

    public getReviews(): Promise<Review[]>;
    public postStats(): Promise<APITypes.PostResponse>;

}

export class Review{

    data: any;

    authorID: string;
    stars: number;
    content: string;
    sentTimestamp: number;

    public constructor(data);
    public get sentAt(): Date;

}

export interface Voted{
    voted: boolean;
    upvotedAt: number;
    nextAt: number;
}

export interface PosterOptions{
    startOnInitiate?: boolean;
    interval?: number;
}

export class AutoPoster extends EventEmitter{

    token: string;
    client: any;
    interval: number;
    protected stopped: boolean;
    protected _id: NodeJS.Timeout;
    protected library: 'eris' | 'discord.js';
    protected baseURL: string;

    public constructor(token: string, client, options?: PosterOptions);

    public start(): void;
    public stop(): void;
    public post(id: string, count: number): void;

}

export class Client extends EventEmitter{

    token: string;
    private baseURL: string;

    public constructor(token: string);

    public get api(): RouteBuilder;

    public getBot(id: string): Promise<Bot | null>;
    public getBotReviews(id: string): Promise<Review[]>;
    public getReview(userID: string, botID: string): Promise<Review | null>;
    public hasVoted(userID: string, botID: string): Promise<Voted | null>;
    public postStats(id: string, serverCount: number): Promise<APITypes.PostResponse>;
    public getPack(id: string): Promise<APITypes.Botpack | null>;
    public getPacks(): Promise<APITypes.Botpacks>;
    public createAutoPoster(client, options?: PosterOptions): AutoPoster;

    protected handleError(e): never | void | null;

}

export const version: string;
export default Client;