import { EventEmitter } from 'events'

export namespace Types{

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
        created_at: number;
        approved: boolean;
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

    export type RawResponse<T> = T | { message: string; };

}

export class Client extends EventEmitter{

    readonly token: string;
    private readonly baseURL: string;

    public constructor(token: string);
    public async getBot(id: string): Promise<Types.Bot | null>;
    public async getBotReviews(id: string): Promise<Types.BotReview[]>;
    public async getReview(userID: string, botID: string): Promise<Types.BotReview | null>;
    public async hasVoted(userID: string, botID: string): Promise<Types.Voted | null>;
    public async search(query: string): Promise<Types.Bot[]>;
    protected handleError(e: any): void;

}

export const version: string;
export default Client;