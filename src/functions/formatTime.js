export default function formatTime(timeString = '') {
    const now = new Date();
    const messageTime = new Date(timeString);

    if (messageTime.toDateString() === now.toDateString()) {
        return messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (messageTime.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString()) {
        return 'Yesterday';
    } else {
        const year = messageTime.getFullYear();
        const month = (messageTime.getMonth() + 1).toString().padStart(2, '0');
        const day = messageTime.getDate().toString().padStart(2, '0');
        return `${year}/${month}/${day}`;
    }
}
