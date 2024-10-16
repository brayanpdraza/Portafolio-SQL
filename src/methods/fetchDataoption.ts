const fetchDataoption = async (url: string, params?: Record<string, any>) => {
    // Aquí va la lógica para realizar la petición
    const queryString = params
        ? Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&')
        : '';

    const fullUrl = queryString ? `${url}?${queryString}` : url;
    const response = await fetch(fullUrl);
    if (!response.ok) {
        throw new Error('Error en la petición');
    }

    return await response.json();
};

export default fetchDataoption;