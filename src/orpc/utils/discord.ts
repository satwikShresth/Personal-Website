import axios from 'axios';
import { env } from '@/env';

/**
 * Send a generic notification to Discord
 */
export async function sendDiscordNotification(message: string, username?: string): Promise<void> {
    const payload = {
        content: message,
        username: username ?? 'Notification Bot',
    };

    return axios
        .post(env.DISCORD_WEBHOOK_URL, payload, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => {
            if (response.status === 204 || response.status === 200) {
                console.log('✅ Discord notification sent successfully!');
            } else {
                console.error(`Discord notification failed. Status: ${response.status}`);
            }
        })
        .catch((error) => {
            if (axios.isAxiosError(error)) {
                console.error('Discord notification error:', error.message);
                if (error.response) {
                    console.error('Response:', error.response.status, error.response.data);
                }
            } else {
                console.error('Failed to send Discord notification:', error);
            }
        });
}
