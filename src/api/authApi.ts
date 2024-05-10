const apiUrl = '/api/auth/'

type iDataUser = {
  username: string,
  password: string
}

export async function LoginUserApi(data: iDataUser) {
  try {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    const response = await fetch(apiUrl+'login', requestOptions);

    const createdResponse = await response.json();
    return createdResponse;
  } catch (error) {
    console.log(error, '<-- error fungsi LoginUserApi: /src/api/authApi.ts');
    throw error
  }
}

export async function LogoutUserApi() {
  try {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch(apiUrl+'logout', requestOptions);

    const createdResponse = await response.json();
    return createdResponse;
  } catch (error) {
    console.log(error, '<-- error fungsi LogoutUser: /src/api/authApi.ts');
    throw error
  }
}

export async function CheckUserApi() {
  try {
    const response = await fetch(apiUrl+'user')
    return response.json()
  } catch (error) {
    console.log(error, '<-- error fungsi CheckUser: /src/api/authApi.ts');
    throw error
  }
}
