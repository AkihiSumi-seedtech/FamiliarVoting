export default function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const dayOfWeek = date.getDay();
    const dayOfWeekStr = ['日', '月', '火', '水', '木', '金', '土'][dayOfWeek];

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}年 ${month}月${day}日(${dayOfWeekStr}) ${hours}:${minutes}`;
}