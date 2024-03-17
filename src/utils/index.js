export const getFormattedTime = (fromTime) => {
    let duration = new Date().getTime() - new Date(fromTime).getTime();

    duration = duration / 1000;

    const weeks = Math.floor(duration / (60 * 60 * 24 * 7));
    if (weeks) return `${weeks} weeks ago`;
    duration = duration - weeks * (60 * 60 * 24 * 7);
    const days = Math.floor(duration / (60 * 60 * 24));
    if (days) return `${days} days ago`;
    duration = duration - days * (60 * 60 * 24);
    const hours = Math.floor(duration / (60 * 60));
    if (hours) return `${hours} hours ago`;
    duration = duration - hours * (60 * 60);
    const minutes = Math.floor(duration / (60));
    if (minutes) return `${minutes} minutes ago`;
    const seconds = Math.floor(duration);
    return `${seconds} seconds ago`;
}

