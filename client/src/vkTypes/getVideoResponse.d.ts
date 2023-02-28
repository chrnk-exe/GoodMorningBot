declare namespace GetVideoResponse {

    export interface Lists {
        allowed: any[];
        excluded: any[];
    }

    export interface Owners {
        allowed: any[];
        excluded: any[];
    }
    

    export type categories= 'nobody' | 'all' | 'friends' | 'friends_of_friends' | 'users';

    export interface PrivacyView {
        category: categories;
        lists: Lists;
        owners: Owners;
    }

    export interface Lists2 {
        allowed: any[];
        excluded: any[];
    }

    export interface Owners2 {
        allowed: any[];
        excluded: any[];
    }

    export interface PrivacyComment {
        category: categories;
        lists: Lists2;
        owners: Owners2;
    }

    export interface Image {
        url: string;
        width: number;
        height: number;
        with_padding: number;
    }

    export interface FirstFrame {
        url: string;
        width: number;
        height: number;
    }

    export interface Likes {
        count: number;
        user_likes: number;
    }

    export interface Reposts {
        count: number;
        wall_count: number;
        mail_count: number;
        user_reposted: number;
    }

    export interface Item {
        privacy_view: PrivacyView;
        privacy_comment: PrivacyComment;
        can_comment: number;
        can_edit: number;
        can_like: number;
        can_repost: number;
        can_subscribe: number;
        can_add_to_faves: number;
        can_add: number;
        can_attach_link: number;
        comments: number;
        date: number;
        description: string;
        duration: number;
        image: Image[];
        first_frame: FirstFrame[];
        width: number;
        height: number;
        id: number;
        owner_id: number;
        is_author: boolean;
        ov_id: string;
        title: string;
        is_favorite: boolean;
        player: string;
        converting: number;
        added: number;
        repeat: number;
        type: string;
        views: number;
        likes: Likes;
        reposts: Reposts;
    }

    export interface Profile {
        id: number;
        first_name: string;
        last_name: string;
        can_access_closed: boolean;
        is_closed: boolean;
    }

    export interface Group {
        id: number;
        name: string;
        screen_name: string;
        is_closed: number;
        type: string;
        photo_50: string;
        photo_100: string;
        photo_200: string;
    }

    export interface Response {
        count: number;
        items: Item[];
        groups?: Group[];
        profiles?: Profile[];
    }

    export interface RootObject {
        response: Response;
    }

    export interface ProfileAuthor {
        firstName: string;
        secondName: string;
        url: string;
    }

    export interface GroupAuthor {
        name: string;
        photo_200?: string;
        url: string;
    }

    export type Author = ProfileAuthor | GroupAuthor

    export interface AppResponse {
        duration: number;
        image: string;
        first_frame: string;
        video: string;
        views: number;
        likes: number;
        reposts: number;
        author: ProfileAuthor | GroupAuthor;
        id: number;
        title: string;
    }

    export interface Error extends Record<string, unknown> {
        error_code: number,
        error_msg: string,
    }

}

