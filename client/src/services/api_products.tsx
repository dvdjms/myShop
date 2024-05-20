
   
export const getProducts = async () => {
    const url = 'http://127.0.0.1:8000/api/products/';
    try {
        const response = await fetch(url, {
            method: "GET",
        });
        const data = await response.json();
        return data.results.map((item: {id: number; name: string; description: string; price: string; images: Object}) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            images: item.images,
        }));

    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    };
};