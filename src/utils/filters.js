export const searchOutages = (outages, query, addresses = {}) => {
  if (!query || query.trim() === '') return outages;

  const searchTerm = query.toLowerCase().trim();

  return outages.filter((outage) => {
    const id = (outage.id || '').toString().toLowerCase();
    const identifier = (outage.identifier || '').toString().toLowerCase();
    const address = addresses[outage.id];

    if (id.includes(searchTerm) || identifier.includes(searchTerm)) {
      return true;
    }

    if (address) {
      const street = (address.street || '').toLowerCase();
      const city = (address.city || '').toLowerCase();
      const zip = (address.zip || '').toLowerCase();
      const neighborhood = (address.neighborhood || '').toLowerCase();
      const formatted = (address.formatted || '').toLowerCase();

      if (
        street.includes(searchTerm) ||
        city.includes(searchTerm) ||
        zip.includes(searchTerm) ||
        neighborhood.includes(searchTerm) ||
        formatted.includes(searchTerm)
      ) {
        return true;
      }
    }

    return false;
  });
};

export const filterByStatus = (outages, statusFilter) => {
  if (!statusFilter || statusFilter === 'all') return outages;

  const filterLower = statusFilter.toLowerCase();

  return outages.filter((outage) => {
    const status = (outage.status || '').toLowerCase();
    return status.includes(filterLower);
  });
};

export const sortOutages = (outages, sortBy = 'most-affected') => {
  const sorted = [...outages];

  switch (sortBy) {
    case 'most-affected':
      return sorted.sort((a, b) => (b.numPeople || 0) - (a.numPeople || 0));

    case 'recent':
      return sorted.sort(
        (a, b) => (b.startTime || 0) - (a.startTime || 0)
      );

    case 'oldest':
      return sorted.sort(
        (a, b) => (a.startTime || 0) - (b.startTime || 0)
      );

    case 'last-updated':
      return sorted.sort(
        (a, b) =>
          (b.lastUpdatedTime || 0) - (a.lastUpdatedTime || 0)
      );

    default:
      return sorted;
  }
};

export const applyFilters = (outages, { query, status, sortBy }, addresses) => {
  let filtered = outages;

  filtered = filterByStatus(filtered, status);

  filtered = searchOutages(filtered, query, addresses);

  filtered = sortOutages(filtered, sortBy);

  return filtered;
};
