export const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'Unknown';

  const date = new Date(timestamp);
  const now = new Date();

  if (isNaN(date.getTime())) return 'Invalid date';

  const isToday = date.toDateString() === now.toDateString();
  const isYesterday =
    date.toDateString() ===
    new Date(now.getTime() - 24 * 60 * 60 * 1000).toDateString();

  const timeStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  if (isToday) {
    return `Today at ${timeStr}`;
  } else if (isYesterday) {
    return `Yesterday at ${timeStr}`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }
};

export const formatDuration = (startTime) => {
  if (!startTime) return 'Unknown';

  const start = new Date(startTime);
  const now = new Date();

  if (isNaN(start.getTime())) return 'Unknown';

  const diffMs = now - start;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24)
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;

  return formatTimestamp(startTime);
};

export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatPeopleAffected = (num) => {
  if (!num) return 'No data';
  if (num === 1) return '1 person';
  return `${formatNumber(num)} people`;
};

export const getStatusColor = (status) => {
  const statusLower = (status || '').toLowerCase();

  if (statusLower.includes('assigned')) return 'orange';
  if (statusLower.includes('unassigned')) return 'red';
  if (statusLower.includes('resolved') || statusLower.includes('complete'))
    return 'green';

  return 'gray';
};

export const getStatusLabel = (status) => {
  if (!status) return 'Unknown';
  return status;
};
