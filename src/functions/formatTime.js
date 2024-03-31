export default function formatTime(timeString) {
    const now = new Date();
    const [dateString, time] = timeString.split(' ');
    const [day, month, year] = dateString.split('.');
    const messageDate = new Date(`${year}/${month}/${day}`);
    const messageTime = new Date(`${year}/${month}/${day} ${time}`);

    if (messageDate.toDateString() === now.toDateString()) {
        return messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (messageDate.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString()) {
        return 'Yesterday';
    } else {
        return `${year}/${month}/${day}`;
    }
}