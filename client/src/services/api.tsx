import { auth } from '../config/Firebase';


// Post new user
export const signInUserFetch = async (user_token: string, userUID: string, displayName: string, email: string) => {
    const url = 'http://127.0.0.1:8000/api/users/';
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user_token}`,
            },
            body: JSON.stringify({
                'username': displayName,
                'email': email,
                'firebase_uid': userUID
            }),
        })
        const data = await response.json();
        console.log(data, "signed in successfully");
        return response;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    };
};

// get current user name
export const getUserDetails = async (): Promise<string | undefined> => {
    const user = auth.currentUser || '';
    if(!user){
        return "not signed in";
    }
    const url = 'http://127.0.0.1:8000/current-user/';
    const token = await user.getIdToken();
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        const data = await response.json();
        return data.username;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    };
};


// get all images
export const getImages = async () => {
    const url = 'http://127.0.0.1:8000/api/images/';
    try {
        const response = await fetch(url, {
            method: "GET",
        });
        const data = await response.json();
        return data.results.map((item: {id: any; image_url: any; description: any}) => ({
            id: item.id,
            url: item.image_url,
            description: item.description,
        }));
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    };
};

// upload image
export const uploadImage = async (formData: FormData) => {
    const user = auth.currentUser || '';
    if(!user){
        return "not signed in";
    }
    const token = await user.getIdToken();
    if (formData) {
        console.log("Uploading file...");
        const url = 'http://127.0.0.1:8000/api/images/';
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData
            })
            const data = await response.json();
            console.log("Api message", data.message);
        } catch (error) {
            console.error('Error uploading image', error);
            throw error;
        };
    };
};

// delete image
export const deleteImage = async (ImageId: number) => {
    const user = auth.currentUser || '';
    if(!user){
        return "not signed in";
    }
    const token = await user.getIdToken();
    const url = `http://127.0.0.1:8000/api/images/${ImageId}`;
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
        // const data = await response.json();
        // console.log(data);
        if (response.ok) {
            console.log(`Image with ID ${ImageId} deleted successfully.`);
        } else {
            console.error(`Failed to delete image with ID ${ImageId}.`);
        }
    } catch (error) {
        console.error('Error deleting image', error);
        throw error;
    };
};