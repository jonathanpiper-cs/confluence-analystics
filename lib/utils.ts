export const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const auth = {
  ...headers,
  Authorization: 'Basic ' + Buffer.from(process.env.EMAIL + ":" + process.env.API_TOKEN).toString('base64')
};

export async function getLabel(name: string) {
  const url = `${process.env.V1_BASE_URL!}label?name=${name}`;
  const response = await fetch(url, { headers: auth });
  const data = await response.json();
  return data.label;
}

export async function getSpace(id: string) {
  const url = `${process.env.BASE_URL!}spaces/${id}`;
  console.log('Fetching space name from URL:', url);
  const response = await fetch(url, { headers: auth });
  const data = await response.json();
  console.log('Space data:', data);
  return data.name;
}
