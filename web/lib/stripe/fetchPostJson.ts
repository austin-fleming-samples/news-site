export const fetchPostJSON = async <T>(url: string, data: T) => {
  try {
    if (!data) throw new Error('No data was provided for POST action.');
    // Default options are marked with *
    const response = await fetch(url, {
      // no-referrer, *client
      body: JSON.stringify(data),

      // no-cors, *cors, same-origin
      cache: 'no-cache',

      // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin',

      // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      method: 'POST',

      // *GET, POST, PUT, DELETE, etc.
      mode: 'cors',

      redirect: 'follow',
      // manual, *follow, error
      referrerPolicy: 'no-referrer', // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  } catch (error) {
    if (error instanceof Error) {
      throw new TypeError(error.message);
    }
    throw error;
  }
};
