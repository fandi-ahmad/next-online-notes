const apiUrl = '/api/notes'

export async function GetNoteApi(id?: number | string | null) {
  try {
    let result

    if (!id) {
      result = await fetch(apiUrl);
    } else {
      result = await fetch(apiUrl + '/' + id);
    }
    return result.json()
  } catch (error) {
    console.log(error, '<-- error fungsi GetNoteApi: /src/api/noteApi.ts');
    throw error
  }
}

interface iDataNote {
  head: string,
  body: string,
  id_user: any
}

export async function CreateNoteApi(data: iDataNote) {
  try {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    const response = await fetch(apiUrl, requestOptions);

    const createdNote = await response.json();
    return createdNote;
  } catch (error) {
    console.log(error, '<-- error fungsi CreateNoteApi: /src/api/noteApi.ts');
    throw error
  }
}

export async function UpdateNoteApi(data: iDataNote) {
  try {
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    // id_user = id (note)
    const response = await fetch(apiUrl + '/' + data.id_user, requestOptions);

    const createdNote = await response.json();
    return createdNote;
  } catch (error) {
    console.log(error, '<-- error fungsi UpdateNoteApi: /src/api/noteApi.ts');
    throw error
  }
}

export async function DeleteNoteApi(id: number) {
  try {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch(apiUrl + '/' + id, requestOptions);

    const createdNote = await response.json();
    return createdNote;
  } catch (error) {
    console.log(error, '<-- error fungsi DeleteNoteApi: /src/api/noteApi.ts');
    throw error 
  }
}