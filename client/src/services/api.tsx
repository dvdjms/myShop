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
            // const data = await response.json();
            // console.log(data, "signed in successfully (api.tsk)")
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
            })
            const data = await response.json();
            return data.username;
      } catch (error) {
            console.error('Error fetching data', error);
            throw error;
      };
};


