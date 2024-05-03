const apiUrl = '/api/users'

type iDataUser = {
  username: string,
  password: string
}

export async function CreateUserApi(data: iDataUser) {
  try {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    const response = await fetch(apiUrl, requestOptions);

    const createdResponse = await response.json();
    return createdResponse;
  } catch (error) {
    console.log(error, '<-- error fungsi CreateUserApi: /src/api/userApi.ts');
    throw error
  }
}
