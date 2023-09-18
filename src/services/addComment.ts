import axios from 'axios';
import { server } from '../../conf.json';
import type { CommentData } from '@/types';

export const addComment = async function (
    commentData: CommentData,
): Promise<{ error?: string }> {
    try {
        await axios.post(`${server.url}/add-comment`, {
            headers: {
                origin: server.url,
            },
            data: commentData,
        });
        return {};
    } catch (e) {
        console.error(e);
        return { error: e as string };
    }
};
